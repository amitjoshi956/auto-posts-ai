// esbuild.config.js
import { build } from 'esbuild';

build({
  entryPoints: ['./src/index.ts'],
  bundle: true,
  platform: 'node',
  target: 'node22',
  outfile: './build/index.js',
  sourcemap: false,
  external: ['express'], // don't bundle node_modules
  tsconfig: './tsconfig.json',
  format: 'cjs',
}).catch(() => process.exit(1));
