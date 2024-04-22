import path from "node:path";
import { builtinModules } from "node:module";
import { defineConfig } from "vite";
import type { LibraryFormats } from "vite";
// import plainText from 'vite-plugin-plain-text';
// import banner from 'vite-plugin-banner'
// import eslint from "vite-plugin-eslint";
// import minijsindist from "../mini-js";
// pnpm --filter vite-plugin-${name} add -D @yors/vite-plugin-mini-js
import minijsindist from "@yors/vite-plugin-mini-js";

import { viteplugify as maketypetodist } from "@yors/vite-plugin-make-type";

import { makeBannerText, stdUmdName, burnFuncToMakeFilename } from "./src/main";

import pkg from "./package.json";
// import fg from 'fast-glob';
// prefer-const

const isDevEnv = process.argv.slice(2).includes("--watch");
const jsfileOutDir: string = "dist";
const tsTypeOutDir: string = "types";
const jsfileSrcDir = "src";
const jslibformats: LibraryFormats[] = ["cjs", "es", "umd"];
let typeoption = {
  jsfileOutDir,
  tsTypeOutDir,
  jsfileSrcDir,
  root: path.join(__dirname),
};

let bannerText = makeBannerText(pkg);
let plugins = [
  // react(),
  // isDevEnv ? eslint({ lintOnStart: true, cache: false }) : undefined,
  // allow all *.md files can be import as es module
  // plainText(['*.md'], { namedExport: false, dtsAutoGen: true, distAutoClean: true },),
  maketypetodist(typeoption),
  // banner(bannerText),
  minijsindist({ banner: bannerText }),
];

// console.log(stdUmdName(pkg.name))
export default defineConfig({
  build: {
    // terserOptions: {
    //     compress: {
    //         drop_console: true,
    //         drop_debugger: true,
    //     },
    // },
    // minify: !isDevEnv?'terser':false,
    minify: false,
    outDir: jsfileOutDir,
    emptyOutDir: !isDevEnv,
    // target: 'node14',
    lib: {
      entry: [jsfileSrcDir, "main.ts"].join("/"),
      name: stdUmdName(pkg.name, false),
      formats: jslibformats,
      // fileName: format => format === 'es' ? '[name].mjs' : '[name].js',
      fileName: burnFuncToMakeFilename("6"),
    },
    rollupOptions: {
      external: [
        "vite",
        ...builtinModules,
        ...builtinModules.map((m) => `node:${m}`),
        ...Object.keys(
          "dependencies" in pkg ? (pkg.dependencies as object) : {}
        ),
      ],
      output: {
        exports: "named",
      },
    },
  },
  plugins: plugins.filter((v) => v),
});
