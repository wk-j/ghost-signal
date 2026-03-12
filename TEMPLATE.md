# {{THEME_NAME}}

> {{THEME_DESCRIPTION — one sentence that captures the mood, material, and feeling of the entire sound palette.}}

---

## Theme Identity

| Property | Value |
|---|---|
| Accent | {{PRIMARY_COLOR}} `{{HEX}}`, {{SECONDARY_COLOR}} `{{HEX}}` |
| Base | {{BASE_PALETTE — background tones, shadows, ambient colors}} |
| Mood | {{MOOD — a vivid scene or atmosphere in one sentence}} |
| Engine | Web Audio API only — no sample files, oscillators + noise + filters + envelopes |

---

## Browser Sounds

### 1. HOVER

| | |
|---|---|
| **Duration** | {{N}} ms |
| **Base Freq** | {{N}} Hz |
| **Variants** | 1 |

**Concept** — {{What the user should feel when their pointer enters an element. Describe the sonic metaphor — what real or imaginary object/action does this sound evoke?}}

**Synthesis** — {{Exact Web Audio recipe: oscillator type, start/end frequency, sweep direction, filter type + Q + cutoff, gain envelope (attack/release in ms), any noise layer with gain level. Be specific enough that a developer can implement without guessing.}}

---

### 2. HOVER_UP

| | |
|---|---|
| **Duration** | {{N}} ms |
| **Base Freq** | {{N}} Hz |
| **Variants** | 1 |

**Concept** — {{What the user should feel when their pointer leaves an element. Should mirror/invert HOVER.}}

**Synthesis** — {{Exact Web Audio recipe. Typically the inverse sweep direction of HOVER with a faster release.}}

---

### 3. CLICK

| | |
|---|---|
| **Duration** | {{N}} ms |
| **Base Freq** | {{N}} Hz |
| **Variants** | 1 |

**Concept** — {{A standard button press. What material or mechanism does this click evoke? Should feel tactile and decisive.}}

**Synthesis** — {{Exact Web Audio recipe: typically a short transient (pop/pulse) layered with a noise burst for texture.}}

---

### 4. IMPORTANT_CLICK

| | |
|---|---|
| **Duration** | {{N}} ms |
| **Base Freq** | {{N}} Hz |
| **Variants** | 1 |

**Concept** — {{A heavier, more resonant click for primary actions. Should feel like a commitment — irreversible, authoritative.}}

**Synthesis** — {{Exact Web Audio recipe: builds on CLICK with added body tone (longer sustain) and optional sub-bass for weight.}}

---

### 5. FEATURE_SWITCH_ON

| | |
|---|---|
| **Duration** | {{N}} ms |
| **Base Freq** | {{N}} Hz |
| **Variants** | 1 |

**Concept** — {{A system/feature activating. Should feel like energy arriving — power up, lights on, engine starting.}}

**Synthesis** — {{Exact Web Audio recipe: typically two stages — an initial transient (spark/click) followed by an ascending tone with an opening filter sweep.}}

---

### 6. FEATURE_SWITCH_OFF

| | |
|---|---|
| **Duration** | {{N}} ms |
| **Base Freq** | {{N}} Hz |
| **Variants** | 1 |

**Concept** — {{A system/feature deactivating. Should feel like energy draining — power down, fade out, shutdown.}}

**Synthesis** — {{Exact Web Audio recipe: typically the inverse of FEATURE_SWITCH_ON — descending tone with a closing filter sweep, optional low-end rumble tail.}}

---

### 7. LIMITER_ON

| | |
|---|---|
| **Duration** | {{N}} ms |
| **Base Freq** | {{N}} Hz |
| **Variants** | 1 |

**Concept** — {{A constraint or limit engaging. Should feel like restriction — clamping, tightening, locking.}}

**Synthesis** — {{Exact Web Audio recipe: related to FEATURE_SWITCH_ON but narrower frequency range, higher filter resonance to sound more "squeezed".}}

---

### 8. LIMITER_OFF

| | |
|---|---|
| **Duration** | {{N}} ms |
| **Base Freq** | {{N}} Hz |
| **Variants** | 1 |

