// ═══════════════════════════════════════════════════════════════════
// Holo Dash — sounds.js
// Holographic command dashboard — ES module
// ═══════════════════════════════════════════════════════════════════

const meta = {
  name: 'Holo Dash',
  subtitle: 'Holographic command dashboard — Web Audio API synthesis',
  colors: {
    accent:   '#00D4FF',
    accent2:  '#FFA63E',
    danger:   '#FF4466',
    bg:       '#0B1628',
    surface:  '#111E35',
    surface2: '#182844',
    border:   '#2A3D5C',
    text:     '#D0E4F5',
    textDim:  '#5A7A9A',
  },
  placeholder: 'Type on the holographic keyboard... each key glows cyan...',
  sounds: {
    HOVER:            { label: 'Hover',            meta: '60ms / 900 Hz / saw pair',       desc: 'Glass panel brightening — holographic shimmer on cursor enter' },
    HOVER_UP:         { label: 'Hover Up',         meta: '50ms / 960 Hz / saw pair',       desc: 'Panel dimming — light fading from glass edge' },
    CLICK:            { label: 'Click',            meta: '35ms / 680 Hz / saw pair',       desc: 'Glass button tap — precise holographic contact' },
    IMPORTANT_CLICK:  { label: 'Important Click',  meta: '120ms / 440 Hz / saw pair',      desc: 'Command button press — dashboard pulse with sub-bass' },
    FEATURE_SWITCH_ON:{ label: 'Feature Switch',   meta: '260ms ON / 240ms OFF',           desc: 'Rings lighting up — subsystem power sequence' },
    LIMITER_ON:       { label: 'Limiter',          meta: '200ms ON / 190ms OFF',           desc: 'Security lock — panel constriction' },
    SWITCH_TOGGLE:    { label: 'Switch Toggle',    meta: '40ms — frequency jump',          desc: 'HUD pixel flip — minimal tonal step' },
    TAB_INSERT:       { label: 'Tab Insert',       meta: '100ms / 3 ascending pairs',      desc: 'Panel materializing — rings snap into position' },
    TAB_CLOSE:        { label: 'Tab Close',        meta: '90ms / 3 descending pairs',      desc: 'Panel dissolving — rings de-materialize' },
    TAB_SLASH:        { label: 'Tab Slash',         meta: '160ms / 700 Hz / phaser sweep',  desc: 'Command palette — radar sweep ping' },
    TYPING_LETTER:    { label: 'Typing Letter',    meta: '28ms / 15 variants',             desc: 'Holo-key glass tap — floating keys illuminate' },
    TYPING_BACKSPACE: { label: 'Typing Backspace', meta: '32ms / 480 Hz sweep down',       desc: 'Glyph dissolve — character flickers away' },
    TYPING_ENTER:     { label: 'Typing Enter',     meta: '80ms / 400 Hz / heavy',          desc: 'Command confirm — glass bar slam with resonance' },
    TYPING_SPACE:     { label: 'Typing Space',     meta: '30ms / 550 Hz / diffuse',        desc: 'Space bar — broad palm-on-glass brush' },
    APP_START:        { label: 'App Start',        meta: '1200ms / 5 ring layers',         desc: 'Dashboard boot — concentric rings fade in sequentially' },
  },
};

// ═══════════════════════════════════════════════════════════════════
// SONIC DNA
// ═══════════════════════════════════════════════════════════════════
// Primary waveform:    Phase-shifted sawtooth pairs (2-8 Hz offset)
// Signature effect:    Allpass phaser chain (swept centre frequencies)
// Transient character: Filtered noise click transients (4-6ms, moderate Q)
// Envelope philosophy: Medium attack (3-5ms) into phaser-swept tail (40-150ms)
// Frequency world:     Focused mid-band 400 Hz-5 kHz with moving resonant peaks
//
// Every sound below must use at least one signature technique.
// If a sound could belong to any theme, it needs redesigning.
// ═══════════════════════════════════════════════════════════════════

