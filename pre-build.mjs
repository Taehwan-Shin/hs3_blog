#!/usr/bin/env node
/**
 * pre-build.mjs — Copy attachments from src/ to public/ before Astro builds.
 * This avoids storing ~19MB of images in git while ensuring they exist
 * at /posts/attachments/ during Vercel deployment.
 */

import { readdirSync, statSync, existsSync, mkdirSync, copyFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const root = resolve(__dirname, '..');
const srcAttachments = join(root, 'src', 'content', 'posts', 'my-blog', 'attachments');
const pubAttachments = join(root, 'public', 'posts', 'attachments');

function copyRecursive(src, dest) {
    const stat = statSync(src);
    if (stat.isDirectory()) {
        const destStat = existsSync(dest) ? statSync(dest) : null;
        if (!destStat) mkdirSync(dest, { recursive: true });
        for (const entry of readdirSync(src)) {
            copyRecursive(join(src, entry), join(dest, entry));
        }
    } else {
        copyFileSync(src, dest);
    }
}

// Sync all attachments from src/ -> public/
if (existsSync(srcAttachments)) {
    for (const entry of readdirSync(srcAttachments)) {
        const srcPath = join(srcAttachments, entry);
        const destPath = join(pubAttachments, entry);
        copyRecursive(srcPath, destPath);
        const stat = statSync(srcPath);
        console.log(`✓ ${entry} → public/posts/attachments/ (${(stat.size / 1024).toFixed(1)}KB)`);
    }
} else {
    console.log('⚠ src content/posts/my-blog/attachments not found — skipping');
}
