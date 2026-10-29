export const periods = ['本周', '上周', '本月', '上月'] as const
export type Period = (typeof periods)[number]

export const periodRanges: Record<Period, string> = {
  本周: '2026.10.26 - 11.01',
  上周: '2026.10.19 - 10.25',
  本月: '2026.10.01 - 10.31',
  上月: '2026.09.01 - 09.30',
}

export type Overview = {
  captured: number
  exportedBooks: number
  bankPush: number
  aiPush: number
}

export const overviews: Record<Period, Overview> = {
  本周: { captured: 22, exportedBooks: 6, bankPush: 4, aiPush: 3 },
  上周: { captured: 18, exportedBooks: 5, bankPush: 3, aiPush: 2 },
  本月: { captured: 86, exportedBooks: 21, bankPush: 12, aiPush: 9 },
  上月: { captured: 74, exportedBooks: 17, bankPush: 10, aiPush: 6 },
}

export const statSubjects = ['数学', '英语', '语文', '物理', '化学', '生物', '其他'] as const
export type StatSubject = (typeof statSubjects)[number]

const periodScale: Record<Period, number> = { 本周: 1, 上周: 0.8, 本月: 4, 上月: 3.4 }
const baseCounts: Record<StatSubject, number> = { 数学: 5, 英语: 3, 语文: 6, 物理: 5, 化学: 3, 生物: 0, 其他: 0 }

export function subjectCount(period: Period, subject: StatSubject) {
  return Math.round(baseCounts[subject] * periodScale[period])
}

export type KnowledgePoint = { name: string; errors: number; rate: number }
export type StudyTip = { point: string; mistake: string; method: string }
export type ErrorCause = '概念不清' | '审题不清' | '粗心失误' | '方法不当'
export type CauseItem = { cause: ErrorCause; detail: string; percent: number }
export type Attribution = { point: string; errors: number; causes: CauseItem[] }

export type SubjectInsight = {
  summary: string
  points: KnowledgePoint[]
  tips: StudyTip[]
  attributions: Attribution[]
}

