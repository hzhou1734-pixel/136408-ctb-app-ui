import type { Metadata } from 'next'
import { FeedbackScreen } from '@/components/me/feedback-screen'
import { PhoneFrame, SubPage } from '@/components/me/sub-page'

export const metadata: Metadata = {
  title: '意见反馈 - Max AI错题宝',
}

export default function FeedbackPage() {
  return (
    <PhoneFrame>
      <SubPage title="意见反馈">
        <FeedbackScreen />
      </SubPage>
    </PhoneFrame>
  )
}
