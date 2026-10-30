'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ChevronRight, CircleMinus, LockKeyhole } from 'lucide-react'

export function SettingsScreen() {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), 1600)
    return () => clearTimeout(timer)
  }, [toast])

  const rowClass = 'flex h-14 w-full items-center gap-3 px-4 text-left active:bg-[#F5F8FD]'

  return (
    <div className="relative flex flex-1 flex-col">
      <section
        aria-label="个人资料"
        className="mx-4 mt-2 flex flex-col divide-y divide-[#EEF1F6] overflow-hidden rounded-xl bg-[#FFFFFF]"
      >
        <div className="flex h-[72px] items-center gap-3 px-4">
          <span className="flex-1 text-[15px] text-[#1F2533]">头像</span>
          <Image
            src="/images/me/avatar.png"
            alt="谭亮的头像"
            width={96}
            height={96}
            className="size-12 rounded-full object-cover"
          />
        </div>
        <div className="flex h-14 items-center gap-3 px-4">
          <span className="flex-1 text-[15px] text-[#1F2533]">昵称</span>
          <span className="text-[15px] text-[#8A92A3]">谭亮</span>
        </div>
        <div className="flex h-14 items-center gap-3 px-4">
          <span className="flex-1 text-[15px] text-[#1F2533]">账号</span>
          <span className="text-[15px] tabular-nums text-[#8A92A3]">0014</span>
        </div>
      </section>

      <ul className="mx-4 mt-3 flex flex-col divide-y divide-[#EEF1F6] overflow-hidden rounded-xl bg-[#FFFFFF]">
        <li>
          <button type="button" onClick={() => setToast('打开修改密码')} className={rowClass}>
            <span className="flex size-8 items-center justify-center rounded-lg bg-[#EEF4FE] text-[#1E88F2]">
              <LockKeyhole className="size-[18px]" aria-hidden="true" />
            </span>
            <span className="flex-1 text-[15px] text-[#1F2533]">修改密码</span>
            <ChevronRight className="size-4 text-[#B8BFCC]" aria-hidden="true" />
          </button>
        </li>
        <li>
          <button type="button" onClick={() => setConfirmDelete(true)} className={rowClass}>
            <span className="flex size-8 items-center justify-center rounded-lg bg-[#EEF4FE] text-[#1E88F2]">
              <CircleMinus className="size-[18px]" aria-hidden="true" />
            </span>
            <span className="flex-1 text-[15px] text-[#1F2533]">注销账号</span>
            <ChevronRight className="size-4 text-[#B8BFCC]" aria-hidden="true" />
          </button>
        </li>
      </ul>

      {confirmDelete && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-[#1F2533]/45 px-10">
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-title"
            className="flex w-full flex-col overflow-hidden rounded-2xl bg-[#FFFFFF]"
          >
            <div className="flex flex-col items-center gap-2 px-6 pb-5 pt-6 text-center">
              <h2 id="delete-title" className="text-[17px] font-semibold text-[#1F2533]">
                注销账号
              </h2>
              <p className="text-pretty text-[14px] leading-relaxed text-[#5B6478]">
                注销后账号及错题、报告等数据将无法恢复，确定要注销吗？
              </p>
            </div>
            <div className="grid grid-cols-2 border-t border-[#EEF1F6]">
              <button
                type="button"
                onClick={() => setConfirmDelete(false)}
                className="h-12 text-[15px] font-semibold text-[#1E88F2] active:bg-[#F5F8FD]"
              >
                再想想
              </button>
              <button
                type="button"
                onClick={() => {
                  setConfirmDelete(false)
                  setToast('已提交注销申请')
                }}
                className="h-12 border-l border-[#EEF1F6] text-[15px] text-[#F25C54] active:bg-[#F5F8FD]"
              >
                确认注销
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div
          role="status"
          className="pointer-events-none absolute left-1/2 top-1/3 z-40 -translate-x-1/2 rounded-lg bg-[#1F2533]/85 px-4 py-2 text-[14px] text-[#FFFFFF]"
        >
          {toast}
        </div>
      )}
    </div>
  )
}
