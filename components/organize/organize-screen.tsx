'use client'

import { BookOpen, ChevronDown, ChevronLeft, SlidersHorizontal } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { buildGroups, students, subjects, type Student, type Subject } from '@/lib/organize-data'
import { cn } from '@/lib/utils'
import { Mask, StudentSheet, SuccessDialog } from '@/components/export/export-sheets'
import { countFilters, emptyFilters, FilterSheet, type Filters } from './filter-sheet'
import { QuestionCard } from './question-card'
import { SelectCircle } from './select-circle'

const classes = ['星辰班', '启明班', '晨曦班']

type AssignStep = 'none' | 'students' | 'done'
type PushMode = 'bank' | 'ai'

const pushLabels: Record<PushMode, string> = { bank: '题库推送', ai: 'AI推送' }

const previewSelection = () =>
  new Set(buildGroups(students[0], '数学')[0]?.questions.slice(0, 3).map((q) => q.id) ?? [])

export function OrganizeScreen({
  initialFilterOpen = false,
  initialAssignStep = 'none',
  variant = 'organize',
  initialPushMode = 'bank',
}: {
  initialFilterOpen?: boolean
  initialAssignStep?: AssignStep
  variant?: 'organize' | 'practice'
  initialPushMode?: PushMode
}) {
  const isPractice = variant === 'practice'
  const [pushMode, setPushMode] = useState<PushMode>(initialPushMode)
  const [className, setClassName] = useState(classes[0])
  const [classOpen, setClassOpen] = useState(false)
  const [subject, setSubject] = useState<Subject>('数学')
  const [student, setStudent] = useState<Student | null>(null)
  const [selected, setSelected] = useState<Set<string>>(() =>
    initialAssignStep === 'none' ? new Set() : previewSelection(),
  )
  const [assignStep, setAssignStep] = useState<AssignStep>(initialAssignStep)
  const [assignedStudents, setAssignedStudents] = useState(initialAssignStep === 'done' ? 3 : 0)
  const [deleted, setDeleted] = useState<Set<string>>(new Set())
  const [resolvedOverrides, setResolvedOverrides] = useState<Record<string, boolean>>({})

  const router = useRouter()
  const [filters, setFilters] = useState<Filters>(emptyFilters)
  const [filterOpen, setFilterOpen] = useState(initialFilterOpen)
  const filterCount = countFilters(filters)

  const toggleResolved = (id: string, current: boolean) =>
    setResolvedOverrides((prev) => ({ ...prev, [id]: !current }))

  const groups = useMemo(
    () =>
      buildGroups(student ?? students[0], subject)
        .map((g) => ({
          ...g,
          questions: g.questions.filter((q) => {
            if (deleted.has(q.id)) return false
            if (filters.types.length && !filters.types.includes(q.type)) return false
            if (filters.difficulties.length && !filters.difficulties.includes(q.difficulty)) return false
            if (filters.statuses.length) {
              const resolved = resolvedOverrides[q.id] ?? q.resolved
              if (!filters.statuses.includes(resolved ? '已掌握' : '待掌握')) return false
            }
            return true
          }),
        }))
        .filter((g) => g.questions.length > 0),
    [student, subject, deleted, filters, resolvedOverrides],
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

  const openExport = (push?: PushMode) => {
    const params = new URLSearchParams({
      student: student ?? students[0],
      subject,
      ids: [...selected].join(','),
    })
    if (push) params.set('sheet', push)
    router.push(`/export?${params}`)
  }

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
        <h1 className="text-[17px] font-bold text-[#1F2937]">{isPractice ? '举一反三' : '错题整理'}</h1>
        <button
          type="button"
          aria-haspopup="dialog"
          aria-expanded={filterOpen}
          onClick={() => setFilterOpen(true)}
          className="absolute right-4 flex items-center gap-1 text-[14px] font-semibold text-[#1E88F5]"
        >
          <SlidersHorizontal className="size-4" />
          筛选
          {filterCount > 0 && (
            <span className="ml-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#1E88F5] px-1 text-[10px] font-bold text-white">
              {filterCount}
            </span>
          )}
        </button>
      </header>

      <div className="mt-1 flex min-h-0 flex-1 gap-2 px-4 pb-6">
        <aside
          aria-label="班级与学生"
          className="relative flex w-[92px] shrink-0 flex-col self-stretch rounded-2xl bg-white p-1.5 shadow-[0_4px_14px_rgba(70,90,160,0.08)]"
        >
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={classOpen}
            aria-current={student === null ? 'true' : undefined}
            onClick={() => {
              setStudent(null)
              setClassOpen((o) => !o)
            }}
            className={cn(
              'flex h-10 w-full items-center justify-center gap-1 rounded-xl px-1.5 text-[13px] font-normal transition-colors',
              student === null ? 'bg-[#EEF7FF] text-[#1677E0]' : 'text-[#4B5563] hover:bg-[#F7F8FC]',
            )}
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
                      setStudent(null)
                      setClassOpen(false)
                    }}
                    className={cn(
                      'flex h-9 w-full items-center rounded-lg px-3 text-[13px] font-semibold',
                      c === className ? 'bg-[#EEF7FF] text-[#1677E0]' : 'text-[#4B5563] hover:bg-[#F5F7FC]',
                    )}
                  >
                    {c}
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="mx-2 my-2 h-px bg-[#EEF1F7]" aria-hidden="true" />

          <nav aria-label="学生" className="min-h-0 flex-1 overflow-y-auto [scrollbar-width:none]">
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
                      active ? 'bg-[#F3F6FF] text-[#1677E0]' : 'text-[#1F2937] hover:bg-[#F7F8FC]',
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

        <div className="relative flex min-w-0 flex-1 flex-col">
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
                      ? 'bg-[linear-gradient(135deg,#3FA9FF,#1E88F5)] text-white shadow-[0_4px_10px_rgba(30,136,245,0.3)]'
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
            <p className="mt-16 text-center text-[13px] text-[#9AA3B2]">
              {filterCount > 0 ? '没有符合筛选条件的错题' : '暂无错题'}
            </p>
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
                                    </button>
                  <ul className="mt-1.5 flex flex-col gap-3">
                    {group.questions.map((q) => {
                      const resolved = resolvedOverrides[q.id] ?? q.resolved
                      return (
                        <QuestionCard
                          key={q.id}
                          question={q}
                          selected={selected.has(q.id)}
                          onToggle={() => toggle(q.id)}
                          onDelete={() => remove(q.id)}
                          resolved={student ? resolved : undefined}
                          onToggleResolved={student ? () => toggleResolved(q.id, resolved) : undefined}
                        />
                      )
                    })}
                  </ul>
                </section>
              )
            })
          )}
        </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 flex items-center gap-2 bg-[linear-gradient(180deg,rgba(239,241,253,0)_0%,#EFF1FD_50%)] pt-10">
            {isPractice ? (
              <>
                <button
                  type="button"
                  disabled={count === 0}
                  onClick={() => openExport('bank')}
                  className="pointer-events-auto h-11 min-w-0 flex-1 whitespace-nowrap rounded-full border border-[#1E88F5] bg-white px-1 text-[13px] tracking-tight font-bold text-[#1E88F5] transition-opacity disabled:opacity-50"
                >
                  题库推送（已选 {count}）
                </button>
                <button
                  type="button"
                  disabled={count === 0}
                  onClick={() => openExport('ai')}
                  className="pointer-events-auto h-11 min-w-0 flex-1 whitespace-nowrap rounded-full bg-[linear-gradient(135deg,#3FA9FF,#1E88F5)] px-1 text-[13px] tracking-tight font-bold text-white shadow-[0_8px_20px_rgba(30,136,245,0.3)] transition-opacity disabled:opacity-50 disabled:shadow-none"
                >
                  AI推送（已选 {count}）
                </button>
              </>
            ) : (
            <>
            <button
              type="button"
              disabled={count === 0}
              onClick={() => setAssignStep('students')}
              className="pointer-events-auto h-11 shrink-0 rounded-full border border-[#1E88F5] bg-white px-3.5 text-[14px] font-bold text-[#1E88F5] transition-opacity disabled:opacity-50"
            >
              导出给学生
            </button>
            <button
              type="button"
              disabled={count === 0}
              onClick={() => openExport()}
              className="pointer-events-auto h-11 min-w-0 flex-1 truncate rounded-full bg-[linear-gradient(135deg,#3FA9FF,#1E88F5)] px-4 text-[14px] font-bold text-white shadow-[0_8px_20px_rgba(30,136,245,0.3)] transition-opacity disabled:opacity-50 disabled:shadow-none"
            >
              导出错题本（已选 {count}）
            </button>
            </>
            )}
          </div>
        </div>
      </div>

      {filterOpen && (
        <FilterSheet
          value={filters}
          onClose={() => setFilterOpen(false)}
          onApply={(next) => {
            setFilters(next)
            setFilterOpen(false)
          }}
        />
      )}

      {assignStep === 'students' && (
        <>
          <Mask onClick={() => setAssignStep('none')} />
          <StudentSheet
            title={isPractice ? `选择学生，${pushLabels[pushMode]}举一反三` : '选择学生，导出到错题库'}
            subtitle={
              isPractice
                ? pushMode === 'ai'
                  ? `将基于已选 ${count} 道题目由 AI 生成同类题，推送给所选学生`
                  : `将从题库匹配已选 ${count} 道题目的同类题，推送给所选学生`
                : `已选 ${count} 道题目，将加入所选学生的错题库`
            }
            initial={[]}
            onConfirm={(names) => {
              setAssignedStudents(names.length)
              setAssignStep('done')
            }}
          />
        </>
      )}
      {assignStep === 'done' && (
        <>
          <Mask onClick={() => setAssignStep('none')} />
          <SuccessDialog
            count={assignedStudents}
            onBack={() => {
              setAssignStep('none')
              setSelected(new Set())
            }}
            title={isPractice ? '推送成功' : undefined}
            message={
              isPractice ? (
                <>
                  {`已通过${pushLabels[pushMode]}将 `}
                  <span className="font-bold text-[#1E88F5]">{count}</span>
                  {' 道题目的举一反三练习推送给 '}
                  <span className="font-bold text-[#1E88F5]">{assignedStudents}</span>
                  {' 位同学！'}
                </>
              ) : (
              <>
                {'已将 '}
                <span className="font-bold text-[#1E88F5]">{count}</span>
                {' 道题目导出到 '}
                <span className="font-bold text-[#1E88F5]">{assignedStudents}</span>
                {' 位同学的错题库！'}
              </>
              )
            }
          />
        </>
      )}
    </div>
  )
}
