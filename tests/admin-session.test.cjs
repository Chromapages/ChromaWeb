const assert = require('node:assert/strict');
const { createHash } = require('node:crypto');
const test = require('node:test');
const { loadTs } = require('./load-ts.cjs');

function sessions(t, projectId = 'test-project') {
  const previous = process.env.SANITY_API_WRITE_TOKEN;
  process.env.SANITY_API_WRITE_TOKEN = 'test-write-token';
  t.after(() => {
    if (previous === undefined) delete process.env.SANITY_API_WRITE_TOKEN;
    else process.env.SANITY_API_WRITE_TOKEN = previous;
  });
  const documents = new Map();
  const state = { failCreate: false, failRead: false, failDelete: false };
  const mocks = {
    'server-only': {},
    '@/lib/sanity/client': { projectId, dataset: 'production', apiVersion: '2024-03-01' },
    'next-sanity': {
      createClient(config) {
        assert.equal(config.useCdn, false);
        assert.equal(config.token, 'test-write-token');
        assert.equal(config.timeout, 10000);
        assert.equal(config.maxRetries, 0);
        return {
          async create(document, options) {
            if (state.failCreate) throw new Error('Storage unavailable');
            assert.equal(options.visibility, 'sync');
            documents.set(document._id, document);
          },
          async fetch(query, { id }, options) {
            if (state.failRead) throw new Error('Storage unavailable');
            assert.equal(options.cache, 'no-store');
            assert.match(query, /_type == "adminSession"/);
            return documents.get(id) ?? null;
          },
          async delete(id, options) {
            if (state.failDelete) throw new Error('Storage unavailable');
            assert.equal(options.visibility, 'sync');
            documents.delete(id);
          },
        };
      },
    },
  };
  return { documents, state, load: () => loadTs('lib/admin-session.ts', mocks) };
}

test('opaque sessions persist only a hash and validate across independent instances', async (t) => {
  const store = sessions(t);
  const issuer = store.load();
  const validator = store.load();
  const token = await issuer.createSessionToken();
  assert.match(token, /^[a-f0-9]{64}$/);
  const [document] = store.documents.values();
  assert.equal(document._id, `adminSession.${createHash('sha256').update(token).digest('hex')}`);
  assert.equal(document._type, 'adminSession');
  assert.equal(JSON.stringify(document).includes(token), false);
  assert.equal(await validator.isValidSessionToken(token), true);
  assert.equal(await validator.isValidSessionToken('authenticated'), false);
  assert.equal(await validator.isValidSessionToken(null), false);
  assert.equal(await validator.isValidSessionToken('0'.repeat(64)), false);
  await validator.revokeSessionToken(token);
  assert.equal(await issuer.isValidSessionToken(token), false);
});

test('expired or malformed expiry records cannot authenticate', async (t) => {
  const store = sessions(t);
  const session = store.load();
  const token = await session.createSessionToken();
  const [document] = store.documents.values();
  document.expiresAt = new Date(Date.now() - 1).toISOString();
  assert.equal(await session.isValidSessionToken(token), false);
  document.expiresAt = 'invalid';
  assert.equal(await session.isValidSessionToken(token), false);
});

test('storage failures fail closed and failed revocation does not remove a session', async (t) => {
  const store = sessions(t);
  const session = store.load();
  store.state.failCreate = true;
  await assert.rejects(session.createSessionToken());
  store.state.failCreate = false;
  const token = await session.createSessionToken();
  store.state.failRead = true;
  assert.equal(await session.isValidSessionToken(token), false);
  store.state.failRead = false;
  store.state.failDelete = true;
  await assert.rejects(session.revokeSessionToken(token));
  assert.equal(await session.isValidSessionToken(token), true);
});

test('missing project or server write token prevents session creation and validation', async (t) => {
  const store = sessions(t);
  const noProject = loadTs('lib/admin-session.ts', {
    'server-only': {},
    'next-sanity': { createClient() { throw new Error('Unexpected client'); } },
    '@/lib/sanity/client': { projectId: undefined, dataset: 'production', apiVersion: '2024-03-01' },
  });
  await assert.rejects(noProject.createSessionToken());
  assert.equal(await noProject.isValidSessionToken('a'.repeat(64)), false);
  const session = store.load();
  delete process.env.SANITY_API_WRITE_TOKEN;
  await assert.rejects(session.createSessionToken());
  assert.equal(await session.isValidSessionToken('a'.repeat(64)), false);
});

const nextServer = {
  NextResponse: {
    json(body, options) {
      const response = Response.json(body, options);
      response.cookies = new Map();
      response.cookies.set = (name, value, attributes) =>
        Map.prototype.set.call(response.cookies, name, { value, ...attributes });
      return response;
    },
    redirect(url) { return { redirect: url.pathname }; },
    next() { return { next: true }; },
  },
};

