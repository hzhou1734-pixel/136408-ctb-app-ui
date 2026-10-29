'use client'

import { CalendarCheck, Check, X } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { classes } from '@/lib/grading-data'

export type StatsFilter = { className: string; startDate: string; endDate: string }

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      onClick={onClick}
      className={`relative h-11 min-w-[100px] overflow-hidden rounded-lg border px-5 text-[15px] transition-colors ${
        active ? 'border-[#2196F3] bg-[#F2F8FD] font-semibold text-[#2196F3]' : 'border-transparent bg-[#F6F7F9] text-[#333]'
      }`}
    >
      {children}
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
}

function DateSlot({
  label,
  value,
  min,
  onChange,
}: {
  label: string
  value: string
  min?: string
  onChange: (value: string) => void
}) {
  return (
    <label className="relative flex min-w-0 flex-1 cursor-pointer items-center justify-center">
      <span className={`text-[15px] ${value ? 'text-[#333]' : 'text-[#999]'}`}>{value || label}</span>
      <input
        type="date"
        aria-label={label}
        value={value}
        min={min}
        onChange={(e) => onChange(e.target.value)}
        onClick={(e) => e.currentTarget.showPicker?.()}
        className="absolute inset-0 cursor-pointer opacity-0"
      />
    </label>
  )
}

export function StatsFilterSheet({
  value,
  onClose,
  onConfirm,
}: {
  value: StatsFilter
  onClose: () => void
  onConfirm: (filter: StatsFilter) => void
}) {
  const [draft, setDraft] = useState(value)

  return (
    <div className="absolute inset-0 z-30 flex items-end">
      <button type="button" aria-label="关闭" onClick={onClose} className="absolute inset-0 bg-black/40" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="stats-sheet-title"
        className="relative flex max-h-[88%] w-full flex-col rounded-t-2xl bg-white"
      >
        <div className="flex items-center justify-between px-5 pt-4">
          <h2 id="stats-sheet-title" className="text-[18px] font-bold text-[#222]">
            筛选
          </h2>
          <button
            type="button"
            aria-label="关闭"
            onClick={onClose}
            className="-mr-1 flex size-8 items-center justify-center text-[#666]"
          >
            <X className="size-4" strokeWidth={1.8} />
          </button>
        </div>

        <div className="flex flex-col gap-6 overflow-y-auto px-5 pb-4 pt-5">
          <div className="flex flex-col gap-3">
            <h3 className="text-[15px] font-bold text-[#222]">班级</h3>
            <div role="radiogroup" aria-label="班级" className="flex flex-wrap gap-3">
              {classes.map((name) => (
                <Chip key={name} active={draft.className === name} onClick={() => setDraft((d) => ({ ...d, className: name }))}>
                  {name}
                </Chip>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-[15px] font-bold text-[#222]">自定义时间段</h3>
            <div className="flex h-11 items-center gap-2 rounded-lg border border-[#DCDFE6] px-2.5">
              <CalendarCheck className="size-5 shrink-0 text-[#B0B5BF]" strokeWidth={1.6} aria-hidden="true" />
              <DateSlot label="开始日期" value={draft.startDate} onChange={(startDate) => setDraft((d) => ({ ...d, startDate }))} />
              <span aria-hidden="true" className="text-[#999]">
                –
              </span>
              <DateSlot
                label="结束日期"
                value={draft.endDate}
                min={draft.startDate || undefined}
                onChange={(endDate) => setDraft((d) => ({ ...d, endDate }))}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4 px-5 pb-8 pt-4">
          <button
            type="button"
            onClick={() => setDraft({ className: classes[0], startDate: '', endDate: '' })}
            className="h-12 flex-1 rounded-full border border-[#2196F3] text-[17px] text-[#2196F3]"
          >
            重置
          </button>
          <button
            type="button"
            onClick={() => onConfirm(draft)}
            className="h-12 flex-[2.1] rounded-full bg-[linear-gradient(135deg,#3DA9FF_0%,#1E88F2_100%)] text-[17px] font-semibold text-white"
          >
            确认
          </button>
        </div>
      </div>
    </div>
  )
}
