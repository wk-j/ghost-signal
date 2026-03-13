# Chill City FM

> A warm lo-fi analog sound palette that channels late-night 1980s living rooms — VHS static, FM radio hiss, wood-cabinet resonance, and the soft mechanical clunks of vintage electronics, designed to make a browser feel like a cozy retro den bathed in amber lamplight.

![Chill City FM cover](cover.png)

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

## Sonic DNA

| Technique | Description |
|---|---|
| **Primary waveform** | Detuned triangle/sine pairs — two slightly detuned oscillators (2–6 Hz apart) creating chorus/beating effect |
| **Signature effect** | Chorus beating + tape wobble LFO — slow pitch modulation (2–8 Hz) on one oscillator of the pair creates warm analog character |
| **Transient character** | Soft noise crackle onset — no sharp attacks, sounds begin with a tiny LP-filtered noise burst like vinyl or tape artifacts |
| **Envelope philosophy** | Medium, warm, wobbly — gently rounded envelopes (5–20ms attacks) with slight LFO modulation on amplitude or pitch |
| **Frequency world** | LP-capped at 3–4 kHz — aggressive low-pass filtering, nothing bright, everything muffled and warm |

---

## Browser Sounds

### 1. HOVER

| | |
|---|---|
| **Duration** | 70 ms |
| **Base Freq** | 1400 Hz |
| **Variants** | 1 |

**Concept** — A VCR head gently brushing the tape as it seeks — a faint, warm magnetic whisper. Like running your finger along a row of VHS spines in dim lamplight.

**Synthesis** — Detuned triangle/sine pair (1400/1403 Hz, 3 Hz beating) sweeping up to 1800/1803 Hz over 70 ms. Tape wobble LFO (sine at 4.5 Hz, depth ±6 Hz) modulates the triangle pitch for analog drift. Both oscillators feed through LP cap at 3 kHz (Q 2). Warm rounded envelope: 12 ms linear attack to 0.09, gentle rolloff to 0 by 70 ms — no sharp edges. The sine is mixed at 0.7× for a triangle-dominant warmth with subtle harmonic chorus.

---

### 2. HOVER_UP

| | |
|---|---|
| **Duration** | 55 ms |
| **Base Freq** | 1800 Hz |
| **Variants** | 1 |

**Concept** — The tape head lifting off — a gentle descending whisper. Mirror of HOVER but softer and faster, like a sigh of relief.

**Synthesis** — Detuned triangle/sine pair descending (1800/1802 Hz → 1200/1212 Hz, 55 ms). The detune diverges from 2 Hz to 12 Hz during descent — the beating widens as the signal "loses coherence." LP filter closes from 3 kHz to 2 kHz (Q 1.5) during the sweep, darkening the tail. Envelope: 8 ms attack, then exponential decay to silence. No noise layer, no LFO — a clean fading pair with widening chorus.

---

### 3. CLICK

| | |
|---|---|
| **Duration** | 40 ms |
| **Base Freq** | 600 Hz |
| **Variants** | 1 |

**Concept** — Pressing a chunky button on a vintage boombox — a satisfying plastic 'clack' with just enough weight. The kind of button that depresses 3mm with a gratifying snap.

**Synthesis** — Vinyl crackle onset first: LP-filtered noise burst (cutoff 2 kHz, 8 ms, sharp exponential decay) fires before any tone, giving a soft tape-artifact transient. After 4 ms, a detuned triangle pair (600/604 Hz, 4 Hz beating) enters through LP cap at 3.5 kHz (Q 1) with a 3 ms attack ramp and exponential decay over 35 ms. The sine copy mixes at 0.5×. Noise-before-tone ordering ensures every click begins with crackle, never a clean digital edge.

---

### 4. IMPORTANT_CLICK

| | |
|---|---|
| **Duration** | 140 ms |
| **Base Freq** | 320 Hz |
| **Variants** | 1 |

**Concept** — Slamming a VHS tape into a top-loading VCR — the heavy mechanical 'chunk' of the loading mechanism engaging. Authoritative, physical, final.

