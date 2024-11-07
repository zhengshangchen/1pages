import { Link } from '@remix-run/react'
import type { Category, Tag } from '~/types/taxonomy'

interface TaxonomyStatsProps {
  topCategories: Category[]
  topTags: Tag[]
}

export default function TaxonomyStats({ 
  topCategories, 
  topTags 
}: TaxonomyStatsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">热门分类</h2>
        <ul className="space-y-2">
          {topCategories.map(category => (
            <li key={category.slug}>
              <Link
                to={`/categories/${category.slug}`}
                className="flex items-center justify-between hover:text-blue-600 dark:hover:text-blue-400"
              >
                <span>{category.name}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {category.count}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">热门标签</h2>
        <div className="flex flex-wrap gap-2">
          {topTags.map(tag => (
            <Link
              key={tag.slug}
              to={`/tags/${tag.slug}`}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              {tag.name}
              <span className="ml-1 text-gray-500 dark:text-gray-400">
                ({tag.count})
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
} 