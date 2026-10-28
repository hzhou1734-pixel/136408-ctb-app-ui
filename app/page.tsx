import { BottomNav } from '@/components/home/bottom-nav'
import { HeroCarousel } from '@/components/home/hero-carousel'
import { HomeHeader } from '@/components/home/home-header'
import { NoticeBar } from '@/components/home/notice-bar'
import { OtherSection } from '@/components/home/other-section'
import { StatusBar } from '@/components/home/status-bar'
import { ToolboxGrid } from '@/components/home/toolbox-grid'

export default function Page() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-[#E9ECF3] sm:py-8">
      <div className="relative flex h-dvh w-full max-w-[400px] flex-col overflow-hidden bg-[linear-gradient(180deg,#EAF1FF_0%,#F1EEFF_45%,#F5F7FC_100%)] sm:h-[860px] sm:rounded-[44px] sm:border-[10px] sm:border-[#1E2433] sm:shadow-2xl">
        <div aria-hidden="true" className="pointer-events-none absolute -right-20 top-40 size-64 rounded-full bg-[#DCD3FF]/60 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-[420px] size-56 rounded-full bg-[#CFE0FF]/70 blur-3xl" />
        <StatusBar />
        <main className="relative flex flex-1 flex-col gap-5 overflow-y-auto pb-32 [scrollbar-width:none]">
          <HomeHeader />
          <HeroCarousel />
          <NoticeBar />
          <ToolboxGrid />
          <OtherSection />
        </main>
        <BottomNav />
      </div>
    </div>
  )
}
