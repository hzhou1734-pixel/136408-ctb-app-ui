import { Camera, FileStack, Lightbulb, NotebookPen, PenLine, ClipboardCheck } from 'lucide-react'
import { FeatureIcon, type IconTone } from './feature-icon'
import { SectionTitle } from './section-title'
import type { LucideIcon } from 'lucide-react'

const tools: { label: string; icon: LucideIcon; tone: IconTone; isNew?: boolean }[] = [
  { label: '错题拍收', icon: Camera, tone: 'green' },
  { label: '错题整理', icon: NotebookPen, tone: 'purple' },
  { label: '举一反三', icon: Lightbulb, tone: 'blue' },
  { label: '作业批改', icon: ClipboardCheck, tone: 'pink' },
  { label: '作文批阅', icon: PenLine, tone: 'indigo' },
  { label: '错题组卷', icon: FileStack, tone: 'orange', isNew: true },
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
              className="relative flex aspect-[1/0.95] flex-col items-center justify-center gap-2.5 rounded-[20px] bg-white shadow-[0_4px_16px_rgba(80,110,200,0.08)] transition-transform active:scale-95"
            >
              {tool.isNew && (
                <span className="absolute right-0 top-0 rounded-bl-xl rounded-tr-[20px] bg-gradient-to-r from-[#FF8A5C] to-[#F2667A] px-2 py-0.5 text-[10px] font-semibold text-white">
                  NEW
                </span>
              )}
              <FeatureIcon icon={tool.icon} tone={tool.tone} />
              <span className="text-[14px] font-medium text-[#1F2937]">{tool.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
