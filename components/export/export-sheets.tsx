'use client'

import { Check, User, X } from 'lucide-react'
import { useState } from 'react'
import { students } from '@/lib/organize-data'
import { cn } from '@/lib/utils'

export function Mask({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label="关闭弹窗"
      onClick={onClick}
      className="absolute inset-x-0 bottom-0 top-12 z-40 animate-in fade-in bg-black/45 duration-200"
    />
  )
}

function Sheet({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section
      role="dialog"
      aria-modal="true"
      aria-label={label}
      className="absolute inset-x-0 bottom-0 z-50 animate-in slide-in-from-bottom rounded-t-3xl bg-white px-5 pb-6 pt-5 shadow-[0_-8px_24px_rgba(15,23,42,0.12)] duration-300"
    >
      {children}
    </section>
  )
}

export function StudentSheet({
  initial,
  onConfirm,
}: {
  initial: string[]
  onConfirm: (selected: string[]) => void
}) {
  const [selected, setSelected] = useState<string[]>(initial)
  const toggle = (name: string) =>
    setSelected((prev) => (prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]))

  return (
    <Sheet label="选择学生，导出错题本">
      <h2 className="text-center text-[16px] font-bold text-[#1F2937]">选择学生，导出错题本</h2>
      <div className="mt-4 grid max-h-[260px] grid-cols-3 gap-2.5 overflow-y-auto [scrollbar-width:none]">
        {students.map((name) => {
          const active = selected.includes(name)
          return (
            <button
              key={name}
              type="button"
              aria-pressed={active}
              onClick={() => toggle(name)}
              className={cn(
                'relative flex h-10 items-center justify-center gap-1.5 overflow-hidden rounded-xl border text-[13px] font-medium transition-colors',
                active
                  ? 'border-[#1E88F5] bg-[#EAF4FF] text-[#1E88F5]'
                  : 'border-[#E3E7EF] bg-[#F7F8FC] text-[#374151] hover:border-[#C9D6EA]',
              )}
            >
              <User className="size-4" strokeWidth={2} aria-hidden="true" />
              {name}
              {active && (
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 right-0 flex size-4 items-center justify-center rounded-tl-lg bg-[#1E88F5]"
                >
                  <Check className="size-2.5 text-white" strokeWidth={3} />
                </span>
              )}
            </button>
          )
        })}
      </div>
      <button
        type="button"
        disabled={selected.length === 0}
        onClick={() => onConfirm(selected)}
        className="mt-5 h-12 w-full rounded-full bg-[linear-gradient(135deg,#3FA9FF,#1E88F5)] text-[15px] font-bold text-white shadow-[0_8px_20px_rgba(30,136,245,0.3)] transition-opacity disabled:opacity-50 disabled:shadow-none"
      >
        {'确认导出（'}
        {selected.length}
        {'人）'}
      </button>
    </Sheet>
  )
}

export function FileNameSheet({
  defaultName,
  onClose,
  onConfirm,
}: {
  defaultName: string
  onClose: () => void
  onConfirm: (name: string) => void
}) {
  const [name, setName] = useState(defaultName)

  return (
    <Sheet label="导出PDF">
      <div className="flex items-center justify-between">
        <h2 className="text-[17px] font-bold text-[#1F2937]">导出PDF</h2>
        <button
          type="button"
          aria-label="关闭"
          onClick={onClose}
          className="flex size-8 items-center justify-center rounded-full text-[#9AA3B2] hover:bg-[#F3F5F9]"
        >
          <X className="size-5" />
        </button>
      </div>
      <label htmlFor="pdf-file-name" className="mt-5 block text-[14px] text-[#374151]">
        文件名
      </label>
      <input
        id="pdf-file-name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mt-2.5 h-11 w-full rounded-xl border border-[#E3E7EF] bg-white px-3.5 text-[14px] text-[#1F2937] outline-none transition-colors focus:border-[#1E88F5] focus:ring-2 focus:ring-[#1E88F5]/15"
      />
      <button
        type="button"
        disabled={name.trim().length === 0}
        onClick={() => onConfirm(name.trim())}
        className="mt-8 h-12 w-full rounded-full bg-[linear-gradient(135deg,#3FA9FF,#1E88F5)] text-[15px] font-bold text-white shadow-[0_8px_20px_rgba(30,136,245,0.3)] transition-opacity disabled:opacity-50 disabled:shadow-none"
      >
        确定
      </button>
    </Sheet>
  )
}
