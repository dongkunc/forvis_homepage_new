// D:\site\forvis_homepage_new\app\requests\detail2\page.tsx
"use client";

import Image from "next/image";

const IMAGES = Array.from({ length: 6 }, (_, i) => ({
  src: `/CustomerRequestSection/image${i + 1}.png`,
  alt: `고객 요청 이미지 ${i + 1}`,
}));

export default function RequestDetail2Page() {
  return (
    <main className="min-h-screen bg-white text-black">
      {/* 상단 제목 */}
      <section
        id="experience"
        className="max-w-[1500px] mx-auto px-5 sm:px-6 md:px-8 pt-20 md:pt-24 scroll-mt-20 md:scroll-mt-24"
      >
        <h1 className="font-bold tracking-tight text-[22px] sm:text-[26px] md:text-[32px]">
          다양한 경험
        </h1>
      </section>

      {/* 카드 영역 */}
      <section className="max-w-[1500px] mx-auto px-5 sm:px-6 md:px-8 pb-16 md:pb-20">
        <div className="rounded-3xl bg-[#0f0f0f] border border-white/5 overflow-hidden">
          {/* 내부 그리드 */}
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 md:gap-10 p-6 sm:p-8 md:p-12 items-center min-h-[520px] md:min-h-[620px]">
            {/* 왼쪽 텍스트 */}
            <div className="text-white flex items-center">
              <ul className="space-y-4 sm:space-y-5 text-[15px] sm:text-[16px] md:text-[18px] leading-relaxed">
                <li>
                  <b>2차 전지</b> - 표면 불량검사, 폭 측정 검사장치, 절연 Align, 두께 측정기
                </li>
                <li>
                  <b>생활 용품</b> - 바코드 검사, 용량검사, 이물질 검사
                </li>
                <li>
                  <b>광학 필름</b> - 표면 불량 검사, Align 정렬 상태 검사
                </li>
                <li>
                  <b>전자 제품</b> - 부품 누락 검사, 부품 조립 Align 비전
                </li>
                <li>
                  <b>자동차 산업</b> - 내장재 검사, 부품 조립 Align 비전
                </li>
              </ul>
            </div>

            {/* 오른쪽 이미지 3×2 */}
            <div className="flex items-center justify-center w-full h-full">
              <div
                className="
                  grid w-full 
                  grid-cols-2 sm:grid-cols-2 md:grid-cols-3 
                  gap-3 sm:gap-4 md:gap-5
                  md:h-[520px]
                "
              >
                {IMAGES.map(({ src, alt }, i) => (
                  <div
                    key={i}
                    className="
                      relative rounded-2xl overflow-hidden 
                      bg-white/5 ring-1 ring-white/5 
                      aspect-square 
                      transition-transform duration-300
                      hover:scale-[1.02]
                    "
                  >
                    <Image
                      src={src}
                      alt={alt}
                      fill
                      className="object-cover"
                      sizes="
                        (max-width: 640px) 45vw,
                        (max-width: 1024px) 30vw,
                        320px
                      "
                      priority={i < 3}
                      loading={i < 3 ? "eager" : "lazy"}
                    />
                    {/* 상단 그라데이션 살짝 (애플 느낌) */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
