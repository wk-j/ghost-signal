# Deep Glyph

> A midnight-code sound palette inspired by the hypnotic trance of late-night programming — holographic text floating in void, keyboard keys lit by screen glow, and the quiet hum of pure concentration, designed to make a browser feel like a translucent IDE suspended in deep space.

![Deep Glyph cover](cover.png)

---

## Theme Identity

| Property | Value |
|---|---|
| Source | Cinematic coder in holographic code void |
| Accent | Cyan glow `#4DE8E0`, Syntax green `#7BF090` |
| Base | Deep midnight navy, dark indigo shadows, starfield black |
| Mood | 3 AM coding trance — floating code glyphs, starfield beyond the screen, fingers dancing on keys in blue-green light |
| Engine | Web Audio API only — no sample files, oscillators + noise + filters + envelopes |

---

## Sonic DNA

> Every theme must define a **unique synthesis identity** — a set of 3–5 signature
> techniques that fundamentally shape how every sound is built. Two themes should
> never share the same Sonic DNA. Changing frequencies or filter cutoffs alone is
> NOT sufficient differentiation.

| Technique | Description |
|---|---|
| **Primary waveform** | Additive sine partials — 3-6 harmonically-related sine oscillators summed together, creating complex timbres from pure building blocks. Each sound selects a different partial recipe (e.g. fundamental + 3rd + 5th for hollow tones, fundamental + 2nd + 4th for bright). |
| **Signature effect** | Comb filter resonance — achieved via short delay-line feedback (delayTime 1-5ms, feedback 0.3-0.7), creating metallic ringing and pitch-colored resonance that evokes holographic glass surfaces. |
| **Transient character** | Granular noise bursts — filtered micro-grain noise (5-8ms) shaped by tight bandpass filters, simulating the tactile scatter of light particles or keypress impact. |
| **Envelope philosophy** | Staccato body + spectral tail — fast body decay (20-50ms) while upper partials linger independently (80-200ms), creating a ghostly afterimage effect like code characters fading from a display. |
| **Frequency world** | Wide partials spread — fundamentals sit at 150-600 Hz with harmonics extending to 6 kHz, giving each sound both warmth and crystalline shimmer. The overall feel is spacious and vertically distributed, not clustered. |

**Differentiation rule**: Before implementing, compare the above table against
all existing themes. If any two themes share the same primary waveform AND
signature effect AND envelope philosophy, the design is too similar. Redesign
until at least 3 of 5 rows are fundamentally different.

---

## Browser Sounds

### 1. HOVER

| | |
|---|---|
| **Duration** | 65 ms |
| **Base Freq** | 800 Hz |
| **Variants** | 1 |

**Concept** — A faint holographic shimmer — like a code glyph brightening as a cursor passes over it. Airy and crystalline, barely there.

**Synthesis** — Two sine oscillators: fundamental at 800 Hz and 3rd partial at 2400 Hz. Fundamental gain 0.08, partial gain 0.04. Both sweep up +60 Hz over 65ms. Comb filter on fundamental (delay 2ms, feedback 0.3). Gain envelope: attack 3ms, exponential release to 0.001 at 65ms. Bandpass noise layer at 4000 Hz (Q=3) gain 0.03, 15ms duration.

---

### 2. HOVER_UP

| | |
|---|---|
| **Duration** | 55 ms |
| **Base Freq** | 860 Hz |
| **Variants** | 1 |

**Concept** — The glyph dimming as the cursor departs — a downward dissolve, the inverse shimmer fading back to idle.

**Synthesis** — Two sine oscillators: fundamental at 860 Hz sweeping down to 750 Hz, 3rd partial at 2580 Hz sweeping to 2250 Hz. Same gain levels as HOVER. Comb filter (delay 2.5ms, feedback 0.25). Gain envelope: attack 2ms, exponential release to 0.001 at 55ms. Noise layer at 3500 Hz (Q=2.5) gain 0.025, 12ms.

---

### 3. CLICK

| | |
|---|---|
| **Duration** | 40 ms |
| **Base Freq** | 520 Hz |
| **Variants** | 1 |

