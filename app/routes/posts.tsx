import { Link } from '@remix-run/react'
import { useState, useEffect } from 'react'
import { getCache, setCache } from '~/utils/cache'
import type { PostListItem } from '~/types/taxonomy'

interface MDXModule {
  default: React.ComponentType;
  frontmatter: {
    title: string;
    date: string;
    description?: string;
    [key: string]: unknown;
  };
}

export default function Posts() {
  const [posts, setPosts] = useState<PostListItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadPosts() {
      try {
        // 尝试从缓存获取
        const cachedPosts = getCache('posts')
        if (cachedPosts) {
          setPosts(cachedPosts)
          setLoading(false)
          return
        }
        
        // 如果没有缓存，则动态导入
        const modules = await Promise.all(
          Object.entries(
            import.meta.glob<MDXModule>('../../content/posts/*.mdx', { eager: true })
          ).map(async ([path, module]) => {
            return {
              slug: path.replace('../../content/posts/', '').replace('.mdx', ''),
              title: module.frontmatter.title,
              date: module.frontmatter.date,
              description: module.frontmatter.description,
              frontmatter: module.frontmatter
            } as PostListItem
          })
        )

        const sortedPosts = modules.sort((a, b) => {
          const dateA = new Date(a.date).getTime()
          const dateB = new Date(b.date).getTime()
          return dateB - dateA
        })
        
        setCache('posts', sortedPosts)
        setPosts(sortedPosts)
      } catch (error) {
        console.error('加载文章失败:', error)
      } finally {
        setLoading(false)
      }
    }

    loadPosts()
  }, [])

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">所有文章</h1>
        <div className="text-center py-8">加载中...</div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">所有文章</h1>
      <div className="grid gap-6">
        {posts.length > 0 ? (
          posts.map(post => (
            <Link
              key={post.slug}
              to={`/posts/${post.slug}`}
              className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              {post.frontmatter.description && (
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {post.frontmatter.description}
                </p>
              )}
              <div className="text-sm text-gray-500">
                {new Date(post.date).toLocaleDateString('zh-CN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center py-8 text-gray-600 dark:text-gray-400">
            暂无文章
          </div>
        )}
      </div>
    </div>
  )
} 