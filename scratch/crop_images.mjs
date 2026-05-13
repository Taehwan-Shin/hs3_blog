
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const baseDir = '/Users/bliss00/obsidian/vault-blog/src/content/posts/attachments/20260513';
const files = ['hermes_cover.png', 'hermes_step1.png', 'hermes_step2.png', 'hermes_step3.png', 'hermes_step4.png'];

async function cropImages() {
  for (const file of files) {
    const filePath = path.join(baseDir, file);
    if (fs.existsSync(filePath)) {
      console.log(`Cropping ${file}...`);
      const buffer = fs.readFileSync(filePath);
      
      // Crop to 16:9 (1024x576 from 1024x1024 center)
      await sharp(buffer)
        .extract({ left: 0, top: 224, width: 1024, height: 576 }) 
        .toFile(filePath + '.tmp');
      
      fs.renameSync(filePath + '.tmp', filePath);
      console.log(`Successfully cropped ${file} to 16:9`);
    } else {
      console.warn(`File not found: ${filePath}`);
    }
  }
}

cropImages().catch(err => console.error(err));
