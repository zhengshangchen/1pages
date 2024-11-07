import type { ComponentType } from 'react'

export interface Post {
  slug: string
  content: ComponentType
  title: string
  date: Date
  excerpt: string
  frontmatter: {
    title: string
    date: string
    description?: string
    tags?: string[]
    [key: string]: unknown
  }
}

export interface PostContentProps {
  content: ComponentType
} 