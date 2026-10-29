'use client'

import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { reportTotals, type ClearReport } from '@/lib/report-data'

export function ReportDetailScreen({ report }: { report: ClearReport }) {
  const [subjectName, setSubjectName] = useState(report.subjects[0]?.subject)
  const totals = reportTotals(report)
  const subject = report.subjects.find((s) => s.subject === subjectName) ?? report.subjects[0]
  const remaining = subject.total - subject.retrained - subject.extended
  const clearRate = Math.round(((subject.retrained + subject.extended) / subject.total) * 100)

  const summary = [
    { label: `${report.period}错题数量`, value: totals.total, color: '#1F2937' },
    { label: '原题重练解决', value: totals.retrained, color: '#1E88F5' },
    { label: '举一反三强化', value: totals.extended, color: '#7B61FF' },
    { label: '剩余错题数量', value: totals.remaining, color: '#E5533D' },
  ]

  const flow = [
    { label: '错题数量', value: subject.total, color: '#1F2937', bg: '#F0F2F6' },
    { label: '原题重练', value: subject.retrained, color: '#1E88F5', bg: '#EAF4FF' },
    { label: '举一反三', value: subject.extended, color: '#7B61FF', bg: '#F1EEFF' },
    { label: '剩余', value: remaining, color: '#E5533D', bg: '#FFF1EE' },
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
        <p className="mt-1 text-center text-[12px] tabular-nums text-[#8A93A6]">发送时间：{report.sentAt}</p>

        <section className="mt-3 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-[#EEF1F6] shadow-[0_4px_14px_rgba(30,64,140,0.05)]">
          {summary.map((item) => (
            <div key={item.label} className="flex flex-col gap-1 bg-white px-4 py-3.5">
              <span className="text-[13px] text-[#8A93A6]">{item.label}</span>
              <span className="text-[26px] font-bold leading-none tabular-nums" style={{ color: item.color }}>
                {item.value}
              </span>
            </div>
          ))}
        </section>

        <div role="tablist" aria-label="科目" className="mt-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
          {report.subjects.map((s) => {
            const active = s.subject === subject.subject
            return (
              <button
                key={s.subject}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSubjectName(s.subject)}
                className={`flex h-14 min-w-[60px] shrink-0 flex-col items-center justify-center rounded-xl px-3 transition-colors ${
                  active ? 'bg-[#1E88F5] text-white shadow-[0_4px_12px_rgba(30,136,242,0.3)]' : 'bg-white text-[#3A4256]'
                }`}
              >
                <span className="text-[14px] font-semibold">{s.subject}</span>
                <span className={`text-[12px] tabular-nums ${active ? 'text-white/85' : 'text-[#8A93A6]'}`}>({s.total})</span>
              </button>
            )
          })}
        </div>

        <section className="mt-3 rounded-2xl bg-white p-4 shadow-[0_4px_14px_rgba(30,64,140,0.05)]">
          <div className="flex items-center justify-between">
            <h2 className="text-[16px] font-bold text-[#1F2937]">{subject.subject}清零进度</h2>
            <span className="text-[13px] text-[#8A93A6]">
              清零率 <span className="font-bold tabular-nums text-[#16A34A]">{clearRate}%</span>
            </span>
          </div>

          <div className="mt-3 flex h-2 gap-0.5 overflow-hidden rounded-full bg-[#F0F2F6]" aria-hidden="true">
            <div className="h-full bg-[#1E88F5]" style={{ width: `${(subject.retrained / subject.total) * 100}%` }} />
            <div className="h-full bg-[#7B61FF]" style={{ width: `${(subject.extended / subject.total) * 100}%` }} />
            <div className="h-full bg-[#E5533D]/70" style={{ width: `${(remaining / subject.total) * 100}%` }} />
          </div>

          <ol className="mt-4 flex items-center">
            {flow.map((step, index) => (
              <li key={step.label} className="flex flex-1 items-center">
                <div
                  className="flex flex-1 flex-col items-center gap-1 rounded-xl py-2.5"
                  style={{ backgroundColor: step.bg }}
                >
                  <span className="text-[20px] font-bold leading-none tabular-nums" style={{ color: step.color }}>
                    {step.value}
                  </span>
                  <span className="text-[11px] text-[#5B6478]">{step.label}</span>
                </div>
                {index < flow.length - 1 && (
                  <ChevronRight className="mx-0.5 size-3.5 shrink-0 text-[#C5CBD6]" aria-hidden="true" />
                )}
              </li>
            ))}
          </ol>

          <div className="mt-4 rounded-xl bg-[linear-gradient(135deg,#F3F8FF,#F6F3FF)] p-3.5">
            <p className="flex items-center gap-1 text-[13px] font-semibold text-[#5B6CF0]">
              <Sparkles className="size-3.5" aria-hidden="true" />
              AI结论
            </p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-[#4B5568]">{subject.conclusion}</p>
          </div>
        </section>
      </div>
    </div>
  )
}
