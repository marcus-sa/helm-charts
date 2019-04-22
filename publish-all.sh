#!/bin/bash

base_dir="$(pwd)"

cd repositories/agones/agones/0.2.0
npm pack
cd "$base_dir"
