#!/bin/bash
# Generate index.html from theme directories

cards=""
for dir in */; do
  dir="${dir%/}"
  spec="$dir/$dir.md"
  sounds="$dir/sounds.js"
  [ -f "$spec" ] && [ -f "$sounds" ] || continue

  name=$(head -1 "$spec" | sed 's/^# //')
  desc=$(sed -n '3p' "$spec" | sed 's/^> //')

  # Extract first 5 hex colors from sounds.js meta.colors block
  colors=( $(grep -oE "'#[0-9A-Fa-f]{6}'" "$sounds" | sed "s/'//g" | head -5) )
  accent="${colors[0]:-#888}"
  accent2="${colors[1]:-#888}"
  danger="${colors[2]:-#888}"
  bg="${colors[3]:-#888}"
  surface="${colors[4]:-#888}"

  cards="$cards<a class=\"theme-card\" href=\"demo.html?theme=$dir\"><div class=\"name\">$name</div><div class=\"desc\">$desc</div><div class=\"colors\"><div class=\"swatch\" style=\"background:$accent\"></div><div class=\"swatch\" style=\"background:$accent2\"></div><div class=\"swatch\" style=\"background:$danger\"></div><div class=\"swatch\" style=\"background:$bg\"></div><div class=\"swatch\" style=\"background:$surface\"></div></div></a>"
done

cat > index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Ghost Signal</title>
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{--bg:#0A0A0C;--surface:#111116;--surface2:#1A1A22;--border:#2A2A35;--text:#E0E0E8;--text-dim:#6A6A78;--accent:#FCEE0A;--accent2:#00F0FF;--font:'Segoe UI',system-ui,-apple-system,sans-serif;--mono:'SF Mono','Cascadia Code','Consolas',monospace}
body{background:var(--bg);color:var(--text);font-family:var(--font);line-height:1.5;min-height:100vh}
body::after{content:'';position:fixed;inset:0;background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.06) 2px,rgba(0,0,0,.06) 4px);pointer-events:none;z-index:9999}
.container{max-width:640px;margin:0 auto;padding:60px 24px 80px}
header{text-align:center;margin-bottom:48px}
header h1{font-size:2.4rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:var(--accent);text-shadow:0 0 30px color-mix(in srgb,var(--accent) 30%,transparent)}
header p{color:var(--text-dim);font-size:.85rem;margin-top:8px;letter-spacing:.05em}
.theme-list{display:flex;flex-direction:column;gap:12px}
.theme-card{display:block;background:var(--surface);border:1px solid var(--border);border-radius:6px;padding:20px 24px;text-decoration:none;color:var(--text);transition:all .15s;position:relative;overflow:hidden}
.theme-card::before{content:'';position:absolute;top:0;left:0;width:3px;height:100%;background:var(--accent2);opacity:0;transition:opacity .15s}
.theme-card:hover{border-color:var(--accent2);background:var(--surface2)}
.theme-card:hover::before{opacity:1}
.theme-card .name{font-size:.95rem;font-weight:600;letter-spacing:.08em;text-transform:uppercase}
.theme-card .desc{font-size:.78rem;color:var(--text-dim);margin-top:6px;line-height:1.4}
.theme-card .colors{display:flex;gap:4px;margin-top:10px}
.theme-card .swatch{width:14px;height:14px;border-radius:3px;border:1px solid var(--border)}
footer{text-align:center;margin-top:48px;font-size:.7rem;color:var(--text-dim);font-family:var(--mono);letter-spacing:.05em}
footer a{color:var(--accent2);text-decoration:none}
footer a:hover{text-decoration:underline}
</style>
</head>
<body>
<div class="container">
<header><h1>Ghost Signal</h1><p>Browser audio themes &mdash; Web Audio API synthesis</p></header>
<div class="theme-list">
EOF

echo "$cards" >> index.html

cat >> index.html << 'EOF'
</div>
<footer>16 sounds per theme &mdash; zero dependencies &mdash; <a href="https://github.com/wk-j/ghost-signal">source</a></footer>
</div>
</body>
</html>
EOF
