export type EssayRecord = {
  id: string
  title: string
  className: string
  student: string
  submittedAt: string
}

export const essayRecords: EssayRecord[] = [
  { id: 'e1', title: '快乐的一天', className: '星辰班', student: '曹小明', submittedAt: '2026-03-15 10:31:00' },
  { id: 'e2', title: '我的植物朋友', className: '星辰班', student: '曹小明', submittedAt: '2026-03-15 10:26:46' },
  { id: 'e3', title: '快乐的一天', className: '星辰班', student: '曹小明', submittedAt: '2026-03-15 10:15:07' },
  { id: 'e4', title: '这儿真美', className: '星辰班', student: '曹小明', submittedAt: '2026-02-28 14:37:25' },
  { id: 'e5', title: '崭新', className: '星辰班', student: '曹小明', submittedAt: '2026-02-04 14:30:26' },
  { id: 'e6', title: '姑姑', className: '星辰班', student: '曹小明', submittedAt: '2026-01-30 11:52:18' },
  { id: 'e7', title: '姑姑', className: '星辰班', student: '曹小明', submittedAt: '2026-01-30 11:49:37' },
]

export const essayClasses = ['星辰班']
