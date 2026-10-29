'use client'

import { Camera, ChevronDown, ChevronLeft, ChevronRight, FileText, Plus, Search, Trash2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { essayClasses, essayRecords } from '@/lib/essay-data'

const ALL_CLASSES = '所有班级'

export function EssayListScreen() {
  const [records, setRecords] = useState(essayRecords)
  const [keyword, setKeyword] = useState('')
  const [className, setClassName] = useState(ALL_CLASSES)
  const [tip, setTip] = useState<string | null>(null)
  const tipTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => () => clearTimeout(tipTimer.current), [])

  function showTip(text: string) {
    clearTimeout(tipTimer.current)
    setTip(text)
    tipTimer.current = setTimeout(() => setTip(null), 1800)
  }

  const query = keyword.trim()
  const visible = records.filter(
    (r) =>
      (className === ALL_CLASSES || r.className === className) &&
      (!query || r.title.includes(query) || r.student.includes(query)),
  )

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
        <h1 className="text-[17px] font-bold text-[#1F2937]">语文作文</h1>
      </header>

      <div className="mx-4 mt-1 flex items-center gap-3">
        <label className="flex h-10 min-w-0 flex-1 items-center gap-2 rounded-full bg-white/80 px-3.5 focus-within:ring-2 focus-within:ring-[#1E88F5]/30">
          <Search className="size-4 shrink-0 text-[#8A93A6]" aria-hidden="true" />
          <span className="sr-only">搜索作文</span>
          <input
            type="search"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="请输入搜索词搜索"
            className="min-w-0 flex-1 bg-transparent text-[14px] text-[#1F2937] outline-none placeholder:text-[#A0A8B8]"
          />
        </label>
        <div className="flex shrink-0 items-center gap-1.5 text-[14px]">
          <span className="text-[#5B6478]" id="essay-class-label">
            班级
          </span>
          <div className="relative">
            <select
              aria-labelledby="essay-class-label"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              className="appearance-none bg-transparent pr-5 font-medium text-[#1F2937] outline-none"
            >
              <option value={ALL_CLASSES}>{ALL_CLASSES}</option>
              {essayClasses.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-0 top-1/2 size-4 -translate-y-1/2 text-[#5B6478]"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-28 pt-4 [scrollbar-width:none]">
        {visible.length === 0 ? (
          <p className="pt-16 text-center text-[14px] text-[#8A93A6]">暂无作文记录</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {visible.map((record) => (
              <li
                key={record.id}
                className="flex items-stretch rounded-2xl bg-white shadow-[0_4px_14px_rgba(30,64,140,0.05)] transition-colors hover:bg-[#F8FAFF]"
              >
                <a href="#" className="flex min-w-0 flex-1 flex-col gap-3 py-3.5 pl-4 pr-2">
                  <div className="flex items-center gap-2">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-[5px] bg-[#3DA9FF] text-white">
                      <FileText className="size-3.5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1 truncate text-[16px] font-medium text-[#1F2937]">{record.title}</span>
                    <ChevronRight className="size-5 shrink-0 text-[#5B6478]" aria-hidden="true" />
                  </div>
                  <div className="flex items-center justify-between gap-2 text-[13px] text-[#8A93A6]">
                    <span className="flex min-w-0 items-center gap-2">
                      <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-[#F5C02A]" />
                      <span className="truncate">
                        {record.className}-{record.student}
                      </span>
                    </span>
                    <time className="shrink-0 tabular-nums">{record.submittedAt}</time>
                  </div>
                </a>
                <button
                  type="button"
                  aria-label={`删除作文：${record.title}`}
                  onClick={() => {
                    setRecords((prev) => prev.filter((r) => r.id !== record.id))
                    showTip('已删除')
                  }}
                  className="flex w-10 shrink-0 items-start justify-center pt-3.5 text-[#A0A8B8] transition-colors hover:text-[#EF4444]"
                >
                  <Trash2 className="size-[18px]" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        type="button"
        aria-label="新建作文批阅"
        onClick={() => showTip('打开相机拍摄')}
        className="absolute bottom-8 right-5 flex size-14 items-center justify-center rounded-full bg-[linear-gradient(135deg,#3DA9FF_0%,#1E88F2_100%)] text-white shadow-[0_8px_20px_rgba(30,136,242,0.35)] transition-transform active:scale-95"
      >
        <Plus className="size-7" strokeWidth={2.4} />
      </button>

      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none absolute inset-x-0 top-1/2 z-40 flex -translate-y-1/2 justify-center"
      >
        {tip && (
          <span className="flex items-center gap-2 rounded-xl bg-[rgba(17,24,39,0.82)] px-4 py-2.5 text-[14px] font-medium text-white shadow-lg animate-in fade-in zoom-in-95 duration-200">
            {tip === '打开相机拍摄' && <Camera className="size-4" aria-hidden="true" />}
            {tip}
          </span>
        )}
      </div>
    </div>
  )
}
