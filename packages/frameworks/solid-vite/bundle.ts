import { build } from 'tsup';
import fs from 'fs';

const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
const { devDependencies, dependencies } = packageJson;
const external = [...Object.keys({ ...devDependencies, ...dependencies })];
const entry = ['src/preset.ts', 'src/index.ts'];

build({
  entry,
  clean: true,
  outDir: 'dist',
  format: ['cjs'],
  target: 'node16',
  platform: 'node',
  external,
  esbuildOptions: (c) => {
    c.platform = 'node';
  },
  outExtension() {
    return {
      js: '.js',
    };
  },
});
