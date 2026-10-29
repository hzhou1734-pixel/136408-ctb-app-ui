'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Camera, ChevronLeft, FileClock } from 'lucide-react'

const tools = [
  { title: '未来的我', desc: '上传你的照片，和职业梦想', icon: '/images/app/future.png' },
  { title: '手抄报设计', desc: '中小学手抄报设计参考', icon: '/images/app/poster.png' },
  { title: '习作范文', desc: '语文习作写作思路', icon: '/images/app/essay.png' },
  { title: '试卷分析', desc: '学生考试试卷分析', icon: '/images/app/paper.png' },
  { title: '朋友圈文案', desc: '朋友圈招生文案', icon: '/images/app/moments.png' },
  { title: '古诗背诵', desc: '古诗记忆背诵', icon: '/images/app/poem.png' },
]

function Squiggle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 12" className={className} aria-hidden="true">
      <path
        d="M2 7c6-4 12-4 16 0s10 3 14-1M10 10c6-3 14-3 22 0"
        fill="none"
        stroke="#3AA0F5"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

function SectionTitle({ before, marked, after }: { before: string; marked: string; after: string }) {
  return (
    <h2 className="text-[20px] text-[#1F2533]">
      {before}
      <span className="relative inline-block">
        {marked}
        <Squiggle className="absolute -bottom-1.5 left-0 h-2.5 w-full" />
      </span>
      {after}
    </h2>
  )
}

export function AppScreen() {
  const [question, setQuestion] = useState('')
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), 1600)
    return () => clearTimeout(timer)
  }, [toast])

  return (
    <div className="relative flex flex-1 flex-col overflow-y-auto pb-28 pt-11 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[344px] bg-[linear-gradient(180deg,#C9D8FB_0%,#E3EBFD_45%,#FFFFFF_100%)]"
      />

      <header className="relative flex h-12 items-center justify-between px-5">
        <Link href="/" aria-label="返回" className="-ml-1 flex size-8 items-center justify-center text-[#1F2533]">
          <ChevronLeft className="size-6" strokeWidth={2} />
        </Link>
        <h1 className="text-[18px] font-semibold text-[#1F2533]">AI素养盒</h1>
        <button
          type="button"
          aria-label="使用记录"
          onClick={() => setToast('暂无使用记录')}
          className="-mr-1 flex size-8 items-center justify-center text-[#1F2533]"
        >
          <FileClock className="size-6" strokeWidth={1.8} />
        </button>
      </header>

      <section className="relative flex h-[150px] items-center justify-between pl-6">
        <p className="text-[18px] text-[#1F2533]">Hi，有什么能为你解答？</p>
        <Image
          src="/images/app/robot.png"
          alt="AI素养盒助手机器人"
          width={1408}
          height={768}
          priority
          className="h-[160px] w-[150px] shrink-0 object-cover mix-blend-multiply [mask-image:radial-gradient(ellipse_48%_55%_at_50%_50%,#000_65%,transparent_100%)]"
        />
      </section>

      <form
        className="relative mx-5 flex h-[60px] items-center gap-3 rounded-xl bg-[#FFFFFF] pl-4 pr-3 shadow-[0_6px_20px_rgba(60,90,160,0.08)]"
        onSubmit={(event) => {
          event.preventDefault()
          if (!question.trim()) return
          setToast('AI 正在思考中…')
          setQuestion('')
        }}
      >
        <label htmlFor="ai-question" className="sr-only">
          请输入你的问题
        </label>
        <input
          id="ai-question"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && (event.nativeEvent.isComposing || event.keyCode === 229)) {
              event.preventDefault()
            }
          }}
          placeholder="请输入你的问题"
          className="min-w-0 flex-1 bg-transparent text-[15px] text-[#1F2533] outline-none placeholder:text-[#9AA1B0]"
        />
        <button
          type="button"
          aria-label="拍照提问"
          onClick={() => setToast('打开相机')}
          className="flex size-9 items-center justify-center text-[#1F2533]"
        >
          <Camera className="size-6" strokeWidth={1.8} />
        </button>
      </form>

      <div className="relative flex flex-col gap-5 px-5 pt-10">
        <button type="button" onClick={() => setToast('暂无历史会话')} className="self-start text-left">
          <SectionTitle before="历" marked="史会" after="话" />
        </button>

        <SectionTitle before="打开" marked="AI素" after="养盒" />

        <ul className="grid grid-cols-2 gap-x-4 gap-y-4 pt-1">
          {tools.map((tool) => (
            <li key={tool.title}>
              <button
                type="button"
                onClick={() => setToast(`${tool.title} 即将上线`)}
                className="flex h-[110px] w-full flex-col items-start gap-2 rounded-xl bg-[#F5F8FD] px-4 pt-4 text-left transition-colors active:bg-[#EAF0FB]"
              >
                <span className="flex items-center gap-2">
                  <Image src={tool.icon} alt="" width={64} height={64} className="size-7 rounded object-cover mix-blend-multiply" />
                  <span className="text-[18px] text-[#1F2533]">{tool.title}</span>
                </span>
                <span className="text-[13px] leading-relaxed text-[#8A92A3]">{tool.desc}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="flex justify-center pt-2" aria-hidden="true">
          <span className="h-1.5 w-6 rounded-full bg-[#1E88F5]" />
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
