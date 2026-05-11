import type { Root, Element } from 'hast';
import { visit } from 'unist-util-visit';

/**
 * Rehype plugin to add loading attributes and optimize image paths in markdown content
 * Adds lazy loading attributes and converts image paths to WebP versions when available
 */
export function rehypeImageAttributes() {
  return (tree: Root, file: any) => {
    // Determine content type from file path
    const filePath = file?.path || '';
    const collection = filePath.includes('/pages/') ? 'pages'
      : filePath.includes('/projects/') ? 'projects'
      : filePath.includes('/docs/') ? 'docs'
      : filePath.includes('/special/') ? 'special'
      : 'posts';

    visit(tree, 'element', (node: Element) => {
      if (node.tagName === 'img') {
        const properties = node.properties || {};
        let src = (properties.src as string) || '';

        if (!src || src.startsWith('http') || src.startsWith('data:')) {
          // Skip external or data URLs
        } else {
          // Fix relative paths for raw HTML <img> tags
          if (src.startsWith('attachments/')) {
            // Prefix with collection: /posts/attachments/...
            src = `/${collection}/${src}`;
          } else if (!src.startsWith('/')) {
            // Assume it's a relative path that needs to be in attachments
            src = `/${collection}/attachments/${src}`;
          }

          // Convert image paths to WebP if available
          if (!src.toLowerCase().endsWith('.webp') && !src.toLowerCase().endsWith('.svg')) {
            if (/\.(jpg|jpeg|png|gif|bmp|tiff|tif)$/i.test(src)) {
              src = src.replace(/\.(jpg|jpeg|png|gif|bmp|tiff|tif)$/i, '.webp');
            }
          }

          // Update the actual property
          properties.src = src;
        }
        
        // Add loading="lazy" if not already set
        if (!properties.loading) {
          properties.loading = 'lazy';
        }
        
        // Add decoding="async" if not already set
        if (!properties.decoding) {
          properties.decoding = 'async';
        }
        
        // Ensure alt text is present
        if (!properties.alt) {
          properties.alt = '';
        }
      }
    });
  };
}

export default rehypeImageAttributes;