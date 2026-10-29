'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { StatusBar } from '@/components/home/status-bar'

const tools = [
  { title: '未来的我', desc: '上传你的照片，和职业梦想', icon: '/images/app/future.png' },
  { title: '手抄报设计', desc: '中小学手抄报设计参考', icon: '/images/app/poster.png' },
  { title: '习作范文', desc: '语文习作写作思路', icon: '/images/app/essay.png' },
  { title: '试卷分析', desc: '学生考试试卷分析', icon: '/images/app/paper.png' },
  { title: '朋友圈文案', desc: '朋友圈招生文案', icon: '/images/app/moments.png' },
  { title: '古诗背诵', desc: '古诗记忆背诵', icon: '/images/app/poem.png' },
]

export function AppScreen() {
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), 1600)
    return () => clearTimeout(timer)
  }, [toast])

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[400px] bg-[linear-gradient(180deg,#C9D8FB_0%,#E3EBFD_50%,#FFFFFF_100%)]"
      />

      <StatusBar />

      <header className="relative flex h-11 shrink-0 items-center justify-center px-5">
        <h1 className="text-[18px] font-semibold text-[#1F2533]">AI素养盒</h1>
      </header>

      <div className="relative flex flex-1 flex-col overflow-y-auto pb-28 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="relative flex flex-col gap-4 px-4 pt-3">
          <ul className="grid grid-cols-2 gap-3">
            {tools.map((tool) => (
              <li key={tool.title}>
                <button
                  type="button"
                  onClick={() => setToast(`${tool.title} 即将上线`)}
                  className="flex h-[84px] w-full flex-col items-start gap-1.5 rounded-lg bg-[#F5F8FD] px-3 pt-3.5 text-left transition-colors active:bg-[#EAF0FB]"
                >
                  <span className="flex items-center gap-1.5">
                    <Image src={tool.icon} alt="" width={64} height={64} className="size-5 rounded object-cover mix-blend-multiply" />
                    <span className="whitespace-nowrap text-[16px] text-[#1F2533]">{tool.title}</span>
                  </span>
                  <span className="whitespace-nowrap text-[12px] leading-relaxed text-[#8A92A3]">{tool.desc}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="flex justify-center pt-1" aria-hidden="true">
            <span className="h-1.5 w-6 rounded-full bg-[#1E88F5]" />
          </div>
        </div>
      </div>

      {toast && (
        <div
          role="status"
          className="pointer-events-none absolute left-1/2 top-1/2 z-30 -translate-x-1/2 rounded-lg bg-[#1F2533]/85 px-4 py-2 text-[14px] text-[#FFFFFF]"
        >
          {toast}
        </div>
      )}
    </div>
  )
}
