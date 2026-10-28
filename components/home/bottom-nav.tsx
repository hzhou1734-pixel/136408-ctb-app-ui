import Image from 'next/image'

const tabs = [
  { label: '错题本', icon: '/images/home/nav-2.png' },
  { label: '应用', icon: '/images/home/nav-3.png' },
  { label: '我的', icon: '/images/home/nav-4.png' },
]

export function BottomNav() {
  return (
    <nav aria-label="主导航" className="absolute inset-x-5 bottom-4 z-20">
      <ul className="flex h-[56px] items-end rounded-full bg-[#2E394F] pb-1.5">
        <li className="flex-1">
          <a href="#" aria-current="page" className="relative flex flex-col items-center">
            <Image
              src="/images/home/home.png"
              alt=""
              width={76}
              height={76}
              className="absolute -top-[50px] size-[44px] rounded-full"
            />
            <span className="text-[10px] text-[#1E88F5]">首页</span>
          </a>
        </li>
        {tabs.map((tab) => (
          <li key={tab.label} className="flex-1">
            <a href="#" className="flex flex-col items-center gap-0.5">
              <Image src={tab.icon} alt="" width={32} height={32} className="size-5" />
              <span className="text-[10px] text-[#9AA3B8]">{tab.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
