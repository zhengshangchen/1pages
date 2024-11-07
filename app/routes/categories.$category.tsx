import { useLoaderData } from '@remix-run/react'
import { json } from '@remix-run/node'
import type { LoaderFunctionArgs } from '@remix-run/node'
import { getAllPosts } from '~/services/posts.server'

export async function loader({ params }: LoaderFunctionArgs) {
  const { category } = params
  const allPosts = await getAllPosts()
  
  const posts = allPosts.filter(post => 
    post.categories?.some(cat => 
      cat.toLowerCase().replace(/\s+/g, '-') === category
    )
  )

  if (!posts.length) {
    throw new Response('分类未找到', { status: 404 })
  }

  return json({ posts, category })
}

export default function Category() {
  const { posts, category } = useLoaderData<typeof loader>()
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">分类：{category}</h1>
      <div className="grid gap-6">
        {posts.map(post => (
          <article key={post.slug} className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600 dark:text-gray-400">{post.description}</p>
          </article>
        ))}
      </div>
    </div>
  )
} 