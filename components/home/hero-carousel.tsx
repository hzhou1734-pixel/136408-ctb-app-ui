'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

const slides = [
  { eyebrow: 'AI precise correction', title: ['AI精准批改', '定位薄弱环节'], tags: ['AI精准批改，即时反馈', '锁定真正薄弱点'] },
  { eyebrow: 'Cross-page capture', title: ['跨页拍题', '一次识别整套试卷'], tags: ['多页连拍，自动拼接', '题目智能切分'] },
  { eyebrow: 'Smart practice', title: ['举一反三', '同类题智能推送'], tags: ['精准匹配知识点', '巩固薄弱题型'] },
  { eyebrow: 'Class insights', title: ['班级错题统计', '学情一目了然'], tags: ['高频错题排行', '一键生成报告'] },
]

export function HeroCarousel() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setActive((i) => (i + 1) % slides.length), 4000)
    return () => clearInterval(timer)
  }, [])

  const slide = slides[active]

  return (
    <section aria-roledescription="carousel" aria-label="活动轮播" className="px-5">
      <div className="relative h-[152px] overflow-hidden rounded-[20px] bg-gradient-to-br from-[#3B82F6] via-[#4F6BFF] to-[#6366F1] shadow-[0_10px_24px_rgba(59,100,246,0.28)]">
        <Image
          src="/images/ai-robot.png"
          alt=""
          fill
          priority
          sizes="400px"
          className="object-cover object-[75%_50%] [mask-image:linear-gradient(to_right,transparent_15%,black_55%)]"
        />
        <div className="pointer-events-none absolute -left-10 -top-16 size-48 rounded-full bg-white/15 blur-2xl" />

        <div key={active} className="relative flex h-full flex-col justify-center gap-2 pl-5 animate-in fade-in slide-in-from-left-2 duration-500">
          <span className="text-[9px] font-medium uppercase tracking-wider text-white/70">{slide.eyebrow}</span>
          <h2 className="text-[21px] font-extrabold leading-[1.2] text-white drop-shadow-sm">
            {slide.title[0]}
            <br />
            {slide.title[1]}
          </h2>
          <div className="flex flex-col items-start gap-1">
            {slide.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-white/40 bg-white/20 px-2 py-0.5 text-[10px] text-white backdrop-blur-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="absolute bottom-2.5 left-1/2 flex -translate-x-1/2 gap-1.5">
          {slides.map((s, i) => (
            <button
              key={s.eyebrow}
              type="button"
              aria-label={`第 ${i + 1} 张`}
              aria-current={i === active}
              onClick={() => setActive(i)}
              className={cn('h-1.5 rounded-full transition-all', i === active ? 'w-4 bg-white' : 'w-1.5 bg-white/50')}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
