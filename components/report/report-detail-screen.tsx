'use client'

import { ChevronLeft, Download } from 'lucide-react'
import { useCallback, useState } from 'react'
import { Mask, ProgressSheet, SuccessDialog } from '@/components/export/export-sheets'
import { periods, type Period } from '@/lib/stats-data'
import {
  getSubjectStats,
  getTrend,
  reportPeriodLabels,
  stageSubjects,
  type ClearReport,
} from '@/lib/report-data'

function TrendChart({ points, labels }: { points: number[]; labels: string[] }) {
  const width = 320
  const height = 190
  const left = 28
  const right = 12
  const top = 12
  const bottom = 28
  const max = Math.max(10, Math.ceil(Math.max(...points) / 2) * 2)
  const ticks = Array.from({ length: max / 2 + 1 }, (_, i) => i * 2)
  const plotW = width - left - right
  const plotH = height - top - bottom
  const step = plotW / points.length
  const x = (i: number) => left + step * (i + 0.5)
  const y = (v: number) => top + plotH * (1 - v / max)
  const line = points.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i)},${y(v)}`).join(' ')
  const area = `${line} L${x(points.length - 1)},${y(0)} L${x(0)},${y(0)} Z`

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full" role="img" aria-label={`错题数量趋势：${points.map((v, i) => `${labels[i]} ${v}`).join('、')}`}>
      <defs>
        <linearGradient id="trend-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1E88F5" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#1E88F5" stopOpacity="0" />
        </linearGradient>
      </defs>
      {ticks.map((t) => (
        <g key={t}>
          <line x1={left} x2={width - right} y1={y(t)} y2={y(t)} stroke="#EEF1F6" strokeDasharray={t === 0 ? undefined : '3 3'} />
          <text x={left - 8} y={y(t) + 4} textAnchor="end" fontSize="10" fill="#8A93A6">
            {t}
          </text>
        </g>
      ))}
      <path d={area} fill="url(#trend-fill)" />
      <path d={line} fill="none" stroke="#1E88F5" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" />
      {points.map((v, i) => (
        <g key={i}>
          <circle cx={x(i)} cy={y(v)} r="3.5" fill="#FFFFFF" stroke="#1E88F5" strokeWidth="2" />
          <text x={x(i)} y={y(v) - 8} textAnchor="middle" fontSize="10" fontWeight="600" fill="#1E88F5">
            {v}
          </text>
          <text x={x(i)} y={height - 8} textAnchor="middle" fontSize="10" fill="#8A93A6">
            {labels[i]}
          </text>
        </g>
      ))}
    </svg>
  )
}

export function ReportDetailScreen({ report }: { report: ClearReport }) {
  const [period, setPeriod] = useState<Period>(report.period)
  const subjects = stageSubjects[report.stage]
  const [subject, setSubject] = useState(subjects[0])
  const [exportStep, setExportStep] = useState<'progress' | 'done' | null>(null)
  const handleExportComplete = useCallback(() => setExportStep('done'), [])
  const stats = getSubjectStats(report.student, period, subject)
  const trend = getTrend(report.student, period, subject)
  const unit = period.endsWith('周') ? '周' : '月'
  const periodWord = period.slice(0, 1) === '上' ? `上${unit}` : `本${unit}`

  const items = [
    { label: `${periodWord}错题数量`, value: stats.total, color: '#1F2937' },
    { label: '原题重练掌握', value: stats.retrained, color: '#1E88F5' },
    { label: '举一反三强化', value: stats.extended, color: '#7B61FF' },
    { label: '剩余错题数量', value: stats.remaining, color: '#E5533D' },
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
                active ? 'font-bold text-[#1E88F5]' : 'text-[#8A93A6]'
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

      <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-4 [scrollbar-width:none]">
        <p className="mt-3 text-[13px] text-[#5B6478]">
          报告时间：<span className="tabular-nums text-[#1F2937]">{reportPeriodLabels[period]}</span>
        </p>

        <section className="mt-3 rounded-2xl bg-white p-4 shadow-[0_6px_18px_rgba(30,64,140,0.06)]">
          <div role="tablist" aria-label="科目" className="-mx-1 flex gap-1 overflow-x-auto pb-1 [scrollbar-width:none]">
            {subjects.map((s) => {
              const active = s === subject
              const count = getSubjectStats(report.student, period, s).total
              return (
                <button
                  key={s}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSubject(s)}
                  className={`flex min-w-[50px] shrink-0 flex-col items-center gap-0.5 rounded-xl px-2 py-1.5 transition-colors ${
                    active ? 'bg-[#E8F2FF] text-[#1E88F5]' : 'text-[#5B6478]'
                  }`}
                >
                  <span className={`text-[14px] ${active ? 'font-bold' : ''}`}>{s}</span>
                  <span className={`text-[12px] tabular-nums ${active ? '' : 'text-[#8A93A6]'}`}>({count})</span>
                </button>
              )
            })}
          </div>

          <dl className="mt-3 grid grid-cols-2 gap-2.5 border-t border-[#EEF1F6] pt-3">
            {items.map((item) => (
              <div key={item.label} className="flex flex-col-reverse gap-1 rounded-xl bg-[#F7F9FC] px-3 py-2.5">
                <dt className="text-[12px] text-[#8A93A6]">{item.label}</dt>
                <dd className="text-[22px] font-bold leading-none tabular-nums" style={{ color: item.color }}>
                  {item.value}
                  <span className="ml-0.5 text-[12px] font-normal text-[#8A93A6]">道</span>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-3 rounded-2xl bg-white p-4 shadow-[0_6px_18px_rgba(30,64,140,0.06)]">
          <h2 className="text-[15px] font-bold text-[#1F2937]">
            {trend.title}
          </h2>
          <div className="mt-3">
            <TrendChart points={trend.points} labels={trend.labels} />
          </div>
        </section>
      </div>

      <div className="shrink-0 px-4 pb-5 pt-2">
        <button
          type="button"
          onClick={() => setExportStep('progress')}
          className="flex h-12 w-full items-center justify-center gap-1.5 rounded-full bg-[linear-gradient(90deg,#3DA9FF,#1E6FF2)] text-[16px] font-bold text-white shadow-[0_8px_20px_rgba(30,111,242,0.3)] transition-transform active:scale-[0.98]"
        >
          <Download className="size-[18px]" aria-hidden="true" />
          下载{period}错题本
        </button>
      </div>

      {exportStep && <Mask onClick={() => exportStep === 'done' && setExportStep(null)} />}
      {exportStep === 'progress' && (
        <ProgressSheet
          names={[report.student]}
          fileName="原题错题本-语文-曹小明-20260915.pdf"
          onComplete={handleExportComplete}
        />
      )}
      {exportStep === 'done' && (
        <SuccessDialog
          count={1}
          onBack={() => setExportStep(null)}
          message={
            <>
              {'已完成 '}
              <span className="font-bold text-[#1E88F5]">{report.student}</span>
              {` 的${period}错题本导出！`}
            </>
          }
        />
      )}
    </div>
  )
}
