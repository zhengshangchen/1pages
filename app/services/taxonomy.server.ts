import { getAllPosts } from './posts'
import type { Category, Tag } from '~/types/taxonomy'

export async function getCategories(): Promise<Category[]> {
  const posts = await getAllPosts()
  const categoryMap = new Map<string, number>()
  
  posts.forEach(post => {
    const categories = post.categories || []
    categories.forEach(category => {
      categoryMap.set(category, (categoryMap.get(category) || 0) + 1)
    })
  })
  
  return Array.from(categoryMap.entries()).map(([name, count]) => ({
    name,
    count,
    slug: name.toLowerCase().replace(/\s+/g, '-')
  }))
}

export async function getTags(): Promise<Tag[]> {
  const posts = await getAllPosts()
  const tagMap = new Map<string, number>()
  
  posts.forEach(post => {
    const tags = post.tags || []
    tags.forEach(tag => {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1)
    })
  })
  
  return Array.from(tagMap.entries()).map(([name, count]) => ({
    name,
    count,
    slug: name.toLowerCase().replace(/\s+/g, '-')
  }))
} 