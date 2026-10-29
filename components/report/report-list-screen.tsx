'use client'

import Link from 'next/link'
import { ChevronLeft, ChevronRight, FileText } from 'lucide-react'
import { useState } from 'react'
import { periodRanges, periods, type Period } from '@/lib/stats-data'
import { avatarColors, reportTotals, reportsForPeriod } from '@/lib/report-data'

function ClearRing({ rate }: { rate: number }) {
  const radius = 20
  const circumference = 2 * Math.PI * radius
  const color = rate >= 100 ? '#16A34A' : rate >= 70 ? '#1E88F5' : '#F08A24'
  return (
    <div className="relative size-[52px] shrink-0">
      <svg viewBox="0 0 48 48" className="size-full -rotate-90" aria-hidden="true">
        <circle cx="24" cy="24" r={radius} fill="none" stroke="#EEF1F6" strokeWidth="4" />
        <circle
          cx="24"
          cy="24"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - Math.min(rate, 100) / 100)}
        />
      </svg>
      <span className="absolute inset-0 flex flex-col items-center justify-center leading-none">
        <span className="text-[13px] font-bold tabular-nums" style={{ color }}>
          {rate}%
        </span>
        <span className="mt-0.5 text-[9px] text-[#8A93A6]">清零率</span>
      </span>
    </div>
  )
}

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
        <div className="mt-3 flex items-center justify-between rounded-xl bg-white/70 px-3.5 py-2.5 text-[12px] text-[#5B6478]">
          <span>
            已发送 <span className="text-[15px] font-bold tabular-nums text-[#1E88F5]">{list.length}</span> 份报告
          </span>
          <span className="tabular-nums text-[#8A93A6]">{periodRanges[period]}</span>
        </div>

        {list.length > 0 ? (
          <ol className="relative mt-4 flex flex-col gap-5 pl-5">
            <span className="absolute bottom-2 left-[5px] top-2 w-px bg-[#D6E2F5]" aria-hidden="true" />
            {list.map((report, index) => {
              const totals = reportTotals(report)
              const color = avatarColors[index % avatarColors.length]
              const rate = Math.round(((totals.retrained + totals.extended) / totals.total) * 100)
              const cleared = totals.remaining === 0
              return (
                <li key={report.id} className="relative">
                  <span
                    className="absolute -left-5 top-1 size-[11px] rounded-full border-2 border-white bg-[#1E88F5] shadow-[0_0_0_3px_rgba(30,136,245,0.15)]"
                    aria-hidden="true"
                  />
                  <p className="text-[13px] font-semibold tabular-nums text-[#1F2937]">{report.sentAt}</p>
                  <Link
                    href={`/report/${report.id}`}
                    className="mt-2 block overflow-hidden rounded-2xl bg-white shadow-[0_6px_18px_rgba(30,64,140,0.06)] transition-transform active:scale-[0.98]"
                  >
                    <div className="flex items-center gap-3 p-3.5">
                      <span
                        className="flex size-11 shrink-0 items-center justify-center rounded-2xl text-[15px] font-bold text-white"
                        style={{ backgroundColor: color }}
                        aria-hidden="true"
                      >
                        {report.student.slice(0, 1)}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[15px] font-bold text-[#1F2937]">{report.student}</span>
                          <span
                            className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${
                              cleared ? 'bg-[#E8F7EE] text-[#16A34A]' : 'bg-[#FFF4E8] text-[#F08A24]'
                            }`}
                          >
                            {cleared ? '已清零' : '待巩固'}
                          </span>
                        </div>
                        <p className="mt-1 truncate text-[12px] text-[#8A93A6]">
                          {report.date}，{report.student}同学的错题清零报告
                        </p>
                      </div>
                      <ClearRing rate={rate} />
                    </div>
                    <div className="flex items-center border-t border-dashed border-[#EEF1F6] px-3.5 py-2.5 text-[12px] text-[#5B6478]">
                      <span className="flex flex-1 flex-wrap gap-x-3 gap-y-1">
                        <span>
                          错题 <b className="tabular-nums text-[#1F2937]">{totals.total}</b>
                        </span>
                        <span>
                          重练 <b className="tabular-nums text-[#1E88F5]">{totals.retrained}</b>
                        </span>
                        <span>
                          强化 <b className="tabular-nums text-[#7B61FF]">{totals.extended}</b>
                        </span>
                        <span>
                          剩余 <b className="tabular-nums text-[#E5533D]">{totals.remaining}</b>
                        </span>
                      </span>
                      <span className="flex shrink-0 items-center text-[#1E88F5]">
                        查看
                        <ChevronRight className="size-3.5" aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
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
