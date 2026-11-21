import type { Viewport } from 'next'

export const metadata = {
  title: 'Sanity Studio',
  robots: 'noindex',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
