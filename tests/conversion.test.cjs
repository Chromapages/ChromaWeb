require('next/dist/server/node-environment-baseline');
const { test, afterEach } = require('node:test');
const assert = require('node:assert/strict');
const { parse, evaluate } = require('groq-js');
const { renderToStaticMarkup } = require('react-dom/server');
const React = require('react');
const { loadTs } = require('./load-ts.cjs');

const originalFetch = global.fetch;
const originalEnv = { ...process.env };
afterEach(() => {
  global.fetch = originalFetch;
  process.env = { ...originalEnv };
});

const submission = {
  name: 'QA Example', email: 'qa@example.invalid', requestType: 'prospect',
  projectType: 'Marketing Website', budgetRange: '', message: 'Controlled local regression inquiry.',
};
const acceptance = {
  ok: true, issueId: 'test-issue-id', issueIdentifier: 'QA-123',
  issueUrl: 'https://linear.app/test/issue/QA-123',
};
const request = (payload = submission) => new Request('https://site.invalid/api/intake', {
  method: 'POST', body: JSON.stringify(payload), headers: { 'Content-Type': 'application/json' },
});
function intake() {
  process.env.WORKER_URL = 'https://worker.invalid';
  process.env.PATH_SECRET = 'local-test-only';
  return loadTs('app/api/intake/route.ts').POST;
}

test('intake rejects invalid input and honeypots without contacting the Worker', async () => {
  const POST = intake();
  global.fetch = () => assert.fail('invalid input must not leave the server');
  for (const payload of [{}, { ...submission, honeypot: 'bot' }, { ...submission, projectType: 'arbitrary' }]) {
    assert.equal((await POST(request(payload))).status, 400);
  }
  assert.equal((await POST(new Request('https://site.invalid/api/intake', { method: 'POST', body: '{' }))).status, 400);
});

test('intake fails closed for missing or unsafe Worker configuration', async () => {
  const POST = intake();
  global.fetch = () => assert.fail('invalid configuration must not send a request');
  delete process.env.PATH_SECRET;
  assert.equal((await POST(request())).status, 503);
  process.env.PATH_SECRET = 'local-test-only';
  process.env.WORKER_URL = 'http://worker.invalid';
  assert.equal((await POST(request())).status, 503);
});

test('intake requires explicit Worker acceptance with issue identifiers', async () => {
  const POST = intake();
  for (const payload of [{}, { ...acceptance, ok: false }, { ...acceptance, issueIdentifier: '' }]) {
    global.fetch = async () => Response.json(payload);
    const response = await POST(request());
    assert.equal(response.status, 502);
    assert.equal((await response.json()).success, false);
  }
  global.fetch = async () => new Response('not JSON');
  assert.equal((await POST(request())).status, 502);
});

test('intake forwards fields once and confirms acceptance without exposing issue URLs', async () => {
  const POST = intake();
  let calls = 0;
  global.fetch = async (_url, options) => {
    calls++;
    assert.ok(options.signal);
    assert.equal(options.redirect, 'error');
    const payload = JSON.parse(options.body);
    assert.equal(payload.fields.message, submission.message);
    assert.equal(payload.fields.requestType, 'prospect');
    return Response.json(acceptance);
  };
  const response = await POST(request());
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), {
    success: true, message: 'Request received successfully.', issueIdentifier: 'QA-123',
  });
  assert.equal(calls, 1);
});

test('intake maps rejection, network failure and timeouts without leaking upstream content', async () => {
  const POST = intake();
  global.fetch = async () => new Response('private upstream diagnostics', { status: 500 });
  assert.equal((await POST(request())).status, 502);
  global.fetch = async () => { throw new Error('secret-bearing upstream URL'); };
  const network = await POST(request());
  assert.equal(network.status, 502);
  assert.doesNotMatch(await network.text(), /secret-bearing/);
  global.fetch = async () => { throw new DOMException('timeout', 'TimeoutError'); };
  assert.equal((await POST(request())).status, 504);
});

const groq = (strings, ...values) => strings.reduce((query, part, i) => query + part + (values[i] ?? ''), '');
const queries = () => loadTs('lib/sanity/queries.ts', { 'next-sanity': { groq } });
const block = (text) => ({ _type: 'block', children: [{ _type: 'span', text }] });
const approved = {
  _id: 'approved', _type: 'caseStudy', title: 'Approved project', slug: { current: 'approved' },
  proofStatus: 'approved', proofClassification: 'clientProject',
  excerpt: 'Owner-approved project summary.', content: [block('Verified work.')],
};
async function query(query, dataset, params = {}) {
  return (await evaluate(parse(query), { dataset, params })).get();
}

