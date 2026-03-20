# Neon Pulse

> Cyber-grid high-energy interface — vibrant pulse-width modulated tones with rhythmic logical gating and neon-bright resonance.

![Neon Pulse cover](cover.png)

---

## Theme Identity

| Property | Value |
|---|---|
| Accent | Electric Magenta `#FF00FF`, Neon Cyan `#00FFFF` |
| Base | Deep Carbon `#08080A`, glossy black surfaces, ultraviolet traces |
| Mood | A hacker in a high-speed data-stream — neon lines racing past, logic gates flickering at gigahertz speeds, high-voltage energy humming in the circuits |
| Engine | Web Audio API only — no sample files, oscillators + noise + filters + envelopes |

---

## Sonic DNA

> Every theme must define a **unique synthesis identity** — a set of 3–5 signature
> techniques that fundamentally shape how every sound is built. Two themes should
> never share the same Sonic DNA. Changing frequencies or filter cutoffs alone is
> NOT sufficient differentiation.

| Technique | Description |
|---|---|
| **Primary waveform** | **Pulse-Width Modulated (PWM) Square** — two sawtooth oscillators with one inverted, with a slight phase/frequency offset (0.5–2 Hz) creating the classic "fat" PWM movement. Provides a rich, buzzing energy. |
| **Signature effect** | **Logic Gate Shimmer** — a high-frequency (12–25 Hz) square wave LFO modulating the gain, creating a rapid "flicker" or "digital stutter" that emulates high-speed data switching. |
| **Transient character** | **Frequency-Slide "Blip"** — an ultra-fast (2–4ms) exponential pitch slide from a high frequency (e.g. 5 kHz) down to the base frequency. Sharp and energetic without being "noisy". |
| **Envelope philosophy** | **Rhythmic Staccato** — sounds are either extremely short (sub-40ms) or have multiple "pulses" within their duration. Zero sustain, sharp digital cutoffs. |
| **Frequency world** | **Neon-Bright Highs** — dominant 2nd and 3rd harmonics, full spectrum but with a resonant peak at the fundamental and a high-shelf boost > 4 kHz for "electric" clarity. |

**Differentiation rule**: Before implementing, compare the above table against
all existing themes. If any two themes share the same primary waveform AND
signature effect AND envelope philosophy, the design is too similar. Redesign
until at least 3 of 5 rows are fundamentally different.

---

## Browser Sounds

### 1. HOVER

| | |
|---|---|
| **Duration** | 45 ms |
| **Base Freq** | 880 Hz |
| **Variants** | 1 |

**Concept** — A cursor brushing against a high-voltage neon trace. A quick, energetic "zip" of energy as the element lights up.

**Synthesis** — Two sawtooth oscillators at 880 Hz, one inverted. One oscillator offset by 1.5 Hz for PWM. Pitch slides from 1200 Hz to 880 Hz in 4ms (transient). Gain envelope: 0 -> 0.08 in 2ms, exponential decay to 0.001 at 45ms. Logic gate shimmer: gain modulated by a 20 Hz square LFO at 40% depth. Highpass filter at 400 Hz to keep it thin.

---

### 2. HOVER_UP

| | |
|---|---|
| **Duration** | 35 ms |
| **Base Freq** | 660 Hz |
| **Variants** | 1 |

**Concept** — Energy receding from a neon line. A shorter, descending blip that feels like a circuit closing.

**Synthesis** — PWM pair (saws) starting at 660 Hz. Pitch slides from 660 Hz down to 440 Hz over 35ms. Gain envelope: 0 -> 0.06 in 1ms, linear decay to 0.001 at 35ms. Logic gate shimmer at 25 Hz (faster). Bandpass filter at 1200 Hz (Q=1) for a slightly hollower feel.

---

### 3. CLICK

| | |
|---|---|
| **Duration** | 25 ms |
| **Base Freq** | 1100 Hz |
| **Variants** | 1 |

