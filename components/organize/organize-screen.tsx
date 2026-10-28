'use client'

import { BookOpen, ChevronLeft, SlidersHorizontal, UserRound } from 'lucide-react'
import { useMemo, useState } from 'react'
import { buildGroups, students, subjects, type Student, type Subject } from '@/lib/organize-data'
import { cn } from '@/lib/utils'
import { QuestionCard } from './question-card'
import { SelectCircle } from './select-circle'

export function OrganizeScreen() {
  const [subject, setSubject] = useState<Subject>('数学')
  const [student, setStudent] = useState<Student>('曹小明')
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [deleted, setDeleted] = useState<Set<string>>(new Set())

  const groups = useMemo(
    () =>
      buildGroups(student, subject)
        .map((g) => ({ ...g, questions: g.questions.filter((q) => !deleted.has(q.id)) }))
        .filter((g) => g.questions.length > 0),
    [student, subject, deleted],
  )

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  const toggleGroup = (ids: string[], allSelected: boolean) =>
    setSelected((prev) => {
      const next = new Set(prev)
      for (const id of ids) {
        if (allSelected) next.delete(id)
        else next.add(id)
      }
      return next
    })

  const remove = (id: string) => {
    setDeleted((prev) => new Set(prev).add(id))
    setSelected((prev) => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }

  const count = selected.size

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
        <h1 className="text-[17px] font-bold text-[#1F2937]">错题整理</h1>
        <button
          type="button"
          className="absolute right-4 flex items-center gap-1 text-[14px] font-semibold text-[#3B7BFF]"
        >
          <SlidersHorizontal className="size-4" />
          筛选
        </button>
      </header>

      <div className="mx-4 mt-1 flex shrink-0 items-center gap-2 rounded-2xl bg-white p-1.5 shadow-[0_4px_14px_rgba(70,90,160,0.08)]">
        <span className="flex shrink-0 items-center gap-1.5 rounded-xl bg-[#EEF3FF] px-2.5 py-2 text-[13px] font-semibold text-[#2C5BDB]">
          <BookOpen className="size-4" />
          星辰班
        </span>
        <div role="tablist" aria-label="科目" className="flex min-w-0 flex-1 gap-1 overflow-x-auto [scrollbar-width:none]">
          {subjects.map((s) => {
            const active = s === subject
            return (
              <button
                key={s}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSubject(s)}
                className={cn(
                  'h-9 shrink-0 rounded-xl px-3.5 text-[14px] font-semibold transition-colors',
                  active
                    ? 'bg-[linear-gradient(135deg,#3B8BFF,#6B6BFF)] text-white shadow-[0_4px_10px_rgba(59,107,255,0.3)]'
                    : 'text-[#6B7280] hover:text-[#1F2937]',
                )}
              >
                {s}
              </button>
            )
          })}
        </div>
      </div>

      <div className="mt-3 flex min-h-0 flex-1">
        <nav aria-label="学生" className="w-[84px] shrink-0 overflow-y-auto pl-4 [scrollbar-width:none]">
          <ul className="flex flex-col gap-2">
            {students.map((name) => {
              const active = name === student
              return (
                <li key={name}>
                  <button
                    type="button"
                    aria-current={active ? 'true' : undefined}
                    onClick={() => setStudent(name)}
                    className={cn(
                      'flex w-full flex-col items-center gap-1 rounded-xl py-2.5 text-[12px] font-semibold transition-colors',
                      active
                        ? 'bg-white text-[#2C5BDB] shadow-[0_4px_12px_rgba(70,90,160,0.1)]'
                        : 'text-[#6B7280] hover:bg-white/60',
                    )}
                  >
                    <span
                      className={cn(
                        'flex size-8 items-center justify-center rounded-full',
                        active ? 'bg-[#EEF3FF] text-[#3B7BFF]' : 'bg-white/70 text-[#9AA3B2]',
                      )}
                    >
                      <UserRound className="size-4" />
                    </span>
                    {name}
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="min-w-0 flex-1 overflow-y-auto pb-28 pl-2 pr-4 [scrollbar-width:none]">
          {groups.length === 0 ? (
            <p className="mt-16 text-center text-[13px] text-[#9AA3B2]">暂无错题</p>
          ) : (
            groups.map((group) => {
              const ids = group.questions.map((q) => q.id)
              const picked = ids.filter((id) => selected.has(id)).length
              const allSelected = picked === ids.length
              return (
                <section key={group.date} aria-label={group.date} className="mb-4">
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={allSelected ? true : picked > 0 ? 'mixed' : false}
                    onClick={() => toggleGroup(ids, allSelected)}
                    className="flex h-8 items-center gap-2.5 pl-[5px]"
                  >
                    <SelectCircle checked={allSelected} partial={picked > 0} />
                    <span className="text-[14px] font-bold text-[#1F2937]">{group.date}</span>
                    <span className="text-[12px] text-[#9AA3B2]">{ids.length} 题</span>
                  </button>
                  <ul className="mt-1.5 flex flex-col gap-3">
                    {group.questions.map((q) => (
                      <QuestionCard
                        key={q.id}
                        question={q}
                        selected={selected.has(q.id)}
                        onToggle={() => toggle(q.id)}
                        onDelete={() => remove(q.id)}
                      />
                    ))}
                  </ul>
                </section>
              )
            })
          )}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center bg-[linear-gradient(180deg,rgba(239,241,253,0)_0%,#EFF1FD_45%)] pb-8 pt-10">
        <button
          type="button"
          disabled={count === 0}
          className="pointer-events-auto h-12 w-60 rounded-full bg-[linear-gradient(135deg,#3B8BFF,#6B6BFF)] text-[15px] font-bold text-white shadow-[0_8px_20px_rgba(59,107,255,0.3)] transition-opacity disabled:opacity-50 disabled:shadow-none"
        >
          导出错题本（已选 {count}）
        </button>
      </div>
    </div>
  )
}
