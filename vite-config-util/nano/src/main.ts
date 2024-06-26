// a library package to make banner text from data like package.json
// recommended-lib-name: banz-strm-from-flag,@nano/banz-strm-from-flag,@banz/strm-from-flag
// keywords: nano,banz,strm-from-flag

// export interface BanzFlag {
//   // [x: string]: string | undefined;
//   name: string;
//   version: string;
//   description: string;
//   author: string;
//   homepage: string;
// }
// export type BanzFlagLike = Partial<BanzFlag>;
// export function makeBannerText(pkg: BanzFlagLike) {
//   return `/**\n * name: ${pkg.name}\n * version: v${pkg.version}\n * description: ${pkg.description}\n * author: ${pkg.author}\n * homepage: ${pkg.homepage}\n */`;
// }

export type PkgInfo = Record<string, any>;
function cookBannerKeys(keys: string | string[]) {
  return typeof keys == "string"
    ? keys.split(",").filter((v) => v.trim())
    : keys;
}
// function cookBannerData(data: PkgInfo, keys: string | string[]) {
//   let ls = cookBannerKeys(keys);
//   let res: Record<string, any> = {};
//   for (let index = 0; index < ls.length; index++) {
//     const key = ls[index];
//     res[key] = data[key];
//     // if (!res[key]) res[key] = "";
//   }
//   return res;
// }
/**
 *
 * @sample
 * ```
 * import pkg from "./package.json";
 * let banner = cookBannerText(pkg, "name,version");
 * ```
 */
export function cookBannerText(
  data: PkgInfo,
  keys: string | string[] = "name,version,description,author,homepage"
) {
  let ls = cookBannerKeys(keys);
  let res: string[] = ["/**"];
  for (let index = 0; index < ls.length; index++) {
    const key = ls[index];
    let val = data[key];
    if (val) {
      res.push(` * ${key}:${val}`);
    }
  }
  res.push(` */`);
  return res.join("\n");
}

export { cookBannerText as makeBannerText };

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

// import type { LibraryFormats } from "vite";
import type { ModuleFormat } from "rollup";
// type fn = (format: ModuleFormat, entryName: string) => string;
/**
 *
 * @sample
 * ```ts
 * // 1 -> mjs,js
 * burnFuncToMakeFilename("1")
 *
 * // 2 -> js,cjs,umd.cjs
 *
 * // 3 -> mjs,cjs,
 *
 * // 4 -> mjs,cjs,umd.js
 *
 * // 5 -> js,cjs,umd.js
 *
 * // 6 -> mjs,cjs,umd.js
 * ```
 */
export function burnFuncToMakeFilename(preset: string = "") {
  // mjs,js
  if (preset == "1") {
    return function (format: ModuleFormat): string {
      return format === "es" ? "[name].mjs" : "[name].js";
    };
  } else if (preset == "2") {
    // js,cjs,umd.cjs

    return (format: ModuleFormat) =>
      format === "es"
        ? "[name].js"
        : format === "umd"
        ? "[name].umd.cjs"
        : "[name].cjs";
  } else if (preset == "3") {
    // mjs,cjs
    return (format: ModuleFormat) =>
      format === "es" ? "[name].mjs" : "[name].cjs";
  } else if (preset == "4") {
    // mjs,cjs,umd.js
    return (format: ModuleFormat) =>
      format === "es"
        ? "[name].mjs"
        : format === "umd"
        ? "[name].umd.js"
        : "[name].cjs";
  } else if (preset == "5") {
    // js,cjs,umd.js

    return (format: ModuleFormat) =>
      format === "es"
        ? "[name].js"
        : format === "umd"
        ? "[name].umd.js"
        : "[name].cjs";
  } else if (preset == "6") {
    // mjs,cjs,umd.js

    return (format: ModuleFormat) =>
      format === "es"
        ? "[name].mjs"
        : format === "umd"
        ? "[name].umd.js"
        : "[name].js";
  }

  // mjs,js
  return (format: ModuleFormat) =>
    format === "es" ? "[name].mjs" : "[name].js";
}
