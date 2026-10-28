'use client'

import { CheckCircle2, ImagePlus, X } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { CameraView } from './camera-view'

const parts = ['第一部分', '第二部分', '第三部分']

export function CrossPageCapture() {
  const [captured, setCaptured] = useState<boolean[]>([false, false, false])
  const [status, setStatus] = useState<'idle' | 'merging' | 'done'>('idle')
  const [shootingIndex, setShootingIndex] = useState<number | null>(null)
  const uploadedCount = captured.filter(Boolean).length
  const canMerge = uploadedCount >= 2 && status !== 'merging'

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
      <ul className="flex min-h-0 flex-1 flex-col gap-3.5 overflow-y-auto px-5 pb-4 pt-5 [scrollbar-width:none]">
        {parts.map((part, index) => {
          const done = captured[index]
          return (
            <li key={part} className="relative">
              <button
                type="button"
                onClick={() => setShootingIndex(index)}
                aria-label={done ? `重新拍摄题干${part}` : `拍摄或上传题干的${part}`}
                className={cn(
                  'flex h-[150px] w-full items-center justify-center gap-3 overflow-hidden rounded-[15px] bg-white transition-transform active:scale-[0.98]',
                  !done && 'border-[1.5px] border-dashed border-[#C9D6F5]',
                )}
              >
                {done ? (
                  <span className="flex size-full flex-col gap-2.5 bg-[linear-gradient(135deg,#F4F7FF,#F3F1FF)] px-6 pb-5 pt-12">
                    {[92, 78, 86, 60].map((w, i) => (
                      <span key={i} className="h-2 rounded-full bg-[#D5DEF3]" style={{ width: `${w}%` }} />
                    ))}
                  </span>
                ) : (
                  <>
                    <span className="flex size-11 items-center justify-center rounded-[12px] bg-[linear-gradient(135deg,#E6EFFF,#EEEBFF)]">
                      <ImagePlus aria-hidden="true" className="size-[22px] text-[#2F6BFF]" />
                    </span>
                    <span className="text-[14px] font-medium text-[#1F2937]">拍摄或上传题干的{part}</span>
                  </>
                )}
              </button>
              {done && (
                <>
                  <span className="pointer-events-none absolute left-3 top-3 flex items-center gap-1 rounded-full bg-[#2F6BFF] px-2.5 py-0.5 text-[12px] text-white">
                    <CheckCircle2 aria-hidden="true" className="size-3.5" />
                    {part}已拍摄
                  </span>
                  <button
                    type="button"
                    onClick={() => setPart(index, false)}
                    aria-label={`删除${part}`}
                    className="absolute right-3 top-3 flex size-7 items-center justify-center rounded-full bg-[#1E2433]/60 text-white"
                  >
                    <X className="size-4" />
                  </button>
                </>
              )}
            </li>
          )
        })}
      </ul>

      <div className="flex flex-col items-center gap-2 px-5 pb-8 pt-2">
        <p role="status" className="text-[12px] text-[#8A93A6]">
          {status === 'done'
            ? '拼接完成，AI正在识别题目…'
            : status === 'merging'
              ? '正在拼接题目…'
              : `已上传 ${uploadedCount}/3，至少上传两部分即可拼接`}
        </p>
        <button
          type="button"
          onClick={merge}
          disabled={!canMerge}
          className="h-12 w-48 rounded-full bg-[linear-gradient(135deg,#3B8BFF,#6B6BFF)] text-[16px] font-semibold text-white shadow-[0_6px_18px_rgba(59,107,255,0.3)] transition-transform active:scale-95 disabled:opacity-50 disabled:shadow-none"
        >
          {status === 'merging' ? '拼接中…' : '拼接题目'}
        </button>
      </div>

      {shootingIndex !== null && (
        <CameraView
          title={`拍摄题干${parts[shootingIndex]}`}
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
