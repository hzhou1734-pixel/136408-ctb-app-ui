import Image from 'next/image'
import Link from 'next/link'
import { ClipboardPlus, House } from 'lucide-react'

type NavKey = 'home' | 'book'

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
    { key: 'app', label: '应用', href: '#', icon: '/images/home/nav-3.png' },
    { key: 'me', label: '我的', href: '#', icon: '/images/home/nav-4.png' },
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
                  <House className="size-5 text-[#9AA3B8]" strokeWidth={2} aria-hidden="true" />
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
