'use client'

import { Check, ImageIcon, RotateCcw, ScanLine } from 'lucide-react'
import { useRef, useState } from 'react'

export function WholePageCapture() {
  const cameraRef = useRef<HTMLInputElement>(null)
  const galleryRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    if (preview) URL.revokeObjectURL(preview)
    setPreview(URL.createObjectURL(file))
    setSubmitted(false)
  }

  function reset() {
    if (preview) URL.revokeObjectURL(preview)
    setPreview(null)
    setSubmitted(false)
  }

  return (
    <>
      <div className="flex min-h-0 flex-1 flex-col px-5 pb-4 pt-5">
        <div className="relative flex flex-1 items-center justify-center overflow-hidden rounded-[20px] bg-[#1E2433]">
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt="已拍摄的整页题目" className="size-full object-contain" />
          ) : (
            <div className="flex flex-col items-center gap-3 text-center text-white/70">
              <ScanLine aria-hidden="true" className="size-10 text-[#7FA8FF]" strokeWidth={1.6} />
              <p className="text-[14px] font-medium text-white/90">将整页题目放入取景框内</p>
              <p className="text-[12px]">保持纸面平整、光线充足</p>
            </div>
          )}
          <span aria-hidden="true" className="pointer-events-none absolute inset-5">
            <span className="absolute left-0 top-0 size-6 rounded-tl-[10px] border-l-[3px] border-t-[3px] border-[#5B9BFF]" />
            <span className="absolute right-0 top-0 size-6 rounded-tr-[10px] border-r-[3px] border-t-[3px] border-[#5B9BFF]" />
            <span className="absolute bottom-0 left-0 size-6 rounded-bl-[10px] border-b-[3px] border-l-[3px] border-[#5B9BFF]" />
            <span className="absolute bottom-0 right-0 size-6 rounded-br-[10px] border-b-[3px] border-r-[3px] border-[#5B9BFF]" />
          </span>
          {submitted && (
            <p role="status" className="absolute inset-x-6 bottom-8 rounded-full bg-white/95 py-2 text-center text-[13px] font-medium text-[#1F2937]">
              已提交，AI正在识别题目…
            </p>
          )}
        </div>
      </div>

      <div className="flex h-32 items-center justify-between rounded-t-[28px] bg-white px-10 pb-4 shadow-[0_-6px_20px_rgba(70,90,160,0.06)]">
        {preview ? (
          <>
            <button type="button" onClick={reset} className="flex w-14 flex-col items-center gap-1 text-[12px] text-[#6B7280]">
              <span className="flex size-11 items-center justify-center rounded-full bg-[#F2F4F8]">
                <RotateCcw aria-hidden="true" className="size-5 text-[#4B5563]" />
              </span>
              重拍
            </button>
            <button
              type="button"
              onClick={() => setSubmitted(true)}
              disabled={submitted}
              aria-label="确认上传"
              className="flex size-[72px] items-center justify-center rounded-full bg-[linear-gradient(135deg,#3B8BFF,#6B6BFF)] text-white shadow-[0_6px_18px_rgba(59,107,255,0.35)] transition-transform active:scale-95 disabled:opacity-60"
            >
              <Check className="size-8" strokeWidth={2.6} />
            </button>
            <span className="w-14" />
          </>
        ) : (
          <>
            <span className="w-14" />
            <button
              type="button"
              onClick={() => cameraRef.current?.click()}
              aria-label="拍照"
              className="flex size-[72px] items-center justify-center rounded-full bg-[linear-gradient(135deg,#3B8BFF,#6B6BFF)] p-1 shadow-[0_6px_18px_rgba(59,107,255,0.35)] transition-transform active:scale-95"
            >
              <span className="size-full rounded-full border-[3px] border-white bg-white/20" />
            </button>
            <button type="button" onClick={() => galleryRef.current?.click()} className="flex w-14 flex-col items-center gap-1 text-[12px] text-[#6B7280]">
              <span className="flex size-11 items-center justify-center rounded-[12px] bg-[linear-gradient(135deg,#E6EFFF,#EEEBFF)]">
                <ImageIcon aria-hidden="true" className="size-5 text-[#2F6BFF]" />
              </span>
              相册
            </button>
          </>
        )}
        <input ref={cameraRef} type="file" accept="image/*" capture="environment" className="sr-only" onChange={handleFile} tabIndex={-1} aria-hidden="true" />
        <input ref={galleryRef} type="file" accept="image/*" className="sr-only" onChange={handleFile} tabIndex={-1} aria-hidden="true" />
      </div>
    </>
  )
}
