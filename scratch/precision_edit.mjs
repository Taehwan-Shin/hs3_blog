
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const rawDir = '/Users/bliss00/.gemini/antigravity/brain/f7d783af-87ef-4562-a466-41f11a891d19';
const targetDir = '/Users/bliss00/obsidian/vault-blog/src/content/posts/attachments/20260513';

const config = [
  {
    name: 'hermes_cover_final_v5.png',
    src: path.join(rawDir, 'hermes_google_chat_cover_16_9_v2_1778639558451.png'),
    op: 'tight_crop' // All sides crop to rectangle
  },
  {
    name: 'hermes_step1_fixed_v5.png',
    src: path.join(rawDir, 'hermes_step1_infra_v2_16_9_1778639533194.png'),
    op: 'margin_crop' // All margins crop
  },
  {
    name: 'hermes_step3_final_v5.png', // This is the 3rd image (Step 2 in blog)
    src: path.join(rawDir, 'hermes_step3_security_16_9_1778639482430.png'),
    op: 'remove_title' // Remove sides + Crop top title only
  },
  {
    name: 'hermes_step4_final_v5.png',
    src: path.join(rawDir, 'hermes_step4_connection_16_9_1778639505568.png'),
    op: 'color_padding' // Pad with matching color
  }
];

async function precisionEdit() {
  for (const item of config) {
    console.log(`Editing ${item.name}...`);
    const outputPath = path.join(targetDir, item.name);
    let image = sharp(item.src);

    if (item.op === 'tight_crop') {
      // 1. All sides crop. Assuming 1024x1024. 
      // Crop to a tighter rectangle.
      await image.extract({ left: 100, top: 200, width: 824, height: 600 }).toFile(outputPath);
    } 
    else if (item.op === 'margin_crop') {
      // 2. Just margins. Tighten the square into a rectangle.
      await image.extract({ left: 50, top: 250, width: 924, height: 524 }).toFile(outputPath);
    }
    else if (item.op === 'remove_title') {
      // 3. Remove sides + Crop TOP title.
      // Assuming title is at the top 180px.
      await image.extract({ left: 50, top: 180, width: 924, height: 600 }).toFile(outputPath);
    }
    else if (item.op === 'color_padding') {
      // 4. Pad sides with matching color (Light pastel blue/green)
      await image.resize({ height: 576, fit: 'contain', background: '#e0f7fa' })
                 .extend({ left: 224, right: 224, background: '#e0f7fa' })
                 .toFile(outputPath);
    }
    console.log(`Success: ${item.name}`);
  }
}

precisionEdit().catch(err => console.error(err));
