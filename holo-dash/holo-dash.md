# Holo Dash

> Holographic command dashboard — glass-panel UI sounds with phaser-swept sawtooth tones and translucent precision.

![Holo Dash cover](cover.png)

---

## Theme Identity

| Property | Value |
|---|---|
| Accent | Electric cyan `#00D4FF`, Warm hologram amber `#FFA63E` |
| Base | Deep navy `#0B1628`, dark slate panels, charcoal borders |
| Mood | A young technician at a floating holographic workstation — concentric radar rings pulse cyan, glass panels hover mid-air, everything hums with focused digital precision |
| Engine | Web Audio API only — no sample files, oscillators + noise + filters + envelopes |

---

## Sonic DNA

> Every theme must define a **unique synthesis identity** — a set of 3-5 signature
> techniques that fundamentally shape how every sound is built. Two themes should
> never share the same Sonic DNA. Changing frequencies or filter cutoffs alone is
> NOT sufficient differentiation.

| Technique | Description |
|---|---|
| **Primary waveform** | Phase-shifted sawtooth pairs — two sawtooth oscillators with slight frequency offset (2-8 Hz) creating a natural phasing interference pattern, giving every sound a translucent holographic shimmer. |
| **Signature effect** | Allpass phaser chain — 2-3 cascaded allpass filters with swept center frequencies, creating the characteristic holographic sweep that defines the theme's fingerprint. Emulates light refracting through glass HUD panels. |
| **Transient character** | Filtered noise click transients, 4-6ms — bandpass-filtered noise bursts with moderate Q, simulating the tactile "glass tap" of touching a holographic surface. Neither harsh nor soft — precise and clinical. |
| **Envelope philosophy** | Medium attack (3-5ms) into phaser-swept tail — sounds have a clean onset followed by a shimmering decay where the allpass sweep is most audible. Mid-length tails (40-150ms) that dissolve through the phaser. |
| **Frequency world** | Focused mid-band 400 Hz-5 kHz with sweeping resonant peaks — the allpass chain creates moving notches and peaks within this range. Sub-bass is rare and reserved for IMPORTANT_CLICK and APP_START only. |

**Differentiation rule**: Before implementing, compare the above table against
all existing themes. If any two themes share the same primary waveform AND
signature effect AND envelope philosophy, the design is too similar. Redesign
until at least 3 of 5 rows are fundamentally different.

---

## Browser Sounds

### 1. HOVER

| | |
|---|---|
| **Duration** | 60 ms |
| **Base Freq** | 900 Hz |
| **Variants** | 1 |

**Concept** — A holographic panel brightening as a cursor passes over it. A thin glass shimmer, like light catching the edge of a transparent display. Subtle but present.

**Synthesis** — Two sawtooth oscillators at 900 Hz and 902 Hz (2 Hz offset) for phase beating. Both sweep up to 960 Hz / 962 Hz over 60ms. Routed through a single allpass filter at 2000 Hz (Q=5) swept to 3000 Hz. Gain envelope: 0 -> 0.06 linear in 3ms, exponential decay to 0.001 at 60ms. Noise layer: bandpass noise at 4500 Hz (Q=3), gain 0.025, duration 8ms.

---

### 2. HOVER_UP

| | |
|---|---|
| **Duration** | 50 ms |
| **Base Freq** | 960 Hz |
| **Variants** | 1 |

**Concept** — Holographic panel dimming as cursor leaves. The inverse shimmer — light fading from the glass edge. Slightly shorter and descending.

**Synthesis** — Two sawtooth oscillators at 960 Hz and 962 Hz sweeping down to 850 Hz / 852 Hz over 50ms. Allpass filter at 3000 Hz swept down to 1800 Hz. Gain envelope: 0 -> 0.06 in 2ms, exponential decay to 0.001 at 50ms. Noise layer: bandpass at 4000 Hz (Q=2.5), gain 0.02, duration 6ms.

---

### 3. CLICK

