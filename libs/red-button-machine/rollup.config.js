import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import typescript from "@rollup/plugin-typescript";

const isProduction =
  !process.env.ROLLUP_WATCH && process.env.NODE_ENV === "production";

export default {
  external: ["@xstate/fsm"],
  input: {
    "red-button-machine": "src/index.js",
  },
  output: {
    entryFileNames: "[name].bundle.js",
    dir: "dist",
    format: "module",
    sourcemap: true,
    globals: {
      "@xstate/fsm": "xstate",
    },
  },
  plugins: [
    nodeResolve(),
    typescript(),
    commonjs(),
    isProduction &&
      terser({
        compress: {
          drop_console: true,
        },
      }), // minify, but only in production
  ],
};
