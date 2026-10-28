'use client'

import { ChevronDown, ChevronLeft, Minus, Plus, Sparkles, Trash2 } from 'lucide-react'
import { useState } from 'react'
import type { Question } from '@/lib/organize-data'
import { cn } from '@/lib/utils'

type Layout = 'single' | 'double'

type Props = {
  student: string
  subject: string
  date: string
  questions: Question[]
}

export function ExportScreen({ student, subject, date, questions }: Props) {
  const [items, setItems] = useState(() => questions.map((q) => ({ ...q, lines: 4 })))
  const [layout, setLayout] = useState<Layout>('double')
  const [numbered, setNumbered] = useState(true)
  const [panelOpen, setPanelOpen] = useState(true)

  const setLines = (id: string, delta: number) =>
    setItems((prev) =>
      prev.map((q) => (q.id === id ? { ...q, lines: Math.min(12, Math.max(0, q.lines + delta)) } : q)),
    )
  const remove = (id: string) => setItems((prev) => prev.filter((q) => q.id !== id))

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <header className="relative flex h-12 shrink-0 items-center justify-center px-4">
        <a
          href="/organize"
          aria-label="返回错题整理"
          className="absolute left-3 flex size-9 items-center justify-center rounded-full text-[#1F2937] transition-colors hover:bg-white/60"
        >
          <ChevronLeft className="size-6" strokeWidth={2.2} />
        </a>
        <h1 className="text-[17px] font-bold text-[#1F2937]">设置及排版</h1>
      </header>

      <div className="mt-1 min-h-0 flex-1 overflow-y-auto border-t-[6px] border-[#F1F3F7] bg-white [scrollbar-width:none]">
        <article aria-label="错题本预览" className={cn('px-4 pt-4', panelOpen ? 'pb-72' : 'pb-28')}>
          <div className="flex items-center gap-3 border-b border-[#EEF1F7] pb-3 text-[12px] text-[#4B5563]">
            <span className="flex shrink-0 items-center gap-1" aria-label="Max AI错题宝">
              <span
                aria-hidden="true"
                className="flex size-5 items-center justify-center rounded-[5px] bg-[linear-gradient(135deg,#3FA9FF,#1E88F5)]"
              >
                <Sparkles className="size-3 text-white" strokeWidth={2.4} />
              </span>
              <span aria-hidden="true" className="flex flex-col leading-none">
                <span className="text-[8px] font-bold text-[#1E88F5]">Max AI</span>
                <span className="mt-0.5 text-[7px] font-medium text-[#5B9BEA]">错题宝</span>
              </span>
            </span>
            <span className="truncate">姓名：{student}</span>
            <span className="truncate">学科：{subject}</span>
            <span className="ml-auto shrink-0">日期：{date}</span>
          </div>

          {items.length === 0 ? (
            <p className="py-16 text-center text-[13px] text-[#9AA3B2]">没有可导出的题目</p>
          ) : (
            <ol className={cn('grid', layout === 'double' ? 'grid-cols-2 gap-x-3' : 'grid-cols-1')}>
              {items.map((q, i) => (
                <li key={q.id} className="flex flex-col border-b border-[#EEF1F7] py-3">
                  <div className="flex gap-1.5 text-[12px] leading-5 text-[#1F2937]">
                    {numbered && <span className="shrink-0 font-semibold">{i + 1}、</span>}
                    <p className="min-w-0 break-words">{q.stem}</p>
                  </div>

                  <div aria-hidden="true" style={{ height: q.lines * 14 }} />

                  <div className="mt-2 flex flex-col gap-1.5">
                    <span className="text-[11px] text-[#6B7280]">答题区域：</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        aria-label="减少答题区域"
                        onClick={() => setLines(q.id, -1)}
                        className="flex size-6 items-center justify-center rounded-md border border-[#E3E7EF] text-[#4B5563] hover:bg-[#F7F8FC]"
                      >
                        <Minus className="size-3" />
                      </button>
                      <span
                        aria-live="polite"
                        className="flex h-6 w-9 items-center justify-center rounded-md border border-[#E3E7EF] text-[12px] text-[#1F2937]"
                      >
                        {q.lines}
                      </span>
                      <button
                        type="button"
                        aria-label="增加答题区域"
                        onClick={() => setLines(q.id, 1)}
                        className="flex size-6 items-center justify-center rounded-md border border-[#E3E7EF] text-[#4B5563] hover:bg-[#F7F8FC]"
                      >
                        <Plus className="size-3" />
                      </button>
                      <button
                        type="button"
                        aria-label="删除该题"
                        onClick={() => remove(q.id)}
                        className="ml-auto flex size-6 items-center justify-center rounded-md bg-[#374151] text-white hover:bg-[#1F2937]"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </article>
      </div>

      <section
        aria-label="排版格式设置"
        className="absolute inset-x-0 bottom-0 z-30 rounded-t-3xl bg-[#EAF4FF] px-5 pb-6 pt-4 shadow-[0_-8px_24px_rgba(40,80,160,0.12)]"
      >
        <button
          type="button"
          aria-expanded={panelOpen}
          onClick={() => setPanelOpen((o) => !o)}
          className="mx-auto flex items-center gap-1 text-[15px] font-bold text-[#1F2937]"
        >
          排版格式设置
          <ChevronDown className={cn('size-4 transition-transform', !panelOpen && 'rotate-180')} strokeWidth={2.4} />
        </button>

        {panelOpen && (
          <div className="mt-4 flex flex-col gap-4">
            <RadioRow
              label="排版格式"
              name="layout"
              value={layout}
              onChange={setLayout}
              options={[
                { value: 'single', label: '横向单列' },
                { value: 'double', label: '竖向双列' },
              ]}
            />
            <RadioRow
              label="题目序号"
              name="numbered"
              value={numbered ? 'yes' : 'no'}
              onChange={(v) => setNumbered(v === 'yes')}
              options={[
                { value: 'yes', label: '有题序' },
                { value: 'no', label: '无题序' },
              ]}
            />
          </div>
        )}

        <button
          type="button"
          disabled={items.length === 0}
          onClick={() => window.print()}
          className="mt-5 h-12 w-full rounded-full bg-[linear-gradient(135deg,#3FA9FF,#1E88F5)] text-[15px] font-bold text-white shadow-[0_8px_20px_rgba(30,136,245,0.3)] transition-opacity disabled:opacity-50 disabled:shadow-none"
        >
          导出生成PDF文件
        </button>
      </section>
    </div>
  )
}

function RadioRow<T extends string>({
  label,
  name,
  value,
  onChange,
  options,
}: {
  label: string
  name: string
  value: T
  onChange: (v: T) => void
  options: { value: T; label: string }[]
}) {
  return (
    <fieldset className="flex items-center gap-4">
      <legend className="sr-only">{label}</legend>
      <span aria-hidden="true" className="w-16 shrink-0 text-[14px] text-[#374151]">
        {label}：
      </span>
      {options.map((o) => {
        const checked = o.value === value
        return (
          <label key={o.value} className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              name={name}
              value={o.value}
              checked={checked}
              onChange={() => onChange(o.value)}
              className="peer sr-only"
            />
            <span
              aria-hidden="true"
              className={cn(
                'flex size-[18px] items-center justify-center rounded-full border-2 transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-[#1E88F5]/40',
                checked ? 'border-[#1E88F5]' : 'border-[#C9CFDA]',
              )}
            >
              {checked && <span className="size-2 rounded-full bg-[#1E88F5]" />}
            </span>
            <span className={cn('text-[14px]', checked ? 'text-[#1E88F5]' : 'text-[#4B5563]')}>{o.label}</span>
          </label>
        )
      })}
    </fieldset>
  )
}
