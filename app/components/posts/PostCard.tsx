import { Link } from '@remix-run/react'
import type { PostListItem } from '~/types/taxonomy'

interface PostCardProps {
  post: PostListItem
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {post.frontmatter?.image && (
        <Link to={`/posts/${post.slug}`} className="block overflow-hidden">
          <img
            src={post.frontmatter.image}
            alt={post.title}
            className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-200"
          />
        </Link>
      )}
      <div className="p-6">
        <h2 className="text-xl font-bold mb-2">
          <Link 
            to={`/posts/${post.slug}`}
            className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
          >
            {post.title}
          </Link>
        </h2>
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {new Date(post.date).toLocaleDateString()}
        </div>
        {post.excerpt && (
          <p className="text-gray-600 dark:text-gray-400 line-clamp-3">
            {post.excerpt}
          </p>
        )}
      </div>
    </article>
  )
} 