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
      {/* ✅ 상단 제목 섹션에 id, scroll-mt 추가 */}
      <section
        id="experience"
        className="max-w-[1500px] mx-auto px-8 pt-24 scroll-mt-20 md:scroll-mt-24"
      >
        <h1 className="text-[28px] md:text-[32px] font-bold tracking-tight">다양한 경험</h1>
      </section>

      {/* 카드 영역 */}
      <section className="max-w-[1500px] mx-auto px-8 pb-20">
        <div className="rounded-3xl bg-[#0f0f0f] border border-white/5 overflow-hidden">
          {/* 내부 그리드 */}
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 p-10 md:p-14 items-center min-h-[560px] md:h-[650px]">
            {/* 왼쪽 텍스트 */}
            <div className="text-white flex items-center">
              <ul className="space-y-6 text-[16px] md:text-[18px] leading-relaxed">
                <li><b>2차 전지</b> - 표면 불량검사, 폭 측정 검사장치, 절연 Align, 두께 측정기</li>
                <li><b>생활 용품</b> - 바코드 검사, 용량검사, 이물질 검사</li>
                <li><b>광학 필름</b> - 표면 불량 검사, Align 정렬 상태 검사</li>
                <li><b>전자 제품</b> - 부품 누락 검사, 부품 조립 Align 비전</li>
                <li><b>자동차 산업</b> - 내장재 검사, 부품 조립 Align 비전</li>
              </ul>
            </div>

            {/* 오른쪽 이미지 3×2 */}
            <div className="flex items-center justify-center w-full h-full">
              <div className="grid grid-cols-3 gap-5 w-full h-auto md:h-[520px]">
                {IMAGES.map(({ src, alt }, i) => (
                  <div key={i} className="relative rounded-2xl bg-black/40 overflow-hidden aspect-square">
                    <Image
                      src={src}
                      alt={alt}
                      fill
                      sizes="(max-width: 1024px) 33vw, 500px"
                      className="object-cover"
                      priority={i < 3}
                      loading={i < 3 ? "eager" : "lazy"}
                    />
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
