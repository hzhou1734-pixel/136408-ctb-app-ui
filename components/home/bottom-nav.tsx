import Image from 'next/image'
import Link from 'next/link'
import { Box, ClipboardPlus, Smile } from 'lucide-react'

type NavKey = 'home' | 'book' | 'app' | 'me'

function RaisedIcon({ tab }: { tab: NavKey }) {
  if (tab === 'home') {
    return (
      <Image
        src="/images/home/home.png"
        alt=""
        width={76}
        height={76}
        className="absolute -top-[50px] size-[44px] rounded-full"
      />
    )
  }
  if (tab === 'me') {
    return (
      <span className="absolute -top-[52px] flex size-[48px] items-center justify-center rounded-full bg-[linear-gradient(135deg,#3DA9FF_0%,#1E88F2_100%)] text-white shadow-[0_6px_16px_rgba(30,136,245,0.45)] ring-[3px] ring-white">
        <Smile className="size-6" strokeWidth={2} aria-hidden="true" />
      </span>
    )
  }
  if (tab === 'app') {
    return (
      <span className="absolute -top-[52px] flex size-[48px] items-center justify-center rounded-full bg-[linear-gradient(135deg,#3DA9FF_0%,#1E88F2_100%)] text-white shadow-[0_6px_16px_rgba(30,136,245,0.45)] ring-[3px] ring-white">
        <Box className="size-6" strokeWidth={2} aria-hidden="true" />
      </span>
    )
  }
  return (
    <span className="absolute -top-[52px] flex size-[48px] items-center justify-center rounded-full bg-[linear-gradient(135deg,#3DA9FF_0%,#1E88F2_100%)] text-white shadow-[0_6px_16px_rgba(30,136,245,0.45)] ring-[3px] ring-white">
      <ClipboardPlus className="size-6" strokeWidth={2} aria-hidden="true" />
    </span>
  )
}

export function BottomNav({ active = 'home' }: { active?: NavKey }) {
  const tabs = [
    { key: 'home' as const, label: '首页', href: '/' },
    { key: 'book' as const, label: '错题本', href: '/book', icon: '/images/home/nav-2.png' },
    { key: 'app' as const, label: '应用', href: '/apps', icon: '/images/home/nav-3.png' },
    { key: 'me' as const, label: '我的', href: '/me', icon: '/images/home/nav-4.png' },
  ]

  return (
    <nav aria-label="主导航" className="absolute inset-x-5 bottom-4 z-20">
      <ul className="flex h-[56px] items-end rounded-full bg-[#2E394F] pb-1.5">
        {tabs.map((tab) => {
          const isActive = tab.key === active
          return (
            <li key={tab.label} className="flex-1">
              <Link
                href={tab.href}
                aria-current={isActive ? 'page' : undefined}
                className={`relative flex flex-col items-center ${isActive ? '' : 'gap-0.5'}`}
              >
                {isActive ? (
                  <RaisedIcon tab={tab.key as NavKey} />
                ) : tab.icon ? (
                  <Image src={tab.icon} alt="" width={32} height={32} className="size-5" />
                ) : (
                  <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
                    <path
                      d="M10.2 2.7a3 3 0 0 1 3.6 0l6.4 4.8A3 3 0 0 1 21.4 10v7.5a4 4 0 0 1-4 4H6.6a4 4 0 0 1-4-4V10a3 3 0 0 1 1.2-2.4l6.4-4.9Z"
                      fill="#7F8AA3"
                    />
                    <path d="M8.8 14.6c1.8 1.6 4.6 1.6 6.4 0" fill="none" stroke="#2E394F" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                )}
                <span className={`text-[10px] ${isActive ? 'text-[#1E88F5]' : 'text-[#9AA3B8]'}`}>{tab.label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