export const insights: Partial<Record<StatSubject, SubjectInsight>> = {
  数学: {
    summary: '本周错题主要集中在一元一次方程与四则混合运算，移项变号、运算顺序是全班的共性薄弱点。',
    points: [
      { name: '一元一次方程·移项', errors: 9, rate: 42 },
      { name: '四则混合运算顺序', errors: 7, rate: 33 },
      { name: '长方形周长与面积', errors: 4, rate: 19 },
      { name: '行程问题·相遇', errors: 2, rate: 9 },
    ],
    tips: [
      {
        point: '一元一次方程·移项',
        mistake: '移项时忘记变号，或只移动未知数一侧的部分项。',
        method: '先口述“移项要变号”，再用不同颜色标出被移动的项，最后代入原方程检验。',
      },
      {
        point: '四则混合运算顺序',
        mistake: '有括号时仍从左往右计算，忽略先乘除后加减。',
        method: '计算前先画出运算顺序线，按“括号 → 乘除 → 加减”逐步书写中间结果。',
      },
    ],
    attributions: [
      {
        point: '一元一次方程·移项',
        errors: 9,
        causes: [
          { cause: '概念不清', detail: '不理解等式性质，移项不变号', percent: 56 },
          { cause: '粗心失误', detail: '抄错符号或漏移部分项', percent: 33 },
          { cause: '审题不清', detail: '未看清题目要求检验', percent: 11 },
        ],
      },
      {
        point: '四则混合运算顺序',
        errors: 7,
        causes: [
          { cause: '方法不当', detail: '习惯从左到右，忽略先乘除', percent: 57 },
          { cause: '粗心失误', detail: '中间结果计算错误', percent: 29 },
          { cause: '概念不清', detail: '括号作用理解不到位', percent: 14 },
        ],
      },
    ],
  },
  英语: {
    summary: '本周英语错题集中在一般过去时的不规则动词和介词搭配，听力细节题次之。',
    points: [
      { name: '不规则动词过去式', errors: 6, rate: 38 },
      { name: '时间介词 in/on/at', errors: 4, rate: 25 },
      { name: '听力细节信息', errors: 2, rate: 13 },
    ],
    tips: [
      {
        point: '不规则动词过去式',
        mistake: '按规则直接加 -ed，如 goed、buyed。',
        method: '按变化规律分组记忆（如 buy-bought / think-thought），每天听写 10 个。',
      },
    ],
    attributions: [
      {
        point: '不规则动词过去式',
        errors: 6,
        causes: [
          { cause: '概念不清', detail: '不规则变化未记牢，套用 -ed', percent: 67 },
          { cause: '粗心失误', detail: '拼写错误，如 thougth', percent: 33 },
        ],
      },
      {
        point: '时间介词 in/on/at',
        errors: 4,
        causes: [
          { cause: '方法不当', detail: '凭语感选择，未按时间范围区分', percent: 50 },
          { cause: '概念不清', detail: '具体某天上午用 on 不清楚', percent: 50 },
        ],
      },
    ],
  },
  语文: {
    summary: '本周语文错题以古诗文默写易错字和修辞手法辨析为主，阅读理解概括题失分明显。',
    points: [
      { name: '古诗文默写易错字', errors: 8, rate: 40 },
      { name: '修辞手法辨析', errors: 5, rate: 25 },
      { name: '阅读概括主要内容', errors: 4, rate: 20 },
    ],
    tips: [
      {
        point: '古诗文默写易错字',
        mistake: '形近字混淆，如“暮”写成“幕”。',
        method: '结合字义理解偏旁含义，整理易错字卡片，默写后对照原文圈改。',
      },
    ],
    attributions: [
      {
        point: '古诗文默写易错字',
        errors: 8,
        causes: [
          { cause: '概念不清', detail: '不理解字义，形近字混淆', percent: 50 },
          { cause: '粗心失误', detail: '漏字、添字、顺序颠倒', percent: 38 },
          { cause: '审题不清', detail: '情境默写对应句子选错', percent: 12 },
        ],
      },
      {
        point: '修辞手法辨析',
        errors: 5,
        causes: [
          { cause: '概念不清', detail: '比喻与拟人特征区分不清', percent: 60 },
          { cause: '方法不当', detail: '只看关键词“像”就判断比喻', percent: 40 },
        ],
      },
    ],
  },
  物理: {
    summary: '本周物理错题集中在速度单位换算和平均速度计算，图像题读取信息不准确。',
    points: [
      { name: '速度单位换算', errors: 6, rate: 36 },
      { name: '平均速度计算', errors: 5, rate: 30 },
      { name: 's-t 图像识读', errors: 3, rate: 18 },
    ],
    tips: [
      {
        point: '速度单位换算',
        mistake: 'm/s 与 km/h 换算时乘除方向弄反。',
        method: '牢记 1 m/s = 3.6 km/h，换算时写出单位推导过程，而不是只记数字。',
      },
    ],
    attributions: [
      {
        point: '速度单位换算',
        errors: 6,
        causes: [
          { cause: '方法不当', detail: '死记数字，乘除方向弄反', percent: 50 },
          { cause: '粗心失误', detail: '结果漏写或写错单位', percent: 33 },
          { cause: '审题不清', detail: '未注意题目要求的单位', percent: 17 },
        ],
      },
      {
        point: '平均速度计算',
        errors: 5,
        causes: [
          { cause: '概念不清', detail: '用速度平均值代替总路程÷总时间', percent: 60 },
          { cause: '审题不清', detail: '遗漏中途停留时间', percent: 40 },
        ],
      },
    ],
  },
  化学: {
    summary: '本周化学错题主要在化学式书写与化合价判断，实验现象描述不规范。',
    points: [
      { name: '化合价判断', errors: 4, rate: 35 },
      { name: '化学式书写', errors: 3, rate: 26 },
      { name: '实验现象描述', errors: 2, rate: 17 },
    ],
    tips: [
      {
        point: '化合价判断',
        mistake: '忽略化合物中正负化合价代数和为零。',
        method: '先标出已知元素化合价，再列等式求未知元素，最后口算验证。',
      },
    ],
    attributions: [
      {
        point: '化合价判断',
        errors: 4,
        causes: [
          { cause: '概念不清', detail: '忽略化合价代数和为零', percent: 50 },
          { cause: '方法不当', detail: '原子团化合价未整体看待', percent: 25 },
          { cause: '粗心失误', detail: '正负号标错', percent: 25 },
        ],
      },
      {
        point: '化学式书写',
        errors: 3,
        causes: [
          { cause: '方法不当', detail: '未用“正前负后、交叉约简”', percent: 67 },
          { cause: '粗心失误', detail: '角标大小写不规范', percent: 33 },
        ],
      },
    ],
  },
}
