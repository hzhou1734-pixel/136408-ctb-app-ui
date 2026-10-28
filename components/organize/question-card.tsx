import { Trash2 } from 'lucide-react'
import type { Question } from '@/lib/organize-data'
import { cn } from '@/lib/utils'
import { SelectCircle } from './select-circle'

type Props = {
  question: Question
  selected: boolean
  onToggle: () => void
  onDelete: () => void
  resolved?: boolean
  onToggleResolved?: () => void
}

export function QuestionCard({ question, selected, onToggle, onDelete, resolved, onToggleResolved }: Props) {
  const showStatus = resolved !== undefined && onToggleResolved !== undefined

  return (
    <li
      className={cn(
        'relative rounded-[14px] bg-white px-3 pb-3 pt-2 ring-1 transition-shadow',
        selected
          ? 'shadow-[0_6px_16px_rgba(30,136,245,0.14)] ring-[#1E88F5]/50'
          : 'shadow-[0_4px_12px_rgba(70,90,160,0.06)] ring-transparent',
      )}
    >
      <div className="flex items-start gap-1.5 pr-8">
        <button
          type="button"
          role="checkbox"
          aria-checked={selected}
          aria-label={`选择第 ${question.no} 题`}
          onClick={onToggle}
          className="-ml-1 flex size-7 shrink-0 items-center justify-center"
        >
          <SelectCircle checked={selected} />
        </button>
        <button type="button" onClick={onToggle} className="min-w-0 flex-1 pt-1 text-left">
          <p className="line-clamp-2 text-[13px] leading-5 text-[#1F2937]">{question.stem}</p>
        </button>
      </div>

      <button type="button" onClick={onToggle} className="mt-2 block w-full text-left">
        <div className="flex flex-col gap-1.5" aria-hidden="true">
          <span className="h-1.5 w-full rounded-full bg-[#EEF1F7]" />
          <span className="h-1.5 w-3/4 rounded-full bg-[#EEF1F7]" />
        </div>
      </button>

      <div className="mt-2.5 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={onToggle}
          className="inline-flex rounded-md bg-[#FFF1EC] px-1.5 py-0.5 text-[11px] font-medium text-[#F26B4A]"
        >
          {question.tag}
        </button>

        {showStatus && (
          <button
            type="button"
            aria-pressed={resolved}
            aria-label={`第 ${question.no} 题状态：${resolved ? '已解决' : '待解决'}，点击切换`}
            onClick={onToggleResolved}
            className={cn(
              'inline-flex h-6 items-center gap-1 rounded-full px-2.5 text-[11px] font-semibold ring-1 transition-colors',
              resolved
                ? 'bg-[#EAF8F0] text-[#16A34A] ring-[#16A34A]/25 hover:bg-[#DDF3E7]'
                : 'bg-[#FFF6E5] text-[#D97706] ring-[#D97706]/25 hover:bg-[#FFEDCC]',
            )}
          >
            <span
              aria-hidden="true"
              className={cn('size-1.5 rounded-full', resolved ? 'bg-[#16A34A]' : 'bg-[#F59E0B]')}
            />
            {resolved ? '已解决' : '待解决'}
          </button>
        )}
      </div>

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
