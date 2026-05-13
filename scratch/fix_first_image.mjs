
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const rawDir = '/Users/bliss00/.gemini/antigravity/brain/f7d783af-87ef-4562-a466-41f11a891d19';
const targetDir = '/Users/bliss00/obsidian/vault-blog/src/content/posts/attachments/20260513';

async function fixFirstImage() {
  const item = {
    name: 'hermes_step2_final_v5.png', // Intro image (1st in user's count)
    src: path.join(rawDir, 'hermes_step2_pipeline_16_9_v2_1778639460721.png')
  };
  
  console.log(`Editing ${item.name} to tight rectangle...`);
  const outputPath = path.join(targetDir, item.name);
  
  // Tight rectangle crop per user request for "1st image"
  await sharp(item.src)
    .extract({ left: 100, top: 250, width: 824, height: 500 })
    .toFile(outputPath);
    
  console.log(`Success: ${item.name}`);
}

fixFirstImage().catch(err => console.error(err));
