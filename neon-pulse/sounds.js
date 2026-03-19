// ═══════════════════════════════════════════════════════════════════
// Neon Pulse — sounds.js
// Cyber-grid high-energy interface — ES module
// ═══════════════════════════════════════════════════════════════════

const meta = {
  name: 'Neon Pulse',
  subtitle: 'Cyber-grid high-energy interface',
  colors: {
    accent:   '#FF00FF',
    accent2:  '#00FFFF',
    danger:   '#FF3300',
    bg:       '#08080A',
    surface:  '#121217',
    surface2: '#1C1C24',
    border:   '#2A2A35',
    text:     '#E0E0E0',
    textDim:  '#707085',
  },
  placeholder: 'Initialize grid communication...',
  sounds: {
    HOVER:            { label: 'Hover',          meta: '45ms / 880Hz / PWM', desc: 'Neon trace energetic zip' },
    HOVER_UP:         { label: 'Hover Up',       meta: '35ms / 660Hz / PWM', desc: 'Circuit closing recession' },
    CLICK:            { label: 'Click',           meta: '25ms / 1100Hz / PWM', desc: 'Digital logic gate flip' },
    IMPORTANT_CLICK:  { label: 'Important Click', meta: '140ms / 220Hz / PWM', desc: 'Master grid sector pulse' },
    FEATURE_SWITCH_ON:{ label: 'Feature Switch On',  meta: '320ms / Pulse rise', desc: 'Subsystem power sequence' },
    FEATURE_SWITCH_OFF:{ label: 'Feature Switch Off', meta: '280ms / Falling seq', desc: 'Subsystem shutdown' },
    LIMITER_ON:       { label: 'Limiter On',      meta: '180ms / Clamp beeps', desc: 'Digital safety engaging' },
    LIMITER_OFF:      { label: 'Limiter Off',     meta: '200ms / Digital sigh', desc: 'Digital safety disengaging' },
    SWITCH_TOGGLE:    { label: 'Switch Toggle',   meta: '80ms / Tactile blip', desc: 'Neon dashboard flip' },
    TAB_INSERT:       { label: 'Tab Insert',      meta: '220ms / Slide-in', desc: 'Data grid entry' },
    TAB_CLOSE:        { label: 'Tab Close',       meta: '150ms / Collapse', desc: 'Grid sector removal' },
    TAB_SLASH:        { label: 'Tab Slash',       meta: '120ms / Data slice', desc: 'Digital stream cut' },
    TYPING_LETTER:    { label: 'Typing Letter',   meta: '30ms / 10 variants', desc: 'Neon pulse data entry' },
    TYPING_BACKSPACE: { label: 'Typing Backspace', meta: '45ms / Rev blip', desc: 'Data point deletion' },
    TYPING_ENTER:     { label: 'Typing Enter',    meta: '120ms / Confirmed', desc: 'Command line commit' },
    TYPING_SPACE:     { label: 'Typing Space',    meta: '60ms / Air pulse', desc: 'Grid spacing pulse' },
    APP_START:        { label: 'App Start',       meta: '1.2s / Surge', desc: 'Neon grid initialization' },
  },
};

// ═══════════════════════════════════════════════════════════════════
// SONIC DNA
// ═══════════════════════════════════════════════════════════════════
// Primary waveform:    Pulse-Width Modulated (PWM) Square (via two saws)
// Signature effect:    Logic Gate Shimmer (12–25 Hz square LFO gain mod)
// Transient character: Frequency-Slide "Blip" (2–4ms exponential slide)
// Envelope philosophy: Rhythmic Staccato (zero sustain, digital cutoffs)
// Frequency world:     Neon-Bright Highs (resonant fundamental + high-shelf)
//
// Every sound below must use at least one signature technique.
// ═══════════════════════════════════════════════════════════════════

