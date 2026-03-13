# Orbit Deck

> A serene near-future sound palette inspired by standing on a high-altitude gantry at the edge of space — pressurized suit seals, visor HUD pings, radio static, and the vast atmospheric hiss of clouds far below, designed to make a browser feel like a quiet EVA control interface above the stratosphere.

---

## Theme Identity

| Property | Value |
|---|---|
| Source | Astronaut on orbital platform — spacesuit, metallic gantry, cloudscape, teal sky, life-support backpack |
| Accent | Signal orange `#E8714A`, Atmosphere teal `#4DC9B0` |
| Base | Deep space navy, cloud-white, steel gray |
| Mood | Standing alone on a platform above the clouds at golden hour — vast silence broken only by suit comms and the whisper of thin atmosphere, serene and immense |
| Engine | Web Audio API only — no sample files, oscillators + noise + filters + envelopes |

---

## Browser Sounds

### 1. HOVER

| | |
|---|---|
| **Duration** | 65 ms |
| **Base Freq** | 2200 Hz |
| **Variants** | 1 |

**Concept** — A faint radio proximity ping on the visor HUD — the softest acknowledgement that a system element is within reach. Like a ghost signal from a distant relay.

**Synthesis** — Pure sine sweep (2.2 kHz to 2.8 kHz, ~65 ms) through a gentle low-pass (cutoff 4 kHz, Q = 1.5) for that clean, filtered-through-a-helmet quality. Gain envelope: attack 6 ms, release 59 ms with exponential decay. Layer a whisper of filtered noise (high-pass 3 kHz, gain -28 dB, 40 ms) for atmospheric static texture.

---

### 2. HOVER_UP

| | |
|---|---|
| **Duration** | 50 ms |
| **Base Freq** | 2800 Hz |
| **Variants** | 1 |

**Concept** — The HUD element deselecting — a descending fade, like a radio signal drifting out of range as you look away.

**Synthesis** — Sine sweep (2.8 kHz to 1.8 kHz, ~50 ms) through low-pass (cutoff 3.5 kHz, Q = 1.5). Gain envelope: attack 4 ms, exponential release 46 ms. Clean, no noise layer — the silence returns.

---

### 3. CLICK

| | |
|---|---|
| **Duration** | 35 ms |
| **Base Freq** | 800 Hz |
| **Variants** | 1 |

**Concept** — Pressing a glove-friendly tactile button on the suit forearm panel — a precise, pressurized 'click' transmitted through the suit's internal speakers.

**Synthesis** — Two layers: (a) Sine pop at 800 Hz (2 ms pulse, immediate exponential decay) for the clean electronic contact, (b) tiny noise burst (band-pass 3-5 kHz, Q = 4, 12 ms decay) for the tactile texture of a sealed switch. Apply low-pass at 5 kHz. No room reverb — sound travels through the suit, not air.

---

### 4. IMPORTANT_CLICK

| | |
|---|---|
| **Duration** | 130 ms |
| **Base Freq** | 440 Hz |
| **Variants** | 1 |

**Concept** — Engaging a critical airlock control — the heavy electromagnetic clunk of a safety-rated mechanism confirming a command. Two-tone confirmation: low thud + high acknowledgement ping.

**Synthesis** — (a) Low thud: sine at 440 Hz (attack 2 ms, sustain 40 ms, release 80 ms) through resonant low-pass (cutoff 700 Hz, Q = 6) for metallic hull resonance. (b) Confirmation ping: sine at 1760 Hz (onset at 15 ms, duration 40 ms, gain -8 dB) — a clean octave harmonic. (c) Sub-bass: sine 55 Hz (50 ms, gain -10 dB) for the mechanical weight of the locking mechanism.

---

### 5. FEATURE_SWITCH_ON

| | |
|---|---|
| **Duration** | 300 ms |
| **Base Freq** | 220 Hz |
| **Variants** | 1 |

**Concept** — A suit subsystem powering on — oxygen flow starting, visor display illuminating. An ascending electronic hum with a pressurization hiss, like life arriving.

**Synthesis** — Stage 1 (0-25 ms): sharp noise click (band-pass 4 kHz, Q = 3, 20 ms) for the relay activation. Stage 2 (25-280 ms): ascending sine + triangle (220 Hz to 660 Hz) through opening low-pass (cutoff 500 to 4000 Hz, Q = 2). Layer a pressurization hiss (noise, high-pass 2 kHz, gain ramps from -30 dB to -14 dB over 200 ms, then fades). Release: 80 ms exponential. Add faint 120 Hz hum (sine, gain -18 dB, 200 ms) for the power supply.

