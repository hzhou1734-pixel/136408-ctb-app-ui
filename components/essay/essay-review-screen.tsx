'use client'

import { ChevronLeft, Plus, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { classes, studentsByClass } from '@/lib/grading-data'
import { cn } from '@/lib/utils'

const TITLE_MAX = 20

function ChipGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: string[]
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div role="radiogroup" aria-label={label} className="mt-3 flex items-start gap-3">
      <span className="w-8 shrink-0 pt-1.5 text-[14px] text-[#6B7280]">{label}</span>
      <div className="flex flex-1 flex-wrap gap-2">
        {options.map((opt) => {
          const active = opt === value
          return (
            <button
              key={opt}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(opt)}
              className={cn(
                'h-8 rounded-lg border px-3.5 text-[14px] transition-colors',
                active
                  ? 'border-[#1E88F5] bg-[#EAF4FF] font-medium text-[#1E88F5]'
                  : 'border-transparent bg-[#F6F8FB] text-[#374151] hover:bg-[#EEF2F8]',
              )}
            >
              {opt}
            </button>
          )
        })}
      </div>
    </div>
  )
}
const IMAGE_MAX = 4

type UploadedImage = { id: string; url: string; name: string }

export function EssayReviewScreen() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [images, setImages] = useState<UploadedImage[]>([])
  const [tip, setTip] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [klass, setKlass] = useState(classes[0])
  const [student, setStudent] = useState('')
  const fileInput = useRef<HTMLInputElement>(null)
  const tipTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const imagesRef = useRef(images)
  imagesRef.current = images

  useEffect(
    () => () => {
      clearTimeout(tipTimer.current)
      imagesRef.current.forEach((img) => URL.revokeObjectURL(img.url))
    },
    [],
  )

  function showTip(text: string) {
    clearTimeout(tipTimer.current)
    setTip(text)
    tipTimer.current = setTimeout(() => setTip(null), 1800)
  }

  function handleFiles(files: FileList | null) {
    if (!files) return
    const room = IMAGE_MAX - images.length
    const picked = Array.from(files)
      .filter((f) => f.type.startsWith('image/'))
      .slice(0, room)
      .map((f) => ({ id: `${f.name}-${f.lastModified}-${Math.random()}`, url: URL.createObjectURL(f), name: f.name }))
    if (files.length > room) showTip(`最多上传 ${IMAGE_MAX} 张`)
    setImages((prev) => [...prev, ...picked])
  }

  function removeImage(id: string) {
    setImages((prev) => {
      const target = prev.find((img) => img.id === id)
      if (target) URL.revokeObjectURL(target.url)
      return prev.filter((img) => img.id !== id)
    })
  }

  function selectClass(next: string) {
    setKlass(next)
    setStudent('')
  }

  function handleSubmit() {
    if (!title.trim()) return showTip('请输入作文标题')
    if (images.length === 0) return showTip('请上传作文图片')
    if (!student) return showTip('请选择学生')
    setSubmitting(true)
    showTip('提交成功，正在批改')
    setTimeout(() => router.push('/essay'), 1200)
  }

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <header className="relative flex h-12 shrink-0 items-center justify-center px-4">
        <a
          href="/essay"
          aria-label="返回作文列表"
          className="absolute left-3 flex size-9 items-center justify-center rounded-full text-[#1F2937] transition-colors hover:bg-white/60"
        >
          <ChevronLeft className="size-6" strokeWidth={2.2} />
        </a>
        <h1 className="text-[17px] font-bold text-[#1F2937]">作文批阅</h1>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-10 pt-3 [scrollbar-width:none]">
        <section className="rounded-2xl bg-white px-4 pb-4 pt-4 shadow-[0_4px_14px_rgba(30,64,140,0.05)]">
          <label htmlFor="essay-title" className="flex items-center gap-2">
            <span aria-hidden="true" className="relative flex h-3.5 w-6 shrink-0">
              <span className="absolute left-0 size-3.5 rounded-full bg-[#F7CB4D]" />
              <span className="absolute left-2 size-3.5 rounded-full bg-[#4EA8F7] mix-blend-multiply" />
            </span>
            <span className="text-[17px] font-medium text-[#1F2937]">作文标题</span>
            <span className="text-[13px] tabular-nums text-[#9AA3B2]">
              ({title.length}/{TITLE_MAX})
            </span>
          </label>
          <textarea
            id="essay-title"
            value={title}
            maxLength={TITLE_MAX}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="请输入"
            rows={3}
            className="mt-3 w-full resize-none rounded-xl bg-[#F6F8FB] px-3 py-2.5 text-[15px] text-[#1F2937] outline-none placeholder:text-[#9AA3B2] focus:ring-2 focus:ring-[#1E88F5]/25"
          />

          <h2 className="mt-4 flex flex-wrap items-baseline gap-x-1">
            <span className="text-[17px] font-medium text-[#1F2937]">上传作文图片</span>
            <span className="text-[12px] text-[#9AA3B2]">支持拍照或相册选择，最多 {IMAGE_MAX} 张</span>
          </h2>

          <ul className="mt-3 grid grid-cols-3 gap-2.5">
            {images.map((img, i) => (
              <li key={img.id} className="relative aspect-square overflow-hidden rounded-lg bg-[#F6F8FB]">
                <img src={img.url || '/placeholder.svg'} alt={`作文图片 ${i + 1}`} className="size-full object-cover" />
                <button
                  type="button"
                  aria-label={`删除作文图片 ${i + 1}`}
                  onClick={() => removeImage(img.id)}
                  className="absolute right-1 top-1 flex size-5 items-center justify-center rounded-full bg-black/55 text-white"
                >
                  <X className="size-3" strokeWidth={2.6} />
                </button>
              </li>
            ))}
            {images.length < IMAGE_MAX && (
              <li className="aspect-square">
                <button
                  type="button"
                  onClick={() => fileInput.current?.click()}
                  className="flex size-full flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed border-[#D5DAE3] text-[#9AA3B2] transition-colors hover:border-[#1E88F5] hover:text-[#1E88F5]"
                >
                  <Plus className="size-6" strokeWidth={1.6} aria-hidden="true" />
                  <span className="text-[12px]">添加图片</span>
                </button>
              </li>
            )}
          </ul>
          <input
            ref={fileInput}
            type="file"
            accept="image/*"
            multiple
            className="sr-only"
            tabIndex={-1}
            aria-hidden="true"
            onChange={(e) => {
              handleFiles(e.target.files)
              e.target.value = ''
            }}
          />

          <div className="mt-5 border-t border-[#EEF1F6] pt-4">
            <h2 className="text-[17px] font-medium text-[#1F2937]">班级-学生</h2>
            <ChipGroup label="班级" options={classes} value={klass} onChange={selectClass} />
            <ChipGroup label="学生" options={studentsByClass[klass] ?? []} value={student} onChange={setStudent} />
          </div>
        </section>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={submitting}
          className="mt-6 h-12 w-full rounded-full bg-[linear-gradient(90deg,#4F94F7_0%,#3B7BF5_100%)] text-[17px] font-medium text-white shadow-[0_8px_20px_rgba(59,123,245,0.28)] transition-opacity active:opacity-90 disabled:opacity-70"
        >
          提交批改
        </button>
      </div>

      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none absolute inset-x-0 top-1/2 z-40 flex -translate-y-1/2 justify-center"
      >
        {tip && (
          <span className="rounded-xl bg-[rgba(17,24,39,0.82)] px-4 py-2.5 text-[14px] font-medium text-white shadow-lg animate-in fade-in zoom-in-95 duration-200">
            {tip}
          </span>
        )}
      </div>
    </div>
  )
}
