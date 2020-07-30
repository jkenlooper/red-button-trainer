import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import nodeResolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import postcssImport from "postcss-import";
import postcssURL from "postcss-url";
import postcssPresetEnv from "postcss-preset-env";
import postcssCustomMedia from "postcss-custom-media";

const isProduction =
  !process.env.ROLLUP_WATCH && process.env.NODE_ENV === "production";

export default {
  external: ["react", "react-dom"],
  input: {
    app: "src/index.js",
  },
  output: {
    entryFileNames: "[name].bundle.js",
    dir: "dist",
    format: "module",
    sourcemap: true,
    globals: {
      react: "React",
      "react-dom": "ReactDom",
    },
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
    // Use babel for handling react jsx code
    babel({
      babelHelpers: "bundled",
      skipPreflightCheck: true,
      presets: ["@babel/preset-react"],
    }),
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
