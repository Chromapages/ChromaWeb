const assert = require('node:assert/strict');
const { test } = require('node:test');
const { loadTs } = require('./load-ts.cjs');

const secret = 'revalidation-test-secret';

function route(t, configuredSecret = secret) {
  const previous = process.env.REVALIDATE_SECRET;
  if (configuredSecret === null) delete process.env.REVALIDATE_SECRET;
  else process.env.REVALIDATE_SECRET = configuredSecret;
  t.after(() => {
    if (previous === undefined) delete process.env.REVALIDATE_SECRET;
    else process.env.REVALIDATE_SECRET = previous;
  });

  const revalidated = [];
  const { POST } = loadTs('app/api/revalidate/route.ts', {
    'next/cache': { revalidatePath: (path) => revalidated.push(path) },
  });
  const post = (body) => POST(new Request('https://example.invalid/api/revalidate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }));
  return { post, revalidated };
}

for (const [name, value] of [['missing', null], ['blank', ' \t ']]) {
  test(`revalidation is unavailable with a ${name} server secret`, async (t) => {
    const { post, revalidated } = route(t, value);
    assert.equal((await post({ path: '/' })).status, 503);
    assert.deepEqual(revalidated, []);
  });
}

test('revalidation rejects an incorrect or missing secret', async (t) => {
  const { post, revalidated } = route(t);
  for (const invalid of ['wrong', undefined, 123]) {
    assert.equal((await post({ secret: invalid, path: '/' })).status, 401);
  }
  assert.deepEqual(revalidated, []);
});

test('revalidation rejects invalid batches before invalidating any path', async (t) => {
  const { post, revalidated } = route(t);
  for (const body of [
    { path: '/portal-admin' },
    { path: '/work/[slug]' },
    { path: '/services/site?preview=true' },
    { paths: '/work' },
    { paths: ['/work', '/work/another/nested'] },
    { paths: ['/work', null] },
    { paths: [] },
  ]) {
    assert.equal((await post({ secret, ...body })).status, 400);
  }
  assert.deepEqual(revalidated, []);
});

test('revalidation accepts an authenticated batch of marketing routes and literal slugs', async (t) => {
  const { post, revalidated } = route(t);
  const paths = ['/', '/pricing', '/services/site-refresh', '/work/client-2026'];
  const response = await post({ secret, path: paths[0], paths: paths.slice(1) });
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { success: true, revalidated: paths });
  assert.deepEqual(revalidated, paths);
});