**Synthesis** — Three layers. (a) Vinyl crackle onset: BP-filtered noise burst (1.5 kHz, Q 2, 12 ms) with sharp exponential decay for the tape-artifact transient. (b) Detuned triangle/sine pair (280/283 Hz, 3 Hz beating) through resonant LP at 2 kHz (Q 4) — 10 ms attack, sustains at 0.24 for 45 ms, then long exponential decay to 140 ms for cabinet weight. Sine mixes at 0.5×. (c) Sub-bass sine at 55 Hz (75 ms, exponential decay) adds the mechanical slam underneath. The crackle fires first, body enters at 5 ms delay, creating a layered physical impact.

---

### 5. FEATURE_SWITCH_ON

| | |
|---|---|
| **Duration** | 280 ms |
| **Base Freq** | 180 Hz |
| **Variants** | 1 |

**Concept** — Powering on a vintage TV set — the CRT warming up with an ascending electrical hum, the screen blooming from black to blue static.

**Synthesis** — Vinyl crackle layer throughout: BP-filtered noise (1.2 kHz, Q 1.5) through LP cap at 2.5 kHz, swelling to 0.06 then fading over 280 ms — continuous tape-artifact texture underneath. Detuned triangle/sine pair (180/183 Hz, 3 Hz beating) ascending exponentially to 520/523 Hz, simulating the tape motor reaching speed. Tape wobble LFO starts fast (8 Hz) and slows to 2 Hz with ±12 Hz depth on the triangle pitch — the motor stabilising. Both oscillators feed through LP at 3 kHz (Q 2). Envelope: 60 ms attack, sustains at 0.18, exponential decay by 300 ms.

---

### 6. FEATURE_SWITCH_OFF

| | |
|---|---|
| **Duration** | 260 ms |
| **Base Freq** | 520 Hz |
| **Variants** | 1 |

**Concept** — The CRT powering down — that distinctive descending whine as the electron beam collapses and the picture shrinks to a single bright dot before fading.

**Synthesis** — Detuned triangle/sine pair descending (520/523 Hz → 100/88 Hz) over 240 ms — the detune diverges as pitch drops, beating going from 3 Hz to 12 Hz as the motor loses stability. Tape wobble LFO accelerates from 2 Hz to 10 Hz with ±15 Hz depth, creating increasingly erratic pitch drift. LP filter closes from 3 kHz to 800 Hz (Q 2). Crackle layer: LP-filtered noise at 2 kHz starts quiet (0.02) and swells to 0.08 at 200 ms before cutting — the static fills the gap as the tone dies. Envelope: immediate start at 0.18, exponential decay over 280 ms.

---

### 7. LIMITER_ON

| | |
|---|---|
| **Duration** | 220 ms |
| **Base Freq** | 250 Hz |
| **Variants** | 1 |

**Concept** — Pressing the 'record' button on a cassette deck — the mechanism clamping down, the record head engaging with a constrained mechanical tension.

**Synthesis** — Brief crackle onset: BP-filtered noise burst (3 kHz, Q 3, 15 ms) with sharp exponential decay for the mechanical click transient. After 10 ms, a detuned triangle/sine pair (300/303 Hz, 3 Hz beating) sweeps exponentially up to 480/483 Hz through a narrow bandpass (Q 8, sweeping 350 → 500 Hz) — the resonant "pinch" of the record head engaging. Tape wobble LFO at 5 Hz with ±10 Hz depth on triangle pitch for motor flutter. Envelope: 30 ms attack to 0.20, sustains, exponential decay by 220 ms.

---

### 8. LIMITER_OFF

| | |
|---|---|
| **Duration** | 210 ms |
| **Base Freq** | 420 Hz |
| **Variants** | 1 |

**Concept** — The record button popping back up — spring-loaded release, the mechanism unclamping. A brief 'thunk' of physical freedom.

**Synthesis** — Detuned triangle/sine pair descending (480/483 Hz → 250/240 Hz) — the detune widens from 3 Hz to 10 Hz as the mechanism releases. Bandpass filter opens from Q 8 (narrow, pinched) to Q 1 (wide, relaxed) as frequency descends from 500 to 300 Hz — the resonance "unclamping." Envelope: starts at 0.18, exponential decay over 210 ms. Crackle at release: LP-filtered noise (2 kHz) fires at 150 ms with a short attack burst, mimicking the spring-release snap.

---

### 9. SWITCH_TOGGLE

| | |
|---|---|
| **Duration** | 45 ms |
| **Base Freq** | 900 Hz |
| **Variants** | 1 |

