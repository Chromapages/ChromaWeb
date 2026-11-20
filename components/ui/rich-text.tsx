import type { PortableTextBlock } from '@portabletext/types'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import { cn } from '@/lib/utils'

const subheading = 'mt-8 mb-3 text-xl font-semibold leading-tight'

const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => <h3 className={subheading}>{children}</h3>,
    h2: ({ children }) => <h3 className={subheading}>{children}</h3>,
    h3: ({ children }) => <h4 className="mt-6 mb-3 font-semibold">{children}</h4>,
    normal: ({ children }) => <p className="mb-4">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-s border-control ps-4 italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mb-6 list-disc space-y-2 ps-6">{children}</ul>,
    number: ({ children }) => <ol className="mb-6 list-decimal space-y-2 ps-6">{children}</ol>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
    link: ({ children, value }) => {
      const href = typeof value?.href === 'string' ? value.href.trim() : ''
      if (!/^(https?:\/\/|mailto:|tel:|\/(?!\/)|#)/i.test(href)) return <>{children}</>
      const rel = !href.startsWith('/') ? 'noreferrer noopener' : undefined
      return (
        <a
          href={href}
          rel={rel}
          className="font-medium text-primary underline underline-offset-4 hover:decoration-2"
        >
          {children}
        </a>
      )
    },
  },
}

interface RichTextProps {
  value: PortableTextBlock | PortableTextBlock[];
  className?: string;
}

export default function RichText({ value, className }: RichTextProps) {
  if (!value) return null

  return (
    <div className={cn('max-w-[68ch] wrap-anywhere text-muted', className)}>
      <PortableText value={value} components={components} />
    </div>
  )
}
