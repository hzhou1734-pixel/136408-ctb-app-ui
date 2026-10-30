'use client'

import { Camera, Check, Info, RotateCcw, X } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { CameraView } from './camera-view'

const parts = [
  { name: '第一部分', hint: '拍摄题干开头所在页', required: true },
  { name: '第二部分', hint: '拍摄题干接续所在页', required: true },
  { name: '第三部分', hint: '题目较长时补充拍摄', required: false },
]

export function CrossPageCapture() {
  const [captured, setCaptured] = useState<boolean[]>([false, false, false])
  const [status, setStatus] = useState<'idle' | 'merging' | 'done'>('idle')
  const [shootingIndex, setShootingIndex] = useState<number | null>(null)
  const uploadedCount = captured.filter(Boolean).length
  const canMerge = uploadedCount >= 2 && status !== 'merging'
  const nextIndex = captured.findIndex((v) => !v)

  function setPart(index: number, value: boolean) {
    setCaptured((prev) => prev.map((v, i) => (i === index ? value : v)))
    setStatus('idle')
  }

  function merge() {
    setStatus('merging')
    setTimeout(() => setStatus('done'), 1200)
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-5 pb-4 pt-5 [scrollbar-width:none]">
        <p className="flex items-start gap-2 rounded-[12px] bg-white/70 px-3.5 py-2.5 text-[13px] leading-relaxed text-[#5B6478]">
          <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-[#1E88F5]" />
          题目跨页时，按顺序分段拍摄，AI 会自动拼接成完整题目
        </p>

        <ol className="flex flex-col">
          {parts.map((part, index) => {
            const done = captured[index]
            const active = index === nextIndex
            const isLast = index === parts.length - 1
            return (
              <li key={part.name} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <span
                    className={cn(
                      'flex size-7 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold',
                      done
                        ? 'bg-[#1E88F5] text-white'
                        : active
                          ? 'border-2 border-[#1E88F5] bg-white text-[#1E88F5]'
                          : 'border-2 border-[#D5DEF3] bg-white text-[#A0A9BC]',
                    )}
                  >
                    {done ? <Check aria-hidden="true" className="size-4" strokeWidth={3} /> : index + 1}
                  </span>
                  {!isLast && (
                    <span
                      aria-hidden="true"
                      className={cn('my-1 w-0.5 flex-1 rounded-full', done ? 'bg-[#1E88F5]' : 'bg-[#D5DEF3]')}
                    />
                  )}
                </div>

                <div className={cn('flex min-w-0 flex-1 flex-col gap-2', !isLast && 'pb-5')}>
                  <div className="flex h-7 items-center justify-between">
                    <span className="text-[15px] font-semibold text-[#1F2937]">
                      题干{part.name}
                    </span>
                    <span
                      className={cn(
                        'rounded-full px-2 py-0.5 text-[11px] font-medium',
                        part.required ? 'bg-[#E6F3FF] text-[#1E88F5]' : 'bg-[#EEF1F6] text-[#8A93A6]',
                      )}
                    >
                      {part.required ? '必拍' : '选拍'}
                    </span>
                  </div>

                  {done ? (
                    <div className="relative h-[104px] overflow-hidden rounded-[14px] bg-white shadow-[0_4px_14px_rgba(30,64,140,0.06)]">
                      <span className="flex size-full flex-col gap-2.5 bg-[linear-gradient(135deg,#F4F7FF,#F0F8FF)] px-5 py-5">
                        {[92, 78, 86, 60].map((w, i) => (
                          <span key={i} className="h-2 rounded-full bg-[#D5DEF3]" style={{ width: `${w}%` }} />
                        ))}
                      </span>
                      <div className="absolute bottom-2.5 right-2.5 flex gap-2">
                        <button
                          type="button"
                          onClick={() => setShootingIndex(index)}
                          aria-label={`重新拍摄题干${part.name}`}
                          className="flex h-7 items-center gap-1 rounded-full bg-[#1E2433]/65 px-2.5 text-[12px] text-white"
                        >
                          <RotateCcw aria-hidden="true" className="size-3.5" />
                          重拍
                        </button>
                        <button
                          type="button"
                          onClick={() => setPart(index, false)}
                          aria-label={`删除题干${part.name}`}
                          className="flex size-7 items-center justify-center rounded-full bg-[#1E2433]/65 text-white"
                        >
                          <X aria-hidden="true" className="size-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShootingIndex(index)}
                      aria-label={`拍摄或上传题干${part.name}`}
                      className={cn(
                        'flex h-[104px] w-full items-center gap-3.5 rounded-[14px] border-[1.5px] border-dashed bg-white px-4 text-left transition-transform active:scale-[0.98]',
                        active ? 'border-[#8EC3FA]' : 'border-[#D5DEF3]',
                      )}
                    >
                      <span
                        className={cn(
                          'flex size-12 shrink-0 items-center justify-center rounded-[13px]',
                          active ? 'bg-[linear-gradient(135deg,#3FA9FF,#1E88F5)] text-white' : 'bg-[#EEF4FF] text-[#1E88F5]',
                        )}
                      >
                        <Camera aria-hidden="true" className="size-[22px]" />
                      </span>
                      <span className="flex min-w-0 flex-col gap-1">
                        <span className="text-[14px] font-medium text-[#1F2937]">点击拍摄或上传</span>
                        <span className="text-[12px] text-[#8A93A6]">{part.hint}</span>
                      </span>
                    </button>
                  )}
                </div>
              </li>
            )
          })}
        </ol>
      </div>

      <div className="flex flex-col gap-3 border-t border-[#E3E9F5] bg-white/80 px-5 pb-8 pt-3.5 backdrop-blur">
        <div className="flex items-center justify-between gap-3">
          <p role="status" className="text-[13px] text-[#5B6478]">
            {status === 'done' ? (
              '拼接完成，AI 正在识别题目…'
            ) : status === 'merging' ? (
              '正在拼接题目…'
            ) : (
              <>
                已拍 <span className="font-semibold text-[#1E88F5]">{uploadedCount}</span>/3
                <span className="text-[#8A93A6]">，至少 2 部分可拼接</span>
              </>
            )}
          </p>
          <div aria-hidden="true" className="flex gap-1">
            {captured.map((v, i) => (
              <span key={i} className={cn('h-1.5 w-6 rounded-full', v ? 'bg-[#1E88F5]' : 'bg-[#D5DEF3]')} />
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={merge}
          disabled={!canMerge}
          className="h-12 w-full rounded-full bg-[linear-gradient(135deg,#3FA9FF,#1E88F5)] text-[16px] font-semibold text-white shadow-[0_6px_18px_rgba(30,136,245,0.3)] transition-transform active:scale-[0.98] disabled:bg-none disabled:bg-[#C9D6F5] disabled:shadow-none"
        >
          {status === 'merging' ? '拼接中…' : '拼接题目'}
        </button>
      </div>

      {shootingIndex !== null && (
        <CameraView
          title={`拍摄题干${parts[shootingIndex].name}`}
          onClose={() => setShootingIndex(null)}
          onShoot={() => {
            setPart(shootingIndex, true)
            setShootingIndex(null)
          }}
        />
      )}
    </div>
  )
}
