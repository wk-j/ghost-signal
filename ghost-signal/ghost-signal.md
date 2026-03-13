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

## Sonic DNA

| Technique | Description |
|---|---|
| **Primary waveform** | FM-modulated square/sawtooth — oscillator-modulating-oscillator creating complex sidebands and harsh harmonics |
| **Signature effect** | Ring modulation — carrier × modulator for metallic, alien, inharmonic timbres. AM with zero DC offset. |
| **Transient character** | Hard square-wave impulse, sub-3ms — violent chrome-snap onset |
| **Envelope philosophy** | Sharp attack, resonant ring-out — initial hit lingers through filter resonance and FM decay |
| **Frequency world** | Mid-highs (1–5 kHz) with harsh resonant peaks — aggressive bandpass and highshelf boosts |

---

## Browser Sounds

### 1. HOVER

| | |
|---|---|
| **Duration** | 60 ms |
| **Base Freq** | 2000 Hz |
| **Variants** | 1 |

**Concept** — A ghost-light scanning across a surface. Faint, airy, almost subliminal — like a proximity sensor pinging when your hand nears a holo-panel.

**Synthesis** — FM synthesis: a square-wave modulator (400→640 Hz) drives the frequency of a sine carrier (2 kHz→3.2 kHz) through a modulation gain that sweeps 200→500 Hz depth, generating complex sidebands that shift upward over 60 ms. The carrier feeds a resonant bandpass (2.4→3.6 kHz, Q 12) for a singing metallic ring-out. Gain envelope: 4 ms linear attack to 0.10, linear decay to zero by 60 ms. Pure FM — no noise layer.

---

### 2. HOVER_UP

| | |
|---|---|
| **Duration** | 50 ms |
| **Base Freq** | 3000 Hz |
| **Variants** | 1 |

**Concept** — The inverse of HOVER — the scanner retracting.

**Synthesis** — Ring modulation: a sine carrier (3 kHz→1.8 kHz descending) is routed into a gain node whose `.gain` AudioParam is driven by a sine modulator at a non-integer frequency ratio (1170→700 Hz), producing inharmonic sum-and-difference partials that descend and compress. A highshelf filter (2.5 kHz, +6 dB) boosts the harsh presence range. Gain envelope: sub-3ms linear attack to 0.12, exponential decay to 0.001 by 50 ms. No noise, no FM — pure ring-mod ghost.

---

### 3. CLICK

| | |
|---|---|
| **Duration** | 35 ms |
| **Base Freq** | 800 Hz |
| **Variants** | 1 |

**Concept** — A cybernetic button-press — tactile and decisive. Imagine a chrome relay snapping shut inside a prosthetic finger.

**Synthesis** — Two layers. (a) Hard square impulse: a square oscillator at 800 Hz, gain 0.25 with exponential decay to 0.001 in 2 ms — sub-2ms chrome snap. (b) Ring-mod metallic transient: a square carrier (1.8 kHz) routed through a gain node whose `.gain` is driven by a sine modulator (2.3 kHz), producing inharmonic sidebands (sum 4.1 kHz, diff 500 Hz). The ring-mod output feeds a resonant bandpass (2.8 kHz, Q 15) for a singing metallic tail, with gain 0.18 decaying exponentially to 0.001 over 30 ms. No noise, no compressor — all character from ring mod and high-Q resonance.

---

### 4. IMPORTANT_CLICK

| | |
|---|---|
| **Duration** | 120 ms |
| **Base Freq** | 440 Hz |
| **Variants** | 1 |

**Concept** — A heavier, more resonant version of CLICK — like confirming a critical system override on a Netrunner's deck.

**Synthesis** — Three layers. (a) Hard square impulse: square oscillator at 900 Hz, gain 0.22 with exponential decay to 0.001 in 2 ms — sub-2ms chrome snap onset. (b) FM body: sawtooth modulator at 220 Hz drives a square carrier at 440 Hz through a modulation gain of 660 (mod index ~3), decaying exponentially to 80 over 120 ms. The high mod index generates rich harmonic sidebands that simplify as the mod depth falls. Output through a peaking filter (1.2 kHz, Q 4, +8 dB) for aggressive mid presence, gain envelope 2 ms attack to 0.25, held to 40 ms, exponential decay to 120 ms. (c) Sub-bass: sine at 55 Hz, gain 0.18, exponential decay over 60 ms for weight.

---

### 5. FEATURE_SWITCH_ON

