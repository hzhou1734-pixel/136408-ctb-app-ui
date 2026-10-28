import Image from 'next/image'
import { ThumbsUp } from 'lucide-react'

export function HeroCarousel() {
  return (
    <section aria-label="活动横幅" className="px-5">
      <div className="relative h-[172px] overflow-hidden rounded-[20px] bg-gradient-to-br from-[#2F6BFF] via-[#3F6CFF] to-[#5B7BFF] shadow-[0_10px_24px_rgba(59,100,246,0.25)]">
        <Image
          src="/images/ai-robot.png"
          alt=""
          fill
          priority
          sizes="400px"
          className="object-cover object-[75%_50%] [mask-image:linear-gradient(to_right,transparent_15%,black_55%)]"
        />
        <div className="pointer-events-none absolute -left-10 -top-16 size-48 rounded-full bg-white/15 blur-2xl" />

        <span className="absolute left-[50%] top-9 flex size-8 items-center justify-center rounded-full border border-white/60 bg-gradient-to-br from-[#C4B5FD] to-[#7C6CF2] shadow-md">
          <ThumbsUp className="size-4 fill-white text-white" strokeWidth={2} aria-hidden="true" />
        </span>

        <div className="relative flex h-full flex-col justify-center gap-2 pl-6">
          <span className="text-[8px] font-medium text-white/70">AI precise correction</span>
          <h2 className="text-[24px] font-extrabold leading-[1.2] text-white drop-shadow-sm">
            AI精准批改
            <br />
            定位薄弱环节
          </h2>
          <div className="flex flex-col items-start gap-1">
            <span className="rounded-full border border-white/40 bg-white/20 px-2 py-0.5 text-[10px] text-white backdrop-blur-sm">
              AI精准批改，即时反馈
            </span>
            <span className="rounded-full border border-white/40 bg-white/20 px-2 py-0.5 text-[10px] text-white backdrop-blur-sm">
              锁定真正薄弱点
            </span>
          </div>
        </div>

        <span aria-hidden="true" className="absolute bottom-3 left-1/2 h-1.5 w-4 -translate-x-1/2 rounded-full bg-white" />
      </div>
    </section>
  )
}
