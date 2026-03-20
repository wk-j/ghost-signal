// ═══════════════════════════════════════════════════════════════════
// DUNE BEACON — sounds.js
// Ancient-futuristic desert monolith audio theme — ES module
// ═══════════════════════════════════════════════════════════════════

const meta = {
  name: 'Dune Beacon',
  subtitle: 'Ancient-futuristic desert monolith — Web Audio API synthesis',
  colors: {
    accent:   '#D4A646',
    accent2:  '#E8C875',
    danger:   '#C45A2D',
    bg:       '#0A0E1A',
    surface:  '#141B2D',
    surface2: '#1E2840',
    border:   '#3A3525',
    text:     '#E8DCC8',
    textDim:  '#8A7E6A',
  },
  placeholder: 'Type to hear sand striking golden metal...',
  sounds: {
    HOVER:            { label: 'Hover',           meta: '70 ms / 600 Hz / triangle overtones',   desc: 'Spire proximity shimmer' },
    HOVER_UP:         { label: 'Hover Up',        meta: '55 ms / 500 Hz / triangle descent',     desc: 'Warmth retreating' },
    CLICK:            { label: 'Click',            meta: '40 ms / 700 Hz / sand + overtones',     desc: 'Golden stone tap' },
    IMPORTANT_CLICK:  { label: 'Important Click',  meta: '130 ms / 440 Hz / full filter bank',    desc: 'Monolith seal press' },
    FEATURE_SWITCH_ON:{ label: 'Feature Switch',   meta: 'ON 280 ms / OFF 260 ms — spire power cycle', desc: '' },
    LIMITER_ON:       { label: 'Limiter',          meta: 'ON 200 ms / OFF 190 ms — stone slab seal',   desc: '' },
    SWITCH_TOGGLE:    { label: 'Switch Toggle',    meta: '45 ms — golden micro-chime',                  desc: '' },
    TAB_INSERT:       { label: 'Tab Insert',       meta: '110 ms / 3 ascending chimes',          desc: 'Facet illuminating' },
    TAB_CLOSE:        { label: 'Tab Close',        meta: '95 ms / 3 descending chimes',          desc: 'Facet dimming' },
    TAB_SLASH:        { label: 'Tab Slash',        meta: '170 ms / 800 Hz / beacon ping',        desc: 'Beacon signal activate' },
    TYPING_LETTER:    { label: 'Typing Letter',    meta: '25 ms / 15 variants',                  desc: 'Sand grain on gold' },
    TYPING_BACKSPACE: { label: 'Typing Backspace',  meta: '30 ms / triangle descent',             desc: 'Sand retreating' },
    TYPING_ENTER:     { label: 'Typing Enter',     meta: '90 ms / full stack + sub',              desc: 'Command seal' },
    TYPING_SPACE:     { label: 'Typing Space',     meta: '30 ms / wind puff',                    desc: 'Desert gap' },
    APP_START:        { label: 'App Start',        meta: '1.4 s / overtone cascade',              desc: 'Spire awakening at dawn' },
  },
};

// ═══════════════════════════════════════════════════════════════════
// SONIC DNA — Dune Beacon
// ═══════════════════════════════════════════════════════════════════
// Primary waveform:    Triangle wave with harmonic overtone stacking —
//                      fundamental + 2nd + 3rd harmonics at decreasing
//                      amplitudes. Warm, bell-like golden metal resonance.
//
// Signature effect:    Parallel resonant bandpass filter bank — 3-4 narrow
//                      bandpass filters at harmonic intervals, simulating
//                      the body resonance of crystalline golden metal.
//
// Transient character: Sand-grain noise burst through lowpass, 10-15ms —
//                      soft granular onset like wind-blown sand particles.
//
// Envelope philosophy: Monumental decay — moderate attack (5-20ms), very
//                      long exponential release (200ms-2s). Sounds ring
//                      like struck metal across vast open desert.
//
// Frequency world:     Warm golden band 200Hz-2.5kHz, steep rolloff above
//                      3kHz. Desert-filtered warmth, no harsh brilliance.
//
// Every sound below must use at least one signature technique.
// If a sound could belong to any theme, it needs redesigning.
// ═══════════════════════════════════════════════════════════════════

