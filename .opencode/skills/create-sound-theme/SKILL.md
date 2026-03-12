---
name: create-sound-theme
description: "Create a new Ghost Signal audio theme from images, visual references, text descriptions, or concept prompts. Use this skill when users want to create a new sound theme from an image, photo, screenshot, or artwork. Also triggers on: \"new theme\", \"create theme\", \"sound theme\", \"audio theme\", \"sound palette\", \"analyze this image\", \"theme from image\", or any request to turn a visual into browser sounds."
version: "2.0.0"
---

# Create Sound Theme

This skill provides a complete workflow for creating Ghost Signal audio themes —
browser sound palettes built entirely with the Web Audio API. The primary use
case is **analyzing an image** and translating its visual qualities into a
cohesive sound palette.

## Critical Rules (Read First!)

1. **Every theme has exactly 3 files**: `<theme-name>.md` (spec), `sounds.js` (ES module), and `index.html` (thin redirect)
2. **Every theme has exactly 16 sounds** — no more, no fewer
3. **Web Audio API only** — no sample files, no `<audio>` elements, no fetch
4. **Sound logic goes in `sounds.js`** — the shared `demo.html` handles all UI
5. **Do NOT modify `demo.html`** — it loads themes dynamically via `?theme=<name>`
6. **Use `TEMPLATE.md` and `TEMPLATE.js`** as the structural base — read them first
7. **No build step** — themes are ES modules loaded by the browser natively

## Workflow: Image → Sound Theme

When the user provides an image, follow this complete pipeline:

```
Image provided
│
├─► 1. ANALYZE the image (see Image Analysis below)
│
├─► 2. DERIVE theme identity — name, mood, colors, sonic family
│
├─► 3. MAP visible objects → sonic metaphors for all 16 sounds
│
├─► 4. WRITE spec file (<theme-name>.md)
│
├─► 5. WRITE sounds.js ES module with meta + createSounds factory
│
└─► 6. WRITE thin index.html redirect
```

### Image Analysis Procedure

Examine the image systematically across these 6 dimensions:

#### A. Era & Setting

Identify the time period and location. This determines the overall sonic
character:

| Era | Sonic Character | Oscillator Preference | Filter Style |
|---|---|---|---|
| Retro / vintage / analog | Warm, rounded, lo-fi | `triangle`, `sine` | Heavy low-pass, roll off > 4 kHz |
| Modern / minimal / clean | Crisp, precise, digital | `sine`, `square` | Light filtering, wider bandwidth |
| Futuristic / sci-fi / cyber | Sharp, metallic, electric | `sawtooth`, `square` | Bandpass sweeps, high resonance |
| Natural / organic / earthy | Soft, diffuse, breathy | `sine` + heavy noise | Wide bandpass, low Q |

#### B. Visible Objects → Sound Sources

**This is the most important step.** Scan the image for physical objects and map
each to a sound ID. Every object that could make a sound is a candidate:

| Object Type | Maps To | Sonic Metaphor |
|---|---|---|
| Buttons, knobs, switches | CLICK, SWITCH_TOGGLE | The material they're made of (plastic, metal, wood) |
| Screens, displays, monitors | HOVER, HOVER_UP | The technology type (CRT hum, LCD whisper, LED ping) |
| Mechanical devices | IMPORTANT_CLICK | The action of their mechanism (lever, spring, gear) |
| Power sources, electronics | FEATURE_SWITCH ON/OFF | Power-up/down character of that device |
| Containers, cases, slots | TAB_INSERT/CLOSE | Loading/unloading action (cassette, disc, cartridge) |
| Input devices (keyboards, etc.) | TYPING_* sounds | The key mechanism material and travel distance |
| Constraint devices (locks, clamps) | LIMITER ON/OFF | The tightening/releasing action |
| Alert/signal devices | TAB_SLASH | The notification sound that device would make |

If the image lacks enough distinct objects, derive sounds from the **materials**
and **atmosphere** instead (wood resonance, metal clang, glass tink, fabric
muffle, water drip, etc.).

#### C. Material Palette → Tonal Qualities

Identify the dominant materials in the scene and translate to synthesis parameters:

