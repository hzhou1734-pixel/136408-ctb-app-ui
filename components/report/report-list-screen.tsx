'use client'

import Link from 'next/link'
import { ChevronLeft, ChevronRight, Clock, FileText } from 'lucide-react'
import { useState } from 'react'
import { periods, type Period } from '@/lib/stats-data'
import { reportPeriodLabels, reportsForPeriod, type ClearReport } from '@/lib/report-data'

function groupByDate(list: ClearReport[]) {
  const groups: { date: string; items: ClearReport[] }[] = []
  for (const report of list) {
    const last = groups[groups.length - 1]
    if (last && last.date === report.date) last.items.push(report)
    else groups.push({ date: report.date, items: [report] })
  }
  return groups
}

export function ReportListScreen() {
  const [period, setPeriod] = useState<Period>('本周')
  const list = reportsForPeriod(period)
  const unreadCount = list.filter((r) => r.status === '未阅读').length
  const groups = groupByDate(list)

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

      <div className="shrink-0 px-4 pt-1">
        <div role="tablist" aria-label="时间段" className="flex rounded-full bg-white/70 p-1">
          {periods.map((p) => {
            const active = p === period
            return (
              <button
                key={p}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setPeriod(p)}
                className={`flex-1 rounded-full py-1.5 text-[14px] transition-colors ${
                  active ? 'bg-[#1E88F5] font-bold text-white shadow-[0_4px_10px_rgba(30,136,245,0.3)]' : 'text-[#5B6475]'
                }`}
              >
                {p}
              </button>
            )
          })}
        </div>

        <div className="mt-3 flex items-stretch rounded-2xl bg-white px-4 py-3 shadow-[0_6px_18px_rgba(30,64,140,0.06)]">
          <div className="flex flex-1 flex-col gap-0.5">
            <span className="text-[12px] text-[#8A93A6]">已发送报告</span>
            <span className="text-[20px] font-bold tabular-nums text-[#1F2937]">
              {list.length}
              <span className="ml-0.5 text-[12px] font-normal text-[#8A93A6]">份</span>
            </span>
          </div>
          <div className="w-px bg-[#EEF1F6]" aria-hidden="true" />
          <div className="flex flex-1 flex-col gap-0.5 pl-4">
            <span className="text-[12px] text-[#8A93A6]">家长未阅读</span>
            <span className="text-[20px] font-bold tabular-nums text-[#F08A24]">
              {unreadCount}
              <span className="ml-0.5 text-[12px] font-normal text-[#8A93A6]">份</span>
            </span>
          </div>
          <div className="w-px bg-[#EEF1F6]" aria-hidden="true" />
          <div className="flex flex-[1.3] flex-col justify-center gap-0.5 pl-4">
            <span className="text-[12px] text-[#8A93A6]">报告时间</span>
            <span className="text-[12px] font-medium tabular-nums text-[#1F2937]">{reportPeriodLabels[period]}</span>
          </div>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-8 [scrollbar-width:none]">
        {groups.length > 0 ? (
          <div className="flex flex-col gap-4 pt-4">
            {groups.map((group) => (
              <section key={group.date} aria-label={group.date}>
                <h2 className="mb-2 flex items-center gap-2 text-[13px] font-bold text-[#1F2937]">
                  <span className="h-3 w-1 rounded-full bg-[#1E88F5]" aria-hidden="true" />
                  {group.date}
                  <span className="text-[12px] font-normal text-[#8A93A6]">{group.items.length} 份</span>
                </h2>
                <ul className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_6px_18px_rgba(30,64,140,0.06)]">
                  {group.items.map((report, index) => {
                    const unread = report.status === '未阅读'
                    const time = report.sentAt.split(' ')[1]
                    return (
                      <li key={report.id} className={index > 0 ? 'border-t border-[#F1F3F7]' : ''}>
                        <Link
                          href={`/report/${report.id}`}
                          className="flex items-center gap-3 px-4 py-3.5 transition-colors active:bg-[#F6F8FC]"
                        >
                          <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                            <div className="flex items-center gap-2">
                              <span className="text-[15px] font-bold text-[#1F2937]">{report.student}</span>
                              <span className="rounded bg-[#F1F3F7] px-1.5 py-px text-[11px] text-[#5B6475]">
                                {report.stage}
                              </span>
                              <span
                                className={`ml-auto flex items-center gap-1 text-[12px] ${
                                  unread ? 'text-[#F08A24]' : 'text-[#8A93A6]'
                                }`}
                              >
                                <span
                                  className={`size-1.5 rounded-full ${unread ? 'bg-[#F08A24]' : 'bg-[#C5CBD6]'}`}
                                  aria-hidden="true"
                                />
                                {report.status}
                              </span>
                            </div>
                            <p className="truncate text-[13px] text-[#5B6475]">
                              {report.date}，{report.student}同学的错题清零报告
                            </p>
                            <span className="flex items-center gap-1 text-[12px] tabular-nums text-[#8A93A6]">
                              <Clock className="size-3" aria-hidden="true" />
                              发送于 {time}
                            </span>
                          </div>
                          <ChevronRight className="size-4 shrink-0 text-[#C5CBD6]" aria-hidden="true" />
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </section>
            ))}
          </div>
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
