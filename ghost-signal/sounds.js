// ═══════════════════════════════════════════════════════════════════
// GHOST SIGNAL — sounds.js
// Cyberpunk-noir audio theme — ES module
// ═══════════════════════════════════════════════════════════════════

const meta = {
  name: 'Ghost Signal',
  subtitle: 'Cyberpunk-noir audio theme \u2014 Web Audio API synthesis',
  colors: {
    accent:   '#FCEE0A',
    accent2:  '#00F0FF',
    danger:   '#FF2D6B',
    bg:       '#0A0A0C',
    surface:  '#111116',
    surface2: '#1A1A22',
    border:   '#2A2A35',
    text:     '#E0E0E8',
    textDim:  '#6A6A78',
  },
  placeholder: 'Start typing to hear holo-keyboard sounds...',
  sounds: {
    HOVER:            { label: 'Hover',          meta: '60 ms / 2 kHz / sine sweep',       desc: 'Ghost-light proximity scan' },
    HOVER_UP:         { label: 'Hover Up',       meta: '50 ms / 3 kHz / sine sweep',       desc: 'Scanner retracting' },
    CLICK:            { label: 'Click',           meta: '35 ms / 800 Hz / square pop',      desc: 'Chrome relay snap' },
    IMPORTANT_CLICK:  { label: 'Important Click', meta: '120 ms / 440 Hz / triangle body',  desc: 'System override confirm' },
    FEATURE_SWITCH_ON:{ label: 'Feature Switch',  meta: 'ON 250 ms / OFF 220 ms \u2014 implant power cycle', desc: '' },
    LIMITER_ON:       { label: 'Limiter',         meta: 'ON 200 ms / OFF 200 ms \u2014 pressure clamp',      desc: '' },
    SWITCH_TOGGLE:    { label: 'Switch Toggle',   meta: '40 ms \u2014 micro-switch flip',                    desc: '' },
    TAB_INSERT:       { label: 'Tab Insert',      meta: '100 ms / 3 ascending blips',       desc: 'Data stream open' },
    TAB_CLOSE:        { label: 'Tab Close',       meta: '90 ms / 3 descending blips',       desc: 'Data stream severed' },
    TAB_SLASH:        { label: 'Tab Slash',       meta: '160 ms / 1760 Hz / triangle ping', desc: 'Command line activate' },
    TYPING_LETTER:    { label: 'Typing Letter',   meta: '25 ms / 19 variants',              desc: 'Holo-key tap' },
    TYPING_BACKSPACE: { label: 'Typing Backspace', meta: '30 ms / square pulse',            desc: 'Data retract' },
    TYPING_ENTER:     { label: 'Typing Enter',    meta: '80 ms / saw + sub',                desc: 'Command submit' },
    TYPING_SPACE:     { label: 'Typing Space',    meta: '30 ms / noise puff',               desc: 'Buffer advance' },
    APP_START:        { label: 'App Start',       meta: '1.2 s / drone + fifth',            desc: 'Ghost frequency awakening' },
  },
};

// ═══════════════════════════════════════════════════════════════════
// SONIC DNA — Ghost Signal
// ═══════════════════════════════════════════════════════════════════
//
// 1. PRIMARY WAVEFORM: FM-modulated square/sawtooth — oscillator-
//    modulating-oscillator for complex harmonics. Carrier waveforms
//    are square or sawtooth; modulator shapes the timbre dynamically.
//
// 2. SIGNATURE EFFECT: Ring modulation — carrier × modulator via
//    gain node modulation for metallic, alien, inharmonic timbres.
//    The Web Audio ring mod pattern: modulator → gain.gain, carrier
//    → gain → output (AM with no DC offset = ring mod).
//
// 3. TRANSIENT CHARACTER: Hard square-wave impulse, sub-3ms —
//    violent onset created by a square oscillator at full gain
//    decaying to silence in under 3 milliseconds. Chrome snapping.
//
// 4. ENVELOPE PHILOSOPHY: Sharp attack, resonant ring-out — the
//    initial hit lingers with high-Q bandpass or peaking filter
//    resonance, creating a singing metallic tail.
//
// 5. FREQUENCY WORLD: Mid-highs (1–5 kHz) with harsh resonant
//    peaks — aggressive bandpass and highshelf boosts in the
//    presence range. No smooth warmth, only chrome and neon.
// ═══════════════════════════════════════════════════════════════════

