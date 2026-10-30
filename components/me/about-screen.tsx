'use client'

import { useState } from 'react'
import { AppLogo } from '@/components/brand/app-logo'
import { ChevronRight, FileText, ShieldCheck, X } from 'lucide-react'

const docs = {
  agreement: {
    label: '用户协议',
    icon: FileText,
    body: [
      '欢迎使用 Max AI错题宝（以下简称“本应用”）。在使用本应用前，请你仔细阅读并理解本协议的全部内容。',
      '一、服务内容：本应用为教师提供错题采集、整理、导出、举一反三推送、作业批改与错题统计等服务。',
      '二、账号使用：你应妥善保管账号与密码，因账号保管不当造成的损失由你自行承担。',
      '三、内容规范：你上传的作业、试卷等内容应合法合规，不得侵犯他人合法权益。',
      '四、协议变更：我们可能适时更新本协议，更新后的协议将在应用内公布。',
    ],
  },
  privacy: {
    label: '隐私政策',
    icon: ShieldCheck,
    body: [
      '我们非常重视你和学生的个人信息与隐私保护。',
      '一、信息收集：为提供服务，我们会收集账号信息、班级与学生信息以及你上传的作业图片。',
      '二、信息使用：收集的信息仅用于错题识别、AI解析与学情统计，不会用于与服务无关的用途。',
      '三、信息保护：我们采用加密存储与访问控制等措施保护你的数据安全。',
      '四、你的权利：你可以在设置中注销账号，注销后相关数据将按规定删除。',
    ],
  },
}

type DocKey = keyof typeof docs

export function AboutScreen() {
  const [open, setOpen] = useState<DocKey | null>(null)
  const doc = open ? docs[open] : null

  return (
    <div className="relative flex flex-1 flex-col">
      <div className="flex flex-col items-center gap-2 pb-8 pt-8">
        <AppLogo className="size-[84px] rounded-[22px] shadow-[0_10px_24px_-10px_rgba(47,85,212,0.45)] ring-1 ring-[#EEF1F6]" />
        <h2 className="mt-2 text-[18px] font-semibold text-[#1F2533]">Max AI错题宝</h2>
        <p className="text-[13px] text-[#8A92A3]">版本号 V2.5.8</p>
      </div>

      <ul className="mx-4 flex flex-col divide-y divide-[#EEF1F6] overflow-hidden rounded-xl bg-[#FFFFFF]">
        {(Object.keys(docs) as DocKey[]).map((key) => {
          const Icon = docs[key].icon
          return (
            <li key={key}>
              <button
                type="button"
                onClick={() => setOpen(key)}
                className="flex h-14 w-full items-center gap-3 px-4 text-left active:bg-[#F5F8FD]"
              >
                <span className="flex size-8 items-center justify-center rounded-lg bg-[#EEF4FE] text-[#1E88F2]">
                  <Icon className="size-[18px]" aria-hidden="true" />
                </span>
                <span className="flex-1 text-[15px] text-[#1F2533]">{docs[key].label}</span>
                <ChevronRight className="size-4 text-[#B8BFCC]" aria-hidden="true" />
              </button>
            </li>
          )
        })}
      </ul>

      <p className="mt-auto pb-8 pt-10 text-center text-[12px] leading-relaxed text-[#A0A8B8]">
        Copyright © 2026 Max AI错题宝
      </p>

      {doc && (
        <div className="absolute inset-0 z-30 flex flex-col justify-end bg-[#1F2533]/45">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="doc-title"
            className="flex max-h-[80%] flex-col rounded-t-2xl bg-[#FFFFFF]"
          >
            <div className="flex h-12 shrink-0 items-center justify-between border-b border-[#EEF1F6] px-4">
              <span className="size-8" aria-hidden="true" />
              <h3 id="doc-title" className="text-[16px] font-semibold text-[#1F2533]">
                {doc.label}
              </h3>
              <button
                type="button"
                onClick={() => setOpen(null)}
                aria-label="关闭"
                className="flex size-8 items-center justify-center rounded-full text-[#8A92A3] active:bg-[#F5F7FB]"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>
            <div className="flex flex-col gap-3 overflow-y-auto px-5 py-4 [scrollbar-width:none]">
              {doc.body.map((p) => (
                <p key={p} className="text-[14px] leading-relaxed text-[#3A4256]">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
