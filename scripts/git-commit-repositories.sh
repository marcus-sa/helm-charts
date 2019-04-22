#!/bin/bash

for dir in ./repositories/*/* ; do
  if [ -d "$dir" ]; then
    git add "$dir"
    git commit -m "Update $(echo $dir | sed s/.\\/repositories\\///) package.json"
  fi
done
