#!/bin/bash
# Sync content from Obsidian vault to Astro project

SOURCE_DIR="/Users/bliss00/obsidian/Brain/200 blog"
DEST_DIR="./src/content/posts/my-blog"

mkdir -p "$DEST_DIR"
rsync -av --delete "$SOURCE_DIR/" "$DEST_DIR/"

echo "✅ Sync complete: $SOURCE_DIR -> $DEST_DIR"
