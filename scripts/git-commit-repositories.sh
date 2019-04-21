#!/bin/bash

for dir in ./repositories/*/* ; do
  if [ -d "$dir" ]; then
    git add "$dir"
    git commit -m "Add $(echo $dir | sed s/.\\/repositories\\///) chart"
  fi
done
