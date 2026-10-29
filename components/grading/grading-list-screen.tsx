'use client'

import { ArrowLeftRight, Camera, ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { classes, gradingRecords, groupByDate } from '@/lib/grading-data'
import { ClassFilterSheet, type GradingFilter } from '@/components/grading/class-filter-sheet'

const groups = groupByDate(gradingRecords)

export function GradingListScreen({ initialClassOpen = false }: { initialClassOpen?: boolean }) {
  const [classOpen, setClassOpen] = useState(initialClassOpen)
  const [filter, setFilter] = useState<GradingFilter>({
    className: classes[0],
    student: '曹小明',
    subject: '数学',
    startDate: "",
    endDate: "",
  })
  const [tipVisible, setTipVisible] = useState(false)
  const tipTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => () => clearTimeout(tipTimer.current), [])

  function showCameraTip() {
    clearTimeout(tipTimer.current)
    setTipVisible(true)
    tipTimer.current = setTimeout(() => setTipVisible(false), 1800)
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
        <h1 className="text-[17px] font-bold text-[#1F2937]">批改列表</h1>
      </header>

      <div className="mx-4 mt-1 flex items-center justify-between rounded-xl bg-white/70 px-3.5 py-2.5">
        <p className="text-[13px] text-[#8A93A6]">
          当前班级：<span className="font-semibold text-[#1E88F5]">{filter.className}</span>
        </p>
        <button
          type="button"
          aria-haspopup="dialog"
          aria-expanded={classOpen}
          onClick={() => setClassOpen(true)}
          className="flex items-center gap-1 rounded-full bg-[#EEF6FF] px-3 py-1 text-[13px] font-semibold text-[#1E88F5] transition-colors hover:bg-[#E0EEFF]"
        >
          <ArrowLeftRight className="size-3.5" aria-hidden="true" />
          切换班级
        </button>
      </div>

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

      <button
        type="button"
        aria-label="新建批改"
        onClick={showCameraTip}
        className="absolute bottom-8 right-5 flex size-14 items-center justify-center rounded-full bg-[linear-gradient(135deg,#3DA9FF_0%,#1E88F2_100%)] text-white shadow-[0_8px_20px_rgba(30,136,242,0.35)] transition-transform active:scale-95"
      >
        <Plus className="size-7" strokeWidth={2.4} />
      </button>

      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none absolute inset-x-0 top-1/2 z-40 flex -translate-y-1/2 justify-center"
      >
        {tipVisible && (
          <span className="flex items-center gap-2 rounded-xl bg-[rgba(17,24,39,0.82)] px-4 py-2.5 text-[14px] font-medium text-white shadow-lg animate-in fade-in zoom-in-95 duration-200">
            <Camera className="size-4" aria-hidden="true" />
            打开相机拍摄
          </span>
        )}
      </div>

      {classOpen && (
        <ClassFilterSheet
          value={filter}
          onClose={() => setClassOpen(false)}
          onConfirm={(next) => {
            setFilter(next)
            setClassOpen(false)
          }}
        />
      )}
    </div>
  )
}
