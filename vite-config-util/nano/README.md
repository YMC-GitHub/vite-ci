a library package to simplify vite config, classified as nano

## usage

- install with npm package tool:

```bash
# npm i @yors/vite-plugin-util-nano @yors/vite-plugin-make-type @yors/vite-plugin-mini-js  --save-dev

# yarn add @yors/vite-plugin-util-nano @yors/vite-plugin-make-type @yors/vite-plugin-mini-js  -D

pnpm add @yors/vite-plugin-util-nano @yors/vite-plugin-make-type @yors/vite-plugin-mini-js -D
```

- a vite config demo:

```ts
import path from "node:path";
import { builtinModules } from "node:module";
import { defineConfig } from "vite";
import type { LibraryFormats } from "vite";
import minijsindist from "@yors/vite-plugin-mini-js";
import { viteplugify as maketypetodist } from "@yors/vite-plugin-make-type";
import {
  makeBannerText,
  stdUmdName,
  burnFuncToMakeFilename,
} from "@yors/vite-plugin-util-nano";

import pkg from "./package.json";
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
  maketypetodist(typeoption),
  minijsindist({ banner: bannerText }),
];
export default defineConfig({
  build: {
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
```
