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

## Sonic DNA

> Every theme must define a **unique synthesis identity** — a set of 3–5 signature
> techniques that fundamentally shape how every sound is built. Two themes should
> never share the same Sonic DNA. Changing frequencies or filter cutoffs alone is
> NOT sufficient differentiation.

| Technique | Description |
|---|---|
| **Primary waveform** | {{The dominant oscillator type used across most sounds — e.g. "square with hard edges", "detuned triangle pairs", "FM-modulated sine". This is NOT just "sine" or "triangle" — describe the character.}} |
| **Signature effect** | {{The one processing technique that appears in most sounds and defines the theme's "fingerprint" — e.g. "ring modulation for metallic alien timbres", "feedback delay tails for vast distance", "waveshaper distortion for compressed aggression", "detuned oscillator pairs for analog warmth".}} |
| **Transient character** | {{How attacks/onsets behave — e.g. "hard square impulses, sub-3ms", "soft fade-ins with no click", "FM percussion bursts", "noisy crackle onsets".}} |
| **Envelope philosophy** | {{The overall time-feel — e.g. "ultra-short, no sustain, bone-dry", "long tails that dissolve into void", "medium with tape-wobble modulation", "sharp attack into resonant ring-out".}} |
| **Frequency world** | {{The spectral home — e.g. "mid-highs with harsh resonant peaks", "low-mids filtered through distance", "full spectrum but LP-capped at 3 kHz", "extreme highs (>4 kHz) for metallic shimmer".}} |

**Differentiation rule**: Before implementing, compare the above table against
all existing themes. If any two themes share the same primary waveform AND
signature effect AND envelope philosophy, the design is too similar. Redesign
until at least 3 of 5 rows are fundamentally different.

---

## Browser Sounds

### 1. HOVER

| | |
|---|---|
| **Duration** | {{N}} ms |
| **Base Freq** | {{N}} Hz |
| **Variants** | 1 |

**Concept** — {{What the user should feel when their pointer enters an element. Describe the sonic metaphor — what real or imaginary object/action does this sound evoke?}}

**Synthesis** — {{Exact Web Audio recipe using this theme's Sonic DNA. Specify: oscillator type, start/end frequency, sweep direction, filter type + Q + cutoff, gain envelope (attack/release in ms), any noise layer with gain level. Must employ at least one of this theme's signature techniques. Be specific enough that a developer can implement without guessing.}}

---

### 2. HOVER_UP

| | |
|---|---|
| **Duration** | {{N}} ms |
| **Base Freq** | {{N}} Hz |
| **Variants** | 1 |

**Concept** — {{What the user should feel when their pointer leaves an element. Should complement HOVER but need not be a simple inverse — explore the theme's character.}}

**Synthesis** — {{Exact Web Audio recipe using this theme's Sonic DNA.}}

---

### 3. CLICK

| | |
|---|---|
| **Duration** | {{N}} ms |
| **Base Freq** | {{N}} Hz |
| **Variants** | 1 |

**Concept** — {{A standard button press. What material or mechanism does this click evoke? Should feel tactile and decisive.}}

**Synthesis** — {{Exact Web Audio recipe using this theme's Sonic DNA. The transient character (from Sonic DNA) should be most apparent here.}}

---

### 4. IMPORTANT_CLICK

| | |
|---|---|
| **Duration** | {{N}} ms |
| **Base Freq** | {{N}} Hz |
| **Variants** | 1 |

**Concept** — {{A heavier, more resonant click for primary actions. Should feel like a commitment — irreversible, authoritative.}}

**Synthesis** — {{Exact Web Audio recipe using this theme's Sonic DNA. Should layer the theme's signature effect with a weighted body tone.}}

---

### 5. FEATURE_SWITCH_ON

| | |
|---|---|
| **Duration** | {{N}} ms |
| **Base Freq** | {{N}} Hz |
| **Variants** | 1 |

**Concept** — {{A system/feature activating. Should feel like energy arriving — power up, lights on, engine starting.}}

**Synthesis** — {{Exact Web Audio recipe using this theme's Sonic DNA. This is a showcase sound — use the theme's signature effect prominently.}}

---

### 6. FEATURE_SWITCH_OFF

| | |
|---|---|
| **Duration** | {{N}} ms |
| **Base Freq** | {{N}} Hz |
| **Variants** | 1 |

**Concept** — {{A system/feature deactivating. Should feel like energy draining — power down, fade out, shutdown.}}

**Synthesis** — {{Exact Web Audio recipe using this theme's Sonic DNA. Should be the emotional inverse of FEATURE_SWITCH_ON while using the same signature techniques.}}

---

### 7. LIMITER_ON

| | |
|---|---|
| **Duration** | {{N}} ms |
| **Base Freq** | {{N}} Hz |
| **Variants** | 1 |

**Concept** — {{A constraint or limit engaging. Should feel like restriction — clamping, tightening, locking.}}

**Synthesis** — {{Exact Web Audio recipe using this theme's Sonic DNA. Must feel distinct from FEATURE_SWITCH_ON — use a different node topology or synthesis approach, not just narrower parameters.}}

---

### 8. LIMITER_OFF

| | |
|---|---|
| **Duration** | {{N}} ms |
| **Base Freq** | {{N}} Hz |
| **Variants** | 1 |

**Concept** — {{A constraint releasing. Should feel like freedom — pressure escaping, unlocking, expanding.}}

**Synthesis** — {{Exact Web Audio recipe using this theme's Sonic DNA. Must feel distinct from FEATURE_SWITCH_OFF — different onset, different structure.}}

---

### 9. SWITCH_TOGGLE

| | |
|---|---|
| **Duration** | {{N}} ms |
| **Base Freq** | {{N}} Hz |
| **Variants** | 1 |

**Concept** — {{A simple binary toggle. Smaller and faster than FEATURE_SWITCH. Should feel like a micro-interaction — flick, snap, tap.}}

**Synthesis** — {{Exact Web Audio recipe using this theme's Sonic DNA. Must be structurally different from CLICK — not just shorter/quieter.}}

---

### 10. TAB_INSERT

| | |
|---|---|
| **Duration** | {{N}} ms |
| **Base Freq** | {{N}} Hz |
| **Variants** | 1 |

**Concept** — {{A new tab/panel opening. Should feel like arrival — connecting, expanding, a new view appearing.}}

**Synthesis** — {{Exact Web Audio recipe using this theme's Sonic DNA. Design a unique motion pattern — avoid defaulting to "3 ascending blips" unless that fits the theme's character.}}

---

### 11. TAB_CLOSE

| | |
|---|---|
| **Duration** | {{N}} ms |
| **Base Freq** | {{N}} Hz |
| **Variants** | 1 |

**Concept** — {{A tab/panel closing. Should feel like departure — disconnecting, collapsing, disappearing. Inverse of TAB_INSERT.}}

**Synthesis** — {{Exact Web Audio recipe using this theme's Sonic DNA. The emotional inverse of TAB_INSERT, using the same synthesis vocabulary.}}

---

### 12. TAB_SLASH

| | |
|---|---|
| **Duration** | {{N}} ms |
| **Base Freq** | {{N}} Hz |
| **Variants** | 1 |

**Concept** — {{Command bar or search activating. Should feel like readiness — focused, alert, awaiting input.}}

**Synthesis** — {{Exact Web Audio recipe using this theme's Sonic DNA. A signature moment — design something memorable that could only belong to this theme.}}

---

## Keyboard Sounds

### 13. TYPING_LETTER

| | |
|---|---|
| **Duration** | {{N}} ms |
| **Base Freq** | {{N}} Hz |
| **Variants** | {{N — recommend 10-20 for organic feel}} |

**Concept** — {{A standard key press. Should feel physical and tactile despite being synthesized. Rapid successive presses must not sound repetitive.}}

**Synthesis** — {{Exact Web Audio recipe using this theme's Sonic DNA. Each variant must randomise at least one parameter. The synthesis approach should match the theme — not every theme uses "noise burst + sine body". Include the frequency pool range and step size.}}

---

### 14. TYPING_BACKSPACE

| | |
|---|---|
| **Duration** | {{N}} ms |
| **Base Freq** | {{N}} Hz |
| **Variants** | 1 |

**Concept** — {{Deleting a character. Should feel like removal — lower, softer, retracting compared to TYPING_LETTER.}}

**Synthesis** — {{Exact Web Audio recipe using this theme's Sonic DNA. Should feel like the inverse action of TYPING_LETTER while using the same synthesis vocabulary.}}

---

### 15. TYPING_ENTER

| | |
|---|---|
| **Duration** | {{N}} ms |
| **Base Freq** | {{N}} Hz |
| **Variants** | 1 |

**Concept** — {{Confirming/submitting. Should feel heavier and more resonant than any other key — a stamp of commitment.}}

**Synthesis** — {{Exact Web Audio recipe using this theme's Sonic DNA. The heaviest keyboard sound — should showcase the theme's full character.}}

---

### 16. TYPING_SPACE

| | |
|---|---|
| **Duration** | {{N}} ms |
| **Base Freq** | {{N}} Hz |
| **Variants** | 1 |

**Concept** — {{The space bar. Should feel broader and hollower than a letter key — wider contact surface, more diffuse sound.}}

**Synthesis** — {{Exact Web Audio recipe using this theme's Sonic DNA. Wider and more diffuse than TYPING_LETTER but sharing the same synthesis family.}}

---

## Application Sounds

### 17. APP_START

| | |
|---|---|
| **Duration** | {{N}} ms |
| **Base Freq** | {{N}} Hz |
| **Variants** | 1 |

**Concept** — {{Application awakening. Should feel mysterious and calm — a presence stirring from silence rather than a bright chime. Slow-evolving, low-frequency tones with gentle filter sweeps, dissonant or open intervals, and long tails that dissolve into quiet. The feeling: something unknown is now aware.}}

**Synthesis** — {{Exact Web Audio recipe using this theme's Sonic DNA at its most expressive. This is the theme's signature moment — the longest sound, the most layered, and the most emotionally complete. Every signature technique should appear here. Total duration 1-1.5 s with long tails.}}
