
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const rawImages = [
  { name: 'hermes_cover_final_v4.png', src: '/Users/bliss00/.gemini/antigravity/brain/f7d783af-87ef-4562-a466-41f11a891d19/hermes_google_chat_cover_16_9_v2_1778639558451.png' },
  { name: 'hermes_step1_fixed_v4.png', src: '/Users/bliss00/.gemini/antigravity/brain/f7d783af-87ef-4562-a466-41f11a891d19/hermes_step1_infra_v2_16_9_1778639533194.png' },
  { name: 'hermes_step2_final_v4.png', src: '/Users/bliss00/.gemini/antigravity/brain/f7d783af-87ef-4562-a466-41f11a891d19/hermes_step2_pipeline_16_9_v2_1778639460721.png' },
  { name: 'hermes_step3_final_v4.png', src: '/Users/bliss00/.gemini/antigravity/brain/f7d783af-87ef-4562-a466-41f11a891d19/hermes_step3_security_16_9_1778639482430.png' },
  { name: 'hermes_step4_final_v4.png', src: '/Users/bliss00/.gemini/antigravity/brain/f7d783af-87ef-4562-a466-41f11a891d19/hermes_step4_connection_16_9_1778639505568.png' }
];

const targetDir = '/Users/bliss00/obsidian/vault-blog/src/content/posts/attachments/20260513';

async function safeTransform() {
  for (const img of rawImages) {
    console.log(`Processing ${img.name}...`);
    const outputPath = path.join(targetDir, img.name);
    
    // 1. Read raw square (1024x1024)
    // 2. Resize to 576 height (maintaining aspect ratio) -> 576x576
    // 3. Extend to 1024 width with white background
    await sharp(img.src)
      .resize({ height: 576, fit: 'contain', background: '#ffffff' })
      .extend({
        left: 224,
        right: 224,
        background: '#ffffff'
      })
      .toFile(outputPath);
    
    console.log(`Successfully created horizontal version: ${img.name}`);
  }
}

safeTransform().catch(err => console.error(err));
