import { cn } from '@/lib/utils'

export function AppLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      role="img"
      aria-label="Max AI错题宝图标"
      className={cn('block', className)}
      shapeRendering="geometricPrecision"
    >
      <rect width="100" height="100" rx="24" fill="#FFFFFF" />
      <path d="M57 50 L15.3 65 A38 38 0 0 1 67.1 17.6 Z" fill="#4E86E8" />
      <path
        d="M60.8 15.3 A38 38 0 0 1 72.8 83.1 A11 11 0 0 1 60.2 65.1 Q62.5 55 61.8 41 Q56.5 30 60.8 15.3 Z"
        fill="#3456D4"
      />
      <path
        d="M53 68 C54 60 56 54 54 46 L46 38 C40 44 36 47 32 47 A21 21 0 1 0 53 68 Z"
        fill="#74E6C6"
      />
      <circle cx="51" cy="44" r="11" fill="#FFFFFF" />
      <circle cx="52" cy="45" r="5" fill="#F4A62A" />
    </svg>
  )
}
