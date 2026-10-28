'use client'

import { X } from 'lucide-react'
import { useState } from 'react'
import {
  difficulties,
  questionTypes,
  resolveStatuses,
  type Difficulty,
  type QuestionType,
  type ResolveStatus,
} from '@/lib/organize-data'
import { cn } from '@/lib/utils'

export type Filters = {
  types: QuestionType[]
  statuses: ResolveStatus[]
  difficulties: Difficulty[]
}

export const emptyFilters: Filters = { types: [], statuses: [], difficulties: [] }

export function countFilters(f: Filters) {
  return f.types.length + f.statuses.length + f.difficulties.length
}

type Props = {
  value: Filters
  onApply: (next: Filters) => void
  onClose: () => void
}

function toggleItem<T>(list: T[], item: T) {
  return list.includes(item) ? list.filter((x) => x !== item) : [...list, item]
}

function OptionGroup<T extends string>({
  title,
  options,
  selected,
  onToggle,
}: {
  title: string
  options: readonly T[]
  selected: T[]
  onToggle: (item: T) => void
}) {
  return (
    <fieldset className="mt-5">
      <legend className="text-[14px] font-bold text-[#1F2937]">{title}</legend>
      <div className="mt-2.5 grid grid-cols-4 gap-2">
        {options.map((opt) => {
          const active = selected.includes(opt)
          return (
            <button
              key={opt}
              type="button"
              aria-pressed={active}
              onClick={() => onToggle(opt)}
              className={cn(
                'h-9 w-full whitespace-nowrap rounded-full px-1 text-[13px] font-medium ring-1 transition-colors',
                active
                  ? 'bg-[#EEF6FF] text-[#1677E0] ring-[#1E88F5]'
                  : 'bg-[#F5F7FB] text-[#4B5563] ring-transparent hover:bg-[#EEF1F7]',
              )}
            >
              {opt}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}

export function FilterSheet({ value, onApply, onClose }: Props) {
  const [draft, setDraft] = useState<Filters>(value)

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end">
      <button
        type="button"
        aria-label="关闭筛选"
        onClick={onClose}
        className="absolute inset-0 bg-[#0F172A]/40 animate-in fade-in duration-200"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="filter-title"
        className="relative rounded-t-[24px] bg-white px-5 pb-8 pt-4 shadow-[0_-10px_30px_rgba(30,40,90,0.15)] animate-in slide-in-from-bottom duration-300"
      >
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-[#E3E7EF]" aria-hidden="true" />
        <div className="flex items-center justify-between">
          <h2 id="filter-title" className="text-[16px] font-bold text-[#1F2937]">
            筛选
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="关闭"
            className="flex size-8 items-center justify-center rounded-full text-[#6B7280] hover:bg-[#F3F5FA]"
          >
            <X className="size-5" />
          </button>
        </div>

        <OptionGroup
          title="题目类型"
          options={questionTypes}
          selected={draft.types}
          onToggle={(t) => setDraft((d) => ({ ...d, types: toggleItem(d.types, t) }))}
        />
        <OptionGroup
          title="解决状态"
          options={resolveStatuses}
          selected={draft.statuses}
          onToggle={(s) => setDraft((d) => ({ ...d, statuses: toggleItem(d.statuses, s) }))}
        />
        <OptionGroup
          title="题目难度"
          options={difficulties}
          selected={draft.difficulties}
          onToggle={(x) => setDraft((d) => ({ ...d, difficulties: toggleItem(d.difficulties, x) }))}
        />

        <div className="mt-8 flex gap-3">
          <button
            type="button"
            onClick={() => setDraft(emptyFilters)}
            className="h-11 flex-1 rounded-full bg-[#F1F4F9] text-[14px] font-semibold text-[#4B5563] hover:bg-[#E8ECF3]"
          >
            重置
          </button>
          <button
            type="button"
            onClick={() => onApply(draft)}
            className="h-11 flex-[2] rounded-full bg-[linear-gradient(135deg,#3FA9FF,#1E88F5)] text-[14px] font-bold text-white shadow-[0_8px_20px_rgba(30,136,245,0.3)]"
          >
            确定
          </button>
        </div>
      </div>
    </div>
  )
}
