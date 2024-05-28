# vite-ci

a mono repo for vite plug and util

## tech

- use tsup to build plugin
- use vite to build util
- use turbo to call npm-script
- use pnpm to manage npm package in project
- use mono repo with pnpm workspace feature
- use gh cli to sync repo between local repo and github repo

## script

```powershell
# poly repo or mono repo but only root ? do:
pnpm i
pnpm build
# pnpm vite:build
# pnpm dev
# pnpm types


# mono repo each sw do ? do:
pnpm -r i
pnpm -r build
# pnpm -r vite:build
# pnpm -r dev
# pnpm -r types

# mono repo some sw do ? do:
pnpm --filter $pkgname i
# pnpm --filter $pkgname dev
pnpm --filter $pkgname types
pnpm --filter $pkgname build
# pnpm --filter $pkgname vite:build

```

## custom chore

- custom mono repo based on pnpm/npm/yarn workspace feature with cli `yours` (yours not published)

- custom npm-script build for pluggable using of turbo/tsup/vite/webpack/rollup with cli `yours` (yours not published)

## Licence

MIT
