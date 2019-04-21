#!/bin/bash

set -eu

chart_yaml="$1"
chart_dir="$(dirname "$chart_yaml")"
package_dir="$(dirname "$chart_dir")"
chart_source="${package_dir}/source.tgz"

mkdir -p "$chart_dir"

if [ ! -e "$chart_source" ]; then
  curl -L -o "$chart_source" "$(jq -r '.urls[0]' "${package_dir}/chart.json")"
fi

tar xzf "$chart_source" --strip-components=1 -C "$chart_dir"
