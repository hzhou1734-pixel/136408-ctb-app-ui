'use client'

import { Check, CircleCheck } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { students } from '@/lib/organize-data'
import { cn } from '@/lib/utils'

export function Mask({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label="关闭弹窗"
      onClick={onClick}
      className="absolute inset-x-0 bottom-0 top-12 z-40 animate-in fade-in bg-black/45 duration-200"
    />
  )
}

function Sheet({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section
      role="dialog"
      aria-modal="true"
      aria-label={label}
      className="absolute inset-x-0 bottom-0 z-50 animate-in slide-in-from-bottom rounded-t-3xl bg-white px-5 pb-6 pt-5 shadow-[0_-8px_24px_rgba(15,23,42,0.12)] duration-300"
    >
      {children}
    </section>
  )
}

export function StudentSheet({
  initial,
  onConfirm,
  title = '选择学生，导出错题本',
  subtitle,
  answerOption = false,
}: {
  initial: string[]
  onConfirm: (selected: string[], withAnswer: boolean) => void
  title?: string
  subtitle?: React.ReactNode
  answerOption?: boolean
}) {
  const [selected, setSelected] = useState<string[]>(initial)
  const [withAnswer, setWithAnswer] = useState(true)
  const toggle = (name: string) =>
    setSelected((prev) => (prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]))

  return (
    <Sheet label={title}>
      <h2 className="text-center text-[16px] font-bold text-[#1F2937]">{title}</h2>
      {subtitle && <p className="mt-1 text-center text-[12px] text-[#8A93A6]">{subtitle}</p>}
      {answerOption && (
        <div role="radiogroup" aria-label="是否含答案" className="mt-4 flex items-center gap-3">
          <span aria-hidden="true" className="shrink-0 text-[14px] font-medium text-[#374151]">
            是否含答案：
          </span>
          <div className="flex flex-1 gap-2">
            {[
              { value: true, label: '含答案' },
              { value: false, label: '不含答案' },
            ].map((opt) => {
              const active = withAnswer === opt.value
              return (
                <button
                  key={opt.label}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setWithAnswer(opt.value)}
                  className={cn(
                    'h-9 flex-1 rounded-full border text-[13px] font-medium transition-colors',
                    active
                      ? 'border-[#1E88F5] bg-[#EAF4FF] text-[#1E88F5]'
                      : 'border-[#E3E7EF] bg-[#F7F8FC] text-[#374151] hover:border-[#C9D6EA]',
                  )}
                >
                  {opt.label}
                </button>
              )
            })}
          </div>
        </div>
      )}
      <div className="mt-4 grid max-h-[260px] grid-cols-3 gap-2.5 overflow-y-auto [scrollbar-width:none]">
        {students.map((name) => {
          const active = selected.includes(name)
          return (
            <button
              key={name}
              type="button"
              aria-pressed={active}
              onClick={() => toggle(name)}
              className={cn(
                'relative flex h-10 items-center justify-center gap-1.5 overflow-hidden rounded-xl border text-[13px] font-medium transition-colors',
                active
                  ? 'border-[#1E88F5] bg-[#EAF4FF] text-[#1E88F5]'
                  : 'border-[#E3E7EF] bg-[#F7F8FC] text-[#374151] hover:border-[#C9D6EA]',
              )}
            >
              {name}
              {active && (
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 right-0 flex size-4 items-center justify-center rounded-tl-lg bg-[#1E88F5]"
                >
                  <Check className="size-2.5 text-white" strokeWidth={3} />
                </span>
              )}
            </button>
          )
        })}
      </div>
      <button
        type="button"
        disabled={selected.length === 0}
        onClick={() => onConfirm(selected, withAnswer)}
        className="mt-5 h-12 w-full rounded-full bg-[linear-gradient(135deg,#3FA9FF,#1E88F5)] text-[15px] font-bold text-white shadow-[0_8px_20px_rgba(30,136,245,0.3)] transition-opacity disabled:opacity-50 disabled:shadow-none"
      >
        {'确认导出（'}
        {selected.length}
        {'人）'}
      </button>
    </Sheet>
  )
}

