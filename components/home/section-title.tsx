export function SectionTitle({
  id,
  children,
  moreHref,
}: {
  id: string
  children: React.ReactNode
  moreHref?: string
}) {
  return (
    <div className="flex items-center justify-between px-5">
      <h2 id={id} className="flex items-center gap-2 text-[19px] font-semibold text-[#1E2A5A]">
        <span aria-hidden="true" className="relative block h-4 w-5">
          <span className="absolute bottom-0 left-0 h-3 w-4 -rotate-12 rounded-[3px] bg-gradient-to-br from-[#C4B5FD] to-[#7C6CF2]" />
          <span className="absolute bottom-0.5 left-1.5 h-3 w-3.5 rotate-6 rounded-[3px] bg-gradient-to-br from-[#E0EAFF] to-[#A5C4FF] shadow-sm" />
        </span>
        {children}
      </h2>
      {moreHref && (
        <a href={moreHref} className="text-[15px] text-[#2F8CFF]">
          {'更多>'}
        </a>
      )}
    </div>
  )
}
