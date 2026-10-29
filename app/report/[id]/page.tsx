import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ReportDetailScreen } from '@/components/report/report-detail-screen'
import { StatusBar } from '@/components/home/status-bar'
import { getReport } from '@/lib/report-data'

export const metadata: Metadata = {
  title: '错题清零报告详情 - Max AI错题宝',
  description: '分科目查看错题数量、原题重练与举一反三解决情况及 AI 结论',
}

export default async function ReportDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const report = getReport(id)
  if (!report) notFound()

  return (
    <div className="flex min-h-dvh items-center justify-center bg-[#E9ECF3] sm:py-8">
      <div className="relative flex h-dvh w-full max-w-[400px] flex-col overflow-hidden bg-[linear-gradient(180deg,#E6EDFC_0%,#ECF0FC_20%,#EFF1FD_100%)] sm:h-[860px] sm:rounded-[44px] sm:border-[10px] sm:border-[#1E2433] sm:shadow-2xl">
        <StatusBar />
        <ReportDetailScreen report={report} />
      </div>
    </div>
  )
}
