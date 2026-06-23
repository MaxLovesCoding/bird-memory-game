# Learning Toy Box

A learning game suite for kids — Kindergarten toy box games and 5th grade math, reading comprehension, and spelling. Touch-friendly on phones and tablets.

**Live app:** https://bird-memory-game.vercel.app  
**GitHub:** https://github.com/MaxLovesCoding/bird-memory-game

Pushes to `main` auto-deploy to Vercel.

## Grade levels

Open the app and pick **Kindergarten** or **5th Grade**. Use **Switch grade** on any hub to go back.

### Kindergarten Toy Box

| Game | Skill |
|------|-------|
| **Memory Match** | Visual memory — flip cards to find pairs |
| **Count & Tap** | Count objects 1–5 |
| **Letter Hunt** | Uppercase letter recognition |
| **Rhyme Time** | Pick the rhyming word |
| **Spell It** | Fill in the missing letter |

### 5th Grade Games

| Game | Skill |
|------|-------|
| **Math Challenge** | Multiplication, fractions, word problems |
| **Story Lab** | Reading comprehension — plot, motivation, emotions |
| **Spell Check** | Pick the correctly spelled word |

Sound toggle on the home screen and hubs controls chimes and spoken prompts.

## Run locally

```bash
cd ~/Projects/bird-memory-game
npm install
npm run dev
```

## Routes

- `#/` — grade picker
- `#/k` — Kindergarten hub
- `#/k/memory`, `#/k/count`, etc.
- `#/g5` — 5th grade hub
- `#/g5/math`, `#/g5/read`, `#/g5/spell`

## Build

```bash
npm run build
npm run preview
```
