'use client'

import { Check, ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { useState } from 'react'
import { classes, gradingRecords, groupByDate } from '@/lib/grading-data'

const groups = groupByDate(gradingRecords)

export function GradingListScreen({ initialClassOpen = false }: { initialClassOpen?: boolean }) {
  const [classOpen, setClassOpen] = useState(initialClassOpen)
  const [currentClass, setCurrentClass] = useState(classes[0])

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <header className="relative flex h-12 shrink-0 items-center justify-center px-4">
        <a
          href="/"
          aria-label="返回首页"
          className="absolute left-3 flex size-9 items-center justify-center rounded-full text-[#1F2937] transition-colors hover:bg-white/60"
        >
          <ChevronLeft className="size-6" strokeWidth={2.2} />
        </a>
        <h1 className="text-[17px] font-bold text-[#1F2937]">批改列表</h1>
        <button
          type="button"
          aria-haspopup="dialog"
          aria-expanded={classOpen}
          onClick={() => setClassOpen(true)}
          className="absolute right-4 text-[14px] font-semibold text-[#1E88F5]"
        >
          切换班级
        </button>
      </header>

      <p className="px-5 pt-1 text-[12px] text-[#8A93A6]">
        当前班级：<span className="font-medium text-[#3A4256]">{currentClass}</span>
      </p>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-28 [scrollbar-width:none]">
        {groups.map((group) => (
          <section key={group.date} aria-labelledby={`date-${group.date}`}>
            <h2 id={`date-${group.date}`} className="px-1 pb-2.5 pt-4 text-[14px] font-medium text-[#5B6478]">
              {group.date}
            </h2>
            <ul className="flex flex-col gap-2.5">
              {group.items.map((record) => (
                <li key={record.id}>
                  <a
                    href="#"
                    className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3.5 shadow-[0_4px_14px_rgba(30,64,140,0.05)] transition-colors hover:bg-[#F8FAFF]"
                  >
                    <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                      <div className="flex items-center gap-2">
                        <span className="truncate text-[16px] font-medium text-[#1F2937]">
                          {record.subject}-{record.student}-{record.date.replaceAll('-', '')}
                        </span>
                        <span className="shrink-0 rounded-md bg-[#FFF4E0] px-2 py-0.5 text-[12px] font-medium text-[#C98A1B]">
                          已批改
                        </span>
                      </div>
                      <p className="flex items-center gap-2.5 text-[13px] text-[#8A93A6]">
                        <span>{record.subject}</span>
                        <span aria-hidden="true" className="h-3 w-px bg-[#D5DAE3]" />
                        <span>{record.pages}张</span>
                      </p>
                    </div>
                    <ChevronRight className="size-5 shrink-0 text-[#B4BBC8]" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <a
        href="/capture"
        aria-label="新建批改"
        className="absolute bottom-8 right-5 flex size-14 items-center justify-center rounded-full bg-[linear-gradient(135deg,#3DA9FF_0%,#1E88F2_100%)] text-white shadow-[0_8px_20px_rgba(30,136,242,0.35)] transition-transform active:scale-95"
      >
        <Plus className="size-7" strokeWidth={2.4} />
      </a>

      {classOpen && (
        <div className="absolute inset-0 z-30 flex items-end">
          <button
            type="button"
            aria-label="关闭"
            onClick={() => setClassOpen(false)}
            className="absolute inset-0 bg-black/40"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="class-sheet-title"
            className="relative w-full rounded-t-3xl bg-white px-5 pb-8 pt-5"
          >
            <h2 id="class-sheet-title" className="text-center text-[17px] font-bold text-[#1F2937]">
              切换班级
            </h2>
            <ul role="radiogroup" aria-label="班级" className="mt-4 flex flex-col">
              {classes.map((name) => {
                const active = name === currentClass
                return (
                  <li key={name}>
                    <button
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => {
                        setCurrentClass(name)
                        setClassOpen(false)
                      }}
                      className={`flex h-12 w-full items-center justify-between border-b border-[#F0F2F6] px-1 text-[15px] ${
                        active ? 'font-semibold text-[#1E88F5]' : 'text-[#3A4256]'
                      }`}
                    >
                      {name}
                      {active && <Check className="size-5" aria-hidden="true" />}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
