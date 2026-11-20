const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');

// Execute the actual TS/TSX modules with boundary mocks; no extra test dependency.
exports.loadTs = function loadTs(relativePath, mocks = {}) {
  const root = path.resolve(__dirname, '..');
  const cache = new Map();
  function load(filename) {
    filename = [filename, `${filename}.ts`, `${filename}.tsx`].find(
      (candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile(),
    );
    if (!filename) throw new Error('Test module not found');
    if (cache.has(filename)) return cache.get(filename).exports;
    const mod = new Module(filename, module);
    mod.filename = filename;
    mod.paths = Module._nodeModulePaths(path.dirname(filename));
    cache.set(filename, mod);
    const originalRequire = mod.require.bind(mod);
    mod.require = (id) => {
      if (Object.hasOwn(mocks, id)) return mocks[id];
      if (id.startsWith('@/')) return load(path.join(root, id.slice(2)));
      if (id.startsWith('.')) return load(path.resolve(path.dirname(filename), id));
      return originalRequire(id);
    };
    mod._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
      fileName: filename,
    }).outputText, filename);
    return mod.exports;
  }
  return load(path.join(root, relativePath));
};
