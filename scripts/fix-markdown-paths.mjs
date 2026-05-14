import { promises as fs } from 'fs';
import path from 'path';

async function fixMarkdownFiles(dir) {
  try {
    const items = await fs.readdir(dir);
    for (const item of items) {
      const itemPath = path.join(dir, item);
      const stat = await fs.stat(itemPath);
      
      if (stat.isDirectory()) {
        await fixMarkdownFiles(itemPath);
      } else if (item.endsWith('.md') || item.endsWith('.mdx')) {
        let content = await fs.readFile(itemPath, 'utf8');
        let changed = false;

        // 1. Fix standard markdown image links: ![alt](attachments/...) -> ![alt](/posts/attachments/...)
        const standardLinkRegex = /!\[(.*?)\]\((attachments\/.*?)\.(png|jpg|jpeg|gif|bmp|tiff|tif)\)/gi;
        content = content.replace(standardLinkRegex, (match, alt, pPath, ext) => {
          changed = true;
          let cleanPath = pPath;
          try { cleanPath = decodeURIComponent(cleanPath); } catch(e) {}
          const encodedPath = encodeURI(`/posts/${cleanPath}.webp`);
          return `![${alt}](${encodedPath})`;
        });

        // 2. Fix wikilinks: ![[attachments/.../image.png]] -> ![[/posts/attachments/.../image.webp]]
        const wikilinkRegex = /!\[\[(attachments\/.*?)\.(png|jpg|jpeg|gif|bmp|tiff|tif)(\|.*?)?\]\]/gi;
        content = content.replace(wikilinkRegex, (match, pPath, ext, size) => {
          changed = true;
          let cleanPath = pPath;
          try { cleanPath = decodeURIComponent(cleanPath); } catch(e) {}
          const encodedPath = encodeURI(`/posts/${cleanPath}.webp`);
          return `![[${encodedPath}${size || ''}]]`;
        });

        // 3. FIX RAW HTML IMG TAGS: <img src="attachments/..." ... />
        const htmlImgRegex = /<img\s+[^>]*?src=["'](attachments\/.*?)\.(png|jpg|jpeg|gif|bmp|tiff|tif)["'][^>]*?>/gi;
        content = content.replace(htmlImgRegex, (match, pPath, ext) => {
          changed = true;
          let cleanPath = pPath;
          try { cleanPath = decodeURIComponent(cleanPath); } catch(e) {}
          const encodedPath = encodeURI(`/posts/${cleanPath}.webp`);
          // Replace only the src attribute in the full tag match
          return match.replace(/src=["'](attachments\/.*?)\.(png|jpg|jpeg|gif|bmp|tiff|tif)["']/i, `src="${encodedPath}"`);
        });

        if (changed) {
          console.log(`Fixed paths in: ${itemPath}`);
          await fs.writeFile(itemPath, content, 'utf8');
        }
      }
    }
  } catch (error) {
    console.error(`Error processing ${dir}:`, error);
  }
}

const targetDirs = [
  'src/content/posts',
  'src/content/pages',
  'src/content/projects',
  'src/content/docs'
];

async function run() {
  console.log('🏗️ Brute-forcing ALL markdown & HTML image paths to absolute .webp URLs...');
  for (const dir of targetDirs) {
    await fixMarkdownFiles(dir);
  }
  console.log('✅ Brute-force path fixing complete!');
}

run();
