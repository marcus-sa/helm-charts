#!/bin/bash
set -eu

base_dir="$(pwd)"

for package in ./repositories/*/*/* ; do
  if [ -d "$package" ]; then
    cd "$package"
    npm publish --access=public || true
    cd "$base_dir"
  fi
done
