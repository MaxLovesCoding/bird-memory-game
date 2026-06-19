# Bird Match!

A simple bird memory matching game for kids — flip cards to find matching bird pairs.

## How to play

1. Choose **4 pairs** (easier) or **6 pairs** (more birds!)
2. Tap **Play!**
3. Tap two cards to flip them over
4. If the birds match, they stay face up
5. Find all the pairs to win!

Each game picks a random set of birds from a flock of 10.

**Live game:** https://bird-memory-game.vercel.app  
**GitHub repo:** https://github.com/MaxLovesCoding/bird-memory-game

Pushes to `main` auto-deploy to Vercel.

## Run locally

```bash
cd ~/Projects/bird-memory-game
npm install
npm run dev
```

Open the URL shown in your terminal (usually `http://localhost:5173`).

To play on a phone or tablet on the same Wi‑Fi network (at home only):

```bash
npm run dev -- --host
```

Then open the network URL from the terminal on your device.

## Play on your phone while traveling

`localhost` and `--host` only work on your home network. To open the game in Safari anywhere you have cell data or Wi‑Fi, put the built app on the public web. It is still a normal website — not a native App Store app — but it works great in Safari and can be added to your home screen.

### Recommended path: Vercel (free, ~5 minutes)

1. Push this project to GitHub
2. Sign up at [vercel.com](https://vercel.com) and import the repo
3. Vercel auto-detects Vite — click Deploy
4. You get a URL like `bird-match.vercel.app`
5. On your iPhone: open the URL in Safari → Share → **Add to Home Screen**

The included `manifest.webmanifest` makes the home-screen icon feel app-like (full-screen, no browser chrome).

### Other free options

| Service | Good for |
|---------|----------|
| [Netlify](https://netlify.com) | Drag-and-drop the `dist/` folder after `npm run build` |
| [Cloudflare Pages](https://pages.cloudflare.com) | Git-connected deploys, fast globally |
| [GitHub Pages](https://pages.github.com) | Simple hosting if the repo is already on GitHub |

All of these host static files only — no server to maintain, and free tiers are plenty for a family game.

### What about offline (no internet on a plane)?

That needs a **service worker** so the game caches on first visit. Possible as a follow-up, but not required for most travel if you have cell data or hotel Wi‑Fi.

## Build for sharing

```bash
npm run build
npm run preview
```

The built files are in `dist/` and can be hosted anywhere static files work.
