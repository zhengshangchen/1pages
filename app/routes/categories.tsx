import { json } from '@remix-run/node'
import { useLoaderData, Link } from '@remix-run/react'
import { getTaxonomyData } from '~/services/taxonomy.server'
import type { MetaFunction } from '@remix-run/node'

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) return []
  
  const { categories } = data
  const categoryNames = categories.map(c => c.name).join(', ')
  
  return [
    { title: "文章分类 | RemixPages" },
    { name: "description", content: `浏览所有文章分类: ${categoryNames}` },
    { name: "keywords", content: categoryNames },
    // Open Graph
    { property: "og:title", content: "文章分类 | RemixPages" },
    { property: "og:description", content: `浏览所有文章分类: ${categoryNames}` },
    { property: "og:type", content: "website" },
  ]
}

export async function loader() {
  const { categories } = await getTaxonomyData()
  return json({ categories: Object.values(categories) })
}

export default function CategoriesIndex() {
  const { categories } = useLoaderData<typeof loader>()

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">文章分类</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map(category => (
          <Link
            key={category.slug}
            to={`/categories/${category.slug}`}
            className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{category.name}</h2>
            {category.description && (
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {category.description}
              </p>
            )}
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {category.count} 篇文章
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
} 