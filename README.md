# Ghost Signal

Browser audio themes built entirely with the Web Audio API — no samples, no
dependencies, no build step. Each theme is a self-contained HTML file with 16
synthesized UI sounds.

## Themes

| Theme | Mood |
|---|---|
| [Ghost Signal](ghost-signal/) | Cyberpunk-noir — chrome, neon, and rain |
| [Chill City FM](chill-city-fm/) | Warm lo-fi retro — CRT, VHS, boombox, wood paneling |

## Try It

Open any theme's `index.html` in a browser, click "Click to initialise
AudioContext", and interact with the demo.

## Create a New Theme

1. Create `<theme-name>/` directory (kebab-case)
2. Write `<theme-name>.md` — design spec with 16 sound definitions (see `TEMPLATE.md`)
3. Write `index.html` — interactive demo with Web Audio synthesis (see `TEMPLATE.html`)

Every theme defines exactly **16 sounds**: 12 browser (hover, click, toggle,
tab) + 4 keyboard (letter, backspace, enter, space).

## Structure

```
ghost-signal/
  TEMPLATE.md          # Sound spec template
  TEMPLATE.html        # Demo page template
  <theme-name>/
    <theme-name>.md    # Design spec
    index.html         # Interactive demo
```

## Deploy

Pushes to `master` auto-deploy to GitHub Pages. The landing page is generated
at build time from theme directories — no manual index maintenance needed.
