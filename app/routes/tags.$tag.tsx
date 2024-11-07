import { useParams } from '@remix-run/react'
import { useState, useEffect } from 'react'
import type { PostListItem } from '~/types/taxonomy'

export default function TagSlug() {
  const { tag } = useParams()
  const [posts, setPosts] = useState<PostListItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadPosts() {
      try {
        const modules = await Promise.all(
          Object.entries(
            import.meta.glob<any>('../../content/posts/*.mdx', { eager: true })
          ).map(([_, module]) => module.frontmatter)
        )

        const tagPosts = modules.filter(frontmatter => 
          frontmatter.tags?.some((t: string) => 
            t.toLowerCase().replace(/\s+/g, '-') === tag
          )
        )

        setPosts(tagPosts)
      } catch (error) {
        console.error('加载标签文章失败:', error)
      } finally {
        setLoading(false)
      }
    }

    loadPosts()
  }, [tag])

  if (loading) {
    return <div className="text-center py-8">加载中...</div>
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">标签：{tag}</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          共 {posts.length} 篇文章
        </p>
      </header>
      <div className="grid gap-8 md:grid-cols-2">
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