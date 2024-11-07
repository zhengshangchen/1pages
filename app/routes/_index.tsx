import { Link } from '@remix-run/react'
import { useState, useEffect } from 'react'
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

export default function Index() {
  const [posts, setPosts] = useState<PostListItem[]>([])

  useEffect(() => {
    async function loadPosts() {
      try {
        const modules = await Promise.all(
          Object.entries(
            import.meta.glob<MDXModule>('../../content/posts/*.mdx', { eager: true })
          ).map(([path, module]) => ({
            slug: path.replace('../../content/posts/', '').replace('.mdx', ''),
            title: module.frontmatter.title,
            date: module.frontmatter.date,
            description: module.frontmatter.description,
            frontmatter: module.frontmatter
          }))
        )

        setPosts(
          modules.sort((a, b) => 
            new Date(b.date).getTime() - new Date(a.date).getTime()
          )
        )
      } catch (error) {
        console.error('加载文章失败:', error)
      }
    }

    loadPosts()
  }, [])

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">最新文章</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map(post => (
          <Link 
            key={post.slug}
            to={`/posts/${post.slug}`}
            className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600 dark:text-gray-400">
              {post.frontmatter.description}
            </p>
            <div className="mt-4 text-sm text-gray-500">
              {new Date(post.date).toLocaleDateString()}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
} 