import type { Metadata } from 'next'
import { BookDetailScreen } from '@/components/book/book-detail-screen'
import { StatusBar } from '@/components/home/status-bar'

export const metadata: Metadata = {
  title: '错题详情 - Max AI错题宝',
  description: '查看错题本中的全部错题并标记掌握情况',
}

export default async function BookDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <div className="flex min-h-dvh items-center justify-center bg-[#E9ECF3] sm:py-8">
      <div className="relative flex h-dvh w-full max-w-[400px] flex-col overflow-hidden bg-[linear-gradient(180deg,#E6EDFC_0%,#ECF0FC_20%,#EFF1FD_100%)] sm:h-[860px] sm:rounded-[44px] sm:border-[10px] sm:border-[#1E2433] sm:shadow-2xl">
        <StatusBar />
        <BookDetailScreen id={id} />
      </div>
    </div>
  )
}
