// ═══════════════════════════════════════════════════════════════════
// MACH LINE — sounds.js
// Stealth supersonic audio theme — ES module
// ═══════════════════════════════════════════════════════════════════

const meta = {
  name: 'Mach Line',
  subtitle: 'Stealth supersonic audio theme \u2014 Web Audio API synthesis',
  colors: {
    accent:   '#D4E4F0',
    accent2:  '#3AAFB9',
    danger:   '#C43E3A',
    bg:       '#080C12',
    surface:  '#0E1420',
    surface2: '#162030',
    border:   '#1E2E42',
    text:     '#C8D6E0',
    textDim:  '#5A6E80',
  },
  placeholder: 'Type here \u2014 classified keystrokes on carbon-fiber keys...',
  sounds: {
    HOVER:            { label: 'Hover',          meta: '50 ms / 3 kHz / sine sweep',        desc: 'Radar sweep detection' },
    HOVER_UP:         { label: 'Hover Up',       meta: '40 ms / 4.2 kHz / sine sweep',      desc: 'Radar lock releasing' },
    CLICK:            { label: 'Click',           meta: '30 ms / 600 Hz / square pop',       desc: 'Carbon-fiber relay snap' },
    IMPORTANT_CLICK:  { label: 'Important Click', meta: '140 ms / 350 Hz / triangle body',   desc: 'Weapons release authorisation' },
    FEATURE_SWITCH_ON:{ label: 'Feature Switch',  meta: 'ON 280 ms / OFF 250 ms \u2014 turbine power cycle', desc: '' },
    LIMITER_ON:       { label: 'Limiter',         meta: 'ON 220 ms / OFF 200 ms \u2014 G-force clamp',      desc: '' },
    SWITCH_TOGGLE:    { label: 'Switch Toggle',   meta: '35 ms \u2014 avionics toggle',                     desc: '' },
    TAB_INSERT:       { label: 'Tab Insert',      meta: '110 ms / 3 ascending pips',        desc: 'Radar contact acquired' },
    TAB_CLOSE:        { label: 'Tab Close',       meta: '100 ms / 3 descending pips',       desc: 'Radar contact lost' },
    TAB_SLASH:        { label: 'Tab Slash',       meta: '150 ms / 1500 Hz / triangle ping', desc: 'IFF interrogation' },
    TYPING_LETTER:    { label: 'Typing Letter',   meta: '22 ms / 16 variants',              desc: 'Carbon-fiber key cap' },
    TYPING_BACKSPACE: { label: 'Typing Backspace', meta: '28 ms / square pulse',            desc: 'Data erasure' },
    TYPING_ENTER:     { label: 'Typing Enter',    meta: '90 ms / saw + sub',                desc: 'Mission confirm' },
    TYPING_SPACE:     { label: 'Typing Space',    meta: '28 ms / noise puff',               desc: 'Pressure release' },
    APP_START:        { label: 'App Start',       meta: '1.3 s / drone + minor second',     desc: 'Stealth signal emerging' },
  },
};

// ═══════════════════════════════════════════════════════════════════
// SONIC DNA
// ═══════════════════════════════════════════════════════════════════
// 1. Primary waveform   — FM percussion (high mod-index oscillator pairs)
// 2. Signature effect    — WaveShaperNode distortion (nonlinear transfer)
// 3. Transient character — Sub-2 ms impulse, zero sustain
// 4. Envelope philosophy — Ultra-short, bone-dry (<50 ms where possible)
// 5. Frequency world     — Metallic shimmer above 4 kHz (highshelf boosts)
// ═══════════════════════════════════════════════════════════════════