| Material | Frequency Range | Oscillator | Filter | Gain Envelope |
|---|---|---|---|---|
| Wood | 200-800 Hz | `triangle` | Low-pass < 2.5 kHz, Q = 3-5 | Medium attack, warm release |
| Metal | 1-4 kHz | `square`, `sawtooth` | Bandpass, high Q (8-12) | Sharp attack, resonant decay |
| Plastic | 500-2 kHz | `triangle` | Low-pass < 4 kHz, Q = 2-3 | Fast attack, short release |
| Glass | 2-6 kHz | `sine` | High-pass > 1 kHz | Instant attack, long ringing release |
| Fabric / soft | 200-1.5 kHz | noise-only | Bandpass, low Q (1-2) | Soft attack, muffled |
| Electronics | 60-8 kHz (wide) | `sine` + `sawtooth` | Sweeping low-pass | Depends on power state |
| Water / liquid | 300-3 kHz | noise + `sine` | Bandpass, moderate Q | Bubbly, irregular |

#### D. Color Palette → CSS Variables

Extract 9 colors from the image:

1. **Find the 2 most vibrant/saturated colors** → `--accent` and `--accent2`
2. **Find the most alarming/warm saturated color** → `--danger`
3. **Find the darkest background tone** → `--bg`
4. **Create 2 progressively lighter shades from `--bg`** → `--surface`, `--surface2`
5. **Find a mid-tone separator color** → `--border`
6. **Find the lightest readable color** → `--text`
7. **Desaturate `--text` and reduce brightness** → `--text-dim`

**Warm scenes** (amber lamplight, wood, sunset) → warm browns, creams, amber accents
**Cool scenes** (night, screens, neon) → dark blues/grays, cyan/blue accents
**Mixed scenes** → warm accents on cool base, or vice versa

#### E. Lighting & Atmosphere → Frequency Range

The overall brightness and atmosphere of the image affects the frequency range:

| Atmosphere | Frequency Tendency | Noise Level | Filter Approach |
|---|---|---|---|
| Dark, moody, dim | Lower frequencies (150-1500 Hz) | More noise layers | Closed low-pass, warm |
| Bright, clean, daylight | Higher frequencies (500-4000 Hz) | Less noise | Open filters, clear |
| Hazy, foggy, soft | Mid frequencies (300-2000 Hz) | Filtered noise | Gentle bandpass |
| Neon, electric, glowing | Wide range with resonant peaks | Sparkle noise (high-pass) | Resonant sweeps |

#### F. Theme Name Derivation

Combine 2-3 words from the image's most distinctive qualities:

- **A place/setting word**: city, room, station, forest, deck, lab, arcade
- **A mood/quality word**: chill, ghost, neon, warm, crystal, velvet, rust
- **An optional technology word**: FM, signal, pulse, circuit, tape, vinyl

Examples: "Chill City FM", "Ghost Signal", "Neon Arcade", "Velvet Terminal",
"Rust Workshop", "Crystal Station"

Use kebab-case for the directory: `chill-city-fm`, `ghost-signal`, `neon-arcade`

## Step 1: Derive Theme Identity

Extract these from the source material:

| Field | What to determine |
|---|---|
| **Name** | 2-3 words, kebab-case for directory, Title Case for display |
| **Description** | One sentence — mood + material + feeling |
| **Mood** | A vivid scene/atmosphere in one sentence |
| **Sonic family** | What physical objects do the sounds evoke? |
| **Color palette** | 9 hex colors (see below) |

### Color Palette Rules

All 9 color values are **required** in `meta.colors`:

```javascript
colors: {
  accent:   '#______',  // Primary — headings, active states
  accent2:  '#______',  // Secondary — hover highlights, toggles
  danger:   '#______',  // Destructive — tab close hover
  bg:       '#______',  // Page background (darkest)
  surface:  '#______',  // Card background
  surface2: '#______',  // Elevated surface / hover
  border:   '#______',  // Separators
  text:     '#______',  // Primary text
  textDim:  '#______',  // Muted text
}
```

**Brightness ordering:** `--bg` < `--surface` < `--surface2` < `--border` < `--text-dim` < `--text`

Use **semantic names only** (`--accent`, not `--yellow`).

## Step 2: Design All 16 Sounds

### Required Sound IDs

