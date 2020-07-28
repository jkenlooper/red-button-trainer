import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import postcss from "rollup-plugin-postcss";
import postcssImport from "postcss-import";
import postcssURL from "postcss-url";
import postcssPresetEnv from "postcss-preset-env";
import postcssCustomMedia from "postcss-custom-media";

const isProduction =
  !process.env.ROLLUP_WATCH && process.env.NODE_ENV === "production";

export default {
  input: {
    app: "src/index.js",
  },
  output: {
    entryFileNames: "[name].bundle.js",
    dir: "dist",
    format: "module",
    sourcemap: true,
  },
  plugins: [
    postcss({
      to: "dist/app.bundle.css",
      sourceMap: !isProduction,
      extract: true,
      minimize: isProduction,
      plugins: [
        postcssImport({ root: "src/" }),
        postcssCustomMedia(),
        postcssURL({
          url: "copy",
          basePath: "./",
          assetsPath: "dist",
        }),
        postcssPresetEnv(),
      ],
    }),
    nodeResolve(),
    commonjs(),
    isProduction &&
      terser({
        compress: {
          drop_console: true,
        },
      }), // minify, but only in production
  ],
};
