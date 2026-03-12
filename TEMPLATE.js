// ═══════════════════════════════════════════════════════════════════
// {{THEME_NAME}} — sounds.js
// {{THEME_SUBTITLE}} — ES module
// ═══════════════════════════════════════════════════════════════════

const meta = {
  name: '{{Theme Name}}',
  subtitle: '{{Theme subtitle — Web Audio API synthesis}}',
  colors: {
    accent:   '{{#HEX}}',
    accent2:  '{{#HEX}}',
    danger:   '{{#HEX}}',
    bg:       '{{#HEX}}',
    surface:  '{{#HEX}}',
    surface2: '{{#HEX}}',
    border:   '{{#HEX}}',
    text:     '{{#HEX}}',
    textDim:  '{{#HEX}}',
  },
  placeholder: '{{Typing placeholder text}}',
  sounds: {
    HOVER:            { label: 'Hover',          meta: '{{duration / freq / waveform}}', desc: '{{concept}}' },
    HOVER_UP:         { label: 'Hover Up',       meta: '{{duration / freq / waveform}}', desc: '{{concept}}' },
    CLICK:            { label: 'Click',           meta: '{{duration / freq / waveform}}', desc: '{{concept}}' },
    IMPORTANT_CLICK:  { label: 'Important Click', meta: '{{duration / freq / waveform}}', desc: '{{concept}}' },
    FEATURE_SWITCH_ON:{ label: 'Feature Switch',  meta: '{{ON dur / OFF dur — concept}}', desc: '' },
    LIMITER_ON:       { label: 'Limiter',         meta: '{{ON dur / OFF dur — concept}}', desc: '' },
    SWITCH_TOGGLE:    { label: 'Switch Toggle',   meta: '{{duration — concept}}',         desc: '' },
    TAB_INSERT:       { label: 'Tab Insert',      meta: '{{duration / pattern}}',         desc: '{{concept}}' },
    TAB_CLOSE:        { label: 'Tab Close',       meta: '{{duration / pattern}}',         desc: '{{concept}}' },
    TAB_SLASH:        { label: 'Tab Slash',       meta: '{{duration / freq / waveform}}', desc: '{{concept}}' },
    TYPING_LETTER:    { label: 'Typing Letter',   meta: '{{duration / variants}}',        desc: '{{concept}}' },
    TYPING_BACKSPACE: { label: 'Typing Backspace', meta: '{{duration / waveform}}',       desc: '{{concept}}' },
    TYPING_ENTER:     { label: 'Typing Enter',    meta: '{{duration / pattern}}',         desc: '{{concept}}' },
    TYPING_SPACE:     { label: 'Typing Space',    meta: '{{duration / pattern}}',         desc: '{{concept}}' },
  },
};

function createSounds(ctx, noiseBuffer) {
  const sounds = {};

  // ---------------------------------------------------------------
  // 1. HOVER — {{description}}, {{duration}}
  // ---------------------------------------------------------------
  sounds.HOVER = function() {
    const now = ctx.currentTime;
    // {{IMPLEMENT: hover sound}}
  };

  // ---------------------------------------------------------------
  // 2. HOVER_UP — {{description}}, {{duration}}
  // ---------------------------------------------------------------
  sounds.HOVER_UP = function() {
    const now = ctx.currentTime;
    // {{IMPLEMENT: hover up sound}}
  };

  // ---------------------------------------------------------------
  // 3. CLICK — {{description}}, {{duration}}
  // ---------------------------------------------------------------
  sounds.CLICK = function() {
    const now = ctx.currentTime;
    // {{IMPLEMENT: click sound}}
  };

  // ---------------------------------------------------------------
  // 4. IMPORTANT_CLICK — {{description}}, {{duration}}
  // ---------------------------------------------------------------
  sounds.IMPORTANT_CLICK = function() {
    const now = ctx.currentTime;
    // {{IMPLEMENT: important click sound}}
  };

  // ---------------------------------------------------------------
  // 5. FEATURE_SWITCH_ON — {{description}}, {{duration}}
  // ---------------------------------------------------------------
  sounds.FEATURE_SWITCH_ON = function() {
    const now = ctx.currentTime;
    // {{IMPLEMENT: feature switch on sound}}
  };

  // ---------------------------------------------------------------
  // 6. FEATURE_SWITCH_OFF — {{description}}, {{duration}}
  // ---------------------------------------------------------------
  sounds.FEATURE_SWITCH_OFF = function() {
    const now = ctx.currentTime;
    // {{IMPLEMENT: feature switch off sound}}
  };

  // ---------------------------------------------------------------
  // 7. LIMITER_ON — {{description}}, {{duration}}
  // ---------------------------------------------------------------
  sounds.LIMITER_ON = function() {
    const now = ctx.currentTime;
    // {{IMPLEMENT: limiter on sound}}
  };

  // ---------------------------------------------------------------
  // 8. LIMITER_OFF — {{description}}, {{duration}}
  // ---------------------------------------------------------------
  sounds.LIMITER_OFF = function() {
    const now = ctx.currentTime;
    // {{IMPLEMENT: limiter off sound}}
  };

  // ---------------------------------------------------------------
  // 9. SWITCH_TOGGLE — {{description}}, {{duration}}
  // ---------------------------------------------------------------
  sounds.SWITCH_TOGGLE = function() {
    const now = ctx.currentTime;
    // {{IMPLEMENT: switch toggle sound}}
  };

  // ---------------------------------------------------------------
  // 10. TAB_INSERT — {{description}}, {{duration}}
  // ---------------------------------------------------------------
  sounds.TAB_INSERT = function() {
    const now = ctx.currentTime;
    // {{IMPLEMENT: tab insert sound}}
  };

  // ---------------------------------------------------------------
  // 11. TAB_CLOSE — {{description}}, {{duration}}
  // ---------------------------------------------------------------
  sounds.TAB_CLOSE = function() {
    const now = ctx.currentTime;
    // {{IMPLEMENT: tab close sound}}
  };

  // ---------------------------------------------------------------
  // 12. TAB_SLASH — {{description}}, {{duration}}
  // ---------------------------------------------------------------
  sounds.TAB_SLASH = function() {
    const now = ctx.currentTime;
    // {{IMPLEMENT: tab slash sound}}
  };

  // ---------------------------------------------------------------
  // 13. TYPING_LETTER — {{description}}, {{duration}} ({{N}} variants)
  // ---------------------------------------------------------------
  sounds.TYPING_LETTER = function() {
    const now = ctx.currentTime;
    // {{IMPLEMENT: typing letter sound with randomized variants}}
  };

  // ---------------------------------------------------------------
  // 14. TYPING_BACKSPACE — {{description}}, {{duration}}
  // ---------------------------------------------------------------
  sounds.TYPING_BACKSPACE = function() {
    const now = ctx.currentTime;
    // {{IMPLEMENT: typing backspace sound}}
  };

  // ---------------------------------------------------------------
  // 15. TYPING_ENTER — {{description}}, {{duration}}
  // ---------------------------------------------------------------
  sounds.TYPING_ENTER = function() {
    const now = ctx.currentTime;
    // {{IMPLEMENT: typing enter sound}}
  };

  // ---------------------------------------------------------------
  // 16. TYPING_SPACE — {{description}}, {{duration}}
  // ---------------------------------------------------------------
  sounds.TYPING_SPACE = function() {
    const now = ctx.currentTime;
    // {{IMPLEMENT: typing space sound}}
  };

  return sounds;
}

export default { meta, createSounds };
