import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'File to Base64',
  description: 'Converting your file or text to Base64.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '../src/favicon-512.svg',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '../src/favicon-512.svg',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '../src/favicon-512.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '../src/favicon-512.svg',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
