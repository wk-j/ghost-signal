# Dune Beacon

> Ancient-futuristic desert monolith — golden crystalline metal, wind-blown sand, starfield void, and the warm hum of a civilization's last signal tower.

![Dune Beacon cover](cover.png)

---

## Theme Identity

| Property | Value |
|---|---|
| Accent | Warm gold `#D4A646`, Pale amber `#E8C875` |
| Base | Deep navy void, dark blue-gray surfaces, muted sand borders |
| Mood | A colossal golden spire rising from endless desert dunes into a starlit sky — ancient energy radiating upward through crystalline facets, warm light pooling at its base while cold stars watch from above |
| Engine | Web Audio API only — no sample files, oscillators + noise + filters + envelopes |

---

## Sonic DNA

> Every theme must define a **unique synthesis identity** — a set of 3–5 signature
> techniques that fundamentally shape how every sound is built. Two themes should
> never share the same Sonic DNA. Changing frequencies or filter cutoffs alone is
> NOT sufficient differentiation.

| Technique | Description |
|---|---|
| **Primary waveform** | Triangle wave with harmonic overtone stacking — fundamental + 2nd + 3rd harmonics at decreasing amplitudes, creating warm bell-like tones reminiscent of golden metal resonance. Not additive sine partials (Deep Glyph) — triangle's odd-harmonic content gives a distinctly warmer, hollower character. |
| **Signature effect** | Parallel resonant bandpass filter bank — 3-4 narrow bandpass filters at harmonic intervals processing the same source simultaneously, simulating the body resonance of the golden crystalline spire. Each filter has Q of 8-15 at different harmonic ratios. |
| **Transient character** | Sand-grain noise burst through lowpass filter, 10-15ms — soft granular onset like wind-blown sand particles striking golden metal. Wider and softer than Deep Glyph's granular bursts. |
| **Envelope philosophy** | Monumental decay — moderate attack (5-20ms), very long exponential release (200ms-2s). Sounds echo across vast desert space. Not dissolving into void (Orbit Deck) — these tones ring and resonate like struck metal in open air. |
| **Frequency world** | Warm golden band 200Hz-2.5kHz with steep high-frequency rolloff above 3kHz. Desert-filtered warmth — no harsh brilliance, no metallic shimmer. Sub-bass appears only in heavy sounds (IMPORTANT_CLICK, TYPING_ENTER, APP_START). |

**Differentiation rule**: Before implementing, compare the above table against
all existing themes. If any two themes share the same primary waveform AND
signature effect AND envelope philosophy, the design is too similar. Redesign
until at least 3 of 5 rows are fundamentally different.

---

## Browser Sounds

### 1. HOVER

| | |
|---|---|
| **Duration** | 70 ms |
| **Base Freq** | 600 Hz |
| **Variants** | 1 |

**Concept** — The spire senses your proximity. A warm golden shimmer like heat haze — faint triangle overtones rising through the filter bank, preceded by the softest breath of sand.

**Synthesis** — Sand-grain noise burst: white noise through lowpass at 2kHz, Q=1, gain 0→0.06 in 2ms, exponential decay to 0.001 by 12ms. Triangle overtone layer: two triangle oscillators at 600Hz and 1200Hz (2nd harmonic at -6dB). Both routed through parallel bandpass filters at 800Hz (Q=10) and 1400Hz (Q=8). Master gain: 0→0.08 in 5ms, exponential decay to 0.001 by 70ms. Lowpass at 2.5kHz on output to warm the tone.

---

### 2. HOVER_UP

| | |
|---|---|
| **Duration** | 55 ms |
| **Base Freq** | 500 Hz |
| **Variants** | 1 |

**Concept** — Warmth retreating as you pull away. A descending golden tone — the filter bank narrows as if the spire's attention withdraws.

**Synthesis** — Triangle oscillator at 600Hz sweeping down to 400Hz over 55ms. Second harmonic at 1200Hz→800Hz. Single bandpass at 900Hz, Q=10, frequency sweeping down to 600Hz. Gain: 0.07 at onset, exponential decay to 0.001 by 55ms. Lowpass at 2kHz. No noise layer — clean retreat.

---

### 3. CLICK

| | |
|---|---|
| **Duration** | 40 ms |
| **Base Freq** | 700 Hz |
| **Variants** | 1 |

**Concept** — Tapping the golden stone surface. A tactile snap with warm metallic resonance — sand-grain transient into brief filter-bank ring.

