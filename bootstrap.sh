#!/usr/bin/env bash
set -euo pipefail
cat .bootstrap/source.part1 .bootstrap/source.part2 .bootstrap/source.part3 .bootstrap/source.part4 | base64 --decode > /tmp/tenttop-source.tar.xz
tar -xJf /tmp/tenttop-source.tar.xz -C .
