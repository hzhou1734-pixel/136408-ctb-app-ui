import { cn } from '@/lib/utils'

export function AppLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      role="img"
      aria-label="Max AI错题宝图标"
      className={cn('block', className)}
    >
      <rect width="100" height="100" rx="24" fill="#FFFFFF" />
      <g transform="translate(50 50) scale(0.88) translate(-51.5 -47.5)">
      <path
        d="M25.7 55.6 A28 28 0 0 1 52 18"
        fill="none"
        stroke="#4F7FE6"
        strokeWidth="22"
        strokeLinecap="round"
      />
      <path
        d="M52 18 A28 28 0 0 1 61.6 72.3"
        fill="none"
        stroke="#2F55D4"
        strokeWidth="22"
        strokeLinecap="round"
      />
      <path
        d="M51 34 C45 34 41 38 40 43 C27 41 12 50 12 66 C12 79 22 88 34 88 C47 88 56 79 55 67 C54 59 61 52 61 44 C61 38 57 34 51 34 Z"
        fill="#74E3C4"
      />
      <circle cx="51" cy="42" r="10" fill="#FFFFFF" />
      <circle cx="51" cy="42" r="4.8" fill="#F4A62A" />
      </g>
    </svg>
  )
}