---

### 6. FEATURE_SWITCH_OFF

| | |
|---|---|
| **Duration** | 270 ms |
| **Base Freq** | 660 Hz |
| **Variants** | 1 |

**Concept** — The subsystem powering down — display dimming, a descending whine as the system drains, and a final depressurization sigh.

**Synthesis** — Descending sine + triangle (660 Hz to 160 Hz) through closing low-pass (cutoff 4000 to 400 Hz) over 230 ms. Layer a depressurization hiss (noise, band-pass 1.5-4 kHz, gain -14 dB fading to -30 dB over 200 ms). End with a faint low sine (80 Hz, 60 ms, gain -16 dB) for capacitor drain. Release: 40 ms.

---

### 7. LIMITER_ON

| | |
|---|---|
| **Duration** | 230 ms |
| **Base Freq** | 300 Hz |
| **Variants** | 1 |

**Concept** — A helmet visor seal engaging — the faceplate locking into place with a pressurized hiss and a constrained, sealed quality. Air tightening.

**Synthesis** — Short noise burst (band-pass 3.5 kHz, Q = 5, 15 ms) for the latch click. Ascending sine (300 Hz to 480 Hz) through a very resonant low-pass (Q = 12, cutoff 400 to 1200 Hz) for the 'sealed' narrow quality. Layer pressurization noise (high-pass 2.5 kHz, gain ramp from -26 dB to -16 dB over 150 ms, then cut). Overall gain envelope: attack 10 ms, sustain 160 ms, release 60 ms.

---

### 8. LIMITER_OFF

| | |
|---|---|
| **Duration** | 200 ms |
| **Base Freq** | 480 Hz |
| **Variants** | 1 |

**Concept** — Visor seal releasing — the faceplate unlocking with a satisfying depressurization puff and the sudden openness of unfiltered atmosphere.

**Synthesis** — Onset: wide noise burst (low-pass 6 kHz, 30 ms, gain -6 dB) for the depressurization puff — the biggest, widest noise in the theme. Descending sine (480 Hz to 200 Hz) through low-pass that opens wide (Q drops from 12 to 1 over 170 ms) to represent the shift from sealed to open. End with a soft resonant bump (sine 120 Hz, 35 ms, gain -14 dB).

---

### 9. SWITCH_TOGGLE

| | |
|---|---|
| **Duration** | 40 ms |
| **Base Freq** | 1200 Hz |
| **Variants** | 1 |

**Concept** — A small toggle on the suit chest panel — a clean, precise electronic pip. Minimal and efficient, designed for gloved fingers.

**Synthesis** — Sine blip (1200 Hz, 8 ms) with immediate exponential decay. A faint octave echo (600 Hz, 10 ms, gain -12 dB) offset by 8 ms. Both through low-pass at 4 kHz. Micro noise click (high-pass 3 kHz, 2 ms, gain -14 dB) at onset for tactile feel.

---

### 10. TAB_INSERT

| | |
|---|---|
| **Duration** | 110 ms |
| **Base Freq** | 600 Hz |
| **Variants** | 1 |

**Concept** — A new comm channel opening — like tuning into a new radio frequency, the signal crystallizing from static into clarity. A new data stream arriving.

**Synthesis** — Three ascending sine pings (600 Hz, 900 Hz, 1200 Hz, each 15 ms, 10 ms apart) through low-pass at 4 kHz. Layer a noise sweep underneath (band-pass 2-4 kHz, Q = 2, 70 ms, gain -18 dB) that rises in centre frequency for the 'tuning in' feel. Brief delay echo (1 repeat, 20 ms, -22 dB) for radio depth.

---

### 11. TAB_CLOSE

| | |
|---|---|
| **Duration** | 90 ms |
| **Base Freq** | 1200 Hz |
| **Variants** | 1 |

**Concept** — A comm channel closing — the signal dissolving into static and then silence. Lost contact.

**Synthesis** — Three descending sine pings (1200 Hz, 900 Hz, 600 Hz, each 12 ms, 8 ms apart). Layer a descending noise sweep (band-pass centre drops from 4 kHz to 1 kHz, 50 ms, gain -16 dB). End with a soft sub tone (sine 70 Hz, 20 ms, gain -14 dB) for finality.

---

### 12. TAB_SLASH

| | |
|---|---|
| **Duration** | 190 ms |
| **Base Freq** | 1500 Hz |
| **Variants** | 1 |

**Concept** — The suit's command interface activating — a bright, clear acknowledgement chime that says 'ready for input'. Like the visor HUD focusing and awaiting voice command.

