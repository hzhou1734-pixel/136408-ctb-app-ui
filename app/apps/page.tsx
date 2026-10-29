import type { Metadata } from 'next'
import { AppScreen } from '@/components/app/app-screen'
import { BottomNav } from '@/components/home/bottom-nav'
import { StatusBar } from '@/components/home/status-bar'

export const metadata: Metadata = {
  title: 'AI素养盒 - Max AI错题宝',
  description: 'AI素养盒：未来的我、手抄报设计、习作范文、试卷分析等AI工具',
}

export default function AppsPage() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-[#E9ECF3] sm:py-8">
      <div className="relative flex h-dvh w-full max-w-[400px] flex-col overflow-hidden bg-[#FFFFFF] sm:h-[860px] sm:rounded-[44px] sm:border-[10px] sm:border-[#1E2433] sm:shadow-2xl">
        <div className="absolute inset-x-0 top-0 z-10">
          <StatusBar />
        </div>
        <div className="flex flex-1 flex-col overflow-hidden">
          <AppScreen />
        </div>
        <BottomNav active="app" />
      </div>
    </div>
  )
}
