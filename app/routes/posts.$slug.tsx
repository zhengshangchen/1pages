import { useParams } from '@remix-run/react'
import { useState, useEffect } from 'react'
import PostContent from '~/components/posts/PostContent'

const modules = import.meta.glob('../../content/posts/*.mdx')

export default function PostSlug() {
  const { slug } = useParams()
  const [post, setPost] = useState<{ code: string; frontmatter: any } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadPost() {
      try {
        const importPath = `../../content/posts/${slug}.mdx`
        const module = await modules[importPath]?.()
        if (module) {
          setPost({
            code: module.default,
            frontmatter: module.frontmatter
          })
        }
      } catch (error) {
        console.error('加载文章失败:', error)
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      loadPost()
    }
  }, [slug])

  if (loading) {
    return <div className="text-center py-8">加载中...</div>
  }

  if (!post) {
    return <div className="text-center py-8">文章未找到</div>
  }

  return (
    <article className="prose dark:prose-invert mx-auto px-4 py-8">
      <h1>{post.frontmatter.title}</h1>
      <PostContent code={post.code} />
    </article>
  )
}