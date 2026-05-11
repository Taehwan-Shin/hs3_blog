#!/bin/bash
git lfs ls-files -n | while read -r line; do
    git rm --cached "$line"
done
