# Mach Line

> A cold supersonic sound palette inspired by stealth aircraft and matte-black hypercars on wet tarmac — turbine whine, carbon-fiber taps, radar pings, and the compressed hush before a sonic boom, designed to make a browser feel like a classified weapons-system HUD.

---

## Theme Identity

| Property | Value |
|---|---|
| Accent | Ice White `#D4E4F0`, Stealth Teal `#3AAFB9` |
| Base | Deep carbon black, wet-asphalt blue-grey, storm-cloud steel |
| Mood | Standing on a rain-slicked runway at midnight as a stealth fighter passes overhead at Mach 0.95 — the air compressed, every surface matte and radar-absorbing, LED headlight bars cutting through mist |
| Engine | Web Audio API only — no sample files, oscillators + noise + filters + envelopes |

---

## Browser Sounds

### 1. HOVER

| | |
|---|---|
| **Duration** | 50 ms |
| **Base Freq** | 3000 Hz |
| **Variants** | 1 |

**Concept** — Radar sweep detection — a faint high-frequency ping like a proximity sensor acquiring a target. Cold, precise, almost subliminal.

**Synthesis** — Sine oscillator at 3000 Hz sweeping up to 4200 Hz over 50 ms. Bandpass filter centred at 3600 Hz, Q 10 for a tight, metallic resonance. Gain envelope: 0 → 0.10 in 4 ms, → 0 at 50 ms. Noise layer: white noise through highpass at 6000 Hz, gain 0.01 for 50 ms (air hiss).

---

### 2. HOVER_UP

| | |
|---|---|
| **Duration** | 40 ms |
| **Base Freq** | 4200 Hz |
| **Variants** | 1 |

**Concept** — Radar lock releasing — the inverse sweep, higher to lower, shorter and sharper. Like a targeting reticle disengaging.

**Synthesis** — Sine oscillator at 4200 Hz sweeping down to 2800 Hz over 40 ms. Bandpass filter centred at 3500 Hz, Q 8. Gain envelope: 0 → 0.08 in 3 ms, → 0 at 40 ms. No noise layer — cleaner than HOVER for contrast.

---

### 3. CLICK

| | |
|---|---|
| **Duration** | 30 ms |
| **Base Freq** | 600 Hz |
| **Variants** | 1 |

**Concept** — Carbon-fiber relay snap — a hard, dry transient with no resonance tail. Like flicking a switch in an unpressurised cockpit. Crisp and militaristic.

**Synthesis** — Square oscillator at 600 Hz, gain 0.25 → 0.001 exponential in 3 ms (hard pop). White noise through highpass at 5000 Hz, gain 0.3 → 0.001 exponential in 12 ms (sharp tick). Both sum to destination.

---

### 4. IMPORTANT_CLICK

| | |
|---|---|
| **Duration** | 140 ms |
| **Base Freq** | 350 Hz |
| **Variants** | 1 |

**Concept** — Weapons release authorisation — a heavy, committed confirmation. Two-stage: initial hard click transient, then a deep turbine-like body tone with sub-bass pressure wave.

**Synthesis** — Stage 1: Square pop at 600 Hz, 3 ms exponential decay. Noise burst through highpass 5000 Hz, 10 ms decay. Stage 2: Triangle oscillator at 350 Hz through lowpass at 1000 Hz (Q 8), gain ramp 0 → 0.3 in 3 ms, hold to 50 ms, exponential decay to 0.001 at 140 ms. Sub: sine at 55 Hz, gain 0.18 decaying to 0.001 over 50 ms.

---

### 5. FEATURE_SWITCH_ON

| | |
|---|---|
| **Duration** | 280 ms |
| **Base Freq** | 180 Hz |
| **Variants** | 1 |

**Concept** — Turbine spool-up — a system coming online with building rotational energy. Starts with a sharp ignition transient, then an ascending filtered tone that sweeps open like a jet engine throttling up.

