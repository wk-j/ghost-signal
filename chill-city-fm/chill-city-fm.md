# Chill City FM

> A warm lo-fi analog sound palette that channels late-night 1980s living rooms — VHS static, FM radio hiss, wood-cabinet resonance, and the soft mechanical clunks of vintage electronics, designed to make a browser feel like a cozy retro den bathed in amber lamplight.

---

## Theme Identity

| Property | Value |
|---|---|
| Source | 1980s living room — CRT television, NES console, VHS tapes, boombox, wood paneling |
| Accent | Warm amber `#E8A849`, Soft neon blue `#5CB8E4` |
| Base | Dark walnut brown, muted cream, soft charcoal shadows |
| Mood | Midnight in a wood-paneled living room — CRT glow flickering on VHS spines, a boombox quietly playing FM radio, the hum of warm electronics and the smell of old carpet |
| Engine | Web Audio API only — no sample files, oscillators + noise + filters + envelopes |

---

## Browser Sounds

### 1. HOVER

| | |
|---|---|
| **Duration** | 70 ms |
| **Base Freq** | 1400 Hz |
| **Variants** | 1 |

**Concept** — A VCR head gently brushing the tape as it seeks — a faint, warm magnetic whisper. Like running your finger along a row of VHS spines in dim lamplight.

**Synthesis** — Sine sweep (1.4 kHz to 1.8 kHz, ~70 ms) through a low-pass filter (cutoff 2.5 kHz, Q = 3) for warmth. Gain envelope: attack 8 ms, release 62 ms. Layer filtered brown noise (band-pass 800-1600 Hz, gain -26 dB, 50 ms) for tape-hiss texture. Roll off everything above 4 kHz with a gentle low-pass shelf. The result: soft, warm, analog — not digital.

---

### 2. HOVER_UP

| | |
|---|---|
| **Duration** | 55 ms |
| **Base Freq** | 1800 Hz |
| **Variants** | 1 |

**Concept** — The tape head lifting off — a gentle descending whisper. Mirror of HOVER but softer and faster, like a sigh of relief.

**Synthesis** — Sine sweep (1.8 kHz to 1.2 kHz, ~55 ms) through low-pass filter (cutoff 2 kHz, Q = 2). Gain envelope: attack 5 ms, release 50 ms with exponential decay. No noise layer — clean and fading. Feels like the warmth pulling back.

---

### 3. CLICK

| | |
|---|---|
| **Duration** | 40 ms |
| **Base Freq** | 600 Hz |
| **Variants** | 1 |

**Concept** — Pressing a chunky button on a vintage boombox — a satisfying plastic 'clack' with just enough weight. The kind of button that depresses 3mm with a gratifying snap.

**Synthesis** — Two layers: (a) Triangle-wave pop at 600 Hz (2 ms pulse, immediate exponential decay) for the plastic body, (b) filtered noise burst (band-pass 1.5-3 kHz, Q = 3, 20 ms decay) for the click texture. Apply low-pass at 4 kHz to keep it warm and rounded — never sharp or digital. Subtle room reverb (20 ms tail) adds physical space.

---

### 4. IMPORTANT_CLICK

| | |
|---|---|
| **Duration** | 140 ms |
| **Base Freq** | 320 Hz |
| **Variants** | 1 |

**Concept** — Slamming a VHS tape into a top-loading VCR — the heavy mechanical 'chunk' of the loading mechanism engaging. Authoritative, physical, final.

**Synthesis** — Layer CLICK's transient with a longer triangle-wave body at 320 Hz (attack 3 ms, sustain 50 ms, release 90 ms) through a resonant low-pass (cutoff 900 Hz, Q = 5) for that hollow cabinet resonance. Add sub-bass (sine 65 Hz, 60 ms, gain -10 dB) for the mechanical weight. A brief noise burst (band-pass 1-2 kHz, 25 ms) at onset mimics the cartridge sliding home. Feel: chunky, warm, committed.

---

### 5. FEATURE_SWITCH_ON

| | |
|---|---|
| **Duration** | 280 ms |
| **Base Freq** | 180 Hz |
| **Variants** | 1 |

**Concept** — Powering on a vintage TV set — the CRT warming up with an ascending electrical hum, the screen blooming from black to blue static.

