'use client'

import { BookOpen, ChevronDown, ChevronLeft, SlidersHorizontal } from 'lucide-react'
import { useMemo, useState } from 'react'
import { buildGroups, students, subjects, type Student, type Subject } from '@/lib/organize-data'
import { cn } from '@/lib/utils'
import { QuestionCard } from './question-card'
import { SelectCircle } from './select-circle'

const classes = ['星辰班', '启明班', '晨曦班']

export function OrganizeScreen() {
  const [className, setClassName] = useState(classes[0])
  const [classOpen, setClassOpen] = useState(false)
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

      <div className="mt-1 flex min-h-0 flex-1 gap-2 px-4">
        <aside
          aria-label="班级与学生"
          className="relative flex w-[92px] shrink-0 flex-col self-start rounded-2xl bg-white p-1.5 shadow-[0_4px_14px_rgba(70,90,160,0.08)]"
        >
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={classOpen}
            onClick={() => setClassOpen((o) => !o)}
            className="flex h-10 w-full items-center justify-center gap-1 rounded-xl bg-[#EEF3FF] px-1.5 text-[13px] font-semibold text-[#2C5BDB]"
          >
            <BookOpen className="size-4 shrink-0" />
            <span className="truncate">{className}</span>
            <ChevronDown
              className={cn('size-3.5 shrink-0 transition-transform', classOpen && 'rotate-180')}
              strokeWidth={2.4}
            />
          </button>

          {classOpen && (
            <div aria-hidden="true" className="fixed inset-0 z-10" onClick={() => setClassOpen(false)} />
          )}
          {classOpen && (
            <ul
              role="listbox"
              aria-label="选择班级"
              className="absolute left-1.5 top-[52px] z-20 w-[140px] rounded-xl bg-white p-1 shadow-[0_10px_28px_rgba(40,60,130,0.18)]"
            >
              {classes.map((c) => (
                <li key={c}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={c === className}
                    onClick={() => {
                      setClassName(c)
                      setClassOpen(false)
                    }}
                    className={cn(
                      'flex h-9 w-full items-center rounded-lg px-3 text-[13px] font-semibold',
                      c === className ? 'bg-[#EEF3FF] text-[#2C5BDB]' : 'text-[#4B5563] hover:bg-[#F5F7FC]',
                    )}
                  >
                    {c}
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="mx-2 my-2 h-px bg-[#EEF1F7]" aria-hidden="true" />

          <nav aria-label="学生">
          <ul className="flex flex-col gap-0.5">
            {students.map((name) => {
              const active = name === student
              return (
                <li key={name}>
                  <button
                    type="button"
                    aria-current={active ? 'true' : undefined}
                    onClick={() => setStudent(name)}
                    className={cn(
                      'w-full truncate rounded-lg px-2 py-2 text-center text-[13px] font-semibold transition-colors',
                      active ? 'bg-[#F3F6FF] text-[#2C5BDB]' : 'text-[#6B7280] hover:bg-[#F7F8FC]',
                    )}
                  >
                    {name}
                  </button>
                </li>
              )
            })}
          </ul>
          </nav>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <div
            role="tablist"
            aria-label="科目"
            className="flex shrink-0 gap-1 overflow-x-auto rounded-2xl bg-white p-1.5 shadow-[0_4px_14px_rgba(70,90,160,0.08)] [scrollbar-width:none]"
          >
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
                    'h-9 shrink-0 rounded-xl px-3 text-[14px] font-semibold transition-colors',
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

        <div className="mt-3 min-h-0 flex-1 overflow-y-auto pb-28 [scrollbar-width:none]">
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