**Synthesis** — Ignition: noise burst through bandpass 3500 Hz (Q 3), gain 0.3 decaying to 0.001 in 25 ms. Body: sawtooth + sine (mixed 0.5) sweeping from 180 Hz to 720 Hz over 200 ms. Lowpass filter sweeping from 350 Hz to 3500 Hz (Q 5). Gain: 0 → 0.2 in 40 ms, hold to 160 ms, decay to 0.001 at 280 ms.

---

### 6. FEATURE_SWITCH_OFF

| | |
|---|---|
| **Duration** | 250 ms |
| **Base Freq** | 720 Hz |
| **Variants** | 1 |

**Concept** — Turbine spool-down — energy draining as the system powers off. A descending filtered tone with closing filter and a low-end rumble tail, like an engine winding down on the runway.

**Synthesis** — Sawtooth + sine (mixed 0.5) descending from 720 Hz to 120 Hz over 220 ms. Lowpass filter closing from 3500 Hz to 250 Hz (Q 5). Gain: 0.2 → 0.001 exponential over 250 ms. Sub rumble: sine at 50 Hz, gain 0.1 starting at 160 ms, decaying to 0.001 at 250 ms.

---

### 7. LIMITER_ON

| | |
|---|---|
| **Duration** | 220 ms |
| **Base Freq** | 250 Hz |
| **Variants** | 1 |

**Concept** — G-force compression — the feeling of pressure building in a high-G turn. A tight, squeezed ascending tone with high filter resonance, like the cockpit canopy creaking under load.

**Synthesis** — Transient: ring-modulated sine (carrier 1200 Hz, modulator 250 Hz), gain 0.18 decaying to 0.001 in 35 ms. Body: sawtooth + sine (mixed 0.5) ascending from 250 Hz to 500 Hz over 180 ms. Lowpass filter Q 14, sweeping from 400 Hz to 1800 Hz. Gain: 0 → 0.18 in 35 ms, hold to 150 ms, decay to 0.001 at 220 ms.

---

### 8. LIMITER_OFF

| | |
|---|---|
| **Duration** | 200 ms |
| **Base Freq** | 500 Hz |
| **Variants** | 1 |

**Concept** — G-force release — pressure escaping, decompression. An initial burst followed by a descending tone, like equalising cabin pressure after a dive.

**Synthesis** — Release burst: noise through bandpass 3000 Hz (Q 2), gain 0.3 → 0.001 in 18 ms. Descending sawtooth from 500 Hz to 160 Hz over 180 ms. Lowpass filter closing from 2500 Hz to 350 Hz (Q 6). Gain: 0.18 → 0.001 exponential over 200 ms. Sub: sine 140 Hz, gain 0.06 from 140 ms, decay to 0.001 at 200 ms.

---

### 9. SWITCH_TOGGLE

| | |
|---|---|
| **Duration** | 35 ms |
| **Base Freq** | 1600 Hz |
| **Variants** | 1 |

**Concept** — Avionics toggle — a tiny, precise cockpit switch flip. Two stacked micro-blips like a latching relay in a weapons panel.

**Synthesis** — Blip 1: square at 1600 Hz, highshelf at 4000 Hz (+4 dB), gain 0.18 → 0.001 exponential in 7 ms. Blip 2 (at +8 ms): square at 800 Hz, gain 0.09 → 0.001 exponential in 20 ms. Both to destination.

---

### 10. TAB_INSERT

| | |
|---|---|
| **Duration** | 110 ms |
| **Base Freq** | 550 Hz |
| **Variants** | 1 |

**Concept** — Radar contact acquired — three ascending pips like a new target appearing on a scope, plus a filtered sweep for motion.

**Synthesis** — 3 sine blips at 550, 825, 1100 Hz spaced 18 ms apart, each gain 0.18 → 0.001 exponential in 22 ms. Noise layer: bandpass 3500 Hz (Q 1.5), gain 0.08 → 0.001 over 90 ms. Micro-delay at 35 ms, feedback gain 0.05 on noise for spatial depth.

---

### 11. TAB_CLOSE

| | |
|---|---|
| **Duration** | 100 ms |
| **Base Freq** | 1100 Hz |
| **Variants** | 1 |

