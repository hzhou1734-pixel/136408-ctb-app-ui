'use client'

import { Check, X } from 'lucide-react'
import { useState } from 'react'

export function EssayClassSheet({
  options,
  value,
  onClose,
  onConfirm,
}: {
  options: string[]
  value: string
  onClose: () => void
  onConfirm: (className: string) => void
}) {
  const [draft, setDraft] = useState(value)

  return (
    <div className="absolute inset-0 z-30 flex items-end">
      <button type="button" aria-label="关闭" onClick={onClose} className="absolute inset-0 bg-black/40" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="essay-class-sheet-title"
        className="relative flex w-full flex-col rounded-t-2xl bg-white animate-in slide-in-from-bottom duration-200"
      >
        <div className="flex items-start justify-between px-5 pt-4">
          <h2 id="essay-class-sheet-title" className="pt-1 text-[19px] font-normal text-[#222]">
            切换班级
          </h2>
          <button
            type="button"
            aria-label="关闭"
            onClick={onClose}
            className="-mr-1 flex size-7 items-center justify-center text-[#666]"
          >
            <X className="size-3.5" strokeWidth={1.8} />
          </button>
        </div>

        <div role="radiogroup" aria-label="班级" className="flex flex-wrap gap-3 px-5 pb-6 pt-5">
          {options.map((option) => {
            const active = draft === option
            return (
              <button
                key={option}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setDraft(option)}
                className={`relative h-11 min-w-[100px] overflow-hidden rounded-lg border px-6 text-[15px] transition-colors ${
                  active
                    ? 'border-[#2196F3] bg-[#F2F8FD] font-medium text-[#1E88F5]'
                    : 'border-transparent bg-[#F6F7F9] text-[#333]'
                }`}
              >
                {option}
                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 right-0 flex size-[18px] items-end justify-end rounded-tl-[10px] bg-[#2196F3] pb-px pr-px text-white"
                  >
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                )}
              </button>
            )
          })}
        </div>

        <div className="flex gap-4 px-5 pb-8">
          <button
            type="button"
            onClick={onClose}
            className="h-12 w-[32%] rounded-full border border-[#2196F3] text-[16px] font-medium text-[#2196F3]"
          >
            取消
          </button>
          <button
            type="button"
            onClick={() => onConfirm(draft)}
            className="h-12 flex-1 rounded-full bg-[#2196F3] text-[16px] font-medium text-white"
          >
            确认
          </button>
        </div>
      </div>
    </div>
  )
}
