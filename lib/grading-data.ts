export type GradingRecord = {
  id: string
  subject: string
  student: string
  date: string
  pages: number
}

export const classes = ['三年级（1）班', '三年级（2）班', '四年级（1）班', '四年级（3）班']

export const studentsByClass: Record<string, string[]> = {
  '三年级（1）班': ['曹小明', '园园', '贺泽轩'],
  '三年级（2）班': ['大帆', '李若溪', '王子涵'],
  '四年级（1）班': ['陈一鸣', '张可欣', '刘浩然'],
  '四年级（3）班': ['赵思琪', '周博文', '吴雨桐'],
}

export const gradingSubjects = [
  { name: '数学', image: '/images/grading/subject-math.png', color: '#1E88F5' },
  { name: '语文', image: '/images/grading/subject-chinese.png', color: '#F26B1D' },
  { name: '英语', image: '/images/grading/subject-english.png', color: '#8B4FD8' },
]

export const gradingRecords: GradingRecord[] = [
  { id: 'r1', subject: '数学', student: '曹小明', date: '2026-10-10', pages: 1 },
  { id: 'r2', subject: '数学', student: '曹小明', date: '2026-10-10', pages: 1 },
  { id: 'r3', subject: '英语', student: '曹小明', date: '2026-07-09', pages: 1 },
  { id: 'r4', subject: '数学', student: '曹小明', date: '2026-04-17', pages: 2 },
  { id: 'r5', subject: '数学', student: '园园', date: '2026-03-28', pages: 1 },
  { id: 'r6', subject: '数学', student: '曹小明', date: '2026-03-19', pages: 1 },
  { id: 'r7', subject: '语文', student: '大帆', date: '2026-03-12', pages: 3 },
]

export function groupByDate(records: GradingRecord[]) {
  const map = new Map<string, GradingRecord[]>()
  for (const record of records) {
    const list = map.get(record.date) ?? []
    list.push(record)
    map.set(record.date, list)
  }
  return [...map.entries()].map(([date, items]) => ({ date, items }))
}
