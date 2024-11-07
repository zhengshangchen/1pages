import { useParams, useLocation } from '@remix-run/react'
import { useEffect } from 'react'

export default function PostSlug() {
  const { slug } = useParams()
  const location = useLocation()

  useEffect(() => {
    console.log('PostSlug 组件加载')
    console.log('当前路径:', location.pathname)
    console.log('Slug 参数:', slug)
  }, [slug, location.pathname])

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">文章详情页测试</h1>
      <p className="text-lg mb-4">当前路径: {location.pathname}</p>
      <p className="text-lg mb-4">当前文章 Slug: {slug}</p>
      <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded">
        <p>如果你看到这个内容，说明详情页路由正常工作！</p>
      </div>
    </div>
  )
}