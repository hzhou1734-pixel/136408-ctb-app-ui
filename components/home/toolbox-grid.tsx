import Image from 'next/image'
import { SectionTitle } from './section-title'

const tools = [
  { label: '错题拍收', icon: 'tool-1.png' },
  { label: '错题整理', icon: 'tool-2.png' },
  { label: '举一反三', icon: 'tool-3.png' },
  { label: '作业批改', icon: 'tool-5.png' },
  { label: '作文批阅', icon: 'tool-6.png' },
  { label: '错题组卷', icon: 'tool-7.png', cropped: true },
]

export function ToolboxGrid() {
  return (
    <section aria-labelledby="toolbox-title" className="flex flex-col gap-4">
      <SectionTitle id="toolbox-title">老师工具箱</SectionTitle>
      <ul className="grid grid-cols-3 gap-x-3.5 gap-y-3 px-5">
        {tools.map(({ label, icon, cropped }) => (
          <li key={label}>
            <a
              href="#"
              className="flex aspect-square flex-col items-center justify-center gap-2.5 rounded-[15px] bg-white transition-transform active:scale-95"
            >
              <span className="relative size-[46px] overflow-hidden">
                <Image
                  src={`/images/home/${icon}`}
                  alt=""
                  width={cropped ? 1024 : 62}
                  height={cropped ? 1024 : 62}
                  className={cropped ? 'size-full scale-[1.55] object-cover' : 'size-full'}
                />
              </span>
              <span className="text-[13px] font-semibold text-[#1F2937]">{label}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
