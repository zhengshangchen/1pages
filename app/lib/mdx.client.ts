import { compile } from '@mdx-js/mdx'
import type { CompileOptions } from '@mdx-js/mdx'
import remarkGfm from 'remark-gfm'
import remarkToc from 'remark-toc'
import rehypeSlug from 'rehype-slug'
import rehypePrism from 'rehype-prism-plus'

interface CompileMDXParams {
  source: string;
  cacheKey?: string;
}

const MDX_CACHE = new Map<string, any>()

export async function compileMDX({ source, cacheKey }: CompileMDXParams) {
  if (cacheKey && MDX_CACHE.has(cacheKey)) {
    return MDX_CACHE.get(cacheKey)
  }

  const options: CompileOptions = {
    remarkPlugins: [
      remarkGfm,
      [remarkToc, { tight: true }]
    ],
    rehypePlugins: [
      rehypeSlug as any,
      rehypePrism as any
    ],
    outputFormat: 'function-body'
  }

  const result = await compile(source, options)

  const compiled = {
    code: String(result),
    frontmatter: {} // 需要单独解析 frontmatter
  }

  if (cacheKey) {
    MDX_CACHE.set(cacheKey, compiled)
  }

  return compiled
} 