**Concept** — A precise keypress on a holographic keyboard — a short, tactile snap with crystalline clarity. Like pressing a glass key that emits a tiny flash.

**Synthesis** — Three sine partials: 520 Hz (gain 0.15), 1040 Hz (gain 0.08), 2600 Hz (gain 0.04). No sweep. Granular noise burst: bandpass at 3000 Hz (Q=4), gain 0.12, duration 6ms. Comb filter on the summed partials (delay 1.5ms, feedback 0.35). Body envelope: attack 1ms, exponential decay to 0.001 at 25ms. Upper partial (2600 Hz) has independent slower decay to 0.001 at 40ms (spectral tail).

---

### 4. IMPORTANT_CLICK

| | |
|---|---|
| **Duration** | 130 ms |
| **Base Freq** | 320 Hz |
| **Variants** | 1 |

**Concept** — Executing a command — the holographic display flashes as the compile/run button is struck. Heavier, more resonant, with a sub-bass thud and lingering harmonic shimmer.

**Synthesis** — Four sine partials: 320 Hz (gain 0.18), 640 Hz (gain 0.10), 1600 Hz (gain 0.06), 3200 Hz (gain 0.03). Sub-bass sine at 80 Hz, gain 0.12, decay to 0.001 at 80ms. Granular noise burst: bandpass 2500 Hz (Q=3), gain 0.14, 8ms. Comb filter (delay 3ms, feedback 0.45). Body (320, 640) decay to 0.001 at 60ms. Upper partials (1600, 3200) independent tail to 0.001 at 130ms. Sub-bass envelope: attack 2ms, decay to 0.001 at 80ms.

---

### 5. FEATURE_SWITCH_ON

| | |
|---|---|
| **Duration** | 280 ms |
| **Base Freq** | 220 Hz |
| **Variants** | 1 |

**Concept** — A code module coming online — partials light up one by one like syntax highlighting activating across a file. Ascending energy, each harmonic igniting in sequence.

**Synthesis** — Five sine partials staggered in time: 220 Hz at t+0, 440 Hz at t+20ms, 880 Hz at t+40ms, 1320 Hz at t+60ms, 2200 Hz at t+80ms. Each partial gain starts at 0.12 and decays to 0.001 at its start+200ms. Comb filter on sum (delay 2ms, feedback 0.5 sweeping to 0.2). Low-pass filter on output: 1500 Hz sweeping to 5000 Hz over 250ms (Q=2). Granular noise onset: bandpass 2000 Hz (Q=2), gain 0.08, 7ms at t+0.

---

### 6. FEATURE_SWITCH_OFF

| | |
|---|---|
| **Duration** | 260 ms |
| **Base Freq** | 2200 Hz |
| **Variants** | 1 |

**Concept** — A code module going offline — the partials extinguish from top to bottom, like syntax highlighting draining away. Descending energy collapse.

**Synthesis** — Five sine partials staggered in reverse: 2200 Hz at t+0, 1320 Hz at t+20ms, 880 Hz at t+40ms, 440 Hz at t+60ms, 220 Hz at t+80ms. Each partial gain 0.10, decay to 0.001 over 180ms from start. Comb filter (delay 2ms, feedback 0.2 sweeping to 0.5). Low-pass filter: 5000 Hz sweeping down to 800 Hz over 240ms (Q=2). Noise burst at onset: bandpass 3000 Hz (Q=2), gain 0.06, 6ms.

---

### 7. LIMITER_ON

| | |
|---|---|
| **Duration** | 200 ms |
| **Base Freq** | 400 Hz |
| **Variants** | 1 |

**Concept** — A rate limiter or constraint activating — like a debug breakpoint clamping execution. Tight, compressed, the partials squeeze together into a narrow band.

**Synthesis** — Three sine partials starting spread: 400 Hz, 800 Hz, 1200 Hz. Over 150ms, the upper two sweep inward (800→550 Hz, 1200→500 Hz) converging on the fundamental — the "squeeze". Each gain 0.10, body decay to 0.001 at 200ms. Comb filter (delay 1ms, feedback 0.55). Noise burst: high-pass at 2000 Hz, gain 0.10, 8ms. No spectral tail — all partials cut together (constrained feel).

