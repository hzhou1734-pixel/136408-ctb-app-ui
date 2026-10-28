'use client'

import { ImagePlus, X } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const parts = ['第一部分', '第二部分', '第三部分']

export function CrossPageCapture() {
  const [images, setImages] = useState<(string | null)[]>([null, null, null])
  const [status, setStatus] = useState<'idle' | 'merging' | 'done'>('idle')
  const uploadedCount = images.filter(Boolean).length
  const canMerge = uploadedCount >= 2 && status !== 'merging'

  function setImage(index: number, url: string | null) {
    setImages((prev) => {
      const next = [...prev]
      if (next[index]) URL.revokeObjectURL(next[index]!)
      next[index] = url
      return next
    })
    setStatus('idle')
  }

  function handleFile(index: number, event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (file) setImage(index, URL.createObjectURL(file))
  }

  function merge() {
    setStatus('merging')
    setTimeout(() => setStatus('done'), 1200)
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <ul className="flex min-h-0 flex-1 flex-col gap-3.5 overflow-y-auto px-5 pb-4 pt-5 [scrollbar-width:none]">
        {parts.map((part, index) => {
          const image = images[index]
          const inputId = `cross-part-${index}`
          return (
            <li key={part} className="relative">
              <label
                htmlFor={inputId}
                className={cn(
                  'flex h-[150px] cursor-pointer items-center justify-center gap-3 overflow-hidden rounded-[15px] bg-white transition-transform active:scale-[0.98]',
                  !image && 'border-[1.5px] border-dashed border-[#C9D6F5]',
                )}
              >
                {image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={image} alt={`题干${part}`} className="size-full object-cover" />
                ) : (
                  <>
                    <span className="flex size-11 items-center justify-center rounded-[12px] bg-[linear-gradient(135deg,#E6EFFF,#EEEBFF)]">
                      <ImagePlus aria-hidden="true" className="size-[22px] text-[#2F6BFF]" />
                    </span>
                    <span className="text-[14px] font-medium text-[#1F2937]">拍摄或上传题干的{part}</span>
                  </>
                )}
              </label>
              <input
                id={inputId}
                type="file"
                accept="image/*"
                capture="environment"
                className="sr-only"
                onChange={(event) => handleFile(index, event)}
              />
              {image && (
                <>
                  <span className="absolute left-3 top-3 rounded-full bg-[#1E2433]/70 px-2.5 py-0.5 text-[12px] text-white">{part}</span>
                  <button
                    type="button"
                    onClick={() => setImage(index, null)}
                    aria-label={`删除${part}`}
                    className="absolute right-3 top-3 flex size-7 items-center justify-center rounded-full bg-[#1E2433]/70 text-white"
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
    </div>
  )
}
