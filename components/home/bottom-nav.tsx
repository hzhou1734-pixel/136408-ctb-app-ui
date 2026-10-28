'use client'

import { useState } from 'react'
import { Home, LayoutGrid, NotebookText, UserRound } from 'lucide-react'
import { cn } from '@/lib/utils'

const tabs = [
  { label: '首页', icon: Home },
  { label: '错题本', icon: NotebookText },
  { label: '应用', icon: LayoutGrid },
  { label: '我的', icon: UserRound },
]

export function BottomNav() {
  const [active, setActive] = useState(0)

  return (
    <nav aria-label="主导航" className="absolute inset-x-5 bottom-6 z-20">
      <ul className="flex h-[64px] items-end rounded-full bg-[#2B3448] px-2 pb-2 shadow-[0_12px_28px_rgba(30,42,90,0.35)]">
        {tabs.map(({ label, icon: Icon }, i) => {
          const isActive = i === active
          return (
            <li key={label} className="flex-1">
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-current={isActive ? 'page' : undefined}
                className="relative flex w-full flex-col items-center gap-1"
              >
                {isActive ? (
                  <span className="absolute -top-10 flex size-14 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-[#4AA3FF] to-[#2F7CFF] shadow-[0_6px_14px_rgba(47,124,255,0.45)]">
                    <Icon className="size-6 text-white" strokeWidth={2.4} aria-hidden="true" />
                  </span>
                ) : (
                  <Icon className="size-6 text-[#8E98B0]" strokeWidth={2.2} aria-hidden="true" />
                )}
                <span className={cn('text-[12px]', isActive ? 'mt-7 font-semibold text-[#4AA3FF]' : 'text-[#B7BFD2]')}>
                  {label}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