**Synthesis** — Sand-grain transient: noise burst through lowpass 1.8kHz, gain 0.15→0.001 in 8ms. Triangle overtone body: oscillators at 700Hz + 1400Hz + 2100Hz (gains 0.14, 0.08, 0.04). Parallel bandpass bank: 900Hz (Q=12) and 1600Hz (Q=10). Master gain: 0.14 at onset, exponential decay to 0.001 by 40ms. Output lowpass 2.5kHz.

---

### 4. IMPORTANT_CLICK

| | |
|---|---|
| **Duration** | 130 ms |
| **Base Freq** | 440 Hz |
| **Variants** | 1 |

**Concept** — Pressing a seal into the monolith's surface. Heavy, resonant, authoritative — the full filter bank rings with golden warmth, sub-bass foundation rumbles through the stone.

**Synthesis** — Sand-grain transient: noise through lowpass 1.5kHz, gain 0.18→0.001 in 12ms. Triangle overtone stack: 440Hz + 880Hz + 1320Hz (gains 0.18, 0.12, 0.06). Three parallel bandpass filters: 600Hz (Q=12), 1000Hz (Q=10), 1800Hz (Q=8). Master gain: 0→0.20 in 3ms, hold at 0.20 until 40ms, exponential decay to 0.001 by 130ms. Sub-bass: sine at 55Hz, gain 0.14→0.001 by 80ms. Output lowpass at 2.5kHz.

---

### 5. FEATURE_SWITCH_ON

| | |
|---|---|
| **Duration** | 280 ms |
| **Base Freq** | 300 Hz |
| **Variants** | 1 |

**Concept** — The spire powering up — golden energy ascending through crystalline facets. Filter bank widens as more resonant frequencies activate, overtones climb.

**Synthesis** — Sand-grain onset: noise through sweeping lowpass 1kHz→2.5kHz, gain 0.10→0.001 in 15ms. Triangle overtone sweep: fundamental 300Hz→600Hz, 2nd harmonic 600Hz→1200Hz, 3rd harmonic 900Hz→1800Hz — all linear ramps over 250ms. Parallel bandpass bank: filter 1 at 400Hz→800Hz (Q=10), filter 2 at 800Hz→1400Hz (Q=8), filter 3 at 1200Hz→2200Hz (Q=6) — all sweeping upward. Master gain: 0→0.18 in 20ms, hold at 0.18 until 180ms, exponential decay to 0.001 by 280ms. Output lowpass at 3kHz.

---

### 6. FEATURE_SWITCH_OFF

| | |
|---|---|
| **Duration** | 260 ms |
| **Base Freq** | 600 Hz |
| **Variants** | 1 |

**Concept** — Energy draining down the spire. Overtones descend, filter bank narrows as resonant frequencies power down one by one — warmth collapsing inward.

**Synthesis** — Triangle overtone sweep: fundamental 600Hz→250Hz, 2nd harmonic 1200Hz→500Hz, 3rd harmonic 1800Hz→750Hz — all linear ramps over 230ms. Parallel bandpass bank: filter 1 at 800Hz→400Hz (Q=10), filter 2 at 1400Hz→600Hz (Q=8) — narrowing. Master gain: 0.18 at onset, exponential decay to 0.001 by 260ms. Sand-grain tail: noise burst at 180ms, lowpass 1.2kHz, gain 0.06→0.001 by 260ms. Output lowpass at 2.5kHz.

---

### 7. LIMITER_ON

| | |
|---|---|
| **Duration** | 200 ms |
| **Base Freq** | 500 Hz |
| **Variants** | 1 |

**Concept** — A stone slab sliding into place, sealing an opening. Constrained, tight — the filter bank converges to a single narrow resonance as if all frequencies are clamped into one.

**Synthesis** — Sand-grain transient: noise through lowpass 1.5kHz, gain 0.12→0.001 in 10ms. Triangle overtones: 500Hz + 1000Hz start wide, 3rd harmonic 1500Hz fades out by 80ms. Bandpass filters converge: filter 1 starts 600Hz→800Hz (Q=10→18), filter 2 starts 1200Hz→800Hz (Q=8→18) — both arriving at same frequency. Gain: 0→0.15 in 5ms, hold until 120ms, exponential decay to 0.001 by 200ms. Output lowpass 2kHz — deliberately muffled.

