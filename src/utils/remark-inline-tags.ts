import { visit, SKIP } from 'unist-util-visit';
import type { Plugin } from 'unified';
import type { Root, Text } from 'mdast';

/**
 * Remark plugin for processing inline Obsidian tags
 * 
 * Converts inline tags like #quick-start into clickable pill-style links
 * that match the theme's tag styling.
 * 
 * Pattern: #tag-name (must start with #, followed by alphanumeric, hyphens, underscores)
 * Tags are matched when they appear at word boundaries (start of text, after whitespace, or after punctuation)
 */

const remarkInlineTags: Plugin<[], Root> = () => {
  return (tree) => {
    const nodesToReplace: Array<{
      parent: any;
      index: number;
      node: any;
      newChildren: any[];
    }> = [];

    visit(tree, 'text', (node: Text, index, parent) => {
      if (!parent || typeof index !== 'number') return;
      
      const text = node.value;
      // Match #tag-name pattern
      const tagPattern = /(?:^|[\s\p{P}])#([\w-]+)/gu;
      const matches: Array<{ tag: string; start: number; end: number; hasPrefix: boolean }> = [];
      
      let match;
      while ((match = tagPattern.exec(text)) !== null) {
        const tag = match[1];
        const fullMatch = match[0];
        const hasPrefix = fullMatch.length > tag.length + 1;
        const start = match.index + (hasPrefix ? 1 : 0);
        const end = start + tag.length + 1;
        
        matches.push({ tag, start, end, hasPrefix });
      }
      
      if (matches.length === 0) return;
      
      const newChildren: any[] = [];
      let lastIndex = 0;
      
      matches.forEach(({ tag, start, end, hasPrefix }) => {
        if (start > lastIndex) {
          const beforeText = text.slice(lastIndex, start);
          if (beforeText) {
            newChildren.push({ type: 'text', value: beforeText });
          }
        }
        
        const tagHtml = {
          type: 'html',
          value: `<a href="/posts/tag/${encodeURIComponent(tag)}" class="text-xs text-primary-600 dark:text-primary-300 bg-primary-100 dark:bg-primary-800 px-2.5 py-1 rounded-full border border-primary-200 dark:border-primary-700 transition-colors hover:bg-highlight-100 dark:hover:bg-highlight-800">#${tag}</a>`
        };
        
        newChildren.push(tagHtml);
        lastIndex = end;
      });
      
      if (lastIndex < text.length) {
        const afterText = text.slice(lastIndex);
        if (afterText) {
          newChildren.push({ type: 'text', value: afterText });
        }
      }
      
      if (newChildren.length > 0) {
        nodesToReplace.push({ parent, index, node, newChildren });
      }
    });

    // Replace in reverse order
    nodesToReplace.reverse().forEach(({ parent, index, node, newChildren }) => {
      if (parent && parent.children && parent.children[index] === node) {
        parent.children.splice(index, 1, ...newChildren);
      }
    });
  };
};

export default remarkInlineTags;

