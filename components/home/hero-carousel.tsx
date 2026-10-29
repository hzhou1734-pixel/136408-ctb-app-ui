import Image from 'next/image'

export function HeroCarousel() {
  return (
    <section aria-label="活动横幅" className="px-5">
      <div className="relative aspect-[460/171] w-full overflow-hidden rounded-[15px]">
        <Image
          src="/images/home/banner.png"
          alt="AI精准批改，定位薄弱环节：AI精准批改，即时反馈；锁定真正薄弱点"
          fill
          priority
          sizes="400px"
          className="object-cover"
        />
      </div>
    </section>
  )
}
