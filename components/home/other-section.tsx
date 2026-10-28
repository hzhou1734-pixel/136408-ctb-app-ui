import Image from 'next/image'
import { SectionTitle } from '@/components/home/section-title'

const posters = [
  {
    title: '班级错题统计',
    src: '/images/home/poster-class-stats.png',
    overlay: 'from-[#3B6CF6]/95 via-[#3B6CF6]/70',
  },
  {
    title: '错题清零报告',
    src: '/images/home/poster-clear-report.png',
    overlay: 'from-[#7B5CF0]/95 via-[#7B5CF0]/70',
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
            className="relative flex aspect-[2/1] items-center overflow-hidden rounded-[16px] text-left shadow-[0_4px_16px_rgba(80,110,200,0.12)] transition-transform active:scale-[0.97]"
          >
            <Image src={poster.src} alt="" fill sizes="180px" className="scale-[1.14] object-cover" />
            <span
              aria-hidden="true"
              className={`absolute inset-y-0 left-0 w-[62%] bg-gradient-to-r ${poster.overlay} to-transparent`}
            />
            <span className="relative px-3 text-[15px] font-bold leading-tight text-white [text-shadow:0_1px_3px_rgba(20,30,90,0.45)]">
              {poster.title}
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}
