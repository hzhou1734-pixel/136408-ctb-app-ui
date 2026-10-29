'use client'

import { ChevronDown, CircleCheck, Download, ListFilter, Search, Trash2 } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

type BookType = 'origin' | 'ai' | 'bank'
type Subject = '数学' | '语文' | '英语'
type Book = {
  id: string
  type: BookType
  subject: Subject
  student: string
  time: string
  practiced?: boolean
  total: number
  solved: number
}

const classes = ['星辰班', '启航班', '晨曦班']
const students = ['曹小明', '园园', '贺泽轩']
const subjects: Subject[] = ['数学', '语文', '英语']

const subjectCounts: Record<string, Record<Subject, number>> = {
  曹小明: { 数学: 282, 语文: 40, 英语: 0 },
  园园: { 数学: 156, 语文: 63, 英语: 21 },
  贺泽轩: { 数学: 98, 语文: 12, 英语: 35 },
}

const typeMeta: Record<BookType, { badge: string[]; name: string; className: string }> = {
  origin: { badge: ['原题'], name: '原题错题本', className: 'bg-[linear-gradient(135deg,#FFC2B6_0%,#FF9E8E_100%)]' },
  ai: { badge: ['AI', '推送'], name: 'AI推送本', className: 'bg-[linear-gradient(135deg,#B5DCFF_0%,#80BDF6_100%)]' },
  bank: { badge: ['题库', '推送'], name: '题库推送本', className: 'bg-[linear-gradient(135deg,#9BE8C8_0%,#5ED1A1_100%)]' },
}

const timeline: { type: BookType; time: string; practiced?: boolean; total: number; solved: number }[] = [
  { type: 'origin', time: '2026-10-17 11:11:42', practiced: true, total: 12, solved: 12 },
  { type: 'origin', time: '2026-09-11 16:16:39', total: 8, solved: 5 },
  { type: 'origin', time: '2026-09-02 16:58:58', total: 10, solved: 10 },
  { type: 'ai', time: '2026-08-28 15:23:19', total: 6, solved: 2 },
  { type: 'bank', time: '2026-08-28 15:14:46', total: 9, solved: 9 },
  { type: 'origin', time: '2026-08-20 09:32:05', total: 7, solved: 0 },
  { type: 'ai', time: '2026-08-12 18:04:51', total: 5, solved: 5 },
]

const initialBooks: Book[] = students.flatMap((student) =>
  subjects.flatMap((subject) =>
    subjectCounts[student][subject] === 0
      ? []
      : timeline.map((entry, index) => ({ ...entry, id: `${student}-${subject}-${index}`, student, subject })),
  ),
)

