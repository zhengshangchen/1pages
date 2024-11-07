import type { Post } from "~/types/post";
import type { PostListItem } from "~/types/taxonomy";
import type { ComponentType } from 'react';

// 添加 ImportMeta 类型扩展
declare global {
    interface ImportMeta {
        glob<T = unknown>(pattern: string, options?: { eager?: boolean }): Record<string, T>;
    }
}

interface MDXModule {
    default: ComponentType;
    frontmatter: {
        title: string;
        date: string;
        description?: string;
        tags?: string[];
        [key: string]: unknown;
    };
}

// 修改类型断言
const postsGlob = import.meta.glob<MDXModule>('/content/posts/*.mdx', { 
    eager: true 
});

export async function getPost(slug: string): Promise<Post | null> {
    try {
        const entries = Object.entries(postsGlob)
        const matchingEntry = entries.find(([path]) => path.includes(`/${slug}.mdx`))

        if (!matchingEntry) {
            console.warn(`未找到文章: ${slug}`)
            return null
        }

        const [path, module] = matchingEntry

        if (!module?.frontmatter) {
            console.warn(`模块缺少 frontmatter: ${path}`)
            return null
        }

        return {
            slug,
            title: module.frontmatter.title,
            date: new Date(module.frontmatter.date),
            content: module.default,
            excerpt: module.frontmatter.description || '',
            frontmatter: module.frontmatter
        }
    } catch (error) {
        console.error('获取文章失败:', error)
        return null
    }
}

export async function getAllPosts(): Promise<PostListItem[]> {
    try {
        const posts = Object.entries(postsGlob)
            .map(([path, module]) => {
                const typedModule = module as MDXModule
                const { frontmatter } = typedModule
                if (!frontmatter) {
                    console.warn(`跳过缺少 frontmatter 的文章: ${path}`)
                    return null
                }

                const slug = path.split('/').pop()?.replace('.mdx', '') || ''

                return {
                    slug,
                    title: frontmatter.title,
                    date: frontmatter.date,
                    description: frontmatter.description || '',
                    frontmatter
                }
            })
            .filter((post): post is NonNullable<typeof post> => post !== null)
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

        console.log('找到的文章:', posts)
        return posts
    } catch (error) {
        console.error('获取文章列表失败:', error)
        return []
    }
}

export async function getAllPostsAlternative(): Promise<PostListItem[]> {
    try {
        const modules = import.meta.glob<MDXModule>('/content/posts/*.mdx', { 
            eager: true 
        });
        
        console.log('glob 结果:', modules);

        const posts = await Promise.all(
            Object.entries(modules).map(async ([path, module]) => {
                console.log('处理文件:', path);
                console.log('模块内容:', module);
                
                if (!module?.frontmatter) {
                    console.warn('模块缺少 frontmatter:', path);
                    return null;
                }

                const slug = path.replace('/content/posts/', '').replace('.mdx', '');
                
                return {
                    slug,
                    title: module.frontmatter.title,
                    date: module.frontmatter.date,
                    description: module.frontmatter.description,
                    frontmatter: module.frontmatter
                };
            })
        );

        const validPosts = posts.filter((post): post is PostListItem => post !== null);
        
        if (validPosts.length === 0) {
            console.warn('没有找到有效的文章');
            return [];
        }

        return validPosts.sort((a, b) => 
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );
    } catch (error) {
        console.error('加载文章失败:', error);
        return [];
    }
}