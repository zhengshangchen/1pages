import { Link } from '@remix-run/react'

export function HomePage() {
  return (
    <div className="space-y-16 py-12">
      {/* Hero 区域 */}
      <section className="text-center space-y-6 px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white">
          1Pages
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          一个现代化的个人博客平台，基于 Remix 和 Cloudflare Pages 构建。
        </p>
        <div className="flex justify-center gap-4">
          <Link 
            to="/posts" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            浏览文章
          </Link>
          <Link 
            to="/about" 
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
          >
            了解更多
          </Link>
        </div>
      </section>

      {/* 特性介绍 */}
      <section className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          特色功能
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="text-center space-y-4 p-6 rounded-lg bg-white dark:bg-gray-800 shadow-sm"
            >
              <div className="text-blue-600 dark:text-blue-400">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 最新文章 */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            最新文章
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            探索我们的最新内容
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <article 
              key={i}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  <Link to={`/posts/sample-${i}`} className="hover:text-blue-600 dark:hover:text-blue-400">
                    示例文章标题 {i}
                  </Link>
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  这是一段示例文章的摘要内容，展示文章的主要信息...
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>2024-01-{i}</span>
                  <span>5 min read</span>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link 
            to="/posts"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            查看所有文章
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}

const features = [
  {
    title: "MDX 支持",
    description: "使用 MDX 编写文章，支持 Markdown 和 React 组件混合使用",
    icon: (
      <svg className="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: "深色模式",
    description: "内置深色模式支持，自动适应系统主题设置",
    icon: (
      <svg className="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    ),
  },
  {
    title: "响应式设计",
    description: "完全响应式设计，在任何设备上都能获得最佳体验",
    icon: (
      <svg className="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
] 