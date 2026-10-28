import { Check, Trash2 } from 'lucide-react'
import type { Difficulty, Question } from '@/lib/organize-data'
import { cn } from '@/lib/utils'

const difficultyStyles: Record<Difficulty, string> = {
  简单: 'bg-[#E8F7F5] text-[#0F9D8A]',
  中等: 'bg-[#FFF3E8] text-[#E07B1F]',
  困难: 'bg-[#FFECEC] text-[#E5484D]',
}

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
        'relative rounded-[14px] px-3 pb-3 pt-2.5 transition-all',
        selected
          ? 'bg-[#EEF6FF] shadow-[0_6px_16px_rgba(30,136,245,0.16)] ring-2 ring-[#1E88F5]'
          : 'bg-white shadow-[0_4px_12px_rgba(70,90,160,0.06)] ring-1 ring-transparent',
      )}
    >
      <button
        type="button"
        role="checkbox"
        aria-checked={selected}
        aria-label={`选择第 ${question.no} 题：${question.stem}`}
        onClick={onToggle}
        className="absolute inset-0 z-0 rounded-[14px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E88F5] focus-visible:ring-offset-2"
      />

      {selected && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 right-0 z-10 flex h-6 w-7 items-center justify-center rounded-br-[12px] rounded-tl-[12px] bg-[#1E88F5] text-white"
        >
          <Check className="size-3.5" strokeWidth={3} />
        </span>
      )}

      <div className="pointer-events-none relative pr-7">
        <p className="line-clamp-2 text-[13px] leading-5 text-[#1F2937]">{question.stem}</p>

        <div className="mt-2 flex flex-col gap-1.5" aria-hidden="true">
          <span className={cn('h-1.5 w-full rounded-full', selected ? 'bg-[#DCEBFB]' : 'bg-[#EEF1F7]')} />
          <span className={cn('h-1.5 w-3/4 rounded-full', selected ? 'bg-[#DCEBFB]' : 'bg-[#EEF1F7]')} />
        </div>
      </div>

      <div
        className={cn(
          'pointer-events-none relative mt-2.5 flex items-center justify-between gap-2',
          selected && 'pr-6',
        )}
      >
        <span
          className={cn(
            'inline-flex rounded-md px-1.5 py-0.5 text-[11px] font-medium',
            difficultyStyles[question.difficulty],
          )}
        >
          {question.difficulty}
        </span>

        {showStatus && !selected && (
          <button
            type="button"
            aria-pressed={resolved}
            aria-label={`第 ${question.no} 题状态：${resolved ? '已解决' : '待解决'}，点击切换`}
            onClick={onToggleResolved}
            className={cn(
              'pointer-events-auto inline-flex h-6 items-center gap-1 rounded-full px-2.5 text-[11px] font-semibold ring-1 transition-colors',
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
        className="absolute right-1.5 top-1.5 z-10 flex size-8 items-center justify-center rounded-full text-[#9AA3B2] transition-colors hover:bg-[#F3F5FA] hover:text-[#F26B4A]"
      >
        <Trash2 className="size-4" />
      </button>
    </li>
  )
}
