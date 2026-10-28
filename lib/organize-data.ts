export type Question = {
  id: string
  no: number
  stem: string
  tag: string
}

export type DateGroup = {
  date: string
  questions: Question[]
}

export const subjects = ['数学', '英语', '语文', '物理', '化学'] as const
export type Subject = (typeof subjects)[number]

export const students = ['曹小明', '园园', '大帆', '李若溪', '王子涵', '陈一鸣', '张可欣', '刘浩然', '赵思琪', '周博文', '吴雨桐', '孙铭泽', '郑佳怡', '黄子轩'] as const
export type Student = (typeof students)[number]

const stems: Record<Subject, { stem: string; tag: string }[]> = {
  数学: [
    { stem: '计算：12 × (5 + 3) − 18 ÷ 3 的值是多少？', tag: '计算失误' },
    { stem: '一个长方形周长 36 cm，长比宽多 4 cm，求面积。', tag: '审题不清' },
    { stem: '解方程：3x − 7 = 2x + 5，并写出检验过程。', tag: '步骤缺失' },
    { stem: '甲乙两车相向而行，3 小时后相遇，求两地距离。', tag: '概念混淆' },
    { stem: '把 0.375 化成最简分数，并比较与 3/7 的大小。', tag: '计算失误' },
  ],
  英语: [
    { stem: 'She ___ to school by bike every day. (go)', tag: '时态错误' },
    { stem: 'Choose: There ___ some milk in the glass.', tag: '主谓一致' },
    { stem: '翻译：他昨天没有完成作业。', tag: '语法错误' },
    { stem: 'What is the past tense of "catch"?', tag: '词汇记忆' },
  ],
  语文: [
    { stem: '给加点字注音：一丝不苟、恪守、炽热。', tag: '字音易错' },
    { stem: '“春风又绿江南岸”中“绿”字的妙处是什么？', tag: '理解偏差' },
    { stem: '修改病句：通过这次活动，使我明白了团结的重要。', tag: '病句辨析' },
    { stem: '默写：《静夜思》后两句。', tag: '默写错字' },
  ],
  物理: [
    { stem: '一物体做匀速直线运动，5 s 内通过 20 m，求速度。', tag: '单位换算' },
    { stem: '为什么冬天搓手会感到暖和？', tag: '概念混淆' },
  ],
  化学: [
    { stem: '写出水通电分解的化学方程式。', tag: '配平错误' },
    { stem: '区分物理变化与化学变化：冰融化、铁生锈。', tag: '概念混淆' },
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
          tag: item.tag,
        }
      }),
    }
  })
}
