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

# Canonical business brand is TopTent Pro. The migrated Wix source used the
# older Tenttop/TENTTOP label in UI copy and metadata, so normalise every
# generated customer-facing source file at build time without touching product
# specification data or URLs.
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
    .replaceAll('TENTTOP', 'TOPTENT PRO')
    .replaceAll('Tenttop', 'TopTent Pro');
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
