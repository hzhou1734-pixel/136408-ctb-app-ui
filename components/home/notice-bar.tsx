import { ChevronRight, Megaphone } from 'lucide-react'

export function NoticeBar() {
  return (
    <div className="px-5">
      <a
        href="#"
        className="flex items-center gap-3 rounded-2xl bg-white/90 px-4 py-3 shadow-[0_4px_16px_rgba(80,110,200,0.08)]"
      >
        <span className="flex size-7 shrink-0 items-center justify-center rounded-[10px] bg-gradient-to-br from-[#FFB39E] to-[#FF7E66]">
          <Megaphone className="size-4 text-white" strokeWidth={2.4} aria-hidden="true" />
        </span>
        <span className="rounded-md bg-[#EAF1FF] px-1.5 py-0.5 text-[11px] font-semibold text-[#2F6BFF]">公告</span>
        <p className="flex-1 truncate text-[13px] text-[#1F2937]">跨页拍题功能已经上线，欢迎使用~</p>
        <ChevronRight className="size-4 shrink-0 text-[#9CA3AF]" aria-hidden="true" />
      </a>
    </div>
  )
}
