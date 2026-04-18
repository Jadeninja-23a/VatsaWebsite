# Pure Path: Water Purification Game

This folder is the deployable website root.

## What is inside

- `index.html` is the main Vatsa homepage.
- `scenario-challenges/` contains the built React simulator from `../de250-main`.
- `assets/` contains the shared images used by the homepage.

## Local preview

1. Start a local web server from this folder:

```bash
python3 -m http.server 4173
```

2. Open `http://localhost:4173/`
3. Click `Scenario Challenges` to open the React simulator subpage.

Do not open `scenario-challenges/index.html` directly with `file://`.
The React bundle needs to be served over HTTP, which Netlify does automatically.

## Rebuild the React simulator

If you change files inside `de250-main`, rebuild the hosted subpage with:

```bash
cd de250-main
npm ci
npm run build:vatsa
```

That command writes the deployable simulator files into `VatsaWebsite/scenario-challenges/`.

## Netlify

- Publish directory: `VatsaWebsite`
- Build command:
  - Optional if the built `scenario-challenges/` files are already committed: leave blank
  - Recommended if Netlify should rebuild the React simulator on each deploy: `cd de250-main && npm ci && npm run build:vatsa`
- If your GitHub repo root is already the contents of `VatsaWebsite`, Netlify can use:
  - Publish directory: `.`
  - Build command: leave blank, or `cd ../de250-main && npm ci && npm run build:vatsa` only if that folder is also present in the repo
