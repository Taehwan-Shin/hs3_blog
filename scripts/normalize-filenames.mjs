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
        console.log(`Normalizing & Purging: ${item} -> ${normalizedItem}`);
        
        // If the target NFC file already exists, we should delete the NFD one
        // and potentially overwrite if needed (but rename handles it usually)
        try {
          await fs.rename(itemPath, finalPath);
        } catch (err) {
          // If rename fails (e.g. file exists), delete the NFD one
          console.log(`Rename failed, deleting source: ${item}`);
          await fs.unlink(itemPath);
        }
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
  'src/content/posts',
  'src/content/pages',
  'src/content/projects',
  'src/content/docs',
  'src/content/special',
  'public/posts/attachments',
  'public/pages/attachments',
  'public/projects/attachments',
  'public/docs/attachments',
  'public/special/attachments'
];

async function run() {
  console.log('🔄 Normalizing all filenames to NFC and purging NFD duplicates...');
  for (const dir of targetDirs) {
    await normalizeDir(dir);
  }
  console.log('✅ Normalization and purge complete!');
}

run();