---

### 8. LIMITER_OFF

| | |
|---|---|
| **Duration** | 190 ms |
| **Base Freq** | 500 Hz |
| **Variants** | 1 |

**Concept** — The stone slab sliding open, releasing pressure. Filter bank explodes outward from the single clamped resonance — freedom, expansion, warm air rushing in.

**Synthesis** — Starts at converged state: triangle at 500Hz + 1000Hz through single bandpass at 800Hz (Q=18). Bandpass splits: filter 1 sweeps 800Hz→500Hz (Q=18→8), filter 2 sweeps 800Hz→1400Hz (Q=18→8) — diverging. Sand-grain burst at 20ms: noise through bandpass 1.2kHz (Q=2), gain 0.10→0.001 by 60ms. Triangle gain: 0.15 at onset, exponential decay to 0.001 by 190ms. Output lowpass opens: 1.5kHz→3kHz over 100ms.

---

### 9. SWITCH_TOGGLE

| | |
|---|---|
| **Duration** | 45 ms |
| **Base Freq** | 900 Hz |
| **Variants** | 1 |

**Concept** — A small golden toggle clicking into position. Quick micro-chime — single triangle overtone through one resonant bandpass. Distinct from CLICK by its higher pitch and single-filter (not bank) topology.

**Synthesis** — Triangle oscillator at 900Hz, second at 1800Hz (gain halved). Single bandpass at 1200Hz, Q=14. Gain: 0.12 at onset, exponential decay to 0.001 by 45ms. No noise layer — pure resonant ping. Output lowpass at 2.5kHz.

---

### 10. TAB_INSERT

| | |
|---|---|
| **Duration** | 110 ms |
| **Base Freq** | 500 Hz |
| **Variants** | 1 |

**Concept** — A new facet of the spire illuminating. Three ascending golden chimes — each step adds another harmonic to the overtone stack, filter bank resonances brighten progressively.

**Synthesis** — Three chime steps at 0ms, 18ms, 36ms. Step 1: triangle at 500Hz through bandpass 700Hz (Q=10), gain 0.12→0.001 over 30ms. Step 2: triangles at 700Hz + 1400Hz through bandpass 900Hz (Q=10), gain 0.14→0.001 over 30ms. Step 3: triangles at 900Hz + 1800Hz + 2700Hz through bandpass 1200Hz (Q=10), gain 0.16→0.001 over 40ms. Each step richer than the last. Output lowpass 2.8kHz.

---

### 11. TAB_CLOSE

| | |
|---|---|
| **Duration** | 95 ms |
| **Base Freq** | 900 Hz |
| **Variants** | 1 |

**Concept** — A facet dimming. Three descending chimes — each step loses a harmonic, filter bank narrows. Inverse of TAB_INSERT.

**Synthesis** — Three chime steps at 0ms, 15ms, 30ms. Step 1: triangles at 900Hz + 1800Hz + 2700Hz through bandpass 1200Hz (Q=10), gain 0.14→0.001 over 25ms. Step 2: triangles at 700Hz + 1400Hz through bandpass 900Hz (Q=10), gain 0.12→0.001 over 25ms. Step 3: triangle at 400Hz through bandpass 600Hz (Q=10), gain 0.10→0.001 over 35ms. Sand-grain tail: noise at 50ms, lowpass 800Hz, gain 0.04→0.001 by 95ms.

---

### 12. TAB_SLASH

| | |
|---|---|
| **Duration** | 170 ms |
| **Base Freq** | 800 Hz |
| **Variants** | 1 |

**Concept** — The beacon activating its signal — a bright golden ping that rings across the desert. Full filter bank showcase with long monumental decay.

**Synthesis** — Sand-grain onset: noise through lowpass 2kHz, gain 0.10→0.001 in 10ms. Triangle overtone stack: 800Hz + 1600Hz + 2400Hz (gains 0.16, 0.10, 0.05). Full filter bank: bandpass at 900Hz (Q=12), 1400Hz (Q=10), 2000Hz (Q=8). Master gain: 0→0.18 in 3ms, exponential decay to 0.001 by 170ms — long resonant tail. Output lowpass at 2.8kHz.

---

## Keyboard Sounds

### 13. TYPING_LETTER

| | |
|---|---|
| **Duration** | 25 ms |
| **Base Freq** | 800 Hz |
| **Variants** | 15 |