---

### 8. LIMITER_OFF

| | |
|---|---|
| **Duration** | 200 ms |
| **Base Freq** | 480 Hz |
| **Variants** | 1 |

**Concept** — The constraint releasing — the breakpoint lifts, execution resumes. Partials burst outward from a tight cluster, expanding into open space.

**Synthesis** — Three sine partials starting converged: 480 Hz, 500 Hz, 520 Hz. Over 150ms, they sweep outward (480→400 Hz, 500→800 Hz, 520→1300 Hz) — the "burst". Each gain 0.10, body decay 60ms, then upper partials (800, 1300) independent tail to 0.001 at 200ms. Comb filter (delay 1.5ms, feedback 0.4). Noise burst: bandpass 3500 Hz (Q=3), gain 0.08, 7ms.

---

### 9. SWITCH_TOGGLE

| | |
|---|---|
| **Duration** | 40 ms |
| **Base Freq** | 660 Hz |
| **Variants** | 1 |

**Concept** — A boolean toggle — like flipping a single bit in a register. Minimal, precise, two partials creating a quick interference blip.

**Synthesis** — Two sine oscillators: 660 Hz and 670 Hz (10 Hz beating). Combined gain 0.14. Duration 40ms. Envelope: attack 1ms, exponential decay to 0.001 at 40ms. Comb filter (delay 1.2ms, feedback 0.3). No noise layer — pure tone only. Structurally different from CLICK (beating pair vs multi-partial + noise burst).

---

### 10. TAB_INSERT

| | |
|---|---|
| **Duration** | 110 ms |
| **Base Freq** | 350 Hz |
| **Variants** | 1 |

**Concept** — A new code buffer opening — three additive chords cascade upward like a new editor pane materializing, each chord a cluster of partials.

**Synthesis** — Three micro-chords staggered 18ms apart. Chord 1 (t+0): sines at 350+700 Hz. Chord 2 (t+18ms): sines at 500+1000 Hz. Chord 3 (t+36ms): sines at 700+1400 Hz. Each chord gain 0.12, decay to 0.001 over 40ms. Comb filter on output (delay 2ms, feedback 0.35). Granular noise at each chord onset: bandpass 4000 Hz (Q=3), gain 0.05, 5ms.

---

### 11. TAB_CLOSE

| | |
|---|---|
| **Duration** | 95 ms |
| **Base Freq** | 700 Hz |
| **Variants** | 1 |

**Concept** — A code buffer closing — three descending chords collapsing like an editor pane folding shut.

**Synthesis** — Three micro-chords staggered 15ms apart, descending. Chord 1 (t+0): sines at 700+1400 Hz. Chord 2 (t+15ms): sines at 500+1000 Hz. Chord 3 (t+30ms): sines at 350+700 Hz. Each gain 0.10, decay to 0.001 over 35ms. Comb filter (delay 2ms, feedback 0.3). Noise at each onset: bandpass 3500 Hz (Q=3), gain 0.04, 5ms.

---

### 12. TAB_SLASH

| | |
|---|---|
| **Duration** | 170 ms |
| **Base Freq** | 600 Hz |
| **Variants** | 1 |

**Concept** — Command palette activating — like a search spotlight illuminating floating code. A bright ping with harmonic bloom, the most distinctive UI sound.

**Synthesis** — Four sine partials simultaneously: 600 Hz (gain 0.14), 900 Hz (gain 0.10), 1500 Hz (gain 0.07), 3000 Hz (gain 0.04). Body (600, 900) decays to 0.001 at 60ms. Shimmer partials (1500, 3000) independent tail to 0.001 at 170ms. Comb filter (delay 1.8ms, feedback 0.5). Granular noise onset: bandpass 5000 Hz (Q=4), gain 0.08, 6ms. Low-pass filter sweep: 2000 Hz opening to 6000 Hz over 100ms (Q=1.5).

---

## Keyboard Sounds

### 13. TYPING_LETTER

| | |
|---|---|
| **Duration** | 30 ms |
| **Base Freq** | 500 Hz |
| **Variants** | 15 |

