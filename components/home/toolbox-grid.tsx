import Image from 'next/image'
import { SectionTitle } from './section-title'

const tools = [
  { label: '错题拍收', icon: 'tool-1.png', href: '/capture' },
  { label: '错题整理', icon: 'tool-2.png', href: '#' },
  { label: '举一反三', icon: 'tool-3.png', href: '#' },
  { label: '作业批改', icon: 'tool-5.png', href: '#' },
  { label: '作文批阅', icon: 'tool-6.png', href: '#' },
  { label: '智能组卷', icon: 'tool-7.png', href: '#' },
]

export function ToolboxGrid() {
  return (
    <section aria-labelledby="toolbox-title" className="flex flex-col gap-4">
      <SectionTitle id="toolbox-title">老师工具箱</SectionTitle>
      <ul className="grid grid-cols-3 gap-x-3.5 gap-y-3 px-5">
        {tools.map(({ label, icon, href }) => (
          <li key={label}>
            <a
              href={href}
              className="flex aspect-square flex-col items-center justify-center gap-2.5 rounded-[15px] bg-white transition-transform active:scale-95"
            >
              <Image src={`/images/home/${icon}`} alt="" width={62} height={62} className="size-[46px]" />
              <span className="text-[13px] font-semibold text-[#1F2937]">{label}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
