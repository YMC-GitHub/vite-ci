# @yors/vite-plugin-mini-js

a vite plugin library package for yors packages to compress js files in dist and do more.

## Features

- compress js files in dist and add the 'min' label to the file name in front of the file name suffix.
- add banner infomation to these js files

## Usage

```bash
npm i @yors/vite-plugin-mini-js --save-dev

```

```bash
yarn add @yors/vite-plugin-mini-js -D
```

```bash
pnpm add @yors/vite-plugin-mini-js -D
```

```ts
interface VitePluginNanoOption {
  [attr: string]: any;
  disable?: boolean;
  label: string;
  skipExt: string;
  allowExt: string;
  banner: string;
}
```

```ts
import { defineConfig } from "vite";
import nanoMiniDist from "@yors/vite-plugin-mini-js";
let plugins = [
  nanoMiniDist({
    disable: false,
    allowExt: ".js,.cjs",
    skipExt: ".test.js,.test.cjs",
    // banner:'your banner here',
  }),
];
export default defineConfig({
  plugins: plugins,
});
```
