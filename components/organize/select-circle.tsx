import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export function SelectCircle({ checked, partial = false }: { checked: boolean; partial?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'flex size-[18px] shrink-0 items-center justify-center rounded-full border-[1.5px] transition-colors',
        checked
          ? 'border-transparent bg-[linear-gradient(135deg,#3FA9FF,#1E88F5)] text-white'
          : partial
            ? 'border-[#1E88F5] bg-white'
            : 'border-[#C5CCDA] bg-white',
      )}
    >
      {checked ? (
        <Check className="size-3" strokeWidth={3} />
      ) : partial ? (
        <span className="h-[2px] w-2 rounded-full bg-[#1E88F5]" />
      ) : null}
    </span>
  )
}
