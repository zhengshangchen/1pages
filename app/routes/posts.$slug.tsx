import { useLoaderData } from '@remix-run/react'
import { json } from '@remix-run/node'
import { useMemo } from 'react'
import type { LoaderFunctionArgs } from '@remix-run/node'
import { MDXProvider } from '@mdx-js/react'
import * as runtime from 'react/jsx-runtime'

export async function loader({ params }: LoaderFunctionArgs) {
  const { slug } = params

  try {
    const module = await import(`../../content/posts/${slug}.mdx`)
    return json({
      code: module.default,
      frontmatter: module.frontmatter
    })
  } catch (error) {
    throw new Response("文章未找到", { status: 404 })
  }
}

export default function PostSlug() {
  const { code, frontmatter } = useLoaderData<typeof loader>()

  const Component = useMemo(() => {
    if (!code) return null
    return () => (
      <MDXProvider>
        {code({ ...runtime })}
      </MDXProvider>
    )
  }, [code])

  return (
    <article className="prose dark:prose-invert mx-auto px-4 py-8">
      <h1>{frontmatter.title}</h1>
      {Component && <Component />}
    </article>
  )
} 