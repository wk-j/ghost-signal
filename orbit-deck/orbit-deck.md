# Orbit Deck

> A serene near-future sound palette inspired by standing on a high-altitude gantry at the edge of space — pressurized suit seals, visor HUD pings, radio static, and the vast atmospheric hiss of clouds far below, designed to make a browser feel like a quiet EVA control interface above the stratosphere.

![Orbit Deck cover](cover.png)

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

## Sonic DNA

| Technique | Description |
|---|---|
| **Primary waveform** | Pure sine, single oscillator — clinical, sterile, clean. No harmonics unless deliberately layered. |
| **Signature effect** | Feedback delay tails — sounds arrive from distance and dissolve into void. Every sound routes through at least one delay node with feedback gain loop. |
| **Transient character** | Soft fade-in, no click — no sharp onsets, everything materializes gently via linear ramps > 3ms |
| **Envelope philosophy** | Long tails dissolving into void — generous release times, sounds linger and decay slowly |
| **Frequency world** | Clean, LP-filtered, sterile — everything below 4 kHz, no harshness, lowpass on every chain |

---

## Browser Sounds

### 1. HOVER

| | |
|---|---|
| **Duration** | 65 ms |
| **Base Freq** | 2200 Hz |
| **Variants** | 1 |

**Concept** — A faint radio proximity ping on the visor HUD — the softest acknowledgement that a system element is within reach. Like a ghost signal from a distant relay.

**Synthesis** — Doppler-style sine sweep: frequency rises from 1.8 kHz to 2.6 kHz over 60 ms (approach), then settles to 2.2 kHz by 90 ms (pass-by). LP-filtered at 3.8 kHz (Q 1.0) for sterile, helmet-heard quality. Soft fade-in via linear ramp to gain 0.09 over 8 ms, exponential decay to silence by 70 ms — no click onset. Feedback delay loop (45 ms delay time, feedback gain 0.35) creates 2–3 fading echoes dissolving into void, mixed through a separate wet gain at 0.06. Dry signal and delay tails sum at destination.

---

### 2. HOVER_UP

| | |
|---|---|
| **Duration** | 50 ms |
| **Base Freq** | 2800 Hz |
| **Variants** | 1 |

**Concept** — The HUD element deselecting — a descending fade, like a radio signal drifting out of range as you look away.

**Synthesis** — Reverse Doppler: sine descends from 2.6 kHz to 1.6 kHz over 70 ms (receding). LP-filtered at 3.5 kHz (Q 0.8). Soft fade-in via linear ramp to 0.08 over 6 ms, exponential decay by 60 ms. Feedback delay with expanding delay time (35 ms stretching to 80 ms over 80 ms) and feedback gain 0.4 — echoes stretch further apart as the signal recedes. Wet path additionally LP-filtered at 2.8 kHz, keeping tails darker than the source. Long dissolving tail characteristic of the theme's void aesthetic.

---

### 3. CLICK

| | |
|---|---|
| **Duration** | 35 ms |
| **Base Freq** | 800 Hz |
| **Variants** | 1 |

**Concept** — Pressing a glove-friendly tactile button on the suit forearm panel — a precise, pressurized 'click' transmitted through the suit's internal speakers.

**Synthesis** — Pure sine impulse at 800 Hz through LP at 3 kHz (Q 0.7). Soft fade-in over 3 ms to gain 0.06, exponential decay by 12 ms — the source is barely a blip. Cascaded dual-delay chain: delay 1 (22 ms, feedback 0.45) feeds into delay 2 (18 ms, feedback 0.3), creating 3–4 staggered echoes at different rhythmic intervals. Wet mix at 0.18 is notably louder than the dry source, making the echoes the primary sound — the click arrives from distance, heard through reflections rather than directly.

---

### 4. IMPORTANT_CLICK

| | |
|---|---|
| **Duration** | 130 ms |
| **Base Freq** | 440 Hz |
| **Variants** | 1 |

**Concept** — Engaging a critical airlock control — the heavy electromagnetic clunk of a safety-rated mechanism confirming a command. Two-tone confirmation: low thud + high acknowledgement ping.

