import type { Heading } from '~/types/post'

interface ExtractedHeading {
  text: string
  level: number
  id: string
}

export function extractHeadings(content: string): Heading[] {
  const headingRegex = /^#{1,6}\s+(.+)$/gm
  const headings: Heading[] = []
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    const text = match[1].trim()
    const level = match[0].split('#').length - 1
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    headings.push({ text, level, id })
  }

  return buildHeadingTree(headings)
}

function buildHeadingTree(headings: ExtractedHeading[]): Heading[] {
  const treeHeadings: Heading[] = []
  const stack: Heading[] = []

  headings.forEach(heading => {
    const node: Heading = {
      ...heading,
      children: []
    }

    // 找到合适的父节点
    while (
      stack.length > 0 && 
      stack[stack.length - 1].level >= heading.level
    ) {
      stack.pop()
    }

    if (stack.length === 0) {
      treeHeadings.push(node)
    } else {
      stack[stack.length - 1].children?.push(node)
    }

    stack.push(node)
  })

  return treeHeadings
} 