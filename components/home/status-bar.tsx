import { BatteryFull, Signal, Wifi } from 'lucide-react'

export function StatusBar() {
  return (
    <div aria-hidden="true" className="relative z-10 flex items-center justify-between px-7 pb-1 pt-3 text-[#111827]">
      <span className="text-[15px] font-semibold">12:00</span>
      <span className="flex items-center gap-1.5">
        <Signal className="size-4" strokeWidth={2.6} />
        <Wifi className="size-4" strokeWidth={2.6} />
        <BatteryFull className="size-5" strokeWidth={2} />
      </span>
    </div>
  )
}