**Concept** — Flipping a small toggle switch on a stereo receiver — the tiny, crisp 'tick' of a metal contact. Minimal and tactile.

**Synthesis** — Micro-crackle onset: LP-filtered noise (1.8 kHz, 4 ms) with sharp exponential decay at the very start for the contact transient. After 2 ms, a detuned triangle pair (900/905 Hz, 5 Hz beating) fires through LP cap at 2.5 kHz. Envelope: immediate start at 0.16, exponential decay over 16 ms. Ultra-short — the crackle and beating barely register consciously but add tactile texture. No LFO — too brief for tape wobble.

---

### 10. TAB_INSERT

| | |
|---|---|
| **Duration** | 110 ms |
| **Base Freq** | 480 Hz |
| **Variants** | 1 |

**Concept** — Tuning into a new FM radio station — the dial catching a signal, static resolving into clarity. A new channel opening up.

**Synthesis** — Vinyl crackle layer throughout: BP-filtered noise (1 kHz, Q 1) through LP cap at 2.5 kHz, fading over 100 ms — the inter-station static. Detuned triangle/sine pair ascending (400/420 Hz → 800/802 Hz) — the detune narrows from 20 Hz (messy, between stations) to 2 Hz (clean, locked in), simulating the dial finding a signal. Both through LP at 3 kHz (Q 1.5). Envelope: 20 ms attack, sustains at 0.16, exponential decay by 110 ms. The narrowing chorus IS the "tuning in" — the signal cohering from static into clarity.

---

### 11. TAB_CLOSE

| | |
|---|---|
| **Duration** | 95 ms |
| **Base Freq** | 800 Hz |
| **Variants** | 1 |

**Concept** — Losing the FM signal — the station fading into static and silence. A channel going dark.

**Synthesis** — Detuned triangle/sine pair descending (800/802 Hz → 400/430 Hz) — the detune widens from 2 Hz (clean signal) to 30 Hz (breaking up), the inverse of TAB_INSERT. LP filter closes from 3 kHz to 1 kHz (Q 1.5) — the warmth darkening as the signal degrades. Crackle layer: LP-filtered noise (2 kHz) starts quiet and swells to 0.10 as the tone fades — static filling the void. Envelope: starts at 0.16, exponential decay over 90 ms. The widening detune and rising noise tell the story of signal loss.

---

### 12. TAB_SLASH

| | |
|---|---|
| **Duration** | 180 ms |
| **Base Freq** | 1200 Hz |
| **Variants** | 1 |

**Concept** — The NES powering on — that bright, hopeful chime when you flip the switch. Readiness, attention, a system awaiting your command.

**Synthesis** — Brief crackle onset: BP-filtered noise (2 kHz, Q 1.5, 15 ms) with sharp exponential decay for a vinyl-pop transient. Detuned triangle/sine pair (1000/1004 Hz, 4 Hz beating) through LP cap at 3.5 kHz (Q 1). Tape wobble LFO (sine at 3 Hz, ±5 Hz depth) on triangle pitch adds warm analog drift during the sustain. Envelope: 10 ms attack, sustains at 0.18 for 45 ms, then long exponential decay to 200 ms — enough time for the beating and wobble to bloom into warmth.

---

## Keyboard Sounds

### 13. TYPING_LETTER

| | |
|---|---|
| **Duration** | 30 ms |
| **Base Freq** | 1200 Hz |
| **Variants** | 16 |

**Concept** — Pressing a key on an old mechanical typewriter sitting on the coffee table — each strike has a distinct character, a soft plastic 'tack' with warm wooden resonance from the cabinet underneath.

**Synthesis** — Micro-crackle onset: LP-filtered noise burst (2.5 kHz, 4 ms) with sharp exponential decay — the vinyl-pop transient before every keystroke. After 2 ms, a detuned triangle pair enters — frequency randomised per variant from a pool of 600–1560 Hz in 60 Hz steps, with random detune between 2–5 Hz for unique beating on each keypress. Both triangles feed through LP cap at 3 kHz. Envelope: 3 ms attack, exponential decay over 20 ms. Each keystroke has its own chorus character from the randomised detune, giving 16+ effective variants.

---

### 14. TYPING_BACKSPACE

| | |
|---|---|
| **Duration** | 35 ms |
| **Base Freq** | 450 Hz |
| **Variants** | 1 |

