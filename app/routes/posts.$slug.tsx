import { useParams, useLocation } from '@remix-run/react'
import { useState, useEffect } from 'react'
import { getPost } from '~/services/posts'
import type { Post } from '~/types/post'

export default function PostSlug() {
  const { slug } = useParams()
  const location = useLocation()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log('PostSlug 组件加载')
    console.log('当前路径:', location.pathname)
    console.log('Slug 参数:', slug)

    async function loadPost() {
      if (!slug) return
      
      try {
        const postData = await getPost(slug)
        console.log('获取到的文章数据:', postData)
        setPost(postData)
      } catch (error) {
        console.error('加载文章失败:', error)
      } finally {
        setLoading(false)
      }
    }

    loadPost()
  }, [slug, location.pathname])

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">加载中...</div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">文章未找到</h1>
        <p className="text-gray-600 dark:text-gray-400">
          无法找到标题为 "{slug}" 的文章
        </p>
      </div>
    )
  }

  const PostContent = post.content

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center text-gray-600 dark:text-gray-400 space-x-4">
          <time dateTime={post.date.toISOString()}>
            {post.date.toLocaleDateString('zh-CN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
          {post.frontmatter.tags && (
            <div className="flex gap-2">
              {post.frontmatter.tags.map(tag => (
                <span 
                  key={tag}
                  className="px-2 py-1 text-sm bg-gray-100 dark:bg-gray-800 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        {post.excerpt && (
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            {post.excerpt}
          </p>
        )}
        <PostContent />
      </div>
    </article>
  )
}