function createSounds(ctx, noiseBuffer) {
  const sounds = {};

  // Shared waveshaper curve generator
  function makeDistCurve(amount) {
    const n = 256, curve = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      const x = (i * 2 / n) - 1;
      curve[i] = (Math.PI + amount) * x / (Math.PI + amount * Math.abs(x));
    }
    return curve;
  }

  // Pre-baked curves for reuse
  const distLight = makeDistCurve(8);
  const distMed = makeDistCurve(20);
  const distHeavy = makeDistCurve(50);
  const distCrush = makeDistCurve(150);

  // ---------------------------------------------------------------
  // 1. HOVER — FM micro-tick, carrier:mod 1:7, sub-2 ms, waveshaped
  // ---------------------------------------------------------------
  sounds.HOVER = function() {
    const now = ctx.currentTime;
    const carrierFreq = 3000;

    const mod = ctx.createOscillator();
    mod.type = 'sine';
    mod.frequency.value = carrierFreq * 7;
    const modGain = ctx.createGain();
    modGain.gain.value = carrierFreq * 4;
    mod.connect(modGain);

    const carrier = ctx.createOscillator();
    carrier.type = 'sine';
    carrier.frequency.value = carrierFreq;
    modGain.connect(carrier.frequency);

    const shaper = ctx.createWaveShaper();
    shaper.curve = distMed;
    shaper.oversample = '4x';

    const hs = ctx.createBiquadFilter();
    hs.type = 'highshelf';
    hs.frequency.value = 4000;
    hs.gain.value = 6;

    const g = ctx.createGain();
    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(0.12, now + 0.001);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.008);

    carrier.connect(shaper).connect(hs).connect(g).connect(ctx.destination);
    carrier.start(now);
    carrier.stop(now + 0.01);
    mod.start(now);
    mod.stop(now + 0.01);
  };

  // ---------------------------------------------------------------
  // 2. HOVER_UP — inverted FM tick, carrier:mod 1:5, shorter
  // ---------------------------------------------------------------
  sounds.HOVER_UP = function() {
    const now = ctx.currentTime;
    const carrierFreq = 4200;

    const mod = ctx.createOscillator();
    mod.type = 'sine';
    mod.frequency.value = carrierFreq * 5;
    const modGain = ctx.createGain();
    modGain.gain.value = carrierFreq * 3;
    mod.connect(modGain);

    const carrier = ctx.createOscillator();
    carrier.type = 'sine';
    carrier.frequency.value = carrierFreq;
    modGain.connect(carrier.frequency);

    const shaper = ctx.createWaveShaper();
    shaper.curve = distLight;
    shaper.oversample = '4x';

    const hp = ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = 3000;

    const g = ctx.createGain();
    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(0.10, now + 0.0008);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.006);

    carrier.connect(shaper).connect(hp).connect(g).connect(ctx.destination);
    carrier.start(now);
    carrier.stop(now + 0.008);
    mod.start(now);
    mod.stop(now + 0.008);
  };

  // ---------------------------------------------------------------
  // 3. CLICK — pure impulse, gain automation 0→1→0 in 0.5 ms,
  //    through waveshaper + highshelf
  // ---------------------------------------------------------------
  sounds.CLICK = function() {
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = 600;

    const shaper = ctx.createWaveShaper();
    shaper.curve = distHeavy;
    shaper.oversample = '4x';

    const hs = ctx.createBiquadFilter();
    hs.type = 'highshelf';
    hs.frequency.value = 5000;
    hs.gain.value = 8;

    const g = ctx.createGain();
    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(0.35, now + 0.00025);
    g.gain.linearRampToValueAtTime(0, now + 0.0005);

    osc.connect(shaper).connect(hs).connect(g).connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.002);
  };

  // ---------------------------------------------------------------
  // 4. IMPORTANT_CLICK — FM kick (mod index 8), rapid pitch drop,
  //    through waveshaper for saturated impact
  // ---------------------------------------------------------------
  sounds.IMPORTANT_CLICK = function() {
    const now = ctx.currentTime;
    const carrierFreq = 350;

    const mod = ctx.createOscillator();
    mod.type = 'sine';
    mod.frequency.setValueAtTime(carrierFreq * 2, now);
    mod.frequency.exponentialRampToValueAtTime(carrierFreq * 0.5, now + 0.04);
    const modGain = ctx.createGain();
    modGain.gain.setValueAtTime(carrierFreq * 8, now);
    modGain.gain.exponentialRampToValueAtTime(carrierFreq * 0.5, now + 0.06);
    mod.connect(modGain);

    const carrier = ctx.createOscillator();
    carrier.type = 'sine';
    carrier.frequency.setValueAtTime(carrierFreq, now);
    carrier.frequency.exponentialRampToValueAtTime(60, now + 0.05);
    modGain.connect(carrier.frequency);

    const shaper = ctx.createWaveShaper();
    shaper.curve = distHeavy;
    shaper.oversample = '4x';

    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(8000, now);
    lp.frequency.exponentialRampToValueAtTime(400, now + 0.08);
    lp.Q.value = 2;

    const g = ctx.createGain();
    g.gain.setValueAtTime(0.30, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.10);

    carrier.connect(shaper).connect(lp).connect(g).connect(ctx.destination);
    carrier.start(now);
    carrier.stop(now + 0.12);
    mod.start(now);
    mod.stop(now + 0.12);
  };

  // ---------------------------------------------------------------
  // 5. FEATURE_SWITCH_ON — FM sweep, carrier up + mod index rising,
  //    increasing metallic harmonics, waveshaped, ~150 ms
  // ---------------------------------------------------------------
  sounds.FEATURE_SWITCH_ON = function() {
    const now = ctx.currentTime;
    const dur = 0.15;

    const mod = ctx.createOscillator();
    mod.type = 'sine';
    mod.frequency.setValueAtTime(400, now);
    mod.frequency.linearRampToValueAtTime(1800, now + dur);
    const modGain = ctx.createGain();
    modGain.gain.setValueAtTime(50, now);
    modGain.gain.linearRampToValueAtTime(2000, now + dur);
    mod.connect(modGain);

    const carrier = ctx.createOscillator();
    carrier.type = 'sine';
    carrier.frequency.setValueAtTime(300, now);
    carrier.frequency.exponentialRampToValueAtTime(2400, now + dur);
    modGain.connect(carrier.frequency);

    const shaper = ctx.createWaveShaper();
    shaper.curve = distMed;
    shaper.oversample = '4x';

    const hs = ctx.createBiquadFilter();
    hs.type = 'highshelf';
    hs.frequency.value = 3000;
    hs.gain.value = 4;

    const g = ctx.createGain();
    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(0.18, now + 0.005);
    g.gain.setValueAtTime(0.18, now + dur * 0.7);
    g.gain.exponentialRampToValueAtTime(0.001, now + dur);

    carrier.connect(shaper).connect(hs).connect(g).connect(ctx.destination);
    carrier.start(now);
    carrier.stop(now + dur + 0.01);
    mod.start(now);
    mod.stop(now + dur + 0.01);
  };

  // ---------------------------------------------------------------
  // 6. FEATURE_SWITCH_OFF — FM downsweep, mod index decreasing,
  //    waveshaped, under 120 ms
  // ---------------------------------------------------------------
  sounds.FEATURE_SWITCH_OFF = function() {
    const now = ctx.currentTime;
    const dur = 0.11;

    const mod = ctx.createOscillator();
    mod.type = 'sine';
    mod.frequency.setValueAtTime(1800, now);
    mod.frequency.exponentialRampToValueAtTime(200, now + dur);
    const modGain = ctx.createGain();
    modGain.gain.setValueAtTime(2000, now);
    modGain.gain.exponentialRampToValueAtTime(20, now + dur);
    mod.connect(modGain);

    const carrier = ctx.createOscillator();
    carrier.type = 'sine';
    carrier.frequency.setValueAtTime(2400, now);
    carrier.frequency.exponentialRampToValueAtTime(200, now + dur);
    modGain.connect(carrier.frequency);

    const shaper = ctx.createWaveShaper();
    shaper.curve = distMed;
    shaper.oversample = '4x';

    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.setValueAtTime(3000, now);
    bp.frequency.exponentialRampToValueAtTime(500, now + dur);
    bp.Q.value = 1.5;

    const g = ctx.createGain();
    g.gain.setValueAtTime(0.18, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + dur);

    carrier.connect(shaper).connect(bp).connect(g).connect(ctx.destination);
    carrier.start(now);
    carrier.stop(now + dur + 0.01);
    mod.start(now);
    mod.stop(now + dur + 0.01);
  };

  // ---------------------------------------------------------------
  // 7. LIMITER_ON — waveshaped square through narrow bandpass,
  //    crushed timbral compression, 220 ms
  // ---------------------------------------------------------------
  sounds.LIMITER_ON = function() {
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    osc.type = 'square';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.linearRampToValueAtTime(600, now + 0.18);

    const shaper = ctx.createWaveShaper();
    shaper.curve = distCrush;
    shaper.oversample = '4x';

    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.setValueAtTime(800, now);
    bp.frequency.linearRampToValueAtTime(1200, now + 0.18);
    bp.Q.value = 18;

    const hs = ctx.createBiquadFilter();
    hs.type = 'highshelf';
    hs.frequency.value = 4000;
    hs.gain.value = 5;

    const g = ctx.createGain();
    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(0.14, now + 0.003);
    g.gain.setValueAtTime(0.14, now + 0.15);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    osc.connect(shaper).connect(bp).connect(hs).connect(g).connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.23);
  };

  // ---------------------------------------------------------------
  // 8. LIMITER_OFF — noise impulse through waveshaper with
  //    reducing distortion (pre-shaper gain ramp), 200 ms
  // ---------------------------------------------------------------
  sounds.LIMITER_OFF = function() {
    const now = ctx.currentTime;

    const nSrc = ctx.createBufferSource();
    nSrc.buffer = noiseBuffer(0.20);

    const preGain = ctx.createGain();
    preGain.gain.setValueAtTime(1.0, now);
    preGain.gain.exponentialRampToValueAtTime(0.05, now + 0.18);

    const shaper = ctx.createWaveShaper();
    shaper.curve = distHeavy;
    shaper.oversample = '4x';

    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.setValueAtTime(2500, now);
    bp.frequency.exponentialRampToValueAtTime(600, now + 0.18);
    bp.Q.value = 4;

    const g = ctx.createGain();
    g.gain.setValueAtTime(0.20, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.20);

    nSrc.connect(preGain).connect(shaper).connect(bp).connect(g).connect(ctx.destination);
    nSrc.start(now);
    nSrc.stop(now + 0.21);
  };

  // ---------------------------------------------------------------
  // 9. SWITCH_TOGGLE — FM pop, 1:3 ratio, 15 ms total, waveshaped
  // ---------------------------------------------------------------
  sounds.SWITCH_TOGGLE = function() {
    const now = ctx.currentTime;
    const carrierFreq = 1600;

    const mod = ctx.createOscillator();
    mod.type = 'sine';
    mod.frequency.value = carrierFreq * 3;
    const modGain = ctx.createGain();
    modGain.gain.value = carrierFreq * 5;
    mod.connect(modGain);

    const carrier = ctx.createOscillator();
    carrier.type = 'sine';
    carrier.frequency.value = carrierFreq;
    modGain.connect(carrier.frequency);

    const shaper = ctx.createWaveShaper();
    shaper.curve = distMed;
    shaper.oversample = '4x';

    const g = ctx.createGain();
    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(0.16, now + 0.001);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.012);

    carrier.connect(shaper).connect(g).connect(ctx.destination);
    carrier.start(now);
    carrier.stop(now + 0.015);
    mod.start(now);
    mod.stop(now + 0.015);
  };

  // ---------------------------------------------------------------
  // 10. TAB_INSERT — FM percussion cascade, 3 ascending FM ticks
  //     with mod ratios 1:3, 1:5, 1:7, through shared waveshaper
  // ---------------------------------------------------------------
  sounds.TAB_INSERT = function() {
    const now = ctx.currentTime;
    const freqs = [800, 1200, 1800];
    const ratios = [3, 5, 7];

    const shaper = ctx.createWaveShaper();
    shaper.curve = distMed;
    shaper.oversample = '4x';

    const hs = ctx.createBiquadFilter();
    hs.type = 'highshelf';
    hs.frequency.value = 4000;
    hs.gain.value = 5;

    const master = ctx.createGain();
    master.gain.value = 0.14;

    shaper.connect(hs).connect(master).connect(ctx.destination);

    freqs.forEach((f, i) => {
      const t = now + i * 0.015;

      const mod = ctx.createOscillator();
      mod.type = 'sine';
      mod.frequency.value = f * ratios[i];
      const mG = ctx.createGain();
      mG.gain.value = f * 4;
      mod.connect(mG);

      const car = ctx.createOscillator();
      car.type = 'sine';
      car.frequency.value = f;
      mG.connect(car.frequency);

      const g = ctx.createGain();
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(1.0, t + 0.001);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.008);

      car.connect(g).connect(shaper);
      car.start(t);
      car.stop(t + 0.01);
      mod.start(t);
      mod.stop(t + 0.01);
    });
  };

  // ---------------------------------------------------------------
  // 11. TAB_CLOSE — reverse FM cascade, 3 descending FM ticks,
  //     mod ratios decreasing, through waveshaper
  // ---------------------------------------------------------------
  sounds.TAB_CLOSE = function() {
    const now = ctx.currentTime;
    const freqs = [1800, 1200, 800];
    const ratios = [7, 5, 3];

    const shaper = ctx.createWaveShaper();
    shaper.curve = distMed;
    shaper.oversample = '4x';

    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 8000;
    lp.Q.value = 2;

    const master = ctx.createGain();
    master.gain.value = 0.14;

    shaper.connect(lp).connect(master).connect(ctx.destination);

    freqs.forEach((f, i) => {
      const t = now + i * 0.012;

      const mod = ctx.createOscillator();
      mod.type = 'sine';
      mod.frequency.value = f * ratios[i];
      const mG = ctx.createGain();
      mG.gain.value = f * 3;
      mod.connect(mG);

      const car = ctx.createOscillator();
      car.type = 'sine';
      car.frequency.value = f;
      mG.connect(car.frequency);

      const g = ctx.createGain();
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(1.0, t + 0.001);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.008);

      car.connect(g).connect(shaper);
      car.start(t);
      car.stop(t + 0.01);
      mod.start(t);
      mod.stop(t + 0.01);
    });
  };

  // ---------------------------------------------------------------
  // 12. TAB_SLASH — FM bell (ratio 1:1.4 for inharmonics),
  //     short sustain 80 ms, waveshaper + highshelf
  // ---------------------------------------------------------------
  sounds.TAB_SLASH = function() {
    const now = ctx.currentTime;
    const carrierFreq = 1500;

    const mod = ctx.createOscillator();
    mod.type = 'sine';
    mod.frequency.value = carrierFreq * 1.4;
    const modGain = ctx.createGain();
    modGain.gain.setValueAtTime(carrierFreq * 3, now);
    modGain.gain.exponentialRampToValueAtTime(carrierFreq * 0.2, now + 0.08);
    mod.connect(modGain);

    const carrier = ctx.createOscillator();
    carrier.type = 'sine';
    carrier.frequency.value = carrierFreq;
    modGain.connect(carrier.frequency);

    const shaper = ctx.createWaveShaper();
    shaper.curve = distLight;
    shaper.oversample = '4x';

    const hs = ctx.createBiquadFilter();
    hs.type = 'highshelf';
    hs.frequency.value = 4500;
    hs.gain.value = 7;

    const g = ctx.createGain();
    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(0.18, now + 0.001);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    carrier.connect(shaper).connect(hs).connect(g).connect(ctx.destination);
    carrier.start(now);
    carrier.stop(now + 0.09);
    mod.start(now);
    mod.stop(now + 0.09);
  };

  // ---------------------------------------------------------------
  // 13. TYPING_LETTER — FM micro-percussion, 16 ratio variants,
  //     each under 12 ms, through waveshaper
  // ---------------------------------------------------------------
  sounds.TYPING_LETTER = function() {
    const now = ctx.currentTime;
    const ratios = [
      1, 2, 3, 4, 5, 6, 7, 1.4,
      0.5, 1.5, 2.5, 3.5, 0.333, 0.25, 0.2, 0.143
    ];
    const idx = Math.floor(Math.random() * 16);
    const ratio = ratios[idx];
    const carrierFreq = 2000 + idx * 150;

    const mod = ctx.createOscillator();
    mod.type = 'sine';
    mod.frequency.value = carrierFreq * ratio;
    const modGain = ctx.createGain();
    modGain.gain.value = carrierFreq * 3;
    mod.connect(modGain);

    const carrier = ctx.createOscillator();
    carrier.type = 'sine';
    carrier.frequency.value = carrierFreq;
    modGain.connect(carrier.frequency);

    const shaper = ctx.createWaveShaper();
    shaper.curve = distMed;
    shaper.oversample = '4x';

    const g = ctx.createGain();
    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(0.14, now + 0.0005);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.01);

    carrier.connect(shaper).connect(g).connect(ctx.destination);
    carrier.start(now);
    carrier.stop(now + 0.012);
    mod.start(now);
    mod.stop(now + 0.012);
  };

  // ---------------------------------------------------------------
  // 14. TYPING_BACKSPACE — low FM thud, carrier 200 Hz, ratio 1:2,
  //     high mod index, under 15 ms, waveshaped
  // ---------------------------------------------------------------
  sounds.TYPING_BACKSPACE = function() {
    const now = ctx.currentTime;
    const carrierFreq = 200;

    const mod = ctx.createOscillator();
    mod.type = 'sine';
    mod.frequency.value = carrierFreq * 2;
    const modGain = ctx.createGain();
    modGain.gain.setValueAtTime(carrierFreq * 6, now);
    modGain.gain.exponentialRampToValueAtTime(carrierFreq * 0.5, now + 0.012);
    mod.connect(modGain);

    const carrier = ctx.createOscillator();
    carrier.type = 'sine';
    carrier.frequency.setValueAtTime(carrierFreq, now);
    carrier.frequency.exponentialRampToValueAtTime(80, now + 0.012);
    modGain.connect(carrier.frequency);

    const shaper = ctx.createWaveShaper();
    shaper.curve = distHeavy;
    shaper.oversample = '4x';

    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 3000;

    const g = ctx.createGain();
    g.gain.setValueAtTime(0.18, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.013);

    carrier.connect(shaper).connect(lp).connect(g).connect(ctx.destination);
    carrier.start(now);
    carrier.stop(now + 0.015);
    mod.start(now);
    mod.stop(now + 0.015);
  };

  // ---------------------------------------------------------------
  // 15. TYPING_ENTER — layered FM impact, 3 simultaneous FM pairs
  //     at ratios 1:1, 1:3, 1:7 + 50 Hz sub-impulse, waveshaped
  // ---------------------------------------------------------------
  sounds.TYPING_ENTER = function() {
    const now = ctx.currentTime;
    const layers = [
      { carrier: 300, ratio: 1, index: 4 },
      { carrier: 600, ratio: 3, index: 5 },
      { carrier: 1200, ratio: 7, index: 3 },
    ];

    const shaper = ctx.createWaveShaper();
    shaper.curve = distHeavy;
    shaper.oversample = '4x';

    const hs = ctx.createBiquadFilter();
    hs.type = 'highshelf';
    hs.frequency.value = 4000;
    hs.gain.value = 4;

    const master = ctx.createGain();
    master.gain.value = 0.10;

    shaper.connect(hs).connect(master).connect(ctx.destination);

    layers.forEach((l) => {
      const mod = ctx.createOscillator();
      mod.type = 'sine';
      mod.frequency.value = l.carrier * l.ratio;
      const mG = ctx.createGain();
      mG.gain.setValueAtTime(l.carrier * l.index, now);
      mG.gain.exponentialRampToValueAtTime(l.carrier * 0.1, now + 0.04);
      mod.connect(mG);

      const car = ctx.createOscillator();
      car.type = 'sine';
      car.frequency.value = l.carrier;
      mG.connect(car.frequency);

      const g = ctx.createGain();
      g.gain.setValueAtTime(1.0, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      car.connect(g).connect(shaper);
      car.start(now);
      car.stop(now + 0.06);
      mod.start(now);
      mod.stop(now + 0.06);
    });

    // Sub-impulse at 50 Hz
    const sub = ctx.createOscillator();
    sub.type = 'sine';
    sub.frequency.value = 50;
    const sG = ctx.createGain();
    sG.gain.setValueAtTime(0.22, now);
    sG.gain.exponentialRampToValueAtTime(0.001, now + 0.005);
    sub.connect(sG).connect(ctx.destination);
    sub.start(now);
    sub.stop(now + 0.007);
  };

  // ---------------------------------------------------------------
  // 16. TYPING_SPACE — shaped noise burst through waveshaper +
  //     narrow bandpass at 2 kHz, 15 ms total
  // ---------------------------------------------------------------
  sounds.TYPING_SPACE = function() {
    const now = ctx.currentTime;

    const nSrc = ctx.createBufferSource();
    nSrc.buffer = noiseBuffer(0.015);

    const shaper = ctx.createWaveShaper();
    shaper.curve = distMed;
    shaper.oversample = '4x';

    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 2000;
    bp.Q.value = 12;

    const g = ctx.createGain();
    g.gain.setValueAtTime(0.20, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.013);

    nSrc.connect(shaper).connect(bp).connect(g).connect(ctx.destination);
    nSrc.start(now);
    nSrc.stop(now + 0.015);
  };

  // ---------------------------------------------------------------
  // 17. APP_START — full DNA showcase, ~800 ms, multiple FM layers
  //     entering in sequence, distorted noise onset, sharp cutoff
  // ---------------------------------------------------------------
  sounds.APP_START = function() {
    const now = ctx.currentTime;
    const dur = 0.80;

    // --- Layer 1: distorted noise burst at onset (0–60 ms) ---
    const nSrc = ctx.createBufferSource();
    nSrc.buffer = noiseBuffer(0.06);
    const nShaper = ctx.createWaveShaper();
    nShaper.curve = distCrush;
    nShaper.oversample = '4x';
    const nBp = ctx.createBiquadFilter();
    nBp.type = 'bandpass';
    nBp.frequency.value = 3000;
    nBp.Q.value = 3;
    const nG = ctx.createGain();
    nG.gain.setValueAtTime(0.16, now);
    nG.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
    nSrc.connect(nShaper).connect(nBp).connect(nG).connect(ctx.destination);
    nSrc.start(now);
    nSrc.stop(now + 0.065);

    // --- Layer 2: low FM drone (carrier 80 Hz, ratio 1:1, slowly
    //     increasing mod index), 0–750 ms ---
    const droneMod = ctx.createOscillator();
    droneMod.type = 'sine';
    droneMod.frequency.value = 80;
    const droneModG = ctx.createGain();
    droneModG.gain.setValueAtTime(10, now);
    droneModG.gain.linearRampToValueAtTime(400, now + 0.65);
    droneModG.gain.setValueAtTime(400, now + 0.72);
    droneModG.gain.linearRampToValueAtTime(0, now + 0.75);
    droneMod.connect(droneModG);

    const droneCar = ctx.createOscillator();
    droneCar.type = 'sine';
    droneCar.frequency.value = 80;
    droneModG.connect(droneCar.frequency);

    const droneShaper = ctx.createWaveShaper();
    droneShaper.curve = distMed;
    droneShaper.oversample = '4x';

    const droneLp = ctx.createBiquadFilter();
    droneLp.type = 'lowpass';
    droneLp.frequency.setValueAtTime(200, now);
    droneLp.frequency.linearRampToValueAtTime(1200, now + 0.55);
    droneLp.frequency.linearRampToValueAtTime(200, now + 0.75);
    droneLp.Q.value = 4;

    const droneG = ctx.createGain();
    droneG.gain.setValueAtTime(0, now);
    droneG.gain.linearRampToValueAtTime(0.16, now + 0.15);
    droneG.gain.setValueAtTime(0.16, now + 0.72);
    droneG.gain.linearRampToValueAtTime(0, now + 0.75);

    droneCar.connect(droneShaper).connect(droneLp).connect(droneG).connect(ctx.destination);
    droneCar.start(now);
    droneCar.stop(now + 0.76);
    droneMod.start(now);
    droneMod.stop(now + 0.76);

    // --- Layer 3: metallic shimmer (carrier 4 kHz, ratio 1:7),
    //     enters at 200 ms, brief 250 ms burst ---
    const shimMod = ctx.createOscillator();
    shimMod.type = 'sine';
    shimMod.frequency.value = 4000 * 7;
    const shimModG = ctx.createGain();
    shimModG.gain.setValueAtTime(4000 * 3, now + 0.20);
    shimModG.gain.exponentialRampToValueAtTime(100, now + 0.45);
    shimMod.connect(shimModG);

    const shimCar = ctx.createOscillator();
    shimCar.type = 'sine';
    shimCar.frequency.value = 4000;
    shimModG.connect(shimCar.frequency);

    const shimShaper = ctx.createWaveShaper();
    shimShaper.curve = distLight;
    shimShaper.oversample = '4x';

    const shimHs = ctx.createBiquadFilter();
    shimHs.type = 'highshelf';
    shimHs.frequency.value = 5000;
    shimHs.gain.value = 6;

    const shimG = ctx.createGain();
    shimG.gain.setValueAtTime(0, now + 0.20);
    shimG.gain.linearRampToValueAtTime(0.06, now + 0.22);
    shimG.gain.setValueAtTime(0.06, now + 0.40);
    shimG.gain.linearRampToValueAtTime(0, now + 0.45);

    shimCar.connect(shimShaper).connect(shimHs).connect(shimG).connect(ctx.destination);
    shimCar.start(now + 0.20);
    shimCar.stop(now + 0.46);
    shimMod.start(now + 0.20);
    shimMod.stop(now + 0.46);

    // --- Layer 4: mid FM impact at 600 ms (carrier 500 Hz, ratio
    //     1:3, high index), sharp cutoff at end ---
    const impMod = ctx.createOscillator();
    impMod.type = 'sine';
    impMod.frequency.value = 500 * 3;
    const impModG = ctx.createGain();
    impModG.gain.setValueAtTime(500 * 6, now + 0.60);
    impModG.gain.exponentialRampToValueAtTime(50, now + 0.75);
    impMod.connect(impModG);

    const impCar = ctx.createOscillator();
    impCar.type = 'sine';
    impCar.frequency.value = 500;
    impModG.connect(impCar.frequency);

    const impShaper = ctx.createWaveShaper();
    impShaper.curve = distHeavy;
    impShaper.oversample = '4x';

    const impG = ctx.createGain();
    impG.gain.setValueAtTime(0.14, now + 0.60);
    impG.gain.setValueAtTime(0.14, now + 0.74);
    impG.gain.linearRampToValueAtTime(0, now + 0.75);

    impCar.connect(impShaper).connect(impG).connect(ctx.destination);
    impCar.start(now + 0.60);
    impCar.stop(now + 0.76);
    impMod.start(now + 0.60);
    impMod.stop(now + 0.76);
  };

  return sounds;
}

export default { meta, createSounds };
