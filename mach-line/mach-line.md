# Mach Line

> A cold supersonic sound palette inspired by stealth aircraft and matte-black hypercars on wet tarmac — turbine whine, carbon-fiber taps, radar pings, and the compressed hush before a sonic boom, designed to make a browser feel like a classified weapons-system HUD.

![Mach Line cover](cover.png)

---

## Theme Identity

| Property | Value |
|---|---|
| Accent | Ice White `#D4E4F0`, Stealth Teal `#3AAFB9` |
| Base | Deep carbon black, wet-asphalt blue-grey, storm-cloud steel |
| Mood | Standing on a rain-slicked runway at midnight as a stealth fighter passes overhead at Mach 0.95 — the air compressed, every surface matte and radar-absorbing, LED headlight bars cutting through mist |
| Engine | Web Audio API only — no sample files, oscillators + noise + filters + envelopes |

---

## Sonic DNA

| Technique | Description |
|---|---|
| **Primary waveform** | FM percussion — high modulation-index oscillator pairs creating metallic, inharmonic timbres |
| **Signature effect** | Waveshaper distortion — every sound passes through a nonlinear transfer function (tanh-like curve) for compressed, aggressive dynamics |
| **Transient character** | Sub-2ms impulse, zero sustain — sounds are pure attack with no body, 0.5–2ms gain spikes |
| **Envelope philosophy** | Ultra-short, bone-dry — total durations under 50ms where possible, no reverb, no delay, no tail |
| **Frequency world** | Metallic shimmer above 4 kHz — high-frequency emphasis via highshelf boosts, sparkly and cold |

---

## Browser Sounds

### 1. HOVER

| | |
|---|---|
| **Duration** | 50 ms |
| **Base Freq** | 3000 Hz |
| **Variants** | 1 |

**Concept** — Radar sweep detection — a faint high-frequency ping like a proximity sensor acquiring a target. Cold, precise, almost subliminal.

**Synthesis** — FM percussion with carrier:modulator ratio 1:7. Sine carrier at 3000 Hz, sine modulator at 21 kHz with modulation index 4 (mod depth 12000 Hz) for dense metallic sidebands. Signal passes through medium waveshaper distortion (amount 20) at 4× oversampling, then a highshelf filter boosting +6 dB above 4 kHz for icy shimmer. Sub-2ms impulse envelope: gain 0 → 0.12 in 1 ms, exponential decay to 0.001 by 8 ms. Bone-dry, total duration 10 ms.

---

### 2. HOVER_UP

| | |
|---|---|
| **Duration** | 40 ms |
| **Base Freq** | 4200 Hz |
| **Variants** | 1 |

**Concept** — Radar lock releasing — the inverse sweep, higher to lower, shorter and sharper. Like a targeting reticle disengaging.

**Synthesis** — FM percussion with carrier:modulator ratio 1:5. Sine carrier at 4200 Hz, sine modulator at 21 kHz with modulation index 3 (mod depth 12600 Hz). Signal passes through light waveshaper distortion (amount 8) at 4× oversampling, then a highpass filter at 3000 Hz to strip low-end and keep the tick airborne. Sub-1ms impulse envelope: gain 0 → 0.10 in 0.8 ms, exponential decay to 0.001 by 6 ms. Bone-dry, total duration 8 ms — even shorter than HOVER for a snappier release.

---

### 3. CLICK

| | |
|---|---|
| **Duration** | 30 ms |
| **Base Freq** | 600 Hz |
| **Variants** | 1 |

**Concept** — Carbon-fiber relay snap — a hard, dry transient with no resonance tail. Like flicking a switch in an unpressurised cockpit. Crisp and militaristic.

**Synthesis** — Pure gain-impulse technique: sine oscillator at 600 Hz through heavy waveshaper distortion (amount 50) at 4× oversampling, which crushes the sine into a near-square with saturated harmonics. Highshelf filter boosts +8 dB above 5 kHz for metallic shimmer. Sub-0.5ms impulse envelope: gain 0 → 0.35 in 0.25 ms, back to 0 at 0.5 ms — a single-sample spike. No sustain, no tail. Total duration 2 ms. The waveshaper generates the harmonic content that a raw sine cannot provide.

---

### 4. IMPORTANT_CLICK

| | |
|---|---|
| **Duration** | 140 ms |
| **Base Freq** | 350 Hz |
| **Variants** | 1 |

**Concept** — Weapons release authorisation — a heavy, committed confirmation. Two-stage: initial hard click transient, then a deep turbine-like body tone with sub-bass pressure wave.

