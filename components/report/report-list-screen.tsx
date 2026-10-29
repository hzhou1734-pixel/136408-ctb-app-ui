'use client'

import Link from 'next/link'
import { CalendarDays, ChevronLeft, ChevronRight, FileText } from 'lucide-react'
import { useState } from 'react'
import { periods, type Period } from '@/lib/stats-data'
import { avatarColors, reportPeriodLabels, reportsForPeriod, type ClearReport } from '@/lib/report-data'

function groupByDate(list: ClearReport[]) {
  const groups: { date: string; items: ClearReport[] }[] = []
  for (const report of list) {
    const last = groups[groups.length - 1]
    if (last && last.date === report.date) last.items.push(report)
    else groups.push({ date: report.date, items: [report] })
  }
  return groups
}

function avatarColor(name: string) {
  let sum = 0
  for (const ch of name) sum += ch.charCodeAt(0)
  return avatarColors[sum % avatarColors.length]
}

function StudentAvatar({ name, unread }: { name: string; unread: boolean }) {
  const color = avatarColor(name)
  return (
    <span className="relative shrink-0">
      <span
        className="flex size-12 items-center justify-center rounded-full text-[18px] font-bold text-white ring-[3px] ring-white"
        style={{ background: `linear-gradient(135deg, ${color}CC, ${color})`, boxShadow: `0 6px 14px ${color}40` }}
        aria-hidden="true"
      >
        {name.slice(0, 1)}
      </span>
      {unread && (
        <span className="absolute right-0 top-0 size-3 rounded-full bg-[#F04438] ring-2 ring-white" aria-hidden="true" />
      )}
    </span>
  )
}

function ReportCard({ report }: { report: ClearReport }) {
  const unread = report.status === '未阅读'
  const time = report.sentAt.split(' ')[1]
  return (
    <li>
      <Link
        href={`/report/${report.id}`}
        className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_6px_18px_rgba(30,64,140,0.06)] transition-transform active:scale-[0.99]"
      >
        <div className="flex items-center gap-3 px-4 pb-3 pt-4">
          <StudentAvatar name={report.student} unread={unread} />
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <div className="flex items-center gap-1.5">
              <span className="text-[16px] font-bold text-[#1F2937]">{report.student}</span>
              <span className="rounded-md bg-[#EEF4FF] px-1.5 py-px text-[11px] font-medium text-[#1E88F5]">
                {report.stage}
              </span>
            </div>
            <span className="text-[12px] tabular-nums text-[#8A93A6]">发送于 {time}</span>
          </div>
          <span
            className={`shrink-0 rounded-full px-2.5 py-1 text-[12px] font-medium ${
              unread ? 'bg-[#FFF4E8] text-[#F08A24]' : 'bg-[#E9F7EF] text-[#16A34A]'
            }`}
          >
            {report.status}
          </span>
        </div>
        <div className="mx-4 mb-4 flex items-center gap-2 rounded-xl bg-[#F6F8FC] px-3 py-2.5">
          <FileText className="size-4 shrink-0 text-[#1E88F5]" aria-hidden="true" />
          <p className="min-w-0 flex-1 truncate text-[13px] text-[#3B4352]">
            {report.date}，{report.student}同学的错题清零报告
          </p>
          <ChevronRight className="size-4 shrink-0 text-[#A7AFBD]" aria-hidden="true" />
        </div>
      </Link>
    </li>
  )
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
        <div role="tablist" aria-label="时间段" className="flex gap-6 px-1">
          {periods.map((p) => {
            const active = p === period
            return (
              <button
                key={p}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setPeriod(p)}
                className={`relative pb-2 text-[15px] transition-colors ${
                  active ? 'font-bold text-[#1F2937]' : 'text-[#8A93A6]'
                }`}
              >
                {p}
                {active && (
                  <span
                    className="absolute bottom-0 left-1/2 h-[3px] w-5 -translate-x-1/2 rounded-full bg-[#1E88F5]"
                    aria-hidden="true"
                  />
                )}
              </button>
            )
          })}
        </div>

        <div className="mt-3 flex items-center gap-3 rounded-2xl bg-gradient-to-r from-[#1E88F5] to-[#4F7BFF] px-4 py-3.5 text-white shadow-[0_8px_20px_rgba(30,136,245,0.25)]">
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <span className="flex items-center gap-1 text-[12px] text-white/80">
              <CalendarDays className="size-3.5" aria-hidden="true" />
              {reportPeriodLabels[period]}
            </span>
            <span className="text-[13px] text-white/90">
              共发送
              <span className="mx-1 text-[22px] font-bold tabular-nums text-white">{list.length}</span>
              份报告
            </span>
          </div>
          <div className="flex shrink-0 flex-col items-center rounded-xl bg-white/15 px-3 py-1.5">
            <span className="text-[18px] font-bold tabular-nums">{unreadCount}</span>
            <span className="text-[11px] text-white/80">家长未阅读</span>
          </div>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-8 [scrollbar-width:none]">
        {groups.length > 0 ? (
          <div className="flex flex-col gap-4 pt-4">
            {groups.map((group) => (
              <section key={group.date} aria-label={group.date}>
                <h2 className="mb-2 flex items-center justify-between px-1 text-[13px] font-bold text-[#1F2937]">
                  {group.date}
                  <span className="text-[12px] font-normal text-[#8A93A6]">{group.items.length} 份</span>
                </h2>
                <ul className="flex flex-col gap-3">
                  {group.items.map((report) => (
                    <ReportCard key={report.id} report={report} />
                  ))}
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
