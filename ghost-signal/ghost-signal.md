# Ghost Signal

> A cyberpunk-noir sound palette built entirely from Web Audio API synthesis. Every sound evokes chrome, neon, and rain — short, punchy, and hyper-tactile, designed to make a browser feel like a hacked neural-deck interface in Night City.

---

## Theme Identity

| Property | Value |
|---|---|
| Source | Opera GX "Cyberpunk 2077" mod manifest |
| Accent | Neon yellow `#FCEE0A`, Cyan `#00F0FF` |
| Base | Deep black, warm orange glow, magenta neon haze |
| Mood | Dystopian metropolis at 2 AM — rain-slick asphalt, holographic billboards, chrome implants humming |
| Engine | Web Audio API only — no sample files, oscillators + noise + filters + envelopes |

---

## Browser Sounds

### 1. HOVER

| | |
|---|---|
| **Duration** | 60 ms |
| **Base Freq** | 2000 Hz |
| **Variants** | 1 |

**Concept** — A ghost-light scanning across a surface. Faint, airy, almost subliminal — like a proximity sensor pinging when your hand nears a holo-panel.

**Synthesis** — Very short sine sweep (2 kHz to 3.2 kHz, ~60 ms) through a band-pass filter (Q = 8) with gentle gain envelope (attack 5 ms, release 55 ms). Mix in a whisper of white noise (gain -30 dB) to add air. The result should be barely-there — a soft electric whisper, not a beep.

---

### 2. HOVER_UP

| | |
|---|---|
| **Duration** | 50 ms |
| **Base Freq** | 3000 Hz |
| **Variants** | 1 |

**Concept** — The inverse of HOVER — the scanner retracting. A tiny descending sine sweep (3 kHz to 1.8 kHz, ~50 ms) with a slightly faster release than HOVER so it vanishes quicker. Same band-pass approach, but the Q drops to 5 to make it feel softer / farther away. No noise layer — clean exit.

---

### 3. CLICK

| | |
|---|---|
| **Duration** | 35 ms |
| **Base Freq** | 800 Hz |
| **Variants** | 1 |

**Concept** — A cybernetic button-press — tactile and decisive. Imagine a chrome relay snapping shut inside a prosthetic finger.

**Synthesis** — Two layered transients: (a) a single-cycle square-wave pop at 800 Hz (1.25 ms pulse) and (b) a filtered noise burst (high-pass 4 kHz, 15 ms decay) for the metallic 'tick'. Combine through a compressor to glue them. Slight stereo spread (+/-10%) for width. Feels fast, snappy, and satisfying — never mushy.

---

### 4. IMPORTANT_CLICK

| | |
|---|---|
| **Duration** | 120 ms |
| **Base Freq** | 440 Hz |
| **Variants** | 1 |

**Concept** — A heavier, more resonant version of CLICK — like confirming a critical system override on a Netrunner's deck.

**Synthesis** — Layer CLICK's transient with a short triangle-wave body note at 440 Hz (attack 2 ms, sustain 40 ms, release 80 ms) fed through a low-pass filter (cutoff 1.2 kHz, resonance 6). Add subtle sub-bass (sine 80 Hz, 40 ms, gain -12 dB) for weight. The overall impression: a deep, authoritative 'chunk' that says 'action committed — no going back'.

---

### 5. FEATURE_SWITCH_ON

| | |
|---|---|
| **Duration** | 250 ms |
| **Base Freq** | 220 Hz |
| **Variants** | 1 |

**Concept** — A system coming online — power-up hum of a cybernetic implant activating.

**Synthesis** — Two-stage sound. Stage 1 (0-30 ms): sharp attack transient — filtered noise burst (band-pass 3-5 kHz) to mimic the relay spark. Stage 2 (30-250 ms): ascending dual-oscillator tone (saw + sine, 220 Hz to 880 Hz) with a resonant low-pass sweep (cutoff 400 to 4000 Hz) that opens up like a neon tube flickering to life. Fade out with 100 ms release. Overall feel: bright, optimistic, energised.

---

### 6. FEATURE_SWITCH_OFF

| | |
|---|---|
| **Duration** | 220 ms |
| **Base Freq** | 880 Hz |
| **Variants** | 1 |

**Concept** — The inverse power-down — an implant going dormant.

