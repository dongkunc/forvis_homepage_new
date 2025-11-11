// app/about/page.tsx
"use client";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="bg-[#fafafa] text-black">
      {/* 1) 기업소개 헤더 */}
      <section id="about" className="scroll-mt-14 max-w-[1500px] mx-auto px-4 sm:px-6 md:px-8 pt-20 md:pt-24">
        <h1
          className="mb-2 font-bold tracking-tight
                     text-[clamp(24px,4.5vw,40px)] leading-[1.15]"
        >
          기업소개
        </h1>
        <p className="mb-6 leading-relaxed">
          <span className="font-semibold text-[clamp(18px,4vw,26px)]">생각.</span>
          <span className="ml-3 text-gray-500 text-[clamp(14px,3.5vw,22px)]">포비스의 중심</span>
        </p>
      </section>

      {/* 1) 이미지 패널 (full-bleed, 안전 패턴) */}
      <section
        className="
          relative left-1/2 -translate-x-1/2 w-screen bg-white
          py-6 md:py-10
        "
      >
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-8">
          <div className="relative w-full overflow-hidden
                          rounded-xl md:rounded-2xl border border-black/5
                          aspect-[16/10] md:aspect-[16/9]">
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

      {/* 2) 함께 헤더 */}
      <section className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-8 pt-10 md:pt-14">
        <p className="mb-6 leading-relaxed">
          <span className="font-bold text-[clamp(20px,4.5vw,30px)]">함께.</span>
          <span className="ml-3 font-semibold text-neutral-500 text-[clamp(14px,3.5vw,22px)]">
            임직원 모두가 주인인
          </span>
        </p>
      </section>

      {/* 2) 이미지 패널 (full-bleed, 안전 패턴) */}
      <section
        className="
          relative left-1/2 -translate-x-1/2 w-screen bg-white
          py-6 md:py-10
        "
      >
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-8">
          <div className="relative w-full overflow-hidden
                          rounded-xl md:rounded-2xl border border-black/5
                          aspect-[16/10] md:aspect-[16/9]">
            <Image
              src="/welfare.png"
              alt="함께. 임직원 모두가 주인인"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1500px) 100vw, 1500px"
            />
          </div>
        </div>
      </section>

      <div className="h-10 md:h-16" />
    </main>
  );
}
