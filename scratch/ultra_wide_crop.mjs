
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const baseDir = '/Users/bliss00/obsidian/vault-blog/src/content/posts/attachments/20260513';
const files = ['hermes_cover.png', 'hermes_step1.png', 'hermes_step2.png', 'hermes_step3.png', 'hermes_step4.png'];

async function ultraWideCrop() {
  for (const file of files) {
    const filePath = path.join(baseDir, file);
    if (fs.existsSync(filePath)) {
      console.log(`Ultra-wide cropping ${file} to remove all titles...`);
      const buffer = fs.readFileSync(filePath);
      const metadata = await sharp(buffer).metadata();
      
      // Current image is 1024x576. 
      // We take from top: 180 to bottom (576-180 = 396 height)
      // This ensures any headers at the top of the 576-high image are gone.
      await sharp(buffer)
        .extract({ left: 0, top: 180, width: 1024, height: 396 }) 
        .toFile(filePath + '.ultra.png');
      
      fs.renameSync(filePath + '.ultra.png', filePath);
      console.log(`Successfully ultra-wide cropped ${file} (1024x396)`);
    }
  }
}

ultraWideCrop().catch(err => console.error(err));
