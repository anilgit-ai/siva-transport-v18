# Siva Transport — Angular 18 fixed dependency setup

Your environment:
- Node 20.20.1
- npm 10.8.2
- Angular CLI 18.2.21

Important: Angular CLI 18.2.21 is available, but Angular v18 LTS compiler/core packages use 18.2.14. This project intentionally uses Angular framework/compiler 18.2.14 and CLI/build-angular 18.2.21.

## Windows PowerShell

```powershell
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
npm cache verify
npm install
npm run dev
```

Open:
- http://localhost:4200
- http://localhost:3000

Verify:
```powershell
npx ng version
```

Do not use --force or --legacy-peer-deps.
