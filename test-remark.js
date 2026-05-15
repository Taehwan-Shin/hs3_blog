import fs from 'fs';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { remarkInternalLinks, remarkFolderImages, remarkImageCaptions } from './src/utils/internallinks.ts';
import remarkCallouts from './src/utils/remark-callouts.ts';
import { rehypeNormalizeAnchors } from './src/utils/rehype-normalize-anchors.ts';

async function test() {
  const content = fs.readFileSync('src/content/posts/2026-05-10-baekje-ai-generalization.md', 'utf8');
  
  try {
    const result = await unified()
      .use(remarkParse)
      .use(remarkInternalLinks)
      .use(remarkFolderImages)
      .use(remarkImageCaptions)
      .use(remarkCallouts)
      .use(remarkRehype)
      .use(rehypeNormalizeAnchors)
      .use(rehypeStringify)
      .process(content);
    
    console.log('--- HTML Output ---');
    console.log(result.toString());
  } catch (error) {
    console.error('--- ERROR ---');
    console.error(error);
  }
}

test();
