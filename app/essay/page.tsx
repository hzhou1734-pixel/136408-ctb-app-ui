import type { Metadata } from 'next'
import { EssayListScreen } from '@/components/essay/essay-list-screen'
import { StatusBar } from '@/components/home/status-bar'

export const metadata: Metadata = {
  title: '语文作文 - Max AI错题宝',
  description: '查看学生语文作文批阅记录，支持搜索与按班级筛选',
}

export default function EssayPage() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-[#E9ECF3] sm:py-8">
      <div className="relative flex h-dvh w-full max-w-[400px] flex-col overflow-hidden bg-[linear-gradient(180deg,#E6EDFC_0%,#ECF0FC_20%,#EFF1FD_100%)] sm:h-[860px] sm:rounded-[44px] sm:border-[10px] sm:border-[#1E2433] sm:shadow-2xl">
        <StatusBar />
        <EssayListScreen />
      </div>
    </div>
  )
}
