import { json } from '@remix-run/node'
import { useLoaderData, Link } from '@remix-run/react'
import { getTaxonomyData } from '~/services/taxonomy.server'
import type { MetaFunction } from '@remix-run/node'
import clsx from 'clsx'

export const meta: MetaFunction = () => {
  return [
    { title: "标签云 | RemixPages" },
    { name: "description", content: "浏览所有文章标签" }
  ]
}

export async function loader() {
  const { tags } = await getTaxonomyData()
  return json({ tags: Object.values(tags) })
}

function getTagSize(count: number, maxCount: number) {
  const sizes = ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl']
  const index = Math.floor((count / maxCount) * (sizes.length - 1))
  return sizes[index]
}

export default function TagsIndex() {
  const { tags } = useLoaderData<typeof loader>()
  const maxCount = Math.max(...tags.map(tag => tag.count))

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">标签云</h1>
      <div className="flex flex-wrap gap-4">
        {tags.map(tag => (
          <Link
            key={tag.slug}
            to={`/tags/${tag.slug}`}
            className={clsx(
              getTagSize(tag.count, maxCount),
              'inline-block px-3 py-1 bg-gray-100 dark:bg-gray-800',
              'rounded-full hover:bg-gray-200 dark:hover:bg-gray-700',
              'transition-colors duration-200'
            )}
          >
            {tag.name}
            <span className="ml-1 text-gray-500 dark:text-gray-400">
              ({tag.count})
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
} 