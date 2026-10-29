'use client'

import Image from 'next/image'
import { CalendarCheck, Check, X } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { classes, gradingSubjects } from '@/lib/grading-data'

export type GradingFilter = {
  className: string
  student: string | null
  subject: string | null
  startDate: string
  endDate: string
}

const PRIMARY = '#2196F3'

function CornerCheck() {
  return (
    <span
      aria-hidden="true"
      className="absolute bottom-0 right-0 flex size-[18px] items-end justify-end rounded-tl-[10px] bg-[#2196F3] pb-px pr-px text-white"
    >
      <Check className="size-3" strokeWidth={3} />
    </span>
  )
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      onClick={onClick}
      className={`relative h-11 min-w-[100px] overflow-hidden rounded-lg border px-6 text-[15px] text-[#333] transition-colors ${
        active ? 'border-[#2196F3] bg-[#F2F8FD]' : 'border-transparent bg-[#F6F7F9]'
      }`}
    >
      {children}
      {active && <CornerCheck />}
    </button>
  )
}

function Field({ label, children }: { label?: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      {label && <h3 className="text-[15px] font-bold text-[#222]">{label}</h3>}
      {children}
    </div>
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
      <span className={`text-[15px] ${value ? 'text-[#333]' : 'text-[#666]'}`}>{value || label}</span>
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

export function ClassFilterSheet({
  value,
  onClose,
  onConfirm,
}: {
  value: GradingFilter
  onClose: () => void
  onConfirm: (filter: GradingFilter) => void
}) {
  const [draft, setDraft] = useState(value)

  const reset = () =>
    setDraft({ className: classes[0], student: null, subject: null, startDate: '', endDate: '' })

  return (
    <div className="absolute inset-0 z-30 flex items-end">
      <button type="button" aria-label="关闭" onClick={onClose} className="absolute inset-0 bg-black/40" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="class-sheet-title"
        className="relative flex max-h-[88%] w-full flex-col rounded-t-2xl bg-white"
      >
        <div className="flex items-start justify-between px-5 pt-4">
          <h2 id="class-sheet-title" className="pt-1 text-[19px] font-normal text-[#222]">
            选择学生
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

        <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto px-5 pb-4 pt-5 [scrollbar-width:none]">
          <Field label="班级">
            <div role="radiogroup" aria-label="班级" className="flex flex-wrap gap-4">
              {classes.map((name) => (
                <Chip
                  key={name}
                  active={draft.className === name}
                  onClick={() => setDraft((d) => ({ ...d, className: name, student: null }))}
                >
                  {name}
                </Chip>
              ))}
            </div>
          </Field>

          <div className="flex flex-col gap-5">
            <div role="radiogroup" aria-label="学科" className="grid grid-cols-3 gap-5">
              {gradingSubjects.map((subject) => {
                const active = draft.subject === subject.name
                return (
                  <button
                    key={subject.name}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() =>
                      setDraft((d) => ({ ...d, subject: d.subject === subject.name ? null : subject.name }))
                    }
                    className={`relative aspect-[1.85/1] overflow-hidden rounded-lg border ${
                      active ? 'border-[#2196F3]' : 'border-transparent'
                    }`}
                  >
                    <Image src={subject.image} alt="" fill sizes="120px" className="object-cover" />
                    <span
                      className="absolute left-2 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-white/90 text-[14px] font-black"
                      style={{ color: subject.color }}
                    >
                      {subject.name}
                    </span>
                    {active && <CornerCheck />}
                  </button>
                )
              })}
            </div>
          </div>

          <Field label="提交日期">
            <div className="flex h-11 items-center gap-2 rounded border border-[#DCDFE6] px-2.5">
              <CalendarCheck className="size-5 shrink-0 text-[#B0B5BF]" strokeWidth={1.6} aria-hidden="true" />
              <DateSlot
                label="开始日期"
                value={draft.startDate}
                onChange={(startDate) => setDraft((d) => ({ ...d, startDate }))}
              />
              <span aria-hidden="true" className="text-[#666]">
                –
              </span>
              <DateSlot
                label="结束日期"
                value={draft.endDate}
                min={draft.startDate || undefined}
                onChange={(endDate) => setDraft((d) => ({ ...d, endDate }))}
              />
            </div>
          </Field>
        </div>

        <div className="flex gap-6 px-5 pb-8 pt-4">
          <button
            type="button"
            onClick={reset}
            className="h-12 flex-1 rounded-full border text-[17px]"
            style={{ borderColor: PRIMARY, color: PRIMARY }}
          >
            重置
          </button>
          <button
            type="button"
            onClick={() => onConfirm(draft)}
            className="h-12 flex-[2.1] rounded-full text-[17px] text-white"
            style={{ backgroundColor: PRIMARY }}
          >
            确认选择
          </button>
        </div>
      </div>
    </div>
  )
}
