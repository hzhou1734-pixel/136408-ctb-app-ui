import { ChevronRight, Volume2 } from 'lucide-react'

export function NoticeBar() {
  return (
    <section aria-label="通知公告" className="-mt-2 px-5">
      <a
        href="#"
        className="flex h-11 items-center gap-2.5 rounded-[14px] bg-white/85 pl-3 pr-2.5 shadow-[0_4px_16px_rgba(80,110,200,0.08)] transition-transform active:scale-[0.98]"
      >
        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#4F8BFF,#6A6CF6)]">
          <Volume2 aria-hidden="true" className="size-3.5 text-white" strokeWidth={2.4} />
        </span>
        <span className="shrink-0 rounded-[5px] bg-[#EAF1FF] px-1.5 py-0.5 text-[11px] font-semibold text-[#2F6BFF]">
          公告
        </span>
        <p className="min-w-0 flex-1 truncate text-[13px] text-[#1F2937]">
          跨页拍题功能已经上线，欢迎使用~
        </p>
        <ChevronRight aria-hidden="true" className="size-4 shrink-0 text-[#9CA3AF]" />
      </a>
    </section>
  )
}
