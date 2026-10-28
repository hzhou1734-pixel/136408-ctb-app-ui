'use client'

import { ChevronLeft } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { CrossPageCapture } from './cross-page-capture'
import { WholePageCapture } from './whole-page-capture'

type Mode = 'whole' | 'cross'

const modes: { value: Mode; label: string }[] = [
  { value: 'whole', label: '整页拍题' },
  { value: 'cross', label: '跨页拍题' },
]

export function CaptureScreen() {
  const [mode, setMode] = useState<Mode>('whole')

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <header className="relative flex h-12 items-center justify-center px-4">
        <a
          href="/"
          aria-label="返回首页"
          className="absolute left-3 flex size-9 items-center justify-center rounded-full text-[#1F2937] transition-colors hover:bg-white/60"
        >
          <ChevronLeft className="size-6" strokeWidth={2.2} />
        </a>
        <h1 className="text-[17px] font-bold text-[#1F2937]">错题拍收</h1>
      </header>

      <div role="tablist" aria-label="拍题方式" className="mx-auto mt-2 flex rounded-full bg-white p-1 shadow-[0_4px_14px_rgba(70,90,160,0.08)]">
        {modes.map(({ value, label }) => {
          const active = mode === value
          return (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setMode(value)}
              className={cn(
                'h-9 w-28 rounded-full text-[14px] font-semibold transition-colors',
                active
                  ? 'bg-[linear-gradient(135deg,#3B8BFF,#6B6BFF)] text-white shadow-[0_4px_10px_rgba(59,107,255,0.3)]'
                  : 'text-[#6B7280] hover:text-[#1F2937]',
              )}
            >
              {label}
            </button>
          )
        })}
      </div>

      {mode === 'whole' ? <WholePageCapture /> : <CrossPageCapture />}
    </div>
  )
}
