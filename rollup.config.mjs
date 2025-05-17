// rollup.config.mjs
import typescript from '@rollup/plugin-typescript';
import { defineConfig } from 'rollup';

export default defineConfig({
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'esm',
    preserveModules: true,
    preserveModulesRoot: 'src',
    entryFileNames: '[name].js',
  },
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: 'dist/types',
    }),
  ],
});
