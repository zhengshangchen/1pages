import { Link } from '@remix-run/react'
import { useState, useEffect } from 'react'
import type { Tag } from '~/types/taxonomy'

export default function Tags() {
  const [tags, setTags] = useState<Tag[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadTags() {
      try {
        const modules = await Promise.all(
          Object.entries(
            import.meta.glob<any>('../../content/posts/*.mdx', { eager: true })
          ).map(([_, module]) => module.frontmatter)
        )

        const tagMap = new Map<string, Tag>()
        
        modules.forEach(frontmatter => {
          const tags = frontmatter.tags || []
          tags.forEach((name: string) => {
            const slug = name.toLowerCase().replace(/\s+/g, '-')
            const existing = tagMap.get(slug)
            if (existing) {
              existing.count++
              existing.posts.push(frontmatter.title)
            } else {
              tagMap.set(slug, {
                slug,
                name,
                count: 1,
                posts: [frontmatter.title]
              })
            }
          })
        })

        setTags(Array.from(tagMap.values()))
      } catch (error) {
        console.error('加载标签失败:', error)
      } finally {
        setLoading(false)
      }
    }

    loadTags()
  }, [])

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">标签云</h1>
        <div className="text-center py-8">加载中...</div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">标签云</h1>
      <div className="flex flex-wrap gap-4">
        {tags.map(tag => (
          <Link
            key={tag.slug}
            to={`/tags/${tag.slug}`}
            className="inline-block px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow hover:shadow-md transition-shadow"
          >
            <span className="font-medium">{tag.name}</span>
            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
              ({tag.count})
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
} 