function createSounds(ctx, noiseBuffer) {
  const sounds = {};

  // Helper: create an allpass phaser stage
  function allpassStage(input, freq, q) {
    const ap = ctx.createBiquadFilter();
    ap.type = 'allpass';
    ap.frequency.value = freq;
    ap.Q.value = q;
    input.connect(ap);
    return ap;
  }

  // Helper: create a phased sawtooth pair
  function sawPair(freq, offset) {
    const osc1 = ctx.createOscillator();
    osc1.type = 'sawtooth';
    osc1.frequency.value = freq;
    const osc2 = ctx.createOscillator();
    osc2.type = 'sawtooth';
    osc2.frequency.value = freq + offset;
    const mix = ctx.createGain();
    mix.gain.value = 0.5;
    osc1.connect(mix);
    osc2.connect(mix);
    return { osc1, osc2, mix };
  }

  // Helper: noise tap transient
  function noiseTap(now, freq, q, gain, dur) {
    const nSrc = ctx.createBufferSource();
    nSrc.buffer = noiseBuffer(dur + 0.005);
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = freq;
    bp.Q.value = q;
    const nG = ctx.createGain();
    nG.gain.setValueAtTime(gain, now);
    nG.gain.exponentialRampToValueAtTime(0.001, now + dur);
    nSrc.connect(bp).connect(nG).connect(ctx.destination);
    nSrc.start(now);
    nSrc.stop(now + dur + 0.005);
  }

  // ---------------------------------------------------------------
  // 1. HOVER — glass panel brightening, 60ms
  // ---------------------------------------------------------------
  sounds.HOVER = function() {
    const now = ctx.currentTime;

    // Sawtooth pair with 2 Hz offset, sweeping up
    const osc1 = ctx.createOscillator();
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(900, now);
    osc1.frequency.linearRampToValueAtTime(960, now + 0.06);
    const osc2 = ctx.createOscillator();
    osc2.type = 'sawtooth';
    osc2.frequency.setValueAtTime(902, now);
    osc2.frequency.linearRampToValueAtTime(962, now + 0.06);

    const mix = ctx.createGain();
    mix.gain.value = 0.5;
    osc1.connect(mix);
    osc2.connect(mix);

    // Allpass phaser sweep
    const ap = ctx.createBiquadFilter();
    ap.type = 'allpass';
    ap.frequency.setValueAtTime(2000, now);
    ap.frequency.linearRampToValueAtTime(3000, now + 0.06);
    ap.Q.value = 5;

    const mG = ctx.createGain();
    mG.gain.setValueAtTime(0, now);
    mG.gain.linearRampToValueAtTime(0.06, now + 0.003);
    mG.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    mix.connect(ap).connect(mG).connect(ctx.destination);

    osc1.start(now);
    osc1.stop(now + 0.065);
    osc2.start(now);
    osc2.stop(now + 0.065);

    noiseTap(now, 4500, 3, 0.025, 0.008);
  };

  // ---------------------------------------------------------------
  // 2. HOVER_UP — panel dimming, 50ms
  // ---------------------------------------------------------------
  sounds.HOVER_UP = function() {
    const now = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(960, now);
    osc1.frequency.linearRampToValueAtTime(850, now + 0.05);
    const osc2 = ctx.createOscillator();
    osc2.type = 'sawtooth';
    osc2.frequency.setValueAtTime(962, now);
    osc2.frequency.linearRampToValueAtTime(852, now + 0.05);

    const mix = ctx.createGain();
    mix.gain.value = 0.5;
    osc1.connect(mix);
    osc2.connect(mix);

    const ap = ctx.createBiquadFilter();
    ap.type = 'allpass';
    ap.frequency.setValueAtTime(3000, now);
    ap.frequency.linearRampToValueAtTime(1800, now + 0.05);
    ap.Q.value = 5;

    const mG = ctx.createGain();
    mG.gain.setValueAtTime(0, now);
    mG.gain.linearRampToValueAtTime(0.06, now + 0.002);
    mG.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    mix.connect(ap).connect(mG).connect(ctx.destination);

    osc1.start(now);
    osc1.stop(now + 0.055);
    osc2.start(now);
    osc2.stop(now + 0.055);

    noiseTap(now, 4000, 2.5, 0.02, 0.006);
  };

  // ---------------------------------------------------------------
  // 3. CLICK — glass button tap, 35ms
  // ---------------------------------------------------------------
  sounds.CLICK = function() {
    const now = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    osc1.type = 'sawtooth';
    osc1.frequency.value = 680;
    const osc2 = ctx.createOscillator();
    osc2.type = 'sawtooth';
    osc2.frequency.value = 684;

    const mix = ctx.createGain();
    mix.gain.value = 0.5;
    osc1.connect(mix);
    osc2.connect(mix);

    const ap = ctx.createBiquadFilter();
    ap.type = 'allpass';
    ap.frequency.value = 1800;
    ap.Q.value = 4;

    const mG = ctx.createGain();
    mG.gain.setValueAtTime(0, now);
    mG.gain.linearRampToValueAtTime(0.15, now + 0.001);
    mG.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

    mix.connect(ap).connect(mG).connect(ctx.destination);

    osc1.start(now);
    osc1.stop(now + 0.04);
    osc2.start(now);
    osc2.stop(now + 0.04);

    noiseTap(now, 3500, 4, 0.12, 0.005);
  };

  // ---------------------------------------------------------------
  // 4. IMPORTANT_CLICK — command button press, 120ms
  // ---------------------------------------------------------------
  sounds.IMPORTANT_CLICK = function() {
    const now = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    osc1.type = 'sawtooth';
    osc1.frequency.value = 440;
    const osc2 = ctx.createOscillator();
    osc2.type = 'sawtooth';
    osc2.frequency.value = 444;

    const mix = ctx.createGain();
    mix.gain.value = 0.5;
    osc1.connect(mix);
    osc2.connect(mix);

    // Two cascaded allpass filters
    const ap1 = ctx.createBiquadFilter();
    ap1.type = 'allpass';
    ap1.frequency.setValueAtTime(1200, now);
    ap1.frequency.linearRampToValueAtTime(1800, now + 0.08);
    ap1.Q.value = 4;

    const ap2 = ctx.createBiquadFilter();
    ap2.type = 'allpass';
    ap2.frequency.setValueAtTime(2400, now);
    ap2.frequency.linearRampToValueAtTime(3000, now + 0.08);
    ap2.Q.value = 3;

    const mG = ctx.createGain();
    mG.gain.setValueAtTime(0, now);
    mG.gain.linearRampToValueAtTime(0.18, now + 0.002);
    mG.gain.setValueAtTime(0.18, now + 0.017);
    mG.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    mix.connect(ap1).connect(ap2).connect(mG).connect(ctx.destination);

    osc1.start(now);
    osc1.stop(now + 0.125);
    osc2.start(now);
    osc2.stop(now + 0.125);

    // Sub-bass
    const sub = ctx.createOscillator();
    sub.type = 'sine';
    sub.frequency.value = 70;
    const sG = ctx.createGain();
    sG.gain.setValueAtTime(0, now);
    sG.gain.linearRampToValueAtTime(0.10, now + 0.002);
    sG.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    sub.connect(sG).connect(ctx.destination);
    sub.start(now);
    sub.stop(now + 0.085);

    noiseTap(now, 3000, 3, 0.14, 0.006);
  };

  // ---------------------------------------------------------------
  // 5. FEATURE_SWITCH_ON — rings lighting up, 260ms
  // ---------------------------------------------------------------
  sounds.FEATURE_SWITCH_ON = function() {
    const now = ctx.currentTime;

    // Three staggered sawtooth pairs (low to high)
    const layers = [
      { freq: 300, offset: 2, t: 0 },
      { freq: 600, offset: 3, t: 0.04 },
      { freq: 1200, offset: 5, t: 0.08 },
    ];

    const master = ctx.createGain();
    master.gain.value = 1.0;

    layers.forEach((layer) => {
      const t = now + layer.t;
      const osc1 = ctx.createOscillator();
      osc1.type = 'sawtooth';
      osc1.frequency.value = layer.freq;
      const osc2 = ctx.createOscillator();
      osc2.type = 'sawtooth';
      osc2.frequency.value = layer.freq + layer.offset;

      const mix = ctx.createGain();
      mix.gain.value = 0.5;
      osc1.connect(mix);
      osc2.connect(mix);

      // Per-layer allpass sweep
      const ap = ctx.createBiquadFilter();
      ap.type = 'allpass';
      ap.frequency.setValueAtTime(800, t);
      ap.frequency.linearRampToValueAtTime(4000, t + 0.18);
      ap.Q.value = 4;

      const lG = ctx.createGain();
      lG.gain.setValueAtTime(0, now);
      lG.gain.setValueAtTime(0, t);
      lG.gain.linearRampToValueAtTime(0.10, t + 0.005);
      lG.gain.setValueAtTime(0.10, t + 0.065);
      lG.gain.exponentialRampToValueAtTime(0.001, t + 0.22);

      mix.connect(ap).connect(lG).connect(master);

      osc1.start(now);
      osc1.stop(t + 0.225);
      osc2.start(now);
      osc2.stop(t + 0.225);
    });

    // Master LP sweep opening
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(1000, now);
    lp.frequency.linearRampToValueAtTime(6000, now + 0.22);
    lp.Q.value = 2;
    master.connect(lp).connect(ctx.destination);

    noiseTap(now, 2500, 2, 0.06, 0.008);
  };

  // ---------------------------------------------------------------
  // 6. FEATURE_SWITCH_OFF — rings collapsing, 240ms
  // ---------------------------------------------------------------
  sounds.FEATURE_SWITCH_OFF = function() {
    const now = ctx.currentTime;

    // Three staggered sawtooth pairs (high to low)
    const layers = [
      { freq: 1200, offset: 5, t: 0 },
      { freq: 600, offset: 3, t: 0.04 },
      { freq: 300, offset: 2, t: 0.08 },
    ];

    const master = ctx.createGain();
    master.gain.value = 1.0;

    layers.forEach((layer) => {
      const t = now + layer.t;
      const osc1 = ctx.createOscillator();
      osc1.type = 'sawtooth';
      osc1.frequency.value = layer.freq;
      const osc2 = ctx.createOscillator();
      osc2.type = 'sawtooth';
      osc2.frequency.value = layer.freq + layer.offset;

      const mix = ctx.createGain();
      mix.gain.value = 0.5;
      osc1.connect(mix);
      osc2.connect(mix);

      const ap = ctx.createBiquadFilter();
      ap.type = 'allpass';
      ap.frequency.setValueAtTime(4000, t);
      ap.frequency.linearRampToValueAtTime(800, t + 0.16);
      ap.Q.value = 4;

      const lG = ctx.createGain();
      lG.gain.setValueAtTime(0, now);
      lG.gain.setValueAtTime(0, t);
      lG.gain.linearRampToValueAtTime(0.09, t + 0.004);
      lG.gain.exponentialRampToValueAtTime(0.001, t + 0.16);

      mix.connect(ap).connect(lG).connect(master);

      osc1.start(now);
      osc1.stop(t + 0.165);
      osc2.start(now);
      osc2.stop(t + 0.165);
    });

    // Master LP sweep closing
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(6000, now);
    lp.frequency.linearRampToValueAtTime(800, now + 0.22);
    lp.Q.value = 2;
    master.connect(lp).connect(ctx.destination);

    noiseTap(now, 3000, 2, 0.05, 0.007);
  };

  // ---------------------------------------------------------------
  // 7. LIMITER_ON — security lock engaging, 200ms
  // ---------------------------------------------------------------
  sounds.LIMITER_ON = function() {
    const now = ctx.currentTime;

    // Two pairs converging inward
    const osc1a = ctx.createOscillator();
    osc1a.type = 'sawtooth';
    osc1a.frequency.setValueAtTime(400, now);
    osc1a.frequency.linearRampToValueAtTime(500, now + 0.15);
    const osc1b = ctx.createOscillator();
    osc1b.type = 'sawtooth';
    osc1b.frequency.setValueAtTime(403, now);
    osc1b.frequency.linearRampToValueAtTime(503, now + 0.15);

    const osc2a = ctx.createOscillator();
    osc2a.type = 'sawtooth';
    osc2a.frequency.setValueAtTime(700, now);
    osc2a.frequency.linearRampToValueAtTime(540, now + 0.15);
    const osc2b = ctx.createOscillator();
    osc2b.type = 'sawtooth';
    osc2b.frequency.setValueAtTime(704, now);
    osc2b.frequency.linearRampToValueAtTime(543, now + 0.15);

    const mix = ctx.createGain();
    mix.gain.value = 0.25;
    osc1a.connect(mix);
    osc1b.connect(mix);
    osc2a.connect(mix);
    osc2b.connect(mix);

    // Allpass with rising Q effect (tightening)
    const ap = ctx.createBiquadFilter();
    ap.type = 'allpass';
    ap.frequency.value = 1500;
    ap.Q.setValueAtTime(2, now);
    ap.Q.linearRampToValueAtTime(8, now + 0.15);

    const mG = ctx.createGain();
    mG.gain.setValueAtTime(0, now);
    mG.gain.linearRampToValueAtTime(0.10, now + 0.003);
    mG.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    mix.connect(ap).connect(mG).connect(ctx.destination);

    osc1a.start(now); osc1a.stop(now + 0.205);
    osc1b.start(now); osc1b.stop(now + 0.205);
    osc2a.start(now); osc2a.stop(now + 0.205);
    osc2b.start(now); osc2b.stop(now + 0.205);

    // HP noise onset click
    const nSrc = ctx.createBufferSource();
    nSrc.buffer = noiseBuffer(0.01);
    const hp = ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = 3000;
    const nG = ctx.createGain();
    nG.gain.setValueAtTime(0.08, now);
    nG.gain.exponentialRampToValueAtTime(0.001, now + 0.005);
    nSrc.connect(hp).connect(nG).connect(ctx.destination);
    nSrc.start(now);
    nSrc.stop(now + 0.01);
  };

  // ---------------------------------------------------------------
  // 8. LIMITER_OFF — security lock releasing, 190ms
  // ---------------------------------------------------------------
  sounds.LIMITER_OFF = function() {
    const now = ctx.currentTime;

    // Two pairs diverging outward
    const osc1a = ctx.createOscillator();
    osc1a.type = 'sawtooth';
    osc1a.frequency.setValueAtTime(520, now);
    osc1a.frequency.linearRampToValueAtTime(400, now + 0.15);
    const osc1b = ctx.createOscillator();
    osc1b.type = 'sawtooth';
    osc1b.frequency.setValueAtTime(523, now);
    osc1b.frequency.linearRampToValueAtTime(403, now + 0.15);

    const osc2a = ctx.createOscillator();
    osc2a.type = 'sawtooth';
    osc2a.frequency.setValueAtTime(540, now);
    osc2a.frequency.linearRampToValueAtTime(750, now + 0.15);
    const osc2b = ctx.createOscillator();
    osc2b.type = 'sawtooth';
    osc2b.frequency.setValueAtTime(543, now);
    osc2b.frequency.linearRampToValueAtTime(754, now + 0.15);

    const mix = ctx.createGain();
    mix.gain.value = 0.25;
    osc1a.connect(mix);
    osc1b.connect(mix);
    osc2a.connect(mix);
    osc2b.connect(mix);

    // Allpass with dropping Q (loosening)
    const ap = ctx.createBiquadFilter();
    ap.type = 'allpass';
    ap.frequency.value = 1500;
    ap.Q.setValueAtTime(8, now);
    ap.Q.linearRampToValueAtTime(2, now + 0.15);

    const mG = ctx.createGain();
    mG.gain.setValueAtTime(0, now);
    mG.gain.linearRampToValueAtTime(0.10, now + 0.002);
    mG.gain.exponentialRampToValueAtTime(0.001, now + 0.19);

    mix.connect(ap).connect(mG).connect(ctx.destination);

    osc1a.start(now); osc1a.stop(now + 0.195);
    osc1b.start(now); osc1b.stop(now + 0.195);
    osc2a.start(now); osc2a.stop(now + 0.195);
    osc2b.start(now); osc2b.stop(now + 0.195);

    noiseTap(now, 4000, 3, 0.10, 0.006);
  };

  // ---------------------------------------------------------------
  // 9. SWITCH_TOGGLE — HUD pixel flip, 40ms
  // ---------------------------------------------------------------
  sounds.SWITCH_TOGGLE = function() {
    const now = ctx.currentTime;

    // Single sawtooth with abrupt frequency step
    const osc = ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.setValueAtTime(1000, now + 0.008);

    const ap = ctx.createBiquadFilter();
    ap.type = 'allpass';
    ap.frequency.value = 2200;
    ap.Q.value = 3;

    const mG = ctx.createGain();
    mG.gain.setValueAtTime(0, now);
    mG.gain.linearRampToValueAtTime(0.08, now + 0.001);
    mG.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(ap).connect(mG).connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.045);
  };

  // ---------------------------------------------------------------
  // 10. TAB_INSERT — panel materializing, 100ms
  // ---------------------------------------------------------------
  sounds.TAB_INSERT = function() {
    const now = ctx.currentTime;

    const blips = [
      { freq: 500, offset: 3, t: 0 },
      { freq: 750, offset: 3, t: 0.015 },
      { freq: 1000, offset: 4, t: 0.030 },
    ];

    blips.forEach((blip) => {
      const t = now + blip.t;
      const osc1 = ctx.createOscillator();
      osc1.type = 'sawtooth';
      osc1.frequency.value = blip.freq;
      const osc2 = ctx.createOscillator();
      osc2.type = 'sawtooth';
      osc2.frequency.value = blip.freq + blip.offset;

      const mix = ctx.createGain();
      mix.gain.value = 0.5;
      osc1.connect(mix);
      osc2.connect(mix);

      const ap = ctx.createBiquadFilter();
      ap.type = 'allpass';
      ap.frequency.value = 2000;
      ap.Q.value = 4;

      const bG = ctx.createGain();
      bG.gain.setValueAtTime(0, t);
      bG.gain.linearRampToValueAtTime(0.12, t + 0.001);
      bG.gain.exponentialRampToValueAtTime(0.001, t + 0.025);

      mix.connect(ap).connect(bG).connect(ctx.destination);

      osc1.start(t);
      osc1.stop(t + 0.03);
      osc2.start(t);
      osc2.stop(t + 0.03);

      noiseTap(t, 4000, 3, 0.06, 0.004);
    });
  };

  // ---------------------------------------------------------------
  // 11. TAB_CLOSE — panel dissolving, 90ms
  // ---------------------------------------------------------------
  sounds.TAB_CLOSE = function() {
    const now = ctx.currentTime;

    const blips = [
      { freq: 1000, offset: 4, t: 0 },
      { freq: 750, offset: 3, t: 0.012 },
      { freq: 500, offset: 3, t: 0.024 },
    ];

    blips.forEach((blip) => {
      const t = now + blip.t;
      const osc1 = ctx.createOscillator();
      osc1.type = 'sawtooth';
      osc1.frequency.value = blip.freq;
      const osc2 = ctx.createOscillator();
      osc2.type = 'sawtooth';
      osc2.frequency.value = blip.freq + blip.offset;

      const mix = ctx.createGain();
      mix.gain.value = 0.5;
      osc1.connect(mix);
      osc2.connect(mix);

      const ap = ctx.createBiquadFilter();
      ap.type = 'allpass';
      ap.frequency.value = 2000;
      ap.Q.value = 4;

      const bG = ctx.createGain();
      bG.gain.setValueAtTime(0, t);
      bG.gain.linearRampToValueAtTime(0.10, t + 0.001);
      bG.gain.exponentialRampToValueAtTime(0.001, t + 0.022);

      mix.connect(ap).connect(bG).connect(ctx.destination);

      osc1.start(t);
      osc1.stop(t + 0.027);
      osc2.start(t);
      osc2.stop(t + 0.027);

      noiseTap(t, 3500, 3, 0.05, 0.004);
    });
  };

  // ---------------------------------------------------------------
  // 12. TAB_SLASH — radar sweep ping, 160ms
  // ---------------------------------------------------------------
  sounds.TAB_SLASH = function() {
    const now = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    osc1.type = 'sawtooth';
    osc1.frequency.value = 700;
    const osc2 = ctx.createOscillator();
    osc2.type = 'sawtooth';
    osc2.frequency.value = 704;

    const mix = ctx.createGain();
    mix.gain.value = 0.5;
    osc1.connect(mix);
    osc2.connect(mix);

    // Two cascaded allpass with counter-sweeps
    const ap1 = ctx.createBiquadFilter();
    ap1.type = 'allpass';
    ap1.frequency.setValueAtTime(1500, now);
    ap1.frequency.linearRampToValueAtTime(4000, now + 0.12);
    ap1.Q.value = 4;

    const ap2 = ctx.createBiquadFilter();
    ap2.type = 'allpass';
    ap2.frequency.setValueAtTime(3000, now);
    ap2.frequency.linearRampToValueAtTime(1500, now + 0.12);
    ap2.Q.value = 3;

    const mG = ctx.createGain();
    mG.gain.setValueAtTime(0, now);
    mG.gain.linearRampToValueAtTime(0.14, now + 0.002);
    mG.gain.setValueAtTime(0.14, now + 0.022);
    mG.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

    mix.connect(ap1).connect(ap2).connect(mG).connect(ctx.destination);

    osc1.start(now);
    osc1.stop(now + 0.165);
    osc2.start(now);
    osc2.stop(now + 0.165);

    // Upper shimmer
    const shimmer = ctx.createOscillator();
    shimmer.type = 'sine';
    shimmer.frequency.value = 2100;
    const shG = ctx.createGain();
    shG.gain.setValueAtTime(0, now);
    shG.gain.linearRampToValueAtTime(0.04, now + 0.003);
    shG.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
    shimmer.connect(shG).connect(ctx.destination);
    shimmer.start(now);
    shimmer.stop(now + 0.165);

    noiseTap(now, 5000, 4, 0.08, 0.005);
  };

  // ---------------------------------------------------------------
  // 13. TYPING_LETTER — holo-key glass tap, 28ms (15 variants)
  // ---------------------------------------------------------------
  sounds.TYPING_LETTER = function() {
    const now = ctx.currentTime;

    const bodyFreq = 600 + Math.floor(Math.random() * 15) * 35;
    const noiseCentre = 2500 + (Math.random() - 0.5) * 1600;

    const osc1 = ctx.createOscillator();
    osc1.type = 'sawtooth';
    osc1.frequency.value = bodyFreq;
    const osc2 = ctx.createOscillator();
    osc2.type = 'sawtooth';
    osc2.frequency.value = bodyFreq + 3;

    const mix = ctx.createGain();
    mix.gain.value = 0.5;
    osc1.connect(mix);
    osc2.connect(mix);

    const ap = ctx.createBiquadFilter();
    ap.type = 'allpass';
    ap.frequency.value = noiseCentre;
    ap.Q.value = 3;

    const mG = ctx.createGain();
    mG.gain.setValueAtTime(0, now);
    mG.gain.linearRampToValueAtTime(0.10, now + 0.001);
    mG.gain.exponentialRampToValueAtTime(0.001, now + 0.028);

    mix.connect(ap).connect(mG).connect(ctx.destination);

    osc1.start(now);
    osc1.stop(now + 0.033);
    osc2.start(now);
    osc2.stop(now + 0.033);

    noiseTap(now, noiseCentre, 4, 0.09, 0.004);
  };

  // ---------------------------------------------------------------
  // 14. TYPING_BACKSPACE — glyph dissolve, 32ms
  // ---------------------------------------------------------------
  sounds.TYPING_BACKSPACE = function() {
    const now = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(480, now);
    osc1.frequency.linearRampToValueAtTime(400, now + 0.032);
    const osc2 = ctx.createOscillator();
    osc2.type = 'sawtooth';
    osc2.frequency.setValueAtTime(483, now);
    osc2.frequency.linearRampToValueAtTime(403, now + 0.032);

    const mix = ctx.createGain();
    mix.gain.value = 0.5;
    osc1.connect(mix);
    osc2.connect(mix);

    const ap = ctx.createBiquadFilter();
    ap.type = 'allpass';
    ap.frequency.value = 1800;
    ap.Q.value = 3;

    const mG = ctx.createGain();
    mG.gain.setValueAtTime(0, now);
    mG.gain.linearRampToValueAtTime(0.08, now + 0.001);
    mG.gain.exponentialRampToValueAtTime(0.001, now + 0.032);

    mix.connect(ap).connect(mG).connect(ctx.destination);

    osc1.start(now);
    osc1.stop(now + 0.037);
    osc2.start(now);
    osc2.stop(now + 0.037);

    noiseTap(now, 2500, 3, 0.07, 0.005);
  };

  // ---------------------------------------------------------------
  // 15. TYPING_ENTER — command confirm, 80ms
  // ---------------------------------------------------------------
  sounds.TYPING_ENTER = function() {
    const now = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    osc1.type = 'sawtooth';
    osc1.frequency.value = 400;
    const osc2 = ctx.createOscillator();
    osc2.type = 'sawtooth';
    osc2.frequency.value = 405;

    const mix = ctx.createGain();
    mix.gain.value = 0.5;
    osc1.connect(mix);
    osc2.connect(mix);

    // Two cascaded allpass
    const ap1 = ctx.createBiquadFilter();
    ap1.type = 'allpass';
    ap1.frequency.setValueAtTime(1200, now);
    ap1.frequency.linearRampToValueAtTime(2000, now + 0.06);
    ap1.Q.value = 4;

    const ap2 = ctx.createBiquadFilter();
    ap2.type = 'allpass';
    ap2.frequency.value = 2500;
    ap2.Q.value = 3;

    const mG = ctx.createGain();
    mG.gain.setValueAtTime(0, now);
    mG.gain.linearRampToValueAtTime(0.16, now + 0.002);
    mG.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    mix.connect(ap1).connect(ap2).connect(mG).connect(ctx.destination);

    osc1.start(now);
    osc1.stop(now + 0.085);
    osc2.start(now);
    osc2.stop(now + 0.085);

    // Sub-bass thud
    const sub = ctx.createOscillator();
    sub.type = 'sine';
    sub.frequency.value = 90;
    const sG = ctx.createGain();
    sG.gain.setValueAtTime(0, now);
    sG.gain.linearRampToValueAtTime(0.06, now + 0.002);
    sG.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
    sub.connect(sG).connect(ctx.destination);
    sub.start(now);
    sub.stop(now + 0.055);

    noiseTap(now, 3000, 3, 0.12, 0.006);
  };

  // ---------------------------------------------------------------
  // 16. TYPING_SPACE — palm-on-glass brush, 30ms
  // ---------------------------------------------------------------
  sounds.TYPING_SPACE = function() {
    const now = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    osc1.type = 'sawtooth';
    osc1.frequency.value = 550;
    const osc2 = ctx.createOscillator();
    osc2.type = 'sawtooth';
    osc2.frequency.value = 554;

    const mix = ctx.createGain();
    mix.gain.value = 0.5;
    osc1.connect(mix);
    osc2.connect(mix);

    const ap = ctx.createBiquadFilter();
    ap.type = 'allpass';
    ap.frequency.value = 2000;
    ap.Q.value = 2;

    const mG = ctx.createGain();
    mG.gain.setValueAtTime(0, now);
    mG.gain.linearRampToValueAtTime(0.08, now + 0.002);
    mG.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

    mix.connect(ap).connect(mG).connect(ctx.destination);

    osc1.start(now);
    osc1.stop(now + 0.035);
    osc2.start(now);
    osc2.stop(now + 0.035);

    // Wider, more diffuse noise
    noiseTap(now, 3000, 1.5, 0.08, 0.006);
  };

  // ---------------------------------------------------------------
  // 17. APP_START — dashboard boot, 1200ms
  // ---------------------------------------------------------------
  sounds.APP_START = function() {
    const now = ctx.currentTime;

    // Five sawtooth pairs, staggered like concentric rings powering on
    const rings = [
      { freq: 180, offset: 2, t: 0,    peak: 0.06 },
      { freq: 360, offset: 3, t: 0.15, peak: 0.05 },
      { freq: 540, offset: 3, t: 0.30, peak: 0.04 },
      { freq: 900, offset: 4, t: 0.50, peak: 0.03 },
      { freq: 1800, offset: 5, t: 0.70, peak: 0.02 },
    ];

    const master = ctx.createGain();
    master.gain.value = 1.0;

    rings.forEach((ring) => {
      const t = now + ring.t;
      const osc1 = ctx.createOscillator();
      osc1.type = 'sawtooth';
      osc1.frequency.value = ring.freq;
      const osc2 = ctx.createOscillator();
      osc2.type = 'sawtooth';
      osc2.frequency.value = ring.freq + ring.offset;

      const mix = ctx.createGain();
      mix.gain.value = 0.5;
      osc1.connect(mix);
      osc2.connect(mix);

      // Per-ring allpass sweep
      const ap = ctx.createBiquadFilter();
      ap.type = 'allpass';
      ap.frequency.setValueAtTime(500, t);
      ap.frequency.linearRampToValueAtTime(4000, t + 0.4);
      ap.Q.value = 4;

      const rG = ctx.createGain();
      rG.gain.setValueAtTime(0, now);
      rG.gain.setValueAtTime(0, t);
      rG.gain.linearRampToValueAtTime(ring.peak, t + 0.15);
      rG.gain.setValueAtTime(ring.peak, t + 0.25);
      rG.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      mix.connect(ap).connect(rG).connect(master);

      osc1.start(now);
      osc1.stop(now + 1.205);
      osc2.start(now);
      osc2.stop(now + 1.205);
    });

    // Master LP sweep opening wide
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(300, now);
    lp.frequency.linearRampToValueAtTime(7000, now + 0.9);
    lp.Q.value = 1.5;
    master.connect(lp).connect(ctx.destination);

    // Ambient noise bed
    const nSrc = ctx.createBufferSource();
    nSrc.buffer = noiseBuffer(1.25);
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 2000;
    bp.Q.value = 1;
    const nG = ctx.createGain();
    nG.gain.setValueAtTime(0, now);
    nG.gain.linearRampToValueAtTime(0.025, now + 0.4);
    nG.gain.setValueAtTime(0.025, now + 0.8);
    nG.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
    nSrc.connect(bp).connect(nG).connect(ctx.destination);
    nSrc.start(now);
    nSrc.stop(now + 1.25);

    // Sub-bass drone
    const sub = ctx.createOscillator();
    sub.type = 'sine';
    sub.frequency.value = 50;
    const sG = ctx.createGain();
    sG.gain.setValueAtTime(0, now);
    sG.gain.linearRampToValueAtTime(0.04, now + 0.3);
    sG.gain.setValueAtTime(0.04, now + 0.8);
    sG.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
    sub.connect(sG).connect(ctx.destination);
    sub.start(now);
    sub.stop(now + 1.205);
  };

  return sounds;
}

export default { meta, createSounds };
