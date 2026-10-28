function CellularIcon() {
  return (
    <svg viewBox="0 0 18 12" className="h-[11px] w-[17px]" fill="currentColor">
      <rect x="0" y="8" width="3" height="4" rx="1" />
      <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
      <rect x="10" y="3" width="3" height="9" rx="1" />
      <rect x="15" y="0" width="3" height="12" rx="1" />
    </svg>
  )
}

function WifiIcon() {
  return (
    <svg viewBox="0 0 16 12" className="h-[11px] w-[15px]" fill="currentColor">
      <path d="M8 2.4c2.3 0 4.4.9 6 2.4l1.2-1.2A10.2 10.2 0 0 0 8 .6 10.2 10.2 0 0 0 .8 3.6L2 4.8a8.5 8.5 0 0 1 6-2.4Z" />
      <path d="M8 5.8c1.4 0 2.6.5 3.6 1.4l1.2-1.2A6.9 6.9 0 0 0 8 4a6.9 6.9 0 0 0-4.8 2l1.2 1.2c1-.9 2.2-1.4 3.6-1.4Z" />
      <path d="M8 9.1c.5 0 1 .2 1.3.5L8 11.4 6.7 9.6c.3-.3.8-.5 1.3-.5Z" />
    </svg>
  )
}

function BatteryIcon() {
  return (
    <svg viewBox="0 0 27 13" className="h-[13px] w-[27px]">
      <rect x="0.5" y="0.5" width="23" height="12" rx="3.8" fill="none" stroke="currentColor" strokeOpacity="0.35" />
      <rect x="2" y="2" width="20" height="9" rx="2.5" fill="currentColor" />
      <path d="M25 4.5v4c.8-.3 1.4-1.1 1.4-2s-.6-1.7-1.4-2Z" fill="currentColor" fillOpacity="0.4" />
    </svg>
  )
}

export function StatusBar() {
  return (
    <div
      aria-hidden="true"
      className="relative z-10 flex h-[47px] items-center justify-between px-8 pt-1 text-[#000000]"
    >
      <span className="w-[54px] text-center text-[17px] font-semibold leading-none tracking-[-0.4px]">9:41</span>
      <span className="flex items-center gap-[6px]">
        <CellularIcon />
        <WifiIcon />
        <BatteryIcon />
      </span>
    </div>
  )
}