**Synthesis** — Descending tone (saw + sine, 880 Hz to 160 Hz) with a low-pass filter that closes (cutoff 4000 to 300 Hz) over ~200 ms. The tail is a short rumble: a sine at 60 Hz with 80 ms decay, like capacitors draining. Slight bit-crush (reduce sample-rate to 8 kHz for the last 50 ms) to add digital grit as the signal dies. Overall feel: dimming, winding-down, but still controlled.

---

### 7. LIMITER_ON

| | |
|---|---|
| **Duration** | 200 ms |
| **Base Freq** | 300 Hz |
| **Variants** | 1 |

**Concept** — Shares DNA with FEATURE_SWITCH_ON but sounds more constrained, like a pressure clamp engaging.

**Synthesis** — Same ascending dual-oscillator core but the frequency sweep is narrower (300 Hz to 600 Hz) and the resonant filter peaks harder (Q = 12) to create a 'squeezed' resonance. Add a short ring-mod effect (carrier 1.5 kHz, 40 ms) at the onset for a metallic 'clank'. Feel: power restrained, a gate locking into place.

---

### 8. LIMITER_OFF

| | |
|---|---|
| **Duration** | 200 ms |
| **Base Freq** | 600 Hz |
| **Variants** | 1 |

**Concept** — The clamp releasing — mirrors FEATURE_SWITCH_OFF but with a brief outward 'burst' at the onset (white noise, 20 ms, gain -6 dB) as if pressure escapes.

**Synthesis** — Descending tone (600 Hz to 200 Hz) through closing low-pass. Ends with a subtle spring-reverb impulse (convolver, ~80 ms metallic IR) to simulate the physical release of a latch. Feel: tension unwinding, air escaping a sealed chamber.

---

### 9. SWITCH_TOGGLE

| | |
|---|---|
| **Duration** | 40 ms |
| **Base Freq** | 1200 Hz |
| **Variants** | 1 |

**Concept** — A quick binary flip — smaller and simpler than FEATURE_SWITCH. Like flicking a micro-switch on a weapon attachment.

**Synthesis** — A single square-wave blip (1.2 kHz, 8 ms on) immediately followed by a pitched-down echo (600 Hz, 15 ms, gain -8 dB). Both through a subtle high-shelf filter to keep the top end crispy. Feel: minimal, binary, no ambiguity — on or off.

---

### 10. TAB_INSERT

| | |
|---|---|
| **Duration** | 100 ms |
| **Base Freq** | 660 Hz |
| **Variants** | 1 |

**Concept** — A new data-stream connecting — a jack plugging into a neural port.

**Synthesis** — Three rapid micro-tones ascending in a tritone stack: sine blips at 660 Hz, 990 Hz, 1320 Hz, each 20 ms long, spaced 15 ms apart (total ~80 ms). Layer underneath: a short noise 'whoosh' (band-pass 2-6 kHz, 80 ms, gain -14 dB) to give a sense of data rushing in. Apply slight delay feedback (1 repeat, 30 ms, -18 dB) for digital echo. Feel: arrival, expansion, a new window into the net opening.

---

### 11. TAB_CLOSE

| | |
|---|---|
| **Duration** | 90 ms |
| **Base Freq** | 1320 Hz |
| **Variants** | 1 |

**Concept** — A data-stream severed — the jack unplugging. Inverse of TAB_INSERT.

**Synthesis** — Three rapid descending blips (1320 Hz, 990 Hz, 660 Hz, each 15 ms, spaced 10 ms). Layer a very short 'zip' — saw-wave sweep from 4 kHz to 200 Hz in 50 ms with sharp exponential decay. End with a muted 'thud' (sine 100 Hz, 30 ms, gain -10 dB). Feel: disconnection, collapse, a portal snapping shut.

---

### 12. TAB_SLASH

| | |
|---|---|
| **Duration** | 160 ms |
| **Base Freq** | 1760 Hz |
| **Variants** | 1 |

**Concept** — The command line activating — a Netrunner's HUD responding to a voice prompt.

**Synthesis** — A bright, glassy ping — triangle wave at 1760 Hz (A6) with fast attack (2 ms) and medium release (150 ms). Modulate with a very slow LFO (6 Hz, depth +/-20 Hz) during the release to create a gentle shimmer / vibrato as the cursor blinks alive. Add a parallel high-frequency noise layer (high-pass 8 kHz, gain -24 dB, 60 ms) for sparkle. Feel: readiness, focus, the interface awaiting your input.

---

