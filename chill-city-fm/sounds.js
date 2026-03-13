// ═══════════════════════════════════════════════════════════════════
// CHILL CITY FM — sounds.js
// Warm lo-fi retro analog audio theme — ES module
// ═══════════════════════════════════════════════════════════════════

const meta = {
  name: 'Chill City FM',
  subtitle: 'Warm lo-fi retro audio theme \u2014 Web Audio API synthesis',
  colors: {
    accent:   '#E8A849',
    accent2:  '#5CB8E4',
    danger:   '#C94A4A',
    bg:       '#1A1410',
    surface:  '#231E18',
    surface2: '#2E2720',
    border:   '#3D3429',
    text:     '#E8DDD0',
    textDim:  '#8A7D6E',
  },
  placeholder: 'Start typing to hear vintage keyboard sounds... like writing a late-night letter by lamplight',
  sounds: {
    HOVER:            { label: 'Hover',          meta: '70 ms / 1.4 kHz / sine sweep',      desc: 'VCR head brushing tape' },
    HOVER_UP:         { label: 'Hover Up',       meta: '55 ms / 1.8 kHz / sine sweep',      desc: 'Tape head lifting off' },
    CLICK:            { label: 'Click',           meta: '40 ms / 600 Hz / triangle pop',     desc: 'Boombox button press' },
    IMPORTANT_CLICK:  { label: 'Important Click', meta: '140 ms / 320 Hz / triangle body',   desc: 'VHS tape loading into VCR' },
    FEATURE_SWITCH_ON:{ label: 'Feature Switch',  meta: 'ON 280 ms / OFF 260 ms \u2014 CRT power cycle',      desc: '' },
    LIMITER_ON:       { label: 'Limiter',         meta: 'ON 220 ms / OFF 210 ms \u2014 cassette record engage', desc: '' },
    SWITCH_TOGGLE:    { label: 'Switch Toggle',   meta: '45 ms \u2014 stereo receiver toggle',                 desc: '' },
    TAB_INSERT:       { label: 'Tab Insert',      meta: '110 ms / 3 ascending blips',        desc: 'FM station tuning in' },
    TAB_CLOSE:        { label: 'Tab Close',       meta: '95 ms / 3 descending blips',        desc: 'FM signal lost' },
    TAB_SLASH:        { label: 'Tab Slash',       meta: '180 ms / 1200 Hz / triangle ping',  desc: 'NES power-on chime' },
    TYPING_LETTER:    { label: 'Typing Letter',   meta: '30 ms / 16 variants',               desc: 'Vintage typewriter tack' },
    TYPING_BACKSPACE: { label: 'Typing Backspace', meta: '35 ms / triangle pulse',           desc: 'Carriage pull-back thock' },
    TYPING_ENTER:     { label: 'Typing Enter',    meta: '90 ms / ding + chunk',              desc: 'Carriage return' },
    TYPING_SPACE:     { label: 'Typing Space',    meta: '35 ms / woody thump',               desc: 'Space bar thump' },
    APP_START:        { label: 'App Start',       meta: '1.3 s / warm drone + minor third',  desc: 'Late-night signal fading in' },
  },
};

// ═══════════════════════════════════════════════════════════════════
// SONIC DNA — Chill City FM
// ═══════════════════════════════════════════════════════════════════
//
// 1. PRIMARY WAVEFORM: Detuned triangle/sine pairs — two slightly
//    detuned oscillators creating chorus/beating effect
//
// 2. SIGNATURE EFFECT: Chorus beating + tape wobble LFO — slow pitch
//    modulation on one of the pair creates warm analog character
//
// 3. TRANSIENT CHARACTER: Soft noise crackle onset — no sharp attacks,
//    sounds begin with a tiny noise "crackle" like vinyl or tape
//
// 4. ENVELOPE PHILOSOPHY: Medium, warm, wobbly — gently rounded
//    envelopes with slight LFO modulation, nothing percussive
//
// 5. FREQUENCY WORLD: LP-capped at 3-4 kHz — aggressive low-pass
//    filtering, nothing bright, everything muffled and warm
//
// ═══════════════════════════════════════════════════════════════════

