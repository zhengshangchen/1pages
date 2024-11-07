import { Link } from '@remix-run/react'
import type { ComponentPropsWithoutRef } from 'react'

interface CustomLinkProps extends ComponentPropsWithoutRef<'a'> {
  href?: string; // 将 href 设置为可选
}

interface CustomHeadingProps extends ComponentPropsWithoutRef<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'> {
  level: 1 | 2 | 3 | 4 | 5 | 6
}

// 自定义链接组件
const CustomLink = ({ href, children, ...props }: CustomLinkProps) => {
  const isInternalLink = href && href.startsWith('/')
  const isAnchorLink = href && href.startsWith('#')

  if (isInternalLink) {
    return (
      <Link to={href} {...props}>
        {children}
      </Link>
    )
  }

  if (isAnchorLink) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    )
  }

  return (
    <a 
      target="_blank" 
      rel="noopener noreferrer" 
      href={href} 
      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
      {...props}
    >
      {children}
      <span className="sr-only">(opens in new tab)</span>
    </a>
  )
}

// 自定义图片组件
const CustomImage = ({ src, alt, ...props }: ComponentPropsWithoutRef<'img'>) => {
  return (
    <figure className="my-8">
      <div className="overflow-hidden rounded-lg">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="w-full h-auto transition-transform duration-200 hover:scale-105"
          {...props}
        />
      </div>
      {alt && (
        <figcaption className="mt-2 text-sm text-center text-gray-600 dark:text-gray-400">
          {alt}
        </figcaption>
      )}
    </figure>
  )
}

// 自定义标题组件
const CustomHeading = ({ level, children, ...props }: CustomHeadingProps) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements
  const baseStyles = "font-bold tracking-tight text-gray-900 dark:text-white scroll-mt-24"
  const sizeStyles = {
    1: "text-4xl mt-8 mb-6",
    2: "text-3xl mt-6 mb-4",
    3: "text-2xl mt-4 mb-3",
    4: "text-xl mt-3 mb-2",
    5: "text-lg mt-2 mb-1",
    6: "text-base mt-2 mb-1"
  }[level]

  return (
    <Tag className={`${baseStyles} ${sizeStyles}`} {...props}>
      {children}
    </Tag>
  )
}

// 自定义代码块组件
const CustomPreBlock = (props: ComponentPropsWithoutRef<'pre'>) => {
  return (
    <div className="relative my-6 rounded-lg overflow-hidden">
      <pre {...props} className="p-4 overflow-x-auto bg-gray-900 text-white" />
    </div>
  )
}

// 自定义行内代码组件
const CustomInlineCode = (props: ComponentPropsWithoutRef<'code'>) => {
  return (
    <code
      {...props}
      className="px-1.5 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
    />
  )
}

// MDX组件映射
export const MDXComponents = {
  a: CustomLink,
  img: CustomImage,
  h1: (props: ComponentPropsWithoutRef<'h1'>) => <CustomHeading level={1} {...props} />,
  h2: (props: ComponentPropsWithoutRef<'h2'>) => <CustomHeading level={2} {...props} />,
  h3: (props: ComponentPropsWithoutRef<'h3'>) => <CustomHeading level={3} {...props} />,
  h4: (props: ComponentPropsWithoutRef<'h4'>) => <CustomHeading level={4} {...props} />,
  h5: (props: ComponentPropsWithoutRef<'h5'>) => <CustomHeading level={5} {...props} />,
  h6: (props: ComponentPropsWithoutRef<'h6'>) => <CustomHeading level={6} {...props} />,
  pre: CustomPreBlock,
  code: CustomInlineCode,
} 