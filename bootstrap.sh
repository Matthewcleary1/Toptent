#!/usr/bin/env bash
set -euo pipefail
cat .bootstrap/source.part1 .bootstrap/source.part2 .bootstrap/source.part3 .bootstrap/source.part4 | base64 --decode > /tmp/tenttop-source.tar.xz
tar -xJf /tmp/tenttop-source.tar.xz -C .

cat .bootstrap/overrides.part1 .bootstrap/overrides.part2 .bootstrap/overrides.part3 .bootstrap/overrides.part4 | base64 --decode > /tmp/tenttop-overrides.tar.xz
tar -xJf /tmp/tenttop-overrides.tar.xz -C .

# Apply the maintained bilingual source layer after the base application and
# content-audit overlay so English remains the default and /es is server-rendered.
if [ -d .i18n ]; then
  cp -a .i18n/lib/. lib/
  cp -a .i18n/components/. components/
  cp -a .i18n/app/. app/
  cp -a .i18n/proxy.ts ./proxy.ts
  base64 --decode .i18n/remainder.b64 > /tmp/tenttop-i18n-remainder.tar.xz
  tar -xJf /tmp/tenttop-i18n-remainder.tar.xz -C .
fi

# Canonical business/product brand is TopTent Pro. Normalise customer-facing
# source at build time without altering URLs or environment identifiers.
node <<'NODE'
const fs = require('fs');
const path = require('path');

const roots = ['app', 'components', 'lib', 'supabase', 'docs'];
const textExtensions = new Set(['.ts', '.tsx', '.js', '.jsx', '.css', '.md', '.sql', '.json', '.txt']);

function rewriteFile(file) {
  const ext = path.extname(file);
  if (!textExtensions.has(ext)) return;
  const source = fs.readFileSync(file, 'utf8');
  const updated = source
    .replace(/\bTENTTOP\b/g, 'TOPTENT PRO')
    .replace(/\bTenttop\b/g, 'TopTent Pro')
    .replace(/\bTopTent\b(?! Pro)/g, 'TopTent Pro');
  if (updated !== source) fs.writeFileSync(file, updated);
}

function walk(target) {
  if (!fs.existsSync(target)) return;
  const stat = fs.statSync(target);
  if (stat.isFile()) return rewriteFile(target);
  for (const entry of fs.readdirSync(target, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.next' || entry.name === '.git') continue;
    walk(path.join(target, entry.name));
  }
}

for (const root of roots) walk(root);
NODE

# Keep form grid children shrinkable on small screens.
cat >> app/globals.css <<'CSS'

.form-card,
.form-card > *,
.form-card label,
.form-card .grid,
.input {
  min-width: 0;
  min-inline-size: 0;
  max-width: 100%;
}

.form-card .input {
  display: block;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  box-sizing: border-box;
}

/*
 * iOS 26 WebKit bug 301648: date/time controls with horizontal padding can
 * render wider than width:100%. On touch WebKit, remove horizontal padding
 * from date fields and use text-indent instead so the native control stays
 * inside the form card while retaining the same visual inset.
 */
@supports (-webkit-touch-callout: none) {
  @media (max-width: 767px) {
    .form-card label:has(> input[type="date"].input) {
      overflow: hidden;
    }

    .form-card input[type="date"].input {
      -webkit-appearance: none;
      appearance: none;
      width: 100% !important;
      inline-size: 100% !important;
      min-width: 0 !important;
      min-inline-size: 0 !important;
      max-width: 100% !important;
      max-inline-size: 100% !important;
      height: 48px;
      min-height: 48px;
      padding: 0 !important;
      text-indent: .9rem;
      box-sizing: border-box !important;
      overflow: hidden;
    }

    .form-card input[type="date"].input::-webkit-calendar-picker-indicator {
      margin-right: .9rem;
    }
  }
}
CSS

# The Supabase Edge Function targets Deno and is deployed separately by Supabase.
# Keep it outside Next.js/Node TypeScript checking during the Vercel build.
node <<'NODE'
const fs = require('fs');
const path = 'tsconfig.json';
const config = JSON.parse(fs.readFileSync(path, 'utf8'));
const exclude = new Set(config.exclude || []);
exclude.add('supabase/functions/**/*');
config.exclude = [...exclude];
fs.writeFileSync(path, JSON.stringify(config, null, 2) + '\n');
NODE
