import { Mail } from 'lucide-react'

export function HomeHeader() {
  return (
    <header className="flex items-center justify-between px-5 pt-3">
      <div className="flex flex-col gap-1">
        <p className="text-[13px] text-[#8A93A8]">周六好，谭亮老师</p>
        <h1 className="text-[26px] font-bold leading-tight tracking-tight text-[#1E2A5A]">
          Max AI错题宝
        </h1>
      </div>
      <button
        type="button"
        aria-label="消息"
        className="relative flex size-12 items-center justify-center rounded-full bg-white shadow-[0_4px_16px_rgba(80,110,200,0.12)]"
      >
        <span className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-[#5B9BFF] to-[#2F6BFF] shadow-[inset_0_-2px_4px_rgba(0,0,0,0.15)]">
          <Mail className="size-4 text-white" strokeWidth={2.4} aria-hidden="true" />
        </span>
        <span className="absolute right-2.5 top-2.5 size-2.5 rounded-full border-2 border-white bg-[#F2667A]" />
      </button>
    </header>
  )
}
