import React from 'react'
import { useParams } from '@remix-run/react'
import { useState, useEffect } from 'react'

export default function ImageRoute() {
  const { imagePath } = useParams()
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadImage() {
      try {
        // @ts-ignore
        /* @vite-ignore */
        const imageModule = await import(`../../public/images/${imagePath}.png`)
        setImageUrl(imageModule.default)
      } catch (err) {
        // 如果 .png 加载失败，尝试 .jpg
        try {
          // @ts-ignore
          /* @vite-ignore */
          const imageModule = await import(`../../public/images/${imagePath}.jpg`)
          setImageUrl(imageModule.default)
        } catch (err2) {
          setError('图片加载失败')
          console.error('图片加载错误:', err2)
        }
      }
    }

    if (imagePath) {
      loadImage()
    }
  }, [imagePath])

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500">{error}</h1>
          <p className="mt-2 text-gray-600">请检查图片路径是否正确</p>
        </div>
      </div>
    )
  }

  if (!imageUrl) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p>加载中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <img 
        src={imageUrl} 
        alt={imagePath}
        className="max-w-full h-auto"
        loading="lazy"
      />
    </div>
  )
} 