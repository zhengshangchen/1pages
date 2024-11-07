import { useState, useEffect } from 'react'

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
}

export function Image({ src, alt, className = '', ...props }: ImageProps) {
  const [imageSrc, setImageSrc] = useState<string>(src)
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    async function loadImage() {
      try {
        // 如果是相对路径，添加前缀
        const fullSrc = src.startsWith('/') ? src : `/images/${src}`
        setImageSrc(fullSrc)
      } catch (err) {
        console.error('图片加载失败:', err)
        setError(true)
      }
    }

    loadImage()
  }, [src])

  if (error) {
    return (
      <div className="flex items-center justify-center p-4 bg-gray-100 dark:bg-gray-800 rounded">
        <span className="text-gray-500 dark:text-gray-400">图片加载失败</span>
      </div>
    )
  }

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={`max-w-full h-auto ${className}`}
      loading="lazy"
      decoding="async"
      {...props}
    />
  )
} 