test('listing and detail share eligibility: only approved, populated case studies', async () => {
  const { caseStudiesQuery, projectBySlugQuery } = queries();
  const dataset = [approved,
    { ...approved, _id: 'unapproved', slug: { current: 'unapproved' }, proofStatus: 'draft' },
    { ...approved, _id: 'empty', slug: { current: 'empty' }, content: [] },
    { ...approved, _id: 'blank', slug: { current: 'blank' }, content: [block('')] },
    { ...approved, _id: 'no-title', slug: { current: 'no-title' }, title: '' },
    { ...approved, _id: 'no-summary', slug: { current: 'no-summary' }, excerpt: '' },
    { ...approved, _id: 'no-slug', slug: { current: '' } },
    { ...approved, _id: 'unclassified', slug: { current: 'unclassified' }, proofClassification: undefined },
    { ...approved, _id: 'invalid-classification', slug: { current: 'invalid-classification' }, proofClassification: 'other' },
  ];
  const listings = await query(caseStudiesQuery, dataset);
  assert.deepEqual(listings.map((project) => project.slug), ['approved']);
  for (const project of listings) {
    const detail = await query(projectBySlugQuery, dataset, { slug: project.slug });
    assert.equal(detail.title, project.title);
    assert.equal(detail.proofClassification, 'clientProject');
    assert.equal(project.proofClassification, 'clientProject');
    assert.equal(detail.excerpt, project.excerpt);
    assert.ok(detail.content.length);
  }
  for (const slug of ['empty', 'unclassified', 'invalid-classification']) {
    assert.equal(await query(projectBySlugQuery, dataset, { slug }), null);
  }
});

test('CMS navigation projects href and falls back without usable entries', async () => {
  const { navigation } = loadTs('lib/site.ts');
  const unusable = [
    { label: 'Missing' },
    { label: 'Empty', path: '' },
    { label: 'Whitespace', path: '   ' },
    { label: 'Protocol relative', path: '//example.invalid' },
    { label: 'Non-link', path: 'javascript:void(0)' },
    { label: ' ', path: '/services' },
  ];
  for (const [items, expected] of [
    [[{ label: 'Our work', path: '/work' }, ...unusable], [{ label: 'Our work', href: '/work' }]],
    [unusable, navigation],
    [null, navigation],
  ]) {
    const dataset = items ? [{ _id: 'nav', _type: 'navigation', items }] : [];
    const { getNavigation } = loadTs('lib/sanity/fetch.ts', {
      './client': { client: { fetch: (source) => query(source, dataset) } },
      'next-sanity': { groq },
    });
    assert.deepEqual(await getNavigation(), expected);
  }
});

test('only Studio routes receive the Sanity content security policy', async () => {
  const { unstable_getResponseFromNextConfig } = require('next/experimental/testing/server');
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = 'synthetic-cms';
  const nextConfig = loadTs('next.config.ts').default;
  for (const [path, studio] of [['/', false], ['/portal-admin', false], ['/portal-admin/login', false], ['/admin', true], ['/admin/structure', true]]) {
    const response = await unstable_getResponseFromNextConfig({ url: `https://example.invalid${path}`, nextConfig });
    const policy = response.headers.get('content-security-policy');
    assert.ok(policy, path);
    const connections = policy.split('; ').find((directive) => directive.startsWith('connect-src ')).split(' ');
    for (const host of ['api.sanity.io', 'cdn.sanity.io', 'synthetic-cms.api.sanity.io', 'synthetic-cms.apicdn.sanity.io']) {
      assert.equal(connections.includes(`https://${host}`), studio, `${path}: ${host}`);
    }
    const scripts = policy.split('; ').find((directive) => directive.startsWith('script-src ')).split(' ');
    assert.equal(scripts.includes('https://core.sanity-cdn.com'), studio, path);
    if (!studio) assert.doesNotMatch(policy, /sanity\.io/);
  }
});

