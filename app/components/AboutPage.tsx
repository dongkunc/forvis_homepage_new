// app/about/page.tsx
"use client";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="bg-[#fafafa] text-black">
      {/* 1) 기업소개 헤더 */}
      <section
        id="about"
        className="scroll-mt-14 max-w-[1500px] mx-auto px-4 sm:px-6 md:px-8 pt-20 md:pt-24"
      >
        <h1
          className="mb-2 font-bold tracking-tight
                     text-[clamp(24px,4.5vw,40px)] leading-[1.15]"
        >
          기업소개
        </h1>
        <p className="mb-6 leading-relaxed">
          <span className="font-semibold text-[clamp(18px,4vw,26px)]">
            생각.
          </span>
          <span className="ml-3 text-gray-500 text-[clamp(14px,3.5vw,22px)]">
            포비스의 중심
          </span>
        </p>
      </section>

      {/* 1) 이미지 패널 */}
      <section
        className="
          relative left-1/2 -translate-x-1/2 w-screen bg-white
          py-6 md:py-10
        "
      >
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-8">
          <div
            className="relative w-full overflow-hidden
                          rounded-xl md:rounded-2xl border border-black/5
                          aspect-[16/10] md:aspect-[16/9]"
          >
            <Image
              src="/think.png"
              alt="생각. 포비스의 중심"
              fill
              priority
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1500px) 100vw, 1500px"
            />
          </div>
        </div>
      </section>

      {/* 2) 함께 헤더 + 4그리드 */}
      <section className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-8 pt-10 md:pt-14">
        <p className="mb-6 leading-relaxed">
          <span className="font-bold text-[clamp(20px,4.5vw,30px)]">
            함께.
          </span>
          <span className="ml-3 font-semibold text-neutral-500 text-[clamp(14px,3.5vw,22px)]">
            임직원 모두가 주인인
          </span>
        </p>

        {/* 4개 복리후생 패널 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 pt-4">
  {[
    {
      img: "/aboutpage/about1.jpg",
      title: "근무환경",
      desc: [
        "월, 화, 수, 목, 금, 토, 일 – 주 4일 근무만 합시다.",
        "출근시간 지옥은 피하고 9:30에 출근해요.",
        "급한 일이 있으면 내일의 당신에게 미루고 먼저 퇴근하세요.",
        "당신은 업무와 성장에만 몰두하세요.",
      ],
    },
    {
      img: "/aboutpage/about2.jpg",
      title: "먹고 즐길거리",
      desc: [
        "자기개발 도서는 회사에서 구매해드립니다.",
        "휴가는 원하는 날짜에 최대한 맞춰 드려요.",
        "연차는 문자만 주세요. 쉬세요.",
        "점심, 저녁은 회사에서 제공해요.",
      ],
    },
    {
      img: "/aboutpage/about3.jpg",
      title: "업무와 성장",
      desc: [
        "회사의 이익은 곧 당신의 성과입니다.",
        "매년 투명한 이익분배 제도 운영.",
        "해외출장 시 법인카드 + 출장비 지원.",
        "명절에는 소정의 선물 제공.",
      ],
    },
    {
      img: "/aboutpage/about4.jpg",
      title: "사소한 것들",
      desc: [
        "자유복장으로 편하게 출근하세요.",
        "외근 대비 깔끔한 옷 보관 가능.",
        "커피는 전문매장에서 — 회사가 쏩니다.",
      ],
    },
  ].map((item, idx) => (
    <div
      key={idx}
      className="relative group w-full aspect-[16/12] rounded-xl overflow-hidden border border-black/5"
    >
      {/* 배경 이미지 */}
      <Image
        src={item.img}
        alt={item.title}
        fill
        className="object-cover transition-all duration-300 group-hover:scale-105"
      />

      {/* 항상 상단 좌측에 보이는 타이틀 */}
      <div className="absolute left-4 top-4 z-20 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-semibold">
        {item.title}
      </div>

      {/* 중앙 '+' 아이콘 — 호버 시 사라짐 */}
      <div
        className="
        absolute inset-0 flex items-center justify-center
        text-white text-6xl font-light
        opacity-100 group-hover:opacity-0
        transition-opacity duration-300
      "
      >
        +
      </div>

      {/* Hover Overlay — 설명 텍스트 */}
      <div
        className="
        absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100
        transition-all duration-300 flex flex-col justify-center
        items-start text-white px-6 md:px-8 text-left
      "
      >
        <ul className="space-y-2 text-sm md:text-base">
          {item.desc.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>
      </div>
    </div>
  ))}
</div>

      </section>

      <div className="h-10 md:h-16" />
    </main>
  );
}
