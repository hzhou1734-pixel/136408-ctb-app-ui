'use client'

import Link from 'next/link'
import { ChevronLeft, ChevronRight, FileText } from 'lucide-react'
import { useState } from 'react'
import { periods, type Period } from '@/lib/stats-data'
import { avatarColors, reportsForPeriod } from '@/lib/report-data'

export function ReportListScreen() {
  const [period, setPeriod] = useState<Period>('本周')
  const list = reportsForPeriod(period)

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
        <h1 className="text-[17px] font-bold text-[#1F2937]">错题清零报告</h1>
      </header>

      <div role="tablist" aria-label="时间段" className="flex shrink-0 gap-6 px-5">
        {periods.map((p) => {
          const active = p === period
          return (
            <button
              key={p}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setPeriod(p)}
              className={`relative pb-2.5 pt-1 text-[15px] transition-colors ${
                active ? 'font-bold text-[#1F2937]' : 'text-[#8A93A6]'
              }`}
            >
              {p}
              {active && (
                <span className="absolute inset-x-1 bottom-0 h-[3px] rounded-full bg-[#1E88F5]" aria-hidden="true" />
              )}
            </button>
          )
        })}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-8 [scrollbar-width:none]">
        {list.length > 0 ? (
          <ol className="flex flex-col gap-5 pt-4">
            {list.map((report, index) => {
              const color = avatarColors[index % avatarColors.length]
              const unread = report.status === '未阅读'
              return (
                <li key={report.id}>
                  <p className="text-center text-[12px] tabular-nums text-[#8A93A6]">{report.sentAt}</p>
                  <div className="mt-2 flex items-start gap-3">
                    <div className="flex w-12 shrink-0 flex-col items-center gap-1.5">
                      <span
                        className="flex size-12 items-center justify-center rounded-full border-2 border-white text-[16px] font-bold text-white shadow-[0_4px_10px_rgba(30,64,140,0.12)]"
                        style={{ backgroundColor: color }}
                        aria-hidden="true"
                      >
                        {report.student.slice(0, 1)}
                      </span>
                      <span className="text-[12px] text-[#1F2937]">{report.student}</span>
                    </div>
                    <Link
                      href={`/report/${report.id}`}
                      className="relative flex min-h-[88px] min-w-0 flex-1 items-center gap-2 rounded-2xl rounded-tl-md bg-white px-4 py-4 shadow-[0_6px_18px_rgba(30,64,140,0.06)] transition-transform active:scale-[0.98]"
                    >
                      <span
                        className={`absolute right-2.5 top-2.5 rounded-full px-2 py-0.5 text-[11px] font-medium ${
                          unread ? 'bg-[#EEF1F6] text-[#8A93A6]' : 'bg-[#E8F2FF] text-[#1E88F5]'
                        }`}
                      >
                        {report.status}
                      </span>
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#EAF3FF] text-[#1E88F5]">
                        <FileText className="size-[18px]" aria-hidden="true" />
                      </span>
                      <p className="min-w-0 flex-1 pr-10 text-[14px] leading-snug text-[#1F2937]">
                        {report.date}，{report.student}同学的错题清零报告
                      </p>
                      <ChevronRight className="size-4 shrink-0 text-[#C5CBD6]" aria-hidden="true" />
                    </Link>
                  </div>
                </li>
              )
            })}
          </ol>
        ) : (
          <div className="mt-4 flex flex-col items-center gap-2 rounded-2xl bg-white py-10 text-center">
            <FileText className="size-8 text-[#C5CBD6]" aria-hidden="true" />
            <p className="text-[14px] text-[#8A93A6]">{period}暂无清零报告</p>
          </div>
        )}
      </div>
    </div>
  )
}
