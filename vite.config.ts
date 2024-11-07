import { defineConfig } from 'vite'
import { vitePlugin as remix } from '@remix-run/dev'
import tsconfigPaths from 'vite-tsconfig-paths'
import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm'
import remarkToc from 'remark-toc'
import rehypeSlug from 'rehype-slug'
import rehypePrism from 'rehype-prism-plus'
import remarkFrontmatter from 'remark-frontmatter'
import { parse as parseYaml } from 'yaml'
import { resolve } from 'path'
import type { Plugin } from 'vite'
import type { Node } from 'unist'

interface TreeNode extends Node {
  children: TreeNode[];
  value?: string;
  type: string;
  data?: {
    frontmatter?: Record<string, unknown>;
    estree?: unknown;
  };
}

interface VFile {
  data: {
    frontmatter?: Record<string, unknown>;
  };
}

export default defineConfig({
  plugins: [
    mdx({
      remarkPlugins: [
        remarkGfm,
        remarkToc,
        [remarkFrontmatter, ['yaml']],
        () => (tree: TreeNode, file: VFile) => {
          const yamlNode = tree.children.find(
            node => node.type === 'yaml'
          )
          if (yamlNode?.value) {
            try {
              const frontmatter = parseYaml(yamlNode.value)
              file.data.frontmatter = frontmatter

              // 直接导出 frontmatter 为 ES 模块
              const exportStr = `export const frontmatter = ${JSON.stringify(frontmatter)}`
              tree.children.unshift({
                type: 'mdxjsEsm',
                value: exportStr,
                data: {
                  estree: {
                    type: 'Program',
                    body: [
                      {
                        type: 'ExportNamedDeclaration',
                        declaration: {
                          type: 'VariableDeclaration',
                          declarations: [
                            {
                              type: 'VariableDeclarator',
                              id: {
                                type: 'Identifier',
                                name: 'frontmatter'
                              },
                              init: {
                                type: 'Literal',
                                value: frontmatter
                              }
                            }
                          ],
                          kind: 'const'
                        },
                        specifiers: [],
                        source: null
                      }
                    ],
                    sourceType: 'module'
                  }
                }
              } as TreeNode)
            } catch (e) {
              console.warn('解析 frontmatter 失败:', e)
            }
          }
        }
      ],
      rehypePlugins: [rehypeSlug, rehypePrism],
      providerImportSource: "@mdx-js/react",
      jsxRuntime: 'automatic',
      jsxImportSource: 'react',
      format: 'mdx'
    }),
    remix({
      ssr: false,
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
      routes: (defineRoutes) => {
        return defineRoutes((route) => {
          route('/posts/:slug', 'routes/posts.$slug.tsx')
        })
      },
      ignoredRouteFiles: ["**/.*"],
      serverModuleFormat: "esm",
    }),
    tsconfigPaths(),
  ],
  build: {
    sourcemap: true,
    rollupOptions: {
      external: [/public\/images\/.*/],
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules')) {
            return 'vendor'
          }
          if (id.includes('content/posts')) {
            return 'posts'
          }
          return undefined
        },
      },
    },
  },
  resolve: {
    alias: {
      '~/': resolve(__dirname, './app/'),
      'content': resolve(__dirname, './content/'),
      'public': resolve(__dirname, './public/'),
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
    exclude: ['@mdx-js/react'],
  },
  esbuild: {
    jsxInject: `import React from 'react'`,
    jsx: 'automatic',
  }
})