import { useParams } from '@remix-run/react'
import { useState, useEffect } from 'react'
import PostContent from '~/components/posts/PostContent'
import { getPost } from '~/services/posts'
import type { Post } from '~/types/post'

export default function PostSlug() {
  const { slug } = useParams()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadPost() {
      if (!slug) return

      try {
        const postData = await getPost(slug)
        setPost(postData)
      } catch (error) {
        console.error('加载文章失败:', error)
      } finally {
        setLoading(false)
      }
    }

    loadPost()
  }, [slug])

  if (loading) {
    return <div className="text-center py-8">加载中...</div>
  }

  if (!post) {
    return <div className="text-center py-8">文章未找到</div>
  }

  const Content = post.content

  return (
    <article className="prose dark:prose-invert mx-auto px-4 py-8">
      <h1>{post.title}</h1>
      <div className="text-sm text-gray-500 mb-4">
        {post.date.toLocaleDateString('zh-CN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </div>
      {post.excerpt && (
        <p className="text-gray-600 dark:text-gray-400 mb-8 italic">
          {post.excerpt}
        </p>
      )}
      <Content />
    </article>
  )
}