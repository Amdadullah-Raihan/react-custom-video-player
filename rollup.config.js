import postcss from "rollup-plugin-postcss";
import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: "src/index.js",
  output: [
    {
      file: "dist/index.cjs.js",
      format: "cjs",
      exports: "auto",
    },
    {
      file: "dist/index.esm.js",
      format: "esm",
    },
    {
      file: "dist/index.umd.js",
      format: "umd",
      name: "VideoPlayer",
      globals: {
        react: "React",
      },
    },
  ],
  external: ["react", "react-dom"],
  plugins: [
    resolve(),
    commonjs(),
    postcss({
      extract: true, // ✅ This creates a separate .css file
      minimize: true, // Optional: minify CSS
    }),
    babel({
      exclude: "node_modules/**",
      babelHelpers: "bundled",
    }),
  ],
};
