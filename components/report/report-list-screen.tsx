'use client'

import Link from 'next/link'
import { ChevronLeft, ChevronRight, FileText } from 'lucide-react'
import { useState } from 'react'
import { periodRanges, periods, type Period } from '@/lib/stats-data'
import { avatarColors, reportTotals, reportsForPeriod } from '@/lib/report-data'

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

      <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-8 [scrollbar-width:none]">
        <div role="tablist" aria-label="时间段" className="mt-1 flex rounded-full bg-white/70 p-1">
          {periods.map((p) => {
            const active = p === period
            return (
              <button
                key={p}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setPeriod(p)}
                className={`h-9 flex-1 rounded-full text-[14px] font-semibold transition-colors ${
                  active
                    ? 'bg-[linear-gradient(135deg,#3DA9FF_0%,#1E88F2_100%)] text-white shadow-[0_4px_12px_rgba(30,136,242,0.3)]'
                    : 'text-[#5B6478]'
                }`}
              >
                {p}
              </button>
            )
          })}
        </div>

        <div className="mt-3 flex items-center justify-between px-1 text-[12px] text-[#8A93A6]">
          <span>
            共 <span className="font-semibold text-[#1E88F5]">{list.length}</span> 份报告
          </span>
          <span className="tabular-nums">{periodRanges[period]}</span>
        </div>

        {list.length > 0 ? (
          <ul className="mt-2 flex flex-col gap-4">
            {list.map((report, index) => {
              const totals = reportTotals(report)
              const color = avatarColors[index % avatarColors.length]
              return (
                <li key={report.id} className="flex flex-col gap-2">
                  <p className="text-center text-[12px] tabular-nums text-[#8A93A6]">{report.sentAt}</p>
                  <div className="flex items-start gap-3">
                    <div className="flex w-12 shrink-0 flex-col items-center gap-1">
                      <span
                        className="flex size-11 items-center justify-center rounded-full text-[15px] font-bold text-white"
                        style={{ backgroundColor: color }}
                        aria-hidden="true"
                      >
                        {report.student.slice(-2)}
                      </span>
                      <span className="text-[12px] text-[#4B5568]">{report.student}</span>
                    </div>
                    <Link
                      href={`/report/${report.id}`}
                      className="flex min-w-0 flex-1 flex-col gap-3 rounded-2xl rounded-tl-md bg-white p-3.5 shadow-[0_4px_14px_rgba(30,64,140,0.05)] transition-transform active:scale-[0.98]"
                    >
                      <div className="flex items-center gap-2">
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-[#EAF4FF] text-[#1E88F5]">
                          <FileText className="size-4" aria-hidden="true" />
                        </span>
                        <p className="min-w-0 flex-1 truncate text-[14px] font-semibold text-[#1F2937]">
                          {report.date}，{report.student}同学的错题清零报告
                        </p>
                        <ChevronRight className="size-4 shrink-0 text-[#C5CBD6]" aria-hidden="true" />
                      </div>
                      <dl className="grid grid-cols-4 rounded-xl bg-[#F6F9FF] py-2 text-center">
                        {[
                          { label: '错题', value: totals.total, color: '#1F2937' },
                          { label: '原题重练', value: totals.retrained, color: '#1E88F5' },
                          { label: '举一反三', value: totals.extended, color: '#7B61FF' },
                          { label: '剩余', value: totals.remaining, color: '#E5533D' },
                        ].map((item) => (
                          <div key={item.label} className="flex flex-col gap-0.5">
                            <dd className="text-[16px] font-bold tabular-nums" style={{ color: item.color }}>
                              {item.value}
                            </dd>
                            <dt className="text-[11px] text-[#8A93A6]">{item.label}</dt>
                          </div>
                        ))}
                      </dl>
                    </Link>
                  </div>
                </li>
              )
            })}
          </ul>
        ) : (
          <div className="mt-3 flex flex-col items-center gap-2 rounded-2xl bg-white py-10 text-center">
            <FileText className="size-8 text-[#C5CBD6]" aria-hidden="true" />
            <p className="text-[14px] text-[#8A93A6]">{period}暂无清零报告</p>
          </div>
        )}
      </div>
    </div>
  )
}