## Keyboard Sounds

### 13. TYPING_LETTER

| | |
|---|---|
| **Duration** | 25 ms |
| **Base Freq** | 1800 Hz |
| **Variants** | 19 |

**Concept** — Holo-keyboard key-press — each stroke taps a projected light key floating above a desk. Needs to feel physical despite being virtual.

**Synthesis** — A micro noise-burst (band-pass 3-7 kHz, 12 ms) for the 'tap', plus a very faint pitched body (sine, 15 ms, gain -18 dB) whose frequency is randomised per variant (pool: 1000-2400 Hz in 80 Hz steps). Each variant picks a different body frequency and a slightly different noise filter centre (+/-500 Hz jitter) so that rapid typing sounds organic, not machine-gun repetitive. Apply a tiny room reverb (30 ms tail) for spatial presence. Feel: light, crispy, tactile, like rain on a tin awning.

---

### 14. TYPING_BACKSPACE

| | |
|---|---|
| **Duration** | 30 ms |
| **Base Freq** | 600 Hz |
| **Variants** | 1 |

**Concept** — Deletion — erasing a character from the holo-display. Slightly lower-pitched and softer than TYPING_LETTER to convey 'removal' rather than 'creation'.

**Synthesis** — A short square-wave pulse at 600 Hz (8 ms) with immediate exponential decay, followed by a faint reverse-noise envelope (noise gain ramps from -30 dB to -18 dB over 20 ms then cuts — creates a subtle 'sucking back' sensation). Low-pass at 3 kHz to keep it dull compared to letter keys. Feel: a small retraction, like a pixel dissolving backward.

---

### 15. TYPING_ENTER

| | |
|---|---|
| **Duration** | 80 ms |
| **Base Freq** | 500 Hz |
| **Variants** | 1 |

**Concept** — Command confirmed — the 'execute' key. Heavier and more resonant than any letter key.

**Synthesis** — A two-part sound. (a) Attack: hard transient — mix of square-wave pop (500 Hz, 3 ms) and noise burst (band-pass 2-5 kHz, 10 ms). (b) Body: a descending saw-wave tone (500 Hz to 300 Hz, 60 ms) through a resonant low-pass (Q = 6, cutoff 1.5 kHz) to give a weighty 'thonk'. Add sub (sine 80 Hz, 30 ms, gain -8 dB) for gravitas. Feel: decisive, final, heavier than other keys — a stamp of confirmation.

---

### 16. TYPING_SPACE

| | |
|---|---|
| **Duration** | 30 ms |
| **Base Freq** | 350 Hz |
| **Variants** | 1 |

**Concept** — The space-bar — the widest key, producing a broader, more hollow sound than a letter key.

**Synthesis** — A filtered noise 'puff' (band-pass centred at 1.5 kHz, Q = 2 for width, 20 ms) — wider and more diffuse than TYPING_LETTER's tight tap. Add a subtle pitched undertone (triangle wave, 350 Hz, 15 ms, gain -14 dB) for the bar's resonant cavity. Roll off highs above 5 kHz to keep it mellow. Feel: a soft, broad thump — like tapping a padded surface.

---

## Application Sounds

### 17. APP_START

| | |
|---|---|
| **Duration** | 1200 ms |
| **Base Freq** | 165 Hz |
| **Variants** | 1 |

**Concept** — Ghost frequency awakening — something stirs in the dark network. A deep drone emerges from silence, its filter slowly opening like an eye, joined after a beat by a perfect fifth that floats above like a signal from an unknown source. A slow tremolo breathes life into the tone. Dark, low-passed noise and deep sub-bass fill the space below. The feeling: waking up inside a machine that already knows you're there.

**Synthesis** — Primary drone: sine at 165 Hz, low-pass filter sweeping 300 → 900 Hz over 600 ms then closing to 200 Hz by 1.2 s (Q 4), gain fading in over 350 ms to 0.18, holding, then decaying. Perfect fifth: sine at 248 Hz enters at 300 ms, through low-pass 600 Hz (Q 2), peaks at gain 0.10 around 600 ms, decays to 1.2 s. LFO: sine at 2.5 Hz modulates drone gain by 0.04 for tremolo. Noise: low-passed at 1200 Hz, slow swell to gain 0.04 over 500 ms, decays over 1.1 s. Sub: sine at 55 Hz, fades in over 300 ms to 0.10, decays over 800 ms.