**Synthesis** — Clean sine ping at 1500 Hz (attack 2 ms, release 180 ms) through low-pass at 5 kHz. Gentle vibrato LFO (3 Hz, depth +/-8 Hz) during release for a slight organic shimmer. Layer a faint harmonic (sine 3000 Hz, 50 ms, gain -22 dB). Add a soft noise shimmer (high-pass 4 kHz, gain -30 dB, 60 ms) for atmosphere.

---

## Keyboard Sounds

### 13. TYPING_LETTER

| | |
|---|---|
| **Duration** | 25 ms |
| **Base Freq** | 1500 Hz |
| **Variants** | 16 |

**Concept** — Typing on the suit forearm keypad — small sealed buttons with a muffled, pressurized tactile feel. Each key has a slightly different pitch, but all share the same 'heard-through-a-helmet' quality.

**Synthesis** — Micro noise-burst (band-pass 3-6 kHz, Q = 3, 10 ms) for the tap. Faint pitched body (sine, 14 ms, gain -18 dB) with frequency randomized per variant (pool: 1000-2200 Hz in 80 Hz steps). Each variant jitters the noise filter centre (+/-500 Hz). Apply low-pass at 5.5 kHz. No room reverb — sealed environment.

---

### 14. TYPING_BACKSPACE

| | |
|---|---|
| **Duration** | 30 ms |
| **Base Freq** | 550 Hz |
| **Variants** | 1 |

**Concept** — The delete key on the forearm panel — lower-pitched, a small downward blip like clearing a character from the visor display.

**Synthesis** — Sine blip (550 Hz, descending to 350 Hz over 20 ms) through low-pass at 2.5 kHz. Layer a soft noise pulse (band-pass 1.5 kHz, Q = 2, 15 ms, gain -18 dB). Gain envelope: attack 2 ms, exponential release 28 ms.

---

### 15. TYPING_ENTER

| | |
|---|---|
| **Duration** | 85 ms |
| **Base Freq** | 500 Hz |
| **Variants** | 1 |

**Concept** — Confirming a command — the enter key triggers a two-tone acknowledgement: a low thud of the physical key plus a higher confirmation tone from the suit's audio system. Command accepted.

**Synthesis** — (a) Key thud: sine pop at 500 Hz (3 ms pulse) + noise burst (band-pass 2-4 kHz, 10 ms). (b) Confirmation tone: sine at 1000 Hz (onset at 10 ms, duration 50 ms, gain -6 dB) through low-pass at 3 kHz. (c) Sub-bass: sine 70 Hz (30 ms, gain -10 dB) for the physical key weight. Overall release: 25 ms.

---

### 16. TYPING_SPACE

| | |
|---|---|
| **Duration** | 30 ms |
| **Base Freq** | 350 Hz |
| **Variants** | 1 |

**Concept** — The wide space bar on the forearm panel — a broader, more diffuse press with a hollow quality, like tapping on the pressurized suit casing itself.

**Synthesis** — Filtered noise puff (band-pass 1.2 kHz, Q = 1 for wide diffusion, 18 ms) for the broad impact. Sine undertone at 350 Hz (15 ms, gain -14 dB) through low-pass at 2 kHz. Roll off everything above 4 kHz. Feel: wide, hollow, muffled by the suit.

---

## Application Sounds

### 17. APP_START

| | |
|---|---|
| **Duration** | 1400 ms |
| **Base Freq** | 110 Hz |
| **Variants** | 1 |

**Concept** — Orbital silence awakening — the vast quiet of near-space broken only by a deep tone rising from the station's hull. Like hearing your own heartbeat through the suit helmet, a low drone emerges and slowly opens, joined by a distant octave shimmer that drifts in from the void. A gentle LFO breathes through the drone. Thin atmospheric noise and structural sub-bass fill the immense silence. The feeling: floating alone above the clouds, something ancient and serene stirring to life.

**Synthesis** — Primary drone: sine at 110 Hz, low-pass sweeping 200 → 700 Hz over 700 ms then closing to 150 Hz by 1.4 s (Q 2), gain fading in over 500 ms to 0.16. Octave shimmer: sine at 220 Hz enters at 500 ms, through low-pass 500 Hz (Q 1.5), peaks at gain 0.06 around 900 ms. LFO: sine at 1.5 Hz modulates drone gain by 0.03. Atmospheric noise: band-pass 2 kHz (Q 1) through low-pass 3 kHz, slow swell to gain 0.025 over 600 ms, decays over 1.3 s. Sub: sine at 55 Hz, fades in over 400 ms to 0.08, decays over 1.0 s.
