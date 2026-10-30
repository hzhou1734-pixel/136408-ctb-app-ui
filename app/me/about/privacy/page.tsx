import type { Metadata } from 'next'
import { LegalDocScreen } from '@/components/me/legal-doc-screen'
import { PhoneFrame, SubPage } from '@/components/me/sub-page'

export const metadata: Metadata = {
  title: '隐私政策 - Max AI错题宝',
}

export default function PrivacyPage() {
  return (
    <PhoneFrame>
      <SubPage title="隐私政策" backHref="/me/about">
        <LegalDocScreen docKey="privacy" />
      </SubPage>
    </PhoneFrame>
  )
}