| # | ID | Category | Typical Duration | Intent |
|---|---|---|---|---|
| 1 | `HOVER` | Browser | 50-80 ms | Pointer enters — faint, airy |
| 2 | `HOVER_UP` | Browser | 40-60 ms | Pointer leaves — inverse of HOVER |
| 3 | `CLICK` | Browser | 30-45 ms | Button press — tactile snap |
| 4 | `IMPORTANT_CLICK` | Browser | 100-150 ms | Primary action — heavy, resonant |
| 5 | `FEATURE_SWITCH_ON` | Browser | 220-300 ms | Power up — ascending energy |
| 6 | `FEATURE_SWITCH_OFF` | Browser | 200-280 ms | Power down — descending energy |
| 7 | `LIMITER_ON` | Browser | 180-230 ms | Constraint — squeezed, tense |
| 8 | `LIMITER_OFF` | Browser | 180-220 ms | Release — burst, unwinding |
| 9 | `SWITCH_TOGGLE` | Browser | 35-50 ms | Binary flip — minimal, fast |
| 10 | `TAB_INSERT` | Browser | 90-120 ms | New tab — ascending blips |
| 11 | `TAB_CLOSE` | Browser | 80-100 ms | Close tab — descending blips |
| 12 | `TAB_SLASH` | Browser | 140-200 ms | Command bar — bright ping |
| 13 | `TYPING_LETTER` | Keyboard | 20-35 ms | Key press — 10-20 variants |
| 14 | `TYPING_BACKSPACE` | Keyboard | 25-40 ms | Delete — lower, retracting |
| 15 | `TYPING_ENTER` | Keyboard | 70-100 ms | Confirm — heaviest key |
| 16 | `TYPING_SPACE` | Keyboard | 25-40 ms | Space bar — broad, hollow |

### Sound Pair Relationships (Must Be Consistent)

- **HOVER / HOVER_UP** — mirror pair (ascending vs descending sweep)
- **CLICK / IMPORTANT_CLICK** — same transient, IMPORTANT adds body + sub-bass
- **FEATURE_SWITCH ON / OFF** — inverse envelopes
- **LIMITER ON / OFF** — related to FEATURE_SWITCH but narrower, more constrained
- **TAB_INSERT / TAB_CLOSE** — inverse blip sequences
- **TYPING keys** — same tonal family, different weight per key

## Step 3: Create Files

### 3a. Create directory

```bash
mkdir <theme-name>
```

### 3b. Write `<theme-name>.md`

Follow `TEMPLATE.md` structure exactly. For each of the 16 sounds, specify:

- **Duration** (ms), **Base Freq** (Hz), **Variants** count
- **Concept** — sonic metaphor paragraph
- **Synthesis** — exact Web Audio recipe (oscillator types, frequencies, filter
  specs, gain envelopes, noise layers — specific enough to implement without guessing)

### 3c. Write `sounds.js`

Follow `TEMPLATE.js` structure. The module exports `{ meta, createSounds }`:

| Section | What to fill in |
|---|---|
| `meta.name` | Theme display name |
| `meta.subtitle` | Short description |
| `meta.colors` | All 9 color hex values (accent, accent2, danger, bg, surface, surface2, border, text, textDim) |
| `meta.placeholder` | Mood-appropriate textarea placeholder text |
| `meta.sounds` | Object with 16 entries, each having `{ label, meta, desc }` |
| `createSounds()` body | 16 sound function implementations using Web Audio API |

The `createSounds(ctx, noiseBuffer)` factory receives an `AudioContext` and
`noiseBuffer(duration)` helper. It returns an object of 16 sound functions.

### 3d. Write `index.html`

Create a thin redirect file:

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{{Theme Name}} — Audio Theme</title>
<script>location.replace('../demo.html?theme={{theme-name}}');</script>
</head>
<body></body>
</html>
```

**Do NOT modify `demo.html`** — it handles all shared UI (audio engine, toggle
switches, tab bar, keyboard input, sound grid rendering) automatically.

## Web Audio Synthesis Reference

### Sound Function Structure

Every sound function must follow this pattern:

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

### Gain Envelopes

```javascript
// Attack-release
gain.gain.setValueAtTime(0, now);
gain.gain.linearRampToValueAtTime(0.2, now + 0.005);      // attack
gain.gain.exponentialRampToValueAtTime(0.001, now + dur);  // release

