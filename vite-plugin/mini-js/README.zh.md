一个 Vite 插件库包，用于 yors 包，用于在 dist 中压缩 js 文件。

## 当前功能

- 压缩输出的 .js 文件，压缩后的文件名为在原文件名后缀前添加 min 标识，
- 在文件头部添加 banner 信息 (可选)

## 用户安装

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
