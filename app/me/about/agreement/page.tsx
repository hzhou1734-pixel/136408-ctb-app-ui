import type { Metadata } from 'next'
import { LegalDocScreen } from '@/components/me/legal-doc-screen'
import { PhoneFrame, SubPage } from '@/components/me/sub-page'

export const metadata: Metadata = {
  title: '用户协议 - Max AI错题宝',
}

export default function AgreementPage() {
  return (
    <PhoneFrame>
      <SubPage title="用户协议" backHref="/me/about">
        <LegalDocScreen docKey="agreement" />
      </SubPage>
    </PhoneFrame>
  )
}