**Synthesis** — FM kick drum technique: sine carrier at 350 Hz with rapid pitch drop to 60 Hz over 50 ms, sine modulator at carrier×2 (700 Hz) sweeping down to carrier×0.5 (175 Hz) over 40 ms. Modulation index starts at 8 (mod depth 2800 Hz) and decays to 0.5 over 60 ms, producing an initial burst of inharmonic sidebands that collapse into a clean sub-tone. Signal passes through heavy waveshaper distortion (amount 50) at 4× oversampling for saturated impact, then a lowpass filter sweeping from 8 kHz down to 400 Hz over 80 ms (Q 2) to close the spectrum. Gain envelope: 0.30 instant onset, exponential decay to 0.001 over 100 ms. Total duration 120 ms.

---

### 5. FEATURE_SWITCH_ON

| | |
|---|---|
| **Duration** | 280 ms |
| **Base Freq** | 180 Hz |
| **Variants** | 1 |

**Concept** — Turbine spool-up — a system coming online with building rotational energy. Starts with a sharp ignition transient, then an ascending filtered tone that sweeps open like a jet engine throttling up.

**Synthesis** — FM sweep with rising modulation index. Sine carrier sweeps from 300 Hz to 2400 Hz (exponential) over 150 ms; sine modulator sweeps from 400 Hz to 1800 Hz (linear). Modulation index ramps from near-zero (depth 50 Hz) to high (depth 2000 Hz), generating increasing metallic harmonic density as the sound ascends. Signal passes through medium waveshaper distortion (amount 20) at 4× oversampling, then a highshelf filter boosting +4 dB above 3 kHz. Gain envelope: 0 → 0.18 in 5 ms (sub-2ms impulse onset), holds at 0.18 to 70% duration, exponential decay to 0.001 at 150 ms. Total duration 160 ms, bone-dry.

---

### 6. FEATURE_SWITCH_OFF

| | |
|---|---|
| **Duration** | 250 ms |
| **Base Freq** | 720 Hz |
| **Variants** | 1 |

**Concept** — Turbine spool-down — energy draining as the system powers off. A descending filtered tone with closing filter and a low-end rumble tail, like an engine winding down on the runway.

**Synthesis** — FM downsweep inverting FEATURE_SWITCH_ON. Sine carrier drops from 2400 Hz to 200 Hz (exponential) over 110 ms; sine modulator drops from 1800 Hz to 200 Hz (exponential). Modulation index decays from high (depth 2000 Hz) to near-zero (depth 20 Hz), draining metallic sidebands as the sound descends. Signal passes through medium waveshaper distortion (amount 20) at 4× oversampling, then a bandpass filter sweeping from 3000 Hz down to 500 Hz (Q 1.5) to narrow the spectrum as energy dies. Gain envelope: instant onset at 0.18, exponential decay to 0.001 over 110 ms. Total duration 120 ms, bone-dry.

---

### 7. LIMITER_ON

| | |
|---|---|
| **Duration** | 220 ms |
| **Base Freq** | 250 Hz |
| **Variants** | 1 |

**Concept** — G-force compression — the feeling of pressure building in a high-G turn. A tight, squeezed ascending tone with high filter resonance, like the cockpit canopy creaking under load.

**Synthesis** — Waveshaped square oscillator through extreme crush distortion (amount 150) at 4× oversampling for timbral compression — the signature "G-force" effect. Square oscillator sweeps from 400 Hz to 600 Hz (linear) over 180 ms. Narrow bandpass filter (Q 18) sweeps from 800 Hz to 1200 Hz, isolating a tight resonant peak that slides upward. Highshelf filter boosts +5 dB above 4 kHz for metallic shimmer. Gain envelope: 0 → 0.14 in 3 ms (sub-2ms-class onset), holds at 0.14 to 150 ms, exponential decay to 0.001 at 220 ms. Total duration 230 ms.

---

### 8. LIMITER_OFF

| | |
|---|---|
| **Duration** | 200 ms |
| **Base Freq** | 500 Hz |
| **Variants** | 1 |

**Concept** — G-force release — pressure escaping, decompression. An initial burst followed by a descending tone, like equalising cabin pressure after a dive.

**Synthesis** — Noise impulse through reducing waveshaper distortion. White noise buffer (200 ms) enters a pre-gain stage that ramps from 1.0 down to 0.05 over 180 ms, driving the heavy waveshaper distortion (amount 50) at 4× oversampling progressively less hard — simulating decompression as distortion releases. Bandpass filter sweeps from 2500 Hz down to 600 Hz (Q 4), narrowing the spectrum as pressure escapes. Gain envelope: instant onset at 0.20, exponential decay to 0.001 over 200 ms. Total duration 210 ms, bone-dry — no oscillators, pure shaped noise.

---

### 9. SWITCH_TOGGLE

| | |
|---|---|
| **Duration** | 35 ms |
| **Base Freq** | 1600 Hz |
| **Variants** | 1 |

**Concept** — Avionics toggle — a tiny, precise cockpit switch flip. Two stacked micro-blips like a latching relay in a weapons panel.