function createSounds(ctx, noiseBuffer) {
  const sounds = {};

  // ---------------------------------------------------------------
  // 1. HOVER — FM-modulated sweep, 60 ms
  //    Sine carrier modulated by square LFO creating complex
  //    sidebands that sweep upward. Resonant bandpass ring-out.
  //    DNA: FM modulation, resonant ring-out
  // ---------------------------------------------------------------
  sounds.HOVER = function() {
    const now = ctx.currentTime;
    const dur = 0.06;

    // FM modulator — square wave for harsh sideband character
    const mod = ctx.createOscillator();
    mod.type = 'square';
    mod.frequency.setValueAtTime(400, now);
    mod.frequency.linearRampToValueAtTime(640, now + dur);
    const modGain = ctx.createGain();
    modGain.gain.setValueAtTime(200, now);
    modGain.gain.linearRampToValueAtTime(500, now + dur);

    // FM carrier — sine with modulated frequency
    const carrier = ctx.createOscillator();
    carrier.type = 'sine';
    carrier.frequency.setValueAtTime(2000, now);
    carrier.frequency.linearRampToValueAtTime(3200, now + dur);

    // FM connection: mod → modGain → carrier.frequency
    mod.connect(modGain).connect(carrier.frequency);

    // Resonant bandpass for metallic ring-out
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.setValueAtTime(2400, now);
    bp.frequency.linearRampToValueAtTime(3600, now + dur);
    bp.Q.value = 12;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.10, now + 0.004);
    gain.gain.linearRampToValueAtTime(0, now + dur);

    carrier.connect(bp).connect(gain).connect(ctx.destination);

    mod.start(now); mod.stop(now + dur);
    carrier.start(now); carrier.stop(now + dur);
  };

  // ---------------------------------------------------------------
  // 2. HOVER_UP — ring-mod ghost, 50 ms
  //    Brief ring-modulated tone creating inharmonic partials on
  //    exit. Carrier and modulator at non-integer ratio.
  //    DNA: Ring modulation, resonant ring-out
  // ---------------------------------------------------------------
  sounds.HOVER_UP = function() {
    const now = ctx.currentTime;
    const dur = 0.05;

    // Ring mod carrier
    const carrier = ctx.createOscillator();
    carrier.type = 'sine';
    carrier.frequency.setValueAtTime(3000, now);
    carrier.frequency.linearRampToValueAtTime(1800, now + dur);

    // Ring mod modulator — non-integer ratio for inharmonic partials
    const ringMod = ctx.createOscillator();
    ringMod.type = 'sine';
    ringMod.frequency.setValueAtTime(1170, now);
    ringMod.frequency.linearRampToValueAtTime(700, now + dur);

    // Ring mod topology: carrier → ringGain, modulator → ringGain.gain
    const ringGain = ctx.createGain();
    ringGain.gain.value = 0;
    ringMod.connect(ringGain.gain);

    // Highshelf boost for harsh presence
    const hs = ctx.createBiquadFilter();
    hs.type = 'highshelf';
    hs.frequency.value = 2500;
    hs.gain.value = 6;

    const out = ctx.createGain();
    out.gain.setValueAtTime(0, now);
    out.gain.linearRampToValueAtTime(0.12, now + 0.003);
    out.gain.exponentialRampToValueAtTime(0.001, now + dur);

    carrier.connect(ringGain).connect(hs).connect(out).connect(ctx.destination);

    carrier.start(now); carrier.stop(now + dur + 0.01);
    ringMod.start(now); ringMod.stop(now + dur + 0.01);
  };

  // ---------------------------------------------------------------
  // 3. CLICK — square impulse + ring-mod transient, 35 ms
  //    Sub-2ms square pop through a ring modulator for metallic
  //    character. Hard onset, resonant bandpass tail.
  //    DNA: Hard square impulse, ring modulation, resonant ring-out
  // ---------------------------------------------------------------
  sounds.CLICK = function() {
    const now = ctx.currentTime;

    // Hard square impulse — sub-2ms chrome snap
    const impulse = ctx.createOscillator();
    impulse.type = 'square';
    impulse.frequency.value = 800;
    const impG = ctx.createGain();
    impG.gain.setValueAtTime(0.25, now);
    impG.gain.exponentialRampToValueAtTime(0.001, now + 0.002);
    impulse.connect(impG).connect(ctx.destination);
    impulse.start(now); impulse.stop(now + 0.004);

    // Ring-mod metallic transient
    const carrier = ctx.createOscillator();
    carrier.type = 'square';
    carrier.frequency.value = 1800;
    const ringMod = ctx.createOscillator();
    ringMod.type = 'sine';
    ringMod.frequency.value = 2300;

    const ringGain = ctx.createGain();
    ringGain.gain.value = 0;
    ringMod.connect(ringGain.gain);

    // Resonant bandpass for singing metallic tail
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 2800;
    bp.Q.value = 15;

    const out = ctx.createGain();
    out.gain.setValueAtTime(0.18, now);
    out.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

    carrier.connect(ringGain).connect(bp).connect(out).connect(ctx.destination);

    carrier.start(now); carrier.stop(now + 0.035);
    ringMod.start(now); ringMod.stop(now + 0.035);
  };

  // ---------------------------------------------------------------
  // 4. IMPORTANT_CLICK — FM bass hit, 120 ms
  //    FM synthesis with mod index > 2 for complex bass tone.
  //    Square carrier, sawtooth modulator. Sub-bass layer.
  //    DNA: FM modulation (high mod index), hard square impulse
  // ---------------------------------------------------------------
  sounds.IMPORTANT_CLICK = function() {
    const now = ctx.currentTime;

    // Hard square impulse transient — sub-2ms
    const pop = ctx.createOscillator();
    pop.type = 'square';
    pop.frequency.value = 900;
    const popG = ctx.createGain();
    popG.gain.setValueAtTime(0.22, now);
    popG.gain.exponentialRampToValueAtTime(0.001, now + 0.002);
    pop.connect(popG).connect(ctx.destination);
    pop.start(now); pop.stop(now + 0.004);

    // FM body — high mod index for harmonic richness
    const fmMod = ctx.createOscillator();
    fmMod.type = 'sawtooth';
    fmMod.frequency.value = 220;
    const fmDepth = ctx.createGain();
    // Mod index ~3 (depth / mod freq = 660 / 220 = 3)
    fmDepth.gain.setValueAtTime(660, now);
    fmDepth.gain.exponentialRampToValueAtTime(80, now + 0.12);

    const fmCarrier = ctx.createOscillator();
    fmCarrier.type = 'square';
    fmCarrier.frequency.value = 440;

    fmMod.connect(fmDepth).connect(fmCarrier.frequency);

    // Peaking filter for resonant mid presence
    const peak = ctx.createBiquadFilter();
    peak.type = 'peaking';
    peak.frequency.value = 1200;
    peak.Q.value = 4;
    peak.gain.value = 8;

    const bodyG = ctx.createGain();
    bodyG.gain.setValueAtTime(0, now);
    bodyG.gain.linearRampToValueAtTime(0.25, now + 0.002);
    bodyG.gain.setValueAtTime(0.25, now + 0.04);
    bodyG.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    fmCarrier.connect(peak).connect(bodyG).connect(ctx.destination);

    fmMod.start(now); fmMod.stop(now + 0.13);
    fmCarrier.start(now); fmCarrier.stop(now + 0.13);

    // Sub-bass foundation
    const sub = ctx.createOscillator();
    sub.type = 'sine';
    sub.frequency.value = 55;
    const sG = ctx.createGain();
    sG.gain.setValueAtTime(0.18, now);
    sG.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
    sub.connect(sG).connect(ctx.destination);
    sub.start(now); sub.stop(now + 0.07);
  };

  // ---------------------------------------------------------------
  // 5. FEATURE_SWITCH_ON — ascending FM sweep, mod depth rising, 250 ms
  //    Modulation index increases from 0 to 4, making the tone
  //    increasingly complex/harsh as it ascends.
  //    DNA: FM modulation (rising mod index), resonant ring-out
  // ---------------------------------------------------------------
  sounds.FEATURE_SWITCH_ON = function() {
    const now = ctx.currentTime;

    // FM modulator — ascending
    const fmMod = ctx.createOscillator();
    fmMod.type = 'square';
    fmMod.frequency.setValueAtTime(110, now);
    fmMod.frequency.exponentialRampToValueAtTime(440, now + 0.22);

    // Mod depth rises from near-zero to high — increasing complexity
    const fmDepth = ctx.createGain();
    fmDepth.gain.setValueAtTime(10, now);
    fmDepth.gain.linearRampToValueAtTime(1200, now + 0.22);

    // FM carrier — ascending
    const fmCarrier = ctx.createOscillator();
    fmCarrier.type = 'sawtooth';
    fmCarrier.frequency.setValueAtTime(220, now);
    fmCarrier.frequency.exponentialRampToValueAtTime(880, now + 0.22);

    fmMod.connect(fmDepth).connect(fmCarrier.frequency);

    // Resonant bandpass — sweeps up with carrier
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.Q.value = 8;
    bp.frequency.setValueAtTime(400, now);
    bp.frequency.exponentialRampToValueAtTime(3200, now + 0.22);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.20, now + 0.04);
    gain.gain.setValueAtTime(0.20, now + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    fmCarrier.connect(bp).connect(gain).connect(ctx.destination);

    fmMod.start(now); fmMod.stop(now + 0.26);
    fmCarrier.start(now); fmCarrier.stop(now + 0.26);
  };

  // ---------------------------------------------------------------
  // 6. FEATURE_SWITCH_OFF — descending FM with ring-mod decay, 220 ms
  //    Descending FM tone where a ring mod carrier creates a
  //    metallic tail as the sound dies.
  //    DNA: FM modulation, ring modulation, resonant ring-out
  // ---------------------------------------------------------------
  sounds.FEATURE_SWITCH_OFF = function() {
    const now = ctx.currentTime;

    // FM modulator — descending
    const fmMod = ctx.createOscillator();
    fmMod.type = 'square';
    fmMod.frequency.setValueAtTime(440, now);
    fmMod.frequency.exponentialRampToValueAtTime(80, now + 0.20);

    const fmDepth = ctx.createGain();
    fmDepth.gain.setValueAtTime(800, now);
    fmDepth.gain.exponentialRampToValueAtTime(40, now + 0.20);

    // FM carrier — descending
    const fmCarrier = ctx.createOscillator();
    fmCarrier.type = 'sawtooth';
    fmCarrier.frequency.setValueAtTime(880, now);
    fmCarrier.frequency.exponentialRampToValueAtTime(160, now + 0.20);

    fmMod.connect(fmDepth).connect(fmCarrier.frequency);

    const fmG = ctx.createGain();
    fmG.gain.setValueAtTime(0.20, now);
    fmG.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    fmCarrier.connect(fmG).connect(ctx.destination);

    // Ring-mod metallic tail — enters mid-decay
    const ringCarrier = ctx.createOscillator();
    ringCarrier.type = 'sine';
    ringCarrier.frequency.setValueAtTime(1600, now + 0.08);
    ringCarrier.frequency.exponentialRampToValueAtTime(400, now + 0.22);

    const ringModulator = ctx.createOscillator();
    ringModulator.type = 'sine';
    ringModulator.frequency.value = 370;

    const ringNode = ctx.createGain();
    ringNode.gain.value = 0;
    ringModulator.connect(ringNode.gain);

    const ringBp = ctx.createBiquadFilter();
    ringBp.type = 'bandpass';
    ringBp.frequency.value = 1200;
    ringBp.Q.value = 10;

    const ringOut = ctx.createGain();
    ringOut.gain.setValueAtTime(0, now);
    ringOut.gain.linearRampToValueAtTime(0.12, now + 0.10);
    ringOut.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    ringCarrier.connect(ringNode).connect(ringBp).connect(ringOut).connect(ctx.destination);

    fmMod.start(now); fmMod.stop(now + 0.23);
    fmCarrier.start(now); fmCarrier.stop(now + 0.23);
    ringCarrier.start(now + 0.08); ringCarrier.stop(now + 0.23);
    ringModulator.start(now + 0.08); ringModulator.stop(now + 0.23);
  };

  // ---------------------------------------------------------------
  // 7. LIMITER_ON — waveshaped compression, ascending, 200 ms
  //    WaveShaperNode creates a "squeezed" distorted ascending tone.
  //    Square carrier through waveshaper for crushed harmonics.
  //    DNA: Hard square impulse, waveshaping distortion
  // ---------------------------------------------------------------
  sounds.LIMITER_ON = function() {
    const now = ctx.currentTime;

    // Hard square impulse onset
    const impulse = ctx.createOscillator();
    impulse.type = 'square';
    impulse.frequency.value = 1500;
    const impG = ctx.createGain();
    impG.gain.setValueAtTime(0.20, now);
    impG.gain.exponentialRampToValueAtTime(0.001, now + 0.003);
    impulse.connect(impG).connect(ctx.destination);
    impulse.start(now); impulse.stop(now + 0.005);

    // Ascending sawtooth through waveshaper
    const osc = ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(300, now + 0.01);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.18);

    // Waveshaper — soft clip with drive
    const shaper = ctx.createWaveShaper();
    const amount = 8;
    const curve = new Float32Array(256);
    for (let i = 0; i < 256; i++) {
      const x = (i / 128) - 1;
      curve[i] = (Math.PI + amount) * x / (Math.PI + amount * Math.abs(x));
    }
    shaper.curve = curve;
    shaper.oversample = '2x';

    // Resonant bandpass — squeezed presence
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.Q.value = 10;
    bp.frequency.setValueAtTime(600, now + 0.01);
    bp.frequency.exponentialRampToValueAtTime(2400, now + 0.18);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.16, now + 0.03);
    gain.gain.setValueAtTime(0.16, now + 0.14);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.20);

    osc.connect(shaper).connect(bp).connect(gain).connect(ctx.destination);

    osc.start(now + 0.01); osc.stop(now + 0.21);
  };

  // ---------------------------------------------------------------
  // 8. LIMITER_OFF — ring-mod burst release, 200 ms
  //    Explosive ring-mod burst that rapidly demodulates to a
  //    clean tone. Starts harsh, ends pure.
  //    DNA: Ring modulation, resonant ring-out
  // ---------------------------------------------------------------
  sounds.LIMITER_OFF = function() {
    const now = ctx.currentTime;

    // Ring-mod carrier — starts high, descends
    const carrier = ctx.createOscillator();
    carrier.type = 'sawtooth';
    carrier.frequency.setValueAtTime(2000, now);
    carrier.frequency.exponentialRampToValueAtTime(400, now + 0.18);

    // Ring-mod modulator — fades out to demodulate
    const ringMod = ctx.createOscillator();
    ringMod.type = 'sine';
    ringMod.frequency.setValueAtTime(1800, now);
    ringMod.frequency.exponentialRampToValueAtTime(200, now + 0.15);

    // Ring-mod node — modulator drives gain amount
    const ringNode = ctx.createGain();
    ringNode.gain.value = 0;
    ringMod.connect(ringNode.gain);

    // Clean bypass — fades in as ring mod fades out
    const cleanG = ctx.createGain();
    cleanG.gain.setValueAtTime(0, now);
    cleanG.gain.linearRampToValueAtTime(0.12, now + 0.12);
    cleanG.gain.exponentialRampToValueAtTime(0.001, now + 0.20);

    // Ring-mod output — starts loud, fades
    const ringOut = ctx.createGain();
    ringOut.gain.setValueAtTime(0.22, now);
    ringOut.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
    ringOut.gain.exponentialRampToValueAtTime(0.001, now + 0.20);

    // Highpass to remove mud
    const hp = ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = 200;
    hp.Q.value = 2;

    carrier.connect(ringNode).connect(hp).connect(ringOut).connect(ctx.destination);
    carrier.connect(cleanG).connect(ctx.destination);

    carrier.start(now); carrier.stop(now + 0.21);
    ringMod.start(now); ringMod.stop(now + 0.21);
  };

  // ---------------------------------------------------------------
  // 9. SWITCH_TOGGLE — FM click, 40 ms
  //    Ultra-short FM percussion — 808-style FM click with square
  //    modulator for aggressive attack character.
  //    DNA: FM modulation, hard square impulse
  // ---------------------------------------------------------------
  sounds.SWITCH_TOGGLE = function() {
    const now = ctx.currentTime;

    // FM modulator — fast pitch sweep for click character
    const fmMod = ctx.createOscillator();
    fmMod.type = 'square';
    fmMod.frequency.setValueAtTime(4000, now);
    fmMod.frequency.exponentialRampToValueAtTime(200, now + 0.008);

    const fmDepth = ctx.createGain();
    fmDepth.gain.setValueAtTime(3000, now);
    fmDepth.gain.exponentialRampToValueAtTime(10, now + 0.006);

    // FM carrier — snaps from high to settle
    const fmCarrier = ctx.createOscillator();
    fmCarrier.type = 'sine';
    fmCarrier.frequency.setValueAtTime(1200, now);
    fmCarrier.frequency.exponentialRampToValueAtTime(600, now + 0.01);

    fmMod.connect(fmDepth).connect(fmCarrier.frequency);

    // Highshelf for presence bite
    const hs = ctx.createBiquadFilter();
    hs.type = 'highshelf';
    hs.frequency.value = 3000;
    hs.gain.value = 4;

    const out = ctx.createGain();
    out.gain.setValueAtTime(0.22, now);
    out.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

    fmCarrier.connect(hs).connect(out).connect(ctx.destination);

    fmMod.start(now); fmMod.stop(now + 0.04);
    fmCarrier.start(now); fmCarrier.stop(now + 0.04);
  };

  // ---------------------------------------------------------------
  // 10. TAB_INSERT — ascending FM arpeggiation, 100 ms
  //     Three FM-synthesized tones with different mod ratios per
  //     step — increasing harmonic complexity on ascent.
  //     DNA: FM modulation, resonant ring-out
  // ---------------------------------------------------------------
  sounds.TAB_INSERT = function() {
    const now = ctx.currentTime;
    // Carrier freqs ascending; mod ratios create different timbres
    const steps = [
      { freq: 660, modRatio: 1.5, modIdx: 1.0 },
      { freq: 990, modRatio: 2.0, modIdx: 1.5 },
      { freq: 1320, modRatio: 3.0, modIdx: 2.0 },
    ];

    steps.forEach((step, i) => {
      const t = now + i * 0.015;
      const stepDur = 0.025;

      // FM modulator per step — different ratio = different timbre
      const fmMod = ctx.createOscillator();
      fmMod.type = 'sine';
      fmMod.frequency.value = step.freq * step.modRatio;
      const fmDepth = ctx.createGain();
      fmDepth.gain.value = step.freq * step.modIdx;

      const fmCarrier = ctx.createOscillator();
      fmCarrier.type = 'sine';
      fmCarrier.frequency.value = step.freq;

      fmMod.connect(fmDepth).connect(fmCarrier.frequency);

      // Resonant peak per blip
      const bp = ctx.createBiquadFilter();
      bp.type = 'bandpass';
      bp.frequency.value = step.freq * 1.5;
      bp.Q.value = 8;

      const g = ctx.createGain();
      g.gain.setValueAtTime(0.18, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + stepDur);

      fmCarrier.connect(bp).connect(g).connect(ctx.destination);

      fmMod.start(t); fmMod.stop(t + stepDur + 0.005);
      fmCarrier.start(t); fmCarrier.stop(t + stepDur + 0.005);
    });
  };

  // ---------------------------------------------------------------
  // 11. TAB_CLOSE — descending ring-mod cascade, 90 ms
  //     Each step uses ring mod with decreasing carrier freq.
  //     Creates an alien descending metallic rattle.
  //     DNA: Ring modulation, resonant ring-out
  // ---------------------------------------------------------------
  sounds.TAB_CLOSE = function() {
    const now = ctx.currentTime;
    const steps = [
      { carrier: 1800, ring: 2100 },
      { carrier: 1200, ring: 1500 },
      { carrier: 660,  ring: 900 },
    ];

    steps.forEach((step, i) => {
      const t = now + i * 0.012;
      const stepDur = 0.02;

      const carrier = ctx.createOscillator();
      carrier.type = 'square';
      carrier.frequency.value = step.carrier;

      const ringMod = ctx.createOscillator();
      ringMod.type = 'sine';
      ringMod.frequency.value = step.ring;

      const ringNode = ctx.createGain();
      ringNode.gain.value = 0;
      ringMod.connect(ringNode.gain);

      const bp = ctx.createBiquadFilter();
      bp.type = 'bandpass';
      bp.frequency.value = step.carrier;
      bp.Q.value = 6;

      const g = ctx.createGain();
      g.gain.setValueAtTime(0.16, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + stepDur);

      carrier.connect(ringNode).connect(bp).connect(g).connect(ctx.destination);

      carrier.start(t); carrier.stop(t + stepDur + 0.005);
      ringMod.start(t); ringMod.stop(t + stepDur + 0.005);
    });

    // Sub thud at end
    const thud = ctx.createOscillator();
    thud.type = 'sine';
    thud.frequency.value = 80;
    const tG = ctx.createGain();
    tG.gain.setValueAtTime(0.12, now + 0.04);
    tG.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    thud.connect(tG).connect(ctx.destination);
    thud.start(now + 0.04); thud.stop(now + 0.09);
  };

  // ---------------------------------------------------------------
  // 12. TAB_SLASH — ring-mod bell, 160 ms
  //     Triangle carrier through ring mod at non-integer ratio to
  //     create bell-like inharmonic partials. Long resonant decay.
  //     DNA: Ring modulation, resonant ring-out
  // ---------------------------------------------------------------
  sounds.TAB_SLASH = function() {
    const now = ctx.currentTime;

    // Bell carrier — triangle for odd-harmonic foundation
    const carrier = ctx.createOscillator();
    carrier.type = 'triangle';
    carrier.frequency.value = 1760;

    // Ring modulator at non-integer ratio — creates bell partials
    const ringMod = ctx.createOscillator();
    ringMod.type = 'sine';
    ringMod.frequency.value = 2640; // ratio 1.5 — fifth relationship

    const ringNode = ctx.createGain();
    ringNode.gain.value = 0;
    ringMod.connect(ringNode.gain);

    // Peaking filter for resonant bell sustain
    const peak = ctx.createBiquadFilter();
    peak.type = 'peaking';
    peak.frequency.value = 3500;
    peak.Q.value = 12;
    peak.gain.value = 6;

    const out = ctx.createGain();
    out.gain.setValueAtTime(0, now);
    out.gain.linearRampToValueAtTime(0.22, now + 0.002);
    out.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

    carrier.connect(ringNode).connect(peak).connect(out).connect(ctx.destination);

    carrier.start(now); carrier.stop(now + 0.17);
    ringMod.start(now); ringMod.stop(now + 0.17);
  };

  // ---------------------------------------------------------------
  // 13. TYPING_LETTER — FM micro-percussion, 25 ms (19 variants)
  //     Each variant uses a different FM mod ratio, creating varied
  //     metallic timbres. No noise — pure FM character.
  //     DNA: FM modulation, hard square impulse
  // ---------------------------------------------------------------
  sounds.TYPING_LETTER = function() {
    const now = ctx.currentTime;

    // 19 unique mod ratios for timbral variety
    const variant = Math.floor(Math.random() * 19);
    const modRatios = [
      1.41, 1.73, 2.23, 2.65, 3.14, 1.17, 2.82, 3.61, 1.62,
      2.41, 3.87, 1.33, 2.09, 3.32, 1.88, 2.57, 3.46, 1.52, 2.73
    ];
    const baseFreq = 1200 + variant * 80;
    const modRatio = modRatios[variant];

    // FM modulator — unique ratio per variant
    const fmMod = ctx.createOscillator();
    fmMod.type = 'square';
    fmMod.frequency.value = baseFreq * modRatio;
    const fmDepth = ctx.createGain();
    fmDepth.gain.setValueAtTime(baseFreq * 0.8, now);
    fmDepth.gain.exponentialRampToValueAtTime(10, now + 0.012);

    // FM carrier
    const fmCarrier = ctx.createOscillator();
    fmCarrier.type = 'sine';
    fmCarrier.frequency.value = baseFreq;

    fmMod.connect(fmDepth).connect(fmCarrier.frequency);

    // Highshelf for click presence
    const hs = ctx.createBiquadFilter();
    hs.type = 'highshelf';
    hs.frequency.value = 4000;
    hs.gain.value = 3;

    const out = ctx.createGain();
    out.gain.setValueAtTime(0.12, now);
    out.gain.exponentialRampToValueAtTime(0.001, now + 0.018);

    fmCarrier.connect(hs).connect(out).connect(ctx.destination);

    fmMod.start(now); fmMod.stop(now + 0.025);
    fmCarrier.start(now); fmCarrier.stop(now + 0.025);
  };

  // ---------------------------------------------------------------
  // 14. TYPING_BACKSPACE — reverse FM, 30 ms
  //     Mod index starts high and collapses to zero — harmonics
  //     "suck in" and simplify. Feels like data retracting.
  //     DNA: FM modulation (reverse), resonant ring-out
  // ---------------------------------------------------------------
  sounds.TYPING_BACKSPACE = function() {
    const now = ctx.currentTime;

    // FM modulator — constant freq, depth decays (reverse FM)
    const fmMod = ctx.createOscillator();
    fmMod.type = 'square';
    fmMod.frequency.value = 1800;

    const fmDepth = ctx.createGain();
    // Starts at high mod index, collapses to zero — harmonic implosion
    fmDepth.gain.setValueAtTime(2000, now);
    fmDepth.gain.exponentialRampToValueAtTime(5, now + 0.025);

    // FM carrier — descends slightly as harmonics collapse
    const fmCarrier = ctx.createOscillator();
    fmCarrier.type = 'sine';
    fmCarrier.frequency.setValueAtTime(800, now);
    fmCarrier.frequency.linearRampToValueAtTime(500, now + 0.025);

    fmMod.connect(fmDepth).connect(fmCarrier.frequency);

    // Low-pass to contain the initial burst
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 4000;
    lp.Q.value = 6;

    const out = ctx.createGain();
    out.gain.setValueAtTime(0.15, now);
    out.gain.exponentialRampToValueAtTime(0.001, now + 0.028);

    fmCarrier.connect(lp).connect(out).connect(ctx.destination);

    fmMod.start(now); fmMod.stop(now + 0.03);
    fmCarrier.start(now); fmCarrier.stop(now + 0.03);
  };

  // ---------------------------------------------------------------
  // 15. TYPING_ENTER — FM + ring-mod slam, 80 ms
  //     Heaviest sound — layered FM body with ring-mod transient
  //     and sub-bass. Full DNA showcase in miniature.
  //     DNA: FM modulation, ring modulation, hard square impulse
  // ---------------------------------------------------------------
  sounds.TYPING_ENTER = function() {
    const now = ctx.currentTime;

    // Hard square impulse — sub-2ms chrome snap
    const impulse = ctx.createOscillator();
    impulse.type = 'square';
    impulse.frequency.value = 600;
    const impG = ctx.createGain();
    impG.gain.setValueAtTime(0.22, now);
    impG.gain.exponentialRampToValueAtTime(0.001, now + 0.002);
    impulse.connect(impG).connect(ctx.destination);
    impulse.start(now); impulse.stop(now + 0.004);

    // Ring-mod transient — metallic hit
    const ringCarrier = ctx.createOscillator();
    ringCarrier.type = 'square';
    ringCarrier.frequency.value = 1400;
    const ringMod = ctx.createOscillator();
    ringMod.type = 'sine';
    ringMod.frequency.value = 1850;

    const ringNode = ctx.createGain();
    ringNode.gain.value = 0;
    ringMod.connect(ringNode.gain);

    const ringBp = ctx.createBiquadFilter();
    ringBp.type = 'bandpass';
    ringBp.frequency.value = 2200;
    ringBp.Q.value = 8;

    const ringOut = ctx.createGain();
    ringOut.gain.setValueAtTime(0.16, now);
    ringOut.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

    ringCarrier.connect(ringNode).connect(ringBp).connect(ringOut).connect(ctx.destination);

    ringCarrier.start(now); ringCarrier.stop(now + 0.03);
    ringMod.start(now); ringMod.stop(now + 0.03);

    // FM body — descending with mod index decay
    const fmMod = ctx.createOscillator();
    fmMod.type = 'sawtooth';
    fmMod.frequency.value = 250;
    const fmDepth = ctx.createGain();
    fmDepth.gain.setValueAtTime(500, now);
    fmDepth.gain.exponentialRampToValueAtTime(30, now + 0.07);

    const fmCarrier = ctx.createOscillator();
    fmCarrier.type = 'square';
    fmCarrier.frequency.setValueAtTime(500, now);
    fmCarrier.frequency.exponentialRampToValueAtTime(300, now + 0.06);

    fmMod.connect(fmDepth).connect(fmCarrier.frequency);

    const bodyLp = ctx.createBiquadFilter();
    bodyLp.type = 'lowpass';
    bodyLp.frequency.value = 2000;
    bodyLp.Q.value = 6;

    const bodyG = ctx.createGain();
    bodyG.gain.setValueAtTime(0.18, now);
    bodyG.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

    fmCarrier.connect(bodyLp).connect(bodyG).connect(ctx.destination);

    fmMod.start(now); fmMod.stop(now + 0.08);
    fmCarrier.start(now); fmCarrier.stop(now + 0.08);

    // Sub-bass
    const sub = ctx.createOscillator();
    sub.type = 'sine';
    sub.frequency.value = 65;
    const sG = ctx.createGain();
    sG.gain.setValueAtTime(0.20, now);
    sG.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
    sub.connect(sG).connect(ctx.destination);
    sub.start(now); sub.stop(now + 0.05);
  };

  // ---------------------------------------------------------------
  // 16. TYPING_SPACE — soft FM puff, 30 ms
  //     FM with very low mod index for slightly complex but gentle
  //     tone. Sine carrier, sine mod — soft and breathy.
  //     DNA: FM modulation (low mod index)
  // ---------------------------------------------------------------
  sounds.TYPING_SPACE = function() {
    const now = ctx.currentTime;

    // FM modulator — low mod index for gentle complexity
    const fmMod = ctx.createOscillator();
    fmMod.type = 'sine';
    fmMod.frequency.value = 500;
    const fmDepth = ctx.createGain();
    // Low mod index ~0.4 (depth / mod freq = 200 / 500 = 0.4)
    fmDepth.gain.setValueAtTime(200, now);
    fmDepth.gain.exponentialRampToValueAtTime(10, now + 0.02);

    const fmCarrier = ctx.createOscillator();
    fmCarrier.type = 'sine';
    fmCarrier.frequency.value = 800;

    fmMod.connect(fmDepth).connect(fmCarrier.frequency);

    // Gentle lowpass — no harshness
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 3000;
    lp.Q.value = 1;

    const out = ctx.createGain();
    out.gain.setValueAtTime(0.10, now);
    out.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

    fmCarrier.connect(lp).connect(out).connect(ctx.destination);

    fmMod.start(now); fmMod.stop(now + 0.03);
    fmCarrier.start(now); fmCarrier.stop(now + 0.03);
  };

  // ---------------------------------------------------------------
  // 17. APP_START — full DNA showcase, 1.2 s
  //     FM drone with slowly increasing mod index, ring-mod
  //     harmonics entering mid-way, waveshaped distortion layer,
  //     hard square sub-pulse. All five DNA techniques.
  //     DNA: FM modulation, ring modulation, waveshaping,
  //          hard square impulse, resonant ring-out
  // ---------------------------------------------------------------
  sounds.APP_START = function() {
    const now = ctx.currentTime;

    // === Layer 1: FM drone with rising mod index ===
    const fmMod = ctx.createOscillator();
    fmMod.type = 'square';
    fmMod.frequency.value = 165;
    const fmDepth = ctx.createGain();
    // Mod index rises from ~0.3 to ~4 over the drone's life
    fmDepth.gain.setValueAtTime(50, now);
    fmDepth.gain.linearRampToValueAtTime(660, now + 0.7);
    fmDepth.gain.exponentialRampToValueAtTime(30, now + 1.2);

    const fmCarrier = ctx.createOscillator();
    fmCarrier.type = 'sawtooth';
    fmCarrier.frequency.value = 165;

    fmMod.connect(fmDepth).connect(fmCarrier.frequency);

    // Resonant bandpass — sweeps with the growing complexity
    const droneBp = ctx.createBiquadFilter();
    droneBp.type = 'bandpass';
    droneBp.Q.value = 6;
    droneBp.frequency.setValueAtTime(300, now);
    droneBp.frequency.linearRampToValueAtTime(1800, now + 0.6);
    droneBp.frequency.exponentialRampToValueAtTime(300, now + 1.2);

    const droneG = ctx.createGain();
    droneG.gain.setValueAtTime(0, now);
    droneG.gain.linearRampToValueAtTime(0.16, now + 0.3);
    droneG.gain.setValueAtTime(0.16, now + 0.6);
    droneG.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

    fmCarrier.connect(droneBp).connect(droneG).connect(ctx.destination);

    fmMod.start(now); fmMod.stop(now + 1.25);
    fmCarrier.start(now); fmCarrier.stop(now + 1.25);

    // === Layer 2: Ring-mod harmonics — enters at 0.3s ===
    const ringCarrier = ctx.createOscillator();
    ringCarrier.type = 'sine';
    ringCarrier.frequency.value = 248; // perfect fifth above drone

    const ringModulator = ctx.createOscillator();
    ringModulator.type = 'sine';
    ringModulator.frequency.setValueAtTime(370, now + 0.3);
    ringModulator.frequency.linearRampToValueAtTime(520, now + 0.8);
    ringModulator.frequency.exponentialRampToValueAtTime(200, now + 1.2);

    const ringNode = ctx.createGain();
    ringNode.gain.value = 0;
    ringModulator.connect(ringNode.gain);

    const ringHs = ctx.createBiquadFilter();
    ringHs.type = 'highshelf';
    ringHs.frequency.value = 2000;
    ringHs.gain.value = 4;

    const ringOut = ctx.createGain();
    ringOut.gain.setValueAtTime(0, now + 0.3);
    ringOut.gain.linearRampToValueAtTime(0.08, now + 0.6);
    ringOut.gain.setValueAtTime(0.08, now + 0.8);
    ringOut.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

    ringCarrier.connect(ringNode).connect(ringHs).connect(ringOut).connect(ctx.destination);

    ringCarrier.start(now + 0.3); ringCarrier.stop(now + 1.25);
    ringModulator.start(now + 0.3); ringModulator.stop(now + 1.25);

    // === Layer 3: Waveshaped distortion — enters at 0.4s ===
    const distOsc = ctx.createOscillator();
    distOsc.type = 'sawtooth';
    distOsc.frequency.value = 330; // octave above drone

    const shaper = ctx.createWaveShaper();
    const shaperAmount = 12;
    const shaperCurve = new Float32Array(256);
    for (let i = 0; i < 256; i++) {
      const x = (i / 128) - 1;
      shaperCurve[i] = (Math.PI + shaperAmount) * x / (Math.PI + shaperAmount * Math.abs(x));
    }
    shaper.curve = shaperCurve;
    shaper.oversample = '2x';

    const distBp = ctx.createBiquadFilter();
    distBp.type = 'bandpass';
    distBp.frequency.value = 2400;
    distBp.Q.value = 4;

    const distG = ctx.createGain();
    distG.gain.setValueAtTime(0, now + 0.4);
    distG.gain.linearRampToValueAtTime(0.06, now + 0.6);
    distG.gain.setValueAtTime(0.06, now + 0.75);
    distG.gain.exponentialRampToValueAtTime(0.001, now + 1.1);

    distOsc.connect(shaper).connect(distBp).connect(distG).connect(ctx.destination);

    distOsc.start(now + 0.4); distOsc.stop(now + 1.15);

    // === Layer 4: Hard square sub-pulse — initial ignition ===
    const subPulse = ctx.createOscillator();
    subPulse.type = 'square';
    subPulse.frequency.value = 55;
    const subG = ctx.createGain();
    subG.gain.setValueAtTime(0.18, now);
    subG.gain.exponentialRampToValueAtTime(0.001, now + 0.003);
    subPulse.connect(subG).connect(ctx.destination);
    subPulse.start(now); subPulse.stop(now + 0.005);

    // Sub presence — sustained low foundation
    const sub = ctx.createOscillator();
    sub.type = 'sine';
    sub.frequency.value = 55;
    const sG = ctx.createGain();
    sG.gain.setValueAtTime(0, now);
    sG.gain.linearRampToValueAtTime(0.10, now + 0.25);
    sG.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
    sub.connect(sG).connect(ctx.destination);
    sub.start(now); sub.stop(now + 0.85);

    // === Layer 5: LFO tremolo on drone for breathing feel ===
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 2.5;
    const lfoG = ctx.createGain();
    lfoG.gain.value = 0.04;
    lfo.connect(lfoG).connect(droneG.gain);
    lfo.start(now); lfo.stop(now + 1.25);
  };

  return sounds;
}

export default { meta, createSounds };