| | |
|---|---|
| **Duration** | 35 ms |
| **Base Freq** | 680 Hz |
| **Variants** | 1 |

**Concept** — Tapping a glass holographic button. A crisp, precise contact with a translucent surface — not a mechanical click, but a glass-touch confirmation.

**Synthesis** — Two sawtooth oscillators at 680 Hz and 684 Hz (4 Hz offset). Routed through allpass at 1800 Hz (Q=4). Gain envelope: 0 -> 0.15 in 1ms (sharp onset), exponential decay to 0.001 at 35ms. Noise transient: bandpass at 3500 Hz (Q=4), gain 0.12, duration 5ms — the "tap" on glass.

---

### 4. IMPORTANT_CLICK

| | |
|---|---|
| **Duration** | 120 ms |
| **Base Freq** | 440 Hz |
| **Variants** | 1 |

**Concept** — Pressing a large holographic command button. The glass surface depresses with weight, and the surrounding ring display pulses. Authoritative, with sub-bass resonance from the dashboard chassis.

**Synthesis** — Two sawtooth oscillators at 440 Hz and 444 Hz. Allpass chain: two cascaded allpass filters at 1200 Hz and 2400 Hz, both swept up by 600 Hz over 80ms. Gain: 0 -> 0.18 in 2ms, sustain at 0.18 for 15ms, exponential decay to 0.001 at 120ms. Sub-bass: sine at 70 Hz, gain 0 -> 0.10 in 2ms, decay to 0.001 at 80ms. Noise transient: bandpass 3000 Hz (Q=3), gain 0.14, duration 6ms.

---

### 5. FEATURE_SWITCH_ON

| | |
|---|---|
| **Duration** | 260 ms |
| **Base Freq** | 300 Hz |
| **Variants** | 1 |

**Concept** — A holographic subsystem powering on. Concentric rings on the radar display light up sequentially from center outward, each ring adding a higher frequency. The phaser sweep opens like a lens aperture.

**Synthesis** — Three sawtooth pairs at 300/302, 600/603, 1200/1205 Hz, staggered onset at 0, 40ms, 80ms. Each pair routed through an allpass filter swept from 800 Hz to 4000 Hz over its duration. Gain per pair: 0 -> 0.10 in 5ms, sustain 60ms, exponential decay to 0.001. LP filter on master: swept from 1000 Hz to 6000 Hz over 220ms (Q=2). Noise transient at onset: bandpass 2500 Hz (Q=2), gain 0.06, 8ms.

---

### 6. FEATURE_SWITCH_OFF

| | |
|---|---|
| **Duration** | 240 ms |
| **Base Freq** | 1200 Hz |
| **Variants** | 1 |

**Concept** — Holographic subsystem shutting down. Rings collapse inward, higher frequencies extinguish first. The phaser sweep closes like an iris.

**Synthesis** — Three sawtooth pairs at 1200/1205, 600/603, 300/302 Hz, staggered onset at 0, 40ms, 80ms (high to low). Each with allpass swept from 4000 Hz to 800 Hz. Gain per pair: 0 -> 0.09 in 4ms, exponential decay to 0.001 over 160ms. LP filter on master: swept from 6000 Hz to 800 Hz over 220ms (Q=2). Noise at onset: bandpass 3000 Hz (Q=2), gain 0.05, 7ms.

---

### 7. LIMITER_ON

| | |
|---|---|
| **Duration** | 200 ms |
| **Base Freq** | 500 Hz |
| **Variants** | 1 |

**Concept** — Security lock engaging on a holographic panel. The display narrows, edges constrict, the ring pattern tightens. A focused, squeezing sensation.

**Synthesis** — Two sawtooth pairs starting spread (400/403 Hz and 700/704 Hz) converging to 500/503 Hz and 540/543 Hz over 150ms. Allpass at 1500 Hz with Q rising from 2 to 8 over duration (increasing resonance = tightening). Gain: 0 -> 0.10 in 3ms, exponential decay to 0.001 at 200ms. HP noise: highpass at 3000 Hz, gain 0.08, 5ms onset click.

