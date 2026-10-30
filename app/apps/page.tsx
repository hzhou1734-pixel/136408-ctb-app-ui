import type { Metadata } from 'next'
import { AppScreen } from '@/components/app/app-screen'
import { BottomNav } from '@/components/home/bottom-nav'

export const metadata: Metadata = {
  title: 'AI素养盒 - Max AI错题宝',
  description: 'AI素养盒：未来的我、手抄报设计、习作范文、试卷分析等AI工具',
}

export default function AppsPage() {
  return (
    <div className="contents">
      <div className="relative flex h-full w-full flex-col overflow-hidden bg-[#FFFFFF]">
        <div className="flex flex-1 flex-col overflow-hidden">
          <AppScreen />
        </div>
        <BottomNav active="app" />
      </div>
    </div>
  )
}
