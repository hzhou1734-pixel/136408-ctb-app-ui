import type { Period } from '@/lib/stats-data'

export type ReadStatus = '未阅读' | '已查看'
export type Stage = '小学' | '中学'

export const stageSubjects: Record<Stage, string[]> = {
  小学: ['数学', '英语', '语文'],
  中学: ['数学', '英语', '语文', '物理', '化学', '生物', '历史', '地理', '道法'],
}

export const reportPeriodLabels: Record<Period, string> = {
  本周: '2026.10.26-2026.11.01',
  上周: '2026.10.19-2026.10.25',
  本月: '2026年10月',
  上月: '2026年9月',
}

export type SubjectStats = {
  total: number
  retrained: number
  extended: number
  remaining: number
}

export type ClearReport = {
  id: string
  student: string
  stage: Stage
  period: Period
  sentAt: string
  date: string
  status: ReadStatus
}

export const avatarColors = ['#1E88F5', '#7B61FF', '#F08A24', '#16A34A', '#E5533D']

export const reports: ClearReport[] = [
  { id: 'r1', student: '张小明', stage: '中学', period: '本周', sentAt: '10月28日 20:30', date: '10月28日', status: '未阅读' },
  { id: 'r2', student: '李小白', stage: '中学', period: '本周', sentAt: '10月28日 20:30', date: '10月28日', status: '已查看' },
  { id: 'r3', student: '王浩然', stage: '小学', period: '本周', sentAt: '10月27日 21:10', date: '10月27日', status: '已查看' },
  { id: 'r4', student: '陈雨桐', stage: '小学', period: '上周', sentAt: '10月21日 20:00', date: '10月21日', status: '已查看' },
  { id: 'r5', student: '张小明', stage: '中学', period: '上周', sentAt: '10月21日 20:30', date: '10月21日', status: '已查看' },
  { id: 'r6', student: '李小白', stage: '中学', period: '上月', sentAt: '9月30日 20:30', date: '9月30日', status: '已查看' },
]

function hash(text: string) {
  let h = 7
  for (let i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) % 9973
  return h
}

const fixedStats: Record<string, SubjectStats> = {
  '张小明|本周|数学': { total: 8, retrained: 4, extended: 2, remaining: 2 },
}

export function getSubjectStats(student: string, period: Period, subject: string): SubjectStats {
  const fixed = fixedStats[`${student}|${period}|${subject}`]
  if (fixed) return fixed
  const scale = period === '本月' || period === '上月' ? 3 : 1
  const total = (hash(`${student}${period}${subject}`) % 8) * scale
  const retrained = Math.round(total * 0.5)
  const extended = Math.round((total - retrained) * 0.5)
  return { total, retrained, extended, remaining: total - retrained - extended }
}

export function getTrend(student: string, period: Period, subject: string) {
  const month = period === '上月' ? 9 : 10
  const isMonthly = period === '本月' || period === '上月'

  if (isMonthly) {
    const months = Array.from({ length: 6 }, (_, i) => month - 5 + i)
    const labels = months.map((m) => `${m}月`)
    const points =
      student === '张小明' && subject === '数学' && month === 10
        ? [18, 24, 15, 21, 12, 9]
        : months.map((m) => 6 + (hash(`${student}${m}${subject}m`) % 22))
    return { title: `近6个月【${subject}】错题数量趋势`, labels, points }
  }

  const labels = Array.from({ length: 5 }, (_, i) => `第${i + 1}周`)
  const points =
    student === '张小明' && month === 10 && subject === '数学'
      ? [4, 9, 2, 6, 8]
      : labels.map((_, i) => hash(`${student}${month}${subject}${i}`) % 11)
  return { title: `${month}月份【${subject}】错题数量趋势`, labels, points }
}

export function reportsForPeriod(period: Period) {
  if (period === '本月') return reports.filter((r) => r.period !== '上月')
  return reports.filter((r) => r.period === period)
}

export function getReport(id: string) {
  return reports.find((r) => r.id === id)
}