**Concept** — The backspace lever on a typewriter — pulling the carriage back one notch. Slightly duller and lower than a letter key, a gentle mechanical 'thock' of correction.

**Synthesis** — Detuned triangle/sine pair (500/504 Hz, 4 Hz beating) dropping exponentially to 200/196 Hz over 30 ms — the pitch drags downward like tape being pulled backward. Tape wobble LFO accelerates from 3 Hz to 12 Hz with ±8 Hz depth, creating increasingly frantic pitch modulation as the rewind speeds up. LP cap at 2 kHz (Q 2) keeps everything dark and muffled. Envelope: starts at 0.14, exponential decay over 32 ms. No crackle layer — the accelerating wobble alone sells the tape-rewind feel.

---

### 15. TYPING_ENTER

| | |
|---|---|
| **Duration** | 90 ms |
| **Base Freq** | 380 Hz |
| **Variants** | 1 |

**Concept** — The carriage return on a typewriter — the satisfying 'ding-chunk' of the carriage slamming back and the line advancing. The most physical, resonant key sound.

**Synthesis** — Four layers, all using signature DNA. (a) Vinyl crackle onset: BP-filtered noise (1.5 kHz, Q 2, 12 ms) for the tape-pop transient. (b) Detuned triangle/sine body (250/253 Hz, 3 Hz beating) through LP at 2.5 kHz (Q 3), with tape wobble LFO (3 Hz, ±4 Hz depth) on the triangle — the carriage slam resonating through warm electronics. Exponential decay over 75 ms. (c) Sub-bass sine at 50 Hz (50 ms, exponential decay) for the physical weight of the carriage hitting home. (d) Typewriter bell "ding": detuned triangle/sine pair (2000/2006 Hz, 6 Hz beating) through LP at 3 kHz, just 15 ms — a ghost of a bell, barely there but adding sparkle.

---

### 16. TYPING_SPACE

| | |
|---|---|
| **Duration** | 35 ms |
| **Base Freq** | 280 Hz |
| **Variants** | 1 |

**Concept** — The wide space bar of a vintage keyboard — broader and hollower than a letter key, like tapping the top of a wooden cigar box. Warm and diffuse.

**Synthesis** — LP-filtered noise puff (2 kHz cutoff, 35 ms) as the primary layer — broad and diffuse, with a tape wobble LFO (4 Hz) modulating the noise gain (±0.04) for subtle amplitude flutter. Underneath, a brief detuned triangle/sine pair (200/204 Hz, 4 Hz beating) through LP at 2.5 kHz, decaying in 18 ms — a low warm accent. Sine mixes at 0.5×. The noise-dominant approach makes the space bar feel wider and hollower than letter keys, while the detuned pair adds just enough warmth beneath the puff.

---

## Application Sounds

### 17. APP_START

| | |
|---|---|
| **Duration** | 1300 ms |
| **Base Freq** | 196 Hz |
| **Variants** | 1 |

**Concept** — Late-night signal fading in — like tuning an old radio dial at 2 AM and catching a distant station you've never heard before. A warm triangle-wave drone emerges from tape hiss, its filter slowly opening to reveal a rich interior, joined by a minor third that adds melancholy and mystery. A slow LFO adds tape-warble character. Enveloping tape hiss and a 60 Hz mains hum anchor everything in the physical warmth of vintage electronics. The feeling: discovering something secret and beautiful in the static.

**Synthesis** — Full Sonic DNA showcase. Primary drone: detuned triangle/sine pair (160/163 Hz, 3 Hz beating) through LP at 3 kHz, fading in over 350 ms to 0.14 then decaying over 1.3 s. Tape wobble LFO (2 Hz, ±4 Hz depth) on triangle pitch adds slow analog drift throughout. Minor third enters at 400 ms: second detuned pair (190/193 Hz, 3 Hz beating) through LP 3 kHz, peaking at 0.08 around 650 ms. Vinyl crackle layer: noise through BP (800 Hz, Q 1) and LP cap (2 kHz), swelling over 300 ms then fading across 1.2 s. 60 Hz mains hum (sine, 300 ms fade-in, decays by 900 ms) grounds everything in the warmth of old electronics. Every signature technique present: detuned pairs, tape wobble LFO, vinyl crackle, LP capping, and warm envelopes.
