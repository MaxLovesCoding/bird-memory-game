# Toy Box

A kindergarten learning toy box for kids — memory, counting, letters, rhymes, and spelling. Built for touch-friendly play on phones and tablets.

**Live app:** https://bird-memory-game.vercel.app  
**GitHub:** https://github.com/MaxLovesCoding/bird-memory-game

Pushes to `main` auto-deploy to Vercel.

## Games

| Game | Skill |
|------|-------|
| **Memory Match** | Visual memory — flip cards to find pairs (birds, insects, or planets) |
| **Count & Tap** | Count objects 1–5 and tap the right number |
| **Letter Hunt** | Recognize uppercase letters A–Z |
| **Rhyme Time** | Pick the word that rhymes |
| **Spell It** | Fill in the missing letter (e.g. `_AT` → C) |

Open the app → pick a game from the toy box → tap **Back** to return home.

Use the **Sound on / off** button on the home screen to toggle chimes and spoken word prompts.

## Run locally

```bash
cd ~/Projects/bird-memory-game
npm install
npm run dev
```

For phone/tablet on the same Wi‑Fi:

```bash
npm run dev -- --host
```

## Build

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  hub.js              # Toy box home screen + sound toggle
  router.js           # Hash routing between games
  shared/sound.js     # Chimes, speech, sound preference
  games/
    memory/           # Memory match (3 themes)
    count-tap/        # Counting game
    letter-hunt/      # Letter recognition
    rhyme-time/       # Rhyming words
    spell-it/         # Missing-letter spelling
```
