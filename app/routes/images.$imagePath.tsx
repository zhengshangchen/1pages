import { LoaderFunctionArgs } from '@remix-run/node';
import path from 'path';
import fs from 'fs/promises';

export async function loader({ params }: LoaderFunctionArgs) {
  const imagePath = params.imagePath;
  if (!imagePath) {
    throw new Response('图片路径不存在', { status: 404 });
  }

  try {
    const fullPath = path.join(process.cwd(), 'public', 'images', imagePath);
    const file = await fs.readFile(fullPath);
    
    // 根据文件扩展名设置正确的 Content-Type
    const ext = path.extname(imagePath).toLowerCase();
    const contentType = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.gif': 'image/gif',
      '.webp': 'image/webp',
    }[ext] || 'application/octet-stream';

    return new Response(file, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000',
      },
    });
  } catch (error) {
    console.error('加载图片失败:', error);
    throw new Response('图片未找到', { status: 404 });
  }
} 