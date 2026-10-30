import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { StatusBar } from '@/components/home/status-bar'

export function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-[#E9ECF3] sm:py-8">
      <div className="relative flex h-dvh w-full max-w-[400px] flex-col overflow-hidden bg-[#F5F7FB] sm:h-[860px] sm:rounded-[44px] sm:border-[10px] sm:border-[#1E2433] sm:shadow-2xl">
        {children}
      </div>
    </div>
  )
}

export function SubPage({
  title,
  backHref = '/me',
  children,
}: {
  title: string
  backHref?: string
  children: React.ReactNode
}) {
  return (
    <div className="relative flex flex-1 flex-col overflow-hidden bg-[#F5F7FB]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[220px] bg-[linear-gradient(180deg,#C9D8FB_0%,#E3EBFD_55%,#F5F7FB_100%)]"
      />
      <StatusBar />
      <header className="relative grid h-11 shrink-0 grid-cols-[44px_1fr_44px] items-center px-2">
        <Link
          href={backHref}
          aria-label="返回"
          className="flex size-10 items-center justify-center rounded-full text-[#1F2533] active:bg-[#FFFFFF]/60"
        >
          <ChevronLeft className="size-6" aria-hidden="true" />
        </Link>
        <h1 className="text-center text-[18px] font-semibold text-[#1F2533]">{title}</h1>
        <span aria-hidden="true" />
      </header>
      <div className="relative flex flex-1 flex-col overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {children}
      </div>
    </div>
  )
}