**Concept** — Radar contact lost — three descending pips like a target dropping off scope, plus a downward zip and low thud for finality.

**Synthesis** — 3 sine blips at 1100, 825, 550 Hz spaced 12 ms apart, each gain 0.16 → 0.001 exponential in 16 ms. Zip: sawtooth from 3500 Hz → 180 Hz in 45 ms, gain 0.1 → 0.001 exponential. Thud: sine at 80 Hz, gain 0.14 starting at 45 ms, decaying to 0.001 at 75 ms.

---

### 12. TAB_SLASH

| | |
|---|---|
| **Duration** | 150 ms |
| **Base Freq** | 1500 Hz |
| **Variants** | 1 |

**Concept** — IFF interrogation — a clean, authoritative ping like a friend-or-foe identification query. Alert without urgency.

**Synthesis** — Triangle oscillator at 1500 Hz with LFO (sine 8 Hz, depth 25 Hz) for subtle vibrato. Gain: 0 → 0.22 in 2 ms, exponential decay to 0.001 at 150 ms. Sparkle layer: noise through highpass 9000 Hz, gain 0.035 → 0.001 in 50 ms.

---

## Keyboard Sounds

### 13. TYPING_LETTER

| | |
|---|---|
| **Duration** | 22 ms |
| **Base Freq** | 800 Hz |
| **Variants** | 16 (randomised per keypress) |

**Concept** — Carbon-fiber key cap — a dry, clipped tap with minimal resonance. Like pressing membrane keys on a military-spec panel. Each variant shifts the body frequency for organic feel.

**Synthesis** — Noise burst: bandpass centred at 4500 Hz ± 800 Hz (random per call), Q 2.5, gain 0.22 → 0.001 exponential in 10 ms. Body tone: sine at 800 + (random 0–15) * 60 Hz, gain 0.05 → 0.001 exponential in 12 ms. Both stop at 22 ms.

---

### 14. TYPING_BACKSPACE

| | |
|---|---|
| **Duration** | 28 ms |
| **Base Freq** | 500 Hz |
| **Variants** | 1 |

**Concept** — Data erasure — a low, dull retraction. Like a classified document shredder pulling paper back. Softer and lower than a letter key.

**Synthesis** — Square pulse at 500 Hz through lowpass 2500 Hz, gain 0.14 → 0.001 exponential in 7 ms. Reverse-envelope noise: lowpass 2500 Hz, gain starts at 0.01 at +4 ms, ramps to 0.07 at 22 ms, then to 0 at 25 ms. Noise stops at 28 ms.

---

### 15. TYPING_ENTER

| | |
|---|---|
| **Duration** | 90 ms |
| **Base Freq** | 400 Hz |
| **Variants** | 1 |

**Concept** — Mission confirm — a hard stamp of authority. Like slamming a cockpit switch guard closed. Heavy transient with body and sub-bass.

**Synthesis** — Pop: square at 400 Hz, gain 0.2 → 0.001 exponential in 3 ms. Noise: bandpass 3000 Hz (Q 1.5), gain 0.14 → 0.001 in 10 ms. Body: sawtooth from 400 Hz → 250 Hz over 60 ms, through lowpass 1200 Hz (Q 7), gain 0.2 → 0.001 over 70 ms. Sub: sine at 65 Hz, gain 0.2 → 0.001 over 35 ms.

---

### 16. TYPING_SPACE

| | |
|---|---|
| **Duration** | 28 ms |
| **Base Freq** | 300 Hz |
| **Variants** | 1 |

**Concept** — Pressure release — a broad, diffuse puff like a micro-burst of compressed air from a canopy seal. Wider and hollower than a letter key.

**Synthesis** — Noise: bandpass 1200 Hz (Q 1.5), through lowpass 4000 Hz, gain 0.18 → 0.001 exponential in 18 ms. Undertone: triangle at 300 Hz, gain 0.08 → 0.001 exponential in 13 ms. Both stop at 28 ms.
