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
        <div className="lg:flex lg:h-dvh lg:items-stretch lg:justify-center lg:gap-16 lg:overflow-hidden lg:px-10">
          <div className="flex min-h-dvh items-center justify-center sm:py-8 lg:h-dvh lg:w-[400px] lg:shrink-0 lg:overflow-hidden">
            <div className="relative flex h-dvh w-full max-w-[400px] flex-col overflow-hidden bg-[#F5F7FB] sm:h-[860px] sm:rounded-[44px] sm:border-[10px] sm:border-[#1E2433] sm:shadow-2xl">
              {children}
            </div>
          </div>
          <PageSwitcher />
        </div>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