**Synthesis** — Two stages. Stage 1 (0-40 ms): filtered noise burst (band-pass 2-4 kHz, 30 ms) mimicking the relay click of the power switch. Stage 2 (40-280 ms): ascending triangle + sine (180 Hz to 520 Hz) through a low-pass filter that opens (cutoff 600 to 3000 Hz, Q = 3). Add a 60 Hz hum undertone (sine, gain -14 dB, 200 ms, slow fade-in) to evoke the transformer warming up. Release 100 ms. Feel: electric warmth spreading, tubes glowing to life.

---

### 6. FEATURE_SWITCH_OFF

| | |
|---|---|
| **Duration** | 260 ms |
| **Base Freq** | 520 Hz |
| **Variants** | 1 |

**Concept** — The CRT powering down — that distinctive descending whine as the electron beam collapses and the picture shrinks to a single bright dot before fading.

**Synthesis** — Descending triangle + sine (520 Hz to 120 Hz) through closing low-pass (cutoff 3000 to 300 Hz) over 220 ms. Add a faint 'zap' (very short sine at 8 kHz, 5 ms, gain -20 dB) at onset for the static discharge. End with a 50 Hz sine tail (80 ms, gain -16 dB) for the capacitor drain. The last 40 ms: subtle crackle (noise burst, band-pass 2 kHz, gain -22 dB). Feel: energy collapsing inward, warmth fading to silence.

---

### 7. LIMITER_ON

| | |
|---|---|
| **Duration** | 220 ms |
| **Base Freq** | 250 Hz |
| **Variants** | 1 |

**Concept** — Pressing the 'record' button on a cassette deck — the mechanism clamping down, the record head engaging with a constrained mechanical tension.

**Synthesis** — Narrower ascending sweep than FEATURE_SWITCH_ON (250 Hz to 420 Hz), resonant low-pass with Q = 10 for a 'pinched' quality. A short noise transient at onset (band-pass 3 kHz, 20 ms) mimics the button mechanism. Add a faint warble (LFO at 8 Hz, depth +/-15 Hz) to the main tone to suggest tape motor flutter. Feel: mechanical tension, something locking into place with precision.

---

### 8. LIMITER_OFF

| | |
|---|---|
| **Duration** | 210 ms |
| **Base Freq** | 420 Hz |
| **Variants** | 1 |

**Concept** — The record button popping back up — spring-loaded release, the mechanism unclamping. A brief 'thunk' of physical freedom.

**Synthesis** — Onset: wide noise burst (low-pass 5 kHz, 25 ms, gain -8 dB) mimicking the spring release. Then descending tone (420 Hz to 180 Hz) through closing low-pass (Q = 4). End with a soft resonant bump (sine 140 Hz, 40 ms, gain -12 dB) as the mechanism settles. Feel: tension releasing, a mechanical sigh.

---

### 9. SWITCH_TOGGLE

| | |
|---|---|
| **Duration** | 45 ms |
| **Base Freq** | 900 Hz |
| **Variants** | 1 |

**Concept** — Flipping a small toggle switch on a stereo receiver — the tiny, crisp 'tick' of a metal contact. Minimal and tactile.

**Synthesis** — Triangle-wave blip (900 Hz, 10 ms) with immediate exponential decay, followed by a tiny echo (450 Hz, 12 ms, gain -10 dB). Both through a gentle low-pass at 3 kHz. Add a micro noise click (high-pass 2 kHz, 3 ms, gain -12 dB) at the very start for the metal contact sound. Feel: small, precise, physical.

---

### 10. TAB_INSERT

| | |
|---|---|
| **Duration** | 110 ms |
| **Base Freq** | 480 Hz |
| **Variants** | 1 |

**Concept** — Tuning into a new FM radio station — the dial catching a signal, static resolving into clarity. A new channel opening up.

**Synthesis** — Three ascending triangle blips (480 Hz, 640 Hz, 800 Hz, each 18 ms, 12 ms apart) with warm low-pass at 2.5 kHz. Layer a noise 'whoosh' underneath (band-pass 1-3 kHz, Q = 1.5, 80 ms, gain -16 dB) that sweeps from left to right for the 'tuning' feel. Brief delay echo (1 repeat, 25 ms, -20 dB). Feel: discovery, warmth arriving, a station locking in.

---

### 11. TAB_CLOSE

| | |
|---|---|
| **Duration** | 95 ms |
| **Base Freq** | 800 Hz |
| **Variants** | 1 |

**Concept** — Losing the FM signal — the station fading into static and silence. A channel going dark.

