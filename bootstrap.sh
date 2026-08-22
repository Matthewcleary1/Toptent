#!/usr/bin/env bash
set -euo pipefail
cat .bootstrap/source.part1 .bootstrap/source.part2 .bootstrap/source.part3 .bootstrap/source.part4 | base64 --decode > /tmp/tenttop-source.tar.xz
tar -xJf /tmp/tenttop-source.tar.xz -C .

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
