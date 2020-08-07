import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import resolve from 'rollup-plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import cssimport from 'postcss-import';
import autoprefixer from 'autoprefixer';
import react from 'react';

import pkg from './package.json';

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      exports: 'named',
      sourcemap: true
    }
  ],
  plugins: [
    external(),
    resolve(),
    typescript({
      rollupCommonJSResolveHack: true,
      clean: true
    }),
    commonjs({
      include: [
        'node_modules/**'
      ],
      namedExports: {
        react: Object.keys(react),
        'node_modules/react-dom/index.js': ['render']
      }
    }),
    postcss({
      plugins : [ cssimport(), autoprefixer() ]
    })  
  ]
};
