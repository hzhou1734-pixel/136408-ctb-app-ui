import type { Metadata } from 'next'
import { StatusBar } from '@/components/home/status-bar'
import { OrganizeScreen } from '@/components/organize/organize-screen'

export const metadata: Metadata = {
  title: '错题整理 - Max AI错题宝',
  description: '按班级、科目、学生整理错题并导出错题本',
}

export default async function OrganizePage({ searchParams }: { searchParams: Promise<{ sheet?: string }> }) {
  const { sheet } = await searchParams
  return (
    <div className="contents">
      <div className="relative flex h-full w-full flex-col overflow-hidden bg-[linear-gradient(180deg,#E6EDFC_0%,#ECF0FC_20%,#EFF1FD_100%)]">
        <div aria-hidden="true" className="pointer-events-none absolute -right-20 top-40 size-64 rounded-full bg-[#CDE6FF]/60 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-[420px] size-56 rounded-full bg-[#CCE6FF]/70 blur-3xl" />
        <StatusBar />
        <OrganizeScreen
          initialFilterOpen={sheet === 'filter'}
          initialAssignStep={sheet === 'assign' ? 'students' : sheet === 'assigned' ? 'done' : 'none'}
          key={sheet ?? 'none'}
        />
      </div>
    </div>
  )
}
