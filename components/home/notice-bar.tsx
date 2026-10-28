import { ChevronRight, Volume2 } from 'lucide-react'

export function NoticeBar() {
  return (
    <section aria-label="通知公告" className="-mt-2 px-5">
      <a
        href="#"
        className="flex h-12 items-center gap-3 rounded-[15px] bg-white pl-2.5 pr-3 transition-transform active:scale-[0.98]"
      >
        <span className="flex size-8 shrink-0 items-center justify-center rounded-[10px] bg-[linear-gradient(135deg,#E6EFFF,#EEEBFF)]">
          <Volume2 aria-hidden="true" className="size-[18px] text-[#2F6BFF]" strokeWidth={2.2} />
        </span>
        <p className="min-w-0 flex-1 truncate text-[13px] font-medium text-[#1F2937]">
          跨页拍题功能已经上线，欢迎使用~
        </p>
        <ChevronRight aria-hidden="true" className="size-4 shrink-0 text-[#B4BAC6]" />
      </a>
    </section>
  )
}
