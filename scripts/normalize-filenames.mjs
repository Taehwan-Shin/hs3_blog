import { promises as fs } from 'fs';
import path from 'path';

async function normalizeDir(dir) {
  try {
    const items = await fs.readdir(dir);
    for (const item of items) {
      const itemPath = path.join(dir, item);
      const normalizedItem = item.normalize('NFC');
      
      const stat = await fs.stat(itemPath);
      
      let finalPath = itemPath;
      if (item !== normalizedItem) {
        finalPath = path.join(dir, normalizedItem);
        console.log(`Normalizing: ${item} -> ${normalizedItem}`);
        await fs.rename(itemPath, finalPath);
      }
      
      if (stat.isDirectory()) {
        await normalizeDir(finalPath);
      }
    }
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.error(`Error normalizing ${dir}:`, error);
    }
  }
}

const targetDirs = [
  'src/content/posts/attachments',
  'public/posts/attachments'
];

async function run() {
  console.log('🔄 Normalizing filenames to NFC...');
  for (const dir of targetDirs) {
    await normalizeDir(dir);
  }
  console.log('✅ Normalization complete!');
}

run();
