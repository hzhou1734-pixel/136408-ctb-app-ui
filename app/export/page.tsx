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
  const push = sheet === 'bank' || sheet === 'ai' ? sheet : params.push === 'bank' || params.push === 'ai' ? params.push : null
  const initialStep = sheet === 'students' || sheet === 'filename' || sheet === 'done' ? sheet : null
  const student: Student = students.includes(params.student as Student) ? (params.student as Student) : students[0]
  const subject: Subject = subjects.includes(params.subject as Subject) ? (params.subject as Subject) : '数学'

  const all = buildGroups(student, subject).flatMap((g) => g.questions)
  const ids = new Set(params.ids?.split(',').filter(Boolean) ?? [])
  const picked = all.filter((q) => ids.has(q.id))
  const questions = picked.length > 0 ? picked : all.slice(0, 5)

  return (
    <div className="contents">
      <div className="relative flex h-full w-full flex-col overflow-hidden bg-[linear-gradient(180deg,#E6EDFC_0%,#ECF0FC_20%,#EFF1FD_100%)]">
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
