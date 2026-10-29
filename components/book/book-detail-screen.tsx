'use client'

import { ChevronLeft, CircleCheck } from 'lucide-react'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { cn } from '@/lib/utils'
import { bookTitle, getBook, getQuestions, typeMeta } from './book-data'

type Filter = 'all' | 'todo' | 'done'

const filters: { key: Filter; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'todo', label: '未掌握' },
  { key: 'done', label: '已掌握' },
]

export function BookDetailScreen({ id }: { id: string }) {
  const book = getBook(id)
  const questions = useMemo(() => (book ? getQuestions(book) : []), [book])
  const [mastered, setMastered] = useState<Set<string>>(() => new Set())
  const [filter, setFilter] = useState<Filter>('all')

  if (!book) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 text-[14px] text-[#8A93A6]">
        未找到该错题本
        <Link href="/book" className="text-[#1E88F5]">返回错题本</Link>
      </div>
    )
  }

  const meta = typeMeta[book.type]
  const doneCount = mastered.size
  const allDone = doneCount === questions.length
  const visible = questions.filter((q) =>
    filter === 'all' ? true : filter === 'done' ? mastered.has(q.id) : !mastered.has(q.id),
  )
  const counts: Record<Filter, number> = {
    all: questions.length,
    todo: questions.length - doneCount,
    done: doneCount,
  }

  function toggle(questionId: string) {
    setMastered((prev) => {
      const next = new Set(prev)
      if (next.has(questionId)) next.delete(questionId)
      else next.add(questionId)
      return next
    })
  }

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <header className="relative flex h-11 shrink-0 items-center justify-center px-12">
        <Link
          href="/book"
          aria-label="返回错题本"
          className="absolute left-2 flex size-9 items-center justify-center rounded-full text-[#1F2937] hover:bg-white/60"
        >
          <ChevronLeft className="size-6" strokeWidth={2} aria-hidden="true" />
        </Link>
        <h1 className="text-[17px] font-bold text-[#1F2937]">错题详情</h1>
      </header>

      <section className="mx-4 mt-1.5 flex flex-col gap-3 rounded-2xl bg-white p-3.5 shadow-[0_4px_14px_rgba(30,64,140,0.05)]">
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className={cn(
              'relative flex size-10 shrink-0 flex-col items-center justify-center overflow-hidden rounded-[10px] text-[11px] font-medium leading-[13px] text-white',
              meta.className,
            )}
          >
            {meta.badge.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </span>
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <h2 className="truncate text-[14px] font-bold text-[#1F2937]">{bookTitle(book)}</h2>
            <p className="text-[11px] text-[#A0A8B8]">{book.time}</p>
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-[12px]">
            <span className="text-[#5B6478]">掌握进度</span>
            <span className={cn('font-semibold tabular-nums', allDone ? 'text-[#16A34A]' : 'text-[#1E88F5]')}>
              {allDone ? '已全部掌握' : `已掌握 ${doneCount}/${questions.length}`}
            </span>
          </div>
          <div
            role="progressbar"
            aria-label="掌握进度"
            aria-valuemin={0}
            aria-valuemax={questions.length}
            aria-valuenow={doneCount}
            className="h-1.5 overflow-hidden rounded-full bg-[#EEF2F8]"
          >
            <div
              className={cn('h-full rounded-full transition-[width] duration-300', allDone ? 'bg-[#22C55E]' : 'bg-[#1E88F5]')}
              style={{ width: `${(doneCount / questions.length) * 100}%` }}
            />
          </div>
        </div>
      </section>

      <div role="tablist" aria-label="掌握状态" className="flex shrink-0 gap-2 px-4 pb-2.5 pt-3.5">
        {filters.map((item) => {
          const active = item.key === filter
          return (
            <button
              key={item.key}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(item.key)}
              className={cn(
                'h-8 rounded-full px-3.5 text-[13px] tabular-nums transition-colors',
                active ? 'bg-[#1E88F5] font-semibold text-white' : 'bg-white text-[#5B6478] hover:text-[#1E88F5]',
              )}
            >
              {item.label} {counts[item.key]}
            </button>
          )
        })}
      </div>

      <ul className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto px-4 pb-24 [scrollbar-width:none]">
        {visible.length === 0 && (
          <li className="pt-16 text-center text-[14px] text-[#A0A8B8]">
            {filter === 'todo' ? '错题已全部掌握' : '暂无已掌握的错题'}
          </li>
        )}
        {visible.map((q) => {
          const done = mastered.has(q.id)
          return (
            <li key={q.id} className="flex flex-col gap-2.5 rounded-2xl bg-white p-3.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[13px] font-bold text-[#1F2937]">第 {q.no} 题</span>
                <span className="truncate rounded-md bg-[#F1F5FB] px-2 py-0.5 text-[11px] text-[#5B6478]">{q.point}</span>
              </div>
              <p className="text-pretty text-[14px] leading-relaxed text-[#1F2937]">{q.stem}</p>
              <div className="flex items-center justify-between gap-2 border-t border-[#F1F3F7] pt-2.5">
                <span className="text-[12px] text-[#8A93A6]">
                  错因：<span className="text-[#E5484D]">{q.reason}</span>
                </span>
                <button
                  type="button"
                  aria-pressed={done}
                  onClick={() => toggle(q.id)}
                  className={cn(
                    'flex h-7 shrink-0 items-center gap-1 rounded-full px-3 text-[12px] font-medium transition-colors',
                    done
                      ? 'bg-[#E8F8F0] text-[#16A34A]'
                      : 'border border-[#1E88F5] text-[#1E88F5] hover:bg-[#EAF4FF]',
                  )}
                >
                  {done && <CircleCheck className="size-3.5" strokeWidth={2.4} aria-hidden="true" />}
                  {done ? '已掌握' : '标记已掌握'}
                </button>
              </div>
            </li>
          )
        })}
      </ul>

      <div className="absolute inset-x-0 bottom-0 flex gap-3 bg-white px-4 pb-6 pt-3 shadow-[0_-4px_14px_rgba(30,64,140,0.06)]">
        <span className="flex flex-1 items-center text-[13px] text-[#5B6478]">
          未掌握 <span className="mx-1 font-bold tabular-nums text-[#E5484D]">{counts.todo}</span> 题
        </span>
        <button
          type="button"
          disabled={allDone}
          onClick={() => setMastered(new Set(questions.map((q) => q.id)))}
          className="h-10 rounded-full bg-[#1E88F5] px-6 text-[14px] font-semibold text-white transition-opacity disabled:opacity-40"
        >
          全部标记已掌握
        </button>
      </div>
    </div>
  )
}
