import { defineConfig } from 'vite'
import { vitePlugin as remix } from '@remix-run/dev'
import tsconfigPaths from 'vite-tsconfig-paths'
import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm'
import remarkToc from 'remark-toc'
import rehypeSlug from 'rehype-slug'
import rehypePrism from 'rehype-prism-plus'
import { resolve } from 'path'
import type { UserConfig } from 'vite'

export default defineConfig({
  plugins: [
    mdx({
      remarkPlugins: [remarkGfm, remarkToc],
      rehypePlugins: [rehypeSlug, rehypePrism],
      providerImportSource: '@mdx-js/react'
    }),
    remix({
      ssr: false,
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
      ignoredRouteFiles: ["**/.*"],
      serverModuleFormat: "esm",
    }),
    tsconfigPaths(),
  ],
  build: {
    sourcemap: true,
    rollupOptions: {
      external: [/public\/images\/.*/], // 移除了 /content\/.*\.mdx$/ 这部分
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
          if (id.includes('content/posts')) {
            return 'posts';
          }
        }
      }
    }
  },
  resolve: {
    alias: {
      '~/': resolve(__dirname, './app/'),
      'content': resolve(__dirname, './content/'),
      'public': resolve(__dirname, './public/')
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
    exclude: ['@mdx-js/react']
  }
})