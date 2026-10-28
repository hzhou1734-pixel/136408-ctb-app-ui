'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Camera, FileText, House, NotebookPen } from 'lucide-react'

const pages = [
  { href: '/', label: '首页', icon: House },
  { href: '/capture', label: '错题拍收', icon: Camera },
  { href: '/organize', label: '错题整理', icon: NotebookPen },
  { href: '/export', label: '设置及排版', icon: FileText },
]

export function PageSwitcher() {
  const pathname = usePathname()

  return (
    <nav
      aria-label="页面切换"
      className="fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-1 rounded-3xl bg-white/90 p-2 shadow-[0_8px_30px_rgba(30,36,51,0.08)] ring-1 ring-[#1E2433]/5 backdrop-blur lg:flex"
    >
      <p className="px-3 pb-1 pt-2 text-xs font-medium text-[#8A93A6]">页面</p>
      {pages.map(({ href, label, icon: Icon }, index) => {
        const active = pathname === href
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? 'page' : undefined}
            className={`flex items-center gap-2.5 rounded-2xl px-3 py-2.5 text-sm font-medium transition-colors ${
              active
                ? 'bg-[linear-gradient(135deg,#3DA9FF_0%,#1E88F2_100%)] text-white shadow-[0_6px_16px_rgba(30,136,242,0.3)]'
                : 'text-[#3A4256] hover:bg-[#EEF4FF] hover:text-[#1E88F2]'
            }`}
          >
            <span
              className={`flex size-5 items-center justify-center rounded-full text-[11px] font-semibold ${
                active ? 'bg-white/25 text-white' : 'bg-[#EEF1F6] text-[#8A93A6]'
              }`}
            >
              {index + 1}
            </span>
            <Icon className="size-4" aria-hidden="true" />
            <span className="whitespace-nowrap">{label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