function createSounds(ctx, noiseBuffer) {
  const sounds = {};

  // ---------------------------------------------------------------
  // 1. HOVER — detuned pair sweep, tape wobble LFO, LP 3 kHz, 70 ms
  // Topology: tri+sine → LP → gain → dest / LFO → tri.freq
  // ---------------------------------------------------------------
  sounds.HOVER = function() {
    const now = ctx.currentTime;
    const dur = 0.07;

    // Detuned triangle pair — 3 Hz beating
    const tri = ctx.createOscillator();
    tri.type = 'triangle';
    tri.frequency.setValueAtTime(1400, now);
    tri.frequency.linearRampToValueAtTime(1800, now + dur);

    const sine = ctx.createOscillator();
    sine.type = 'sine';
    sine.frequency.setValueAtTime(1403, now);
    sine.frequency.linearRampToValueAtTime(1803, now + dur);

    // Tape wobble LFO on triangle pitch
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 4.5;
    const lfoG = ctx.createGain();
    lfoG.gain.value = 6;
    lfo.connect(lfoG).connect(tri.frequency);

    // Aggressive LP cap
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 3000;
    lp.Q.value = 2;

    // Warm rounded envelope
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.09, now + 0.012);
    gain.gain.linearRampToValueAtTime(0.07, now + 0.04);
    gain.gain.linearRampToValueAtTime(0, now + dur);

    const mix = ctx.createGain();
    mix.gain.value = 0.7;

    tri.connect(lp);
    sine.connect(mix).connect(lp);
    lp.connect(gain).connect(ctx.destination);

    tri.start(now); tri.stop(now + dur + 0.01);
    sine.start(now); sine.stop(now + dur + 0.01);
    lfo.start(now); lfo.stop(now + dur + 0.01);
  };

  // ---------------------------------------------------------------
  // 2. HOVER_UP — detuned pair descent, diverging detune, 55 ms
  // Topology: tri+sine → LP → gain → dest (detune widens)
  // ---------------------------------------------------------------
  sounds.HOVER_UP = function() {
    const now = ctx.currentTime;
    const dur = 0.055;

    // Detuned pair descending — "losing the signal"
    const tri = ctx.createOscillator();
    tri.type = 'triangle';
    tri.frequency.setValueAtTime(1800, now);
    tri.frequency.linearRampToValueAtTime(1200, now + dur);

    // Sine starts close (2 Hz detune) but diverges to 12 Hz
    const sine = ctx.createOscillator();
    sine.type = 'sine';
    sine.frequency.setValueAtTime(1802, now);
    sine.frequency.linearRampToValueAtTime(1212, now + dur);

    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(3000, now);
    lp.frequency.linearRampToValueAtTime(2000, now + dur);
    lp.Q.value = 1.5;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.08, now + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.001, now + dur);

    const mix = ctx.createGain();
    mix.gain.value = 0.6;

    tri.connect(lp);
    sine.connect(mix).connect(lp);
    lp.connect(gain).connect(ctx.destination);

    tri.start(now); tri.stop(now + dur + 0.01);
    sine.start(now); sine.stop(now + dur + 0.01);
  };

  // ---------------------------------------------------------------
  // 3. CLICK — vinyl crackle pop, noise-before-tone, LP 3.5 kHz, 40 ms
  // Topology: noise → LP(2k) → nG → dest / tri+sine → LP(3.5k) → oG → dest
  // ---------------------------------------------------------------
  sounds.CLICK = function() {
    const now = ctx.currentTime;

    // Vinyl crackle onset — noise BEFORE the tone
    const nSrc = ctx.createBufferSource();
    nSrc.buffer = noiseBuffer(0.008);
    const nLp = ctx.createBiquadFilter();
    nLp.type = 'lowpass';
    nLp.frequency.value = 2000;
    const nG = ctx.createGain();
    nG.gain.setValueAtTime(0.20, now);
    nG.gain.exponentialRampToValueAtTime(0.001, now + 0.006);
    nSrc.connect(nLp).connect(nG).connect(ctx.destination);
    nSrc.start(now);
    nSrc.stop(now + 0.008);

    // Detuned triangle pops — after the crackle
    const tri = ctx.createOscillator();
    tri.type = 'triangle';
    tri.frequency.value = 600;

    const sine = ctx.createOscillator();
    sine.type = 'triangle';
    sine.frequency.value = 604;

    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 3500;
    lp.Q.value = 1;

    const oG = ctx.createGain();
    oG.gain.setValueAtTime(0, now + 0.004);
    oG.gain.linearRampToValueAtTime(0.22, now + 0.007);
    oG.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

    const mix = ctx.createGain();
    mix.gain.value = 0.5;

    tri.connect(lp);
    sine.connect(mix).connect(lp);
    lp.connect(oG).connect(ctx.destination);

    tri.start(now + 0.004); tri.stop(now + 0.04);
    sine.start(now + 0.004); sine.stop(now + 0.04);
  };

  // ---------------------------------------------------------------
  // 4. IMPORTANT_CLICK — cabinet thump, detuned body + sub, 140 ms
  // Topology: noise → BP(1.5k) → nG → dest /
  //           tri(280)+sine(283) → LP(2k, Q=4) → bG → dest /
  //           sine(55) → sG → dest
  // ---------------------------------------------------------------
  sounds.IMPORTANT_CLICK = function() {
    const now = ctx.currentTime;

    // Vinyl crackle onset
    const nSrc = ctx.createBufferSource();
    nSrc.buffer = noiseBuffer(0.012);
    const nBp = ctx.createBiquadFilter();
    nBp.type = 'bandpass';
    nBp.frequency.value = 1500;
    nBp.Q.value = 2;
    const nG = ctx.createGain();
    nG.gain.setValueAtTime(0.18, now);
    nG.gain.exponentialRampToValueAtTime(0.001, now + 0.01);
    nSrc.connect(nBp).connect(nG).connect(ctx.destination);
    nSrc.start(now);
    nSrc.stop(now + 0.015);

    // Detuned pair body — 3 Hz beating at 280 Hz
    const tri = ctx.createOscillator();
    tri.type = 'triangle';
    tri.frequency.value = 280;

    const sine = ctx.createOscillator();
    sine.type = 'sine';
    sine.frequency.value = 283;

    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 2000;
    lp.Q.value = 4;

    const bG = ctx.createGain();
    bG.gain.setValueAtTime(0, now + 0.005);
    bG.gain.linearRampToValueAtTime(0.24, now + 0.015);
    bG.gain.setValueAtTime(0.24, now + 0.06);
    bG.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

    const mix = ctx.createGain();
    mix.gain.value = 0.5;

    tri.connect(lp);
    sine.connect(mix).connect(lp);
    lp.connect(bG).connect(ctx.destination);

    tri.start(now + 0.005); tri.stop(now + 0.15);
    sine.start(now + 0.005); sine.stop(now + 0.15);

    // Sub-bass
    const sub = ctx.createOscillator();
    sub.type = 'sine';
    sub.frequency.value = 55;
    const sG = ctx.createGain();
    sG.gain.setValueAtTime(0.15, now + 0.005);
    sG.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    sub.connect(sG).connect(ctx.destination);
    sub.start(now + 0.005);
    sub.stop(now + 0.09);
  };

  // ---------------------------------------------------------------
  // 5. FEATURE_SWITCH_ON — tape motor startup, 300 ms
  // Topology: tri+sine → LP(3k) → gain → dest /
  //           LFO(8→2 Hz) → tri.freq / noise → BP → nG → dest
  // ---------------------------------------------------------------
  sounds.FEATURE_SWITCH_ON = function() {
    const now = ctx.currentTime;

    // Vinyl crackle layer underneath
    const nSrc = ctx.createBufferSource();
    nSrc.buffer = noiseBuffer(0.25);
    const nBp = ctx.createBiquadFilter();
    nBp.type = 'bandpass';
    nBp.frequency.value = 1200;
    nBp.Q.value = 1.5;
    const nLp = ctx.createBiquadFilter();
    nLp.type = 'lowpass';
    nLp.frequency.value = 2500;
    const nG = ctx.createGain();
    nG.gain.setValueAtTime(0.06, now);
    nG.gain.linearRampToValueAtTime(0.03, now + 0.15);
    nG.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
    nSrc.connect(nBp).connect(nLp).connect(nG).connect(ctx.destination);
    nSrc.start(now);
    nSrc.stop(now + 0.30);

    // Detuned pair ascending — motor starting up
    const tri = ctx.createOscillator();
    tri.type = 'triangle';
    tri.frequency.setValueAtTime(180, now);
    tri.frequency.exponentialRampToValueAtTime(520, now + 0.26);

    const sine = ctx.createOscillator();
    sine.type = 'sine';
    sine.frequency.setValueAtTime(183, now);
    sine.frequency.exponentialRampToValueAtTime(523, now + 0.26);

    // Tape wobble LFO — starts fast (8 Hz), slows to 2 Hz (motor reaching speed)
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(8, now);
    lfo.frequency.exponentialRampToValueAtTime(2, now + 0.26);
    const lfoG = ctx.createGain();
    lfoG.gain.value = 12;
    lfo.connect(lfoG).connect(tri.frequency);

    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 3000;
    lp.Q.value = 2;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.06);
    gain.gain.setValueAtTime(0.18, now + 0.20);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.30);

    const mix = ctx.createGain();
    mix.gain.value = 0.5;

    tri.connect(lp);
    sine.connect(mix).connect(lp);
    lp.connect(gain).connect(ctx.destination);

    tri.start(now); tri.stop(now + 0.31);
    sine.start(now); sine.stop(now + 0.31);
    lfo.start(now); lfo.stop(now + 0.31);
  };

  // ---------------------------------------------------------------
  // 6. FEATURE_SWITCH_OFF — tape motor stopping, 280 ms
  // Topology: tri+sine → LP(3k→800) → gain → dest /
  //           LFO(2→10 Hz) → tri.freq /
  //           noise → LP(2k) → nG → dest
  // ---------------------------------------------------------------
  sounds.FEATURE_SWITCH_OFF = function() {
    const now = ctx.currentTime;

    // Detuned pair descending — motor losing speed
    const tri = ctx.createOscillator();
    tri.type = 'triangle';
    tri.frequency.setValueAtTime(520, now);
    tri.frequency.exponentialRampToValueAtTime(100, now + 0.24);

    // Detune increases as pitch goes unstable
    const sine = ctx.createOscillator();
    sine.type = 'sine';
    sine.frequency.setValueAtTime(523, now);
    sine.frequency.exponentialRampToValueAtTime(88, now + 0.24);

    // Tape wobble LFO speeds UP — motor losing stability
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(2, now);
    lfo.frequency.exponentialRampToValueAtTime(10, now + 0.24);
    const lfoG = ctx.createGain();
    lfoG.gain.value = 15;
    lfo.connect(lfoG).connect(tri.frequency);

    // LP filter closing
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(3000, now);
    lp.frequency.exponentialRampToValueAtTime(800, now + 0.24);
    lp.Q.value = 2;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

    const mix = ctx.createGain();
    mix.gain.value = 0.5;

    tri.connect(lp);
    sine.connect(mix).connect(lp);
    lp.connect(gain).connect(ctx.destination);

    tri.start(now); tri.stop(now + 0.29);
    sine.start(now); sine.stop(now + 0.29);
    lfo.start(now); lfo.stop(now + 0.29);

    // Crackle layer — increases during shutdown
    const nSrc = ctx.createBufferSource();
    nSrc.buffer = noiseBuffer(0.28);
    const nLp = ctx.createBiquadFilter();
    nLp.type = 'lowpass';
    nLp.frequency.value = 2000;
    const nG = ctx.createGain();
    nG.gain.setValueAtTime(0.02, now);
    nG.gain.linearRampToValueAtTime(0.08, now + 0.20);
    nG.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
    nSrc.connect(nLp).connect(nG).connect(ctx.destination);
    nSrc.start(now);
    nSrc.stop(now + 0.29);
  };

  // ---------------------------------------------------------------
  // 7. LIMITER_ON — record head engage, narrow BP resonance, 220 ms
  // Topology: tri+sine → BP(Q=8) → gain → dest /
  //           LFO(5 Hz) → tri.freq / noise → BP(3k) → nG → dest
  // ---------------------------------------------------------------
  sounds.LIMITER_ON = function() {
    const now = ctx.currentTime;

    // Brief crackle onset
    const nSrc = ctx.createBufferSource();
    nSrc.buffer = noiseBuffer(0.015);
    const nBp = ctx.createBiquadFilter();
    nBp.type = 'bandpass';
    nBp.frequency.value = 3000;
    nBp.Q.value = 3;
    const nG = ctx.createGain();
    nG.gain.setValueAtTime(0.16, now);
    nG.gain.exponentialRampToValueAtTime(0.001, now + 0.012);
    nSrc.connect(nBp).connect(nG).connect(ctx.destination);
    nSrc.start(now);
    nSrc.stop(now + 0.02);

    // Detuned pair through narrow BP — record-head resonance
    const tri = ctx.createOscillator();
    tri.type = 'triangle';
    tri.frequency.setValueAtTime(300, now + 0.01);
    tri.frequency.exponentialRampToValueAtTime(480, now + 0.18);

    const sine = ctx.createOscillator();
    sine.type = 'sine';
    sine.frequency.setValueAtTime(303, now + 0.01);
    sine.frequency.exponentialRampToValueAtTime(483, now + 0.18);

    // Tape wobble LFO at 5 Hz
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 5;
    const lfoG = ctx.createGain();
    lfoG.gain.value = 10;
    lfo.connect(lfoG).connect(tri.frequency);

    // Narrow BP simulates record-head resonance
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.setValueAtTime(350, now + 0.01);
    bp.frequency.exponentialRampToValueAtTime(500, now + 0.18);
    bp.Q.value = 8;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.20, now + 0.04);
    gain.gain.setValueAtTime(0.20, now + 0.16);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    const mix = ctx.createGain();
    mix.gain.value = 0.5;

    tri.connect(bp);
    sine.connect(mix).connect(bp);
    bp.connect(gain).connect(ctx.destination);

    tri.start(now + 0.01); tri.stop(now + 0.23);
    sine.start(now + 0.01); sine.stop(now + 0.23);
    lfo.start(now + 0.01); lfo.stop(now + 0.23);
  };

  // ---------------------------------------------------------------
  // 8. LIMITER_OFF — record head release, BP opens wide, 210 ms
  // Topology: tri+sine → BP(Q=8→1) → gain → dest /
  //           noise → LP(2k) → nG → dest (crackle at release)
  // ---------------------------------------------------------------
  sounds.LIMITER_OFF = function() {
    const now = ctx.currentTime;

    // Detuned pair — expands outward as BP opens
    const tri = ctx.createOscillator();
    tri.type = 'triangle';
    tri.frequency.setValueAtTime(480, now);
    tri.frequency.exponentialRampToValueAtTime(250, now + 0.18);

    const sine = ctx.createOscillator();
    sine.type = 'sine';
    sine.frequency.setValueAtTime(483, now);
    sine.frequency.exponentialRampToValueAtTime(240, now + 0.18);

    // BP opens from narrow to wide
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.setValueAtTime(500, now);
    bp.frequency.exponentialRampToValueAtTime(300, now + 0.18);
    bp.Q.setValueAtTime(8, now);
    bp.Q.linearRampToValueAtTime(1, now + 0.18);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.21);

    const mix = ctx.createGain();
    mix.gain.value = 0.5;

    tri.connect(bp);
    sine.connect(mix).connect(bp);
    bp.connect(gain).connect(ctx.destination);

    tri.start(now); tri.stop(now + 0.22);
    sine.start(now); sine.stop(now + 0.22);

    // Crackle at release
    const nSrc = ctx.createBufferSource();
    nSrc.buffer = noiseBuffer(0.03);
    const nLp = ctx.createBiquadFilter();
    nLp.type = 'lowpass';
    nLp.frequency.value = 2000;
    const nG = ctx.createGain();
    nG.gain.setValueAtTime(0, now + 0.15);
    nG.gain.linearRampToValueAtTime(0.14, now + 0.16);
    nG.gain.exponentialRampToValueAtTime(0.001, now + 0.19);
    nSrc.connect(nLp).connect(nG).connect(ctx.destination);
    nSrc.start(now + 0.15);
    nSrc.stop(now + 0.21);
  };

  // ---------------------------------------------------------------
  // 9. SWITCH_TOGGLE — dial click, two short detuned pips, 20 ms
  // Topology: noise → LP(1.8k) → nG → dest /
  //           tri+tri(detuned) → LP(2.5k) → pG → dest
  // ---------------------------------------------------------------
  sounds.SWITCH_TOGGLE = function() {
    const now = ctx.currentTime;

    // Micro-crackle
    const nSrc = ctx.createBufferSource();
    nSrc.buffer = noiseBuffer(0.004);
    const nLp = ctx.createBiquadFilter();
    nLp.type = 'lowpass';
    nLp.frequency.value = 1800;
    const nG = ctx.createGain();
    nG.gain.setValueAtTime(0.14, now);
    nG.gain.exponentialRampToValueAtTime(0.001, now + 0.003);
    nSrc.connect(nLp).connect(nG).connect(ctx.destination);
    nSrc.start(now);
    nSrc.stop(now + 0.005);

    // Detuned triangle pips — brief "zhu" quality
    const tri1 = ctx.createOscillator();
    tri1.type = 'triangle';
    tri1.frequency.value = 900;

    const tri2 = ctx.createOscillator();
    tri2.type = 'triangle';
    tri2.frequency.value = 905;

    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 2500;

    const pG = ctx.createGain();
    pG.gain.setValueAtTime(0.16, now + 0.002);
    pG.gain.exponentialRampToValueAtTime(0.001, now + 0.018);

    tri1.connect(lp);
    tri2.connect(lp);
    lp.connect(pG).connect(ctx.destination);

    tri1.start(now + 0.002); tri1.stop(now + 0.02);
    tri2.start(now + 0.002); tri2.stop(now + 0.02);
  };

  // ---------------------------------------------------------------
  // 10. TAB_INSERT — FM radio tuning in, 110 ms
  // Topology: tri+sine(wide→narrow detune) → LP(3k) → gain → dest /
  //           noise → BP(1k) → nG → dest
  // ---------------------------------------------------------------
  sounds.TAB_INSERT = function() {
    const now = ctx.currentTime;

    // Vinyl crackle layer underneath
    const nSrc = ctx.createBufferSource();
    nSrc.buffer = noiseBuffer(0.10);
    const nBp = ctx.createBiquadFilter();
    nBp.type = 'bandpass';
    nBp.frequency.value = 1000;
    nBp.Q.value = 1;
    const nLp = ctx.createBiquadFilter();
    nLp.type = 'lowpass';
    nLp.frequency.value = 2500;
    const nG = ctx.createGain();
    nG.gain.setValueAtTime(0.07, now);
    nG.gain.exponentialRampToValueAtTime(0.001, now + 0.10);
    nSrc.connect(nBp).connect(nLp).connect(nG).connect(ctx.destination);
    nSrc.start(now);
    nSrc.stop(now + 0.11);

    // Detuned pair — wide detune (20 Hz, messy) narrows to 2 Hz (locks in)
    const tri = ctx.createOscillator();
    tri.type = 'triangle';
    tri.frequency.setValueAtTime(400, now);
    tri.frequency.linearRampToValueAtTime(800, now + 0.10);

    const sine = ctx.createOscillator();
    sine.type = 'sine';
    sine.frequency.setValueAtTime(420, now);
    sine.frequency.linearRampToValueAtTime(802, now + 0.10);

    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 3000;
    lp.Q.value = 1.5;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.16, now + 0.02);
    gain.gain.setValueAtTime(0.16, now + 0.07);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.11);

    const mix = ctx.createGain();
    mix.gain.value = 0.6;

    tri.connect(lp);
    sine.connect(mix).connect(lp);
    lp.connect(gain).connect(ctx.destination);

    tri.start(now); tri.stop(now + 0.12);
    sine.start(now); sine.stop(now + 0.12);
  };

  // ---------------------------------------------------------------
  // 11. TAB_CLOSE — FM radio tuning out, 95 ms
  // Topology: tri+sine(narrow→wide detune) → LP(closing) → gain → dest /
  //           noise → LP(2k) → nG(increasing) → dest
  // ---------------------------------------------------------------
  sounds.TAB_CLOSE = function() {
    const now = ctx.currentTime;

    // Detuned pair — narrow detune (2 Hz, clean) widens to 30 Hz (breaking up)
    const tri = ctx.createOscillator();
    tri.type = 'triangle';
    tri.frequency.setValueAtTime(800, now);
    tri.frequency.linearRampToValueAtTime(400, now + 0.085);

    const sine = ctx.createOscillator();
    sine.type = 'sine';
    sine.frequency.setValueAtTime(802, now);
    sine.frequency.linearRampToValueAtTime(430, now + 0.085);

    // LP closes during tuning out
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(3000, now);
    lp.frequency.exponentialRampToValueAtTime(1000, now + 0.085);
    lp.Q.value = 1.5;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.16, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    const mix = ctx.createGain();
    mix.gain.value = 0.6;

    tri.connect(lp);
    sine.connect(mix).connect(lp);
    lp.connect(gain).connect(ctx.destination);

    tri.start(now); tri.stop(now + 0.095);
    sine.start(now); sine.stop(now + 0.095);

    // Crackle increases — signal degradation
    const nSrc = ctx.createBufferSource();
    nSrc.buffer = noiseBuffer(0.09);
    const nLp = ctx.createBiquadFilter();
    nLp.type = 'lowpass';
    nLp.frequency.value = 2000;
    const nG = ctx.createGain();
    nG.gain.setValueAtTime(0.02, now);
    nG.gain.linearRampToValueAtTime(0.10, now + 0.07);
    nG.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
    nSrc.connect(nLp).connect(nG).connect(ctx.destination);
    nSrc.start(now);
    nSrc.stop(now + 0.095);
  };

  // ---------------------------------------------------------------
  // 12. TAB_SLASH — warm chime, detuned pair ~1 kHz, 200 ms
  // Topology: tri+sine → LP(3.5k) → gain → dest /
  //           LFO(3 Hz) → tri.freq / noise → BP(2k) → nG → dest
  // ---------------------------------------------------------------
  sounds.TAB_SLASH = function() {
    const now = ctx.currentTime;

    // Brief crackle onset
    const nSrc = ctx.createBufferSource();
    nSrc.buffer = noiseBuffer(0.015);
    const nBp = ctx.createBiquadFilter();
    nBp.type = 'bandpass';
    nBp.frequency.value = 2000;
    nBp.Q.value = 1.5;
    const nG = ctx.createGain();
    nG.gain.setValueAtTime(0.08, now);
    nG.gain.exponentialRampToValueAtTime(0.001, now + 0.012);
    nSrc.connect(nBp).connect(nG).connect(ctx.destination);
    nSrc.start(now);
    nSrc.stop(now + 0.02);

    // Detuned pair at ~1 kHz — warm chime
    const tri = ctx.createOscillator();
    tri.type = 'triangle';
    tri.frequency.value = 1000;

    const sine = ctx.createOscillator();
    sine.type = 'sine';
    sine.frequency.value = 1004;

    // Gentle tape wobble LFO
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 3;
    const lfoG = ctx.createGain();
    lfoG.gain.value = 5;
    lfo.connect(lfoG).connect(tri.frequency);

    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 3500;
    lp.Q.value = 1;

    // Longer sustain to let warmth bloom
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, now + 0.005);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.015);
    gain.gain.setValueAtTime(0.18, now + 0.06);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.20);

    const mix = ctx.createGain();
    mix.gain.value = 0.5;

    tri.connect(lp);
    sine.connect(mix).connect(lp);
    lp.connect(gain).connect(ctx.destination);

    tri.start(now + 0.005); tri.stop(now + 0.21);
    sine.start(now + 0.005); sine.stop(now + 0.21);
    lfo.start(now + 0.005); lfo.stop(now + 0.21);
  };

  // ---------------------------------------------------------------
  // 13. TYPING_LETTER — typewriter through tape, 30 ms (16 variants)
  // Topology: noise(2ms) → LP(2.5k) → nG → dest /
  //           tri+tri(detuned random) → LP(3k) → tG → dest
  // ---------------------------------------------------------------
  sounds.TYPING_LETTER = function() {
    const now = ctx.currentTime;

    // Randomised frequency from pool: 600-1600 Hz in 60 Hz steps
    const freqPool = 600 + Math.floor(Math.random() * 17) * 60;
    // Random detune between 2-5 Hz
    const detune = 2 + Math.random() * 3;

    // Micro-crackle onset — 2 ms noise burst
    const nSrc = ctx.createBufferSource();
    nSrc.buffer = noiseBuffer(0.004);
    const nLp = ctx.createBiquadFilter();
    nLp.type = 'lowpass';
    nLp.frequency.value = 2500;
    const nG = ctx.createGain();
    nG.gain.setValueAtTime(0.14, now);
    nG.gain.exponentialRampToValueAtTime(0.001, now + 0.003);
    nSrc.connect(nLp).connect(nG).connect(ctx.destination);
    nSrc.start(now);
    nSrc.stop(now + 0.005);

    // Detuned triangle pair — unique beating per keystroke
    const tri1 = ctx.createOscillator();
    tri1.type = 'triangle';
    tri1.frequency.value = freqPool;

    const tri2 = ctx.createOscillator();
    tri2.type = 'triangle';
    tri2.frequency.value = freqPool + detune;

    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 3000;

    const tG = ctx.createGain();
    tG.gain.setValueAtTime(0, now + 0.002);
    tG.gain.linearRampToValueAtTime(0.10, now + 0.005);
    tG.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

    tri1.connect(lp);
    tri2.connect(lp);
    lp.connect(tG).connect(ctx.destination);

    tri1.start(now + 0.002); tri1.stop(now + 0.03);
    tri2.start(now + 0.002); tri2.stop(now + 0.03);
  };

  // ---------------------------------------------------------------
  // 14. TYPING_BACKSPACE — reverse tape pull, 35 ms
  // Topology: tri+sine(dropping) → LP(2k) → gain → dest /
  //           LFO(accelerating) → tri.freq
  // ---------------------------------------------------------------
  sounds.TYPING_BACKSPACE = function() {
    const now = ctx.currentTime;

    // Detuned pair with pitch dropping
    const tri = ctx.createOscillator();
    tri.type = 'triangle';
    tri.frequency.setValueAtTime(500, now);
    tri.frequency.exponentialRampToValueAtTime(200, now + 0.03);

    const sine = ctx.createOscillator();
    sine.type = 'sine';
    sine.frequency.setValueAtTime(504, now);
    sine.frequency.exponentialRampToValueAtTime(196, now + 0.03);

    // Tape wobble LFO speeds up — tape being pulled backward
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(3, now);
    lfo.frequency.linearRampToValueAtTime(12, now + 0.03);
    const lfoG = ctx.createGain();
    lfoG.gain.value = 8;
    lfo.connect(lfoG).connect(tri.frequency);

    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 2000;
    lp.Q.value = 2;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.14, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.032);

    const mix = ctx.createGain();
    mix.gain.value = 0.5;

    tri.connect(lp);
    sine.connect(mix).connect(lp);
    lp.connect(gain).connect(ctx.destination);

    tri.start(now); tri.stop(now + 0.035);
    sine.start(now); sine.stop(now + 0.035);
    lfo.start(now); lfo.stop(now + 0.035);
  };

  // ---------------------------------------------------------------
  // 15. TYPING_ENTER — carriage return slam + typewriter bell, 100 ms
  // Topology: noise → BP(1.5k) → nG → dest /
  //           tri(250)+sine(253) → LP(2.5k) → bG → dest /
  //           LFO(3 Hz) → tri.freq /
  //           sine(50) → sG → dest /
  //           tri(2000)+sine(2006) → LP(3k) → dG → dest (bell ding)
  // ---------------------------------------------------------------
  sounds.TYPING_ENTER = function() {
    const now = ctx.currentTime;

    // Vinyl crackle onset
    const nSrc = ctx.createBufferSource();
    nSrc.buffer = noiseBuffer(0.012);
    const nBp = ctx.createBiquadFilter();
    nBp.type = 'bandpass';
    nBp.frequency.value = 1500;
    nBp.Q.value = 2;
    const nG = ctx.createGain();
    nG.gain.setValueAtTime(0.12, now);
    nG.gain.exponentialRampToValueAtTime(0.001, now + 0.01);
    nSrc.connect(nBp).connect(nG).connect(ctx.destination);
    nSrc.start(now);
    nSrc.stop(now + 0.015);

    // Detuned pair body — carriage slam
    const tri = ctx.createOscillator();
    tri.type = 'triangle';
    tri.frequency.value = 250;

    const sine = ctx.createOscillator();
    sine.type = 'sine';
    sine.frequency.value = 253;

    // Tape wobble LFO
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 3;
    const lfoG = ctx.createGain();
    lfoG.gain.value = 4;
    lfo.connect(lfoG).connect(tri.frequency);

    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 2500;
    lp.Q.value = 3;

    const bG = ctx.createGain();
    bG.gain.setValueAtTime(0.20, now + 0.005);
    bG.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    const bodyMix = ctx.createGain();
    bodyMix.gain.value = 0.5;

    tri.connect(lp);
    sine.connect(bodyMix).connect(lp);
    lp.connect(bG).connect(ctx.destination);

    tri.start(now + 0.005); tri.stop(now + 0.09);
    sine.start(now + 0.005); sine.stop(now + 0.09);
    lfo.start(now + 0.005); lfo.stop(now + 0.09);

    // Sub-bass
    const sub = ctx.createOscillator();
    sub.type = 'sine';
    sub.frequency.value = 50;
    const sG = ctx.createGain();
    sG.gain.setValueAtTime(0.15, now + 0.005);
    sG.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
    sub.connect(sG).connect(ctx.destination);
    sub.start(now + 0.005);
    sub.stop(now + 0.06);

    // Typewriter bell "ding" — detuned high pair, 15 ms
    const dTri = ctx.createOscillator();
    dTri.type = 'triangle';
    dTri.frequency.value = 2000;

    const dSine = ctx.createOscillator();
    dSine.type = 'sine';
    dSine.frequency.value = 2006;

    const dLp = ctx.createBiquadFilter();
    dLp.type = 'lowpass';
    dLp.frequency.value = 3000;

    const dG = ctx.createGain();
    dG.gain.setValueAtTime(0.06, now);
    dG.gain.exponentialRampToValueAtTime(0.001, now + 0.015);

    dTri.connect(dLp);
    dSine.connect(dLp);
    dLp.connect(dG).connect(ctx.destination);

    dTri.start(now); dTri.stop(now + 0.02);
    dSine.start(now); dSine.stop(now + 0.02);
  };

  // ---------------------------------------------------------------
  // 16. TYPING_SPACE — wide warm puff, noise + brief detuned pair
  // Topology: noise → LP(2k) → nG → dest /
  //           LFO(4 Hz) → nG.gain (tape wobble on noise amplitude) /
  //           tri(200)+sine(204) → LP(2.5k) → pG → dest
  // ---------------------------------------------------------------
  sounds.TYPING_SPACE = function() {
    const now = ctx.currentTime;

    // Noise with tape-wobble amplitude LFO — diffuse warm puff
    const nSrc = ctx.createBufferSource();
    nSrc.buffer = noiseBuffer(0.035);
    const nLp = ctx.createBiquadFilter();
    nLp.type = 'lowpass';
    nLp.frequency.value = 2000;
    const nG = ctx.createGain();
    nG.gain.setValueAtTime(0.14, now);
    nG.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

    // Tape wobble on noise amplitude
    const nLfo = ctx.createOscillator();
    nLfo.type = 'sine';
    nLfo.frequency.value = 4;
    const nLfoG = ctx.createGain();
    nLfoG.gain.value = 0.04;
    nLfo.connect(nLfoG).connect(nG.gain);

    nSrc.connect(nLp).connect(nG).connect(ctx.destination);
    nSrc.start(now);
    nSrc.stop(now + 0.035);
    nLfo.start(now);
    nLfo.stop(now + 0.035);

    // Brief detuned pair — very short warmth accent
    const tri = ctx.createOscillator();
    tri.type = 'triangle';
    tri.frequency.value = 200;

    const sine = ctx.createOscillator();
    sine.type = 'sine';
    sine.frequency.value = 204;

    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 2500;

    const pG = ctx.createGain();
    pG.gain.setValueAtTime(0.08, now);
    pG.gain.exponentialRampToValueAtTime(0.001, now + 0.018);

    const mix = ctx.createGain();
    mix.gain.value = 0.5;

    tri.connect(lp);
    sine.connect(mix).connect(lp);
    lp.connect(pG).connect(ctx.destination);

    tri.start(now); tri.stop(now + 0.035);
    sine.start(now); sine.stop(now + 0.035);
  };

  // ---------------------------------------------------------------
  // 17. APP_START — full DNA showcase, 1.3 s
  // Topology: tri(160)+sine(163) → LP(3k) → dG → dest /
  //           LFO(2 Hz, +/-4 Hz) → tri.freq /
  //           tri(190)+sine(193) → LP(3k) → tG → dest (enters 400ms) /
  //           noise → BP(800) → LP(2k) → nG → dest /
  //           sine(60) → hG → dest
  // ---------------------------------------------------------------
  sounds.APP_START = function() {
    const now = ctx.currentTime;

    // Deep triangle drone — detuned pair, 3 Hz beating
    const drone1 = ctx.createOscillator();
    drone1.type = 'triangle';
    drone1.frequency.value = 160;

    const drone2 = ctx.createOscillator();
    drone2.type = 'sine';
    drone2.frequency.value = 163;

    // Tape wobble LFO on triangle pitch — 2 Hz, +/-4 Hz depth
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 2;
    const lfoG = ctx.createGain();
    lfoG.gain.value = 4;
    lfo.connect(lfoG).connect(drone1.frequency);

    const dLp = ctx.createBiquadFilter();
    dLp.type = 'lowpass';
    dLp.frequency.value = 3000;
    dLp.Q.value = 1;

    const dG = ctx.createGain();
    dG.gain.setValueAtTime(0, now);
    dG.gain.linearRampToValueAtTime(0.14, now + 0.35);
    dG.gain.setValueAtTime(0.14, now + 0.70);
    dG.gain.exponentialRampToValueAtTime(0.001, now + 1.30);

    const dMix = ctx.createGain();
    dMix.gain.value = 0.5;

    drone1.connect(dLp);
    drone2.connect(dMix).connect(dLp);
    dLp.connect(dG).connect(ctx.destination);

    drone1.start(now); drone1.stop(now + 1.35);
    drone2.start(now); drone2.stop(now + 1.35);
    lfo.start(now); lfo.stop(now + 1.35);

    // Second pair enters at minor third — ~190 Hz + 193 Hz
    const third1 = ctx.createOscillator();
    third1.type = 'triangle';
    third1.frequency.value = 190;

    const third2 = ctx.createOscillator();
    third2.type = 'sine';
    third2.frequency.value = 193;

    const tLp = ctx.createBiquadFilter();
    tLp.type = 'lowpass';
    tLp.frequency.value = 3000;
    tLp.Q.value = 1;

    const tG = ctx.createGain();
    tG.gain.setValueAtTime(0, now + 0.40);
    tG.gain.linearRampToValueAtTime(0.08, now + 0.65);
    tG.gain.setValueAtTime(0.08, now + 0.80);
    tG.gain.exponentialRampToValueAtTime(0.001, now + 1.30);

    const tMix = ctx.createGain();
    tMix.gain.value = 0.5;

    third1.connect(tLp);
    third2.connect(tMix).connect(tLp);
    tLp.connect(tG).connect(ctx.destination);

    third1.start(now + 0.40); third1.stop(now + 1.35);
    third2.start(now + 0.40); third2.stop(now + 1.35);

    // Vinyl crackle layer throughout — noise through BP 800 Hz, LP 2 kHz
    const nSrc = ctx.createBufferSource();
    nSrc.buffer = noiseBuffer(1.20);
    const nBp = ctx.createBiquadFilter();
    nBp.type = 'bandpass';
    nBp.frequency.value = 800;
    nBp.Q.value = 1;
    const nLp = ctx.createBiquadFilter();
    nLp.type = 'lowpass';
    nLp.frequency.value = 2000;
    const nG = ctx.createGain();
    nG.gain.setValueAtTime(0, now);
    nG.gain.linearRampToValueAtTime(0.05, now + 0.30);
    nG.gain.setValueAtTime(0.05, now + 0.70);
    nG.gain.exponentialRampToValueAtTime(0.001, now + 1.20);
    nSrc.connect(nBp).connect(nLp).connect(nG).connect(ctx.destination);
    nSrc.start(now);
    nSrc.stop(now + 1.25);

    // 60 Hz mains hum — grounding warmth
    const hum = ctx.createOscillator();
    hum.type = 'sine';
    hum.frequency.value = 60;
    const hG = ctx.createGain();
    hG.gain.setValueAtTime(0, now);
    hG.gain.linearRampToValueAtTime(0.05, now + 0.30);
    hG.gain.exponentialRampToValueAtTime(0.001, now + 0.90);
    hum.connect(hG).connect(ctx.destination);
    hum.start(now);
    hum.stop(now + 0.95);
  };

  return sounds;
}

export default { meta, createSounds };
