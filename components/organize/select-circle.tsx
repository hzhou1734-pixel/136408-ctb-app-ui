import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export function SelectCircle({ checked, partial = false }: { checked: boolean; partial?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'flex size-[18px] shrink-0 items-center justify-center rounded-full border-[1.5px] transition-colors',
        checked
          ? 'border-transparent bg-[linear-gradient(135deg,#3B8BFF,#6B6BFF)] text-white'
          : partial
            ? 'border-[#3B7BFF] bg-white'
            : 'border-[#C5CCDA] bg-white',
      )}
    >
      {checked ? (
        <Check className="size-3" strokeWidth={3} />
      ) : partial ? (
        <span className="h-[2px] w-2 rounded-full bg-[#3B7BFF]" />
      ) : null}
    </span>
  )
}
