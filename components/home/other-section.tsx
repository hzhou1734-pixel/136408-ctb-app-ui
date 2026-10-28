import Image from 'next/image'
import { ChevronRight } from 'lucide-react'
import { SectionTitle } from '@/components/home/section-title'

const posters = [
  {
    title: '错题统计',
    src: '/images/home/illus-stats-v4.png',
    card: 'from-[#E6EEFF] to-white',
    arrow: 'bg-[#3B6CF6]',
  },
  {
    title: '清零报告',
    src: '/images/home/illus-report-v4.png',
    card: 'from-[#EFE8FF] to-white',
    arrow: 'bg-[#7B5CF0]',
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
            className={`relative flex h-[84px] items-center justify-between overflow-hidden rounded-[16px] bg-gradient-to-br ${poster.card} pl-3.5 pr-1 text-left shadow-[0_4px_16px_rgba(80,110,200,0.08)] transition-transform active:scale-[0.97]`}
          >
            <span className="flex flex-col items-start gap-2">
              <span className="text-[15px] font-bold leading-tight text-[#1F2A4D]">{poster.title}</span>
              <span
                aria-hidden="true"
                className={`flex size-5 items-center justify-center rounded-full ${poster.arrow} text-white`}
              >
                <ChevronRight className="size-3.5" strokeWidth={2.5} />
              </span>
            </span>
            <span className="relative size-[64px] shrink-0 overflow-hidden mix-blend-multiply">
              <Image src={poster.src} alt="" fill sizes="60px" className="scale-[1.3] object-cover" />
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}
