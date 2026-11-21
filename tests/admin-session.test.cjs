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
  const mocks = {
    'server-only': {},
    'next/headers': { cookies: async () => request.cookies },
    '@/lib/admin-session': session,
  };
  const list = loadTs('app/api/admin/requests/route.ts', mocks);
  const update = loadTs('app/api/admin/requests/[id]/route.ts', mocks);
  assert.equal((await list.GET()).status, 401);
  assert.equal((await update.PATCH(updateRequest({ status: 'done' }), updateContext())).status, 401);
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

const storedRequest = {
  id: '350eff2e-95d8-4239-a37d-5f76e07ea29d', reference: 'REQ-0001', status: 'new', requestType: 'prospect',
  name: 'Offline Example', email: 'offline@example.invalid', company: '', projectType: '', budgetRange: '',
  message: 'A synthetic inquiry.', notes: '',
  createdAt: '2026-11-21T10:00:00.000Z', updatedAt: '2026-11-21T10:00:00.000Z',
};
const updateContext = (id = storedRequest.id) => ({ params: Promise.resolve({ id }) });
const updateRequest = (data) => new Request(`https://site.invalid/api/admin/requests/${storedRequest.id}`, {
  method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data),
});

function authenticatedRoutes(t) {
  const previous = { ...process.env };
  t.after(() => { process.env = previous; });
  process.env.WORKER_URL = 'https://worker.invalid/';
  process.env.WORKER_SECRET = 'offline-worker-token';
  const mocks = {
    'server-only': {},
    'next/headers': { cookies: async () => ({ get: () => ({ value: 'opaque-token' }) }) },
    '@/lib/admin-session': { SESSION_COOKIE: 'admin', isValidSessionToken: async (value) => value === 'opaque-token' },
  };
  return {
    GET: loadTs('app/api/admin/requests/route.ts', mocks).GET,
    PATCH: loadTs('app/api/admin/requests/[id]/route.ts', mocks).PATCH,
  };
}

test('authenticated request list requires Worker config and verifies the returned records', async (t) => {
  const { GET } = authenticatedRoutes(t);
  let reply = { ok: true, requests: [{ ...storedRequest, internal: 'not returned' }] };
  const fetchMock = t.mock.method(global, 'fetch', async (url, options) => {
    assert.equal(url, 'https://worker.invalid/requests');
    assert.equal(options.method, 'GET');
    assert.equal(options.headers.get('authorization'), 'Bearer offline-worker-token');
    assert.equal(options.cache, 'no-store');
    return Response.json(reply);
  });
  delete process.env.WORKER_SECRET;
  assert.equal((await GET()).status, 503);
  assert.equal(fetchMock.mock.callCount(), 0);
  process.env.WORKER_SECRET = 'offline-worker-token';
  const response = await GET();
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.deepEqual(await response.json(), { success: true, requests: [storedRequest] });
  reply = { ok: true, requests: [{ ...storedRequest, status: 'unknown' }] };
  assert.equal((await GET()).status, 502);
});

test('authenticated PATCH validates id/fields and maps Worker errors without exposing them', async (t) => {
  const { PATCH } = authenticatedRoutes(t);
  const changes = { status: 'in_review', notes: '  QA\nreviewed ✓  ' };
  const updated = { ...storedRequest, ...changes, updatedAt: '2026-11-21T11:20:00.000Z' };
  let respond = () => Response.json({ ok: true, request: updated });
  const fetchMock = t.mock.method(global, 'fetch', async (url, options) => {
    assert.equal(url, `https://worker.invalid/requests/${storedRequest.id}`);
    assert.equal(options.method, 'PATCH');
    assert.equal(options.headers.get('authorization'), 'Bearer offline-worker-token');
    assert.deepEqual(JSON.parse(options.body), changes);
    return respond();
  });
  for (const body of [{}, { status: 'invalid' }, { notes: 'x'.repeat(5001) }, { ...changes, email: 'not-allowed' }]) {
    assert.equal((await PATCH(updateRequest(body), updateContext())).status, 400);
  }
  assert.equal((await PATCH(updateRequest(changes), updateContext('../alternate'))).status, 400);
  delete process.env.WORKER_SECRET;
  assert.equal((await PATCH(updateRequest(changes), updateContext())).status, 503);
  assert.equal(fetchMock.mock.callCount(), 0);
  process.env.WORKER_SECRET = 'offline-worker-token';
  const accepted = await PATCH(updateRequest(changes), updateContext());
  assert.equal(accepted.status, 200);
  assert.deepEqual(await accepted.json(), { success: true, request: updated });
  const uppercase = await PATCH(updateRequest(changes), updateContext(storedRequest.id.toUpperCase()));
  assert.equal(uppercase.status, 200);
  assert.deepEqual(await uppercase.json(), { success: true, request: updated });
  for (const [status, reply] of [
    [404, () => new Response('private upstream diagnostic', { status: 404 })],
    [502, () => Response.json({ ok: true, request: { ...updated, requestType: 'unknown' } })],
    [502, () => Response.json({ ok: true, request: { ...updated, id: '64ceca7b-3684-43d7-8791-591a55e8de75' } })],
    [504, () => { throw new DOMException('private upstream diagnostic', 'TimeoutError'); }],
  ]) {
    respond = reply;
    const response = await PATCH(updateRequest(changes), updateContext());
    assert.equal(response.status, status);
    assert.doesNotMatch(await response.text(), /private upstream diagnostic/);
  }
});
