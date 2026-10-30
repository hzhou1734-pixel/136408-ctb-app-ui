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
    <div className="contents">
      <div className="relative flex h-full w-full flex-col overflow-hidden bg-[linear-gradient(180deg,#E6EDFC_0%,#ECF0FC_20%,#EFF1FD_100%)]">
        <StatusBar />
        <StatsScreen initialFilterOpen={sheet === 'filter'} key={sheet ?? 'none'} />
      </div>
    </div>
  )
}
