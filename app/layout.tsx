import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { PageSwitcher } from '@/components/page-switcher'
import './globals.css'

export const metadata: Metadata = {
  title: 'Max AI错题宝 - 教师端',
  description: 'AI精准批改，定位薄弱环节，助力老师高效管理错题',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#E8F4FF',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body className="bg-[#E9ECF3] antialiased">
        <div className="lg:flex lg:min-h-dvh lg:items-start lg:justify-center lg:gap-16 lg:px-10">
          <div className="lg:sticky lg:top-0 lg:shrink-0">{children}</div>
          <PageSwitcher />
        </div>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
