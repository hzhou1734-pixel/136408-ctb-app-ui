import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { AppLogo } from '@/components/brand/app-logo'
import { legalDocs, type LegalDocKey } from '@/components/me/legal-docs'

export function AboutScreen() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-col items-center gap-2 pb-8 pt-8">
        <AppLogo className="size-[84px] rounded-[22px] shadow-[0_10px_24px_-10px_rgba(47,85,212,0.45)] ring-1 ring-[#EEF1F6]" />
        <h2 className="mt-2 text-[18px] font-semibold text-[#1F2533]">Max AI错题宝</h2>
        <p className="text-[13px] text-[#8A92A3]">版本号 V2.5.8</p>
      </div>

      <ul className="mx-4 flex flex-col divide-y divide-[#EEF1F6] overflow-hidden rounded-xl bg-[#FFFFFF]">
        {(Object.keys(legalDocs) as LegalDocKey[]).map((key) => {
          const doc = legalDocs[key]
          const Icon = doc.icon
          return (
            <li key={key}>
              <Link
                href={doc.href}
                className="flex h-14 w-full items-center gap-3 px-4 text-left active:bg-[#F5F8FD]"
              >
                <span className="flex size-8 items-center justify-center rounded-lg bg-[#EEF4FE] text-[#1E88F2]">
                  <Icon className="size-[18px]" aria-hidden="true" />
                </span>
                <span className="flex-1 text-[15px] text-[#1F2533]">{doc.label}</span>
                <ChevronRight className="size-4 text-[#B8BFCC]" aria-hidden="true" />
              </Link>
            </li>
          )
        })}
      </ul>

      <p className="mt-auto pb-8 pt-10 text-center text-[12px] leading-relaxed text-[#A0A8B8]">
        Copyright © 2026 Max AI错题宝
      </p>
    </div>
  )
}