| | |
|---|---|
| **Duration** | 250 ms |
| **Base Freq** | 220 Hz |
| **Variants** | 1 |

**Concept** — A system coming online — power-up hum of a cybernetic implant activating.

**Synthesis** — FM synthesis with rising modulation index. A square-wave modulator ascends (110→440 Hz) while its depth sweeps from near-zero (10) to high (1200), so the tone starts nearly pure and becomes increasingly complex and harsh as it climbs. The sawtooth carrier ascends 220→880 Hz in parallel. Output through a resonant bandpass (Q 8) that sweeps 400→3200 Hz, tracking the carrier's ascent. Gain envelope: 40 ms linear attack to 0.20, held to 150 ms, exponential decay to 250 ms. No noise, no transient layer — the rising FM mod index creates all the harmonic complexity.

---

### 6. FEATURE_SWITCH_OFF

| | |
|---|---|
| **Duration** | 220 ms |
| **Base Freq** | 880 Hz |
| **Variants** | 1 |

**Concept** — The inverse power-down — an implant going dormant.

**Synthesis** — Two layers, FM + ring mod. (a) Descending FM: square modulator (440→80 Hz) with depth 800→40, driving a sawtooth carrier (880→160 Hz). The mod index collapses as the tone descends, so harmonics simplify toward the end. Gain 0.20 with exponential decay to 0.001 over 220 ms. (b) Ring-mod metallic tail: enters at 80 ms — sine carrier (1600→400 Hz) through a gain node modulated by a sine at 370 Hz, producing inharmonic partials. Output through a resonant bandpass (1.2 kHz, Q 10). Ring gain fades in to 0.12 by 100 ms then decays. The FM handles the power-down sweep; the ring mod adds a metallic ghost in the tail.

---

### 7. LIMITER_ON

| | |
|---|---|
| **Duration** | 200 ms |
| **Base Freq** | 300 Hz |
| **Variants** | 1 |

**Concept** — Shares DNA with FEATURE_SWITCH_ON but sounds more constrained, like a pressure clamp engaging.

**Synthesis** — Two layers. (a) Hard square impulse onset: square oscillator at 1.5 kHz, gain 0.20, exponential decay to 0.001 in 3 ms — sub-3ms chrome snap. (b) Waveshaped ascending tone: sawtooth oscillator (300→800 Hz) routed through a WaveShaperNode with a soft-clip transfer curve (drive amount 8, 2x oversampling) that crushes the waveform into dense harmonics. Output through a resonant bandpass (Q 10) sweeping 600→2400 Hz. Gain envelope: 30 ms attack to 0.16, held to 140 ms, exponential decay to 200 ms. The waveshaper creates the "squeezed" compression character — harmonics are forced rather than generated by FM.

---

### 8. LIMITER_OFF

| | |
|---|---|
| **Duration** | 200 ms |
| **Base Freq** | 600 Hz |
| **Variants** | 1 |

**Concept** — The clamp releasing — mirrors FEATURE_SWITCH_OFF but with a brief outward 'burst' at the onset (white noise, 20 ms, gain -6 dB) as if pressure escapes.

**Synthesis** — Ring modulation with demodulation crossfade. A sawtooth carrier (2 kHz→400 Hz descending) is routed through a gain node whose `.gain` is driven by a sine modulator (1.8 kHz→200 Hz), creating dense inharmonic sidebands. Simultaneously, the carrier also feeds a "clean bypass" gain that fades in from 0 to 0.12 over 120 ms — as the ring-mod output (gain 0.22→0.01) decays, the clean signal emerges underneath, creating a transition from harsh metallic burst to pure descending tone. A highpass filter (200 Hz, Q 2) removes mud from the ring-mod output. Feel: explosive release that settles to clarity.

---

### 9. SWITCH_TOGGLE

| | |
|---|---|
| **Duration** | 40 ms |
| **Base Freq** | 1200 Hz |
| **Variants** | 1 |

**Concept** — A quick binary flip — smaller and simpler than FEATURE_SWITCH. Like flicking a micro-switch on a weapon attachment.

**Synthesis** — FM percussion. A square-wave modulator starts at 4 kHz and sweeps exponentially to 200 Hz in 8 ms with extreme mod depth (3000→10), driving a sine carrier that snaps from 1.2 kHz to 600 Hz in 10 ms. The massive initial FM depth creates a dense burst of sidebands that collapses almost instantly — an 808-style FM click with aggressive square-mod character. Output through a highshelf filter (3 kHz, +4 dB) for presence bite. Gain 0.22, exponential decay to 0.001 over 25 ms. Pure FM, no ring mod — the fastest sound in the palette.