---

### 8. LIMITER_OFF

| | |
|---|---|
| **Duration** | 190 ms |
| **Base Freq** | 520 Hz |
| **Variants** | 1 |

**Concept** — Security lock releasing. The holographic panel expands back to full size, rings spread outward. A decompression burst.

**Synthesis** — Two sawtooth pairs starting close (520/523 Hz and 540/543 Hz) diverging to 400/403 Hz and 750/754 Hz over 150ms. Allpass at 1500 Hz with Q dropping from 8 to 2 (loosening resonance). Gain: 0 -> 0.10 in 2ms, exponential decay to 0.001 at 190ms. Noise burst: bandpass 4000 Hz (Q=3), gain 0.10, 6ms — the release "pop".

---

### 9. SWITCH_TOGGLE

| | |
|---|---|
| **Duration** | 40 ms |
| **Base Freq** | 800 Hz |
| **Variants** | 1 |

**Concept** — A small holographic toggle flipping state. Minimal, precise — like a single pixel on the HUD changing color. Different from CLICK: this is a frequency-jump rather than a tap.

**Synthesis** — Single sawtooth at 800 Hz jumping to 1000 Hz at 8ms mark (abrupt frequency step). Allpass at 2200 Hz (Q=3), static. Gain: 0 -> 0.08 in 1ms, exponential decay to 0.001 at 40ms. No noise layer — pure tonal flip.

---

### 10. TAB_INSERT

| | |
|---|---|
| **Duration** | 100 ms |
| **Base Freq** | 500 Hz |
| **Variants** | 1 |

**Concept** — A new holographic panel sliding into the display array. Three rings materializing in sequence — each ring a higher pitch. Glass panels snapping into position.

**Synthesis** — Three sawtooth pairs at 500/503, 750/753, 1000/1004 Hz, staggered at 0, 15ms, 30ms. Each routed through allpass at 2000 Hz (Q=4). Per-blip gain: 0 -> 0.12 in 1ms, exponential decay to 0.001 in 25ms. Noise tap per blip: bandpass 4000 Hz (Q=3), gain 0.06, 4ms.

---

### 11. TAB_CLOSE

| | |
|---|---|
| **Duration** | 90 ms |
| **Base Freq** | 1000 Hz |
| **Variants** | 1 |

**Concept** — A holographic panel dissolving from the array. Three rings de-materializing high to low. Glass shattering into pixels.

**Synthesis** — Three sawtooth pairs at 1000/1004, 750/753, 500/503 Hz, staggered at 0, 12ms, 24ms. Each through allpass at 2000 Hz (Q=4). Per-blip gain: 0 -> 0.10 in 1ms, exponential decay to 0.001 in 22ms. Noise tap per blip: bandpass 3500 Hz (Q=3), gain 0.05, 4ms.

---

### 12. TAB_SLASH

| | |
|---|---|
| **Duration** | 160 ms |
| **Base Freq** | 700 Hz |
| **Variants** | 1 |

**Concept** — Command palette activating. The main holographic ring display zooms to focus mode — a bright cyan ping with a phaser sweep tail, like a radar sweep completing one rotation.

**Synthesis** — Two sawtooth oscillators at 700 Hz and 704 Hz. Two cascaded allpass filters: first at 1500 Hz swept to 4000 Hz over 120ms, second at 3000 Hz swept to 1500 Hz (counter-sweep for complexity). Gain: 0 -> 0.14 in 2ms, hold at 0.14 for 20ms, exponential decay to 0.001 at 160ms. Noise: bandpass 5000 Hz (Q=4), gain 0.08, 5ms. Upper shimmer: sine at 2100 Hz, gain 0.04, fades over 160ms.

---

## Keyboard Sounds

### 13. TYPING_LETTER

| | |
|---|---|
| **Duration** | 28 ms |
| **Base Freq** | 600 Hz |
| **Variants** | 15 |

**Concept** — Typing on a holographic keyboard. Each key is a floating glass square that briefly illuminates on press. Should feel weightless but precise — more glass-tap than mechanical click.

