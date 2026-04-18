# Pure Path: Water Purification Game

This folder is the deployable website root.

## What is inside

- `index.html` is the main Vatsa homepage.
- `scenario-challenges/` contains the built React simulator from `../de250-main`.
- `assets/` contains the shared images used by the homepage.

## Local preview

1. Open `index.html` in a browser for a quick static preview.
2. Click `Scenario Challenges` to open the React simulator subpage.

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