test('pricing fallback uses existing offers in missing, failed and empty CMS states', async () => {
  const { pricingOffers } = loadTs('lib/site.ts');
  for (const client of [null, { fetch: async () => [] }, { fetch: async () => null }, { fetch: async () => { throw new Error('offline'); } }]) {
    const { getPricingServices } = loadTs('lib/sanity/fetch.ts', { './client': { client }, 'next-sanity': { groq } });
    assert.deepEqual(await getPricingServices(), pricingOffers);
  }
  const cmsOffers = [{ title: 'Configured offer', summary: 'Existing approved CMS content.' }];
  const { getPricingServices } = loadTs('lib/sanity/fetch.ts', {
    './client': { client: { fetch: async () => cmsOffers } }, 'next-sanity': { groq },
  });
  assert.deepEqual(await getPricingServices(), cmsOffers);
});

test('empty CMS uses approved services and process steps without substituting case studies', async () => {
  const { services, processSteps } = loadTs('lib/site.ts');
  const { getServices, getProcessSteps, getCaseStudies, getCaseStudyBySlug } = loadTs('lib/sanity/fetch.ts', {
    './client': { client: { fetch: (source, params) => query(source, [], params) } },
    'next-sanity': { groq },
  });
  assert.deepEqual(await getServices(), services);
  assert.deepEqual(await getProcessSteps(), processSteps);
  assert.deepEqual(await getCaseStudies(), []);
  assert.equal(await getCaseStudyBySlug('service-site-refresh'), null);
});

test('proof card follows explicit classification and omits invented results', () => {
  const ProjectCard = loadTs('components/cards/project-card.tsx', {
    '@/components/ui/button': ({ href, children }) => React.createElement('a', { href }, children),
  }).default;
  for (const [proofClassification, label, client] of [
    ['internalConcept', 'Internal concept', 'Legacy client value'],
    ['clientProject', 'Client project', undefined],
  ]) {
    const project = { title: 'Verified project', slug: 'verified', excerpt: 'Verified summary', proofClassification, client };
    const html = renderToStaticMarkup(React.createElement(ProjectCard, { project }));
    assert.match(html, /href="\/work\/verified"/);
    assert.ok(html.includes(`>${label}</p>`));
    assert.doesNotMatch(html, /Result:|Digital Transformation|Development|Design<|See Case Study/);
  }
});

function findElement(node, predicate) {
  if (!node || typeof node !== 'object') return undefined;
  if (predicate(node)) return node;
  for (const child of React.Children.toArray(node.props?.children)) {
    const match = findElement(child, predicate);
    if (match) return match;
  }
}

function requestForm({ hydrated = true } = {}) {
  const state = [];
  const refs = [];
  let stateIndex;
  let refIndex;
  let resets = 0;
  const events = [];
  const RequestForm = loadTs('components/forms/request-form.tsx', {
    react: { ...React,
      useState(initial) {
        const index = stateIndex++;
        if (!(index in state)) state[index] = initial;
        return [state[index], (value) => { state[index] = value; }];
      },
      useRef(current) { return refs[refIndex++] ??= { current }; },
      useEffect: () => {},
      useSyncExternalStore: (_subscribe, client, server) => hydrated ? client() : server(),
    },
    'next/navigation': { usePathname: () => '/contact' },
    'react-hook-form': { useForm: () => ({
      register: (name) => ({ name }), handleSubmit: (callback) => () => callback(submission),
      watch: () => 'prospect', formState: { errors: {}, submitCount: 0 },
      setFocus: () => {}, reset: () => { resets++; },
    }) },
    '@/components/ui/button': ({ children, type, disabled }) => React.createElement('button', { type, disabled }, children),
    '@/lib/analytics/events': { trackEvent: (event) => events.push(event) },
  }).default;
  function render() {
    stateIndex = refIndex = 0;
    return RequestForm();
  }
  const form = findElement(render(), (node) => node.type === 'form');
  return {
    submit: () => form.props.onSubmit({ preventDefault() {} }),
    focus: form.props.onFocusCapture,
    render,
    state,
    events,
    resets: () => resets,
  };
}

test('public form retains values and emits no success for failed or malformed responses', async () => {
  for (const respond of [
    async () => { throw new Error('offline'); },
    async () => Response.json({ success: false }, { status: 502 }),
    async () => new Response('bad JSON'),
    async () => Response.json({ success: false, issueIdentifier: 'QA-123' }),
    async () => Response.json({ success: true }),
  ]) {
    const form = requestForm();
    global.fetch = respond;
    await form.submit();
    const html = renderToStaticMarkup(form.render());
    assert.match(html, /role="alert"[^>]*>We couldn’t confirm receipt/);
    assert.match(html, /<textarea[^>]+name="message"/);
    assert.doesNotMatch(html, /Your request was received|Reference:/);
    assert.equal(form.resets(), 0);
    assert.equal(form.events.length, 0);
  }
});

