'use client'

import { ChevronDown, Download, Forward, Lightbulb, ListFilter, Search, Trash2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { cn } from '@/lib/utils'

type BookType = 'origin' | 'ai' | 'bank'
type Subject = '数学' | '语文' | '英语'
type Book = { id: string; type: BookType; subject: Subject; student: string; time: string; practiced?: boolean }

const classes = ['星辰班', '启航班', '晨曦班']
const students = ['曹小明', '园园', '贺泽轩']
const subjects: Subject[] = ['数学', '语文', '英语']

const subjectCounts: Record<string, Record<Subject, number>> = {
  曹小明: { 数学: 282, 语文: 40, 英语: 0 },
  园园: { 数学: 156, 语文: 63, 英语: 21 },
  贺泽轩: { 数学: 98, 语文: 12, 英语: 35 },
}

const typeMeta: Record<BookType, { badge: string[]; name: string; className: string }> = {
  origin: { badge: ['原题'], name: '原题错题本', className: 'bg-[linear-gradient(135deg,#FFB4A6_0%,#FF8F7D_100%)]' },
  ai: { badge: ['AI', '推送'], name: 'AI推送本', className: 'bg-[linear-gradient(135deg,#9CD0FF_0%,#6BB2F7_100%)]' },
  bank: { badge: ['题库', '推送'], name: '题库推送本', className: 'bg-[linear-gradient(135deg,#8EE3C0_0%,#52CC9A_100%)]' },
}

const timeline: { type: BookType; time: string; practiced?: boolean }[] = [
  { type: 'origin', time: '2026-10-17 11:11:42', practiced: true },
  { type: 'origin', time: '2026-09-11 16:16:39' },
  { type: 'origin', time: '2026-09-02 16:58:58' },
  { type: 'ai', time: '2026-08-28 15:23:19' },
  { type: 'bank', time: '2026-08-28 15:14:46' },
  { type: 'origin', time: '2026-08-20 09:32:05' },
  { type: 'ai', time: '2026-08-12 18:04:51' },
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
    <div className="relative flex min-h-0 flex-1 flex-col">
      <header className="flex h-12 shrink-0 items-center justify-center">
        <h1 className="text-[17px] font-bold text-[#1F2937]">错题本</h1>
      </header>

      <div className="flex items-center gap-3 px-4 pb-4 pt-2">
        <label className="flex h-11 flex-1 items-center gap-2 rounded-full bg-white px-4 shadow-[0_4px_14px_rgba(30,64,140,0.05)]">
          <Search className="size-5 shrink-0 text-[#4B5563]" aria-hidden="true" />
          <span className="sr-only">搜索错题本</span>
          <input
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="请输入姓名或科目"
            className="min-w-0 flex-1 bg-transparent text-[15px] text-[#1F2937] outline-none placeholder:text-[#A0A8B8]"
          />
        </label>
        <button
          type="button"
          onClick={() => notify('打开筛选')}
          className="flex items-center gap-1.5 text-[15px] text-[#3A4256]"
        >
          筛选
          <ListFilter className="size-5" aria-hidden="true" />
        </button>
      </div>

      <div className="flex min-h-0 flex-1 rounded-t-3xl bg-white">
        <aside aria-label="学生列表" className="flex w-[30%] shrink-0 flex-col">
          <div className="relative">
            <button
              type="button"
              aria-haspopup="listbox"
              aria-expanded={classOpen}
              onClick={() => setClassOpen((open) => !open)}
              className="flex h-14 w-full items-center justify-center gap-2 text-[15px] text-[#1F2937]"
            >
              {className}
              <ChevronDown
                className={cn('size-4 text-[#1E88F5] transition-transform', classOpen && 'rotate-180')}
                aria-hidden="true"
              />
            </button>
            {classOpen && (
              <ul role="listbox" aria-label="选择班级" className="absolute inset-x-2 top-12 z-30 rounded-xl bg-white py-1 shadow-[0_8px_24px_rgba(30,36,51,0.14)]">
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
                        'h-10 w-full text-[14px]',
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
          <ul className="flex flex-col bg-[#F3F6FB]">
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
                      'h-[72px] w-full text-[15px] transition-colors',
                      active ? 'bg-[#E3F1FF] text-[#1E88F5]' : 'text-[#4B5563] hover:text-[#1E88F5]',
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
          <p className="flex h-14 shrink-0 items-center justify-between pl-3 pr-4 text-[15px] font-bold text-[#1F2937]">
            <span>错题总计：1109题</span>
            <span>错题本总计：322本</span>
          </p>

          <div role="tablist" aria-label="科目" className="flex shrink-0 gap-6 px-3 pb-3">
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
                  className="flex flex-col items-center gap-0.5"
                >
                  <span className={cn('text-[17px]', active ? 'font-bold text-[#1E88F5]' : 'text-[#3A4256]')}>{item}</span>
                  <span className={cn('text-[12px]', active ? 'text-[#1E88F5]' : 'text-[#8A93A6]')}>
                    ({subjectCounts[student][item]})
                  </span>
                  <span aria-hidden="true" className={cn('h-1 w-4 rounded-b-full border-b-2', active ? 'border-[#1E88F5]' : 'border-transparent')} />
                </button>
              )
            })}
          </div>

          <ul className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto pb-28 pl-1 pr-4 [scrollbar-width:none]">
            {visibleBooks.length === 0 && (
              <li className="pt-16 text-center text-[14px] text-[#A0A8B8]">暂无错题本</li>
            )}
            {visibleBooks.map((book) => {
              const meta = typeMeta[book.type]
              return (
                <li key={book.id} className="flex flex-col gap-2 rounded-2xl border border-[#EEF1F6] bg-white px-3 pb-2.5 pt-3.5">
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className={cn(
                        'flex size-[52px] shrink-0 flex-col items-center justify-center rounded-xl text-[13px] font-medium leading-tight text-white',
                        meta.className,
                      )}
                    >
                      {meta.badge.map((line) => (
                        <span key={line}>{line}</span>
                      ))}
                    </span>
                    <div className="flex min-w-0 flex-col gap-1">
                      <h2 className="truncate text-[16px] font-bold text-[#1F2937]">
                        {meta.name}-{book.subject}-{book.student}-学生错题
                      </h2>
                      <p className="text-[13px] text-[#A0A8B8]">{book.time}</p>
                    </div>
                  </div>
                  <div className="flex justify-end gap-4">
                    <IconAction label="举一反三" onClick={() => notify('已生成举一反三练习')}>
                      <Lightbulb className={cn('size-5', book.practiced ? 'text-[#F59E0B]' : 'text-[#6B7280]')} />
                    </IconAction>
                    <IconAction label="下载" onClick={() => notify('开始下载 PDF')}>
                      <Download className="size-5 text-[#1E88F5]" />
                    </IconAction>
                    <IconAction label="分享" onClick={() => notify('已复制分享链接')}>
                      <Forward className="size-5 text-[#9AA3B8]" />
                    </IconAction>
                    <IconAction
                      label="删除"
                      onClick={() => {
                        setBooks((list) => list.filter((item) => item.id !== book.id))
                        notify('已删除')
                      }}
                    >
                      <Trash2 className="size-5 text-[#9AA3B8]" />
                    </IconAction>
                  </div>
                </li>
              )
            })}
          </ul>
        </section>
      </div>

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

function IconAction({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex size-9 items-center justify-center rounded-full transition-colors hover:bg-[#F3F6FB]"
    >
      {children}
    </button>
  )
}
