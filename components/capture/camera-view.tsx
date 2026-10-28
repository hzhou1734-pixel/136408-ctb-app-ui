'use client'

import { Check, ImageIcon, RotateCcw, Smartphone, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

type CameraViewProps = {
  title: string
  onClose: () => void
  onConfirm: (url: string) => void
}

export function CameraView({ title, onClose, onConfirm }: CameraViewProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)
  const galleryInputRef = useRef<HTMLInputElement>(null)
  const [streaming, setStreaming] = useState(false)
  const [photo, setPhoto] = useState<string | null>(null)

  useEffect(() => {
    let stream: MediaStream | null = null
    let cancelled = false
    navigator.mediaDevices
      ?.getUserMedia({ video: { facingMode: 'environment' }, audio: false })
      .then((s) => {
        if (cancelled) return s.getTracks().forEach((t) => t.stop())
        stream = s
        if (videoRef.current) {
          videoRef.current.srcObject = s
          setStreaming(true)
        }
      })
      .catch(() => setStreaming(false))
    return () => {
      cancelled = true
      stream?.getTracks().forEach((t) => t.stop())
    }
  }, [])

  function replacePhoto(url: string | null) {
    setPhoto((prev) => {
      if (prev) URL.revokeObjectURL(prev)
      return url
    })
  }

  function shoot() {
    const video = videoRef.current
    if (!streaming || !video || !video.videoWidth) {
      cameraInputRef.current?.click()
      return
    }
    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    canvas.getContext('2d')?.drawImage(video, 0, 0)
    canvas.toBlob((blob) => blob && replacePhoto(URL.createObjectURL(blob)), 'image/jpeg', 0.92)
  }

  function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (file) replacePhoto(URL.createObjectURL(file))
  }

  function confirm() {
    if (!photo) return
    onConfirm(photo)
  }

  return (
    <div role="dialog" aria-modal="true" aria-label={title} className="absolute inset-0 z-50 flex flex-col bg-[#0F1420] text-white">
      <header className="relative flex h-14 shrink-0 items-center justify-center px-4 pt-2">
        <button
          type="button"
          onClick={onClose}
          aria-label="关闭拍摄"
          className="absolute left-3 flex size-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
        >
          <X className="size-5" />
        </button>
        <h2 className="text-[16px] font-semibold">{title}</h2>
      </header>

      <div className="relative mx-4 mt-2 flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-[20px] bg-[#1A2030]">
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={photo || !streaming ? 'hidden' : 'size-full object-cover'}
        />
        {photo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo} alt={`已拍摄的${title}`} className="size-full object-contain" />
        )}

        {!photo && (
          <>
            <span aria-hidden="true" className="pointer-events-none absolute inset-6">
              <span className="absolute left-0 top-0 size-7 rounded-tl-[12px] border-l-[3px] border-t-[3px] border-[#5B9BFF]" />
              <span className="absolute right-0 top-0 size-7 rounded-tr-[12px] border-r-[3px] border-t-[3px] border-[#5B9BFF]" />
              <span className="absolute bottom-0 left-0 size-7 rounded-bl-[12px] border-b-[3px] border-l-[3px] border-[#5B9BFF]" />
              <span className="absolute bottom-0 right-0 size-7 rounded-br-[12px] border-b-[3px] border-r-[3px] border-[#5B9BFF]" />
            </span>

            <div role="status" className="relative flex flex-col items-center gap-4 px-8 text-center">
              <span className="flex size-16 items-center justify-center rounded-full bg-[#3B6BFF]/20">
                <Smartphone aria-hidden="true" className="size-8 rotate-90 text-[#7FA8FF] motion-safe:animate-pulse" strokeWidth={1.8} />
              </span>
              <p className="rounded-full bg-[linear-gradient(135deg,#3B8BFF,#6B6BFF)] px-5 py-2 text-[15px] font-semibold shadow-[0_6px_18px_rgba(59,107,255,0.35)]">
                请横屏拍摄
              </p>
              <p className="text-[13px] leading-relaxed text-white/70">将手机横置，让题干完整落在取景框内</p>
            </div>
          </>
        )}
      </div>

      <div className="flex h-32 shrink-0 items-center justify-between px-10 pb-4">
        {photo ? (
          <>
            <button type="button" onClick={() => replacePhoto(null)} className="flex w-14 flex-col items-center gap-1 text-[12px] text-white/70">
              <span className="flex size-11 items-center justify-center rounded-full bg-white/10">
                <RotateCcw aria-hidden="true" className="size-5" />
              </span>
              重拍
            </button>
            <button
              type="button"
              onClick={confirm}
              aria-label="使用这张照片"
              className="flex size-[72px] items-center justify-center rounded-full bg-[linear-gradient(135deg,#3B8BFF,#6B6BFF)] shadow-[0_6px_18px_rgba(59,107,255,0.35)] transition-transform active:scale-95"
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
              onClick={shoot}
              aria-label="拍照"
              className="flex size-[72px] items-center justify-center rounded-full bg-white/15 p-1.5 transition-transform active:scale-95"
            >
              <span className="size-full rounded-full bg-white" />
            </button>
            <button type="button" onClick={() => galleryInputRef.current?.click()} className="flex w-14 flex-col items-center gap-1 text-[12px] text-white/70">
              <span className="flex size-11 items-center justify-center rounded-[12px] bg-white/10">
                <ImageIcon aria-hidden="true" className="size-5" />
              </span>
              相册
            </button>
          </>
        )}
        <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" className="sr-only" onChange={handleFile} tabIndex={-1} aria-hidden="true" />
        <input ref={galleryInputRef} type="file" accept="image/*" className="sr-only" onChange={handleFile} tabIndex={-1} aria-hidden="true" />
      </div>
    </div>
  )
}