// Sustain-release
gain.gain.setValueAtTime(0, now);
gain.gain.linearRampToValueAtTime(0.2, now + 0.003);      // attack
gain.gain.setValueAtTime(0.2, now + 0.05);                 // sustain hold
gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12); // release
```

**`exponentialRampToValueAtTime` cannot target 0** — always use `0.001`.

### Frequency Sweeps

```javascript
osc.frequency.setValueAtTime(startHz, now);
osc.frequency.linearRampToValueAtTime(endHz, now + dur);      // linear
osc.frequency.exponentialRampToValueAtTime(endHz, now + dur);  // natural curve
```

### Noise Layers

```javascript
const nSrc = ctx.createBufferSource();
nSrc.buffer = noiseBuffer(0.02);
const bp = ctx.createBiquadFilter();
bp.type = 'bandpass'; bp.frequency.value = 3000; bp.Q.value = 2;
const nG = ctx.createGain();
nG.gain.setValueAtTime(0.2, now);
nG.gain.exponentialRampToValueAtTime(0.001, now + 0.02);
nSrc.connect(bp).connect(nG).connect(ctx.destination);
nSrc.start(now); nSrc.stop(now + 0.025);
```

### TYPING_LETTER Variant Pattern

```javascript
sounds.TYPING_LETTER = function() {
  const now = ctx.currentTime;
  const bodyFreq = BASE + Math.floor(Math.random() * COUNT) * STEP;
  const noiseCentre = CENTRE + (Math.random() - 0.5) * JITTER;
  // noise tap with noiseCentre + pitched body with bodyFreq
};
```

### Multi-Stage Sounds (FEATURE_SWITCH Pattern)

```javascript
sounds.FEATURE_SWITCH_ON = function() {
  const now = ctx.currentTime;
  // Stage 1: noise transient (0 to ~30 ms)
  // Stage 2: ascending tone with filter sweep (~30 to ~250 ms)
  // Optional: sub-bass hum layer
};
```

### TAB_INSERT / TAB_CLOSE Blip Pattern

```javascript
const freqs = [480, 640, 800];  // ascending for INSERT
freqs.forEach((f, i) => {
  const t = now + i * 0.012;
  const osc = ctx.createOscillator();
  osc.type = 'triangle'; osc.frequency.value = f;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.18, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.018);
  osc.connect(g).connect(ctx.destination);
  osc.start(t); osc.stop(t + 0.022);
});
```

## Code Style Checklist

Verify before finalizing:

- [ ] 2-space indentation, no tabs
- [ ] Semicolons on every statement
- [ ] Single quotes in JS, double quotes in HTML attributes
- [ ] `function()` expressions for `sounds.*` (not arrow functions)
- [ ] Arrow functions only in callbacks (`.addEventListener`, `.forEach`, `setTimeout`)
- [ ] `const now = ctx.currentTime;` as first line of every sound function
- [ ] Short Web Audio node names: `osc`, `bp`, `lp`, `hp`, `nSrc`
- [ ] Gain nodes: first-letter + `G` — `nG`, `sG`, `bG`, `pG`
- [ ] Durations as decimal seconds: `0.06` not `60 / 1000`
- [ ] Chained `.connect()` calls
- [ ] Explicit `.stop()` on all oscillators and buffer sources
- [ ] All 16 sounds implemented — no empty stubs
- [ ] Semantic CSS variable names (`--accent`, not `--yellow`)
- [ ] JS heavy dividers: `// ═══...═══`
- [ ] JS light dividers: `// ---...---`
- [ ] CSS dividers: `/* ── Name ──── */`
- [ ] HTML dividers: `<!-- ═══...═══ -->`
- [ ] Sound logic in `sounds.js` ES module — not inline

## Deliverables Checklist

- [ ] Directory: `<theme-name>/`
- [ ] Spec: `<theme-name>/<theme-name>.md` — all 16 sounds documented
- [ ] Module: `<theme-name>/sounds.js` — exports `{ meta, createSounds }`
- [ ] Redirect: `<theme-name>/index.html` — thin redirect to `../demo.html?theme=<name>`
- [ ] No `{{…}}` template tokens remaining
- [ ] Color palette is cohesive with theme mood
- [ ] Sound metaphors are consistent across the family
- [ ] `demo.html` is unmodified — do not edit it
- [ ] Push to `master` — landing page is auto-generated by GitHub Actions

## Error Recovery

| Problem | Cause | Solution |
|---|---|---|
| No sound plays | AudioContext not initialized | Click the init banner first |
| Sound cuts off | `.stop()` time too early | Ensure stop > last envelope point |
| Clicks/pops | Gain jumps to 0 | Use `exponentialRampToValueAtTime(0.001, ...)` |
| Sounds too quiet | Gain values too low | Typical range: 0.08-0.30 |
| Sounds too harsh | Missing low-pass filter | Add `lowpass` filter to warm the tone |
| TYPING_LETTER repetitive | Not enough variants | Increase frequency pool + noise jitter |
| `exponentialRamp` error | Target value is 0 | Use `0.001` instead of `0` |