---

### 10. TAB_INSERT

| | |
|---|---|
| **Duration** | 100 ms |
| **Base Freq** | 660 Hz |
| **Variants** | 1 |

**Concept** — A new data-stream connecting — a jack plugging into a neural port.

**Synthesis** — Three FM-synthesized tones in rapid ascending sequence. Each step uses a sine carrier (660, 990, 1320 Hz) with a sine modulator at a different mod ratio per step (1.5×, 2.0×, 3.0×) and increasing mod index (1.0, 1.5, 2.0), so each blip has a distinct timbre — the sequence grows harmonically richer as it ascends. Each step is 25 ms with 15 ms spacing, total ~80 ms. Each FM carrier feeds a resonant bandpass (Q 8) tuned to 1.5× the carrier freq. Gain 0.18 per step, exponential decay to 0.001 within the step duration. No noise layer — pure FM arpeggiation.

---

### 11. TAB_CLOSE

| | |
|---|---|
| **Duration** | 90 ms |
| **Base Freq** | 1320 Hz |
| **Variants** | 1 |

**Concept** — A data-stream severed — the jack unplugging. Inverse of TAB_INSERT.

**Synthesis** — Descending ring-mod cascade: three steps, each using a square carrier (1800, 1200, 660 Hz) ring-modulated by a sine at a non-integer frequency (2100, 1500, 900 Hz). The ring-mod topology (carrier→gain node, modulator→gain.gain) produces inharmonic sum/difference partials per step. Each step is 20 ms, spaced 12 ms apart. Output per step through a bandpass (Q 6) tuned to the carrier frequency. Gain 0.16, exponential decay to 0.001 within each step. A sub-bass thud (sine 80 Hz, gain 0.12, 40 ms decay) enters at 40 ms to anchor the collapse. The alien metallic rattle comes entirely from ring-mod partials — no FM, no noise.

---

### 12. TAB_SLASH

| | |
|---|---|
| **Duration** | 160 ms |
| **Base Freq** | 1760 Hz |
| **Variants** | 1 |

**Concept** — The command line activating — a Netrunner's HUD responding to a voice prompt.

**Synthesis** — Ring-mod bell. A triangle carrier at 1760 Hz (odd-harmonic foundation) is ring-modulated by a sine at 2640 Hz (ratio 1.5 — a fifth relationship), producing bell-like inharmonic partials at sum (4400 Hz) and difference (880 Hz) frequencies. The ring-mod output feeds a peaking filter (3.5 kHz, Q 12, +6 dB) that resonates in the upper partials, creating a sustained metallic shimmer. Gain envelope: sub-2ms linear attack to 0.22, exponential decay to 0.001 over 160 ms. No LFO, no noise — the bell character comes entirely from ring-mod partials and high-Q peaking resonance.

---

## Keyboard Sounds

### 13. TYPING_LETTER

| | |
|---|---|
| **Duration** | 25 ms |
| **Base Freq** | 1800 Hz |
| **Variants** | 19 |

**Concept** — Holo-keyboard key-press — each stroke taps a projected light key floating above a desk. Needs to feel physical despite being virtual.

**Synthesis** — FM micro-percussion with 19 timbral variants. Each variant selects a unique irrational mod ratio from a pool (1.41, 1.73, 2.23, 2.65, 3.14, etc. — avoiding integer ratios to prevent repetition) and a base frequency (1200–2640 Hz in 80 Hz steps). A square-wave modulator at `baseFreq × modRatio` drives the frequency of a sine carrier at `baseFreq`, with initial mod depth of `baseFreq × 0.8` decaying exponentially to 10 in 12 ms. The rapid FM depth collapse creates a percussive transient whose timbre varies per variant. Output through a highshelf (4 kHz, +3 dB) for click presence. Gain 0.12, exponential decay to 0.001 in 18 ms. No noise — all character from FM.

---

### 14. TYPING_BACKSPACE

| | |
|---|---|
| **Duration** | 30 ms |
| **Base Freq** | 600 Hz |
| **Variants** | 1 |

**Concept** — Deletion — erasing a character from the holo-display. Slightly lower-pitched and softer than TYPING_LETTER to convey 'removal' rather than 'creation'.

