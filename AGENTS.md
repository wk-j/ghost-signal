# AGENTS.md — Ghost Signal

> Guidelines for AI coding agents operating in this repository.

## Project Overview

Ghost Signal is a collection of **browser audio themes** — sound palettes for UI
sonification built entirely with the Web Audio API. Each theme is a standalone
directory containing a design spec (`.md`) and an interactive demo (`index.html`).
There is **no build step, no bundler, no package manager, and no dependencies**.

## Repository Structure

```
ghost-signal/
  TEMPLATE.md          # Theme design spec template (fill-in-the-blanks)
  TEMPLATE.html        # Interactive demo page template
  <theme-name>/        # One directory per theme (kebab-case)
    <theme-name>.md    # Design spec — mood, colors, 16 sound definitions
    index.html         # Self-contained HTML demo — inline CSS + JS
```

## Build / Lint / Test Commands

There are **none**. This is a zero-tooling static HTML project.

- **No `package.json`**, no npm scripts, no Makefile
- **No linter** (no ESLint, Prettier, Biome)
- **No test framework** — verification is manual (open `index.html` in a browser)
- **No CI/CD** pipeline

To verify a theme works, open its `index.html` directly in a browser, click
"Click to initialise AudioContext", and test all 16 sounds interactively.

## Creating a New Theme

1. Create a directory: `<theme-name>/` (kebab-case)
2. Copy `TEMPLATE.md` → `<theme-name>/<theme-name>.md`, fill in all `{{…}}` tokens
3. Copy `TEMPLATE.html` → `<theme-name>/index.html`, then:
   - Set the 9 CSS color variables in `:root`
   - Fill in heading, subtitle, button metadata, and placeholder text
   - Implement all 16 `sounds.*` functions with Web Audio synthesis
4. Every theme **must define exactly 16 sounds** (12 browser + 4 keyboard)
5. All synthesis uses **Web Audio API only** — no sample files

### Required Sound IDs

| # | ID | Category |
|---|---|---|
| 1–2 | `HOVER`, `HOVER_UP` | Browser |
| 3–4 | `CLICK`, `IMPORTANT_CLICK` | Browser |
| 5–6 | `FEATURE_SWITCH_ON`, `FEATURE_SWITCH_OFF` | Browser |
| 7–8 | `LIMITER_ON`, `LIMITER_OFF` | Browser |
| 9 | `SWITCH_TOGGLE` | Browser |
| 10–12 | `TAB_INSERT`, `TAB_CLOSE`, `TAB_SLASH` | Browser |
| 13 | `TYPING_LETTER` (10–20 variants) | Keyboard |
| 14–16 | `TYPING_BACKSPACE`, `TYPING_ENTER`, `TYPING_SPACE` | Keyboard |

## Code Style

### General

- **2-space indentation** everywhere (HTML, CSS, JS) — no tabs
- **Semicolons always** — no ASI reliance
- **Single quotes** for JS strings: `'sine'`, `'HOVER'`
- **Double quotes** for HTML attributes: `class="sound-btn"`
- **Backtick template literals** only for dynamic strings with `${}`

### JavaScript

- **`function` declarations** for top-level named functions
- **`function()` expressions** for `sounds.*` properties (not arrow functions)
- **Arrow functions** only in callbacks: `.addEventListener`, `.forEach`, `setTimeout`
- **`camelCase`** for variables and functions: `initAudio`, `noiseBuffer`, `bodyFreq`
- **`UPPER_SNAKE_CASE`** for sound IDs: `HOVER_UP`, `FEATURE_SWITCH_ON`
- **Short abbreviations** for Web Audio nodes: `osc`, `bp`, `lp`, `hp`, `nSrc`
- **Gain node naming**: first-letter + `G` — `nG` (noise), `sG` (sub), `bG` (body)
- **`const now = ctx.currentTime`** is always the first line in every sound function
- Durations as decimal seconds: `0.06` not `60 / 1000`
- No `async/await`, no classes — plain functions and object literals
- Global `let ctx = null` for AudioContext, global `let tabCounter = 0` for tab state
- Chained `.connect()` calls: `osc.connect(filter).connect(gain).connect(ctx.destination)`
- Explicit `.stop()` calls for node cleanup — no manual disconnect

### CSS

- **`kebab-case`** for class names: `sound-btn`, `toggle-row`, `key-ind`
- **`--kebab-case`** for custom properties: `--accent`, `--surface2`, `--text-dim`
- Use **semantic color variable names** (`--accent`, `--accent2`, `--danger`) not descriptive ones
- 9 required CSS variables: `--accent`, `--accent2`, `--danger`, `--bg`, `--surface`,
  `--surface2`, `--border`, `--text`, `--text-dim`
- Simple rules on single lines: `.init-banner:hover { border-color: var(--accent2); }`
- Complex rules expanded to multiple lines
- Shorthand properties preferred: `inset: 0`, `gap: 12px`

### HTML

- Standard `<!DOCTYPE html>` with `lang="en"`
- Inline event handlers: `onclick="play('CLICK')"`, `onmouseenter="play('HOVER')"`
- No self-closing void elements (use `<meta ...>` not `<meta ... />`)
- All CSS and JS inline — no external files

### Comments

JS section dividers (heavy):
```
// ═══════════════════════════════════════════════════════════════════
// SECTION TITLE
// ═══════════════════════════════════════════════════════════════════
```

JS sound dividers (light):
```
// ---------------------------------------------------------------
// N. SOUND_NAME — short description, duration
// ---------------------------------------------------------------
```

CSS section dividers:
```
/* ── Section Name ───────────────────────────────────────────────── */
```

HTML section dividers:
```
<!-- ═══════════════════════════════════════════════════════════ -->
<!-- SECTION TITLE                                               -->
<!-- ═══════════════════════════════════════════════════════════ -->
```

## Web Audio Patterns

Every sound function follows this structure:

```javascript
sounds.SOUND_NAME = function() {
  const now = ctx.currentTime;
  // 1. Create oscillator(s) / buffer source(s)
  // 2. Create filter(s) — bandpass, lowpass, highpass
  // 3. Create gain node(s) with envelope automation
  // 4. Connect chain: source → filter → gain → ctx.destination
  // 5. Schedule .start(now + offset) and .stop(now + offset)
};
```

- Gain envelopes: `setValueAtTime` → `linearRampToValueAtTime` or `exponentialRampToValueAtTime`
- Noise via `noiseBuffer(duration)` helper (creates white noise `BufferSource`)
- All timing is absolute: `now + 0.03`, not relative offsets

## Git Conventions

- **Imperative mood** commit messages: "Add …", "Fix …", "Update …"
- Single-line message with descriptive detail after an em-dash
- No conventional commit prefixes (`feat:`, `fix:`, etc.)
- Commit only theme-related files — no generated files or tooling artifacts
