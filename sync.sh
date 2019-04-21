#!/bin/bash
set -euo pipefail

yarn build
yarn refresh-repos
yarn prepare-charts
make all -j 4