test('public form records one accepted submission without private fields', async () => {
  const form = requestForm();
  form.focus(); form.focus();
  assert.equal(form.events.filter((event) => event.name === 'form_start').length, 1);
  let requests = 0;
  global.fetch = async () => {
    requests++;
    return Response.json({ success: true, issueIdentifier: 'QA-123' });
  };
  await form.submit();
  assert.equal(form.state[1], 'QA-123');
  const receipt = form.render();
  assert.match(renderToStaticMarkup(receipt), /Reference: QA-123/);
  assert.equal(form.resets(), 0);
  findElement(receipt, (node) => node.props?.children === 'Send another request').props.onClick();
  assert.equal(form.resets(), 1);
  assert.match(renderToStaticMarkup(form.render()), /Send inquiry/);
  assert.equal(requests, 1);
  const events = form.events.filter((event) => event.name === 'form_submit');
  assert.equal(events.length, 1);
  const { name, ...payload } = events[0];
  assert.equal(name, 'form_submit');
  for (const field of ['name', 'email', 'company', 'message', 'issueIdentifier', 'issueUrl']) {
    assert.equal(field in payload, false);
  }
});

test('the unhydrated form cannot submit and renders an honest no-script notice', async () => {
  const form = requestForm({ hydrated: false });
  const html = renderToStaticMarkup(form.render());
  assert.match(html, /<noscript>JavaScript is required to submit this form\.<\/noscript>/);
  assert.match(html, /<fieldset disabled=""/);
  assert.match(html, /<button[^>]*type="submit"[^>]*disabled=""/);
  assert.doesNotMatch(html, /mailto:/);
  global.fetch = () => assert.fail('unhydrated form must not send a request');
  await form.submit();
  assert.deepEqual(form.events, []);
  assert.equal(form.resets(), 0);
});

const displayMocks = {
  '@/components/sections/hero': () => null,
  '@/components/sections/cta-block': () => null,
  '@/components/ui/section-heading': ({ title }) => React.createElement('h2', null, title),
  '@/components/ui/button': ({ href, children }) => React.createElement('a', { href }, children),
};

