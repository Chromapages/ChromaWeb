import { PortableText, type PortableTextComponents } from '@portabletext/react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => <h1 className="text-display-sm font-display mb-6 mt-10">{children}</h1>,
    h2: ({ children }) => <h2 className="text-headline-md font-display mb-4 mt-8">{children}</h2>,
    h3: ({ children }) => <h3 className="text-headline-sm font-display mb-3 mt-6">{children}</h3>,
    normal: ({ children }) => <p className="text-body-lg text-on-surface/80 mb-4 leading-relaxed">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary bg-primary/5 px-6 py-4 my-8 rounded-r-lg italic shadow-sm">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 mb-6 space-y-2">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 mb-6 space-y-2">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="text-body-lg text-on-surface/80">{children}</li>,
    number: ({ children }) => <li className="text-body-lg text-on-surface/80">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold text-on-surface">{children}</strong>,
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
      return (
        <a
          href={value.href}
          rel={rel}
          className="text-primary underline underline-offset-4 hover:text-primary-hover transition-colors font-medium"
        >
          {children}
        </a>
      )
    },
  },
}

import type { PortableTextBlock } from "@portabletext/types";

interface RichTextProps {
  value: PortableTextBlock | PortableTextBlock[];
  className?: string;
}

export default function RichText({ value, className }: RichTextProps) {
  if (!value) return null

  return (
    <div className={cn('prose prose-on-surface max-w-none', className)}>
      <PortableText value={value} components={components} />
    </div>
  )
}
