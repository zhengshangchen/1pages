import type { Post } from "~/types/post";
import type { PostListItem } from "~/types/taxonomy";

// 使用相对路径
const postsGlob = import.meta.glob('/content/posts/*.mdx', { eager: true })

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const path = `/content/posts/${slug}.mdx`
    if (!(path in postsGlob)) {
      return null
    }

    const module = postsGlob[path]
    const { frontmatter } = module

    return {
      slug,
      content: module.default,
      title: frontmatter.title,
      date: new Date(frontmatter.date),
      excerpt: frontmatter.description || '',
      frontmatter,
    }
  } catch (error) {
    console.error(`加载文章失败 ${slug}:`, error)
    return null
  }
}

export async function getAllPosts(): Promise<PostListItem[]> {
  const posts = Object.entries(postsGlob).map(([path, module]) => ({
    slug: path.replace(/^\/content\/posts\/(.*)\.mdx$/, '$1'),
    ...module.frontmatter,
  }))

  return posts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}