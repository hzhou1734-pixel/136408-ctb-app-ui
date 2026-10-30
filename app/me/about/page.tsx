import type { Metadata } from 'next'
import { AboutScreen } from '@/components/me/about-screen'
import { PhoneFrame, SubPage } from '@/components/me/sub-page'

export const metadata: Metadata = {
  title: '关于错题宝 - Max AI错题宝',
}

export default function AboutPage() {
  return (
    <PhoneFrame>
      <SubPage title="关于错题宝">
        <AboutScreen />
      </SubPage>
    </PhoneFrame>
  )
}