**Synthesis** — FM pop with carrier:modulator ratio 1:3. Sine carrier at 1600 Hz, sine modulator at 4800 Hz with modulation index 5 (mod depth 8000 Hz) for dense inharmonic sidebands. Signal passes through medium waveshaper distortion (amount 20) at 4× oversampling. Sub-1ms impulse envelope: gain 0 → 0.16 in 1 ms, exponential decay to 0.001 by 12 ms. Bone-dry, total duration 15 ms. Single FM tick — no stacked blips.

---

### 10. TAB_INSERT

| | |
|---|---|
| **Duration** | 110 ms |
| **Base Freq** | 550 Hz |
| **Variants** | 1 |

**Concept** — Radar contact acquired — three ascending pips like a new target appearing on a scope, plus a filtered sweep for motion.

**Synthesis** — FM percussion cascade: 3 ascending FM ticks with increasing modulation ratios. Carriers at 800, 1200, 1800 Hz with ratios 1:3, 1:5, 1:7 respectively (modulation index 4 each). Each tick spaced 15 ms apart with sub-1ms impulse envelopes (gain 0 → 1.0 in 1 ms, exponential decay to 0.001 by 8 ms, total 10 ms each). All three feed into a shared medium waveshaper distortion (amount 20) at 4× oversampling, then a highshelf filter boosting +5 dB above 4 kHz for metallic shimmer. Master gain 0.14. Bone-dry, no delay, no noise — pure FM metallic pings.

---

### 11. TAB_CLOSE

| | |
|---|---|
| **Duration** | 100 ms |
| **Base Freq** | 1100 Hz |
| **Variants** | 1 |

**Concept** — Radar contact lost — three descending pips like a target dropping off scope, plus a downward zip and low thud for finality.

**Synthesis** — Reverse FM cascade: 3 descending FM ticks with decreasing modulation ratios. Carriers at 1800, 1200, 800 Hz with ratios 1:7, 1:5, 1:3 respectively (modulation index 3 each). Each tick spaced 12 ms apart with sub-1ms impulse envelopes (gain 0 → 1.0 in 1 ms, exponential decay to 0.001 by 8 ms, total 10 ms each). All three feed into a shared medium waveshaper distortion (amount 20) at 4× oversampling, then a lowpass filter at 8 kHz (Q 2). Master gain 0.14. Bone-dry, no sawtooth zip, no sub thud — pure FM metallic cascade in reverse.

---

### 12. TAB_SLASH

| | |
|---|---|
| **Duration** | 150 ms |
| **Base Freq** | 1500 Hz |
| **Variants** | 1 |

**Concept** — IFF interrogation — a clean, authoritative ping like a friend-or-foe identification query. Alert without urgency.

**Synthesis** — FM bell using inharmonic carrier:modulator ratio 1:1.4 for bell-like sidebands. Sine carrier at 1500 Hz, sine modulator at 2100 Hz with decaying modulation index: mod depth starts at carrier×3 (4500 Hz) and decays exponentially to carrier×0.2 (300 Hz) over 80 ms, producing a bright metallic attack that settles into a cleaner tone. Signal passes through light waveshaper distortion (amount 8) at 4× oversampling, then a highshelf filter boosting +7 dB above 4500 Hz for cold shimmer. Gain envelope: 0 → 0.18 in 1 ms (sub-2ms impulse), exponential decay to 0.001 over 80 ms. Total duration 90 ms, bone-dry.

---

## Keyboard Sounds

### 13. TYPING_LETTER

| | |
|---|---|
| **Duration** | 22 ms |
| **Base Freq** | 800 Hz |
| **Variants** | 16 (randomised per keypress) |

**Concept** — Carbon-fiber key cap — a dry, clipped tap with minimal resonance. Like pressing membrane keys on a military-spec panel. Each variant shifts the body frequency for organic feel.

**Synthesis** — FM micro-percussion with 16 ratio variants. Sine carrier at 2000 + (variant × 150) Hz (range 2000–4250 Hz), sine modulator at carrier × ratio where ratio cycles through [1, 2, 3, 4, 5, 6, 7, 1.4, 0.5, 1.5, 2.5, 3.5, 0.333, 0.25, 0.2, 0.143] — each variant produces a unique inharmonic spectrum. Modulation index 3 (mod depth = carrier×3). Signal passes through medium waveshaper distortion (amount 20) at 4× oversampling. Sub-0.5ms impulse envelope: gain 0 → 0.14 in 0.5 ms, exponential decay to 0.001 by 10 ms. Total duration 12 ms, bone-dry. No noise, no body tone — pure FM percussion.

---

### 14. TYPING_BACKSPACE

| | |
|---|---|
| **Duration** | 28 ms |
| **Base Freq** | 500 Hz |
| **Variants** | 1 |

