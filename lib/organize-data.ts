export const questionTypes = ['选择题', '判断题', '填空题', '计算题', '解答题'] as const
export type QuestionType = (typeof questionTypes)[number]

export const difficulties = ['简单', '中等', '困难', '超难'] as const
export type Difficulty = (typeof difficulties)[number]

export const resolveStatuses = ['待解决', '已解决'] as const
export type ResolveStatus = (typeof resolveStatuses)[number]

export type Question = {
  id: string
  no: number
  stem: string
  type: QuestionType
  difficulty: Difficulty
  resolved: boolean
}

export type DateGroup = {
  date: string
  questions: Question[]
}

export const subjects = ['数学', '英语', '语文', '物理', '化学'] as const
export type Subject = (typeof subjects)[number]

export const students = ['曹小明', '园园', '大帆', '李若溪', '王子涵', '陈一鸣', '张可欣', '刘浩然', '赵思琪', '周博文', '吴雨桐', '孙铭泽', '郑佳怡', '黄子轩'] as const
export type Student = (typeof students)[number]

type StemItem = { stem: string; type: QuestionType; difficulty: Difficulty }

const stems: Record<Subject, StemItem[]> = {
  数学: [
    { stem: '计算：12 × (5 + 3) − 18 ÷ 3 的值是多少？', type: '计算题', difficulty: '简单' },
    { stem: '一个长方形周长 36 cm，长比宽多 4 cm，求面积。', type: '解答题', difficulty: '中等' },
    { stem: '解方程：3x − 7 = 2x + 5，并写出检验过程。', type: '计算题', difficulty: '简单' },
    { stem: '甲乙两车相向而行，3 小时后相遇，求两地距离。', type: '解答题', difficulty: '困难' },
    { stem: '判断：0.375 化成最简分数后比 3/7 大。', type: '判断题', difficulty: '超难' },
  ],
  英语: [
    { stem: 'She ___ to school by bike every day. (go)', type: '填空题', difficulty: '简单' },
    { stem: 'Choose: There ___ some milk in the glass. A. is  B. are', type: '选择题', difficulty: '中等' },
    { stem: '翻译：他昨天没有完成作业。', type: '解答题', difficulty: '困难' },
    { stem: 'What is the past tense of "catch"?', type: '填空题', difficulty: '简单' },
  ],
  语文: [
    { stem: '给加点字注音：一丝不苟、恪守、炽热。', type: '填空题', difficulty: '简单' },
    { stem: '“春风又绿江南岸”中“绿”字的妙处是什么？', type: '解答题', difficulty: '超难' },
    { stem: '判断：“通过这次活动，使我明白了团结的重要。”是病句。', type: '判断题', difficulty: '中等' },
    { stem: '默写：《静夜思》后两句。', type: '填空题', difficulty: '简单' },
  ],
  物理: [
    { stem: '一物体做匀速直线运动，5 s 内通过 20 m，求速度。', type: '计算题', difficulty: '简单' },
    { stem: '冬天搓手感到暖和是通过哪种方式改变内能？A. 做功  B. 热传递', type: '选择题', difficulty: '困难' },
  ],
  化学: [
    { stem: '写出水通电分解的化学方程式。', type: '填空题', difficulty: '中等' },
    { stem: '下列属于化学变化的是？A. 冰融化  B. 铁生锈', type: '选择题', difficulty: '简单' },
  ],
}

const dates = ['2026/10/17', '2026/10/15', '2026/10/12']

export function buildGroups(student: Student, subject: Subject): DateGroup[] {
  const pool = stems[subject]
  const offset = students.indexOf(student)
  const groupCount = Math.min(dates.length, subject === '数学' ? 2 : 1 + (offset % 2))

  return dates.slice(0, groupCount).map((date, groupIndex) => {
    const size = groupIndex === 0 ? Math.min(4, pool.length) : Math.min(2, pool.length)
    return {
      date,
      questions: Array.from({ length: size }, (_, i) => {
        const item = pool[(i + offset + groupIndex * 2) % pool.length]
        return {
          id: `${student}-${subject}-${date}-${i}`,
          no: i + 1,
          stem: item.stem,
          type: item.type,
          difficulty: item.difficulty,
          resolved: (i + offset + groupIndex) % 3 === 1,
        }
      }),
    }
  })
}
