import type { Metadata } from 'next'
import { EssayReviewScreen } from '@/components/essay/essay-review-screen'
import { StatusBar } from '@/components/home/status-bar'

export const metadata: Metadata = {
  title: '作文批阅 - Max AI错题宝',
  description: '输入作文标题并上传作文图片，提交 AI 批改',
}

export default function EssayReviewPage() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-[#E9ECF3] sm:py-8">
      <div className="relative flex h-dvh w-full max-w-[400px] flex-col overflow-hidden bg-[linear-gradient(180deg,#E6EDFC_0%,#ECF0FC_20%,#EFF1FD_100%)] sm:h-[860px] sm:rounded-[44px] sm:border-[10px] sm:border-[#1E2433] sm:shadow-2xl">
        <StatusBar />
        <EssayReviewScreen />
      </div>
    </div>
  )
}
