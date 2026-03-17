#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════════
// export-wav.js — Render a Ghost Signal theme to WAV files
// ═══════════════════════════════════════════════════════════════════
//
// Usage:  npm install --no-save puppeteer && node export-wav.js <theme-name>
// Output: <theme-name>/wav/HOVER.wav, CLICK.wav, ...
//
// Requires: puppeteer (npm install --no-save puppeteer)
// ═══════════════════════════════════════════════════════════════════

const puppeteer = require('puppeteer');
const http = require('http');
const fs = require('fs');
const path = require('path');

const SAMPLE_RATE = 44100;
const DURATION = 3; // seconds — long enough for any sound (APP_START is ~2.5s)

const SOUND_IDS = [
  'HOVER', 'HOVER_UP',
  'CLICK', 'IMPORTANT_CLICK',
  'FEATURE_SWITCH_ON', 'FEATURE_SWITCH_OFF',
  'LIMITER_ON', 'LIMITER_OFF',
  'SWITCH_TOGGLE',
  'TAB_INSERT', 'TAB_CLOSE', 'TAB_SLASH',
  'APP_START',
  'TYPING_LETTER', 'TYPING_BACKSPACE', 'TYPING_ENTER', 'TYPING_SPACE',
];

// ── CLI args ───────────────────────────────────────────────────────

const themeName = process.argv[2];
if (!themeName) {
  console.error('Usage: node export-wav.js <theme-name>');
  console.error('Example: node export-wav.js ghost-signal');
  process.exit(1);
}

const themeDir = path.join(__dirname, themeName);
if (!fs.existsSync(path.join(themeDir, 'sounds.js'))) {
  console.error(`Error: ${themeName}/sounds.js not found`);
  process.exit(1);
}

const outDir = path.join(themeDir, 'wav');

// ── Static file server with virtual export page ────────────────────

const MIME = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
};

function createServer(themeName) {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      // Serve a virtual export page at /export.html
      if (req.url === '/export.html') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`<!DOCTYPE html>
<html><head><meta charset="UTF-8"></head>
<body>
<script type="module">
async function renderAll() {
  const SAMPLE_RATE = ${SAMPLE_RATE};
  const DURATION = ${DURATION};
  const SOUND_IDS = ${JSON.stringify(SOUND_IDS)};

  const mod = await import('./${themeName}/sounds.js');
  const theme = mod.default;
  const output = {};
  const errors = {};

  for (const id of SOUND_IDS) {
    try {
      const offCtx = new OfflineAudioContext(1, SAMPLE_RATE * DURATION, SAMPLE_RATE);

      function noiseBuffer(dur = 0.1) {
        const len = offCtx.sampleRate * dur;
        const buf = offCtx.createBuffer(1, len, offCtx.sampleRate);
        const data = buf.getChannelData(0);
        for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
        return buf;
      }

      const sounds = theme.createSounds(offCtx, noiseBuffer);

      if (typeof sounds[id] !== 'function') {
        errors[id] = 'not a function';
        continue;
      }

      sounds[id]();
      const audioBuffer = await offCtx.startRendering();
      const float32 = audioBuffer.getChannelData(0);

      // Trim trailing silence
      const threshold = 0.001;
      let lastNonSilent = float32.length - 1;
      while (lastNonSilent > 0 && Math.abs(float32[lastNonSilent]) < threshold) {
        lastNonSilent--;
      }
      const trimEnd = Math.min(float32.length, lastNonSilent + Math.floor(SAMPLE_RATE * 0.05));
      const trimmed = float32.slice(0, trimEnd + 1);

      // Float32 to Int16 PCM
      const int16 = new Int16Array(trimmed.length);
      for (let i = 0; i < trimmed.length; i++) {
        const s = Math.max(-1, Math.min(1, trimmed[i]));
        int16[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
      }

      // WAV header
      const dataSize = int16.length * 2;
      const wav = new ArrayBuffer(44 + dataSize);
      const v = new DataView(wav);

      function writeStr(off, str) { for (let i = 0; i < str.length; i++) v.setUint8(off + i, str.charCodeAt(i)); }
      writeStr(0, 'RIFF');
      v.setUint32(4, 36 + dataSize, true);
      writeStr(8, 'WAVE');
      writeStr(12, 'fmt ');
      v.setUint32(16, 16, true);
      v.setUint16(20, 1, true);
      v.setUint16(22, 1, true);
      v.setUint32(24, SAMPLE_RATE, true);
      v.setUint32(28, SAMPLE_RATE * 2, true);
      v.setUint16(32, 2, true);
      v.setUint16(34, 16, true);
      writeStr(36, 'data');
      v.setUint32(40, dataSize, true);

      const pcmBytes = new Uint8Array(int16.buffer);
      const wavBytes = new Uint8Array(wav);
      wavBytes.set(pcmBytes, 44);

      // Base64 encode for transport
      let bin = '';
      const chunk = 8192;
      for (let i = 0; i < wavBytes.length; i += chunk) {
        bin += String.fromCharCode.apply(null, wavBytes.subarray(i, i + chunk));
      }
      output[id] = btoa(bin);
    } catch (e) {
      errors[id] = e.message || String(e);
    }
  }

  window.__exportResult = { output, errors, name: theme.meta.name };
}

renderAll().then(() => {
  window.__exportDone = true;
}).catch((e) => {
  window.__exportResult = { output: {}, errors: { _fatal: e.message }, name: '' };
  window.__exportDone = true;
});
</script>
</body></html>`);
        return;
      }

      // Serve static files
      const filePath = path.join(__dirname, decodeURIComponent(req.url));
      const ext = path.extname(filePath);
      const contentType = MIME[ext] || 'application/octet-stream';

      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(404);
          res.end('Not found');
          return;
        }
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
      });
    });

    server.listen(0, '127.0.0.1', () => {
      const port = server.address().port;
      resolve({ server, port });
    });
  });
}

