'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

type PageLink = { href: string; label: string }
type PageGroup = { title: string; pages: PageLink[] }

const groups: PageGroup[] = [
  {
    title: '首页',
    pages: [{ href: '/', label: '首页' }],
  },
  {
    title: '错题采集',
    pages: [
      { href: '/capture', label: '错题拍收' },
      { href: '/capture?mode=cross', label: '跨页拍题' },
    ],
  },
  {
    title: '错题整理与导出',
    pages: [
      { href: '/organize', label: '错题整理' },
      { href: '/organize?sheet=filter', label: '筛选弹窗' },
      { href: '/organize?sheet=assign', label: '导出给学生' },
      { href: '/organize?sheet=assigned', label: '导入错题库成功' },
      { href: '/export', label: '设置及排版' },
      { href: '/export?sheet=students', label: '选择学生导出' },
      { href: '/export?sheet=filename', label: '导出PDF' },
      { href: '/export?sheet=done', label: '导出成功' },
    ],
  },
  {
    title: '举一反三',
    pages: [
      { href: '/practice', label: '举一反三' },
      { href: '/export?sheet=bank', label: '题库推送' },
      { href: '/export?push=bank&sheet=students', label: '题库推送·选择学生' },
      { href: '/export?push=bank&sheet=filename', label: '题库推送·导出PDF' },
      { href: '/export?push=bank&sheet=done', label: '题库推送·导出成功' },
      { href: '/export?sheet=ai', label: 'AI推送' },
      { href: '/export?push=ai&sheet=students', label: 'AI推送·选择学生' },
      { href: '/export?push=ai&sheet=filename', label: 'AI推送·导出PDF' },
      { href: '/export?push=ai&sheet=done', label: 'AI推送·导出成功' },
    ],
  },
  {
    title: '作业批改',
    pages: [
      { href: '/grading', label: '批改列表' },
      { href: '/grading?sheet=class', label: '切换班级' },
    ],
  },
  {
    title: '作文批阅',
    pages: [
      { href: '/essay', label: '作文列表' },
      { href: '/essay?sheet=class', label: '作文·切换班级' },
      { href: '/essay/new', label: '作文批阅' },
    ],
  },
  {
    title: '错题统计',
    pages: [
      { href: '/stats', label: '班级错题统计' },
      { href: '/stats?sheet=filter', label: '统计·筛选' },
    ],
  },
]

const totalPages = groups.reduce((sum, group) => sum + group.pages.length, 0)

export function PageSwitcher() {
  return (
    <Suspense fallback={null}>
      <PageSwitcherContent />
    </Suspense>
  )
}

function PageSwitcherContent() {
  const pathname = usePathname()
  const params = useSearchParams()
  const sheet = params.get('sheet')
  const mode = params.get('mode')
  const push = params.get('push')
  const current =
    push && sheet
      ? `${pathname}?push=${push}&sheet=${sheet}`
      : sheet
        ? `${pathname}?sheet=${sheet}`
        : mode
          ? `${pathname}?mode=${mode}`
          : pathname

  return (
    <aside
      aria-label="全部页面"
      className="hidden w-[520px] shrink-0 flex-col gap-8 py-10 lg:flex"
    >
      <header className="flex flex-col items-start gap-4">
        <span className="rounded-full bg-[#DCEBFF] px-3.5 py-1.5 text-sm font-semibold text-[#1E5FB8]">
          Max AI错题宝 · 教师端
        </span>
        <h1 className="text-balance text-4xl font-bold tracking-tight text-[#1E2433]">全部页面高保真 UI</h1>
        <p className="text-pretty text-base leading-relaxed text-[#5B6478]">
          共 {totalPages} 个页面，沿用原型的功能与跳转流程。可直接在手机中点击操作，也可通过下方目录快速跳转。
        </p>
      </header>

      <nav aria-label="页面目录" className="flex flex-col gap-7">
        {groups.map((group) => (
          <section key={group.title} className="flex flex-col gap-3.5">
            <h2 className="flex items-center gap-2.5 text-lg font-bold text-[#1E2433]">
              <span aria-hidden="true" className="h-4 w-1 rounded-full bg-[#1E88F2]" />
              {group.title}
              <span className="text-sm font-normal text-[#A0A8B8]">{group.pages.length}</span>
            </h2>
            <ul className="flex flex-wrap gap-2.5">
              {group.pages.map((page) => {
                const active = current === page.href
                return (
                  <li key={page.href}>
                    <Link
                      href={page.href}
                      aria-current={active ? 'page' : undefined}
                      className={`inline-flex h-10 items-center rounded-full px-4 text-[15px] font-medium transition-colors ${
                        active
                          ? 'bg-[linear-gradient(135deg,#3DA9FF_0%,#1E88F2_100%)] text-white shadow-[0_6px_16px_rgba(30,136,242,0.28)]'
                          : 'bg-white text-[#3A4256] shadow-[0_2px_8px_rgba(30,36,51,0.04)] hover:text-[#1E88F2]'
                      }`}
                    >
                      {page.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </section>
        ))}
      </nav>
    </aside>
  )
}
