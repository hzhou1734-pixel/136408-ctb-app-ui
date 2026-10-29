'use client'

import Image from 'next/image'
import { CalendarCheck, Check, X } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { classes, gradingSubjects, studentsByClass } from '@/lib/grading-data'

export type GradingFilter = {
  className: string
  student: string | null
  subject: string | null
  startDate: string
  endDate: string
}

function CornerCheck() {
  return (
    <span
      aria-hidden="true"
      className="absolute bottom-0 right-0 flex size-5 items-end justify-end rounded-tl-xl bg-[#1E88F5] pb-0.5 pr-0.5 text-white"
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
      className={`relative h-11 min-w-24 overflow-hidden rounded-xl border px-5 text-[15px] transition-colors ${
        active
          ? 'border-[#1E88F5] bg-[#EEF6FF] font-semibold text-[#1E88F5]'
          : 'border-transparent bg-[#F5F7FA] text-[#3A4256]'
      }`}
    >
      {children}
      {active && <CornerCheck />}
    </button>
  )
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-[15px] font-bold text-[#1F2937]">{label}</h3>
      {children}
    </div>
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
  const students = studentsByClass[draft.className] ?? []

  const reset = () =>
    setDraft({ className: classes[0], student: null, subject: null, startDate: '', endDate: '' })

  return (
    <div className="absolute inset-0 z-30 flex items-end">
      <button type="button" aria-label="关闭" onClick={onClose} className="absolute inset-0 bg-black/40" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="class-sheet-title"
        className="relative flex max-h-[88%] w-full flex-col rounded-t-3xl bg-white"
      >
        <div className="flex items-center justify-between px-5 pb-2 pt-5">
          <h2 id="class-sheet-title" className="text-[18px] font-bold text-[#1F2937]">
            选择学生
          </h2>
          <button
            type="button"
            aria-label="关闭"
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded-full text-[#8A93A6] hover:bg-[#F5F7FA]"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto px-5 pb-4 pt-2 [scrollbar-width:none]">
          <Field label="班级">
            <div role="radiogroup" aria-label="班级" className="flex flex-wrap gap-2.5">
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

          <Field label="姓名">
            <div role="radiogroup" aria-label="姓名" className="flex flex-wrap gap-2.5">
              {students.map((name) => (
                <Chip
                  key={name}
                  active={draft.student === name}
                  onClick={() => setDraft((d) => ({ ...d, student: d.student === name ? null : name }))}
                >
                  {name}
                </Chip>
              ))}
            </div>
          </Field>

          <Field label="学科">
            <div role="radiogroup" aria-label="学科" className="grid grid-cols-3 gap-2.5">
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
                    className={`relative aspect-[2/1] overflow-hidden rounded-xl border-2 transition-all ${
                      active ? 'border-[#1E88F5]' : 'border-transparent opacity-90'
                    }`}
                  >
                    <Image src={subject.image} alt="" fill sizes="120px" className="object-cover" />
                    <span
                      className="absolute left-2 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-white/90 text-[14px] font-black"
                      style={{ color: subject.color }}
                    >
                      {subject.name}
                    </span>
                    {active && <CornerCheck />}
                  </button>
                )
              })}
            </div>
          </Field>

          <Field label="提交日期">
            <div className="flex h-12 items-center gap-2 rounded-xl border border-[#E3E7EE] px-3">
              <CalendarCheck className="size-5 shrink-0 text-[#8A93A6]" aria-hidden="true" />
              <input
                type="date"
                aria-label="开始日期"
                value={draft.startDate}
                onChange={(e) => setDraft((d) => ({ ...d, startDate: e.target.value }))}
                className="min-w-0 flex-1 bg-transparent text-center text-[14px] text-[#3A4256] outline-none"
              />
              <span aria-hidden="true" className="text-[#8A93A6]">
                –
              </span>
              <input
                type="date"
                aria-label="结束日期"
                value={draft.endDate}
                min={draft.startDate || undefined}
                onChange={(e) => setDraft((d) => ({ ...d, endDate: e.target.value }))}
                className="min-w-0 flex-1 bg-transparent text-center text-[14px] text-[#3A4256] outline-none"
              />
            </div>
          </Field>
        </div>

        <div className="flex gap-3 px-5 pb-8 pt-3">
          <button
            type="button"
            onClick={reset}
            className="h-12 flex-1 rounded-full border border-[#1E88F5] text-[16px] font-semibold text-[#1E88F5]"
          >
            重置
          </button>
          <button
            type="button"
            onClick={() => onConfirm(draft)}
            className="h-12 flex-[2] rounded-full bg-[linear-gradient(135deg,#3DA9FF_0%,#1E88F2_100%)] text-[16px] font-semibold text-white shadow-[0_6px_16px_rgba(30,136,242,0.3)]"
          >
            确认选择
          </button>
        </div>
      </div>
    </div>
  )
}
