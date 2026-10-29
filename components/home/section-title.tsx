import Image from 'next/image'

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
      <h2 id={id} className="flex items-center gap-1.5 text-[16px] font-bold text-[#1F2937]">
        <Image src="/images/home/book.png" alt="" width={24} height={24} className="size-[18px] mix-blend-multiply" />
        {children}
      </h2>
      {moreHref && (
        <a href={moreHref} className="text-[13px] text-[#1E88F5]">
          {'更多>'}
        </a>
      )}
    </div>
  )
}