**Concept** — Data erasure — a low, dull retraction. Like a classified document shredder pulling paper back. Softer and lower than a letter key.

**Synthesis** — Low FM thud: sine carrier at 200 Hz dropping to 80 Hz over 12 ms, sine modulator at carrier×2 (400 Hz) with decaying modulation index from 6 (mod depth 1200 Hz) to 0.5 (mod depth 100 Hz) over 12 ms — initial sideband burst that collapses into a dull sub-thump. Signal passes through heavy waveshaper distortion (amount 50) at 4× oversampling, then lowpass filter at 3 kHz to contain the spectrum. Gain envelope: instant onset at 0.18, exponential decay to 0.001 over 13 ms. Total duration 15 ms, bone-dry.

---

### 15. TYPING_ENTER

| | |
|---|---|
| **Duration** | 90 ms |
| **Base Freq** | 400 Hz |
| **Variants** | 1 |

**Concept** — Mission confirm — a hard stamp of authority. Like slamming a cockpit switch guard closed. Heavy transient with body and sub-bass.

**Synthesis** — Layered FM impact: 3 simultaneous FM carrier/modulator pairs fired at once. Layer 1: carrier 300 Hz, ratio 1:1, index 4 (depth 1200 Hz). Layer 2: carrier 600 Hz, ratio 1:3, index 5 (depth 3000 Hz). Layer 3: carrier 1200 Hz, ratio 1:7, index 3 (depth 3600 Hz). All three modulation indices decay from full to carrier×0.1 over 40 ms. Each layer's gain decays from 1.0 to 0.001 over 50 ms. All feed into a shared heavy waveshaper distortion (amount 50) at 4× oversampling, then highshelf +4 dB above 4 kHz, master gain 0.10. Plus a sub-impulse: sine at 50 Hz, gain 0.22 decaying to 0.001 in 5 ms — a single-cycle low-end thud bypassing the waveshaper. Total duration 60 ms, bone-dry.

---

### 16. TYPING_SPACE

| | |
|---|---|
| **Duration** | 28 ms |
| **Base Freq** | 300 Hz |
| **Variants** | 1 |

**Concept** — Pressure release — a broad, diffuse puff like a micro-burst of compressed air from a canopy seal. Wider and hollower than a letter key.

**Synthesis** — Waveshaped noise burst: white noise buffer (15 ms) through medium waveshaper distortion (amount 20) at 4× oversampling, then narrow bandpass filter at 2 kHz (Q 12) isolating a tight tonal band from the noise. Gain envelope: instant onset at 0.20, exponential decay to 0.001 over 13 ms. Total duration 15 ms, bone-dry. No oscillators — pure shaped and filtered noise producing a pressurised hiss with tonal character from the extreme Q.

---

## Application Sounds

### 17. APP_START

| | |
|---|---|
| **Duration** | 1300 ms |
| **Base Freq** | 140 Hz |
| **Variants** | 1 |

**Concept** — Stealth signal emerging — a classified system waking from dormancy. A low drone materialises from nothing, its resonant filter slowly opening to reveal the tone's inner shape, then closing again. A dissonant minor second enters late — cold, tense, like two frequencies that shouldn't exist together but do. Dark wind noise and a deep sub-bass barely felt in the chest. The feeling: something powerful is now watching.

**Synthesis** — Full Sonic DNA showcase across 4 layered stages over 800 ms. Layer 1 (0–60 ms): crush-distorted noise onset — white noise buffer through extreme waveshaper distortion (amount 150) at 4× oversampling, bandpass 3 kHz (Q 3), gain 0.16 decaying to 0.001 over 60 ms. Layer 2 (0–750 ms): low FM drone — sine carrier and modulator both at 80 Hz (ratio 1:1) with modulation index slowly rising from 0.125 (depth 10 Hz) to 5.0 (depth 400 Hz) over 650 ms then cutting to 0, through medium waveshaper distortion (amount 20), lowpass filter sweeping 200 Hz → 1200 Hz → 200 Hz (Q 4), gain fading in over 150 ms to 0.16 then cutting to 0 at 750 ms. Layer 3 (200–450 ms): metallic shimmer — FM pair with carrier 4 kHz, ratio 1:7 (mod at 28 kHz), mod depth starting at 12000 Hz decaying to 100 Hz, through light waveshaper (amount 8) and highshelf +6 dB above 5 kHz, gain 0.06 for a brief 250 ms burst. Layer 4 (600–750 ms): mid FM impact — carrier 500 Hz, ratio 1:3, mod index 6 (depth 3000 Hz) decaying to near-zero, through heavy waveshaper (amount 50), gain 0.14 with hard cutoff at 750 ms. All layers bone-dry, sharp final cutoff — no reverb tail.