test('empty Work listing intentionally offers no unavailable example links', async () => {
  const Work = loadTs('app/(marketing)/work/page.tsx', {
    ...displayMocks, '@/lib/sanity/fetch': { getCaseStudies: async () => [] },
  }).default;
  const html = renderToStaticMarkup(await Work());
  assert.match(html, /Case studies are not available here right now/);
  assert.doesNotMatch(html, /href="\/work\//);
});

test('pricing passes empty offers and suppresses unapproved offer cards', async () => {
  const PricingSnapshot = loadTs('components/sections/pricing-snapshot.tsx', displayMocks).default;
  const PricingPage = loadTs('app/(marketing)/pricing/page.tsx', {
    ...displayMocks,
    '@/components/sections/pricing-snapshot': PricingSnapshot,
    '@/components/sections/faq-accordion': () => null,
  }).default;
  const snapshot = findElement(await PricingPage(), (node) => node.type === PricingSnapshot);
  assert.ok(snapshot);
  assert.deepEqual(snapshot.props.offers, []);
  const html = renderToStaticMarkup(React.createElement(PricingSnapshot, { offers: [] }));
  assert.doesNotMatch(html, /Launch Website|Landing Page Sprint/);
});

test('case study detail uses explicit classification and shows only labelled media', async () => {
  const asset = { _ref: 'image-test-1920x1080-png' };
  for (const [proofClassification, label, alt] of [
    ['internalConcept', 'Internal concept', undefined],
    ['clientProject', 'Client project', '   '],
    ['clientProject', 'Client project', '  Website project screenshot  '],
  ]) {
    const project = { slug: 'verified', title: 'Verified work', excerpt: 'Verified narrative', proofClassification, mainImage: { asset, alt } };
    const Detail = loadTs('app/(marketing)/work/[slug]/page.tsx', {
      ...displayMocks,
      '@/components/sections/hero': ({ eyebrow }) => React.createElement('p', null, eyebrow),
      '@/lib/sanity/fetch': { getCaseStudyBySlug: async () => project },
      '@/lib/sanity/image': { urlFor: () => ({ url: () => 'https://cdn.sanity.io/images/example.png' }) },
      'next/image': ({ alt, src }) => React.createElement('img', { alt, src }),
      '@/components/ui/rich-text': () => null,
    }).default;
    const html = renderToStaticMarkup(await Detail({ params: Promise.resolve({ slug: project.slug }) }));
    assert.ok(html.includes(`>${label}</p>`));
    if (alt?.trim()) assert.match(html, /<img[^>]+alt="Website project screenshot"/);
    else assert.doesNotMatch(html, /<img\b/);
    assert.doesNotMatch(html, /Documented results|Better conversion|Improved load times|Clean handoff|Next.js|Tailwind/);
  }
});

test('Home renders the standards in order and keeps core content visible without JS', async () => {
  const Home = loadTs('app/(marketing)/page.tsx', {
    '@/components/ui/button': displayMocks['@/components/ui/button'],
    '@/lib/sanity/fetch': { getCaseStudies: async () => [] },
  }).default;
  const html = renderToStaticMarkup(await Home());
  const standards = html.match(/aria-labelledby="standards-title"[^>]*>.*?<ol\b[^>]*>(.*?)<\/ol>/s);
  assert.ok(standards, 'standards must render as an ordered list');
  assert.deepEqual(
    [...standards[1].matchAll(/<li\b[^>]*>.*?<span[^>]*>([^<>]+)<\/span><\/li>/gs)].map((item) => item[1]),
    ['Look Premium', 'Convert Clearly', 'Load Fast', 'Launch Clean', 'Keep Improving'],
  );
  assert.match(html, /<h1[^>]*>A website that reflects/);
  assert.match(html, /href="\/contact"[^>]*>Send an inquiry/);
  assert.match(html, /Case studies are not available here right now/);
  assert.doesNotMatch(html, /Trusted by industry leaders|Partner logos?|<img\b|(?:["\s])opacity-0(?=["\s])|style="[^"]*opacity:\s*0(?:;|")/i);
});

test('Home keeps approved proof text when its image has no usable alt', async () => {
  const Home = loadTs('app/(marketing)/page.tsx', {
    '@/components/ui/button': displayMocks['@/components/ui/button'],
    '@/lib/sanity/fetch': { getCaseStudies: async () => [{
      slug: 'verified', title: 'Verified work', excerpt: 'Verified narrative', proofClassification: 'clientProject',
      mainImage: { asset: { _ref: 'image-test-1920x1080-png' }, alt: '  ' },
    }] },
    '@/lib/sanity/image': { urlFor: () => assert.fail('unused media should not be resolved') },
  }).default;
  const html = renderToStaticMarkup(await Home());
  assert.match(html, /href="\/work\/verified"/);
  assert.match(html, /Verified narrative/);
  assert.doesNotMatch(html, /<img\b/);
});

test('GTM is absent for missing, placeholder and malformed IDs', () => {
  for (const id of ['', 'GTM-XXXXXXX', 'GTM-ABC<script>', 'GTM-ABC1234']) {
    process.env.NEXT_PUBLIC_GTM_ID = id;
    const Layout = loadTs('app/layout.tsx', {
      './globals.css': {},
      'next/font/local': ({ variable }) => ({ variable }),
      'next/script': (props) => React.createElement('script', props),
      '@/components/global/skip-link': () => null,
    }).default;
    const html = renderToStaticMarkup(React.createElement(Layout, null, 'content'));
    assert.equal(html.includes('googletagmanager.com'), id === 'GTM-ABC1234');
  }
});

test('CMS rich text cannot render script URLs', () => {
  const RichText = loadTs('components/ui/rich-text.tsx').default;
  const html = renderToStaticMarkup(React.createElement(RichText, { value: [{
    _type: 'block', _key: 'block', style: 'normal',
    markDefs: [{ _type: 'link', _key: 'unsafe', href: 'javascript:alert(1)' }],
    children: [{ _type: 'span', _key: 'span', text: 'Untrusted link', marks: ['unsafe'] }],
  }] }));
  assert.match(html, /Untrusted link/);
  assert.doesNotMatch(html, /href=|javascript:/);
});
