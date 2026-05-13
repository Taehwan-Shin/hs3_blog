
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const baseDir = '/Users/bliss00/obsidian/vault-blog/src/content/posts/attachments/20260513';
const files = ['hermes_cover.png', 'hermes_step1.png', 'hermes_step2.png', 'hermes_step3.png', 'hermes_step4.png'];

async function cropImages() {
  for (const file of files) {
    const filePath = path.join(baseDir, file);
    if (fs.existsSync(filePath)) {
      console.log(`Deep cropping ${file} to remove title...`);
      const buffer = fs.readFileSync(filePath);
      
      // Starting from top: 400 to avoid headers/titles
      // 1024x576 at center-bottom weighted area
      await sharp(buffer)
        .extract({ left: 0, top: 440, width: 1024, height: 576 }) 
        .toFile(filePath + '.new.png');
      
      fs.renameSync(filePath + '.new.png', filePath);
      console.log(`Successfully deep cropped ${file} to 16:9 without titles`);
    }
  }
}

cropImages().catch(err => console.error(err));
