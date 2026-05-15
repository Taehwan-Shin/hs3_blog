import { visit, SKIP, CONTINUE } from 'unist-util-visit';
import type { Root, Element, Text } from 'hast';
import type { Parent } from 'unist';

// tags to skip
const SKIP_TAGS = new Set(['code', 'pre', 'script', 'style', 'textarea', 'mark']);

import type { Plugin } from 'unified';

const rehypeMark: Plugin<[], Root> = () => {
  return (tree: Root) => {
    const nodesToReplace: Array<{
      parent: any;
      index: number;
      node: any;
      newNodes: any[];
    }> = [];

    visit(tree, 'text', (node: Text, index?: number, parent?: Parent | Element) => {
      if (index === undefined || !parent || typeof node.value !== 'string') return;
      if ((parent as Element).tagName && SKIP_TAGS.has((parent as Element).tagName)) return;

      const value = node.value;
      const regex = /==(.+?)==/g;
      let last = 0;
      const out: (Text | Element)[] = [];
      let m: RegExpExecArray | null;

      while ((m = regex.exec(value))) {
        if (m.index > last) out.push({ type: 'text', value: value.slice(last, m.index) });
        out.push({
          type: 'element',
          tagName: 'mark',
          properties: {},
          children: [{ type: 'text', value: m[1] }],
        });
        last = m.index + m[0].length;
      }

      if (!out.length) return;
      if (last < value.length) out.push({ type: 'text', value: value.slice(last) });

      nodesToReplace.push({ parent, index, node, newNodes: out });
    });

    // Replace in reverse order
    nodesToReplace.reverse().forEach(({ parent, index, node, newNodes }) => {
      if (parent && parent.children && parent.children[index] === node) {
        parent.children.splice(index, 1, ...newNodes);
      }
    });
  };
};

export default rehypeMark;