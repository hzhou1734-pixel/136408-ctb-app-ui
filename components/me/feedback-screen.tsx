'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { CircleCheck, ImagePlus, X } from 'lucide-react'

const types = ['功能建议', '问题反馈', '内容错误', '其他']
const MAX_LENGTH = 2000
const MAX_IMAGES = 9

type Attachment = { id: string; url: string; name: string }

export function FeedbackScreen() {
  const [type, setType] = useState<string | null>(null)
  const [content, setContent] = useState('')
  const [images, setImages] = useState<Attachment[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const imagesRef = useRef(images)
  imagesRef.current = images

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), 1600)
    return () => clearTimeout(timer)
  }, [toast])

  useEffect(() => () => imagesRef.current.forEach((img) => URL.revokeObjectURL(img.url)), [])

  const addImages = (files: FileList | null) => {
    if (!files) return
    const room = MAX_IMAGES - images.length
    const picked = Array.from(files)
      .filter((file) => file.type.startsWith('image/'))
      .slice(0, room)
    if (files.length > room) setToast(`最多上传${MAX_IMAGES}张图片`)
    setImages((prev) => [
      ...prev,
      ...picked.map((file) => ({ id: crypto.randomUUID(), url: URL.createObjectURL(file), name: file.name })),
    ])
    if (inputRef.current) inputRef.current.value = ''
  }

  const removeImage = (id: string) => {
    setImages((prev) => {
      const target = prev.find((img) => img.id === id)
      if (target) URL.revokeObjectURL(target.url)
      return prev.filter((img) => img.id !== id)
    })
  }

  const submit = () => {
    if (!type) return setToast('请选择反馈类型')
    if (!content.trim()) return setToast('请填写反馈内容')
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex flex-1 flex-col items-center gap-3 px-8 pt-20 text-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-[#EEF4FE] text-[#1E88F2]">
          <CircleCheck className="size-9" aria-hidden="true" />
        </span>
        <h2 className="text-[18px] font-semibold text-[#1F2533]">提交成功</h2>
        <p className="text-pretty text-[14px] leading-relaxed text-[#8A92A3]">
          感谢你的反馈，我们会认真查看并持续改进错题宝。
        </p>
        <Link
          href="/me"
          className="mt-4 flex h-11 w-full items-center justify-center rounded-full bg-[linear-gradient(135deg,#3DA9FF_0%,#1E88F2_100%)] text-[15px] font-semibold text-[#FFFFFF]"
        >
          返回我的
        </Link>
      </div>
    )
  }

  return (
    <div className="relative flex flex-1 flex-col">
      <div className="flex flex-1 flex-col gap-4 px-4 pb-6 pt-2">
        <section aria-labelledby="type-title" className="flex flex-col gap-3 rounded-xl bg-[#FFFFFF] p-4">
          <h2 id="type-title" className="text-[15px] font-semibold text-[#1F2533]">
            反馈类型<span className="text-[#F25C54]">*</span>
          </h2>
          <div role="radiogroup" aria-labelledby="type-title" className="grid grid-cols-4 gap-2">
            {types.map((item) => {
              const active = type === item
              return (
                <button
                  key={item}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setType(item)}
                  className={`h-9 rounded-lg text-[13px] transition-colors ${
                    active
                      ? 'bg-[#EEF4FE] font-medium text-[#1E88F2] ring-1 ring-[#1E88F2]'
                      : 'bg-[#F5F7FB] text-[#5B6478]'
                  }`}
                >
                  {item}
                </button>
              )
            })}
          </div>
        </section>

        <section className="flex flex-col gap-3 rounded-xl bg-[#FFFFFF] p-4">
          <label htmlFor="feedback-content" className="text-[15px] font-semibold text-[#1F2533]">
            反馈内容<span className="text-[#F25C54]">*</span>
          </label>
          <textarea
            id="feedback-content"
            value={content}
            maxLength={MAX_LENGTH}
            onChange={(e) => setContent(e.target.value)}
            placeholder="请详细描述你遇到的问题或建议，我们会认真查看"
            className="h-40 resize-none rounded-lg bg-[#F5F7FB] p-3 text-[14px] leading-relaxed text-[#1F2533] outline-none placeholder:text-[#A0A8B8] focus:ring-1 focus:ring-[#1E88F2]"
          />
          <p className="text-right text-[12px] text-[#A0A8B8]" aria-live="polite">
            {content.length}/{MAX_LENGTH}
          </p>
        </section>

        <section aria-labelledby="image-title" className="flex flex-col gap-3 rounded-xl bg-[#FFFFFF] p-4">
          <div className="flex items-baseline justify-between">
            <h2 id="image-title" className="text-[15px] font-semibold text-[#1F2533]">
              图片附件
            </h2>
            <span className="text-[12px] text-[#A0A8B8]">
              {images.length}/{MAX_IMAGES}
            </span>
          </div>
          <ul className="grid grid-cols-4 gap-2">
            {images.map((img) => (
              <li key={img.id} className="relative aspect-square overflow-hidden rounded-lg bg-[#F5F7FB]">
                {/* eslint-disable-next-line @next/next/no-img-element -- local blob preview */}
                <img src={img.url} alt={img.name} className="size-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(img.id)}
                  aria-label={`删除${img.name}`}
                  className="absolute right-1 top-1 flex size-5 items-center justify-center rounded-full bg-[#1F2533]/60 text-[#FFFFFF]"
                >
                  <X className="size-3" aria-hidden="true" />
                </button>
              </li>
            ))}
            {images.length < MAX_IMAGES && (
              <li>
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="flex aspect-square w-full flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-[#C9D3E3] bg-[#F5F7FB] text-[#8A92A3]"
                >
                  <ImagePlus className="size-5" aria-hidden="true" />
                  <span className="text-[11px]">上传图片</span>
                </button>
              </li>
            )}
          </ul>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="sr-only"
            tabIndex={-1}
            aria-hidden="true"
            onChange={(e) => addImages(e.target.files)}
          />
          <p className="text-[12px] text-[#A0A8B8]">最多可上传{MAX_IMAGES}张图片</p>
        </section>
      </div>

      <div className="sticky bottom-0 bg-[#F5F7FB] px-4 pb-6 pt-2">
        <button
          type="button"
          onClick={submit}
          className="h-11 w-full rounded-full bg-[linear-gradient(135deg,#3DA9FF_0%,#1E88F2_100%)] text-[15px] font-semibold text-[#FFFFFF] shadow-[0_6px_16px_rgba(30,136,242,0.28)] active:opacity-90"
        >
          提交反馈
        </button>
      </div>

      {toast && (
        <div
          role="status"
          className="pointer-events-none absolute left-1/2 top-1/3 z-30 -translate-x-1/2 rounded-lg bg-[#1F2533]/85 px-4 py-2 text-[14px] text-[#FFFFFF]"
        >
          {toast}
        </div>
      )}
    </div>
  )
}
