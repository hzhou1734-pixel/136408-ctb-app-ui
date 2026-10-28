import { BarChart3, ChevronRight, FileCheck2 } from 'lucide-react'
import { FeatureIcon } from './feature-icon'
import { SectionTitle } from './section-title'

const items = [
  { label: '班级错题统计', desc: '高频错题 · 学情分析', icon: BarChart3, tone: 'blue' as const, accent: 'from-[#E5F3FE]' },
  { label: '错题清零报告', desc: '订正进度 · 一键导出', icon: FileCheck2, tone: 'green' as const, accent: 'from-[#E6F8EF]' },
]

export function OtherSection() {
  return (
    <section aria-labelledby="other-title" className="flex flex-col gap-3">
      <SectionTitle id="other-title">其他</SectionTitle>
      <ul className="grid grid-cols-2 gap-3 px-5">
        {items.map((item) => (
          <li key={item.label}>
            <a
              href="#"
              className={`relative flex flex-col gap-3 overflow-hidden rounded-[20px] bg-gradient-to-br ${item.accent} to-white to-60% p-4 shadow-[0_4px_16px_rgba(80,110,200,0.08)] transition-transform active:scale-95`}
            >
              <span className="absolute right-3 top-3 rounded-full bg-[#F2667A] px-1.5 py-px text-[10px] font-semibold text-white">
                新
              </span>
              <FeatureIcon icon={item.icon} tone={item.tone} size="sm" />
              <div className="flex items-end justify-between">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[15px] font-semibold text-[#1F2937]">{item.label}</span>
                  <span className="text-[11px] text-[#9CA3AF]">{item.desc}</span>
                </div>
                <ChevronRight className="size-4 text-[#C3C9D6]" aria-hidden="true" />
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
