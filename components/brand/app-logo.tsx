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
      <g transform="translate(9 9) scale(0.1139)">
        <circle cx="370" cy="370" r="350" fill="#3A63D8" />
        <circle cx="365" cy="288" r="118" fill="#FFFFFF" />
        <path
          d="M290 360 L458 360 C402 420 378 500 380 580 C382 650 396 696 446 716 L446 740 L290 740 Z"
          fill="#FFFFFF"
        />
        <path
          d="M85 195 C150 145 250 140 330 172 C252 205 240 300 262 360 C290 420 348 470 350 560 C352 650 290 700 200 695 C80 688 15 580 15 410 C15 310 40 240 85 195 Z"
          fill="#5DF0CD"
        />
        <circle cx="365" cy="293" r="56" fill="#F7AE1E" />
      </g>
    </svg>
  )
}
