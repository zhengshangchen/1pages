import { bundleMDX } from "mdx-bundler";
import path from "path";
import fs from "fs/promises";
import type { Post } from "~/types/post";
import type { PostListItem } from "~/types/taxonomy";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import rehypeSlug from "rehype-slug";
import rehypePrismPlus from "rehype-prism-plus";

// 确保在服务器端设置 esbuild
if (process.platform === 'win32') {
  process.env.ESBUILD_BINARY_PATH = path.join(
    process.cwd(),
    'node_modules',
    'esbuild',
    'esbuild.exe',
  )
} else {
  process.env.ESBUILD_BINARY_PATH = path.join(
    process.cwd(),
    'node_modules',
    'esbuild',
    'bin',
    'esbuild',
  )
}

const postsPath = path.join(process.cwd(), "content", "posts");

export async function getPost(slug: string): Promise<Post | null> {
  console.log('尝试读取文件:', path.join(postsPath, `${slug}.mdx`));
  
  try {
    const filePath = path.join(postsPath, `${slug}.mdx`);
    const source = await fs.readFile(filePath, 'utf-8');
    console.log('读取到文件内容，长度:', source.length);

    const { code, frontmatter } = await bundleMDX({
      source,
      mdxOptions(options) {
        options.remarkPlugins = [
          ...(options.remarkPlugins ?? []),
          remarkGfm,
          remarkToc,
        ];
        options.rehypePlugins = [
          ...(options.rehypePlugins ?? []),
          rehypeSlug,
          rehypePrismPlus,
        ];
        return options;
      },
    });

    console.log('MDX编译成功，frontmatter:', frontmatter);

    return {
      slug,
      content: code,
      title: frontmatter.title,
      date: new Date(frontmatter.date),
      excerpt: frontmatter.description || '',
      frontmatter,
    };
  } catch (error) {
    console.error(`加载文章失败 ${slug}:`, error);
    return null;
  }
}

export async function getPosts() {
  console.log('开始获取所有文章...');
  try {
    const files = await fs.readdir(postsPath);
    console.log('找到文件:', files);
    
    const posts = await Promise.all(
      files
        .filter(file => {
          const isValid = file.endsWith('.mdx');
          console.log(`检查文件 ${file}:`, isValid ? '有效' : '无效');
          return isValid;
        })
        .map(async file => {
          const slug = file.replace(/\.mdx$/, '');
          console.log('处理文章:', slug);
          const post = await getPost(slug);
          if (!post) {
            console.log(`❌ 无法加载文章: ${slug}`);
            return null;
          }
          console.log(`✅ 成功加载文章: ${slug}`);
          return {
            slug,
            title: post.title,
            date: post.date,
            excerpt: post.excerpt,
            frontmatter: post.frontmatter
          };
        })
    );

    const validPosts = posts.filter((post): post is PostListItem => post !== null);
    console.log(`成功加载 ${validPosts.length} 篇文章`);
    
    return validPosts.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.error('获取文章列表失败:', error);
    return [];
  }
} 