**Concept** — Tapping a digital logic gate. A sharp, instantaneous "bit-flip" that feels precise and high-frequency.

**Synthesis** — PWM pair at 1100 Hz. Pitch slide from 4400 Hz to 1100 Hz in 2ms. Gain envelope: 0 -> 0.15 in 0.5ms (instant), exponential decay to 0.001 at 25ms. No LFO modulation (too short). Noise burst: highpass at 6000 Hz, gain 0.05, duration 2ms for extra "click".

---

### 4. IMPORTANT_CLICK

| | |
|---|---|
| **Duration** | 140 ms |
| **Base Freq** | 220 Hz |
| **Variants** | 1 |

**Concept** — A master switch activating a large grid sector. A heavy, resonant pulse that ripples through the system.

**Synthesis** — PWM pair at 220 Hz. Pitch slide from 880 Hz to 220 Hz in 8ms. Gain envelope: 0 -> 0.2 in 2ms, sustain at 0.15 for 20ms, exponential decay to 0.001 at 140ms. Logic gate shimmer: 15 Hz square LFO, 60% depth. Sub-oscillator: sine wave at 55 Hz (two octaves down), gain 0.1, duration 80ms.

---

### 5. FEATURE_SWITCH_ON

| | |
|---|---|
| **Duration** | 320 ms |
| **Base Freq** | 440 Hz |
| **Variants** | 1 |

**Concept** — A subsystem powering up in a sequence of rapid pulses. A digital "rise" that builds energy.

**Synthesis** — Three PWM pairs at 440 Hz, 880 Hz, 1320 Hz, staggered onsets (0ms, 40ms, 80ms). Each pair has a 200ms duration with a rhythmic "ratchet" gain (using a 16 Hz square LFO). Master pitch slides up from 440 Hz to 660 Hz over the total duration. Resonant lowpass filter swept from 500 Hz to 5000 Hz.

---

### 6. FEATURE_SWITCH_OFF

| | |
|---|---|
| **Duration** | 280 ms |
| **Base Freq** | 440 Hz |
| **Variants** | 1 |

**Concept** — A subsystem powering down, energy dissipating through the grid. A descending digital sequence.

**Synthesis** — PWM pair starting at 440 Hz, jumping down to 330 Hz and 220 Hz in steps (100ms each). Gain modulated by a 12 Hz square LFO. Pitch slides down from base to base - 50 Hz at each step. Lowpass filter closing from 3000 Hz to 200 Hz.

---

### 7. LIMITER_ON

| | |
|---|---|
| **Duration** | 180 ms |
| **Base Freq** | 1760 Hz |
| **Variants** | 1 |

**Concept** — High-frequency safety clamps engaging. A sharp, restricted digital beep.

**Synthesis** — PWM pair at 1760 Hz. No pitch slide. Gain envelope: 0 -> 0.1 in 2ms, "stutter" gain (50 Hz LFO, 100% depth) for 60ms, then solid sustain. Bandpass filter at 1760 Hz (Q=10) for extreme resonance.

---

### 8. LIMITER_OFF

| | |
|---|---|
| **Duration** | 200 ms |
| **Base Freq** | 1320 Hz |
| **Variants** | 1 |

**Concept** — Clamps releasing, energy flowing freely again. An opening digital "sigh".

**Synthesis** — PWM pair at 1320 Hz. Pitch slides up to 1760 Hz. Gain envelope: 0 -> 0.1 in 10ms, linear decay. Resonant lowpass filter opening from 1000 Hz to 8000 Hz.

---

### 9. SWITCH_TOGGLE

| | |
|---|---|
| **Duration** | 80 ms |
| **Base Freq** | 880 Hz |
| **Variants** | 1 |

**Concept** — Flipping a toggle on a neon dashboard. Tactile but electronic.

**Synthesis** — Two pulses: first a 5ms high-freq blip (2200 Hz), then at 15ms a PWM pair at 880 Hz (duration 65ms). Logic gate shimmer at 20 Hz on the second pulse. Gain 0.1.

