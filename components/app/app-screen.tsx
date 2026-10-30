'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ChevronRight } from 'lucide-react'
import { StatusBar } from '@/components/home/status-bar'

type Tool = { title: string; desc: string; icon: string }

const featuredTools: Tool[] = [
  { title: '未来的我', desc: '上传你的照片，和职业梦想', icon: '/images/app/future.png' },
  { title: '手抄报设计', desc: '中小学手抄报设计参考', icon: '/images/app/poster.png' },
]

const moreTools: Tool[] = [
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

  const open = (title: string) => setToast(`${title} 即将上线`)

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden bg-[#F5F7FB]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[320px] bg-[linear-gradient(180deg,#C9D8FB_0%,#E3EBFD_55%,#F5F7FB_100%)]"
      />

      <StatusBar />

      <header className="relative flex h-11 shrink-0 items-center justify-center px-5">
        <h1 className="text-[18px] font-semibold text-[#1F2533]">AI素养盒</h1>
      </header>

      <div className="relative flex flex-1 flex-col overflow-y-auto pb-28 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex flex-col gap-5 px-4 pt-2">
          <section aria-label="活动海报" className="relative overflow-hidden rounded-2xl shadow-[0_8px_24px_-12px_rgba(30,136,245,0.55)]">
            <Image
              src="/images/app/banner.png"
              alt="AI机器人助教手拿书本和画笔"
              width={1584}
              height={672}
              priority
              className="h-[150px] w-full object-cover object-right"
            />
            <div className="absolute inset-y-0 left-0 flex w-[58%] flex-col justify-center gap-1.5 pl-4">
              <span className="w-fit rounded-full bg-[#FFFFFF]/25 px-2 py-0.5 text-[11px] text-[#FFFFFF]">
                AI素养盒
              </span>
              <p className="text-balance text-[19px] font-bold leading-tight text-[#FFFFFF]">AI助教 让教学更轻松</p>
  <p className="text-[12px] leading-relaxed text-[#FFFFFF]/85">6款AI工具，一键开启</p>

            </div>
          </section>

          <section aria-labelledby="featured-title" className="flex flex-col gap-3">
            <h2 id="featured-title" className="text-[16px] font-semibold text-[#1F2533]">
              热门推荐
            </h2>
            <ul className="grid grid-cols-2 gap-3">
              {featuredTools.map((tool) => (
                <li key={tool.title}>
                  <button
                    type="button"
                    onClick={() => open(tool.title)}
                    className="flex h-[112px] w-full flex-col justify-between rounded-xl bg-[#FFFFFF] p-3 text-left transition-colors active:bg-[#EAF0FB]"
                  >
                    <span className="flex size-10 items-center justify-center rounded-lg bg-[#EEF4FE]">
                      <Image src={tool.icon} alt="" width={64} height={64} className="size-6 object-cover mix-blend-multiply" />
                    </span>
                    <span className="flex flex-col gap-0.5">
                      <span className="text-[15px] font-medium text-[#1F2533]">{tool.title}</span>
                      <span className="truncate text-[12px] text-[#8A92A3]">{tool.desc}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="more-title" className="flex flex-col gap-3">
            <h2 id="more-title" className="text-[16px] font-semibold text-[#1F2533]">
              更多工具
            </h2>
            <ul className="flex flex-col divide-y divide-[#EEF1F6] overflow-hidden rounded-xl bg-[#FFFFFF]">
              {moreTools.map((tool) => (
                <li key={tool.title}>
                  <button
                    type="button"
                    onClick={() => open(tool.title)}
                    className="flex w-full items-center gap-3 px-3 py-3 text-left transition-colors active:bg-[#F5F8FD]"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#EEF4FE]">
                      <Image src={tool.icon} alt="" width={64} height={64} className="size-6 object-cover mix-blend-multiply" />
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                      <span className="text-[15px] font-medium text-[#1F2533]">{tool.title}</span>
                      <span className="truncate text-[12px] text-[#8A92A3]">{tool.desc}</span>
                    </span>
                    <ChevronRight className="size-4 shrink-0 text-[#B8BFCC]" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          </section>
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
