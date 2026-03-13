// ═══════════════════════════════════════════════════════════════════
// ORBIT DECK — sounds.js
// Near-future EVA control interface — ES module
// ═══════════════════════════════════════════════════════════════════

const meta = {
  name: 'Orbit Deck',
  subtitle: 'Near-future EVA control interface \u2014 Web Audio API synthesis',
  colors: {
    accent:   '#E8714A',
    accent2:  '#4DC9B0',
    danger:   '#D4463B',
    bg:       '#0B1520',
    surface:  '#0F1E2E',
    surface2: '#152838',
    border:   '#1E3A50',
    text:     '#D8E4EC',
    textDim:  '#5A7A8E',
  },
  placeholder: 'Typing on the suit forearm keypad... each press heard through the helmet speakers, muffled by vacuum',
  sounds: {
    HOVER:            { label: 'Hover',          meta: '65 ms / 2.2 kHz / sine sweep',     desc: 'Visor HUD proximity ping' },
    HOVER_UP:         { label: 'Hover Up',       meta: '50 ms / 2.8 kHz / sine sweep',     desc: 'Signal drifting out of range' },
    CLICK:            { label: 'Click',           meta: '35 ms / 800 Hz / sine pop',        desc: 'Suit forearm panel button' },
    IMPORTANT_CLICK:  { label: 'Important Click', meta: '130 ms / 440 Hz / sine + ping',    desc: 'Airlock control engagement' },
    FEATURE_SWITCH_ON:{ label: 'Feature Switch',  meta: 'ON 300 ms / OFF 270 ms \u2014 suit subsystem power cycle', desc: '' },
    LIMITER_ON:       { label: 'Limiter',         meta: 'ON 230 ms / OFF 200 ms \u2014 visor seal engage/release',  desc: '' },
    SWITCH_TOGGLE:    { label: 'Switch Toggle',   meta: '40 ms \u2014 chest panel toggle',                         desc: '' },
    TAB_INSERT:       { label: 'Tab Insert',      meta: '110 ms / 3 ascending blips',       desc: 'Comm channel opening' },
    TAB_CLOSE:        { label: 'Tab Close',       meta: '90 ms / 3 descending blips',       desc: 'Comm channel closing' },
    TAB_SLASH:        { label: 'Tab Slash',       meta: '190 ms / 1.5 kHz / sine ping',     desc: 'Command interface ready' },
    TYPING_LETTER:    { label: 'Typing Letter',   meta: '25 ms / 16 variants',              desc: 'Suit forearm keypad' },
    TYPING_BACKSPACE: { label: 'Typing Backspace', meta: '30 ms / sine blip',               desc: 'Delete blip' },
    TYPING_ENTER:     { label: 'Typing Enter',    meta: '85 ms / confirm tone',             desc: 'Command confirmed' },
    TYPING_SPACE:     { label: 'Typing Space',    meta: '30 ms / broad tap',                desc: 'Suit casing tap' },
    APP_START:        { label: 'App Start',       meta: '1.4 s / drone + octave shimmer',   desc: 'Orbital silence awakening' },
  },
};

// ═══════════════════════════════════════════════════════════════════
// SONIC DNA — what makes Orbit Deck unique
// ═══════════════════════════════════════════════════════════════════
//
// 1. PRIMARY WAVEFORM: Pure sine, single oscillator — clinical,
//    sterile, clean. No harmonics unless deliberately layered.
//
// 2. SIGNATURE EFFECT: Feedback delay tails — sounds arrive from
//    distance and dissolve into void. Every sound routes through
//    at least one delay node with feedback gain loop.
//
// 3. TRANSIENT CHARACTER: Soft fade-in, no click — no sharp onsets,
//    everything materialises gently via linear ramps > 3ms.
//
// 4. ENVELOPE PHILOSOPHY: Long tails dissolving into void — generous
//    release times, sounds that linger and decay slowly.
//
// 5. FREQUENCY WORLD: Clean, LP-filtered, sterile — everything
//    below 4 kHz, no harshness, lowpass on every chain.
// ═══════════════════════════════════════════════════════════════════