export function SuccessDialog({
  count,
  onBack,
  message,
  title = '导出成功',
}: {
  count: number
  onBack: () => void
  message?: React.ReactNode
  title?: string
}) {
  return (
    <div className="absolute inset-x-0 bottom-0 top-12 z-50 flex items-center justify-center px-6">
      <section
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="export-success-title"
        aria-describedby="export-success-desc"
        className="w-full animate-in zoom-in-95 fade-in rounded-3xl bg-white px-5 pb-5 pt-6 text-center shadow-[0_16px_40px_rgba(15,23,42,0.18)] duration-200"
      >
        <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-[#E8F8EE]">
          <CircleCheck className="size-7 text-[#16A34A]" strokeWidth={2.2} aria-hidden="true" />
        </span>
        <h2 id="export-success-title" className="mt-3 text-[17px] font-bold text-[#1F2937]">
          {title}
        </h2>
        <p id="export-success-desc" className="mt-2 text-[14px] text-[#4B5563]">
          {message ?? (
            <>
              {'已完成 '}
              <span className="font-bold text-[#1E88F5]">{count}</span>
              {' 位同学的错题本导出！'}
            </>
          )}
        </p>
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onBack}
            className="h-11 flex-1 rounded-full border border-[#D6DCE6] bg-white text-[15px] font-semibold text-[#374151] transition-colors hover:bg-[#F7F8FC]"
          >
            返回
          </button>
          <Link
            href="/"
            className="flex h-11 flex-1 items-center justify-center rounded-full bg-[linear-gradient(135deg,#3FA9FF,#1E88F5)] text-[15px] font-bold text-white shadow-[0_8px_20px_rgba(30,136,245,0.3)]"
          >
            回到首页
          </Link>
        </div>
      </section>
    </div>
  )
}

const TICK_MS = 250
const COMPLETE_DELAY_MS = 600

export function ProgressSheet({ names, onComplete }: { names: string[]; onComplete: () => void }) {
  const [progress, setProgress] = useState<number[]>(() => names.map(() => 0))
  const allDone = progress.every((p) => p >= 100)

  useEffect(() => {
    if (!allDone) return
    const timer = setTimeout(onComplete, COMPLETE_DELAY_MS)
    return () => clearTimeout(timer)
  }, [allDone, onComplete])

  useEffect(() => {
    if (allDone) return
    const speeds = names.map((_, i) => 4 + ((i * 7) % 9))
    const timer = setInterval(() => {
      setProgress((prev) => prev.map((p, i) => (i > 0 && prev[i - 1] < 30 ? p : Math.min(100, p + speeds[i]))))
    }, TICK_MS)
    return () => clearInterval(timer)
  }, [allDone, names])

  const doneCount = progress.filter((p) => p >= 100).length

  return (
    <Sheet label="导出PDF">
      <h2 className="text-[17px] font-bold text-[#1F2937]">导出PDF</h2>
      <p className="mt-1 text-[12px] text-[#9AA3B2]" aria-live="polite">
        {allDone ? `全部生成完成，共 ${names.length} 份` : `正在生成错题本 ${doneCount}/${names.length}`}
      </p>

      <ul className="mt-4 flex max-h-[260px] flex-col gap-4 overflow-y-auto [scrollbar-width:none]">
        {names.map((name, i) => {
          const value = Math.round(progress[i])
          const done = value >= 100
          return (
            <li key={name} className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-[14px]">
                <span className="flex items-center gap-1.5 font-medium text-[#1F2937]">
                  {name}
                </span>
                {done ? (
                  <span className="flex items-center gap-1 text-[13px] font-semibold text-[#16A34A]">
                    <CircleCheck className="size-4" strokeWidth={2.4} aria-hidden="true" />
                    生成成功
                  </span>
                ) : (
                  <span className="text-[13px] font-semibold tabular-nums text-[#1E88F5]">
                    {value === 0 ? '等待中' : `${value}%`}
                  </span>
                )}
              </div>
              <div
                role="progressbar"
                aria-label={`${name}的生成进度`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={value}
                className="h-2 overflow-hidden rounded-full bg-[#EEF1F7]"
              >
                <div
                  className={cn(
                    'h-full rounded-full transition-[width] duration-300 ease-out',
                    done ? 'bg-[#22C55E]' : 'bg-[linear-gradient(90deg,#3FA9FF,#1E88F5)]',
                  )}
                  style={{ width: `${value}%` }}
                />
              </div>
            </li>
          )
        })}
      </ul>

      <button
        type="button"
        disabled={!allDone}
        onClick={onComplete}
        className="mt-6 h-12 w-full rounded-full bg-[linear-gradient(135deg,#3FA9FF,#1E88F5)] text-[15px] font-bold text-white shadow-[0_8px_20px_rgba(30,136,245,0.3)] transition-opacity disabled:opacity-50 disabled:shadow-none"
      >
        {allDone ? '完成' : '生成中…'}
      </button>
    </Sheet>
  )
}
