import { useParams } from '@remix-run/react'
import { useState, useEffect } from 'react'
import type { PostListItem } from '~/types/taxonomy'

export default function Category() {
  const { category } = useParams()
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

        const filteredPosts = modules.filter(frontmatter => 
          frontmatter.categories?.some((cat: string) => 
            cat.toLowerCase().replace(/\s+/g, '-') === category
          )
        )
        setPosts(filteredPosts)
      } catch (error) {
        console.error('加载分类文章失败:', error)
      } finally {
        setLoading(false)
      }
    }

    if (category) {
      loadPosts()
    }
  }, [category])

  if (loading) {
    return <div className="text-center py-8">加载中...</div>
  }

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