**Synthesis** — Reverse FM: the modulation index starts at maximum and collapses to zero, so harmonics "suck inward" and simplify — the opposite of a typical FM attack. A square-wave modulator at 1.8 kHz drives a sine carrier (800→500 Hz descending) with mod depth starting at 2000 and decaying exponentially to 5 in 25 ms — a harmonic implosion. Output through a lowpass filter (4 kHz, Q 6) to contain the initial burst. Gain 0.15, exponential decay to 0.001 in 28 ms. The sound feels like data retracting because the spectral content narrows rather than expands.

---

### 15. TYPING_ENTER

| | |
|---|---|
| **Duration** | 80 ms |
| **Base Freq** | 500 Hz |
| **Variants** | 1 |

**Concept** — Command confirmed — the 'execute' key. Heavier and more resonant than any letter key.

**Synthesis** — Full DNA showcase in miniature — three simultaneous layers. (a) Hard square impulse: square at 600 Hz, gain 0.22, exponential decay in 2 ms — sub-2ms chrome snap. (b) Ring-mod transient: square carrier (1.4 kHz) through a gain node modulated by sine (1.85 kHz), producing inharmonic metallic partials. Output through a resonant bandpass (2.2 kHz, Q 8), gain 0.16, exponential decay in 25 ms. (c) FM body: sawtooth modulator at 250 Hz driving a square carrier (500→300 Hz descending) with mod depth 500→30, through a lowpass (2 kHz, Q 6). Gain 0.18, exponential decay over 70 ms. Plus a sub-bass sine at 65 Hz (gain 0.20, 40 ms decay). The heaviest keyboard sound — layered FM + ring mod + impulse.

---

### 16. TYPING_SPACE

| | |
|---|---|
| **Duration** | 30 ms |
| **Base Freq** | 350 Hz |
| **Variants** | 1 |

**Concept** — The space-bar — the widest key, producing a broader, more hollow sound than a letter key.

**Synthesis** — FM with very low modulation index for a gentle, breathy tone. A sine modulator at 500 Hz drives a sine carrier at 800 Hz with mod depth 200→10 (mod index ~0.4, decaying exponentially in 20 ms). The low mod index produces only first-order sidebands (300 Hz, 1300 Hz) that decay quickly to a near-pure sine. Output through a lowpass filter (3 kHz, Q 1) — no harshness. Gain 0.10, exponential decay to 0.001 in 25 ms. The softest sound in the palette — sine-on-sine FM creates a mellow puff without the aggression of square or sawtooth modulators.

---

## Application Sounds

### 17. APP_START

| | |
|---|---|
| **Duration** | 1200 ms |
| **Base Freq** | 165 Hz |
| **Variants** | 1 |

**Concept** — Ghost frequency awakening — something stirs in the dark network. A deep drone emerges from silence, its filter slowly opening like an eye, joined after a beat by a perfect fifth that floats above like a signal from an unknown source. A slow tremolo breathes life into the tone. Dark, low-passed noise and deep sub-bass fill the space below. The feeling: waking up inside a machine that already knows you're there.

**Synthesis** — Five-layer showcase of all DNA techniques. (1) FM drone: square modulator at 165 Hz drives a sawtooth carrier at 165 Hz. Mod depth rises from 50 (index ~0.3) to 660 (index ~4) over 700 ms then decays to 30 by 1.2 s — the drone starts near-pure and grows increasingly rich and harsh. Output through a resonant bandpass (Q 6) sweeping 300→1800→300 Hz. Gain: 300 ms fade-in to 0.16, held, exponential decay to 1.2 s. (2) Ring-mod harmonics: enters at 300 ms — sine carrier at 248 Hz (perfect fifth) through a gain node modulated by sine (370→520→200 Hz). Highshelf boost (+4 dB at 2 kHz) for presence. Gain fades in to 0.08 by 600 ms, decays to 1.2 s. (3) Waveshaped distortion: enters at 400 ms — sawtooth at 330 Hz through a WaveShaperNode (drive 12, 2x oversampling, soft-clip curve), then bandpass (2.4 kHz, Q 4). Gain peaks at 0.06 by 600 ms, decays by 1.1 s. (4) Hard square sub-pulse: square at 55 Hz, gain 0.18, exponential decay in 3 ms — sub-3ms ignition impulse. Plus a sustained sub-bass sine at 55 Hz fading in to 0.10 over 250 ms, decaying by 800 ms. (5) LFO tremolo: sine at 2.5 Hz modulates the drone gain by ±0.04 for breathing feel throughout.