function createSounds(ctx, noiseBuffer) {
  const sounds = {};

  // ---------------------------------------------------------------
  // 1. HOVER — spire proximity shimmer, 70 ms
  //    Sand-grain noise onset + triangle overtones through parallel
  //    bandpass bank. Warm golden shimmer like heat haze.
  //    DNA: Sand-grain transient, triangle overtones, filter bank
  // ---------------------------------------------------------------
  sounds.HOVER = function() {
    const now = ctx.currentTime;
    const dur = 0.07;

    // Sand-grain noise onset
    const nSrc = ctx.createBufferSource();
    nSrc.buffer = noiseBuffer(0.015);
    const nLp = ctx.createBiquadFilter();
    nLp.type = 'lowpass';
    nLp.frequency.value = 2000;
    nLp.Q.value = 1;
    const nG = ctx.createGain();
    nG.gain.setValueAtTime(0, now);
    nG.gain.linearRampToValueAtTime(0.06, now + 0.002);
    nG.gain.exponentialRampToValueAtTime(0.001, now + 0.012);
    nSrc.connect(nLp).connect(nG).connect(ctx.destination);
    nSrc.start(now); nSrc.stop(now + 0.015);

    // Triangle overtone stack — fundamental + 2nd harmonic
    const osc1 = ctx.createOscillator();
    osc1.type = 'triangle';
    osc1.frequency.value = 600;
    const osc2 = ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.value = 1200;

    // Parallel bandpass filter bank
    const bp1 = ctx.createBiquadFilter();
    bp1.type = 'bandpass';
    bp1.frequency.value = 800;
    bp1.Q.value = 10;
    const bp2 = ctx.createBiquadFilter();
    bp2.type = 'bandpass';
    bp2.frequency.value = 1400;
    bp2.Q.value = 8;

    // Merge node
    const merge = ctx.createGain();
    merge.gain.value = 1;

    // Output with warmth rolloff
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 2500;
    lp.Q.value = 1;

    const out = ctx.createGain();
    out.gain.setValueAtTime(0, now);
    out.gain.linearRampToValueAtTime(0.08, now + 0.005);
    out.gain.exponentialRampToValueAtTime(0.001, now + dur);

    // Osc1 through both filters
    const o1g = ctx.createGain();
    o1g.gain.value = 0.5;
    osc1.connect(o1g);
    o1g.connect(bp1).connect(merge);
    o1g.connect(bp2).connect(merge);

    // Osc2 at half volume through both filters
    const o2g = ctx.createGain();
    o2g.gain.value = 0.25;
    osc2.connect(o2g);
    o2g.connect(bp1);
    o2g.connect(bp2);

    merge.connect(lp).connect(out).connect(ctx.destination);

    osc1.start(now); osc1.stop(now + dur + 0.01);
    osc2.start(now); osc2.stop(now + dur + 0.01);
  };

  // ---------------------------------------------------------------
  // 2. HOVER_UP — warmth retreating, 55 ms
  //    Descending triangle overtones through narrowing bandpass.
  //    Filter bank attention withdraws.
  //    DNA: Triangle overtones, filter bank, monumental decay
  // ---------------------------------------------------------------
  sounds.HOVER_UP = function() {
    const now = ctx.currentTime;
    const dur = 0.055;

    // Descending triangle overtones
    const osc1 = ctx.createOscillator();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(600, now);
    osc1.frequency.linearRampToValueAtTime(400, now + dur);
    const osc2 = ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(1200, now);
    osc2.frequency.linearRampToValueAtTime(800, now + dur);

    // Single bandpass sweeping down
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.setValueAtTime(900, now);
    bp.frequency.linearRampToValueAtTime(600, now + dur);
    bp.Q.value = 10;

    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 2000;

    const out = ctx.createGain();
    out.gain.setValueAtTime(0.07, now);
    out.gain.exponentialRampToValueAtTime(0.001, now + dur);

    const mix = ctx.createGain();
    mix.gain.value = 1;

    const o1g = ctx.createGain();
    o1g.gain.value = 0.5;
    osc1.connect(o1g).connect(bp).connect(mix);
    const o2g = ctx.createGain();
    o2g.gain.value = 0.25;
    osc2.connect(o2g).connect(bp);

    mix.connect(lp).connect(out).connect(ctx.destination);

    osc1.start(now); osc1.stop(now + dur + 0.01);
    osc2.start(now); osc2.stop(now + dur + 0.01);
  };

  // ---------------------------------------------------------------
  // 3. CLICK — golden stone tap, 40 ms
  //    Sand-grain transient + triangle overtone body through
  //    parallel bandpass bank. Tactile and warm.
  //    DNA: Sand-grain transient, triangle overtones, filter bank
  // ---------------------------------------------------------------
  sounds.CLICK = function() {
    const now = ctx.currentTime;

    // Sand-grain transient
    const nSrc = ctx.createBufferSource();
    nSrc.buffer = noiseBuffer(0.01);
    const nLp = ctx.createBiquadFilter();
    nLp.type = 'lowpass';
    nLp.frequency.value = 1800;
    const nG = ctx.createGain();
    nG.gain.setValueAtTime(0.15, now);
    nG.gain.exponentialRampToValueAtTime(0.001, now + 0.008);
    nSrc.connect(nLp).connect(nG).connect(ctx.destination);
    nSrc.start(now); nSrc.stop(now + 0.012);

    // Triangle overtone stack — 3 harmonics
    const osc1 = ctx.createOscillator();
    osc1.type = 'triangle';
    osc1.frequency.value = 700;
    const osc2 = ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.value = 1400;
    const osc3 = ctx.createOscillator();
    osc3.type = 'triangle';
    osc3.frequency.value = 2100;

    // Parallel bandpass bank
    const bp1 = ctx.createBiquadFilter();
    bp1.type = 'bandpass';
    bp1.frequency.value = 900;
    bp1.Q.value = 12;
    const bp2 = ctx.createBiquadFilter();
    bp2.type = 'bandpass';
    bp2.frequency.value = 1600;
    bp2.Q.value = 10;

    const mix = ctx.createGain();
    mix.gain.value = 1;

    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 2500;

    const out = ctx.createGain();
    out.gain.setValueAtTime(0.14, now);
    out.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    // Route overtones through filter bank
    const g1 = ctx.createGain(); g1.gain.value = 0.5;
    const g2 = ctx.createGain(); g2.gain.value = 0.3;
    const g3 = ctx.createGain(); g3.gain.value = 0.15;

    osc1.connect(g1); g1.connect(bp1).connect(mix); g1.connect(bp2).connect(mix);
    osc2.connect(g2); g2.connect(bp1); g2.connect(bp2);
    osc3.connect(g3); g3.connect(bp1); g3.connect(bp2);

    mix.connect(lp).connect(out).connect(ctx.destination);

    osc1.start(now); osc1.stop(now + 0.045);
    osc2.start(now); osc2.stop(now + 0.045);
    osc3.start(now); osc3.stop(now + 0.045);
  };

  // ---------------------------------------------------------------
  // 4. IMPORTANT_CLICK — monolith seal press, 130 ms
  //    Heavy sand transient + full overtone stack through 3-filter
  //    bank + sub-bass foundation. Authoritative golden resonance.
  //    DNA: Sand-grain transient, triangle overtones, filter bank,
  //         monumental decay
  // ---------------------------------------------------------------
  sounds.IMPORTANT_CLICK = function() {
    const now = ctx.currentTime;

    // Sand-grain transient
    const nSrc = ctx.createBufferSource();
    nSrc.buffer = noiseBuffer(0.015);
    const nLp = ctx.createBiquadFilter();
    nLp.type = 'lowpass';
    nLp.frequency.value = 1500;
    const nG = ctx.createGain();
    nG.gain.setValueAtTime(0.18, now);
    nG.gain.exponentialRampToValueAtTime(0.001, now + 0.012);
    nSrc.connect(nLp).connect(nG).connect(ctx.destination);
    nSrc.start(now); nSrc.stop(now + 0.018);

    // Triangle overtone stack — 3 harmonics
    const osc1 = ctx.createOscillator();
    osc1.type = 'triangle';
    osc1.frequency.value = 440;
    const osc2 = ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.value = 880;
    const osc3 = ctx.createOscillator();
    osc3.type = 'triangle';
    osc3.frequency.value = 1320;

    // 3-filter bandpass bank
    const bp1 = ctx.createBiquadFilter();
    bp1.type = 'bandpass';
    bp1.frequency.value = 600;
    bp1.Q.value = 12;
    const bp2 = ctx.createBiquadFilter();
    bp2.type = 'bandpass';
    bp2.frequency.value = 1000;
    bp2.Q.value = 10;
    const bp3 = ctx.createBiquadFilter();
    bp3.type = 'bandpass';
    bp3.frequency.value = 1800;
    bp3.Q.value = 8;

    const mix = ctx.createGain();
    mix.gain.value = 1;

    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 2500;

    const out = ctx.createGain();
    out.gain.setValueAtTime(0, now);
    out.gain.linearRampToValueAtTime(0.20, now + 0.003);
    out.gain.setValueAtTime(0.20, now + 0.04);
    out.gain.exponentialRampToValueAtTime(0.001, now + 0.13);

    // Route overtones through filter bank
    const g1 = ctx.createGain(); g1.gain.value = 0.5;
    const g2 = ctx.createGain(); g2.gain.value = 0.35;
    const g3 = ctx.createGain(); g3.gain.value = 0.18;

    osc1.connect(g1); g1.connect(bp1).connect(mix); g1.connect(bp2).connect(mix); g1.connect(bp3).connect(mix);
    osc2.connect(g2); g2.connect(bp1); g2.connect(bp2); g2.connect(bp3);
    osc3.connect(g3); g3.connect(bp1); g3.connect(bp2); g3.connect(bp3);

    mix.connect(lp).connect(out).connect(ctx.destination);

    osc1.start(now); osc1.stop(now + 0.135);
    osc2.start(now); osc2.stop(now + 0.135);
    osc3.start(now); osc3.stop(now + 0.135);

    // Sub-bass foundation
    const sub = ctx.createOscillator();
    sub.type = 'sine';
    sub.frequency.value = 55;
    const sG = ctx.createGain();
    sG.gain.setValueAtTime(0.14, now);
    sG.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    sub.connect(sG).connect(ctx.destination);
    sub.start(now); sub.stop(now + 0.085);
  };

  // ---------------------------------------------------------------
  // 5. FEATURE_SWITCH_ON — spire powering up, 280 ms
  //    Ascending triangle overtones through widening filter bank.
  //    Golden energy climbing crystalline facets.
  //    DNA: Sand-grain transient, triangle overtones, filter bank,
  //         monumental decay
  // ---------------------------------------------------------------
  sounds.FEATURE_SWITCH_ON = function() {
    const now = ctx.currentTime;

    // Sand-grain onset
    const nSrc = ctx.createBufferSource();
    nSrc.buffer = noiseBuffer(0.02);
    const nLp = ctx.createBiquadFilter();
    nLp.type = 'lowpass';
    nLp.frequency.setValueAtTime(1000, now);
    nLp.frequency.linearRampToValueAtTime(2500, now + 0.015);
    const nG = ctx.createGain();
    nG.gain.setValueAtTime(0.10, now);
    nG.gain.exponentialRampToValueAtTime(0.001, now + 0.015);
    nSrc.connect(nLp).connect(nG).connect(ctx.destination);
    nSrc.start(now); nSrc.stop(now + 0.022);

    // Ascending triangle overtone sweep
    const osc1 = ctx.createOscillator();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(300, now);
    osc1.frequency.linearRampToValueAtTime(600, now + 0.25);
    const osc2 = ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(600, now);
    osc2.frequency.linearRampToValueAtTime(1200, now + 0.25);
    const osc3 = ctx.createOscillator();
    osc3.type = 'triangle';
    osc3.frequency.setValueAtTime(900, now);
    osc3.frequency.linearRampToValueAtTime(1800, now + 0.25);

    // Sweeping filter bank — widening
    const bp1 = ctx.createBiquadFilter();
    bp1.type = 'bandpass';
    bp1.Q.value = 10;
    bp1.frequency.setValueAtTime(400, now);
    bp1.frequency.linearRampToValueAtTime(800, now + 0.25);
    const bp2 = ctx.createBiquadFilter();
    bp2.type = 'bandpass';
    bp2.Q.value = 8;
    bp2.frequency.setValueAtTime(800, now);
    bp2.frequency.linearRampToValueAtTime(1400, now + 0.25);
    const bp3 = ctx.createBiquadFilter();
    bp3.type = 'bandpass';
    bp3.Q.value = 6;
    bp3.frequency.setValueAtTime(1200, now);
    bp3.frequency.linearRampToValueAtTime(2200, now + 0.25);

    const mix = ctx.createGain();
    mix.gain.value = 1;

    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 3000;

    const out = ctx.createGain();
    out.gain.setValueAtTime(0, now);
    out.gain.linearRampToValueAtTime(0.18, now + 0.02);
    out.gain.setValueAtTime(0.18, now + 0.18);
    out.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

    // Route all oscillators through all filters
    const g1 = ctx.createGain(); g1.gain.value = 0.45;
    const g2 = ctx.createGain(); g2.gain.value = 0.30;
    const g3 = ctx.createGain(); g3.gain.value = 0.15;

    osc1.connect(g1); g1.connect(bp1).connect(mix); g1.connect(bp2).connect(mix); g1.connect(bp3).connect(mix);
    osc2.connect(g2); g2.connect(bp1); g2.connect(bp2); g2.connect(bp3);
    osc3.connect(g3); g3.connect(bp1); g3.connect(bp2); g3.connect(bp3);

    mix.connect(lp).connect(out).connect(ctx.destination);

    osc1.start(now); osc1.stop(now + 0.29);
    osc2.start(now); osc2.stop(now + 0.29);
    osc3.start(now); osc3.stop(now + 0.29);
  };

  // ---------------------------------------------------------------
  // 6. FEATURE_SWITCH_OFF — spire powering down, 260 ms
  //    Descending triangle overtones, filter bank narrows.
  //    Energy draining with sand-grain tail.
  //    DNA: Triangle overtones, filter bank, sand-grain transient
  // ---------------------------------------------------------------
  sounds.FEATURE_SWITCH_OFF = function() {
    const now = ctx.currentTime;

    // Descending triangle overtone sweep
    const osc1 = ctx.createOscillator();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(600, now);
    osc1.frequency.linearRampToValueAtTime(250, now + 0.23);
    const osc2 = ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(1200, now);
    osc2.frequency.linearRampToValueAtTime(500, now + 0.23);
    const osc3 = ctx.createOscillator();
    osc3.type = 'triangle';
    osc3.frequency.setValueAtTime(1800, now);
    osc3.frequency.linearRampToValueAtTime(750, now + 0.23);

    // Narrowing filter bank
    const bp1 = ctx.createBiquadFilter();
    bp1.type = 'bandpass';
    bp1.Q.value = 10;
    bp1.frequency.setValueAtTime(800, now);
    bp1.frequency.linearRampToValueAtTime(400, now + 0.23);
    const bp2 = ctx.createBiquadFilter();
    bp2.type = 'bandpass';
    bp2.Q.value = 8;
    bp2.frequency.setValueAtTime(1400, now);
    bp2.frequency.linearRampToValueAtTime(600, now + 0.23);

    const mix = ctx.createGain();
    mix.gain.value = 1;

    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 2500;

    const out = ctx.createGain();
    out.gain.setValueAtTime(0.18, now);
    out.gain.exponentialRampToValueAtTime(0.001, now + 0.26);

    const g1 = ctx.createGain(); g1.gain.value = 0.45;
    const g2 = ctx.createGain(); g2.gain.value = 0.30;
    const g3 = ctx.createGain(); g3.gain.value = 0.15;

    osc1.connect(g1); g1.connect(bp1).connect(mix); g1.connect(bp2).connect(mix);
    osc2.connect(g2); g2.connect(bp1); g2.connect(bp2);
    osc3.connect(g3); g3.connect(bp1); g3.connect(bp2);

    mix.connect(lp).connect(out).connect(ctx.destination);

    osc1.start(now); osc1.stop(now + 0.27);
    osc2.start(now); osc2.stop(now + 0.27);
    osc3.start(now); osc3.stop(now + 0.27);

    // Sand-grain tail
    const nSrc = ctx.createBufferSource();
    nSrc.buffer = noiseBuffer(0.08);
    const nLp = ctx.createBiquadFilter();
    nLp.type = 'lowpass';
    nLp.frequency.value = 1200;
    const nG = ctx.createGain();
    nG.gain.setValueAtTime(0, now + 0.18);
    nG.gain.linearRampToValueAtTime(0.06, now + 0.20);
    nG.gain.exponentialRampToValueAtTime(0.001, now + 0.26);
    nSrc.connect(nLp).connect(nG).connect(ctx.destination);
    nSrc.start(now + 0.18); nSrc.stop(now + 0.27);
  };

  // ---------------------------------------------------------------
  // 7. LIMITER_ON — stone slab sealing, 200 ms
  //    Filter bank converges to single narrow resonance.
  //    Constrained, clamped golden tone.
  //    DNA: Sand-grain transient, triangle overtones, filter bank
  // ---------------------------------------------------------------
  sounds.LIMITER_ON = function() {
    const now = ctx.currentTime;

    // Sand-grain transient
    const nSrc = ctx.createBufferSource();
    nSrc.buffer = noiseBuffer(0.012);
    const nLp = ctx.createBiquadFilter();
    nLp.type = 'lowpass';
    nLp.frequency.value = 1500;
    const nG = ctx.createGain();
    nG.gain.setValueAtTime(0.12, now);
    nG.gain.exponentialRampToValueAtTime(0.001, now + 0.01);
    nSrc.connect(nLp).connect(nG).connect(ctx.destination);
    nSrc.start(now); nSrc.stop(now + 0.015);

    // Triangle overtones — 3rd harmonic fades early
    const osc1 = ctx.createOscillator();
    osc1.type = 'triangle';
    osc1.frequency.value = 500;
    const osc2 = ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.value = 1000;
    const osc3 = ctx.createOscillator();
    osc3.type = 'triangle';
    osc3.frequency.value = 1500;

    // Converging bandpass filters — start apart, meet at 800Hz
    const bp1 = ctx.createBiquadFilter();
    bp1.type = 'bandpass';
    bp1.frequency.setValueAtTime(600, now);
    bp1.frequency.linearRampToValueAtTime(800, now + 0.15);
    bp1.Q.setValueAtTime(10, now);
    bp1.Q.linearRampToValueAtTime(18, now + 0.15);
    const bp2 = ctx.createBiquadFilter();
    bp2.type = 'bandpass';
    bp2.frequency.setValueAtTime(1200, now);
    bp2.frequency.linearRampToValueAtTime(800, now + 0.15);
    bp2.Q.setValueAtTime(8, now);
    bp2.Q.linearRampToValueAtTime(18, now + 0.15);

    const mix = ctx.createGain();
    mix.gain.value = 1;

    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 2000;

    const out = ctx.createGain();
    out.gain.setValueAtTime(0, now);
    out.gain.linearRampToValueAtTime(0.15, now + 0.005);
    out.gain.setValueAtTime(0.15, now + 0.12);
    out.gain.exponentialRampToValueAtTime(0.001, now + 0.20);

    const g1 = ctx.createGain(); g1.gain.value = 0.45;
    const g2 = ctx.createGain(); g2.gain.value = 0.30;
    const g3 = ctx.createGain();
    g3.gain.setValueAtTime(0.15, now);
    g3.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc1.connect(g1); g1.connect(bp1).connect(mix); g1.connect(bp2).connect(mix);
    osc2.connect(g2); g2.connect(bp1); g2.connect(bp2);
    osc3.connect(g3); g3.connect(bp1); g3.connect(bp2);

    mix.connect(lp).connect(out).connect(ctx.destination);

    osc1.start(now); osc1.stop(now + 0.21);
    osc2.start(now); osc2.stop(now + 0.21);
    osc3.start(now); osc3.stop(now + 0.09);
  };

  // ---------------------------------------------------------------
  // 8. LIMITER_OFF — stone slab releasing, 190 ms
  //    Filter bank diverges from single clamped resonance.
  //    Expansion, freedom, warm air rushing in.
  //    DNA: Triangle overtones, filter bank, sand-grain transient
  // ---------------------------------------------------------------
  sounds.LIMITER_OFF = function() {
    const now = ctx.currentTime;

    // Triangle overtones
    const osc1 = ctx.createOscillator();
    osc1.type = 'triangle';
    osc1.frequency.value = 500;
    const osc2 = ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.value = 1000;

    // Diverging bandpass filters — start together, split apart
    const bp1 = ctx.createBiquadFilter();
    bp1.type = 'bandpass';
    bp1.frequency.setValueAtTime(800, now);
    bp1.frequency.linearRampToValueAtTime(500, now + 0.12);
    bp1.Q.setValueAtTime(18, now);
    bp1.Q.linearRampToValueAtTime(8, now + 0.12);
    const bp2 = ctx.createBiquadFilter();
    bp2.type = 'bandpass';
    bp2.frequency.setValueAtTime(800, now);
    bp2.frequency.linearRampToValueAtTime(1400, now + 0.12);
    bp2.Q.setValueAtTime(18, now);
    bp2.Q.linearRampToValueAtTime(8, now + 0.12);

    const mix = ctx.createGain();
    mix.gain.value = 1;

    // Opening lowpass — warmth returning
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(1500, now);
    lp.frequency.linearRampToValueAtTime(3000, now + 0.10);

    const out = ctx.createGain();
    out.gain.setValueAtTime(0.15, now);
    out.gain.exponentialRampToValueAtTime(0.001, now + 0.19);

    const g1 = ctx.createGain(); g1.gain.value = 0.45;
    const g2 = ctx.createGain(); g2.gain.value = 0.30;

    osc1.connect(g1); g1.connect(bp1).connect(mix); g1.connect(bp2).connect(mix);
    osc2.connect(g2); g2.connect(bp1); g2.connect(bp2);

    mix.connect(lp).connect(out).connect(ctx.destination);

    osc1.start(now); osc1.stop(now + 0.20);
    osc2.start(now); osc2.stop(now + 0.20);

    // Sand-grain burst — rush of released air/sand
    const nSrc = ctx.createBufferSource();
    nSrc.buffer = noiseBuffer(0.05);
    const nBp = ctx.createBiquadFilter();
    nBp.type = 'bandpass';
    nBp.frequency.value = 1200;
    nBp.Q.value = 2;
    const nG = ctx.createGain();
    nG.gain.setValueAtTime(0, now + 0.02);
    nG.gain.linearRampToValueAtTime(0.10, now + 0.03);
    nG.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    nSrc.connect(nBp).connect(nG).connect(ctx.destination);
    nSrc.start(now + 0.02); nSrc.stop(now + 0.09);
  };

  // ---------------------------------------------------------------
  // 9. SWITCH_TOGGLE — golden micro-chime, 45 ms
  //    Single triangle overtone through one resonant bandpass.
  //    Quick, clean ping — no noise, no filter bank.
  //    DNA: Triangle overtones (minimal)
  // ---------------------------------------------------------------
  sounds.SWITCH_TOGGLE = function() {
    const now = ctx.currentTime;

    // Triangle overtone pair
    const osc1 = ctx.createOscillator();
    osc1.type = 'triangle';
    osc1.frequency.value = 900;
    const osc2 = ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.value = 1800;

    // Single resonant bandpass — not a full bank
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 1200;
    bp.Q.value = 14;

    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 2500;

    const out = ctx.createGain();
    out.gain.setValueAtTime(0.12, now);
    out.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

    const g1 = ctx.createGain(); g1.gain.value = 0.5;
    const g2 = ctx.createGain(); g2.gain.value = 0.25;

    osc1.connect(g1).connect(bp);
    osc2.connect(g2).connect(bp);
    bp.connect(lp).connect(out).connect(ctx.destination);

    osc1.start(now); osc1.stop(now + 0.05);
    osc2.start(now); osc2.stop(now + 0.05);
  };

  // ---------------------------------------------------------------
  // 10. TAB_INSERT — facet illuminating, 110 ms
  //     Three ascending golden chimes — each richer than the last.
  //     Progressively more overtones through filter bank.
  //     DNA: Triangle overtones, filter bank
  // ---------------------------------------------------------------
  sounds.TAB_INSERT = function() {
    const now = ctx.currentTime;

    var steps = [
      { t: 0,     freq: 500,  harmonics: 1, bpFreq: 700,  dur: 0.03 },
      { t: 0.018, freq: 700,  harmonics: 2, bpFreq: 900,  dur: 0.03 },
      { t: 0.036, freq: 900,  harmonics: 3, bpFreq: 1200, dur: 0.04 },
    ];

    var lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 2800;

    steps.forEach(function(step) {
      var onset = now + step.t;

      // Bandpass for this step
      var bp = ctx.createBiquadFilter();
      bp.type = 'bandpass';
      bp.frequency.value = step.bpFreq;
      bp.Q.value = 10;

      var g = ctx.createGain();
      g.gain.setValueAtTime(0.12 + step.harmonics * 0.02, onset);
      g.gain.exponentialRampToValueAtTime(0.001, onset + step.dur);

      // Create overtones for this step
      for (var h = 0; h < step.harmonics; h++) {
        var osc = ctx.createOscillator();
        osc.type = 'triangle';
        osc.frequency.value = step.freq * (h + 1);
        var hG = ctx.createGain();
        hG.gain.value = 0.4 / (h + 1);
        osc.connect(hG).connect(bp);
        osc.start(onset); osc.stop(onset + step.dur + 0.005);
      }

      bp.connect(g).connect(lp).connect(ctx.destination);
    });
  };

  // ---------------------------------------------------------------
  // 11. TAB_CLOSE — facet dimming, 95 ms
  //     Three descending chimes — each loses harmonics.
  //     Filter bank narrows. Sand-grain tail.
  //     DNA: Triangle overtones, filter bank, sand-grain transient
  // ---------------------------------------------------------------
  sounds.TAB_CLOSE = function() {
    const now = ctx.currentTime;

    var steps = [
      { t: 0,     freq: 900,  harmonics: 3, bpFreq: 1200, dur: 0.025 },
      { t: 0.015, freq: 700,  harmonics: 2, bpFreq: 900,  dur: 0.025 },
      { t: 0.030, freq: 400,  harmonics: 1, bpFreq: 600,  dur: 0.035 },
    ];

    var lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 2500;

    steps.forEach(function(step) {
      var onset = now + step.t;

      var bp = ctx.createBiquadFilter();
      bp.type = 'bandpass';
      bp.frequency.value = step.bpFreq;
      bp.Q.value = 10;

      var g = ctx.createGain();
      g.gain.setValueAtTime(0.14 - step.t * 0.8, onset);
      g.gain.exponentialRampToValueAtTime(0.001, onset + step.dur);

      for (var h = 0; h < step.harmonics; h++) {
        var osc = ctx.createOscillator();
        osc.type = 'triangle';
        osc.frequency.value = step.freq * (h + 1);
        var hG = ctx.createGain();
        hG.gain.value = 0.4 / (h + 1);
        osc.connect(hG).connect(bp);
        osc.start(onset); osc.stop(onset + step.dur + 0.005);
      }

      bp.connect(g).connect(lp).connect(ctx.destination);
    });

    // Sand-grain tail
    const nSrc = ctx.createBufferSource();
    nSrc.buffer = noiseBuffer(0.05);
    const nLp = ctx.createBiquadFilter();
    nLp.type = 'lowpass';
    nLp.frequency.value = 800;
    const nG = ctx.createGain();
    nG.gain.setValueAtTime(0, now + 0.05);
    nG.gain.linearRampToValueAtTime(0.04, now + 0.06);
    nG.gain.exponentialRampToValueAtTime(0.001, now + 0.095);
    nSrc.connect(nLp).connect(nG).connect(ctx.destination);
    nSrc.start(now + 0.05); nSrc.stop(now + 0.10);
  };

  // ---------------------------------------------------------------
  // 12. TAB_SLASH — beacon signal activate, 170 ms
  //     Bright golden ping — full overtone stack through complete
  //     filter bank with long monumental ring-out.
  //     DNA: Sand-grain transient, triangle overtones, filter bank,
  //          monumental decay
  // ---------------------------------------------------------------
  sounds.TAB_SLASH = function() {
    const now = ctx.currentTime;

    // Sand-grain onset
    const nSrc = ctx.createBufferSource();
    nSrc.buffer = noiseBuffer(0.012);
    const nLp = ctx.createBiquadFilter();
    nLp.type = 'lowpass';
    nLp.frequency.value = 2000;
    const nG = ctx.createGain();
    nG.gain.setValueAtTime(0.10, now);
    nG.gain.exponentialRampToValueAtTime(0.001, now + 0.01);
    nSrc.connect(nLp).connect(nG).connect(ctx.destination);
    nSrc.start(now); nSrc.stop(now + 0.015);

    // Full triangle overtone stack
    const osc1 = ctx.createOscillator();
    osc1.type = 'triangle';
    osc1.frequency.value = 800;
    const osc2 = ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.value = 1600;
    const osc3 = ctx.createOscillator();
    osc3.type = 'triangle';
    osc3.frequency.value = 2400;

    // Full filter bank
    const bp1 = ctx.createBiquadFilter();
    bp1.type = 'bandpass';
    bp1.frequency.value = 900;
    bp1.Q.value = 12;
    const bp2 = ctx.createBiquadFilter();
    bp2.type = 'bandpass';
    bp2.frequency.value = 1400;
    bp2.Q.value = 10;
    const bp3 = ctx.createBiquadFilter();
    bp3.type = 'bandpass';
    bp3.frequency.value = 2000;
    bp3.Q.value = 8;

    const mix = ctx.createGain();
    mix.gain.value = 1;

    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 2800;

    const out = ctx.createGain();
    out.gain.setValueAtTime(0, now);
    out.gain.linearRampToValueAtTime(0.18, now + 0.003);
    out.gain.exponentialRampToValueAtTime(0.001, now + 0.17);

    const g1 = ctx.createGain(); g1.gain.value = 0.5;
    const g2 = ctx.createGain(); g2.gain.value = 0.3;
    const g3 = ctx.createGain(); g3.gain.value = 0.15;

    osc1.connect(g1); g1.connect(bp1).connect(mix); g1.connect(bp2).connect(mix); g1.connect(bp3).connect(mix);
    osc2.connect(g2); g2.connect(bp1); g2.connect(bp2); g2.connect(bp3);
    osc3.connect(g3); g3.connect(bp1); g3.connect(bp2); g3.connect(bp3);

    mix.connect(lp).connect(out).connect(ctx.destination);

    osc1.start(now); osc1.stop(now + 0.175);
    osc2.start(now); osc2.stop(now + 0.175);
    osc3.start(now); osc3.stop(now + 0.175);
  };

  // ---------------------------------------------------------------
  // 13. TYPING_LETTER — sand grain on gold, 25 ms (15 variants)
  //     Each keystroke: micro sand-noise transient + randomized
  //     triangle overtone through single randomized bandpass.
  //     DNA: Sand-grain transient, triangle overtones
  // ---------------------------------------------------------------
  sounds.TYPING_LETTER = function() {
    const now = ctx.currentTime;

    // 15 unique frequency variants
    const variant = Math.floor(Math.random() * 15);
    const baseFreq = 800 + variant * 60;
    const bpCentre = baseFreq * 1.3 + (Math.random() - 0.5) * 200;

    // Sand-grain tap
    const nSrc = ctx.createBufferSource();
    nSrc.buffer = noiseBuffer(0.008);
    const nLp = ctx.createBiquadFilter();
    nLp.type = 'lowpass';
    nLp.frequency.value = 2000;
    const nG = ctx.createGain();
    nG.gain.setValueAtTime(0.08, now);
    nG.gain.exponentialRampToValueAtTime(0.001, now + 0.006);
    nSrc.connect(nLp).connect(nG).connect(ctx.destination);
    nSrc.start(now); nSrc.stop(now + 0.01);

    // Triangle overtone body
    const osc1 = ctx.createOscillator();
    osc1.type = 'triangle';
    osc1.frequency.value = baseFreq;
    const osc2 = ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.value = baseFreq * 2;

    // Single randomized bandpass
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = bpCentre;
    bp.Q.value = 10;

    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 2500;

    const out = ctx.createGain();
    out.gain.setValueAtTime(0.10, now);
    out.gain.exponentialRampToValueAtTime(0.001, now + 0.02);

    const g1 = ctx.createGain(); g1.gain.value = 0.5;
    const g2 = ctx.createGain(); g2.gain.value = 0.2;
    osc1.connect(g1).connect(bp);
    osc2.connect(g2).connect(bp);
    bp.connect(lp).connect(out).connect(ctx.destination);

    osc1.start(now); osc1.stop(now + 0.025);
    osc2.start(now); osc2.stop(now + 0.025);
  };

  // ---------------------------------------------------------------
  // 14. TYPING_BACKSPACE — sand retreating, 30 ms
  //     Lower, softer descending triangle. No noise — clean
  //     retraction. Muffled lowpass.
  //     DNA: Triangle overtones
  // ---------------------------------------------------------------
  sounds.TYPING_BACKSPACE = function() {
    const now = ctx.currentTime;

    // Descending triangle overtones
    const osc1 = ctx.createOscillator();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(500, now);
    osc1.frequency.linearRampToValueAtTime(400, now + 0.025);
    const osc2 = ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(1000, now);
    osc2.frequency.linearRampToValueAtTime(800, now + 0.025);

    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 700;
    bp.Q.value = 8;

    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 1800;

    const out = ctx.createGain();
    out.gain.setValueAtTime(0.09, now);
    out.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

    const g1 = ctx.createGain(); g1.gain.value = 0.5;
    const g2 = ctx.createGain(); g2.gain.value = 0.25;
    osc1.connect(g1).connect(bp);
    osc2.connect(g2).connect(bp);
    bp.connect(lp).connect(out).connect(ctx.destination);

    osc1.start(now); osc1.stop(now + 0.035);
    osc2.start(now); osc2.stop(now + 0.035);
  };

  // ---------------------------------------------------------------
  // 15. TYPING_ENTER — command seal, 90 ms
  //     Heaviest key — full overtone stack through complete filter
  //     bank with sub-bass. Miniature spire power.
  //     DNA: Sand-grain transient, triangle overtones, filter bank
  // ---------------------------------------------------------------
  sounds.TYPING_ENTER = function() {
    const now = ctx.currentTime;

    // Sand-grain transient
    const nSrc = ctx.createBufferSource();
    nSrc.buffer = noiseBuffer(0.012);
    const nLp = ctx.createBiquadFilter();
    nLp.type = 'lowpass';
    nLp.frequency.value = 1500;
    const nG = ctx.createGain();
    nG.gain.setValueAtTime(0.14, now);
    nG.gain.exponentialRampToValueAtTime(0.001, now + 0.01);
    nSrc.connect(nLp).connect(nG).connect(ctx.destination);
    nSrc.start(now); nSrc.stop(now + 0.015);

    // Triangle overtone stack
    const osc1 = ctx.createOscillator();
    osc1.type = 'triangle';
    osc1.frequency.value = 400;
    const osc2 = ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.value = 800;
    const osc3 = ctx.createOscillator();
    osc3.type = 'triangle';
    osc3.frequency.value = 1200;

    // 3-filter bank
    const bp1 = ctx.createBiquadFilter();
    bp1.type = 'bandpass';
    bp1.frequency.value = 550;
    bp1.Q.value = 12;
    const bp2 = ctx.createBiquadFilter();
    bp2.type = 'bandpass';
    bp2.frequency.value = 900;
    bp2.Q.value = 10;
    const bp3 = ctx.createBiquadFilter();
    bp3.type = 'bandpass';
    bp3.frequency.value = 1400;
    bp3.Q.value = 8;

    const mix = ctx.createGain();
    mix.gain.value = 1;

    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 2500;

    const out = ctx.createGain();
    out.gain.setValueAtTime(0.16, now);
    out.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    const g1 = ctx.createGain(); g1.gain.value = 0.5;
    const g2 = ctx.createGain(); g2.gain.value = 0.3;
    const g3 = ctx.createGain(); g3.gain.value = 0.15;

    osc1.connect(g1); g1.connect(bp1).connect(mix); g1.connect(bp2).connect(mix); g1.connect(bp3).connect(mix);
    osc2.connect(g2); g2.connect(bp1); g2.connect(bp2); g2.connect(bp3);
    osc3.connect(g3); g3.connect(bp1); g3.connect(bp2); g3.connect(bp3);

    mix.connect(lp).connect(out).connect(ctx.destination);

    osc1.start(now); osc1.stop(now + 0.095);
    osc2.start(now); osc2.stop(now + 0.095);
    osc3.start(now); osc3.stop(now + 0.095);

    // Sub-bass
    const sub = ctx.createOscillator();
    sub.type = 'sine';
    sub.frequency.value = 60;
    const sG = ctx.createGain();
    sG.gain.setValueAtTime(0.12, now);
    sG.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
    sub.connect(sG).connect(ctx.destination);
    sub.start(now); sub.stop(now + 0.055);
  };

  // ---------------------------------------------------------------
  // 16. TYPING_SPACE — desert gap, 30 ms
  //     Broad, hollow — wider bandpass, more noise, less tone.
  //     Like wind across an open space between words.
  //     DNA: Sand-grain transient (dominant), triangle overtones
  // ---------------------------------------------------------------
  sounds.TYPING_SPACE = function() {
    const now = ctx.currentTime;

    // Sand-grain dominant
    const nSrc = ctx.createBufferSource();
    nSrc.buffer = noiseBuffer(0.03);
    const nBp = ctx.createBiquadFilter();
    nBp.type = 'bandpass';
    nBp.frequency.value = 1000;
    nBp.Q.value = 1.5;
    const nG = ctx.createGain();
    nG.gain.setValueAtTime(0.10, now);
    nG.gain.exponentialRampToValueAtTime(0.001, now + 0.025);
    nSrc.connect(nBp).connect(nG).connect(ctx.destination);
    nSrc.start(now); nSrc.stop(now + 0.032);

    // Quiet triangle body
    const osc = ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.value = 600;
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 800;
    bp.Q.value = 3;
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 2000;
    const out = ctx.createGain();
    out.gain.setValueAtTime(0.04, now);
    out.gain.exponentialRampToValueAtTime(0.001, now + 0.02);
    osc.connect(bp).connect(lp).connect(out).connect(ctx.destination);
    osc.start(now); osc.stop(now + 0.032);
  };

  // ---------------------------------------------------------------
  // 17. APP_START — spire awakening at dawn, 1400 ms
  //     Full DNA showcase: desert wind noise, triangle overtone
  //     cascade entering one by one, sweeping filter bank, sub-bass
  //     tectonic rumble, LFO heat-haze shimmer.
  //     DNA: All five techniques
  // ---------------------------------------------------------------
  sounds.APP_START = function() {
    const now = ctx.currentTime;

    // === Layer 1: Desert wind — noise through sweeping bandpass ===
    const windSrc = ctx.createBufferSource();
    windSrc.buffer = noiseBuffer(1.5);
    const windBp = ctx.createBiquadFilter();
    windBp.type = 'bandpass';
    windBp.Q.value = 2;
    windBp.frequency.setValueAtTime(400, now);
    windBp.frequency.linearRampToValueAtTime(1200, now + 0.6);
    windBp.frequency.linearRampToValueAtTime(600, now + 1.4);
    const windG = ctx.createGain();
    windG.gain.setValueAtTime(0, now);
    windG.gain.linearRampToValueAtTime(0.08, now + 0.3);
    windG.gain.setValueAtTime(0.08, now + 0.8);
    windG.gain.exponentialRampToValueAtTime(0.001, now + 1.4);
    windSrc.connect(windBp).connect(windG).connect(ctx.destination);
    windSrc.start(now); windSrc.stop(now + 1.45);

    // === Layer 2: Triangle overtone cascade ===
    // Each overtone enters sequentially — building the spire's hum
    const harmonics = [
      { freq: 165, enter: 0,    gain: 0.14 },
      { freq: 330, enter: 0.2,  gain: 0.10 },
      { freq: 495, enter: 0.4,  gain: 0.07 },
      { freq: 660, enter: 0.6,  gain: 0.04 },
    ];

    // Sweeping parallel bandpass bank
    const fbk1 = ctx.createBiquadFilter();
    fbk1.type = 'bandpass';
    fbk1.Q.value = 10;
    fbk1.frequency.setValueAtTime(220, now);
    fbk1.frequency.linearRampToValueAtTime(330, now + 0.8);
    fbk1.frequency.linearRampToValueAtTime(220, now + 1.4);
    const fbk2 = ctx.createBiquadFilter();
    fbk2.type = 'bandpass';
    fbk2.Q.value = 8;
    fbk2.frequency.setValueAtTime(440, now);
    fbk2.frequency.linearRampToValueAtTime(660, now + 0.8);
    fbk2.frequency.linearRampToValueAtTime(440, now + 1.4);
    const fbk3 = ctx.createBiquadFilter();
    fbk3.type = 'bandpass';
    fbk3.Q.value = 6;
    fbk3.frequency.setValueAtTime(660, now);
    fbk3.frequency.linearRampToValueAtTime(990, now + 0.8);
    fbk3.frequency.linearRampToValueAtTime(660, now + 1.4);
    const fbk4 = ctx.createBiquadFilter();
    fbk4.type = 'bandpass';
    fbk4.Q.value = 5;
    fbk4.frequency.setValueAtTime(880, now);
    fbk4.frequency.linearRampToValueAtTime(1320, now + 0.8);
    fbk4.frequency.linearRampToValueAtTime(880, now + 1.4);

    const cascadeMix = ctx.createGain();
    cascadeMix.gain.value = 1;

    // Output lowpass — sweeps open then back
    const masterLp = ctx.createBiquadFilter();
    masterLp.type = 'lowpass';
    masterLp.frequency.setValueAtTime(1500, now);
    masterLp.frequency.linearRampToValueAtTime(2800, now + 0.7);
    masterLp.frequency.linearRampToValueAtTime(2000, now + 1.4);

    const masterG = ctx.createGain();
    masterG.gain.setValueAtTime(0, now);
    masterG.gain.linearRampToValueAtTime(0.14, now + 0.2);
    masterG.gain.setValueAtTime(0.14, now + 0.7);
    masterG.gain.exponentialRampToValueAtTime(0.001, now + 1.4);

    harmonics.forEach(function(h) {
      var osc = ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.value = h.freq;

      var hG = ctx.createGain();
      hG.gain.setValueAtTime(0, now + h.enter);
      hG.gain.linearRampToValueAtTime(h.gain, now + h.enter + 0.15);
      hG.gain.setValueAtTime(h.gain, now + 0.7);
      hG.gain.exponentialRampToValueAtTime(0.001, now + 1.4);

      osc.connect(hG);
      hG.connect(fbk1).connect(cascadeMix);
      hG.connect(fbk2).connect(cascadeMix);
      hG.connect(fbk3).connect(cascadeMix);
      hG.connect(fbk4).connect(cascadeMix);

      osc.start(now + h.enter); osc.stop(now + 1.45);
    });

    cascadeMix.connect(masterLp).connect(masterG).connect(ctx.destination);

    // === Layer 3: Sub-bass tectonic rumble ===
    const sub = ctx.createOscillator();
    sub.type = 'sine';
    sub.frequency.value = 55;
    const sG = ctx.createGain();
    sG.gain.setValueAtTime(0, now);
    sG.gain.linearRampToValueAtTime(0.12, now + 0.4);
    sG.gain.exponentialRampToValueAtTime(0.001, now + 1.0);
    sub.connect(sG).connect(ctx.destination);
    sub.start(now); sub.stop(now + 1.05);

    // === Layer 4: LFO heat-haze shimmer ===
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 3;
    const lfoG = ctx.createGain();
    lfoG.gain.value = 0.02;
    lfo.connect(lfoG).connect(masterG.gain);
    lfo.start(now); lfo.stop(now + 1.45);
  };

  return sounds;
}

export default { meta, createSounds };
