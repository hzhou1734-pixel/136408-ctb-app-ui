'use client'

import { ImageIcon, RotateCw, X, Zap } from 'lucide-react'

type CameraViewProps = {
  title: string
  onClose: () => void
  onShoot: () => void
}

export function CameraView({ title, onClose, onShoot }: CameraViewProps) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="absolute inset-0 z-50 isolate overflow-hidden text-white"
      style={{ backgroundColor: '#0F1420', containerType: 'size' }}
    >
      {/* Landscape stage: swaps width/height of the portrait container, then rotates 90deg */}
      <div
        className="absolute left-1/2 top-1/2 flex flex-col"
        style={{
          width: '100cqh',
          height: '100cqw',
          transform: 'translate(-50%, -50%) rotate(90deg)',
        }}
      >
        <header className="relative flex h-12 shrink-0 items-center justify-center px-4">
          <button
            type="button"
            onClick={onClose}
            aria-label="关闭拍摄"
            className="absolute left-4 flex size-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
          >
            <X className="size-5" />
          </button>
          <h2 className="text-[16px] font-semibold">{title}</h2>
        </header>

        <div className="flex min-h-0 flex-1 gap-3 pb-4 pl-4 pr-2">
          <div
            className="relative flex min-w-0 flex-1 items-center justify-center overflow-hidden rounded-[20px]"
            style={{ background: 'radial-gradient(circle at 50% 45%, #2A3246 0%, #171C2A 75%)' }}
          >
            <div aria-hidden="true" className="absolute inset-x-14 inset-y-8 rounded-[6px] bg-white/[0.06]">
              <div className="flex h-full flex-col gap-3 p-5">
                {[90, 70, 85, 55, 80, 65].map((w, i) => (
                  <span key={i} className="h-1.5 rounded-full bg-white/10" style={{ width: `${w}%` }} />
                ))}
              </div>
            </div>

            <span aria-hidden="true" className="pointer-events-none absolute inset-4">
              <span className="absolute left-0 top-0 size-8 rounded-tl-[12px] border-l-[3px] border-t-[3px] border-[#5B9BFF]" />
              <span className="absolute right-0 top-0 size-8 rounded-tr-[12px] border-r-[3px] border-t-[3px] border-[#5B9BFF]" />
              <span className="absolute bottom-0 left-0 size-8 rounded-bl-[12px] border-b-[3px] border-l-[3px] border-[#5B9BFF]" />
              <span className="absolute bottom-0 right-0 size-8 rounded-br-[12px] border-b-[3px] border-r-[3px] border-[#5B9BFF]" />
            </span>

            <div
              role="status"
              className="relative flex items-center gap-4 rounded-[18px] bg-[#0F1420]/70 px-5 py-4 backdrop-blur-sm"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#3B6BFF]/25">
                <RotateCw aria-hidden="true" className="size-6 text-[#8DB4FF]" strokeWidth={2} />
              </span>
              <div className="flex flex-col gap-1">
                <p className="text-[17px] font-bold tracking-wide">请横屏拍摄</p>
                <p className="text-[13px] text-white/70">让题干完整落在取景框内</p>
              </div>
            </div>
          </div>

          <div className="flex w-24 shrink-0 flex-col items-center justify-between py-2">
            <span aria-hidden="true" className="flex size-10 items-center justify-center rounded-full bg-white/10">
              <Zap className="size-[18px]" />
            </span>
            <button
              type="button"
              onClick={onShoot}
              aria-label="拍照"
              className="flex size-[68px] items-center justify-center rounded-full bg-white/15 p-1.5 transition-transform active:scale-95"
            >
              <span className="size-full rounded-full bg-white" />
            </button>
            <button
              type="button"
              onClick={onShoot}
              className="flex flex-col items-center gap-1 text-[12px] text-white/70"
            >
              <span className="flex size-10 items-center justify-center rounded-[12px] bg-white/10">
                <ImageIcon aria-hidden="true" className="size-5" />
              </span>
              相册
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
