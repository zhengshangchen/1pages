import fs from 'fs/promises'
import path from 'path'

async function checkPostsDirectory() {
  const postsPath = path.join(process.cwd(), 'content', 'posts')
  
  try {
    // 检查目录是否存在
    await fs.access(postsPath)
    console.log('✅ content/posts 目录存在')
    
    // 检查文章文件
    const files = await fs.readdir(postsPath)
    const mdxFiles = files.filter(file => file.endsWith('.mdx'))
    
    console.log(`找到 ${mdxFiles.length} 篇文章:`)
    mdxFiles.forEach(file => {
      console.log(`- ${file}`)
    })
    
    // 检查每个文件的内容
    for (const file of mdxFiles) {
      const filePath = path.join(postsPath, file)
      try {
        const content = await fs.readFile(filePath, 'utf-8')
        console.log(`\n${file} 内容长度:`, content.length)
        // 检查 frontmatter
        if (content.startsWith('---')) {
          console.log(`✅ ${file} 包含 frontmatter`)
        } else {
          console.log(`❌ ${file} 缺少 frontmatter`)
        }
      } catch (error) {
        console.error(`❌ 读取 ${file} 失败:`, error)
      }
    }
    
  } catch (error) {
    if (error instanceof Error && error.message.includes('ENOENT')) {
      console.error('❌ content/posts 目录不存在，正在创建...')
      await fs.mkdir(postsPath, { recursive: true })
      console.log('✅ content/posts 目录已创建')
    } else {
      console.error('检查文章目录时出错:', error)
    }
  }
}

// 执行检查
checkPostsDirectory() 