import Image from 'next/image'
import { SectionTitle } from '@/components/home/section-title'

const posters = [
  {
    title: '错题统计',
    src: '/images/home/stats-card.png',
    card: 'from-[#E6F3FF] to-white',
  },
  {
    title: '清零报告',
    src: '/images/home/report-card.png',
    card: 'from-[#E6F3FF] to-white',
  },
]

export function OtherSection() {
  return (
    <section aria-labelledby="other-title" className="flex flex-col gap-3">
      <SectionTitle id="other-title">其他</SectionTitle>
      <div className="grid grid-cols-2 gap-3 px-5">
        {posters.map((poster) => (
          <button
            key={poster.title}
            type="button"
            className={`flex h-[84px] items-center justify-between overflow-hidden rounded-[16px] bg-gradient-to-br ${poster.card} pl-4 pr-2 text-left shadow-[0_4px_16px_rgba(80,110,200,0.08)] transition-transform active:scale-[0.97]`}
          >
            <span className="text-[15px] font-bold leading-tight text-[#1F2A4D]">{poster.title}</span>
            <Image
              src={poster.src}
              alt=""
              width={64}
              height={64}
              className="size-16 shrink-0 object-contain"
            />
          </button>
        ))}
      </div>
    </section>
  )
}
