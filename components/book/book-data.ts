export type BookType = 'origin' | 'ai' | 'bank'
export type Subject = '数学' | '语文' | '英语'
export type Book = {
  id: string
  type: BookType
  subject: Subject
  student: string
  time: string
  practiced?: boolean
  total: number
  solved: number
}

export const classes = ['星辰班', '启航班', '晨曦班']
export const students = ['曹小明', '园园', '贺泽轩']
export const subjects: Subject[] = ['数学', '语文', '英语']

export const subjectCounts: Record<string, Record<Subject, number>> = {
  曹小明: { 数学: 282, 语文: 40, 英语: 0 },
  园园: { 数学: 156, 语文: 63, 英语: 21 },
  贺泽轩: { 数学: 98, 语文: 12, 英语: 35 },
}

export const typeMeta: Record<BookType, { badge: string[]; name: string; className: string }> = {
  origin: { badge: ['原题'], name: '原题错题本', className: 'bg-[linear-gradient(135deg,#FFC2B6_0%,#FF9E8E_100%)]' },
  ai: { badge: ['AI', '推送'], name: 'AI推送本', className: 'bg-[linear-gradient(135deg,#B5DCFF_0%,#80BDF6_100%)]' },
  bank: { badge: ['题库', '推送'], name: '题库推送本', className: 'bg-[linear-gradient(135deg,#9BE8C8_0%,#5ED1A1_100%)]' },
}

const timeline: { type: BookType; time: string; practiced?: boolean; total: number; solved: number }[] = [
  { type: 'origin', time: '2026-10-17 11:11:42', practiced: true, total: 12, solved: 12 },
  { type: 'origin', time: '2026-09-11 16:16:39', total: 8, solved: 5 },
  { type: 'origin', time: '2026-09-02 16:58:58', total: 10, solved: 10 },
  { type: 'ai', time: '2026-08-28 15:23:19', total: 6, solved: 2 },
  { type: 'bank', time: '2026-08-28 15:14:46', total: 9, solved: 9 },
  { type: 'origin', time: '2026-08-20 09:32:05', total: 7, solved: 0 },
  { type: 'ai', time: '2026-08-12 18:04:51', total: 5, solved: 5 },
]

export const initialBooks: Book[] = students.flatMap((student, studentIndex) =>
  subjects.flatMap((subject, subjectIndex) =>
    subjectCounts[student][subject] === 0
      ? []
      : timeline.map((entry, index) => ({
          ...entry,
          id: `${studentIndex}-${subjectIndex}-${index}`,
          student,
          subject,
        })),
  ),
)

export function getBook(id: string) {
  return initialBooks.find((book) => book.id === id)
}

export function bookTitle(book: Book) {
  return `${typeMeta[book.type].name}-${book.subject}-${book.student}-学生错题`
}

export type Question = { id: string; no: number; stem: string; point: string; reason: string }

const questionPool: Record<Subject, { stem: string; point: string; reason: string }[]> = {
  数学: [
    { stem: '计算：3/4 + 5/6 − 1/3 = ？', point: '分数加减混合运算', reason: '通分错误' },
    { stem: '一个长方形周长 36 cm，长是宽的 2 倍，求面积。', point: '长方形周长与面积', reason: '审题不清' },
    { stem: '解方程：2x + 7 = 3x − 5', point: '一元一次方程', reason: '移项变号遗漏' },
    { stem: '甲乙两车相向而行，速度分别为 60 km/h 和 45 km/h，相距 315 km，几小时后相遇？', point: '相遇问题', reason: '数量关系不清' },
    { stem: '把 0.375 化成最简分数。', point: '小数与分数互化', reason: '约分不彻底' },
    { stem: '一个圆的直径是 8 cm，求它的面积（π 取 3.14）。', point: '圆的面积', reason: '半径与直径混淆' },
  ],
  语文: [
    { stem: '给加点字注音：“缥缈”“踌躇”', point: '字音辨析', reason: '多音字记忆不牢' },
    { stem: '修改病句：通过这次活动，使我明白了团结的重要。', point: '病句修改', reason: '成分残缺判断错误' },
    { stem: '“春风又绿江南岸”中“绿”字的妙处是什么？', point: '古诗词炼字', reason: '答题角度不全' },
    { stem: '下列词语中没有错别字的一项是？', point: '字形辨析', reason: '形近字混淆' },
  ],
  英语: [
    { stem: 'She ___ to school by bike every day. (go)', point: '一般现在时第三人称单数', reason: '动词未变形' },
    { stem: 'There ___ some milk in the glass.', point: 'There be 句型', reason: '不可数名词主谓一致' },
    { stem: 'I have lived here ___ 2018.', point: 'for / since 辨析', reason: '介词混用' },
    { stem: '翻译：他昨天没有去公园。', point: '一般过去时否定句', reason: '助动词遗漏' },
  ],
}

export function getQuestions(book: Book): Question[] {
  const pool = questionPool[book.subject]
  return Array.from({ length: book.total }, (_, i) => ({
    id: `${book.id}-q${i + 1}`,
    no: i + 1,
    ...pool[i % pool.length],
  }))
}