function createSounds(ctx, noiseBuffer) {
  const sounds = {};

  // Helper to create a PWM oscillator pair
  function createPWM(freq, detune = 1.5) {
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const inv = ctx.createGain();
    
    osc1.type = 'sawtooth';
    osc2.type = 'sawtooth';
    osc1.frequency.value = freq;
    osc2.frequency.value = freq + detune;
    inv.gain.value = -1;
    
    osc2.connect(inv);
    
    return {
      osc1, osc2, inv,
      connect: (dest) => {
        osc1.connect(dest);
        inv.connect(dest);
        return dest;
      },
      start: (t) => { osc1.start(t); osc2.start(t); },
      stop: (t) => { osc1.stop(t); osc2.stop(t); },
      setFreq: (f, t, isExp = false) => {
        if (isExp) {
          osc1.frequency.exponentialRampToValueAtTime(f, t);
          osc2.frequency.exponentialRampToValueAtTime(f + detune, t);
        } else {
          osc1.frequency.setValueAtTime(f, t);
          osc2.frequency.setValueAtTime(f + detune, t);
        }
      }
    };
  }

  // ---------------------------------------------------------------
  // 1. HOVER — Neon trace energetic zip, 45ms
  // ---------------------------------------------------------------
  sounds.HOVER = function() {
    const now = ctx.currentTime;
    const pwm = createPWM(880);
    const lG = ctx.createGain(); // Logic Gate Shimmer
    const lfo = ctx.createOscillator();
    const lfoG = ctx.createGain();
    const hp = ctx.createBiquadFilter();
    const mG = ctx.createGain();

    lfo.type = 'square';
    lfo.frequency.value = 20;
    lfoG.gain.value = 0.4; // 40% depth
    lfo.connect(lfoG).connect(lG.gain);
    lG.gain.value = 0.6; // Base gain

    hp.type = 'highpass';
    hp.frequency.value = 400;

    pwm.setFreq(1200, now);
    pwm.setFreq(880, now + 0.004, true);

    mG.gain.setValueAtTime(0, now);
    mG.gain.linearRampToValueAtTime(0.08, now + 0.002);
    mG.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

    pwm.connect(lG);
    lG.connect(hp).connect(mG).connect(ctx.destination);

    lfo.start(now);
    pwm.start(now);
    lfo.stop(now + 0.045);
    pwm.stop(now + 0.045);
  };

  // ---------------------------------------------------------------
  // 2. HOVER_UP — Circuit closing recession, 35ms
  // ---------------------------------------------------------------
  sounds.HOVER_UP = function() {
    const now = ctx.currentTime;
    const pwm = createPWM(660);
    const lG = ctx.createGain();
    const lfo = ctx.createOscillator();
    const lfoG = ctx.createGain();
    const bp = ctx.createBiquadFilter();
    const mG = ctx.createGain();

    lfo.type = 'square';
    lfo.frequency.value = 25;
    lfoG.gain.value = 0.5;
    lfo.connect(lfoG).connect(lG.gain);
    lG.gain.value = 0.5;

    bp.type = 'bandpass';
    bp.frequency.value = 1200;
    bp.Q.value = 1;

    pwm.setFreq(660, now);
    pwm.setFreq(440, now + 0.035, false);

    mG.gain.setValueAtTime(0, now);
    mG.gain.linearRampToValueAtTime(0.06, now + 0.001);
    mG.gain.linearRampToValueAtTime(0.001, now + 0.035);

    pwm.connect(lG);
    lG.connect(bp).connect(mG).connect(ctx.destination);

    lfo.start(now);
    pwm.start(now);
    lfo.stop(now + 0.035);
    pwm.stop(now + 0.035);
  };

  // ---------------------------------------------------------------
  // 3. CLICK — Digital logic gate flip, 25ms
  // ---------------------------------------------------------------
  sounds.CLICK = function() {
    const now = ctx.currentTime;
    const pwm = createPWM(1100);
    const mG = ctx.createGain();
    const nBuf = noiseBuffer(0.005);
    const nSrc = ctx.createBufferSource();
    nSrc.buffer = nBuf;
    const nG = ctx.createGain();
    const nHp = ctx.createBiquadFilter();

    pwm.setFreq(4400, now);
    pwm.setFreq(1100, now + 0.002, true);

    mG.gain.setValueAtTime(0, now);
    mG.gain.linearRampToValueAtTime(0.15, now + 0.0005);
    mG.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

    nHp.type = 'highpass';
    nHp.frequency.value = 6000;
    nG.gain.setValueAtTime(0.05, now);
    nG.gain.exponentialRampToValueAtTime(0.001, now + 0.002);

    pwm.connect(mG).connect(ctx.destination);
    nSrc.connect(nHp).connect(nG).connect(ctx.destination);

    pwm.start(now);
    nSrc.start(now);
    pwm.stop(now + 0.025);
    nSrc.stop(now + 0.002);
  };

  // ---------------------------------------------------------------
  // 4. IMPORTANT_CLICK — Master grid sector pulse, 140ms
  // ---------------------------------------------------------------
  sounds.IMPORTANT_CLICK = function() {
    const now = ctx.currentTime;
    const pwm = createPWM(220);
    const lG = ctx.createGain();
    const lfo = ctx.createOscillator();
    const lfoG = ctx.createGain();
    const sub = ctx.createOscillator();
    const sG = ctx.createGain();
    const mG = ctx.createGain();

    lfo.type = 'square';
    lfo.frequency.value = 15;
    lfoG.gain.value = 0.6;
    lfo.connect(lfoG).connect(lG.gain);
    lG.gain.value = 0.4;

    pwm.setFreq(880, now);
    pwm.setFreq(220, now + 0.008, true);

    sub.type = 'sine';
    sub.frequency.value = 55;
    sG.gain.setValueAtTime(0, now);
    sG.gain.linearRampToValueAtTime(0.1, now + 0.002);
    sG.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    mG.gain.setValueAtTime(0, now);
    mG.gain.linearRampToValueAtTime(0.2, now + 0.002);
    mG.gain.setValueAtTime(0.15, now + 0.02);
    mG.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

    pwm.connect(lG).connect(mG).connect(ctx.destination);
    sub.connect(sG).connect(ctx.destination);

    lfo.start(now);
    pwm.start(now);
    sub.start(now);
    lfo.stop(now + 0.14);
    pwm.stop(now + 0.14);
    sub.stop(now + 0.08);
  };

  // ---------------------------------------------------------------
  // 5. FEATURE_SWITCH_ON — Subsystem power sequence, 320ms
  // ---------------------------------------------------------------
  sounds.FEATURE_SWITCH_ON = function() {
    const now = ctx.currentTime;
    const freqs = [440, 880, 1320];
    const lp = ctx.createBiquadFilter();
    const mG = ctx.createGain();

    lp.type = 'lowpass';
    lp.Q.value = 4;
    lp.frequency.setValueAtTime(500, now);
    lp.frequency.exponentialRampToValueAtTime(5000, now + 0.32);

    freqs.forEach((f, i) => {
      const startTime = now + (i * 0.04);
      const pwm = createPWM(f);
      const lG = ctx.createGain();
      const lfo = ctx.createOscillator();
      const lfoG = ctx.createGain();
      
      lfo.type = 'square';
      lfo.frequency.value = 16;
      lfoG.gain.value = 1.0;
      lfo.connect(lfoG).connect(lG.gain);
      lG.gain.value = 0;

      pwm.setFreq(f, startTime);
      pwm.setFreq(f * 1.5, startTime + 0.2, true);

      pwm.connect(lG).connect(lp);
      lfo.start(startTime);
      pwm.start(startTime);
      lfo.stop(startTime + 0.2);
      pwm.stop(startTime + 0.2);
    });

    mG.gain.setValueAtTime(0, now);
    mG.gain.linearRampToValueAtTime(0.1, now + 0.01);
    mG.gain.exponentialRampToValueAtTime(0.001, now + 0.32);

    lp.connect(mG).connect(ctx.destination);
  };

  // ---------------------------------------------------------------
  // 6. FEATURE_SWITCH_OFF — Descending digital sequence, 280ms
  // ---------------------------------------------------------------
  sounds.FEATURE_SWITCH_OFF = function() {
    const now = ctx.currentTime;
    const pwm = createPWM(440);
    const lG = ctx.createGain();
    const lfo = ctx.createOscillator();
    const lfoG = ctx.createGain();
    const lp = ctx.createBiquadFilter();
    const mG = ctx.createGain();

    lfo.type = 'square';
    lfo.frequency.value = 12;
    lfoG.gain.value = 0.8;
    lfo.connect(lfoG).connect(lG.gain);
    lG.gain.value = 0.2;

    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(3000, now);
    lp.frequency.exponentialRampToValueAtTime(200, now + 0.28);

    pwm.setFreq(440, now);
    pwm.setFreq(390, now + 0.1, false);
    pwm.setFreq(330, now + 0.1);
    pwm.setFreq(280, now + 0.2, false);
    pwm.setFreq(220, now + 0.2);
    pwm.setFreq(170, now + 0.28, false);

    mG.gain.setValueAtTime(0.1, now);
    mG.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

    pwm.connect(lG).connect(lp).connect(mG).connect(ctx.destination);
    lfo.start(now);
    pwm.start(now);
    lfo.stop(now + 0.28);
    pwm.stop(now + 0.28);
  };

  // ---------------------------------------------------------------
  // 7. LIMITER_ON — Digital safety engaging, 180ms
  // ---------------------------------------------------------------
  sounds.LIMITER_ON = function() {
    const now = ctx.currentTime;
    const pwm = createPWM(1760);
    const mG = ctx.createGain();
    const lG = ctx.createGain();
    const lfo = ctx.createOscillator();
    const bp = ctx.createBiquadFilter();

    lfo.type = 'square';
    lfo.frequency.value = 50;
    lfo.connect(lG.gain);
    lG.gain.value = 0;

    bp.type = 'bandpass';
    bp.frequency.value = 1760;
    bp.Q.value = 10;

    mG.gain.setValueAtTime(0, now);
    mG.gain.linearRampToValueAtTime(0.1, now + 0.002);
    
    // Stutter for 60ms
    pwm.connect(lG).connect(bp).connect(mG).connect(ctx.destination);
    lfo.start(now);
    pwm.start(now);
    
    // Switch to solid gain
    lG.gain.setValueAtTime(1, now + 0.06);
    lfo.stop(now + 0.06);

    mG.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
    pwm.stop(now + 0.18);
  };

  // ---------------------------------------------------------------
  // 8. LIMITER_OFF — Opening digital sigh, 200ms
  // ---------------------------------------------------------------
  sounds.LIMITER_OFF = function() {
    const now = ctx.currentTime;
    const pwm = createPWM(1320);
    const lp = ctx.createBiquadFilter();
    const mG = ctx.createGain();

    lp.type = 'lowpass';
    lp.Q.value = 5;
    lp.frequency.setValueAtTime(1000, now);
    lp.frequency.exponentialRampToValueAtTime(8000, now + 0.2);

    pwm.setFreq(1320, now);
    pwm.setFreq(1760, now + 0.2, true);

    mG.gain.setValueAtTime(0, now);
    mG.gain.linearRampToValueAtTime(0.1, now + 0.01);
    mG.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    pwm.connect(lp).connect(mG).connect(ctx.destination);
    pwm.start(now);
    pwm.stop(now + 0.2);
  };

  // ---------------------------------------------------------------
  // 9. SWITCH_TOGGLE — Neon dashboard flip, 80ms
  // ---------------------------------------------------------------
  sounds.SWITCH_TOGGLE = function() {
    const now = ctx.currentTime;
    
    // Pulse 1: high-freq blip
    const osc1 = ctx.createOscillator();
    const g1 = ctx.createGain();
    osc1.frequency.value = 2200;
    g1.gain.setValueAtTime(0.1, now);
    g1.gain.exponentialRampToValueAtTime(0.001, now + 0.005);
    osc1.connect(g1).connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.005);

    // Pulse 2: PWM blip
    const startTime = now + 0.015;
    const pwm = createPWM(880);
    const lG = ctx.createGain();
    const lfo = ctx.createOscillator();
    const mG = ctx.createGain();

    lfo.type = 'square';
    lfo.frequency.value = 20;
    lfo.connect(lG.gain);
    lG.gain.value = 0.5;

    mG.gain.setValueAtTime(0.1, startTime);
    mG.gain.exponentialRampToValueAtTime(0.001, startTime + 0.065);

    pwm.connect(lG).connect(mG).connect(ctx.destination);
    lfo.start(startTime);
    pwm.start(startTime);
    lfo.stop(startTime + 0.065);
    pwm.stop(startTime + 0.065);
  };

  // ---------------------------------------------------------------
  // 10. TAB_INSERT — Data grid entry, 220ms
  // ---------------------------------------------------------------
  sounds.TAB_INSERT = function() {
    const now = ctx.currentTime;
    const pwm = createPWM(440);
    const lG = ctx.createGain();
    const lfo = ctx.createOscillator();
    const lp = ctx.createBiquadFilter();
    const mG = ctx.createGain();

    lfo.type = 'square';
    lfo.frequency.value = 16;
    lfo.connect(lG.gain);
    lG.gain.value = 0.5;

    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(400, now);
    lp.frequency.exponentialRampToValueAtTime(4000, now + 0.22);

    pwm.setFreq(440, now);
    pwm.setFreq(660, now + 0.22, true);

    mG.gain.setValueAtTime(0, now);
    mG.gain.linearRampToValueAtTime(0.1, now + 0.03);
    mG.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    pwm.connect(lG).connect(lp).connect(mG).connect(ctx.destination);
    lfo.start(now);
    pwm.start(now);
    lfo.stop(now + 0.22);
    pwm.stop(now + 0.22);
  };

  // ---------------------------------------------------------------
  // 11. TAB_CLOSE — Grid sector removal, 150ms
  // ---------------------------------------------------------------
  sounds.TAB_CLOSE = function() {
    const now = ctx.currentTime;
    const pwm = createPWM(440);
    const lG = ctx.createGain();
    const lfo = ctx.createOscillator();
    const mG = ctx.createGain();

    lfo.type = 'square';
    lfo.frequency.setValueAtTime(20, now);
    lfo.frequency.exponentialRampToValueAtTime(40, now + 0.15);
    lfo.connect(lG.gain);
    lG.gain.value = 0.5;

    pwm.setFreq(440, now);
    pwm.setFreq(220, now + 0.15, true);

    mG.gain.setValueAtTime(0.1, now);
    mG.gain.linearRampToValueAtTime(0, now + 0.15);

    pwm.connect(lG).connect(mG).connect(ctx.destination);
    lfo.start(now);
    pwm.start(now);
    lfo.stop(now + 0.15);
    pwm.stop(now + 0.15);
  };

  // ---------------------------------------------------------------
  // 12. TAB_SLASH — Digital stream cut, 120ms
  // ---------------------------------------------------------------
  sounds.TAB_SLASH = function() {
    const now = ctx.currentTime;
    const pwm = createPWM(1760);
    const hp = ctx.createBiquadFilter();
    const mG = ctx.createGain();

    hp.type = 'highpass';
    hp.frequency.setValueAtTime(200, now);
    hp.frequency.exponentialRampToValueAtTime(2000, now + 0.12);

    pwm.setFreq(1760, now);
    pwm.setFreq(440, now + 0.12, true);

    mG.gain.setValueAtTime(0, now);
    mG.gain.linearRampToValueAtTime(0.15, now + 0.005);
    mG.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    pwm.connect(hp).connect(mG).connect(ctx.destination);
    pwm.start(now);
    pwm.stop(now + 0.12);
  };

  // ---------------------------------------------------------------
  // 13. TYPING_LETTER — Neon pulse data entry, 30ms (10 variants)
  // ---------------------------------------------------------------
  sounds.TYPING_LETTER = function() {
    const now = ctx.currentTime;
    const freq = 1200 + (Math.random() * 400);
    const pwm = createPWM(freq);
    const bp = ctx.createBiquadFilter();
    const mG = ctx.createGain();

    bp.type = 'bandpass';
    bp.frequency.value = freq;

    pwm.setFreq(freq, now);
    pwm.setFreq(freq - 200, now + 0.03, true);

    mG.gain.setValueAtTime(0, now);
    mG.gain.linearRampToValueAtTime(0.08, now + 0.002);
    mG.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

    pwm.connect(bp).connect(mG).connect(ctx.destination);
    pwm.start(now);
    pwm.stop(now + 0.03);
  };

  // ---------------------------------------------------------------
  // 14. TYPING_BACKSPACE — Data point deletion, 45ms
  // ---------------------------------------------------------------
  sounds.TYPING_BACKSPACE = function() {
    const now = ctx.currentTime;
    const pwm = createPWM(440);
    const mG = ctx.createGain();

    pwm.setFreq(440, now);
    pwm.setFreq(220, now + 0.045, true);

    mG.gain.setValueAtTime(0, now);
    mG.gain.linearRampToValueAtTime(0.1, now + 0.002);
    mG.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

    pwm.connect(mG).connect(ctx.destination);
    pwm.start(now);
    pwm.stop(now + 0.045);
  };

  // ---------------------------------------------------------------
  // 15. TYPING_ENTER — Command line commit, 120ms
  // ---------------------------------------------------------------
  sounds.TYPING_ENTER = function() {
    const now = ctx.currentTime;
    const pwm = createPWM(880);
    const mG = ctx.createGain();

    pwm.setFreq(1760, now);
    pwm.setFreq(880, now + 0.12, true);

    // Triple pulse pattern
    [0, 0.04, 0.08].forEach(t => {
      mG.gain.setValueAtTime(0.001, now + t);
      mG.gain.linearRampToValueAtTime(0.12, now + t + 0.002);
      mG.gain.exponentialRampToValueAtTime(0.001, now + t + 0.03);
    });

    pwm.connect(mG).connect(ctx.destination);
    pwm.start(now);
    pwm.stop(now + 0.12);
  };

  // ---------------------------------------------------------------
  // 16. TYPING_SPACE — Grid spacing pulse, 60ms
  // ---------------------------------------------------------------
  sounds.TYPING_SPACE = function() {
    const now = ctx.currentTime;
    const pwm = createPWM(220);
    const bp = ctx.createBiquadFilter();
    const lG = ctx.createGain();
    const lfo = ctx.createOscillator();
    const mG = ctx.createGain();

    lfo.type = 'square';
    lfo.frequency.value = 15;
    lfo.connect(lG.gain);
    lG.gain.value = 0.5;

    bp.type = 'bandpass';
    bp.frequency.value = 220;
    bp.Q.value = 0.5;

    mG.gain.setValueAtTime(0, now);
    mG.gain.linearRampToValueAtTime(0.08, now + 0.005);
    mG.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    pwm.connect(lG).connect(bp).connect(mG).connect(ctx.destination);
    lfo.start(now);
    pwm.start(now);
    lfo.stop(now + 0.06);
    pwm.stop(now + 0.06);
  };

  // ---------------------------------------------------------------
  // 17. APP_START — Neon grid initialization, 1.2s
  // ---------------------------------------------------------------
  sounds.APP_START = function() {
    const now = ctx.currentTime;
    const root = 110;
    const harmonics = [1, 2, 4, 8];
    const sub = ctx.createOscillator();
    const sG = ctx.createGain();
    const lp = ctx.createBiquadFilter();
    const mG = ctx.createGain();

    lp.type = 'lowpass';
    lp.Q.value = 6;
    lp.frequency.setValueAtTime(100, now);
    lp.frequency.exponentialRampToValueAtTime(5000, now + 0.8);

    sub.type = 'sine';
    sub.frequency.setValueAtTime(55, now);
    sub.frequency.exponentialRampToValueAtTime(110, now + 0.8);
    sG.gain.setValueAtTime(0, now);
    sG.gain.linearRampToValueAtTime(0.15, now + 0.1);
    sG.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

    harmonics.forEach(h => {
      const pwm = createPWM(root * h);
      const lG = ctx.createGain();
      const lfo = ctx.createOscillator();
      const lfoG = ctx.createGain();
      
      lfo.type = 'square';
      lfo.frequency.setValueAtTime(4, now);
      lfo.frequency.exponentialRampToValueAtTime(32, now + 0.8);
      lfoG.gain.value = 1.0;
      lfo.connect(lfoG).connect(lG.gain);
      lG.gain.value = 0;

      pwm.setFreq(root * h, now);
      pwm.setFreq(root * h * 2, now + 0.8, true);

      pwm.connect(lG).connect(lp);
      lfo.start(now);
      pwm.start(now);
      lfo.stop(now + 1.2);
      pwm.stop(now + 1.2);
    });

    // Neon flicker at the end
    const flickerG = ctx.createGain();
    flickerG.gain.setValueAtTime(1, now + 0.8);
    for (let i = 0; i < 20; i++) {
      flickerG.gain.setValueAtTime(0.7 + Math.random() * 0.3, now + 0.8 + (i * 0.02));
    }

    mG.gain.setValueAtTime(0, now);
    mG.gain.linearRampToValueAtTime(0.2, now + 0.4);
    mG.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

    lp.connect(flickerG).connect(mG).connect(ctx.destination);
    sub.connect(sG).connect(ctx.destination);
    sub.start(now);
    sub.stop(now + 1.2);
  };

  return sounds;
}

export default { meta, createSounds };