function createSounds(ctx, noiseBuffer) {
  const sounds = {};

  // ---------------------------------------------------------------
  // 1. HOVER — Doppler sine with feedback delay, 120 ms
  //    Sine drifts up in pitch (approaching), 2 echoes at 45ms spacing
  // ---------------------------------------------------------------
  sounds.HOVER = function() {
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1800, now);
    osc.frequency.linearRampToValueAtTime(2600, now + 0.06);
    osc.frequency.linearRampToValueAtTime(2200, now + 0.09);

    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 3800;
    lp.Q.value = 1.0;

    const dryG = ctx.createGain();
    dryG.gain.setValueAtTime(0, now);
    dryG.gain.linearRampToValueAtTime(0.09, now + 0.008);
    dryG.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

    const delay = ctx.createDelay(0.2);
    delay.delayTime.value = 0.045;
    const fbG = ctx.createGain();
    fbG.gain.value = 0.35;
    const wetG = ctx.createGain();
    wetG.gain.value = 0.06;

    osc.connect(lp);
    lp.connect(dryG).connect(ctx.destination);
    lp.connect(delay);
    delay.connect(fbG).connect(delay);
    delay.connect(wetG).connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.12);
  };

  // ---------------------------------------------------------------
  // 2. HOVER_UP — Reverse Doppler, delay tails stretch out, 100 ms
  //    Sine drifts down (receding), delay time lengthens
  // ---------------------------------------------------------------
  sounds.HOVER_UP = function() {
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(2600, now);
    osc.frequency.linearRampToValueAtTime(1600, now + 0.07);

    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 3500;
    lp.Q.value = 0.8;

    const dryG = ctx.createGain();
    dryG.gain.setValueAtTime(0, now);
    dryG.gain.linearRampToValueAtTime(0.08, now + 0.006);
    dryG.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    const delay = ctx.createDelay(0.2);
    delay.delayTime.setValueAtTime(0.035, now);
    delay.delayTime.linearRampToValueAtTime(0.08, now + 0.08);
    const fbG = ctx.createGain();
    fbG.gain.value = 0.4;
    const wetG = ctx.createGain();
    wetG.gain.value = 0.05;

    const wetLp = ctx.createBiquadFilter();
    wetLp.type = 'lowpass';
    wetLp.frequency.value = 2800;

    osc.connect(lp);
    lp.connect(dryG).connect(ctx.destination);
    lp.connect(delay);
    delay.connect(fbG).connect(delay);
    delay.connect(wetLp).connect(wetG).connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.10);
  };

  // ---------------------------------------------------------------
  // 3. CLICK — Sine impulse into delay chain, 100 ms
  //    Very soft sine pop triggers 3-4 fading echoes
  // ---------------------------------------------------------------
  sounds.CLICK = function() {
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = 800;

    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 3000;
    lp.Q.value = 0.7;

    const srcG = ctx.createGain();
    srcG.gain.setValueAtTime(0, now);
    srcG.gain.linearRampToValueAtTime(0.06, now + 0.003);
    srcG.gain.exponentialRampToValueAtTime(0.001, now + 0.012);

    const delay1 = ctx.createDelay(0.1);
    delay1.delayTime.value = 0.022;
    const fb1 = ctx.createGain();
    fb1.gain.value = 0.45;

    const delay2 = ctx.createDelay(0.1);
    delay2.delayTime.value = 0.018;
    const fb2 = ctx.createGain();
    fb2.gain.value = 0.3;

    const wetG = ctx.createGain();
    wetG.gain.value = 0.18;

    osc.connect(lp).connect(srcG);
    srcG.connect(ctx.destination);
    srcG.connect(delay1);
    delay1.connect(fb1).connect(delay1);
    delay1.connect(delay2);
    delay2.connect(fb2).connect(delay2);
    delay2.connect(wetG).connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.10);
  };

  // ---------------------------------------------------------------
  // 4. IMPORTANT_CLICK — Deep sine + sympathetic harmonic, 200 ms
  //    Body sine triggers octave harmonic delayed 30ms, both into
  //    reverb-like delay
  // ---------------------------------------------------------------
  sounds.IMPORTANT_CLICK = function() {
    const now = ctx.currentTime;

    const body = ctx.createOscillator();
    body.type = 'sine';
    body.frequency.value = 440;

    const bodyLp = ctx.createBiquadFilter();
    bodyLp.type = 'lowpass';
    bodyLp.frequency.value = 1200;
    bodyLp.Q.value = 2.0;

    const bG = ctx.createGain();
    bG.gain.setValueAtTime(0, now);
    bG.gain.linearRampToValueAtTime(0.18, now + 0.005);
    bG.gain.setValueAtTime(0.18, now + 0.04);
    bG.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    const harm = ctx.createOscillator();
    harm.type = 'sine';
    harm.frequency.value = 880;

    const hG = ctx.createGain();
    hG.gain.setValueAtTime(0, now + 0.03);
    hG.gain.linearRampToValueAtTime(0.08, now + 0.038);
    hG.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    const delay = ctx.createDelay(0.2);
    delay.delayTime.value = 0.055;
    const fbG = ctx.createGain();
    fbG.gain.value = 0.38;
    const wetG = ctx.createGain();
    wetG.gain.value = 0.10;

    const wetLp = ctx.createBiquadFilter();
    wetLp.type = 'lowpass';
    wetLp.frequency.value = 2000;

    body.connect(bodyLp).connect(bG).connect(ctx.destination);
    harm.connect(hG).connect(ctx.destination);

    bG.connect(delay);
    hG.connect(delay);
    delay.connect(fbG).connect(delay);
    delay.connect(wetLp).connect(wetG).connect(ctx.destination);

    body.start(now);
    body.stop(now + 0.20);
    harm.start(now + 0.03);
    harm.stop(now + 0.20);
  };

  // ---------------------------------------------------------------
  // 5. FEATURE_SWITCH_ON — Rising sine + opening delay feedback, 300 ms
  //    Sine ascends while delay time shortens and feedback increases
  // ---------------------------------------------------------------
  sounds.FEATURE_SWITCH_ON = function() {
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(660, now + 0.25);

    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(600, now);
    lp.frequency.exponentialRampToValueAtTime(3200, now + 0.25);
    lp.Q.value = 1.5;

    const oscG = ctx.createGain();
    oscG.gain.setValueAtTime(0, now);
    oscG.gain.linearRampToValueAtTime(0.14, now + 0.02);
    oscG.gain.setValueAtTime(0.14, now + 0.20);
    oscG.gain.exponentialRampToValueAtTime(0.001, now + 0.30);

    const delay = ctx.createDelay(0.2);
    delay.delayTime.setValueAtTime(0.08, now);
    delay.delayTime.linearRampToValueAtTime(0.025, now + 0.25);

    const fbG = ctx.createGain();
    fbG.gain.setValueAtTime(0.15, now);
    fbG.gain.linearRampToValueAtTime(0.55, now + 0.25);

    const wetG = ctx.createGain();
    wetG.gain.setValueAtTime(0.03, now);
    wetG.gain.linearRampToValueAtTime(0.12, now + 0.25);
    wetG.gain.exponentialRampToValueAtTime(0.001, now + 0.30);

    osc.connect(lp).connect(oscG);
    oscG.connect(ctx.destination);
    oscG.connect(delay);
    delay.connect(fbG).connect(delay);
    delay.connect(wetG).connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.32);
  };

  // ---------------------------------------------------------------
  // 6. FEATURE_SWITCH_OFF — Descending sine + expanding delay, 270 ms
  //    Sine descends while delay time lengthens, echoes trail off
  // ---------------------------------------------------------------
  sounds.FEATURE_SWITCH_OFF = function() {
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(660, now);
    osc.frequency.exponentialRampToValueAtTime(180, now + 0.22);

    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(3200, now);
    lp.frequency.exponentialRampToValueAtTime(500, now + 0.22);
    lp.Q.value = 1.5;

    const oscG = ctx.createGain();
    oscG.gain.setValueAtTime(0.14, now);
    oscG.gain.exponentialRampToValueAtTime(0.001, now + 0.27);

    const delay = ctx.createDelay(0.3);
    delay.delayTime.setValueAtTime(0.025, now);
    delay.delayTime.linearRampToValueAtTime(0.10, now + 0.22);

    const fbG = ctx.createGain();
    fbG.gain.setValueAtTime(0.50, now);
    fbG.gain.linearRampToValueAtTime(0.20, now + 0.22);

    const wetG = ctx.createGain();
    wetG.gain.setValueAtTime(0.10, now);
    wetG.gain.exponentialRampToValueAtTime(0.001, now + 0.27);

    const wetLp = ctx.createBiquadFilter();
    wetLp.type = 'lowpass';
    wetLp.frequency.value = 1800;

    osc.connect(lp).connect(oscG);
    oscG.connect(ctx.destination);
    oscG.connect(delay);
    delay.connect(fbG).connect(delay);
    delay.connect(wetLp).connect(wetG).connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.29);
  };

  // ---------------------------------------------------------------
  // 7. LIMITER_ON — Narrowband sine + comb filter resonance, 230 ms
  //    Two delays at close times create constructive interference
  // ---------------------------------------------------------------
  sounds.LIMITER_ON = function() {
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(480, now + 0.18);

    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 2400;
    lp.Q.value = 3.0;

    const oscG = ctx.createGain();
    oscG.gain.setValueAtTime(0, now);
    oscG.gain.linearRampToValueAtTime(0.12, now + 0.015);
    oscG.gain.setValueAtTime(0.12, now + 0.16);
    oscG.gain.exponentialRampToValueAtTime(0.001, now + 0.23);

    // Comb filter: two delays at nearly identical times
    const combA = ctx.createDelay(0.05);
    combA.delayTime.value = 0.0021;  // ~476 Hz reinforcement
    const combB = ctx.createDelay(0.05);
    combB.delayTime.value = 0.0023;

    const fbA = ctx.createGain();
    fbA.gain.value = 0.55;
    const fbB = ctx.createGain();
    fbB.gain.value = 0.50;

    const combMix = ctx.createGain();
    combMix.gain.setValueAtTime(0.08, now);
    combMix.gain.exponentialRampToValueAtTime(0.001, now + 0.23);

    osc.connect(lp).connect(oscG);
    oscG.connect(ctx.destination);

    oscG.connect(combA);
    combA.connect(fbA).connect(combA);
    oscG.connect(combB);
    combB.connect(fbB).connect(combB);

    combA.connect(combMix);
    combB.connect(combMix);
    combMix.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.25);
  };

  // ---------------------------------------------------------------
  // 8. LIMITER_OFF — Comb filter collapse, 200 ms
  //    Resonance collapses as delay times diverge
  // ---------------------------------------------------------------
  sounds.LIMITER_OFF = function() {
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(480, now);
    osc.frequency.exponentialRampToValueAtTime(220, now + 0.16);

    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(2400, now);
    lp.frequency.exponentialRampToValueAtTime(800, now + 0.16);
    lp.Q.value = 2.0;

    const oscG = ctx.createGain();
    oscG.gain.setValueAtTime(0.12, now);
    oscG.gain.exponentialRampToValueAtTime(0.001, now + 0.20);

    // Comb pair — times diverge, destroying resonance
    const combA = ctx.createDelay(0.1);
    combA.delayTime.setValueAtTime(0.0022, now);
    combA.delayTime.linearRampToValueAtTime(0.008, now + 0.16);
    const combB = ctx.createDelay(0.1);
    combB.delayTime.setValueAtTime(0.0022, now);
    combB.delayTime.linearRampToValueAtTime(0.014, now + 0.16);

    const fbA = ctx.createGain();
    fbA.gain.setValueAtTime(0.50, now);
    fbA.gain.linearRampToValueAtTime(0.10, now + 0.16);
    const fbB = ctx.createGain();
    fbB.gain.setValueAtTime(0.50, now);
    fbB.gain.linearRampToValueAtTime(0.10, now + 0.16);

    const combMix = ctx.createGain();
    combMix.gain.setValueAtTime(0.08, now);
    combMix.gain.exponentialRampToValueAtTime(0.001, now + 0.20);

    osc.connect(lp).connect(oscG);
    oscG.connect(ctx.destination);

    oscG.connect(combA);
    combA.connect(fbA).connect(combA);
    oscG.connect(combB);
    combB.connect(fbB).connect(combB);

    combA.connect(combMix);
    combB.connect(combMix);
    combMix.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.22);
  };

  // ---------------------------------------------------------------
  // 9. SWITCH_TOGGLE — Soft double-ping with delay tails, 80 ms
  //    Two quiet sine pips at different pitches, each into delay
  // ---------------------------------------------------------------
  sounds.SWITCH_TOGGLE = function() {
    const now = ctx.currentTime;

    const oscA = ctx.createOscillator();
    oscA.type = 'sine';
    oscA.frequency.value = 1200;
    const gA = ctx.createGain();
    gA.gain.setValueAtTime(0, now);
    gA.gain.linearRampToValueAtTime(0.10, now + 0.004);
    gA.gain.exponentialRampToValueAtTime(0.001, now + 0.018);

    const oscB = ctx.createOscillator();
    oscB.type = 'sine';
    oscB.frequency.value = 800;
    const gB = ctx.createGain();
    gB.gain.setValueAtTime(0, now + 0.012);
    gB.gain.linearRampToValueAtTime(0.08, now + 0.016);
    gB.gain.exponentialRampToValueAtTime(0.001, now + 0.032);

    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 3500;

    const delay = ctx.createDelay(0.1);
    delay.delayTime.value = 0.028;
    const fbG = ctx.createGain();
    fbG.gain.value = 0.30;
    const wetG = ctx.createGain();
    wetG.gain.value = 0.06;

    oscA.connect(gA).connect(lp);
    oscB.connect(gB).connect(lp);
    lp.connect(ctx.destination);
    lp.connect(delay);
    delay.connect(fbG).connect(delay);
    delay.connect(wetG).connect(ctx.destination);

    oscA.start(now);
    oscA.stop(now + 0.08);
    oscB.start(now + 0.012);
    oscB.stop(now + 0.08);
  };

  // ---------------------------------------------------------------
  // 10. TAB_INSERT — Ascending sine + staggered delay cascade, 160 ms
  //     Single sweep, different frequency regions trigger echoes
  // ---------------------------------------------------------------
  sounds.TAB_INSERT = function() {
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(500, now);
    osc.frequency.exponentialRampToValueAtTime(1400, now + 0.06);

    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 3600;
    lp.Q.value = 1.2;

    const oscG = ctx.createGain();
    oscG.gain.setValueAtTime(0, now);
    oscG.gain.linearRampToValueAtTime(0.12, now + 0.008);
    oscG.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

    // Three staggered delays at different times for cascade
    const d1 = ctx.createDelay(0.2);
    d1.delayTime.value = 0.024;
    const fb1 = ctx.createGain();
    fb1.gain.value = 0.25;

    const d2 = ctx.createDelay(0.2);
    d2.delayTime.value = 0.048;
    const fb2 = ctx.createGain();
    fb2.gain.value = 0.20;

    const d3 = ctx.createDelay(0.2);
    d3.delayTime.value = 0.072;
    const fb3 = ctx.createGain();
    fb3.gain.value = 0.15;

    const wetG = ctx.createGain();
    wetG.gain.value = 0.08;

    osc.connect(lp).connect(oscG);
    oscG.connect(ctx.destination);

    oscG.connect(d1);
    d1.connect(fb1).connect(d1);
    d1.connect(d2);
    d2.connect(fb2).connect(d2);
    d2.connect(d3);
    d3.connect(fb3).connect(d3);
    d3.connect(wetG).connect(ctx.destination);

    // Also tap earlier delays to destination
    const tap1 = ctx.createGain();
    tap1.gain.value = 0.06;
    const tap2 = ctx.createGain();
    tap2.gain.value = 0.04;
    d1.connect(tap1).connect(ctx.destination);
    d2.connect(tap2).connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.16);
  };

  // ---------------------------------------------------------------
  // 11. TAB_CLOSE — Descending sine + collapsing delay, 130 ms
  //     Echoes fold inward, delay times shorten
  // ---------------------------------------------------------------
  sounds.TAB_CLOSE = function() {
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1400, now);
    osc.frequency.exponentialRampToValueAtTime(400, now + 0.06);

    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(3600, now);
    lp.frequency.exponentialRampToValueAtTime(1000, now + 0.08);
    lp.Q.value = 1.0;

    const oscG = ctx.createGain();
    oscG.gain.setValueAtTime(0.12, now);
    oscG.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

    // Collapsing delay — time shortens, compresses echoes
    const delay = ctx.createDelay(0.2);
    delay.delayTime.setValueAtTime(0.06, now);
    delay.delayTime.linearRampToValueAtTime(0.012, now + 0.08);
    const fbG = ctx.createGain();
    fbG.gain.value = 0.45;

    const wetLp = ctx.createBiquadFilter();
    wetLp.type = 'lowpass';
    wetLp.frequency.value = 2200;

    const wetG = ctx.createGain();
    wetG.gain.setValueAtTime(0.10, now);
    wetG.gain.exponentialRampToValueAtTime(0.001, now + 0.13);

    osc.connect(lp).connect(oscG);
    oscG.connect(ctx.destination);
    oscG.connect(delay);
    delay.connect(fbG).connect(delay);
    delay.connect(wetLp).connect(wetG).connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.13);
  };

  // ---------------------------------------------------------------
  // 12. TAB_SLASH — Pure sine beacon sonar ping, 250 ms
  //     Clean sine into long feedback delay (4+ echoes)
  // ---------------------------------------------------------------
  sounds.TAB_SLASH = function() {
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = 1500;

    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 3800;
    lp.Q.value = 0.7;

    const oscG = ctx.createGain();
    oscG.gain.setValueAtTime(0, now);
    oscG.gain.linearRampToValueAtTime(0.14, now + 0.004);
    oscG.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    const delay = ctx.createDelay(0.5);
    delay.delayTime.value = 0.042;
    const fbG = ctx.createGain();
    fbG.gain.value = 0.52;

    const wetLp = ctx.createBiquadFilter();
    wetLp.type = 'lowpass';
    wetLp.frequency.value = 2800;
    wetLp.Q.value = 0.5;

    const wetG = ctx.createGain();
    wetG.gain.setValueAtTime(0.10, now);
    wetG.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(lp).connect(oscG);
    oscG.connect(ctx.destination);
    oscG.connect(delay);
    delay.connect(fbG).connect(delay);
    delay.connect(wetLp).connect(wetG).connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.25);
  };

  // ---------------------------------------------------------------
  // 13. TYPING_LETTER — Micro-sine with delay scatter, 50 ms
  //     (16 variants via randomised freq + delay times)
  // ---------------------------------------------------------------
  sounds.TYPING_LETTER = function() {
    const now = ctx.currentTime;

    const baseFreq = 1000 + Math.floor(Math.random() * 16) * 80;
    const delayA = 0.010 + Math.random() * 0.012;
    const delayB = 0.018 + Math.random() * 0.014;

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = baseFreq;

    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 3400;

    const oscG = ctx.createGain();
    oscG.gain.setValueAtTime(0, now);
    oscG.gain.linearRampToValueAtTime(0.06, now + 0.003);
    oscG.gain.exponentialRampToValueAtTime(0.001, now + 0.014);

    const dA = ctx.createDelay(0.1);
    dA.delayTime.value = delayA;
    const dB = ctx.createDelay(0.1);
    dB.delayTime.value = delayB;

    const sparkle = ctx.createGain();
    sparkle.gain.value = 0.04;

    osc.connect(lp).connect(oscG);
    oscG.connect(ctx.destination);
    oscG.connect(dA);
    oscG.connect(dB);
    dA.connect(sparkle);
    dB.connect(sparkle);
    sparkle.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  };

  // ---------------------------------------------------------------
  // 14. TYPING_BACKSPACE — Reversed delay envelope, 60 ms
  //     Sine fades IN through delay feedback (reverse swell)
  // ---------------------------------------------------------------
  sounds.TYPING_BACKSPACE = function() {
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(550, now);
    osc.frequency.linearRampToValueAtTime(380, now + 0.04);

    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 2200;
    lp.Q.value = 1.0;

    // Dry signal is nearly silent — the delay is louder
    const dryG = ctx.createGain();
    dryG.gain.setValueAtTime(0.01, now);
    dryG.gain.linearRampToValueAtTime(0.08, now + 0.03);
    dryG.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    const delay = ctx.createDelay(0.1);
    delay.delayTime.value = 0.014;
    const fbG = ctx.createGain();
    fbG.gain.value = 0.40;

    // Wet signal swells in then fades
    const wetG = ctx.createGain();
    wetG.gain.setValueAtTime(0.005, now);
    wetG.gain.linearRampToValueAtTime(0.10, now + 0.025);
    wetG.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    osc.connect(lp);
    lp.connect(dryG).connect(ctx.destination);
    lp.connect(delay);
    delay.connect(fbG).connect(delay);
    delay.connect(wetG).connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.06);
  };

  // ---------------------------------------------------------------
  // 15. TYPING_ENTER — Deep sine impact with long delay wash, 250 ms
  //     200Hz sine with 6+ echoes decaying over 200ms
  // ---------------------------------------------------------------
  sounds.TYPING_ENTER = function() {
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = 200;

    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 1600;
    lp.Q.value = 2.5;

    const oscG = ctx.createGain();
    oscG.gain.setValueAtTime(0, now);
    oscG.gain.linearRampToValueAtTime(0.18, now + 0.005);
    oscG.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    const delay = ctx.createDelay(0.5);
    delay.delayTime.value = 0.032;
    const fbG = ctx.createGain();
    fbG.gain.value = 0.58;

    const wetLp = ctx.createBiquadFilter();
    wetLp.type = 'lowpass';
    wetLp.frequency.value = 1200;
    wetLp.Q.value = 1.0;

    const wetG = ctx.createGain();
    wetG.gain.setValueAtTime(0.12, now);
    wetG.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    // Confirmation ping — higher octave, subtle
    const ping = ctx.createOscillator();
    ping.type = 'sine';
    ping.frequency.value = 400;
    const pG = ctx.createGain();
    pG.gain.setValueAtTime(0, now + 0.01);
    pG.gain.linearRampToValueAtTime(0.06, now + 0.015);
    pG.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(lp).connect(oscG);
    oscG.connect(ctx.destination);
    oscG.connect(delay);
    ping.connect(delay);
    delay.connect(fbG).connect(delay);
    delay.connect(wetLp).connect(wetG).connect(ctx.destination);

    ping.connect(pG).connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.25);
    ping.start(now + 0.01);
    ping.stop(now + 0.25);
  };

  // ---------------------------------------------------------------
  // 16. TYPING_SPACE — Filtered noise puff through delay, 80 ms
  //     Soft LP noise + delay creating "distant whoosh" with echoes
  // ---------------------------------------------------------------
  sounds.TYPING_SPACE = function() {
    const now = ctx.currentTime;

    const nSrc = ctx.createBufferSource();
    nSrc.buffer = noiseBuffer(0.03);

    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 800;
    bp.Q.value = 0.8;

    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 2000;

    const nG = ctx.createGain();
    nG.gain.setValueAtTime(0, now);
    nG.gain.linearRampToValueAtTime(0.10, now + 0.005);
    nG.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

    const delay = ctx.createDelay(0.2);
    delay.delayTime.value = 0.022;
    const fbG = ctx.createGain();
    fbG.gain.value = 0.35;

    const wetLp = ctx.createBiquadFilter();
    wetLp.type = 'lowpass';
    wetLp.frequency.value = 1600;

    const wetG = ctx.createGain();
    wetG.gain.value = 0.06;

    nSrc.connect(bp).connect(lp).connect(nG);
    nG.connect(ctx.destination);
    nG.connect(delay);
    delay.connect(fbG).connect(delay);
    delay.connect(wetLp).connect(wetG).connect(ctx.destination);

    nSrc.start(now);
    nSrc.stop(now + 0.08);
  };

  // ---------------------------------------------------------------
  // 17. APP_START — Full DNA showcase, 1.4 s
  //     Deep sine drone + feedback delay echo chamber that swells
  //     and fades. Octave sine enters at 0.5s. Sub-bass grounding.
  // ---------------------------------------------------------------
  sounds.APP_START = function() {
    const now = ctx.currentTime;

    // Deep drone — primary sine
    const drone = ctx.createOscillator();
    drone.type = 'sine';
    drone.frequency.value = 110;

    const droneLp = ctx.createBiquadFilter();
    droneLp.type = 'lowpass';
    droneLp.frequency.setValueAtTime(200, now);
    droneLp.frequency.linearRampToValueAtTime(800, now + 0.7);
    droneLp.frequency.exponentialRampToValueAtTime(180, now + 1.4);
    droneLp.Q.value = 1.5;

    const droneG = ctx.createGain();
    droneG.gain.setValueAtTime(0, now);
    droneG.gain.linearRampToValueAtTime(0.14, now + 0.4);
    droneG.gain.setValueAtTime(0.14, now + 0.8);
    droneG.gain.exponentialRampToValueAtTime(0.001, now + 1.4);

    // Main feedback delay — echo chamber that swells then fades
    const delay = ctx.createDelay(0.5);
    delay.delayTime.value = 0.085;
    const fbG = ctx.createGain();
    fbG.gain.setValueAtTime(0.15, now);
    fbG.gain.linearRampToValueAtTime(0.58, now + 0.7);
    fbG.gain.linearRampToValueAtTime(0.10, now + 1.3);

    const wetLp = ctx.createBiquadFilter();
    wetLp.type = 'lowpass';
    wetLp.frequency.value = 1400;
    wetLp.Q.value = 1.0;

    const wetG = ctx.createGain();
    wetG.gain.setValueAtTime(0, now);
    wetG.gain.linearRampToValueAtTime(0.10, now + 0.5);
    wetG.gain.setValueAtTime(0.10, now + 0.9);
    wetG.gain.exponentialRampToValueAtTime(0.001, now + 1.4);

    drone.connect(droneLp).connect(droneG);
    droneG.connect(ctx.destination);
    droneG.connect(delay);
    delay.connect(fbG).connect(delay);
    delay.connect(wetLp).connect(wetG).connect(ctx.destination);

    drone.start(now);
    drone.stop(now + 1.45);

    // Octave shimmer — enters at 0.5s, also feeds delay
    const shimmer = ctx.createOscillator();
    shimmer.type = 'sine';
    shimmer.frequency.value = 220;

    const shimLp = ctx.createBiquadFilter();
    shimLp.type = 'lowpass';
    shimLp.frequency.value = 600;
    shimLp.Q.value = 1.0;

    const shimG = ctx.createGain();
    shimG.gain.setValueAtTime(0, now + 0.5);
    shimG.gain.linearRampToValueAtTime(0.06, now + 0.9);
    shimG.gain.exponentialRampToValueAtTime(0.001, now + 1.4);

    shimmer.connect(shimLp).connect(shimG);
    shimG.connect(ctx.destination);
    shimG.connect(delay);

    shimmer.start(now + 0.5);
    shimmer.stop(now + 1.45);

    // Sub-bass sine — grounding, no delay (direct to destination)
    const sub = ctx.createOscillator();
    sub.type = 'sine';
    sub.frequency.value = 55;

    const subG = ctx.createGain();
    subG.gain.setValueAtTime(0, now);
    subG.gain.linearRampToValueAtTime(0.08, now + 0.3);
    subG.gain.exponentialRampToValueAtTime(0.001, now + 1.0);

    sub.connect(subG).connect(ctx.destination);

    sub.start(now);
    sub.stop(now + 1.05);
  };

  return sounds;
}

export default { meta, createSounds };
