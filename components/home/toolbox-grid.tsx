import Image from 'next/image'
import { SectionTitle } from './section-title'

const tools = ['错题拍收', '整理错题', '举一反三', '作业提交', '作业批改', '作文批阅']

export function ToolboxGrid() {
  return (
    <section aria-labelledby="toolbox-title" className="flex flex-col gap-4">
      <SectionTitle id="toolbox-title">老师工具箱</SectionTitle>
      <ul className="grid grid-cols-3 gap-x-3.5 gap-y-3 px-5">
        {tools.map((label, i) => (
          <li key={label}>
            <a
              href="#"
              className="flex aspect-square flex-col items-center justify-center gap-2.5 rounded-[15px] bg-white transition-transform active:scale-95"
            >
              <Image src={`/images/home/tool-${i + 1}.png`} alt="" width={62} height={62} className="size-[46px]" />
              <span className="text-[13px] font-semibold text-[#1F2937]">{label}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
