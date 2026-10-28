import type { Metadata } from 'next'
import { CaptureScreen } from '@/components/capture/capture-screen'
import { StatusBar } from '@/components/home/status-bar'

export const metadata: Metadata = {
  title: '错题拍收 - Max AI错题宝',
  description: '整页拍题与跨页拍题，快速收录学生错题',
}

export default function CapturePage() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-[#E9ECF3] sm:py-8">
      <div className="relative flex h-dvh w-full max-w-[400px] flex-col overflow-hidden bg-[linear-gradient(180deg,#E6EDFC_0%,#ECF0FC_20%,#EFF1FD_100%)] sm:h-[860px] sm:rounded-[44px] sm:border-[10px] sm:border-[#1E2433] sm:shadow-2xl">
        <div aria-hidden="true" className="pointer-events-none absolute -right-20 top-40 size-64 rounded-full bg-[#DCD3FF]/60 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-[420px] size-56 rounded-full bg-[#CFE0FF]/70 blur-3xl" />
        <StatusBar />
        <CaptureScreen />
      </div>
    </div>
  )
}