test('logout clears the cookie only after successful durable revocation', async () => {
  let fail = true;
  const route = loadTs('app/api/admin/logout/route.ts', {
    'next/server': nextServer,
    'next/headers': { cookies: async () => ({ get: () => ({ value: 'opaque-token' }) }) },
    '@/lib/admin-session': {
      SESSION_COOKIE: 'admin',
      async revokeSessionToken(token) {
        assert.equal(token, 'opaque-token');
        if (fail) throw new Error('Storage unavailable');
      },
    },
  });
  const failure = await route.POST();
  assert.equal(failure.status, 503);
  assert.equal((await failure.json()).success, false);
  assert.equal(failure.cookies.size, 0);
  fail = false;
  const success = await route.POST();
  assert.equal((await success.json()).success, true);
  assert.equal(success.cookies.get('admin').maxAge, 0);
});

test('proxy and requests endpoint await validation and reject invalid sessions', async () => {
  const session = { SESSION_COOKIE: 'admin', isValidSessionToken: async () => false };
  const proxy = loadTs('proxy.ts', {
    'next/server': nextServer,
    '@/lib/admin-session': session,
  });
  const request = {
    cookies: { get: () => ({ value: 'authenticated' }) },
    nextUrl: { pathname: '/portal-admin' },
    url: 'https://example.test/portal-admin',
  };
  assert.deepEqual(await proxy.proxy(request), { redirect: '/portal-admin/login' });
  session.isValidSessionToken = async () => true;
  assert.deepEqual(await proxy.proxy(request), { next: true });
  request.nextUrl.pathname = '/portal-admin/login';
  assert.deepEqual(await proxy.proxy(request), { redirect: '/portal-admin' });
  session.isValidSessionToken = async () => false;
  const route = loadTs('app/api/admin/requests/route.ts', {
    'next/server': nextServer,
    'next/headers': { cookies: async () => request.cookies },
    '@/lib/admin-session': session,
  });
  assert.equal((await route.GET()).status, 401);
});

test('login issues no cookie if durable session creation fails', async (t) => {
  const previous = process.env.ADMIN_PASSWORD;
  process.env.ADMIN_PASSWORD = 'test-password';
  t.after(() => {
    if (previous === undefined) delete process.env.ADMIN_PASSWORD;
    else process.env.ADMIN_PASSWORD = previous;
  });
  let fail = true;
  const route = loadTs('app/api/admin/login/route.ts', {
    'next/server': nextServer,
    '@/lib/admin-session': {
      SESSION_COOKIE: 'admin', SESSION_MAX_AGE: 604800,
      async createSessionToken() {
        if (fail) throw new Error('Storage unavailable');
        return 'opaque-token';
      },
    },
  });
  const request = (password) => new Request('https://example.test/api/admin/login', {
    method: 'POST', body: JSON.stringify({ password }),
  });
  const failure = await route.POST(request('test-password'));
  assert.equal(failure.status, 503);
  assert.equal(failure.cookies.size, 0);
  assert.equal((await route.POST(request('wrong'))).status, 403);
  fail = false;
  const success = await route.POST(request('test-password'));
  assert.equal(success.status, 200);
  assert.equal(success.cookies.get('admin').value, 'opaque-token');
  assert.equal(success.cookies.get('admin').httpOnly, true);
});

test('authenticated requests require an explicit Linear destination', async (t) => {
  const previousEnv = { ...process.env };
  const previousFetch = global.fetch;
  t.after(() => { process.env = previousEnv; global.fetch = previousFetch; });
  const mocks = {
    'next/server': nextServer,
    'next/headers': { cookies: async () => ({ get: () => ({ value: 'opaque-token' }) }) },
    '@/lib/admin-session': { SESSION_COOKIE: 'admin', isValidSessionToken: async () => true },
  };
  process.env.LINEAR_API_KEY = 'local-test-only';
  delete process.env.LINEAR_TEAM_ID;
  global.fetch = () => assert.fail('No implicit team destination is allowed');
  assert.equal((await loadTs('app/api/admin/requests/route.ts', mocks).GET()).status, 503);
  process.env.LINEAR_TEAM_ID = 'explicit-test-team';
  global.fetch = async (_url, options) => {
    assert.equal(JSON.parse(options.body).variables.teamId, 'explicit-test-team');
    return Response.json({ data: { issues: { nodes: [] } } });
  };
  const response = await loadTs('app/api/admin/requests/route.ts', mocks).GET();
  assert.equal(response.status, 200);
  assert.deepEqual((await response.json()).issues, []);
});
