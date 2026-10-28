import { BookX, Camera, FilePen, Inbox, Lightbulb, Upload } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { FeatureIcon, type IconTone } from './feature-icon'
import { SectionTitle } from './section-title'

const tools: { label: string; icon: LucideIcon; tone: IconTone }[] = [
  { label: '错题拍收', icon: Camera, tone: 'green' },
  { label: '整理错题', icon: Inbox, tone: 'purple' },
  { label: '举一反三', icon: Lightbulb, tone: 'blue' },
  { label: '作业提交', icon: Upload, tone: 'blue' },
  { label: '作业批改', icon: BookX, tone: 'pink' },
  { label: '作文批阅', icon: FilePen, tone: 'indigo' },
]

export function ToolboxGrid() {
  return (
    <section aria-labelledby="toolbox-title" className="flex flex-col gap-3">
      <SectionTitle id="toolbox-title">老师工具箱</SectionTitle>
      <ul className="grid grid-cols-3 gap-3 px-5">
        {tools.map((tool) => (
          <li key={tool.label}>
            <a
              href="#"
              className="flex aspect-square flex-col items-center justify-center gap-3 rounded-[20px] bg-white shadow-[0_4px_16px_rgba(80,110,200,0.08)] transition-transform active:scale-95"
            >
              <FeatureIcon icon={tool.icon} tone={tool.tone} />
              <span className="text-[15px] font-medium text-[#1F2937]">{tool.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
