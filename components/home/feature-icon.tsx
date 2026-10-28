import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export type IconTone = 'green' | 'purple' | 'blue' | 'pink' | 'orange' | 'indigo'

const tones: Record<IconTone, { tile: string; body: string }> = {
  green: { tile: 'bg-[#E6F8EF]', body: 'from-[#5EE0A0] to-[#24B26B]' },
  purple: { tile: 'bg-[#F0EDFF]', body: 'from-[#A89BFF] to-[#6D5CF0]' },
  blue: { tile: 'bg-[#E5F3FE]', body: 'from-[#6CC4FF] to-[#2E8FF0]' },
  pink: { tile: 'bg-[#FFECEF]', body: 'from-[#FF97A6] to-[#EE5470]' },
  orange: { tile: 'bg-[#FFF1EA]', body: 'from-[#FFC09A] to-[#FF8A5C]' },
  indigo: { tile: 'bg-[#EAEEFF]', body: 'from-[#8EA6FF] to-[#4C6BF5]' },
}

export function FeatureIcon({ icon: Icon, tone, size = 'md' }: { icon: LucideIcon; tone: IconTone; size?: 'md' | 'sm' }) {
  const t = tones[tone]
  return (
    <span className={cn('flex items-center justify-center rounded-[14px]', t.tile, size === 'md' ? 'size-14' : 'size-11')}>
      <span
        className={cn(
          'flex items-center justify-center rounded-[10px] bg-gradient-to-br shadow-[inset_0_-3px_6px_rgba(0,0,0,0.12),inset_0_2px_3px_rgba(255,255,255,0.45),0_4px_8px_rgba(0,0,0,0.08)]',
          t.body,
          size === 'md' ? 'size-9' : 'size-7',
        )}
      >
        <Icon className={cn('text-white', size === 'md' ? 'size-5' : 'size-4')} strokeWidth={2.4} aria-hidden="true" />
      </span>
    </span>
  )
}
