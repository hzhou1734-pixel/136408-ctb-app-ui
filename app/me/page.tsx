import type { Metadata } from 'next'
import { MeScreen } from '@/components/me/me-screen'
import { BottomNav } from '@/components/home/bottom-nav'
import { PhoneFrame } from '@/components/me/sub-page'

export const metadata: Metadata = {
  title: '我的 - Max AI错题宝',
  description: '个人中心：错题回收站、积分豆记录、意见反馈、清理缓存、常见问题、关于错题宝',
}

export default function MePage() {
  return (
    <PhoneFrame>
      <div className="flex flex-1 flex-col overflow-hidden">
        <MeScreen />
      </div>
      <BottomNav active="me" />
    </PhoneFrame>
  )
}
