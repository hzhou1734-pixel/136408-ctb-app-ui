import Image from 'next/image'
import { Download, Forward, Trash2 } from 'lucide-react'
import { SectionTitle } from './section-title'

const notebooks = [
  { title: '原题错题本-语文-曹小明-20260915', time: '2026-09-15 11:06:11' },
  { title: '原题错题本-数学-曹小明-20260911', time: '2026-09-11 16:16:39' },
  { title: '原题错题本-英语-曹小明-20260908', time: '2026-09-08 09:32:18' },
]

export function RecentNotebooks() {
  return (
    <section aria-labelledby="recent-title" className="flex flex-col gap-4">
      <SectionTitle id="recent-title" moreHref="#">
        最近生成的错题本
      </SectionTitle>
      <ul className="flex flex-col gap-3.5 px-5">
        {notebooks.map((item) => (
          <li
            key={item.title}
            className="flex items-center gap-3 overflow-hidden rounded-[15px] border-l-[3px] border-[#FDAFA3] bg-white py-4 pl-3.5 pr-4"
          >
            <Image src="/images/home/thumb.png" alt="" width={56} height={56} className="size-[42px] shrink-0" />
            <div className="flex min-w-0 flex-1 flex-col gap-1.5">
              <h3 className="truncate text-[13px] font-semibold text-[#1F2937]">{item.title}</h3>
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-[#9CA3AF]">{item.time}</span>
                <span className="flex items-center gap-4">
                  <button type="button" aria-label="下载">
                    <Download className="size-[18px] text-[#2F8CFF]" strokeWidth={1.8} aria-hidden="true" />
                  </button>
                  <button type="button" aria-label="分享">
                    <Forward className="size-[18px] text-[#9CA3AF]" strokeWidth={1.8} aria-hidden="true" />
                  </button>
                  <button type="button" aria-label="删除">
                    <Trash2 className="size-[18px] text-[#9CA3AF]" strokeWidth={1.8} aria-hidden="true" />
                  </button>
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
