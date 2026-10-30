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
    <div className="contents">
      <div className="relative flex h-full w-full flex-col overflow-hidden bg-[linear-gradient(180deg,#E6EDFC_0%,#ECF0FC_20%,#EFF1FD_100%)]">
        <StatusBar />
        <BookScreen />
        <BottomNav active="book" />
      </div>
    </div>
  )
}
