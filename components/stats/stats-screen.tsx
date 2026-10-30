'use client'
import Link from 'next/link'

import { BookOpen, Camera, ChevronLeft, FileText, Layers, Lightbulb, SlidersHorizontal, Sparkles, Target } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { classes } from '@/lib/grading-data'
import {
  insights,
  overviews,
  periodRanges,
  periods,
  statSubjects,
  subjectCount,
  type ErrorCause,
  type Period,
  type StatSubject,
} from '@/lib/stats-data'
import { StatsFilterSheet, type StatsFilter } from '@/components/stats/stats-filter-sheet'

const causeStyle: Record<ErrorCause, { color: string; bg: string }> = {
  概念不清: { color: '#E5533D', bg: '#FFF1EE' },
  方法不当: { color: '#7B61FF', bg: '#F1EEFF' },
  粗心失误: { color: '#F08A24', bg: '#FFF3E6' },
  审题不清: { color: '#1E88F5', bg: '#EAF4FF' },
}

function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-2xl bg-white p-4 shadow-[0_4px_14px_rgba(30,64,140,0.05)] ${className}`}>{children}</section>
  )
}

function CardTitle({ icon: Icon, children, ai }: { icon: typeof BookOpen; children: ReactNode; ai?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="flex items-center gap-2 text-[16px] font-bold text-[#1F2937]">
        <span className="flex size-6 items-center justify-center rounded-lg bg-[#EAF4FF] text-[#1E88F5]">
          <Icon className="size-3.5" strokeWidth={2.4} aria-hidden="true" />
        </span>
        {children}
      </h2>
      {ai && (
        <span className="flex items-center gap-1 rounded-full bg-[linear-gradient(135deg,#EAF4FF,#F1EEFF)] px-2 py-0.5 text-[11px] font-semibold text-[#5B6CF0]">
          <Sparkles className="size-3" aria-hidden="true" />
          AI分析
        </span>
      )}
    </div>
  )
}

export function StatsScreen({ initialFilterOpen = false }: { initialFilterOpen?: boolean }) {
  const [period, setPeriod] = useState<Period>('本周')
  const [subject, setSubject] = useState<StatSubject>('数学')
  const [filterOpen, setFilterOpen] = useState(initialFilterOpen)
  const [filter, setFilter] = useState<StatsFilter>({ className: classes[0], startDate: '', endDate: '' })

  const customRange = filter.startDate && filter.endDate
  const overview = overviews[period]
  const insight = insights[subject]
  const label = customRange ? '所选时段' : period
  const rangeText = customRange
    ? `${filter.startDate.replaceAll('-', '.')} - ${filter.endDate.replaceAll('-', '.')}`
    : periodRanges[period]

  const overviewItems = [
    { icon: Camera, label: '拍收错题', value: overview.captured, unit: '道', color: '#1E88F5', bg: '#EAF4FF' },
    { icon: FileText, label: '导出错题本', value: overview.exportedBooks, unit: '本', color: '#16A34A', bg: '#E8F8EE' },
    {
      icon: Sparkles,
      label: '导出举一反三',
      value: overview.bankPush + overview.aiPush,
      unit: '本',
      color: '#7B61FF',
      bg: '#F1EEFF',
      detail: `题库推送 ${overview.bankPush} 本 · AI推送 ${overview.aiPush} 本`,
    },
  ]

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <header className="relative flex h-12 shrink-0 items-center justify-center px-4">
        <Link
          href="/"
          aria-label="返回首页"
          className="absolute left-3 flex size-9 items-center justify-center rounded-full text-[#1F2937] transition-colors hover:bg-white/60"
        >
          <ChevronLeft className="size-6" strokeWidth={2.2} />
        </Link>
        <h1 className="text-[17px] font-bold text-[#1F2937]">班级错题统计</h1>
        <button
          type="button"
          aria-haspopup="dialog"
          aria-expanded={filterOpen}
          onClick={() => setFilterOpen(true)}
          className="absolute right-4 flex items-center gap-1 text-[15px] font-semibold text-[#1E88F5]"
        >
          <SlidersHorizontal className="size-4" aria-hidden="true" />
          筛选
        </button>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-8 [scrollbar-width:none]">
        <div className="mt-1 flex items-center justify-between rounded-xl bg-white/70 px-3.5 py-2.5">
          <p className="text-[13px] text-[#8A93A6]">
            当前班级：<span className="font-semibold text-[#1E88F5]">{filter.className}</span>
          </p>
          <p className="text-[12px] tabular-nums text-[#8A93A6]">{rangeText}</p>
        </div>

        <div role="tablist" aria-label="时间段" className="mt-3 flex rounded-full bg-white/70 p-1">
          {periods.map((p) => {
            const active = !customRange && p === period
            return (
              <button
                key={p}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => {
                  setPeriod(p)
                  setFilter((f) => ({ ...f, startDate: '', endDate: '' }))
                }}
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

        <Card className="mt-3">
          <ul className="flex flex-col divide-y divide-[#F0F2F6]">
            {overviewItems.map(({ icon: Icon, ...item }) => (
              <li key={item.label} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                <span
                  className="flex size-11 shrink-0 items-center justify-center rounded-xl"
                  style={{ backgroundColor: item.bg, color: item.color }}
                >
                  <Icon className="size-5" strokeWidth={2.2} aria-hidden="true" />
                </span>
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="text-[15px] font-medium text-[#1F2937]">{item.label}</span>
                  {item.detail && <span className="text-[12px] text-[#8A93A6]">{item.detail}</span>}
                </div>
                <p className="shrink-0 text-[#1F2937]">
                  <span className="text-[24px] font-bold tabular-nums" style={{ color: item.color }}>
                    {item.value}
                  </span>
                  <span className="ml-0.5 text-[13px] text-[#8A93A6]">{item.unit}</span>
                </p>
              </li>
            ))}
          </ul>
        </Card>

        <div role="tablist" aria-label="科目" className="mt-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
          {statSubjects.map((s) => {
            const active = s === subject
            const count = subjectCount(period, s)
            return (
              <button
                key={s}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSubject(s)}
                className={`flex h-14 min-w-[56px] shrink-0 flex-col items-center justify-center rounded-xl px-2 transition-colors ${
                  active ? 'bg-[#1E88F5] text-white shadow-[0_4px_12px_rgba(30,136,242,0.3)]' : 'bg-white text-[#3A4256]'
                }`}
              >
                <span className="text-[14px] font-semibold">{s}</span>
                <span className={`text-[12px] tabular-nums ${active ? 'text-white/85' : 'text-[#8A93A6]'}`}>({count})</span>
              </button>
            )
          })}
        </div>

        {insight && subjectCount(period, subject) > 0 ? (
          <div className="mt-3 flex flex-col gap-3">
            <Card>
              <CardTitle icon={Target} ai>
                {label}知识重难点
              </CardTitle>
              <p className="mt-3 rounded-xl bg-[#F6F9FF] p-3 text-[13px] leading-relaxed text-[#4B5568]">{insight.summary}</p>
              <ul className="mt-3 flex flex-col gap-3">
                {insight.points.map((point, index) => (
                  <li key={point.name} className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-[13px]">
                      <span className="flex items-center gap-2 font-medium text-[#1F2937]">
                        <span
                          className={`flex size-5 items-center justify-center rounded-md text-[11px] font-bold ${
                            index === 0 ? 'bg-[#FFE9E6] text-[#E5533D]' : 'bg-[#F0F2F6] text-[#8A93A6]'
                          }`}
                        >
                          {index + 1}
                        </span>
                        {point.name}
                      </span>
                      <span className="tabular-nums text-[#8A93A6]">
                        {point.errors} 题 · {point.rate}%
                      </span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-[#F0F2F6]">
                      <div
                        className="h-full rounded-full bg-[linear-gradient(90deg,#3DA9FF,#1E88F2)]"
                        style={{ width: `${point.rate}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </Card>

            <Card>
              <CardTitle icon={Lightbulb} ai>
                如何学好{label}知识点？
              </CardTitle>
              <ul className="mt-3 flex flex-col gap-3">
                {insight.tips.map((tip) => (
                  <li key={tip.point} className="flex flex-col gap-2 rounded-xl border border-[#EEF1F6] p-3">
                    <h3 className="text-[14px] font-semibold text-[#1F2937]">{tip.point}</h3>
                    <p className="text-[13px] leading-relaxed text-[#4B5568]">
                      <span className="mr-1.5 rounded bg-[#FFF1EE] px-1.5 py-0.5 text-[11px] font-semibold text-[#E5533D]">
                        常见误区
                      </span>
                      {tip.mistake}
                    </p>
                    <p className="text-[13px] leading-relaxed text-[#4B5568]">
                      <span className="mr-1.5 rounded bg-[#E8F8EE] px-1.5 py-0.5 text-[11px] font-semibold text-[#16A34A]">
                        正确方法
                      </span>
                      {tip.method}
                    </p>
                  </li>
                ))}
              </ul>
            </Card>

            <Card>
              <CardTitle icon={Layers} ai>
                班级错题归因
              </CardTitle>
              <p className="mt-2 text-[12px] text-[#8A93A6]">按知识点分析全班常见错误原因</p>
              <ul className="mt-3 flex flex-col gap-3">
                {insight.attributions.map((item) => (
                  <li key={item.point} className="flex flex-col gap-2.5 rounded-xl border border-[#EEF1F6] p-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-[14px] font-semibold text-[#1F2937]">{item.point}</h3>
                      <span className="text-[12px] tabular-nums text-[#8A93A6]">共 {item.errors} 题</span>
                    </div>
                    <div className="flex h-2 gap-0.5 overflow-hidden rounded-full" aria-hidden="true">
                      {item.causes.map((c) => (
                        <div
                          key={c.cause}
                          className="h-full"
                          style={{ width: `${c.percent}%`, backgroundColor: causeStyle[c.cause].color }}
                        />
                      ))}
                    </div>
                    <ul className="flex flex-col gap-2">
                      {item.causes.map((c) => {
                        const style = causeStyle[c.cause]
                        return (
                          <li key={c.cause} className="flex items-center gap-2 text-[13px]">
                            <span
                              className="shrink-0 rounded px-1.5 py-0.5 text-[11px] font-semibold"
                              style={{ backgroundColor: style.bg, color: style.color }}
                            >
                              {c.cause}
                            </span>
                            <span className="min-w-0 flex-1 truncate text-[#4B5568]">{c.detail}</span>
                            <span className="shrink-0 font-bold tabular-nums" style={{ color: style.color }}>
                              {c.percent}%
                            </span>
                          </li>
                        )
                      })}
                    </ul>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        ) : (
          <Card className="mt-3 flex flex-col items-center gap-2 py-10 text-center">
            <FileText className="size-8 text-[#C5CBD6]" aria-hidden="true" />
            <p className="text-[14px] text-[#8A93A6]">
              {label}暂无{subject}错题记录
            </p>
          </Card>
        )}
      </div>

      {filterOpen && (
        <StatsFilterSheet
          value={filter}
          onClose={() => setFilterOpen(false)}
          onConfirm={(next) => {
            setFilter(next)
            setFilterOpen(false)
          }}
        />
      )}
    </div>
  )
}
