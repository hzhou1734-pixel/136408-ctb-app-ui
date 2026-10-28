import Image from 'next/image'
import { SectionTitle } from '@/components/home/section-title'

const posters = [
  {
    title: '班级错题统计',
    desc: '掌握班级薄弱点',
    src: '/images/home/poster-class-stats.png',
  },
  {
    title: '错题清零报告',
    desc: '追踪订正进度',
    src: '/images/home/poster-clear-report.png',
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
            className="relative aspect-[4/3] overflow-hidden rounded-[18px] text-left shadow-[0_4px_16px_rgba(80,110,200,0.12)] transition-transform active:scale-[0.97]"
          >
            <Image src={poster.src} alt="" fill sizes="180px" className="scale-[1.14] object-cover" />
            <span className="relative flex flex-col gap-0.5 p-3">
              <span className="text-[15px] font-bold text-white drop-shadow-sm">{poster.title}</span>
              <span className="text-[11px] text-white/85">{poster.desc}</span>
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}
