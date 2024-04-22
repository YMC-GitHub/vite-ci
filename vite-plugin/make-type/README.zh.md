# @yors/vite-plugin-make-type

一个库包，作为 Vite 插件 ， 用于 yors 包，生成 d.ts 文件

## 工作流程

- 调用 `npm run types` 生成 d.ts
- 复制 d.ts 到 JS 输出文件目录
- 删除 npm-script 生成的 d.ts

## 使用示例

```bash
npm i @yors/vite-plugin-make-type --save-dev

```

```bash
yarn add @yors/vite-plugin-make-type -D
```

```bash
pnpm add @yors/vite-plugin-make-type -D
```

```ts
import { defineConfig } from "vite";
import { viteplugify as maketypetodist } from "@yors/vite-plugin-make-type";

let plugins = [maketypetodist()];
export default defineConfig({
  plugins: plugins,
});
```

## 自定选项

- 支持自定 npm-script-name
- 支持自定插件名字 name
- 支持自定 JS 输入文件目录 默认为 lib
- 支持自定 JS 输出文件目录 默认为 dist
- 支持自定 d.ts 输出文件目录 默认为 types

```ts
export interface BundTypeOption {
  name: string;
  tsTypeOutDir: string;
  jsfileSrcDir: string;
  jsfileOutDir: string;
  npmScriptName: string;
  root: string;
}
export type BundTypeOptionLike = Partial<BundTypeOption>;
export const builtinBundTypeOption = {
  tsTypeOutDir: "types",
  jsfileSrcDir: "lib",
  jsfileOutDir: "dist",
  npmScriptName: "types",
  name: "generate-types",
  // root: process.cwd(),
  root: "",
};
```

## 版权许可

MIT
