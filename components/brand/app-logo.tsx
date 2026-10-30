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
      <path
        d="M13.6 67.8 A38.7 38.7 0 1 1 77 82 C72.5 86.5 63.5 86.5 59.5 82 C55.5 78 53 72.5 54 67 C55 60.5 59.5 54.5 62.5 48 L35 50 Z"
        fill="#3567DE"
      />
      <path
        d="M12 58 C12 38 23 26 33 26 C40 26 45 31 46 38 L44 54.5 C48 59 49.5 64 49 70 C48 78 41 84 31 84 C18 84 12 72 12 58 Z"
        fill="#34F0CC"
      />
      <circle cx="50.3" cy="42.5" r="13" fill="#FFFFFF" />
      <circle cx="50.3" cy="42.5" r="5.5" fill="#F7A81B" />
    </svg>
  )
}
