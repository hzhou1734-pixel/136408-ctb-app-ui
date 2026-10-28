import { Bell } from 'lucide-react'

export function HomeHeader() {
  return (
    <header className="flex items-start justify-between px-5 pt-4">
      <div className="flex flex-col gap-1">
        <p className="text-[14px] text-[#6B7280]">周六好, 谭亮老师</p>
        <h1 className="text-[28px] font-bold leading-tight tracking-tight text-[#1E2A5A]">MaxAI错题宝</h1>
      </div>
      <button
        type="button"
        aria-label="消息通知"
        className="mt-1 flex size-14 items-center justify-center rounded-full bg-white shadow-[0_4px_16px_rgba(80,110,200,0.12)]"
      >
        <Bell
          className="size-7 fill-[#FFB020] text-[#F59E0B] drop-shadow-[0_2px_2px_rgba(245,158,11,0.35)]"
          strokeWidth={1.6}
          aria-hidden="true"
        />
      </button>
    </header>
  )
}
