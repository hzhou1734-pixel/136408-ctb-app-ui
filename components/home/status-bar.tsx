import { AlarmClock, BellOff, MapPin, MessageCircle, Signal } from 'lucide-react'

function SignalWithLabel() {
  return (
    <span className="relative flex items-end">
      <span className="absolute -top-1 left-0 text-[6px] font-bold leading-none">4G</span>
      <Signal className="size-3.5" strokeWidth={3} />
    </span>
  )
}

export function StatusBar() {
  return (
    <div aria-hidden="true" className="relative z-10 flex items-center justify-between px-6 pb-1 pt-3 text-[#111827]">
      <span className="flex items-center gap-1.5">
        <span className="text-[16px] font-medium">10:30</span>
        <MessageCircle className="size-3.5 fill-current" strokeWidth={2} />
        <span className="flex h-3.5 items-center rounded-[3px] bg-[#111827] px-[2px] text-[5px] font-bold text-white">小红书</span>
        <span className="relative flex">
          <MapPin className="size-3.5 fill-current" strokeWidth={2} />
          <span className="absolute -top-1.5 left-0.5 text-[6px] font-bold">du</span>
        </span>
      </span>
      <span className="flex items-center gap-1">
        <span className="flex flex-col items-center text-[7px] font-bold leading-[1]">
          <span>2.64</span>
          <span>KB/s</span>
        </span>
        <AlarmClock className="size-3.5" strokeWidth={2.4} />
        <BellOff className="size-3.5" strokeWidth={2.4} />
        <SignalWithLabel />
        <SignalWithLabel />
        <span className="text-[11px] font-bold">HD</span>
        <span className="text-[14px] font-medium">32</span>
        <svg viewBox="0 0 24 24" className="size-6">
          <circle cx="12" cy="12" r="9" fill="none" stroke="#E5E7EB" strokeWidth="3" />
          <circle
            cx="12"
            cy="12"
            r="9"
            fill="none"
            stroke="#F5A623"
            strokeWidth="3"
            strokeDasharray={`${2 * Math.PI * 9 * 0.32} ${2 * Math.PI * 9}`}
            strokeLinecap="round"
            transform="rotate(-90 12 12)"
          />
        </svg>
      </span>
    </div>
  )
}
