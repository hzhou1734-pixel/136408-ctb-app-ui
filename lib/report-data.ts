import type { Period } from '@/lib/stats-data'

export type ReportSubject = {
  subject: string
  total: number
  retrained: number
  extended: number
  conclusion: string
}

export type ClearReport = {
  id: string
  student: string
  period: Period
  sentAt: string
  date: string
  subjects: ReportSubject[]
}

export const avatarColors = ['#1E88F5', '#7B61FF', '#F08A24', '#16A34A', '#E5533D']

export const reports: ClearReport[] = [
  {
    id: 'r1',
    student: '张小明',
    period: '本周',
    sentAt: '10月28日 20:30',
    date: '10月28日',
    subjects: [
      {
        subject: '数学',
        total: 8,
        retrained: 4,
        extended: 2,
        conclusion:
          '移项变号已基本掌握，原题重练全部正确；四则混合运算顺序仍有 2 道反复出错，建议本周末再做 1 组同类题巩固。',
      },
      {
        subject: '英语',
        total: 5,
        retrained: 3,
        extended: 1,
        conclusion: '不规则动词过去式进步明显，介词 in/on/at 仍易混淆，建议结合例句每天复习 5 分钟。',
      },
      {
        subject: '语文',
        total: 3,
        retrained: 2,
        extended: 1,
        conclusion: '本周语文错题已全部清零，古诗词默写准确率提升，继续保持。',
      },
    ],
  },
  {
    id: 'r2',
    student: '李思琪',
    period: '本周',
    sentAt: '10月28日 19:45',
    date: '10月28日',
    subjects: [
      {
        subject: '数学',
        total: 6,
        retrained: 3,
        extended: 2,
        conclusion: '计算类错题已清零，应用题审题仍需加强，建议圈画关键词后再列式。',
      },
      {
        subject: '物理',
        total: 4,
        retrained: 2,
        extended: 1,
        conclusion: '受力分析图画法已规范，摩擦力方向判断还有 1 道未解决，建议观看对应知识点讲解。',
      },
    ],
  },
  {
    id: 'r3',
    student: '王浩然',
    period: '本周',
    sentAt: '10月27日 21:10',
    date: '10月27日',
    subjects: [
      {
        subject: '英语',
        total: 7,
        retrained: 4,
        extended: 1,
        conclusion: '听力细节题有进步，语法填空中时态判断仍是薄弱点，建议整理时态标志词卡片。',
      },
    ],
  },
  {
    id: 'r4',
    student: '陈雨桐',
    period: '上周',
    sentAt: '10月21日 20:00',
    date: '10月21日',
    subjects: [
      {
        subject: '数学',
        total: 5,
        retrained: 3,
        extended: 2,
        conclusion: '上周数学错题已全部清零，一元一次方程掌握扎实。',
      },
    ],
  },
  {
    id: 'r5',
    student: '张小明',
    period: '本月',
    sentAt: '10月14日 20:30',
    date: '10月14日',
    subjects: [
      {
        subject: '数学',
        total: 10,
        retrained: 6,
        extended: 2,
        conclusion: '分数运算错误率下降，几何证明书写步骤不完整，建议参照范例规范书写。',
      },
    ],
  },
]

export function reportTotals(report: ClearReport) {
  const total = report.subjects.reduce((s, x) => s + x.total, 0)
  const retrained = report.subjects.reduce((s, x) => s + x.retrained, 0)
  const extended = report.subjects.reduce((s, x) => s + x.extended, 0)
  return { total, retrained, extended, remaining: total - retrained - extended }
}

export function reportsForPeriod(period: Period) {
  if (period === '本月') return reports.filter((r) => r.period !== '上月')
  return reports.filter((r) => r.period === period)
}

export function getReport(id: string) {
  return reports.find((r) => r.id === id)
}
