export interface Post {
  slug: string;
  content: string;
  frontmatter: Record<string, any>;
  title: string;
  date: string | Date;
  excerpt?: string;
} 