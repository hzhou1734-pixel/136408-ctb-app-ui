'use client'

import { ChevronLeft, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { reportTotals, type ClearReport } from '@/lib/report-data'

function BigRing({ rate }: { rate: number }) {
  const radius = 34
  const circumference = 2 * Math.PI * radius
  return (
    <div className="relative size-[84px] shrink-0">
      <svg viewBox="0 0 80 80" className="size-full -rotate-90" aria-hidden="true">
        <circle cx="40" cy="40" r={radius} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="7" />
        <circle
          cx="40"
          cy="40"
          r={radius}
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - Math.min(rate, 100) / 100)}
        />
      </svg>
      <span className="absolute inset-0 flex flex-col items-center justify-center leading-none text-white">
        <span className="text-[20px] font-bold tabular-nums">{rate}%</span>
        <span className="mt-1 text-[10px] text-white/80">清零率</span>
      </span>
    </div>
  )
}

export function ReportDetailScreen({ report }: { report: ClearReport }) {
  const [subjectName, setSubjectName] = useState(report.subjects[0]?.subject)
  const totals = reportTotals(report)
  const totalRate = Math.round(((totals.retrained + totals.extended) / totals.total) * 100)
  const subject = report.subjects.find((s) => s.subject === subjectName) ?? report.subjects[0]
  const remaining = subject.total - subject.retrained - subject.extended

  const summary = [
    { label: `${report.period}错题`, value: totals.total },
    { label: '原题重练解决', value: totals.retrained },
    { label: '举一反三强化', value: totals.extended },
    { label: '剩余错题', value: totals.remaining },
  ]

  const steps = [
    { label: '错题数量', value: subject.total, color: '#1F2937', note: '本期新增' },
    { label: '原题重练解决', value: subject.retrained, color: '#1E88F5', note: '重做正确' },
    { label: '举一反三解决', value: subject.extended, color: '#7B61FF', note: '同类题通过' },
    { label: '剩余错题', value: remaining, color: '#E5533D', note: remaining === 0 ? '已全部清零' : '待继续巩固' },
  ]

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <header className="relative flex h-12 shrink-0 items-center justify-center px-12">
        <a
          href="/report"
          aria-label="返回报告列表"
          className="absolute left-3 flex size-9 items-center justify-center rounded-full text-[#1F2937] transition-colors hover:bg-white/60"
        >
          <ChevronLeft className="size-6" strokeWidth={2.2} />
        </a>
        <h1 className="truncate text-[17px] font-bold text-[#1F2937]">{report.student}的错题清零报告</h1>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-8 [scrollbar-width:none]">
        <section className="mt-1 overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#3DA9FF_0%,#1E6FF2_60%,#5B5CF0_100%)] p-4 text-white shadow-[0_10px_24px_rgba(30,111,242,0.28)]">
          <div className="flex items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-[12px] text-white/80 tabular-nums">发送于 {report.sentAt}</p>
              <p className="mt-1 text-[20px] font-bold">{report.student}</p>
              <p className="mt-1 text-[12px] leading-relaxed text-white/85">
                {totals.remaining === 0
                  ? `${report.period}错题已全部清零，表现很棒！`
                  : `${report.period}还剩 ${totals.remaining} 道错题待巩固`}
              </p>
            </div>
            <BigRing rate={totalRate} />
          </div>
          <dl className="mt-4 grid grid-cols-4 rounded-2xl bg-white/15 py-2.5 text-center">
            {summary.map((item) => (
              <div key={item.label} className="flex flex-col-reverse gap-1">
                <dt className="text-[10px] text-white/80">{item.label}</dt>
                <dd className="text-[18px] font-bold leading-none tabular-nums">{item.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div role="tablist" aria-label="科目" className="mt-5 flex gap-5 overflow-x-auto px-1 [scrollbar-width:none]">
          {report.subjects.map((s) => {
            const active = s.subject === subject.subject
            return (
              <button
                key={s.subject}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSubjectName(s.subject)}
                className={`relative shrink-0 pb-2 text-[15px] transition-colors ${
                  active ? 'font-bold text-[#1F2937]' : 'text-[#8A93A6]'
                }`}
              >
                {s.subject}
                <span className="ml-0.5 text-[12px] tabular-nums">({s.total})</span>
                {active && (
                  <span className="absolute inset-x-2 bottom-0 h-[3px] rounded-full bg-[#1E88F5]" aria-hidden="true" />
                )}
              </button>
            )
          })}
        </div>

        <section className="mt-3 rounded-2xl bg-white p-4 shadow-[0_6px_18px_rgba(30,64,140,0.06)]">
          <h2 className="text-[15px] font-bold text-[#1F2937]">{subject.subject}清零过程</h2>
          <ol className="relative mt-3 flex flex-col">
            {steps.map((step, index) => (
              <li key={step.label} className="relative flex gap-3 pb-4 last:pb-0">
                {index < steps.length - 1 && (
                  <span className="absolute bottom-0 left-[13px] top-7 w-px bg-[#E3E8F0]" aria-hidden="true" />
                )}
                <span
                  className="flex size-[27px] shrink-0 items-center justify-center rounded-full text-[12px] font-bold text-white"
                  style={{ backgroundColor: step.color }}
                  aria-hidden="true"
                >
                  {index + 1}
                </span>
                <div className="flex min-w-0 flex-1 items-center justify-between rounded-xl bg-[#F7F9FC] px-3 py-2.5">
                  <div>
                    <p className="text-[14px] font-semibold text-[#1F2937]">{step.label}</p>
                    <p className="mt-0.5 text-[11px] text-[#8A93A6]">{step.note}</p>
                  </div>
                  <span className="text-[22px] font-bold tabular-nums" style={{ color: step.color }}>
                    {step.value}
                    <span className="ml-0.5 text-[12px] font-normal text-[#8A93A6]">道</span>
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-3 rounded-2xl border border-[#E4E1FF] bg-[#F7F6FF] p-4">
          <p className="flex items-center gap-1.5 text-[14px] font-bold text-[#5B5CF0]">
            <span className="flex size-6 items-center justify-center rounded-lg bg-[#5B5CF0] text-white">
              <Sparkles className="size-3.5" aria-hidden="true" />
            </span>
            AI结论
          </p>
          <p className="mt-2 text-[13px] leading-relaxed text-[#4B5568]">{subject.conclusion}</p>
        </section>
      </div>
    </div>
  )
}