---

### 10. TAB_INSERT

| | |
|---|---|
| **Duration** | 220 ms |
| **Base Freq** | 660 Hz |
| **Variants** | 1 |

**Concept** — A new data tab sliding into the grid. A smooth but digitized motion.

**Synthesis** — PWM pair at 660 Hz. Pitch slides up from 440 Hz to 660 Hz. Gain envelope: 0 -> 0.1 in 30ms, then rhythmic gating (16 Hz) until end. Lowpass filter opening.

---

### 11. TAB_CLOSE

| | |
|---|---|
| **Duration** | 150 ms |
| **Base Freq** | 440 Hz |
| **Variants** | 1 |

**Concept** — A tab collapsing and vanishing from the grid.

**Synthesis** — PWM pair at 440 Hz. Pitch slides down to 220 Hz. Gain envelope: 0.1 -> 0 in 150ms. Rhythmic gating at 20 Hz (speeding up to 40 Hz).

---

### 12. TAB_SLASH

| | |
|---|---|
| **Duration** | 120 ms |
| **Base Freq** | 880 Hz |
| **Variants** | 1 |

**Concept** — Slicing through a data stream. A sharp, digital "cut".

**Synthesis** — PWM pair at 880 Hz. Rapid pitch slide 1760 -> 440 Hz. Gain 0.15. Highpass filter swept 200 -> 2000 Hz.

---

## Application Sounds

### 13. APP_START

| | |
|---|---|
| **Duration** | 1.2 s |
| **Base Freq** | 110 Hz |
| **Variants** | 1 |

**Concept** — The entire neon grid initializing. A massive surge of energy rising through the system, culminating in a stable hum.

**Synthesis** — A cluster of 4 PWM pairs at 110, 220, 440, 880 Hz. Sub-bass sine at 55 Hz. Master pitch slides up one octave over 800ms. Rhythmic "logic gate" pulses starting at 4 Hz and accelerating to 32 Hz (simulating a CPU booting). Resonant lowpass filter swept from 100 Hz to 5000 Hz. Ends with a "neon flicker" (random gain fluctuations) for the final 400ms.

---

## Keyboard Sounds

### 14. TYPING_LETTER

| | |
|---|---|
| **Duration** | 30 ms |
| **Base Freq** | 1200–1600 Hz |
| **Variants** | 10 |

**Concept** — High-speed data entry. Each key is a tiny, energetic pulse of neon light.

**Synthesis** — Short PWM blip at randomized freq (1200–1600 Hz). Pitch slide down 200 Hz. Gain 0.08. Bandpass filter at fundamental. Duration 30ms.

---

### 15. TYPING_BACKSPACE

| | |
|---|---|
| **Duration** | 45 ms |
| **Base Freq** | 440 Hz |
| **Variants** | 1 |

**Concept** — Deleting a data point. A slightly lower, "reversing" blip.

**Synthesis** — PWM pair at 440 Hz. Pitch slide 440 -> 220 Hz. Gain 0.1. Duration 45ms.

---

### 16. TYPING_ENTER

| | |
|---|---|
| **Duration** | 120 ms |
| **Base Freq** | 880 Hz |
| **Variants** | 1 |

**Concept** — Committing a command line. A bright, resonant confirmation.

**Synthesis** — PWM pair at 880 Hz. Pitch slide 1760 -> 880 Hz. Rhythmic triple-pulse (30ms on, 10ms off). Gain 0.12.

---

### 17. TYPING_SPACE

| | |
|---|---|
| **Duration** | 60 ms |
| **Base Freq** | 220 Hz |
| **Variants** | 1 |

**Concept** — A wider, airier pulse for the space bar.

**Synthesis** — PWM pair at 220 Hz. Gain 0.08. Bandpass filter (Q=0.5) to make it broader. Short 15 Hz logic gate shimmer.
