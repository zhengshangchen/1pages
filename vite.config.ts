/// <reference types="vite/client" />
import { defineConfig } from 'vite'
import { vitePlugin as remix } from '@remix-run/dev'
import tsconfigPaths from 'vite-tsconfig-paths'
import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm'
import remarkToc from 'remark-toc'
import rehypeSlug from 'rehype-slug'
import rehypePrism from 'rehype-prism-plus'
import type { UserConfig } from 'vite'

export default defineConfig({
  plugins: [
    mdx({
      remarkPlugins: [
        remarkGfm,
        [remarkToc, { tight: true }]
      ],
      rehypePlugins: [
        rehypeSlug,
        rehypePrism
      ] as any[]
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
  server: {
    port: 3000,
    host: true,
  },
  css: {
    devSourcemap: true,
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      external: [/content\/.*\.mdx/],
    },
  },
} satisfies UserConfig)