**Concept** — Keystrokes on a holographic keyboard — each press emits a tiny crystalline pip, subtly different each time. The pitch varies as if each glyph has its own resonant frequency.

**Synthesis** — Two sine partials: fundamental randomized from pool of 15 values (500 Hz + n*40 Hz, n=0..14), 2nd partial at fundamental*2.5. Fundamental gain 0.10, partial gain 0.04. Granular noise burst: bandpass center randomized 3000-5000 Hz (Q=3), gain 0.08, 6ms. Comb filter (delay 1.5ms, feedback 0.25). Envelope: attack 1ms, exponential decay to 0.001 at 30ms. No spectral tail on typing — keep it crisp.

---

### 14. TYPING_BACKSPACE

| | |
|---|---|
| **Duration** | 35 ms |
| **Base Freq** | 380 Hz |
| **Variants** | 1 |

**Concept** — Deleting a glyph — the character un-renders, a lower and softer inverse of the letter press. Like a pixel de-rezzing.

**Synthesis** — Two sine partials: 380 Hz (gain 0.08) sweeping down to 320 Hz, 950 Hz (gain 0.04) sweeping to 800 Hz. Granular noise: bandpass 2500 Hz (Q=2.5), gain 0.07, 5ms. Comb filter (delay 2ms, feedback 0.2). Envelope: attack 1ms, decay to 0.001 at 35ms.

---

### 15. TYPING_ENTER

| | |
|---|---|
| **Duration** | 85 ms |
| **Base Freq** | 300 Hz |
| **Variants** | 1 |

**Concept** — Execute/newline — the heaviest key, like committing a line of code. A thuddy impact with harmonic bloom and lingering upper partials.

**Synthesis** — Four sine partials: 300 Hz (gain 0.14), 600 Hz (gain 0.08), 1200 Hz (gain 0.05), 2400 Hz (gain 0.03). Granular noise burst: bandpass 2000 Hz (Q=2), gain 0.12, 8ms. Comb filter (delay 2.5ms, feedback 0.4). Body (300, 600) decay to 0.001 at 45ms. Upper partials (1200, 2400) spectral tail to 0.001 at 85ms.

---

### 16. TYPING_SPACE

| | |
|---|---|
| **Duration** | 35 ms |
| **Base Freq** | 420 Hz |
| **Variants** | 1 |

**Concept** — The space bar — broader and more diffuse than a letter key, like a wide horizontal glyph placeholder materializing. Hollow, airy.

**Synthesis** — Three sine partials spread wide: 420 Hz (gain 0.08), 630 Hz (gain 0.06), 1260 Hz (gain 0.03). Granular noise: wider bandpass at 2500 Hz (Q=1.5), gain 0.09, 7ms — more diffuse than letter noise. Comb filter (delay 2ms, feedback 0.2). Envelope: attack 2ms, decay to 0.001 at 35ms. Broader, airier feel from low Q and spread partials.

---

## Application Sounds

### 17. APP_START

| | |
|---|---|
| **Duration** | 1300 ms |
| **Base Freq** | 150 Hz |
| **Variants** | 1 |

**Concept** — The IDE awakening — a deep presence emerging from silence as the holographic display initializes. Partials fade in one by one like lines of code appearing on screen, building to a shimmering chord that slowly dissolves. Mysterious, calm, vast.

**Synthesis** — Six sine partials fading in sequentially: 150 Hz at t+0 (gain 0→0.08 over 200ms), 300 Hz at t+150ms (gain 0→0.06 over 200ms), 450 Hz at t+300ms (gain 0→0.05 over 200ms), 750 Hz at t+450ms (gain 0→0.04 over 200ms), 1200 Hz at t+600ms (gain 0→0.03 over 200ms), 2400 Hz at t+750ms (gain 0→0.02 over 200ms). All partials sustain briefly then decay to 0.001 by 1300ms. Comb filter on output (delay 3ms, feedback 0.5 decaying to 0.1). Low-pass filter: starts at 400 Hz, sweeps to 6000 Hz over 900ms (Q=1.5). Noise bed: bandpass 1500 Hz (Q=1), gain 0.03, full duration with slow gain swell 0→0.03→0.001. Creates the feeling of a vast digital space powering on around you.