// ── Main ────────────────────────────────────────────────────────────

async function main() {
  process.stdout.write(`\nExporting theme: ${themeName}\n`);
  process.stdout.write(`Output: ${outDir}/\n\n`);

  // Create output directory
  fs.mkdirSync(outDir, { recursive: true });

  // Start local server
  const { server, port } = await createServer(themeName);
  const baseUrl = `http://127.0.0.1:${port}`;

  // Launch headless browser
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Capture console messages from the browser (ignore favicon 404s)
  page.on('console', (msg) => {
    if (msg.type() === 'error' && !msg.text().includes('favicon')) {
      process.stderr.write(`  [browser] ${msg.text()}\n`);
    }
  });
  page.on('pageerror', (err) => {
    process.stderr.write(`  [page error] ${err.message}\n`);
  });

  // Navigate to our virtual export page (served by our HTTP server)
  await page.goto(`${baseUrl}/export.html`, { waitUntil: 'networkidle0', timeout: 10000 });

  // Wait for rendering to complete
  await page.waitForFunction('window.__exportDone === true', { timeout: 30000 });

  // Retrieve results
  const results = await page.evaluate(() => window.__exportResult);

  await browser.close();
  server.close();

  // Write WAV files
  if (results.name) {
    process.stdout.write(`Theme: ${results.name}\n\n`);
  }

  let exported = 0;
  let failed = 0;

  for (const id of SOUND_IDS) {
    if (results.output[id]) {
      const wavPath = path.join(outDir, `${id}.wav`);
      const buffer = Buffer.from(results.output[id], 'base64');
      fs.writeFileSync(wavPath, buffer);
      const kb = (buffer.length / 1024).toFixed(1);
      const ms = Math.round((buffer.length - 44) / (SAMPLE_RATE * 2) * 1000);
      process.stdout.write(`  OK  ${id}.wav  (${ms}ms, ${kb} KB)\n`);
      exported++;
    } else {
      const err = results.errors[id] || 'unknown error';
      process.stdout.write(`  ERR ${id}  — ${err}\n`);
      failed++;
    }
  }

  if (results.errors._fatal) {
    process.stderr.write(`\nFatal browser error: ${results.errors._fatal}\n`);
  }

  process.stdout.write(`\nDone: ${exported} exported, ${failed} failed\n`);
  process.stdout.write(`Files: ${outDir}/\n`);
}

main().catch((err) => {
  process.stderr.write(`Fatal error: ${err.message}\n`);
  process.exit(1);
});
