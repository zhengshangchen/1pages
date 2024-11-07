import { useState, useEffect } from 'react'

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

export function Image({ src, alt, ...props }: ImageProps) {
  const [imageSrc, setImageSrc] = useState(src)
  
  useEffect(() => {
    const img = new window.Image()
    img.src = src
    img.onload = () => {
      if (typeof window.createImageBitmap === 'function') {
        createImageBitmap(img)
          .then(() => {
            setImageSrc(src)
          })
          .catch(console.error)
      }
    }
  }, [src])

  return (
    <img
      src={imageSrc}
      alt={alt}
      loading="lazy"
      decoding="async"
      {...props}
    />
  )
} 