**Synthesis** — Two sawtooth oscillators with body frequency randomized: 600 + (0-14) * 35 Hz, offset by 3 Hz. Allpass at noise centre (2500 + random jitter +/- 800 Hz), Q=3. Gain: 0 -> 0.10 in 1ms, exponential decay to 0.001 at 28ms. Noise micro-grain: bandpass at noise centre (Q=4), gain 0.09, duration 4ms.

---

### 14. TYPING_BACKSPACE

| | |
|---|---|
| **Duration** | 32 ms |
| **Base Freq** | 480 Hz |
| **Variants** | 1 |

**Concept** — Deleting a holographic character. The floating glyph flickers and dissolves downward. Lower and retracting compared to TYPING_LETTER.

**Synthesis** — Two sawtooth oscillators at 480 Hz and 483 Hz, sweeping down to 400 Hz / 403 Hz over 32ms. Allpass at 1800 Hz (Q=3). Gain: 0 -> 0.08 in 1ms, exponential decay to 0.001 at 32ms. Noise: bandpass 2500 Hz (Q=3), gain 0.07, 5ms.

---

### 15. TYPING_ENTER

| | |
|---|---|
| **Duration** | 80 ms |
| **Base Freq** | 400 Hz |
| **Variants** | 1 |

**Concept** — Confirming a holographic command line. The entire display flashes briefly — the heaviest keyboard sound. A glass bar slamming down with resonance.

**Synthesis** — Two sawtooth oscillators at 400 Hz and 405 Hz (wider 5 Hz offset for heavier beating). Allpass chain: two cascaded allpass at 1200 Hz and 2500 Hz, first swept to 2000 Hz. Gain: 0 -> 0.16 in 2ms, exponential decay to 0.001 at 80ms. Sub-bass: sine at 90 Hz, gain 0 -> 0.06 in 2ms, decay to 0.001 at 50ms. Noise burst: bandpass 3000 Hz (Q=3), gain 0.12, 6ms.

---

### 16. TYPING_SPACE

| | |
|---|---|
| **Duration** | 30 ms |
| **Base Freq** | 550 Hz |
| **Variants** | 1 |

**Concept** — Space bar on the holographic keyboard. Broader contact area than a letter key — wider, more diffuse, like a palm brushing across glass.

**Synthesis** — Two sawtooth oscillators at 550 Hz and 554 Hz (4 Hz offset for wider phase). Allpass at 2000 Hz (Q=2 — lower Q for diffuse character). Gain: 0 -> 0.08 in 2ms, exponential decay to 0.001 at 30ms. Noise: bandpass 3000 Hz (Q=1.5 — very broad), gain 0.08, 6ms.

---

## Application Sounds

### 17. APP_START

| | |
|---|---|
| **Duration** | 1200 ms |
| **Base Freq** | 180 Hz |
| **Variants** | 1 |

**Concept** — The holographic dashboard booting up. Starting from silence, concentric rings fade in one by one — each adding a new frequency layer. The allpass phaser sweep slowly opens across the full spectrum, like a radar dish coming online. The mood: a presence awakening behind glass.

**Synthesis** — Five sawtooth pairs at 180/182, 360/363, 540/543, 900/904, 1800/1805 Hz, staggered at 0, 150ms, 300ms, 500ms, 700ms. Each pair through allpass swept from 500 Hz to 4000 Hz over its lifetime. Per-pair gain: 0 -> fade in over 150ms to peak (0.06, 0.05, 0.04, 0.03, 0.02), hold 100ms, exponential decay to 0.001 by 1200ms. Master LP filter: swept from 300 Hz to 7000 Hz over 900ms (Q=1.5). Ambient noise bed: bandpass 2000 Hz (Q=1), gain 0 -> 0.025 over 400ms, hold, decay to 0.001 by 1200ms. Duration 1.2s. Sub-bass drone: sine at 50 Hz, gain 0.04, fades in over 300ms and out over last 400ms.
