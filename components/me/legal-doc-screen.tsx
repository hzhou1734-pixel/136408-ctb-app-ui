import { legalDocs, type LegalDocKey } from '@/components/me/legal-docs'

export function LegalDocScreen({ docKey }: { docKey: LegalDocKey }) {
  const doc = legalDocs[docKey]

  return (
    <article className="mx-4 mb-8 mt-2 flex flex-col gap-3 rounded-xl bg-[#FFFFFF] px-5 py-5">
      {doc.body.map((p) => (
        <p key={p} className="text-pretty text-[14px] leading-relaxed text-[#3A4256]">
          {p}
        </p>
      ))}
    </article>
  )
}