**Synthesis** — Three descending triangle blips (800 Hz, 640 Hz, 480 Hz, each 14 ms, 8 ms apart). Layer a descending noise sweep (band-pass 3 kHz to 800 Hz, 60 ms) for the static wash. End with a soft 'thud' (sine 90 Hz, 25 ms, gain -12 dB) — the sound of the speaker cone settling. Feel: signal lost, warmth fading.

---

### 12. TAB_SLASH

| | |
|---|---|
| **Duration** | 180 ms |
| **Base Freq** | 1200 Hz |
| **Variants** | 1 |

**Concept** — The NES powering on — that bright, hopeful chime when you flip the switch. Readiness, attention, a system awaiting your command.

**Synthesis** — A warm triangle-wave ping at 1200 Hz (attack 3 ms, release 170 ms) through low-pass at 3.5 kHz. Modulate with a gentle LFO (4 Hz, depth +/-10 Hz) during release for subtle warmth vibrato. Layer a very soft noise shimmer (high-pass 3 kHz, gain -28 dB, 80 ms) for air. Add a faint octave harmonic (sine 2400 Hz, gain -20 dB, 60 ms) for brightness. Feel: inviting, warm, ready.

---

## Keyboard Sounds

### 13. TYPING_LETTER

| | |
|---|---|
| **Duration** | 30 ms |
| **Base Freq** | 1200 Hz |
| **Variants** | 16 |

**Concept** — Pressing a key on an old mechanical typewriter sitting on the coffee table — each strike has a distinct character, a soft plastic 'tack' with warm wooden resonance from the cabinet underneath.

**Synthesis** — Micro noise-burst (band-pass 2-5 kHz, Q = 2.5, 14 ms) for the 'tack', plus a faint pitched body (triangle wave, 18 ms, gain -16 dB) with frequency randomized per variant (pool: 800-2000 Hz in 80 Hz steps). Each variant jitters the noise filter center (+/-400 Hz). Apply a warm low-pass roll-off at 5 kHz and a very short room reverb (25 ms tail) for the wood-cabinet resonance. Feel: tactile, woody, satisfying — like each keypress resonates through furniture.

---

### 14. TYPING_BACKSPACE

| | |
|---|---|
| **Duration** | 35 ms |
| **Base Freq** | 450 Hz |
| **Variants** | 1 |

**Concept** — The backspace lever on a typewriter — pulling the carriage back one notch. Slightly duller and lower than a letter key, a gentle mechanical 'thock' of correction.

**Synthesis** — Triangle-wave pulse at 450 Hz (10 ms, exponential decay) through low-pass at 2 kHz. Layer a reverse-envelope noise (gain ramps from -28 dB to -16 dB over 22 ms then cuts) through band-pass at 1.2 kHz for the mechanical 'pull-back' feel. Feel: subdued, retracting, undoing.

---

### 15. TYPING_ENTER

| | |
|---|---|
| **Duration** | 90 ms |
| **Base Freq** | 380 Hz |
| **Variants** | 1 |

**Concept** — The carriage return on a typewriter — the satisfying 'ding-chunk' of the carriage slamming back and the line advancing. The most physical, resonant key sound.

**Synthesis** — (a) Attack: triangle pop at 380 Hz (4 ms) + noise burst (band-pass 1.5-3 kHz, 12 ms). (b) Body: descending triangle tone (380 Hz to 240 Hz, 65 ms) through resonant low-pass (Q = 5, cutoff 1.2 kHz) for the carriage weight. (c) Sub-bass: sine 60 Hz (35 ms, gain -8 dB) for the mechanical slam. Optional: a very faint high 'ding' (sine 2400 Hz, 20 ms, gain -22 dB) at onset for the typewriter bell. Feel: heavy, final, deeply satisfying.

---

### 16. TYPING_SPACE

| | |
|---|---|
| **Duration** | 35 ms |
| **Base Freq** | 280 Hz |
| **Variants** | 1 |

**Concept** — The wide space bar of a vintage keyboard — broader and hollower than a letter key, like tapping the top of a wooden cigar box. Warm and diffuse.

**Synthesis** — Filtered noise 'puff' (band-pass 1 kHz, Q = 1.5 for wide diffusion, 22 ms) for the broad impact. Add a triangle undertone at 280 Hz (18 ms, gain -12 dB) through low-pass at 2 kHz. Roll off highs above 3.5 kHz aggressively for a muffled, woody quality. Feel: broad, hollow, warm — the biggest key with the softest voice.
