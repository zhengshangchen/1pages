export interface PostListItem {
  slug: string;
  title: string;
  date: string;
  description?: string;
  frontmatter: Record<string, any>;
}

export interface Tag {
  slug: string;
  name: string;
  count: number;
  posts: string[];
}

export interface Category {
  slug: string;
  name: string;
  count: number;
  posts: string[];
  description?: string;
}

export interface TaxonomyData {
  tags: Record<string, Tag>;
  categories: Record<string, Category>;
} 