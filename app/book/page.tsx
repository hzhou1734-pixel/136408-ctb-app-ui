import type { Metadata } from 'next'
import { BookScreen } from '@/components/book/book-screen'
import { BottomNav } from '@/components/home/bottom-nav'
import { StatusBar } from '@/components/home/status-bar'

export const metadata: Metadata = {
  title: '错题本 - Max AI错题宝',
  description: '按班级、学生、科目查看和管理学生错题本',
}

export default function BookPage() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-[#E9ECF3] sm:py-8">
      <div className="relative flex h-dvh w-full max-w-[400px] flex-col overflow-hidden bg-[linear-gradient(180deg,#E6EDFC_0%,#ECF0FC_20%,#EFF1FD_100%)] sm:h-[860px] sm:rounded-[44px] sm:border-[10px] sm:border-[#1E2433] sm:shadow-2xl">
        <StatusBar />
        <BookScreen />
        <BottomNav active="book" />
      </div>
    </div>
  )
}
