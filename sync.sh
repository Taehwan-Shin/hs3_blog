#!/bin/bash
# Sync content from Obsidian vault to Astro project

SOURCE_DIR="/Users/bliss00/obsidian/Brain/200 blog"
DEST_DIR="./src/content/posts/my-blog"
ATTACHMENTS_DEST="./src/content/posts/attachments"

mkdir -p "$DEST_DIR"
mkdir -p "$ATTACHMENTS_DEST"

# Sync posts to my-blog folder, excluding the attachments folder which goes elsewhere
rsync -av --delete --exclude="attachments/" "$SOURCE_DIR/" "$DEST_DIR/"

# Sync attachments to the shared attachments folder
if [ -d "$SOURCE_DIR/attachments" ]; then
    rsync -av "$SOURCE_DIR/attachments/" "$ATTACHMENTS_DEST/"
fi

echo "✅ Sync complete: $SOURCE_DIR -> $DEST_DIR & $ATTACHMENTS_DEST"
