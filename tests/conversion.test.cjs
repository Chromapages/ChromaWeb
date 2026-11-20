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
  proofStatus: 'approved', excerpt: 'Owner-approved project summary.', content: [block('Verified work.')],
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
  ];
  const listings = await query(caseStudiesQuery, dataset);
  assert.deepEqual(listings.map((project) => project.slug), ['approved']);
  for (const project of listings) {
    const detail = await query(projectBySlugQuery, dataset, { slug: project.slug });
    assert.equal(detail.title, project.title);
    assert.equal(detail.excerpt, project.excerpt);
    assert.ok(detail.content.length);
  }
  assert.equal(await query(projectBySlugQuery, dataset, { slug: 'empty' }), null);
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

test('proof card omits invented results, focus and deliverables', () => {
  const ProjectCard = loadTs('components/cards/project-card.tsx', {
    '@/components/ui/button': ({ href, children }) => React.createElement('a', { href }, children),
  }).default;
  const html = renderToStaticMarkup(React.createElement(ProjectCard, { project: { title: 'Verified project', slug: 'verified', excerpt: 'Verified summary' } }));
  assert.match(html, /\/work\/verified/);
  assert.doesNotMatch(html, /Result:|Digital Transformation|Development|Design<|See Case Study/);
});

function findElement(node, type) {
  if (!node || typeof node !== 'object') return undefined;
  if (node.type === type) return node;
  return React.Children.toArray(node.props?.children).map((child) => findElement(child, type)).find(Boolean);
}

function requestForm() {
  const state = [];
  let stateIndex = 0;
  let resets = 0;
  const events = [];
  const RequestForm = loadTs('components/forms/request-form.tsx', {
    react: { ...React,
      useState: (initial) => { const index = stateIndex++; state[index] = initial; return [initial, (value) => { state[index] = value; }]; },
      useRef: (current) => ({ current }), useEffect: () => {},
    },
    'next/navigation': { usePathname: () => '/contact' },
    'react-hook-form': { useForm: () => ({
      register: () => ({}), handleSubmit: (callback) => () => callback(submission),
      setValue: () => {}, watch: () => '', formState: { errors: {}, isSubmitting: false },
      reset: () => { resets++; },
    }) },
    '@/lib/analytics/events': { trackEvent: (event) => events.push(event) },
  }).default;
  const form = findElement(RequestForm(), 'form');
  return { submit: form.props.onSubmit, focus: form.props.onFocusCapture, state, events, resets: () => resets };
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
    assert.equal(typeof form.state[0], 'string');
    assert.equal(form.state[1], null);
    assert.equal(form.resets(), 0);
    assert.equal(form.events.length, 0);
  }
});

test('public form records one accepted submission without private fields', async () => {
  const form = requestForm();
  form.focus(); form.focus();
  assert.equal(form.events.filter((event) => event.name === 'form_start').length, 1);
  global.fetch = async () => Response.json({ success: true, issueIdentifier: 'QA-123' });
  await form.submit();
  assert.match(form.state[1], /QA-123/);
  assert.equal(form.resets(), 1);
  const events = form.events.filter((event) => event.name === 'form_submit');
  assert.equal(events.length, 1);
  for (const field of ['name', 'email', 'company', 'message', 'issueIdentifier', 'issueUrl']) {
    if (field !== 'name') assert.equal(field in events[0], false);
  }
  assert.equal(events[0].name, 'form_submit');
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

test('TrustBar shows the operating standard without unsupported endorsements', () => {
  const TrustBar = loadTs('components/sections/trust-bar.tsx').default;
  const html = renderToStaticMarkup(React.createElement(TrustBar));
  assert.match(html, /Our standard/);
  assert.match(html, /Look Premium, Convert Clearly, Load Fast, Launch Clean, Keep Improving\./);
  assert.doesNotMatch(html, /Trusted by industry leaders|Partner|Logo /);
});

test('pricing passes empty offers and suppresses unapproved offer cards', async () => {
  const PricingSnapshot = loadTs('components/sections/pricing-snapshot.tsx', displayMocks).default;
  const PricingPage = loadTs('app/(marketing)/pricing/page.tsx', {
    ...displayMocks,
    '@/components/sections/pricing-snapshot': PricingSnapshot,
    '@/components/sections/faq-accordion': () => null,
  }).default;
  const snapshot = findElement(await PricingPage(), PricingSnapshot);
  assert.ok(snapshot);
  assert.deepEqual(snapshot.props.offers, []);
  const html = renderToStaticMarkup(React.createElement(PricingSnapshot, { offers: [] }));
  assert.doesNotMatch(html, /Launch Website|Landing Page Sprint/);
});

test('case study detail omits unsupported results and technology claims', async () => {
  const Detail = loadTs('app/(marketing)/work/[slug]/page.tsx', {
    ...displayMocks,
    '@/lib/sanity/fetch': { getCaseStudyBySlug: async () => ({ title: 'Verified work', excerpt: 'Verified narrative' }) },
    '@/lib/sanity/image': {},
    '@/components/ui/rich-text': () => null,
  }).default;
  const html = renderToStaticMarkup(await Detail({ params: Promise.resolve({ slug: 'verified' }) }));
  assert.doesNotMatch(html, /Results|Better conversion|Improved load times|Clean handoff|Next.js|Tailwind|GSAP/);
});

test('Hero creates motion only for no-preference and cleans up media listeners', () => {
  for (const allowMotion of [false, true]) {
    let cleanup;
    let reverted = false;
    let timelines = 0;
    const Hero = loadTs('components/sections/hero.tsx', {
      react: { ...React, useRef: () => ({ current: null }) },
      '@/components/ui/button': () => null,
      '@gsap/react': { useGSAP: (callback) => { cleanup = callback(); } },
      gsap: {
        matchMedia: () => ({
          add: (condition, callback) => {
            assert.equal(condition, '(prefers-reduced-motion: no-preference)');
            if (allowMotion) callback();
          }, revert: () => { reverted = true; },
        }),
        timeline: () => { timelines++; return { to: () => {} }; }, set: () => {},
      },
    }).default;
    Hero({});
    assert.equal(timelines, allowMotion ? 1 : 0);
    cleanup();
    assert.equal(reverted, true);
  }
});

test('GTM is absent for missing, placeholder and malformed IDs', () => {
  for (const id of ['', 'GTM-XXXXXXX', 'GTM-ABC<script>', 'GTM-ABC1234']) {
    process.env.NEXT_PUBLIC_GTM_ID = id;
    const Layout = loadTs('app/layout.tsx', {
      './globals.css': {},
      'next/font/google': { Inter: () => ({ variable: 'inter' }), Montserrat: () => ({ variable: 'montserrat' }) },
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
