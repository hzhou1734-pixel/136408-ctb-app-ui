import type { Metadata } from 'next'
import { StatusBar } from '@/components/home/status-bar'
import { OrganizeScreen } from '@/components/organize/organize-screen'

export const metadata: Metadata = {
  title: '错题整理 - Max AI错题宝',
  description: '按班级、科目、学生整理错题并导出错题本',
}

export default function OrganizePage() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-[#E9ECF3] sm:py-8">
      <div className="relative flex h-dvh w-full max-w-[400px] flex-col overflow-hidden bg-[linear-gradient(180deg,#E6EDFC_0%,#ECF0FC_20%,#EFF1FD_100%)] sm:h-[860px] sm:rounded-[44px] sm:border-[10px] sm:border-[#1E2433] sm:shadow-2xl">
        <div aria-hidden="true" className="pointer-events-none absolute -right-20 top-40 size-64 rounded-full bg-[#CDE6FF]/60 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-[420px] size-56 rounded-full bg-[#CCE6FF]/70 blur-3xl" />
        <StatusBar />
        <OrganizeScreen />
      </div>
    </div>
  )
}