**Synthesis** — Two pure sines: (a) body at 440 Hz through LP at 1.2 kHz (Q 2.0), soft fade-in over 5 ms to 0.18, sustained at 0.18 for 40 ms, then exponential decay by 150 ms. (b) Sympathetic harmonic at 880 Hz, entering 30 ms later — fades in over 8 ms to 0.08, decays by 120 ms. Both dry signals route to destination and also feed a shared feedback delay (55 ms delay time, feedback 0.38). Wet path LP-filtered at 2 kHz, mixed at 0.10 — the delay creates a reverb-like wash where body and harmonic echoes interleave. Long dissolving tail over 200 ms total.

---

### 5. FEATURE_SWITCH_ON

| | |
|---|---|
| **Duration** | 300 ms |
| **Base Freq** | 220 Hz |
| **Variants** | 1 |

**Concept** — A suit subsystem powering on — oxygen flow starting, visor display illuminating. An ascending electronic hum with a pressurization hiss, like life arriving.

**Synthesis** — Pure sine ascending from 220 Hz to 660 Hz (exponential ramp over 250 ms) through LP sweeping open from 600 Hz to 3.2 kHz (Q 1.5). Soft fade-in over 20 ms to 0.14, sustained until 200 ms, exponential decay by 300 ms. Feedback delay with contracting delay time (80 ms shortening to 25 ms) and rising feedback gain (0.15 to 0.55) — echoes compress and intensify as the system powers up, creating an accelerating pulse effect. Wet gain swells from 0.03 to 0.12 over 250 ms, then decays. The delay tails dissolve into void by 300 ms.

---

### 6. FEATURE_SWITCH_OFF

| | |
|---|---|
| **Duration** | 270 ms |
| **Base Freq** | 660 Hz |
| **Variants** | 1 |

**Concept** — The subsystem powering down — display dimming, a descending whine as the system drains, and a final depressurization sigh.

**Synthesis** — Pure sine descending from 660 Hz to 180 Hz (exponential ramp over 220 ms) through LP closing from 3.2 kHz to 500 Hz (Q 1.5). Gain starts at 0.14, exponential decay over 270 ms — no fade-in, immediate presence that drains away. Feedback delay with expanding delay time (25 ms stretching to 100 ms) and falling feedback gain (0.50 to 0.20) — echoes slow down and weaken as the system powers down. Wet path additionally LP-filtered at 1.8 kHz, keeping trailing echoes darker and more distant. Tails dissolve into void by 270 ms.

---

### 7. LIMITER_ON

| | |
|---|---|
| **Duration** | 230 ms |
| **Base Freq** | 300 Hz |
| **Variants** | 1 |

**Concept** — A helmet visor seal engaging — the faceplate locking into place with a pressurized hiss and a constrained, sealed quality. Air tightening.

**Synthesis** — Pure sine ascending from 300 Hz to 480 Hz (exponential ramp over 180 ms) through LP at 2.4 kHz (Q 3.0) for a narrow, sealed quality. Soft fade-in over 15 ms to 0.12, sustained at 0.12 until 160 ms, exponential decay by 230 ms. Dual comb filter resonance: two parallel feedback delays at nearly identical times (2.1 ms and 2.3 ms, reinforcing ~476 Hz) with high feedback gains (0.55 and 0.50) creating constructive interference — a metallic, pressurized resonant peak. Comb outputs summed at gain 0.08, decaying with the main envelope. The comb filter adds a constrained, sealed harmonic character unique to this sound.

---

### 8. LIMITER_OFF

| | |
|---|---|
| **Duration** | 200 ms |
| **Base Freq** | 480 Hz |
| **Variants** | 1 |

**Concept** — Visor seal releasing — the faceplate unlocking with a satisfying depressurization puff and the sudden openness of unfiltered atmosphere.

**Synthesis** — Pure sine descending from 480 Hz to 220 Hz (exponential ramp over 160 ms) through LP closing from 2.4 kHz to 800 Hz (Q 2.0). Gain starts at 0.12, exponential decay over 200 ms. Dual comb filter collapse: two parallel feedback delays start at matched 2.2 ms but diverge — one stretching to 8 ms, the other to 14 ms over 160 ms — destroying the constructive interference that LIMITER_ON built. Feedback gains simultaneously fall from 0.50 to 0.10, dissolving the resonance. Comb mix decays from 0.08 to silence. The widening delay divergence represents the shift from sealed to open — resonance crumbles as the seal releases.

---

### 9. SWITCH_TOGGLE

| | |
|---|---|
| **Duration** | 40 ms |
| **Base Freq** | 1200 Hz |
| **Variants** | 1 |

**Concept** — A small toggle on the suit chest panel — a clean, precise electronic pip. Minimal and efficient, designed for gloved fingers.

