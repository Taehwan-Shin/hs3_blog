
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const rawDir = '/Users/bliss00/.gemini/antigravity/brain/f7d783af-87ef-4562-a466-41f11a891d19';
const targetDir = '/Users/bliss00/obsidian/vault-blog/src/content/posts/attachments/20260513';

const config = [
  {
    name: 'hermes_cover_super_final.png',
    src: path.join(rawDir, 'hermes_google_chat_cover_16_9_v2_1778639558451.png'),
    extract: { left: 150, top: 250, width: 724, height: 500 }
  },
  {
    name: 'hermes_step1_super_final.png',
    src: path.join(rawDir, 'hermes_step1_infra_v2_16_9_1778639533194.png'),
    extract: { left: 100, top: 280, width: 824, height: 460 }
  },
  {
    name: 'hermes_step2_super_final.png', // Intro
    src: path.join(rawDir, 'hermes_step2_pipeline_16_9_v2_1778639460721.png'),
    extract: { left: 150, top: 280, width: 724, height: 450 } // Tightest crop
  },
  {
    name: 'hermes_step3_super_final.png', // Security
    src: path.join(rawDir, 'hermes_step3_security_16_9_1778639482430.png'),
    extract: { left: 180, top: 180, width: 664, height: 600 } // Super tight sides
  },
  {
    name: 'hermes_step4_super_final.png',
    src: path.join(rawDir, 'hermes_step4_connection_16_9_1778639505568.png'),
    pad: '#e0f7fa'
  }
];

async function superFinalEdit() {
  for (const item of config) {
    console.log(`Processing ${item.name}...`);
    const outputPath = path.join(targetDir, item.name);
    
    if (item.extract) {
      await sharp(item.src).extract(item.extract).toFile(outputPath);
    } else if (item.pad) {
      await sharp(item.src)
        .resize({ height: 576, fit: 'contain', background: item.pad })
        .extend({ left: 224, right: 224, background: item.pad })
        .toFile(outputPath);
    }
    console.log(`Success: ${item.name}`);
  }
}

superFinalEdit().catch(err => console.error(err));
