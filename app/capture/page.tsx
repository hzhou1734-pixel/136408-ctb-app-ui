import type { Metadata } from 'next'
import { CaptureScreen } from '@/components/capture/capture-screen'
import { StatusBar } from '@/components/home/status-bar'

export const metadata: Metadata = {
  title: '错题拍收 - Max AI错题宝',
  description: '整页拍题与跨页拍题，快速收录学生错题',
}

export default async function CapturePage({ searchParams }: { searchParams: Promise<{ mode?: string }> }) {
  const { mode } = await searchParams
  return (
    <div className="contents">
      <div className="relative flex h-full w-full flex-col overflow-hidden bg-[linear-gradient(180deg,#E6EDFC_0%,#ECF0FC_20%,#EFF1FD_100%)]">
        <div aria-hidden="true" className="pointer-events-none absolute -right-20 top-40 size-64 rounded-full bg-[#CDE6FF]/60 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-[420px] size-56 rounded-full bg-[#CCE6FF]/70 blur-3xl" />
        <StatusBar />
        <CaptureScreen initialMode={mode === 'cross' ? 'cross' : 'whole'} key={mode ?? 'none'} />
      </div>
    </div>
  )
}
