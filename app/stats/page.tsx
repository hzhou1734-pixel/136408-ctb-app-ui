import type { Metadata } from 'next'
import { StatsScreen } from '@/components/stats/stats-screen'
import { StatusBar } from '@/components/home/status-bar'

export const metadata: Metadata = {
  title: '班级错题统计 - Max AI错题宝',
  description: '按时间段与科目查看班级错题情况、知识重难点与 AI 学习建议',
}

export default async function StatsPage({ searchParams }: { searchParams: Promise<{ sheet?: string }> }) {
  const { sheet } = await searchParams
  return (
    <div className="flex min-h-dvh items-center justify-center bg-[#E9ECF3] sm:py-8">
      <div className="relative flex h-dvh w-full max-w-[400px] flex-col overflow-hidden bg-[linear-gradient(180deg,#E6EDFC_0%,#ECF0FC_20%,#EFF1FD_100%)] sm:h-[860px] sm:rounded-[44px] sm:border-[10px] sm:border-[#1E2433] sm:shadow-2xl">
        <StatusBar />
        <StatsScreen initialFilterOpen={sheet === 'filter'} key={sheet ?? 'none'} />
      </div>
    </div>
  )
}
