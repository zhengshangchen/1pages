import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getPostsByTag } from '~/services/taxonomy.server'
import PostCard from '~/components/posts/PostCard'
import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node'

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) {
    return [
      { title: "标签不存在 | RemixPages" },
      { name: "description", content: "找不到该标签" }
    ]
  }
  return [
    { title: `${data.tag} - 文章标签 | RemixPages` },
    { name: "description", content: `查看标签为 ${data.tag} 的所有文章` }
  ]
}

export async function loader({ params }: LoaderFunctionArgs) {
  const posts = await getPostsByTag(params.tag!)
  if (!posts.length) {
    throw new Response('Not Found', { status: 404 })
  }
  return json({ 
    posts,
    tag: params.tag 
  })
}

export default function TagSlug() {
  const { posts, tag } = useLoaderData<typeof loader>()

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">
          标签：{tag}
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          共 {posts.length} 篇文章
        </p>
      </header>
      <div className="grid gap-8 md:grid-cols-2">
        {posts.map(post => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
} 