**Synthesis** — Soft double-ping: two pure sines at 1.2 kHz and 800 Hz. First ping fades in over 4 ms to 0.10, decays by 18 ms. Second ping enters at 12 ms, fades in over 4 ms to 0.08, decays by 32 ms. Both through LP at 3.5 kHz. Shared feedback delay (28 ms delay time, feedback 0.30) creates subtle trailing echoes mixed at 0.06 — the pings scatter gently into void. No click onset on either ping, both materialise softly via linear ramps.

---

### 10. TAB_INSERT

| | |
|---|---|
| **Duration** | 110 ms |
| **Base Freq** | 600 Hz |
| **Variants** | 1 |

**Concept** — A new comm channel opening — like tuning into a new radio frequency, the signal crystallizing from static into clarity. A new data stream arriving.

**Synthesis** — Single ascending sine sweep from 500 Hz to 1.4 kHz (exponential ramp over 60 ms) through LP at 3.6 kHz (Q 1.2). Soft fade-in over 8 ms to 0.12, exponential decay by 70 ms. Three-stage cascaded delay chain: delay 1 (24 ms, feedback 0.25) feeds delay 2 (48 ms, feedback 0.20) feeds delay 3 (72 ms, feedback 0.15) — creating a staggered echo cascade where different frequency regions of the sweep trigger echoes at different times. Each delay stage also tapped directly to destination (gains 0.06, 0.04) plus final cascade output at 0.08. The result is a crystallizing signal that assembles itself from scattered reflections.

---

### 11. TAB_CLOSE

| | |
|---|---|
| **Duration** | 90 ms |
| **Base Freq** | 1200 Hz |
| **Variants** | 1 |

**Concept** — A comm channel closing — the signal dissolving into static and then silence. Lost contact.

**Synthesis** — Descending sine sweep from 1.4 kHz to 400 Hz (exponential ramp over 60 ms) through LP closing from 3.6 kHz to 1 kHz (Q 1.0). Gain starts at 0.12, exponential decay by 70 ms. Collapsing feedback delay: delay time contracts from 60 ms to 12 ms over 80 ms (feedback 0.45), compressing echoes together as the signal folds inward. Wet path LP-filtered at 2.2 kHz, wet gain decays from 0.10 to silence over 130 ms. The shrinking delay time makes echoes accelerate and pile up — a channel closing in on itself, dissolving into nothing.

---

### 12. TAB_SLASH

| | |
|---|---|
| **Duration** | 190 ms |
| **Base Freq** | 1500 Hz |
| **Variants** | 1 |

**Concept** — The suit's command interface activating — a bright, clear acknowledgement chime that says 'ready for input'. Like the visor HUD focusing and awaiting voice command.

**Synthesis** — Pure sine beacon at 1.5 kHz through LP at 3.8 kHz (Q 0.7). Soft fade-in over 4 ms to 0.14, exponential decay by 60 ms — the source is a brief, clean blip. Long feedback delay (42 ms delay time, feedback 0.52) generates 4+ echoes that ring out like sonar pings in an empty chamber. Wet path LP-filtered at 2.8 kHz (Q 0.5), wet gain decays from 0.10 to silence over 250 ms — the longest delay tail in the theme. A single clean impulse fracturing into a cascade of reflections dissolving slowly into void.

---

## Keyboard Sounds

### 13. TYPING_LETTER

| | |
|---|---|
| **Duration** | 25 ms |
| **Base Freq** | 1500 Hz |
| **Variants** | 16 |

**Concept** — Typing on the suit forearm keypad — small sealed buttons with a muffled, pressurized tactile feel. Each key has a slightly different pitch, but all share the same 'heard-through-a-helmet' quality.

**Synthesis** — Micro sine impulse with randomised frequency per variant (pool: 1000–2280 Hz in 80 Hz steps) through LP at 3.4 kHz. Soft fade-in over 3 ms to 0.06, exponential decay by 14 ms — barely audible source. Two parallel scatter delays with randomised times (delay A: 10–22 ms, delay B: 18–32 ms) — no feedback loops, just single reflections summed at gain 0.04. Each keypress triggers a unique delay pattern, creating the illusion of 16 variants heard through different spatial positions. Clean, sealed, no noise layer.

---

### 14. TYPING_BACKSPACE

| | |
|---|---|
| **Duration** | 30 ms |
| **Base Freq** | 550 Hz |
| **Variants** | 1 |

