import type { Metadata } from 'next'
import { ReportListScreen } from '@/components/report/report-list-screen'
import { StatusBar } from '@/components/home/status-bar'

export const metadata: Metadata = {
  title: '错题清零报告 - Max AI错题宝',
  description: '按时间段查看学生错题清零报告的发送时间与内容',
}

export default function ReportListPage() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-[#E9ECF3] sm:py-8">
      <div className="relative flex h-dvh w-full max-w-[400px] flex-col overflow-hidden bg-[linear-gradient(180deg,#E6EDFC_0%,#ECF0FC_20%,#EFF1FD_100%)] sm:h-[860px] sm:rounded-[44px] sm:border-[10px] sm:border-[#1E2433] sm:shadow-2xl">
        <StatusBar />
        <ReportListScreen />
      </div>
    </div>
  )
}
