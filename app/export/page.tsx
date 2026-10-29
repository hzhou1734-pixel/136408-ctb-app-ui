import type { Metadata } from 'next'
import { ExportScreen } from '@/components/export/export-screen'
import { StatusBar } from '@/components/home/status-bar'
import { buildGroups, students, subjects, type Student, type Subject } from '@/lib/organize-data'

export const metadata: Metadata = {
  title: '设置及排版 - Max AI错题宝',
  description: '设置错题本排版格式并导出 PDF',
}

export default async function ExportPage({
  searchParams,
}: {
  searchParams: Promise<{ student?: string; subject?: string; ids?: string; sheet?: string; push?: string }>
}) {
  const params = await searchParams
  const sheet = params.sheet
  const push = sheet === 'bank' || sheet === 'ai' ? sheet : sheet === 'pushed' ? (params.push === 'ai' ? 'ai' : 'bank') : null
  const initialStep =
    sheet === 'students' || sheet === 'filename' || sheet === 'done'
      ? sheet
      : sheet === 'bank' || sheet === 'ai'
        ? 'students'
        : sheet === 'pushed'
          ? 'done'
          : null
  const student: Student = students.includes(params.student as Student) ? (params.student as Student) : students[0]
  const subject: Subject = subjects.includes(params.subject as Subject) ? (params.subject as Subject) : '数学'

  const all = buildGroups(student, subject).flatMap((g) => g.questions)
  const ids = new Set(params.ids?.split(',').filter(Boolean) ?? [])
  const picked = all.filter((q) => ids.has(q.id))
  const questions = picked.length > 0 ? picked : all.slice(0, 5)

  return (
    <div className="flex min-h-dvh items-center justify-center bg-[#E9ECF3] sm:py-8">
      <div className="relative flex h-dvh w-full max-w-[400px] flex-col overflow-hidden bg-[linear-gradient(180deg,#E6EDFC_0%,#ECF0FC_20%,#EFF1FD_100%)] sm:h-[860px] sm:rounded-[44px] sm:border-[10px] sm:border-[#1E2433] sm:shadow-2xl">
        <StatusBar />
        <ExportScreen student={student} subject={subject} date="2026-10-17" questions={questions}
          initialStep={initialStep}
          initialPush={push}
          key={sheet ?? 'none'}
        />
      </div>
    </div>
  )
}
