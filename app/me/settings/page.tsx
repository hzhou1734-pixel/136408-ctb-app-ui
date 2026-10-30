import type { Metadata } from 'next'
import { SettingsScreen } from '@/components/me/settings-screen'
import { PhoneFrame, SubPage } from '@/components/me/sub-page'

export const metadata: Metadata = {
  title: '设置 - Max AI错题宝',
}

export default function SettingsPage() {
  return (
    <PhoneFrame>
      <SubPage title="设置">
        <SettingsScreen />
      </SubPage>
    </PhoneFrame>
  )
}
