import { Link } from '@remix-run/react'
import { useState, useEffect } from 'react'
import type { Category } from '~/types/taxonomy'

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadCategories() {
      try {
        const modules = await Promise.all(
          Object.entries(
            import.meta.glob<any>('../../content/posts/*.mdx', { eager: true })
          ).map(([_, module]) => module.frontmatter)
        )

        const categoryMap = new Map<string, Category>()

        modules.forEach(frontmatter => {
          const categories = frontmatter.categories || []
          categories.forEach((name: string) => {
            const slug = name.toLowerCase().replace(/\s+/g, '-')
            const existing = categoryMap.get(slug)
            if (existing) {
              existing.count++
              existing.posts.push(frontmatter.title)
            } else {
              categoryMap.set(slug, {
                slug,
                name,
                count: 1,
                posts: [frontmatter.title],
                description: ''
              })
            }
          })
        })

        setCategories(Array.from(categoryMap.values()))
      } catch (error) {
        console.error('加载分类失败:', error)
      } finally {
        setLoading(false)
      }
    }

    loadCategories()
  }, [])

  if (loading) {
    return <div className="text-center py-8">加载中...</div>
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">文章分类</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {categories.map(category => (
          <Link
            key={category.slug}
            to={`/categories/${category.slug}`}
            className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{category.name}</h2>
            <p className="text-gray-600 dark:text-gray-400">
              共 {category.count} 篇文章
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
} 