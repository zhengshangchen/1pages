import { json } from '@remix-run/node'
import { useLoaderData, Link } from '@remix-run/react'
import { getAllPosts } from '~/services/posts.server'
import type { MetaFunction } from '@remix-run/node'
import type { PostListItem } from '~/types/post'

export const meta: MetaFunction = () => {
  return [
    { title: "文章归档 | RemixPages" },
    { name: "description", content: "按时间浏览所有文章" }
  ]
}

interface GroupedPosts {
  [year: string]: {
    [month: string]: PostListItem[]
  }
}

export async function loader() {
  const posts = await getAllPosts()
  
  // 按年月分组文章
  const groupedPosts = posts.reduce((acc: GroupedPosts, post) => {
    const date = new Date(post.date)
    const year = date.getFullYear().toString()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')

    if (!acc[year]) {
      acc[year] = {}
    }
    if (!acc[year][month]) {
      acc[year][month] = []
    }
    acc[year][month].push(post)
    return acc
  }, {})

  return json({ groupedPosts })
}

export default function Archive() {
  const { groupedPosts } = useLoaderData<typeof loader>()
  const years = Object.keys(groupedPosts).sort((a, b) => b.localeCompare(a))

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">文章归档</h1>
      <div className="space-y-8">
        {years.map(year => (
          <section key={year}>
            <h2 className="text-2xl font-bold mb-4">{year}年</h2>
            {Object.keys(groupedPosts[year])
              .sort((a, b) => b.localeCompare(a))
              .map(month => (
                <div key={`${year}-${month}`} className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">
                    {month}月
                  </h3>
                  <ul className="space-y-2">
                    {groupedPosts[year][month].map(post => (
                      <li 
                        key={post.slug}
                        className="flex items-center gap-4"
                      >
                        <time 
                          className="text-sm text-gray-500 dark:text-gray-400 w-24"
                          dateTime={post.date}
                        >
                          {new Date(post.date).toLocaleDateString()}
                        </time>
                        <Link
                          to={`/posts/${post.slug}`}
                          className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          {post.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </section>
        ))}
      </div>
    </div>
  )
} 