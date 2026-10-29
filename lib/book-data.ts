export type BookType = '原题' | 'AI推送' | '题库推送'

export type MistakeBook = {
  id: string
  type: BookType
  subject: string
  createdAt: string
  explained: boolean
}

export type BookStudent = {
  name: string
  books: MistakeBook[]
}

export const bookTypes: BookType[] = ['原题', 'AI推送', '题库推送']

export const bookTypeTitle: Record<BookType, string> = {
  原题: '原题错题本',
  AI推送: 'AI推送本',
  题库推送: '题库推送本',
}

export const bookTypeStyle: Record<BookType, { lines: string[]; bg: string }> = {
  原题: { lines: ['原题'], bg: 'linear-gradient(135deg,#FFB4A6 0%,#F98B7B 100%)' },
  AI推送: { lines: ['AI', '推送'], bg: 'linear-gradient(135deg,#A9D2FF 0%,#6FB0F5 100%)' },
  题库推送: { lines: ['题库', '推送'], bg: 'linear-gradient(135deg,#A2EBC9 0%,#5FCFA0 100%)' },
}

export const bookSubjects = ['数学', '语文', '英语']

export function bookTitle(book: MistakeBook, student: string) {
  const base = `${bookTypeTitle[book.type]}-${book.subject}-${student}`
  return book.type === '原题' ? base : `${base}-学生专属`
}

function make(prefix: string, rows: [BookType, string, string, boolean?][]): MistakeBook[] {
  return rows.map(([type, subject, createdAt, explained], i) => ({
    id: `${prefix}-${i}`,
    type,
    subject,
    createdAt,
    explained: explained ?? false,
  }))
}

export const bookClasses: Record<string, { totalMistakes: number; totalBooks: number; students: BookStudent[] }> = {
  星辰班: {
    totalMistakes: 1109,
    totalBooks: 322,
    students: [
      {
        name: '曹小明',
        books: make('cxm', [
          ['原题', '数学', '2026-10-17 11:11:42', true],
          ['原题', '数学', '2026-09-11 16:16:39'],
          ['原题', '数学', '2026-09-02 16:58:58'],
          ['AI推送', '数学', '2026-08-28 15:23:19'],
          ['题库推送', '数学', '2026-08-28 15:14:46'],
          ['原题', '数学', '2026-08-20 09:42:11'],
          ['原题', '语文', '2026-10-12 19:05:27'],
          ['AI推送', '语文', '2026-09-30 20:16:03'],
        ]),
      },
      {
        name: '园园',
        books: make('yy', [
          ['原题', '数学', '2026-10-20 18:30:12'],
          ['题库推送', '数学', '2026-10-08 14:22:50', true],
          ['原题', '英语', '2026-10-15 17:48:09'],
          ['AI推送', '英语', '2026-09-26 21:03:44'],
        ]),
      },
      {
        name: '贺泽轩',
        books: make('hzx', [
          ['原题', '数学', '2026-10-18 10:12:33'],
          ['原题', '语文', '2026-10-09 16:40:21'],
          ['AI推送', '语文', '2026-09-21 19:58:17'],
          ['题库推送', '英语', '2026-09-14 15:36:02'],
        ]),
      },
    ],
  },
  启航班: {
    totalMistakes: 864,
    totalBooks: 241,
    students: [
      {
        name: '李思琪',
        books: make('lsq', [
          ['原题', '数学', '2026-10-19 20:11:08'],
          ['AI推送', '数学', '2026-10-02 18:25:46'],
          ['原题', '英语', '2026-09-27 17:14:39'],
        ]),
      },
      {
        name: '王浩然',
        books: make('whr', [
          ['原题', '语文', '2026-10-16 19:32:55'],
          ['题库推送', '数学', '2026-10-05 16:08:12'],
        ]),
      },
    ],
  },
}

export function bookClassNames() {
  return Object.keys(bookClasses)
}
