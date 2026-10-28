import Image from 'next/image'

export function HomeHeader() {
  return (
    <header className="flex items-center justify-between px-5 pt-3">
      <div className="flex flex-col gap-1">
        <p className="text-[13px] text-[#6B7280]">周六好, 谭亮老师</p>
        <h1 className="text-[24px] font-bold leading-tight text-[#1E2A5A]">MaxAI错题宝</h1>
      </div>
      <button type="button" aria-label="消息通知" className="size-11 overflow-hidden rounded-full">
        <Image src="/images/home/bell.png" alt="" width={60} height={60} className="size-full" />
      </button>
    </header>
  )
}
