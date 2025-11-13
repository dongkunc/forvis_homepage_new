// app/about/page.tsx
"use client";
import Image from "next/image";
import { useState } from "react";

export default function AboutPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items = [
    {
      img: "/aboutpage/about1.jpg",
      title: "근무환경",
      desc: [
        "월, 화, 일, 목, 금, 토, 일 – 주 4일 근무만 합시다.",
        "출근시간 지옥은 피하고 9:30에 출근해요.",
        "퇴근은 급한 일이 있으면 내일의 당신에게 미루고 먼저 퇴근하세요.",
        "당신은 업무와 성장에만 몰두하세요.",
      ],
    },
    {
      img: "/aboutpage/about2.jpg",
      title: "먹고 즐길거리",
      desc: [
        "자기개발에 필요한 도서는 회사에서 사줄께요.",
        "휴가는 원하는 날짜에 최대한 맞춰 드려요.",
        "연차는 그냥 문자만 주시고 쉬면 됩니다.",
        "점심, 저녁은 회사에서 제공해요.",
      ],
    },
    {
      img: "/aboutpage/about3.jpg",
      title: "업무와 성장",
      desc: [
        "회사의 이익은 곧 당신의 성과입니다.",
        "매년 이익분배를 통해 투명하게 성과를 나눠 가집니다.",
        "해외 출장시 법인카드 지급외 출장비도 조금 드릴께요.",
        "추석에는 송편 값, 설에는 가래떡값 조금 드릴께요.",
      ],
    },
    {
      img: "/aboutpage/about4.jpg",
      title: "사소한 것들",
      desc: [
        "자유로운 복장으로 편하게 출근하세요.",
        "갑작스런 외부 스케줄 발생대비 옷장에 단정한 옷 보관도 가능해요.",
        "탕비실 맛없는 커피말고 전문매장에서 사 드세요. 물론 회사가 쏩니다.",
      ],
    },
  ];

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
          {items.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="relative group w-full aspect-[16/12] rounded-xl overflow-hidden border border-black/5 cursor-pointer"
                onClick={() =>
                  setOpenIndex((prev) => (prev === idx ? null : idx))
                }
              >
                {/* 배경 이미지 */}
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover transition-all duration-300 group-hover:scale-105"
                />

                {/* 항상 상단 좌측에 보이는 타이틀 */}
                <div className="absolute left-4 top-4 z-20 bg-black/60 text-white px-3 py-1 rounded-full text-xl font-semibold">
                  {item.title}
                </div>

                {/* 중앙 '+' 아이콘 — 호버 시, 모바일에서 오버레이 열리면 사라짐 */}
                <div
                  className={`
                    absolute inset-0 flex items-center justify-center
                    text-white text-6xl font-light
                    transition-opacity duration-300
                    opacity-100 group-hover:opacity-0
                    ${isOpen ? "opacity-0" : ""}
                  `}
                >
                  +
                </div>

                {/* Hover / Tap Overlay — 설명 텍스트 */}
                <div
                  className={`
                    absolute inset-0 bg-black/60
                    flex flex-col justify-center
                    items-start text-white px-6 md:px-8 text-left
                    transition-opacity duration-300
                    opacity-0 group-hover:opacity-100
                    ${isOpen ? "opacity-100" : ""}
                  `}
                >
                  <ul className="space-y-2 text-xs md:text-xl">
                    {item.desc.map((line, i) => (
                      <li key={i}>{line}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="h-10 md:h-16" />
    </main>
  );
}
