export const metadata = {
  title: 'Sanity Studio',
  viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
  robots: 'noindex',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
