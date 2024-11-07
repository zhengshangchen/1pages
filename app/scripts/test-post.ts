import { getPost } from '../utils/posts.server'

async function testPost() {
  const slug = 'web-performance-optimization'
  console.log('测试读取文章:', slug)
  
  const post = await getPost(slug)
  if (post) {
    console.log('成功读取文章:', {
      title: post.title,
      date: post.date,
      contentLength: post.content.length
    })
  } else {
    console.log('未找到文章')
  }
}

testPost().catch(console.error) 