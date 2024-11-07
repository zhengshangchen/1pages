import type { ReactNode } from 'react'
import { Link } from '@remix-run/react'
import type { Post } from '~/types/post'

interface PostContentProps {
  post: Post
  children: ReactNode
}

export default function PostContent({ post, children }: PostContentProps) {
  const { title, date, readingTime, frontmatter } = post

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          {title}
        </h1>
        <div className="mt-4 flex items-center text-gray-600 dark:text-gray-400">
          {frontmatter.author && (
            <>
              <span>{frontmatter.author}</span>
              <span className="mx-2">·</span>
            </>
          )}
          <time dateTime={date}>{new Date(date).toLocaleDateString()}</time>
          {readingTime && (
            <>
              <span className="mx-2">·</span>
              <span>{readingTime.text}</span>
            </>
          )}
        </div>
        {frontmatter.tags && (
          <div className="mt-4 flex flex-wrap gap-2">
            {frontmatter.tags.map(tag => (
              <Link
                key={tag}
                to={`/tags/${tag}`}
                className="text-sm px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}
      </header>
      <div className="prose prose-lg dark:prose-invert max-w-none">
        {children}
      </div>
    </article>
  )
} 