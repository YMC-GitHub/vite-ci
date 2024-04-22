/* eslint-disable prefer-const */

import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";

// import fg from 'fast-glob';

// a library package to make banner text from data like package.json
// recommended-lib-name: banz-strm-from-flag,@nano/banz-strm-from-flag,@banz/strm-from-flag
// keywords: nano,banz,strm-from-flag

export interface BanzFlag {
  // [x: string]: string | undefined;
  name: string;
  version: string;
  description: string;
  author: string;
  homepage: string;
}
export type BanzFlagLike = Partial<BanzFlag>;
export function makeBannerText(pkg: BanzFlagLike) {
  return `/**\n * name: ${pkg.name}\n * version: v${pkg.version}\n * description: ${pkg.description}\n * author: ${pkg.author}\n * homepage: ${pkg.homepage}\n */`;
}

// a library package to make umd exports.name
// recommended-lib-name: umd-name-std,@nano/umd-name-std,@umd/name-std
// keywords: nano,umd,name-std
/**
 *
 * @sample
 * ```
 * "@nana/snow-fall" -> nanasnowfall
 * stdUmdName("@nana/snow-fall" )
 *
 * "@nana/snow-fall" -> "@nana/snow-fall"
 * stdUmdName("@nana/snow-fall",false)
 * ```
 */
export function stdUmdName(name: string, trim: boolean = true) {
  // - replace / to '', replace @ to ''
  if (!trim) return name;
  return name.replace(/[@/]/gi, "").replace(/-/gi, "");
}

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

export function bundoptsify(opts?: BundTypeOptionLike) {
  let res: BundTypeOption = { ...builtinBundTypeOption, ...(opts ? opts : {}) };
  return res;
}

export function viteplugify(plugOpts?: BundTypeOptionLike) {
  let option = bundoptsify(plugOpts);
  if (!option.root) option.root = path.join(__dirname);
  // console.log(option);
  return {
    name: option.name ? option.name : "generate-types",
    async closeBundle() {
      let { tsTypeOutDir, root } = option;
      let location: string = path.join(root, tsTypeOutDir);
      if (process.env.NODE_ENV === "test") return;
      removeTypes(location);
      await generateTypes(option.npmScriptName);
      moveTypesToDist(option);
      removeTypes(location);
    },
  };
}

function removeTypes(loc: string) {
  console.log(`[types] declaration remove`);
  fs.rmSync(loc, {
    recursive: true,
    force: true,
  });
}

function generateTypes(npmScriptName: string = "types") {
  return new Promise((resolve) => {
    const cp = spawn(
      process.platform === "win32" ? "npm.cmd" : "npm",
      ["run", npmScriptName],
      { stdio: "inherit" }
    );
    cp.on("exit", (code) => {
      !code && console.log("[types]", "declaration generated");
      resolve(code);
    });
    cp.on("error", process.exit);
  });
}

function moveTypesToDist(opts: BundTypeOption) {
  let { tsTypeOutDir, jsfileSrcDir, jsfileOutDir, root } = opts;
  let types = path.join(root, tsTypeOutDir, jsfileSrcDir);
  const dist = path.join(root, jsfileOutDir);
  // use types when types/lib not exsits for file in src  disable -> types/src not exist
  if (!fs.existsSync(types)) types = path.join(root, tsTypeOutDir);
  if (!fs.existsSync(types)) return;
  let files = fs.readdirSync(types).filter((n) => n.endsWith(".d.ts"));

  // ignore test files
  files = files.filter((name) => !name.endsWith(".test.d.ts"));
  for (const file of files) {
    fs.copyFileSync(path.join(types, file), path.join(dist, file));
    console.log(
      "[types]",
      `${tsTypeOutDir}/${file} -> ${jsfileOutDir}/${file}`
    );
  }
}
