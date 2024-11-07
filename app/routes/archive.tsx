import { useState, useEffect } from 'react'
import { Link } from '@remix-run/react'
import type { PostListItem } from '~/types/taxonomy'

interface GroupedPosts {
  [year: string]: {
    [month: string]: PostListItem[]
  }
}

export default function Archive() {
  const [groupedPosts, setGroupedPosts] = useState<GroupedPosts>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadPosts() {
      try {
        const modules = await Promise.all(
          Object.entries(
            import.meta.glob<any>('../../content/posts/*.mdx', { eager: true })
          ).map(([path, module]) => ({
            slug: path.replace('../../content/posts/', '').replace('.mdx', ''),
            title: module.frontmatter.title,
            date: module.frontmatter.date,
            description: module.frontmatter.description,
            frontmatter: module.frontmatter
          }))
        )

        // 按年月分组
        const grouped: GroupedPosts = {}
        modules.forEach(post => {
          const date = new Date(post.date)
          const year = date.getFullYear().toString()
          const month = (date.getMonth() + 1).toString().padStart(2, '0')

          if (!grouped[year]) {
            grouped[year] = {}
          }
          if (!grouped[year][month]) {
            grouped[year][month] = []
          }
          grouped[year][month].push(post)
        })

        // 对每个月份内的文章按日期排序
        Object.keys(grouped).forEach(year => {
          Object.keys(grouped[year]).forEach(month => {
            grouped[year][month].sort((a, b) => {
              return new Date(b.date).getTime() - new Date(a.date).getTime()
            })
          })
        })

        setGroupedPosts(grouped)
      } catch (error) {
        console.error('加载归档失败:', error)
      } finally {
        setLoading(false)
      }
    }

    loadPosts()
  }, [])

  if (loading) {
    return <div className="text-center py-8">加载中...</div>
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">文章归档</h1>
      {Object.keys(groupedPosts)
        .sort((a, b) => Number(b) - Number(a))
        .map(year => (
          <div key={year} className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{year}年</h2>
            {Object.keys(groupedPosts[year])
              .sort((a, b) => Number(b) - Number(a))
              .map(month => (
                <div key={`${year}-${month}`} className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">{month}月</h3>
                  <div className="space-y-2">
                    {groupedPosts[year][month].map(post => (
                      <Link
                        key={post.slug}
                        to={`/posts/${post.slug}`}
                        className="block p-3 bg-white dark:bg-gray-800 rounded hover:shadow-md transition-shadow"
                      >
                        <span className="text-gray-500 dark:text-gray-400 mr-4">
                          {new Date(post.date).getDate().toString().padStart(2, '0')}日
                        </span>
                        <span className="font-medium">{post.title}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        ))}
    </div>
  )
} 