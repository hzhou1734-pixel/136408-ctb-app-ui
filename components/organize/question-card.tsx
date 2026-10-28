import { Trash2 } from 'lucide-react'
import type { Question } from '@/lib/organize-data'
import { cn } from '@/lib/utils'
import { SelectCircle } from './select-circle'

type Props = {
  question: Question
  selected: boolean
  onToggle: () => void
  onDelete: () => void
}

export function QuestionCard({ question, selected, onToggle, onDelete }: Props) {
  return (
    <li
      className={cn(
        'relative flex items-center gap-2.5 rounded-[14px] bg-white py-3 pl-2.5 pr-9 ring-1 transition-shadow',
        selected
          ? 'shadow-[0_6px_16px_rgba(30,136,245,0.14)] ring-[#1E88F5]/50'
          : 'shadow-[0_4px_12px_rgba(70,90,160,0.06)] ring-transparent',
      )}
    >
      <button
        type="button"
        role="checkbox"
        aria-checked={selected}
        aria-label={`选择第 ${question.no} 题`}
        onClick={onToggle}
        className="flex size-7 shrink-0 items-center justify-center"
      >
        <SelectCircle checked={selected} />
      </button>

      <button type="button" onClick={onToggle} className="block min-w-0 flex-1 text-left">
        <span className="text-[12px] font-semibold text-[#1E88F5]">第 {question.no} 题</span>
        <p className="mt-1 line-clamp-2 text-[13px] leading-5 text-[#1F2937]">{question.stem}</p>
        <div className="mt-2.5 flex flex-col gap-1.5" aria-hidden="true">
          <span className="h-1.5 w-full rounded-full bg-[#EEF1F7]" />
          <span className="h-1.5 w-3/4 rounded-full bg-[#EEF1F7]" />
        </div>
        <span className="mt-2.5 inline-flex rounded-md bg-[#FFF1EC] px-1.5 py-0.5 text-[11px] font-medium text-[#F26B4A]">
          {question.tag}
        </span>
      </button>

      <button
        type="button"
        onClick={onDelete}
        aria-label={`删除第 ${question.no} 题`}
        className="absolute right-1.5 top-1.5 flex size-8 items-center justify-center rounded-full text-[#9AA3B2] transition-colors hover:bg-[#F3F5FA] hover:text-[#F26B4A]"
      >
        <Trash2 className="size-4" />
      </button>
    </li>
  )
}