**Concept** — Sand grains striking golden metal. Each keystroke is a unique tiny impact — randomized triangle overtone pitch through a single randomized bandpass resonance, with a micro sand-noise transient.

**Synthesis** — Sand-grain tap: noise through lowpass 2kHz, gain 0.08→0.001 in 6ms. Triangle overtone body: base frequency from pool of 15 values (800Hz + variant * 60Hz, range 800-1640Hz), second harmonic at double. Single bandpass at base * 1.3 + random jitter +/-100Hz, Q=10. Body gain: 0.10→0.001 by 20ms. Output lowpass 2.5kHz.

---

### 14. TYPING_BACKSPACE

| | |
|---|---|
| **Duration** | 30 ms |
| **Base Freq** | 500 Hz |
| **Variants** | 1 |

**Concept** — Sand retreating — a softer, lower impact. The overtone descends slightly, filter bank resonance is lower and more muffled than TYPING_LETTER.

**Synthesis** — Triangle at 500Hz sweeping to 400Hz over 25ms. Second harmonic 1000Hz→800Hz. Single bandpass at 700Hz, Q=8. Gain: 0.09→0.001 by 30ms. Lowpass at 1.8kHz — muffled. No noise layer — clean retraction.

---

### 15. TYPING_ENTER

| | |
|---|---|
| **Duration** | 90 ms |
| **Base Freq** | 400 Hz |
| **Variants** | 1 |

**Concept** — Pressing the seal of command. The heaviest key — full overtone stack through the complete filter bank with sub-bass rumble. A miniature version of the spire's power.

**Synthesis** — Sand-grain transient: noise through lowpass 1.5kHz, gain 0.14→0.001 in 10ms. Triangle overtone stack: 400Hz + 800Hz + 1200Hz (gains 0.16, 0.10, 0.05). Three bandpass filters: 550Hz (Q=12), 900Hz (Q=10), 1400Hz (Q=8). Master gain: 0.16 at onset, exponential decay to 0.001 by 90ms. Sub-bass: sine at 60Hz, gain 0.12→0.001 by 50ms. Output lowpass 2.5kHz.

---

### 16. TYPING_SPACE

| | |
|---|---|
| **Duration** | 30 ms |
| **Base Freq** | 600 Hz |
| **Variants** | 1 |

**Concept** — Wind across an open space. Broader and hollower than a letter key — wider bandpass, more noise, less tonal body. Like the gap between words is a small desert.

**Synthesis** — Sand-grain dominant: noise through bandpass 1kHz (Q=1.5), gain 0.10→0.001 by 25ms. Triangle at 600Hz, very quiet (gain 0.04→0.001 by 20ms). Single wide bandpass at 800Hz, Q=3 — wide, hollow. Output lowpass 2kHz.

---

## Application Sounds

### 17. APP_START

| | |
|---|---|
| **Duration** | 1400 ms |
| **Base Freq** | 165 Hz |
| **Variants** | 1 |

**Concept** — The spire awakening at dawn. Desert wind rises from silence, then the golden structure begins to hum — overtones stacking one by one as filter bank resonances ignite sequentially. Sub-bass foundation like tectonic rumble. The full Sonic DNA at its most expressive: sand-grain wind, triangle overtone cascade, sweeping filter bank, monumental decay into desert silence.

**Synthesis** — Layer 1 (Desert wind): noise through sweeping bandpass 400Hz→1200Hz→600Hz (Q=2), gain 0→0.08 by 300ms, hold until 800ms, decay to 0.001 by 1400ms. Layer 2 (Overtone cascade): triangle at 165Hz enters at 0ms, 330Hz enters at 200ms, 495Hz enters at 400ms, 660Hz enters at 600ms — each fading in over 150ms. All through sweeping parallel bandpass bank: 220Hz (Q=10), 440Hz (Q=8), 660Hz (Q=6), 880Hz (Q=5) — filters sweep upward 50% over 800ms then settle back. Master gain: 0→0.14 by 200ms, hold at 0.14 until 700ms, exponential decay to 0.001 by 1400ms. Layer 3 (Sub-bass): sine at 55Hz, gain 0→0.12 by 400ms, decay to 0.001 by 1000ms. Layer 4 (LFO shimmer): 3Hz sine LFO modulating master gain by +/-0.02 for breathing desert heat-haze effect. Output lowpass sweeps 1.5kHz→2.8kHz→2kHz over full duration.
