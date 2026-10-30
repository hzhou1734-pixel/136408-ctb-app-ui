import { FileText, ShieldCheck } from 'lucide-react'

export const legalDocs = {
  agreement: {
    label: '用户协议',
    href: '/me/about/agreement',
    icon: FileText,
    body: [
      '欢迎使用 Max AI错题宝（以下简称“本应用”）。在使用本应用前，请你仔细阅读并理解本协议的全部内容。',
      '一、服务内容：本应用为教师提供错题采集、整理、导出、举一反三推送、作业批改与错题统计等服务。',
      '二、账号使用：你应妥善保管账号与密码，因账号保管不当造成的损失由你自行承担。',
      '三、内容规范：你上传的作业、试卷等内容应合法合规，不得侵犯他人合法权益。',
      '四、协议变更：我们可能适时更新本协议，更新后的协议将在应用内公布。',
    ],
  },
  privacy: {
    label: '隐私政策',
    href: '/me/about/privacy',
    icon: ShieldCheck,
    body: [
      '我们非常重视你和学生的个人信息与隐私保护。',
      '一、信息收集：为提供服务，我们会收集账号信息、班级与学生信息以及你上传的作业图片。',
      '二、信息使用：收集的信息仅用于错题识别、AI解析与学情统计，不会用于与服务无关的用途。',
      '三、信息保护：我们采用加密存储与访问控制等措施保护你的数据安全。',
      '四、你的权利：你可以在设置中注销账号，注销后相关数据将按规定删除。',
    ],
  },
}

export type LegalDocKey = keyof typeof legalDocs
