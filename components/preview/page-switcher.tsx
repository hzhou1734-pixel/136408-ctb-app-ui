'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const pages = [
  { label: '首页', description: '老师工具箱与功能入口', href: '/' },
  { label: '错题拍收', description: '整页拍题 / 跨页拍题', href: '/capture' },
  { label: '错题整理', description: '按班级、科目、学生整理', href: '/organize' },
]

export function PageSwitcher() {
  const pathname = usePathname()

  return (
    <nav aria-label="页面预览切换" className="hidden w-64 flex-col gap-4 lg:flex">
      <div className="flex flex-col gap-1">
        <p className="text-xs font-medium tracking-wider text-[#8A93A8]">PAGES</p>
        <h2 className="text-lg font-semibold text-[#1E2433]">页面预览</h2>
      </div>
      <ul className="flex flex-col gap-2">
        {pages.map(({ label, description, href }, index) => {
          const active = pathname === href
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'flex items-center gap-3 rounded-2xl border px-4 py-3 transition-colors',
                  active
                    ? 'border-[#1E88F5] bg-[#1E88F5] text-[#FFFFFF] shadow-lg shadow-[#1E88F5]/25'
                    : 'border-[#DCE2EE] bg-[#FFFFFF] text-[#1E2433] hover:border-[#1E88F5]/50',
                )}
              >
                <span
                  className={cn(
                    'flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold',
                    active ? 'bg-[#FFFFFF]/20' : 'bg-[#EEF3FC] text-[#1E88F5]',
                  )}
                >
                  {index + 1}
                </span>
                <span className="flex flex-col">
                  <span className="text-sm font-semibold">{label}</span>
                  <span className={cn('text-xs', active ? 'text-[#FFFFFF]/80' : 'text-[#8A93A8]')}>{description}</span>
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
