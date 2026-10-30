import type { Metadata } from 'next'
import { GradingListScreen } from '@/components/grading/grading-list-screen'
import { StatusBar } from '@/components/home/status-bar'

export const metadata: Metadata = {
  title: '批改列表 - Max AI错题宝',
  description: '按日期查看学生作业批改记录，支持切换班级与新建批改',
}

export default async function GradingPage({ searchParams }: { searchParams: Promise<{ sheet?: string }> }) {
  const { sheet } = await searchParams
  return (
    <div className="contents">
      <div className="relative flex h-full w-full flex-col overflow-hidden bg-[linear-gradient(180deg,#E6EDFC_0%,#ECF0FC_20%,#EFF1FD_100%)]">
        <StatusBar />
        <GradingListScreen initialClassOpen={sheet === 'class'} key={sheet ?? 'none'} />
      </div>
    </div>
  )
}
