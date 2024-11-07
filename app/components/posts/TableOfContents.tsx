import { useState, useEffect } from 'react'
import { Link } from '@remix-run/react'
import type { Heading } from '~/types/post'
import clsx from 'clsx'

interface TableOfContentsProps {
  headings: Heading[]
  activeId?: string
}

interface HeadingLinkProps {
  heading: Heading
  activeId?: string
  level: number
}

const HeadingLink = ({ heading, activeId, level }: HeadingLinkProps) => {
  const isActive = activeId === heading.id
  
  return (
    <li>
      <Link
        to={`#${heading.id}`}
        className={clsx(
          'block py-1 text-sm transition-colors duration-200',
          'hover:text-blue-600 dark:hover:text-blue-400',
          isActive 
            ? 'text-blue-600 dark:text-blue-400 font-medium' 
            : 'text-gray-600 dark:text-gray-400',
          level > 0 && 'pl-4'
        )}
      >
        {heading.text}
      </Link>
      {heading.children && heading.children.length > 0 && (
        <ul className="pl-4">
          {heading.children.map(child => (
            <HeadingLink
              key={child.id}
              heading={child}
              activeId={activeId}
              level={level + 1}
            />
          ))}
        </ul>
      )}
    </li>
  )
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>()

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '0% 0% -80% 0%',
        threshold: 1.0
      }
    )

    const headingElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
    headingElements.forEach(element => observer.observe(element))

    return () => {
      headingElements.forEach(element => observer.unobserve(element))
    }
  }, [])

  if (!headings || headings.length === 0) {
    return null
  }

  return (
    <nav className="hidden lg:block sticky top-8 max-h-[calc(100vh-4rem)] overflow-auto">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        目录
      </h2>
      <ul className="space-y-2">
        {headings.map(heading => (
          <HeadingLink
            key={heading.id}
            heading={heading}
            activeId={activeId}
            level={0}
          />
        ))}
      </ul>
    </nav>
  )
} 