**Concept** — {{A constraint releasing. Should feel like freedom — pressure escaping, unlocking, expanding.}}

**Synthesis** — {{Exact Web Audio recipe: related to FEATURE_SWITCH_OFF but with an initial burst/release transient.}}

---

### 9. SWITCH_TOGGLE

| | |
|---|---|
| **Duration** | {{N}} ms |
| **Base Freq** | {{N}} Hz |
| **Variants** | 1 |

**Concept** — {{A simple binary toggle. Smaller and faster than FEATURE_SWITCH. Should feel like a micro-interaction — flick, snap, tap.}}

**Synthesis** — {{Exact Web Audio recipe: typically a short blip with a pitched echo, minimal and clean.}}

---

### 10. TAB_INSERT

| | |
|---|---|
| **Duration** | {{N}} ms |
| **Base Freq** | {{N}} Hz |
| **Variants** | 1 |

**Concept** — {{A new tab/panel opening. Should feel like arrival — connecting, expanding, a new view appearing.}}

**Synthesis** — {{Exact Web Audio recipe: typically ascending micro-tones (2-3 rapid blips) with a noise whoosh layer for motion.}}

---

### 11. TAB_CLOSE

| | |
|---|---|
| **Duration** | {{N}} ms |
| **Base Freq** | {{N}} Hz |
| **Variants** | 1 |

**Concept** — {{A tab/panel closing. Should feel like departure — disconnecting, collapsing, disappearing. Inverse of TAB_INSERT.}}

**Synthesis** — {{Exact Web Audio recipe: typically descending micro-tones (inverse of TAB_INSERT) with a downward sweep and optional low thud.}}

---

### 12. TAB_SLASH

| | |
|---|---|
| **Duration** | {{N}} ms |
| **Base Freq** | {{N}} Hz |
| **Variants** | 1 |

**Concept** — {{Command bar or search activating. Should feel like readiness — focused, alert, awaiting input.}}

**Synthesis** — {{Exact Web Audio recipe: typically a clean pitched ping with optional LFO shimmer and a sparkle noise layer.}}

---

## Keyboard Sounds

### 13. TYPING_LETTER

| | |
|---|---|
| **Duration** | {{N}} ms |
| **Base Freq** | {{N}} Hz |
| **Variants** | {{N — recommend 10-20 for organic feel}} |

**Concept** — {{A standard key press. Should feel physical and tactile despite being synthesized. Rapid successive presses must not sound repetitive.}}

**Synthesis** — {{Exact Web Audio recipe: typically a micro noise-burst for the "tap" plus a faint pitched body tone. Each variant randomises the body frequency from a pool and jitters the noise filter centre. Include the frequency pool range and step size.}}

---

### 14. TYPING_BACKSPACE

| | |
|---|---|
| **Duration** | {{N}} ms |
| **Base Freq** | {{N}} Hz |
| **Variants** | 1 |

**Concept** — {{Deleting a character. Should feel like removal — lower, softer, retracting compared to TYPING_LETTER.}}

**Synthesis** — {{Exact Web Audio recipe: typically a short low pulse with a reverse-envelope noise for a "sucking back" effect, low-passed to sound duller than letter keys.}}

---

### 15. TYPING_ENTER

| | |
|---|---|
| **Duration** | {{N}} ms |
| **Base Freq** | {{N}} Hz |
| **Variants** | 1 |

**Concept** — {{Confirming/submitting. Should feel heavier and more resonant than any other key — a stamp of commitment.}}

**Synthesis** — {{Exact Web Audio recipe: typically a hard transient (pop + noise) followed by a descending body tone through a resonant low-pass, with optional sub-bass for gravitas.}}

---

### 16. TYPING_SPACE

| | |
|---|---|
| **Duration** | {{N}} ms |
| **Base Freq** | {{N}} Hz |
| **Variants** | 1 |

**Concept** — {{The space bar. Should feel broader and hollower than a letter key — wider contact surface, more diffuse sound.}}

**Synthesis** — {{Exact Web Audio recipe: typically a wide band-pass noise puff (low Q for diffusion) plus a subtle pitched undertone, highs rolled off.}}