**Concept** — The delete key on the forearm panel — lower-pitched, a small downward blip like clearing a character from the visor display.

**Synthesis** — Reversed delay envelope: sine descending from 550 Hz to 380 Hz (linear ramp over 40 ms) through LP at 2.2 kHz (Q 1.0). Dry signal starts nearly silent (0.01), swells to 0.08 over 30 ms, then decays by 50 ms. Feedback delay (14 ms, feedback 0.40) with wet gain that swells in from 0.005 to 0.10 over 25 ms, then fades by 60 ms — the delay echoes are louder than the source, creating a reverse-swell effect where the sound appears to materialise from its own reflections. Total duration 60 ms.

---

### 15. TYPING_ENTER

| | |
|---|---|
| **Duration** | 85 ms |
| **Base Freq** | 500 Hz |
| **Variants** | 1 |

**Concept** — Confirming a command — the enter key triggers a two-tone acknowledgement: a low thud of the physical key plus a higher confirmation tone from the suit's audio system. Command accepted.

**Synthesis** — Deep sine impact at 200 Hz through resonant LP at 1.6 kHz (Q 2.5). Soft fade-in over 5 ms to 0.18, exponential decay by 60 ms. Confirmation ping: second sine at 400 Hz enters at 10 ms, fades in over 5 ms to 0.06, decays by 50 ms. Both feed a shared long feedback delay (32 ms, feedback 0.58 — the highest feedback in the theme) through LP at 1.2 kHz (Q 1.0). Wet gain decays from 0.12 over 250 ms, producing 6+ dark, rumbling echoes — the longest delay wash in the keyboard sounds. The high feedback creates a cavernous, reverberant confirmation that lingers well after the key press.

---

### 16. TYPING_SPACE

| | |
|---|---|
| **Duration** | 30 ms |
| **Base Freq** | 350 Hz |
| **Variants** | 1 |

**Concept** — The wide space bar on the forearm panel — a broader, more diffuse press with a hollow quality, like tapping on the pressurized suit casing itself.

**Synthesis** — Filtered noise puff: white noise (30 ms buffer) through bandpass at 800 Hz (Q 0.8) then LP at 2 kHz. Soft fade-in over 5 ms to 0.10, exponential decay by 25 ms. Feedback delay (22 ms, feedback 0.35) with wet path LP-filtered at 1.6 kHz, mixed at 0.06 — creates a brief "distant whoosh" with soft trailing echoes. No pitched oscillator — the only noise-based sound in the theme, emphasising the broad, hollow, diffuse quality of the space bar. Everything LP-capped, keeping the puff warm and muffled.

---

## Application Sounds

### 17. APP_START

| | |
|---|---|
| **Duration** | 1400 ms |
| **Base Freq** | 110 Hz |
| **Variants** | 1 |

**Concept** — Orbital silence awakening — the vast quiet of near-space broken only by a deep tone rising from the station's hull. Like hearing your own heartbeat through the suit helmet, a low drone emerges and slowly opens, joined by a distant octave shimmer that drifts in from the void. A gentle LFO breathes through the drone. Thin atmospheric noise and structural sub-bass fill the immense silence. The feeling: floating alone above the clouds, something ancient and serene stirring to life.

**Synthesis** — Full Sonic DNA showcase across three layers. (a) Primary drone: sine at 110 Hz through LP sweeping 200 → 800 Hz over 700 ms then closing to 180 Hz by 1.4 s (Q 1.5). Soft fade-in over 400 ms to 0.14, sustained until 800 ms, exponential decay by 1.4 s. Feeds a main feedback delay (85 ms, feedback swelling from 0.15 to 0.58 over 700 ms, then falling to 0.10 by 1.3 s) — an echo chamber that builds to near-oscillation then dissolves. Wet path LP-filtered at 1.4 kHz (Q 1.0), wet gain swells from 0 to 0.10 over 500 ms, sustained, then decays. (b) Octave shimmer: sine at 220 Hz enters at 500 ms through LP at 600 Hz (Q 1.0), fades in to 0.06 by 900 ms, decays by 1.4 s. Also feeds the shared delay, adding higher harmonics to the echo chamber. (c) Sub-bass grounding: sine at 55 Hz, fades in over 300 ms to 0.08, decays by 1.0 s — direct to destination, no delay processing, pure foundation. No noise, no LFO — pristine sine purity throughout.
