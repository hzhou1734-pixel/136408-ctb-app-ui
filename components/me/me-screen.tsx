'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ChevronRight,
  Coins,
  Eraser,
  Info,
  MessageSquareText,
  Power,
  Recycle,
  Settings,
  type LucideIcon,
} from 'lucide-react'
import { StatusBar } from '@/components/home/status-bar'

type MenuItem = {
  key: string
  label: string
  icon: LucideIcon
  href?: string
}

const menu: MenuItem[] = [
  { key: 'recycle', label: '错题回收站', icon: Recycle },
  { key: 'beans', label: '积分豆记录', icon: Coins },
  { key: 'feedback', label: '意见反馈', icon: MessageSquareText, href: '/me/feedback' },
  { key: 'cache', label: '清理缓存', icon: Eraser },
  { key: 'about', label: '关于错题宝', icon: Info, href: '/me/about' },
  { key: 'logout', label: '退出登录', icon: Power },
]

type DialogKind = 'cache' | 'logout' | null

export function MeScreen() {
  const [cacheSize, setCacheSize] = useState('128.6MB')
  const [dialog, setDialog] = useState<DialogKind>(null)
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), 1600)
    return () => clearTimeout(timer)
  }, [toast])

  const handleClick = (item: MenuItem) => {
    if (item.key === 'cache') {
      if (cacheSize === '0B') setToast('暂无缓存可清理')
      else setDialog('cache')
      return
    }
    if (item.key === 'logout') {
      setDialog('logout')
      return
    }
    setToast(`打开${item.label}`)
  }

  const confirmDialog = () => {
    if (dialog === 'cache') {
      setCacheSize('0B')
      setToast('缓存已清理')
    } else if (dialog === 'logout') {
      setToast('已退出登录')
    }
    setDialog(null)
  }

  const rowClass =
    'flex h-14 w-full items-center gap-3 px-4 text-left transition-colors active:bg-[#F5F8FD]'

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden bg-[#F5F7FB]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[300px] bg-[linear-gradient(180deg,#C9D8FB_0%,#E3EBFD_55%,#F5F7FB_100%)]"
      />

      <StatusBar />

      <header className="relative flex h-11 shrink-0 items-center justify-end px-4">
        <Link
          href="/me/settings"
          aria-label="设置"
          className="flex size-10 items-center justify-center rounded-full text-[#1F2533] active:bg-[#FFFFFF]/60"
        >
          <Settings className="size-[22px]" aria-hidden="true" />
        </Link>
      </header>

      <div className="relative flex flex-1 flex-col overflow-y-auto pb-28 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex flex-col gap-5 px-4">
          <section aria-label="个人信息" className="flex items-center gap-4 px-1">
            <Image
              src="/images/me/avatar.png"
              alt="谭亮的头像"
              width={160}
              height={160}
              priority
              className="size-[72px] rounded-full object-cover ring-[3px] ring-[#FFFFFF] shadow-[0_6px_16px_-6px_rgba(30,136,245,0.45)]"
            />
            <div className="flex min-w-0 flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <h1 className="text-[21px] font-bold text-[#1F2533]">谭亮</h1>
                <span className="truncate rounded-full bg-[#FFFFFF]/80 px-2.5 py-0.5 text-[12px] text-[#1E88F2]">
                  贝尔安亲总部
                </span>
              </div>
              <p className="text-[13px] text-[#8A92A3]">工号 0014</p>
            </div>
          </section>

          <section aria-labelledby="common-title" className="flex flex-col gap-3">
            <h2 id="common-title" className="px-1 text-[16px] font-semibold text-[#1F2533]">
              常用功能
            </h2>
            <ul className="flex flex-col divide-y divide-[#EEF1F6] overflow-hidden rounded-xl bg-[#FFFFFF]">
              {menu.map((item) => {
                const Icon = item.icon
                const content = (
                  <>
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#EEF4FE] text-[#1E88F2]">
                      <Icon className="size-[18px]" aria-hidden="true" />
                    </span>
                    <span className="flex-1 text-[15px] text-[#1F2533]">{item.label}</span>
                    {item.key === 'cache' && (
                      <span className="text-[13px] text-[#8A92A3]">{cacheSize}</span>
                    )}
                    {item.key !== 'logout' && (
                      <ChevronRight className="size-4 shrink-0 text-[#B8BFCC]" aria-hidden="true" />
                    )}
                  </>
                )
                return (
                  <li key={item.key}>
                    {item.href ? (
                      <Link href={item.href} className={rowClass}>
                        {content}
                      </Link>
                    ) : (
                      <button type="button" onClick={() => handleClick(item)} className={rowClass}>
                        {content}
                      </button>
                    )}
                  </li>
                )
              })}
            </ul>
          </section>

          <p className="text-center text-[12px] text-[#A0A8B8]">版本号 V2.5.8</p>
        </div>
      </div>

      {dialog && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-[#1F2533]/45 px-10">
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="me-dialog-title"
            className="flex w-full flex-col overflow-hidden rounded-2xl bg-[#FFFFFF]"
          >
            <div className="flex flex-col items-center gap-2 px-6 pb-5 pt-6 text-center">
              <h2 id="me-dialog-title" className="text-[17px] font-semibold text-[#1F2533]">
                {dialog === 'cache' ? '清理缓存' : '退出登录'}
              </h2>
              <p className="text-pretty text-[14px] leading-relaxed text-[#5B6478]">
                {dialog === 'cache'
                  ? `当前缓存 ${cacheSize}，清理后不会影响错题等数据，确定清理吗？`
                  : '确定要退出当前账号吗？'}
              </p>
            </div>
            <div className="grid grid-cols-2 border-t border-[#EEF1F6]">
              <button
                type="button"
                onClick={() => setDialog(null)}
                className="h-12 text-[15px] text-[#5B6478] active:bg-[#F5F8FD]"
              >
                取消
              </button>
              <button
                type="button"
                onClick={confirmDialog}
                className="h-12 border-l border-[#EEF1F6] text-[15px] font-semibold text-[#1E88F2] active:bg-[#F5F8FD]"
              >
                {dialog === 'cache' ? '清理' : '退出'}
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div
          role="status"
          className="pointer-events-none absolute left-1/2 top-1/2 z-50 -translate-x-1/2 rounded-lg bg-[#1F2533]/85 px-4 py-2 text-[14px] text-[#FFFFFF]"
        >
          {toast}
        </div>
      )}
    </div>
  )
}
