# Ghost Signal

Browser audio themes built entirely with the Web Audio API — no samples, no
dependencies, no build step. Each theme is an ES module with 16 synthesized UI
sounds, loaded by a shared demo page.

## Themes

| Theme | Mood |
|---|---|
| [Ghost Signal](demo.html?theme=ghost-signal) | Cyberpunk-noir — chrome, neon, and rain |
| [Chill City FM](demo.html?theme=chill-city-fm) | Warm lo-fi retro — CRT, VHS, boombox, wood paneling |
| [Orbit Deck](demo.html?theme=orbit-deck) | Near-future EVA — spacesuit seals, visor HUD, radio comms |

## Try It

Open `demo.html?theme=<theme-name>` in a browser, click "Click to initialise
AudioContext", and interact with the demo.

## Create a New Theme

1. Create `<theme-name>/` directory (kebab-case)
2. Write `<theme-name>.md` — design spec with 16 sound definitions (see `TEMPLATE.md`)
3. Write `sounds.js` — ES module exporting `{ meta, createSounds }` (see `TEMPLATE.js`)
4. Write `index.html` — thin redirect to `../demo.html?theme=<theme-name>`

Every theme defines exactly **16 sounds**: 12 browser (hover, click, toggle,
tab) + 4 keyboard (letter, backspace, enter, space).

## Structure

```
ghost-signal/
  demo.html            # Shared demo page — loads themes dynamically
  TEMPLATE.md          # Sound spec template
  TEMPLATE.js          # sounds.js module template
  <theme-name>/
    <theme-name>.md    # Design spec
    sounds.js          # ES module — meta + createSounds
    index.html         # Thin redirect → demo.html?theme=<name>
```

## Deploy

Pushes to `master` auto-deploy to GitHub Pages. The landing page is generated
at build time from theme directories — no manual index maintenance needed.
