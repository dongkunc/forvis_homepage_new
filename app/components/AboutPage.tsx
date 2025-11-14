// app/about/page.tsx
"use client";

import Image from "next/image";
import { useState } from "react";

// 🔧 제목 폰트 크기/줄간격
const TITLE_FONT =
  "text-[clamp(30px,4vw,30px)] leading-[2]";
// 🔧 본문 폰트 크기/줄간격
const SUB_FONT =
  "text-[clamp(13px,3vw,18px)] leading-relaxed";

export default function AboutPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // 중간 think1~4 영역 텍스트
  const values = [
    {
      img: "/aboutpage/think1.jpg",
      title: "Communication",
      color: "text-[#ced027]",
      desc: [
        "투명한 커뮤니케이션",
        "적극적인 피드백",
        "협력과 공동의 목표",
        "혁신적인 변화",
      ],
    },
    {
      img: "/aboutpage/think2.jpg",
      title: "Custom",
      color: "text-neutral-800",
      desc: [
        "고객 맞춤형 제품/서비스 설계",
        "창의적 문제 해결",
        "고객과의 긴밀한 협력",
      ],
    },
    {
      img: "/aboutpage/think3.jpg",
      title: "Together",
      color: "text-[#0085b5]",
      desc: [
        "팀워크와 협력",
        "고객과 함께 지속 가능한 성장",
        "상호 존중과 소통",
      ],
    },
    {
      img: "/aboutpage/think4.jpg",
      title: "Perfect",
      color: "text-neutral-600",
      desc: [
        "최고 품질의 제품과 서비스",
        "정밀한 실행과 혁신",
        "지속 가능한 완벽",
      ],
    },
  ];

  // 아래 복리후생 카드
  const items = [
    {
      img: "/aboutpage/about1.jpg",
      title: "근무환경",
      desc: [
        "월, 화, 목, 금 – 주 4일 근무만 합시다.",
        "출근시간 지옥은 피하고 9:30에 출근해요.",
        "급한 일이 생기면 내일의 당신에게 미루고 먼저 퇴근하세요.",
        "당신은 업무와 성장에만 몰두하세요.",
      ],
    },
    {
      img: "/aboutpage/about2.jpg",
      title: "먹고 즐길거리",
      desc: [
        "자기개발에 필요한 도서는 회사에서 사줄게요.",
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
        "해외 출장시 법인카드 지급외 출장비도 조금 드릴게요.",
        "추석에는 송편 값, 설에는 가래떡 값 조금 드릴게요.",
      ],
    },
    {
      img: "/aboutpage/about4.jpg",
      title: "사소한 것들",
      desc: [
        "자유로운 복장으로 편하게 출근하세요.",
        "갑작스런 외부 스케줄 발생대비 옷장에 단정한 옷 보관도 가능해요.",
        "인스턴트커피 그만! 전문매장에서 사 드세요. 물론 회사가 삽니다.",
        "매년 10월2일은 창립기념일이에요. 개천절과 이어지는 연휴 마음껏 즐기세요.",
      ],
    },
  ];

  return (
    <main className="bg-[#fafafa] text-black">
      {/* 1) 기업소개 헤더 */}
      <section
        id="about"
        className="scroll-mt-14 max-w-[1500px] mx-auto px-4 sm:px-6 md:px-8 pt-10 md:pt-12"
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

      {/* 2) THINK 4개 – 이미지/텍스트 교차 레이아웃 */}
      <section className="w-full bg-white">
        <div
          className="
            max-w-[900px]
            mx-auto px-4 sm:px-6 md:px-8
            py-2 md:py-4
            space-y-6 md:space-y-10
          "
        >
          {values.map((v, idx) => {
            const imageLeft = idx % 2 === 0; // 0,2: 이미지 좌측 / 1,3: 이미지 우측

            return (
              <div
                key={v.title}
                className="
                  grid grid-cols-1 md:grid-cols-[1fr_1fr]
                  items-center justify-center
                  gap-4 md:gap-6
                  mx-auto
                "
              >
                {/* 이미지 */}
              <div
                className={`
                  relative w-full
                  max-w-[420px]
                  mx-auto
                  aspect-[4/3]
                  rounded-xl overflow-hidden     /* 🔥 추가된 부분 */
                  ${imageLeft ? "order-1" : "order-2 md:order-2"}
                `}
              >
                <Image
                  src={v.img}
                  alt={v.title}
                  fill
                  className="object-cover"   /* object-contain → object-cover로 변경하면 더 자연스러움 */
                  sizes="(max-width: 768px) 80vw, 380px"
                />
              </div>


                {/* 텍스트 */}
                <div
                  className={`
                    max-w-[360px] w-full
                    ${imageLeft ? "order-2 md:ml-auto md:text-left" : "order-1 md:mr-auto md:text-left"}
                  `}
                >
                  {/* 제목과 리스트를 같은 높이에서 시작시키는 GRID */}
                  <div
                    className={`
                      grid grid-cols-[auto,1fr]
                      gap-x-4 gap-y-1 md:gap-y-1.5
                      items-start
                      ${imageLeft ? "justify-end" : ""}
                    `}
                  >
                    {/* 제목 */}
                    <h2
                      className={`${TITLE_FONT} font-bold ${v.color}`}
                    >
                      {v.title}
                    </h2>

                    {/* 설명 리스트 */}
                    <ul
                      className={`${SUB_FONT} text-black space-y-1 md:space-y-1.5`}
                    >
                      {v.desc.map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3) 함께 헤더 + 4그리드 */}
      <section className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-8 pt-6 md:pt-8">
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
                <div className="absolute left-4 top-4 z-20 text-white px-3 py-1 text-2xl font-semibold">
                  {item.title}
                </div>

                {/* 중앙 '+' 아이콘 */}
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
                    absolute inset-0 bg-black/80
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