export function BookScreen() {
  const [className, setClassName] = useState(classes[0])
  const [classOpen, setClassOpen] = useState(false)
  const [student, setStudent] = useState(students[0])
  const [subject, setSubject] = useState<Subject>('数学')
  const [keyword, setKeyword] = useState('')
  const [books, setBooks] = useState(initialBooks)
  const [toast, setToast] = useState('')
  const [taskTotal, setTaskTotal] = useState(2)
  const [counterPulse, setCounterPulse] = useState(0)
  const [flyers, setFlyers] = useState<Flight[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)

  function launchPractice(source: HTMLElement) {
    const container = containerRef.current
    const counter = counterRef.current
    if (!container || !counter) return
    const box = container.getBoundingClientRect()
    const scale = box.width / container.offsetWidth || 1
    const center = (el: HTMLElement) => {
      const rect = el.getBoundingClientRect()
      return {
        x: (rect.left + rect.width / 2 - box.left) / scale,
        y: (rect.top + rect.height / 2 - box.top) / scale,
      }
    }
    setFlyers((list) => [...list, { id: Date.now() + Math.random(), from: center(source), to: center(counter) }])
  }

  function landFlight(id: number) {
    setFlyers((list) => list.filter((item) => item.id !== id))
    setTaskTotal((total) => total + 1)
    setCounterPulse((n) => n + 1)
  }

  const visibleBooks = useMemo(() => {
    const query = keyword.trim()
    return books.filter((book) => {
      if (query) return book.student.includes(query) || book.subject.includes(query)
      return book.student === student && book.subject === subject
    })
  }, [books, keyword, student, subject])

  function notify(message: string) {
    setToast(message)
    window.setTimeout(() => setToast(''), 1600)
  }

  return (
    <div ref={containerRef} className="relative flex min-h-0 flex-1 flex-col">
  <header className="relative flex h-11 shrink-0 items-center justify-center">
  <h1 className="text-[17px] font-bold text-[#1F2937]">错题本</h1>
  <p role="status" className="absolute right-4 top-1/2 flex -translate-y-1/2 flex-col items-end text-right leading-tight">
  <span
    key={counterPulse}
    ref={counterRef}
    className={cn('text-[13px] font-semibold tabular-nums text-[#2F80ED]', counterPulse > 0 && 'counter-pulse')}
  >
    0/{taskTotal}
  </span>
  <span className="flex items-end text-[11px] text-[#6B7280]">
    AI解析生成中
    <span aria-hidden="true" className="inline-flex w-[1.2em] justify-start">
      {[0, 1, 2].map((i) => (
        <span key={i} className="loading-dot" style={{ animationDelay: `${i * 0.2}s` }}>
          .
        </span>
      ))}
    </span>
  </span>
  </p>
  </header>

      <div className="flex items-center gap-4 pb-3 pl-4 pr-4 pt-1.5">
        <label className="flex h-10 flex-1 items-center gap-2 rounded-full bg-white px-3.5 shadow-[0_4px_14px_rgba(30,64,140,0.05)]">
          <Search className="size-[18px] shrink-0 text-[#3A4256]" strokeWidth={2.2} aria-hidden="true" />
          <span className="sr-only">搜索错题本</span>
          <input
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="请输入姓名或科目"
            className="min-w-0 flex-1 bg-transparent text-[14px] text-[#1F2937] outline-none placeholder:text-[#A0A8B8]"
          />
        </label>
        <button
          type="button"
          onClick={() => notify('打开筛选')}
          className="flex items-center gap-1 text-[14px] text-[#3A4256]"
        >
          筛选
          <ListFilter className="size-[18px]" aria-hidden="true" />
        </button>
      </div>

      <div className="flex min-h-0 flex-1 rounded-t-[20px] bg-white">
        <aside aria-label="学生列表" className="flex w-[24%] shrink-0 flex-col">
          <div className="relative">
            <button
              type="button"
              aria-haspopup="listbox"
              aria-expanded={classOpen}
              onClick={() => setClassOpen((open) => !open)}
              className="flex h-12 w-full items-center justify-center gap-2.5 text-[14px] text-[#1F2937]"
            >
              {className}
              <ChevronDown
                className={cn('size-3.5 text-[#1E88F5] transition-transform', classOpen && 'rotate-180')}
                aria-hidden="true"
              />
            </button>
            {classOpen && (
              <ul role="listbox" aria-label="选择班级" className="absolute inset-x-1 top-11 z-30 rounded-xl bg-white py-1 shadow-[0_8px_24px_rgba(30,36,51,0.14)]">
                {classes.map((item) => (
                  <li key={item}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={item === className}
                      onClick={() => {
                        setClassName(item)
                        setClassOpen(false)
                      }}
                      className={cn(
                        'h-9 w-full text-[13px]',
                        item === className ? 'font-semibold text-[#1E88F5]' : 'text-[#3A4256]',
                      )}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <ul className="flex flex-col bg-[#F5F7FB]">
            {students.map((name) => {
              const active = name === student && !keyword
              return (
                <li key={name}>
                  <button
                    type="button"
                    aria-pressed={active}
                    onClick={() => {
                      setStudent(name)
                      setKeyword('')
                    }}
                    className={cn(
                      'h-12 w-full border-l-[3px] text-[14px] transition-colors',
                      active
                        ? 'border-[#1E88F5] bg-[#E3F1FF] text-[#1E88F5]'
                        : 'border-transparent text-[#5B6478] hover:text-[#1E88F5]',
                    )}
                  >
                    {name}
                  </button>
                </li>
              )
            })}
          </ul>
        </aside>

        <section aria-label="错题本列表" className="flex min-w-0 flex-1 flex-col">
          <p className="flex h-12 shrink-0 items-center justify-between gap-2 whitespace-nowrap pl-3 pr-3 text-[13px] font-bold text-[#1F2937]">
            <span>错题总计：1109题</span>
            <span>错题本总计：322本</span>
          </p>

          <div role="tablist" aria-label="科目" className="flex shrink-0 gap-7 px-3 pb-2.5">
            {subjects.map((item) => {
              const active = item === subject && !keyword
              return (
                <button
                  key={item}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => {
                    setSubject(item)
                    setKeyword('')
                  }}
                  className="flex flex-col items-center"
                >
                  <span className={cn('text-[15px] leading-6', active ? 'font-bold text-[#1E88F5]' : 'text-[#3A4256]')}>{item}</span>
                  <span className={cn('text-[11px] leading-4', active ? 'text-[#1E88F5]' : 'text-[#8A93A6]')}>
                    ({subjectCounts[student][item]})
                  </span>
                  <span
                    aria-hidden="true"
                    className={cn('h-1 w-3 rounded-b-full border-b-2', active ? 'border-[#1E88F5]' : 'border-transparent')}
                  />
                </button>
              )
            })}
          </div>

          <ul className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto pb-28 pl-1.5 pr-3 [scrollbar-width:none]">
            {visibleBooks.length === 0 && (
              <li className="pt-16 text-center text-[14px] text-[#A0A8B8]">暂无错题本</li>
            )}
            {visibleBooks.map((book) => {
              const meta = typeMeta[book.type]
              return (
                <li key={book.id} className="flex flex-col gap-1 rounded-2xl border border-[#EDF0F5] bg-white px-2.5 pb-2 pt-3">
                  <div className="flex items-center gap-2.5">
                    <span
                      aria-hidden="true"
                      className={cn(
                        'relative flex size-10 shrink-0 flex-col items-center justify-center overflow-hidden rounded-[10px] text-[11px] font-medium leading-[13px] text-white',
                        meta.className,
                      )}
                    >
                      {meta.badge.map((line) => (
                        <span key={line} className="relative">{line}</span>
                      ))}
                      <span className="absolute -bottom-0.5 right-0.5 text-[14px] font-bold leading-none opacity-40">×</span>
                    </span>
                    <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                      <h2 className="truncate text-[14px] font-bold text-[#1F2937]">
                        {meta.name}-{book.subject}-{book.student}-学生错题
                      </h2>
                      <p className="text-[11px] text-[#A0A8B8]">{book.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-1.5 pl-0.5">
                    <div className="flex min-w-0 flex-1">
                      <ResolveStatus total={book.total} solved={book.solved} />
                    </div>
                    <div className="grid shrink-0 grid-cols-4 gap-1.5">
                    <IconAction label="举一反三" onClick={(event) => launchPractice(event.currentTarget)}>
                      <BulbIcon className={book.practiced ? 'text-[#F59E0B]' : 'text-[#4B5563]'} />
                    </IconAction>
                    <IconAction label="下载" onClick={() => notify('开始下载 PDF')}>
                      <Download className="size-[18px] text-[#1E88F5]" strokeWidth={1.8} />
                    </IconAction>
                    <IconAction label="分享" onClick={() => notify('已复制分享链接')}>
                      <ShareIcon className="text-[#A0A8B8]" />
                    </IconAction>
                    <IconAction
                      label="删除"
                      onClick={() => {
                        setBooks((list) => list.filter((item) => item.id !== book.id))
                        notify('已删除')
                      }}
                    >
                      <Trash2 className="size-[18px] text-[#A0A8B8]" strokeWidth={1.6} />
                    </IconAction>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </section>
      </div>

      {flyers.map((flight) => (
        <FlyingBulb key={flight.id} flight={flight} onLand={() => landFlight(flight.id)} />
      ))}

      <div role="status" aria-live="polite" className="pointer-events-none absolute inset-x-0 top-1/2 z-40 flex justify-center">
        {toast && (
          <span className="rounded-xl bg-[rgba(17,24,39,0.82)] px-4 py-2.5 text-[14px] font-medium text-white shadow-lg">
            {toast}
          </span>
        )}
      </div>
    </div>
  )
}

function ResolveStatus({ total, solved }: { total: number; solved: number }) {
  if (solved >= total) {
    return (
      <span className="flex min-w-0 items-center gap-1 rounded-full bg-[#E8F8F0] px-2 py-0.5 text-[11px] font-medium text-[#16A34A]">
        <CircleCheck className="size-3 shrink-0" strokeWidth={2.4} aria-hidden="true" />
        <span className="truncate">已全部掌握</span>
      </span>
    )
  }
  return (
    <span className="min-w-0 truncate rounded-full bg-[#F3F5F9] px-2 py-0.5 text-[11px] tabular-nums text-[#8A93A6]">
      已掌握 {solved}/{total}
    </span>
  )
}

function BulbIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={cn('size-[19px]', className)} aria-hidden="true">
      <path d="M8.5 15.5c-1.8-1.3-3-3.4-3-5.8a6.5 6.5 0 0 1 13 0c0 2.4-1.2 4.5-3 5.8V18h-7v-2.5Z" />
      <path d="M9.5 21h5" />
      <path d="m12.6 7.5-2 3h2.8l-2 3" />
    </svg>
  )
}

function ShareIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round" className={cn('size-[19px]', className)} aria-hidden="true">
      <path d="M13.5 5v3.6C7.6 9.2 4.5 12.8 4 19c1.9-3 4.8-4.4 9.5-4.5V18l6.5-6.5L13.5 5Z" />
    </svg>
  )
}

type Flight = { id: number; from: { x: number; y: number }; to: { x: number; y: number } }

function FlyingBulb({ flight, onLand }: { flight: Flight; onLand: () => void }) {
  const ref = useRef<HTMLSpanElement>(null)
  const landRef = useRef(onLand)
  landRef.current = onLand

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const { from, to } = flight
    const peakX = from.x + (to.x - from.x) * 0.35
    const peakY = Math.min(from.y, to.y) - 60
    const animation = el.animate(
      [
        { transform: `translate(${from.x}px, ${from.y}px) translate(-50%, -50%) scale(0.6)`, opacity: 0 },
        { transform: `translate(${from.x}px, ${from.y - 16}px) translate(-50%, -50%) scale(1.15)`, opacity: 1, offset: 0.12 },
        { transform: `translate(${peakX}px, ${peakY}px) translate(-50%, -50%) scale(1)`, opacity: 1, offset: 0.55 },
        { transform: `translate(${to.x}px, ${to.y}px) translate(-50%, -50%) scale(0.35)`, opacity: 0.2 },
      ],
      { duration: 850, easing: 'cubic-bezier(0.45, 0, 0.25, 1)', fill: 'forwards' },
    )
    animation.onfinish = () => landRef.current()
    return () => animation.cancel()
  }, [flight])

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 z-50 flex size-8 items-center justify-center rounded-full bg-[#1E88F5] text-white opacity-0 shadow-[0_6px_16px_rgba(30,136,245,0.45)]"
    >
      <BulbIcon className="size-[17px]" />
    </span>
  )
}

function IconAction({
  label,
  onClick,
  children,
}: {
  label: string
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex size-7 items-center justify-center rounded-full transition-colors hover:bg-[#F3F6FB]"
    >
      {children}
    </button>
  )
}
