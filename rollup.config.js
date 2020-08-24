import typescript from "rollup-plugin-typescript2";
import external from "rollup-plugin-peer-deps-external";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import babel from '@rollup/plugin-babel';
import cleanup from 'rollup-plugin-cleaner';

import pkg from "./package.json";
const extensions = ['.js', '.ts'];

export default {
  input: "lib/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      exports: "named",
    },
    {
      file: pkg.module,
      format: "es",
      exports: "named",
    }
  ],
  plugins: [
    cleanup({
      targets: [
        './dist/',
      ]
    }),
    external(),
    resolve(extensions),
    typescript({
      rollupCommonJSResolveHack: true,
      exclude: "**/tests/**",
      clean: true,
      useTsconfigDeclarationDir: true,
    }),
    commonjs({
      include: ["node_modules/**"],
    }),
    babel({
      extensions,
      include: ['lib/**/*'],
      babelHelpers: 'runtime',
    }),
  ]
};
