# Siva Transport — Angular 18

Aligned with Angular CLI 18.2.21, Angular 18.2.21 packages, Node 20.20.1, npm 10.8.2, RxJS 7.8.1, and TypeScript 5.5.4.

## Install

```powershell
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
npm install
npm run dev
```

Angular: http://localhost:4200
JSON Server: http://localhost:3000

Check: `npx ng version`

Do not use `--force` or `--legacy-peer-deps`; all Angular packages are pinned to the same version.
