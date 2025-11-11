// app/components/HomeHeroOnly.tsx
"use client";

export default function HomeHeroOnly() {
  return (
    <main className="min-h-screen bg-black">
      {/* ✅ Hero 섹션 */}
      <section
        className="
          relative h-[100dvh] w-full grid place-items-center text-center
          overflow-hidden text-white
        "
        style={{
          backgroundImage: "url('/hero_light.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* 반투명 오버레이 */}
        <div className="absolute inset-0 bg-black/50" />

        {/* 콘텐츠 영역 */}
        <div className="relative z-10 px-4 sm:px-6 md:px-10 -translate-y-[5vh]">
          <h1
            className="
              font-semibold tracking-tight leading-snug
              text-[clamp(20px,5vw,40px)] md:text-[clamp(28px,3vw,48px)]
            "
          >
            고객에 맞는 방식으로
            <br />
            구성해 주는 가장 좋은 방법
          </h1>

          {/* CTA 버튼 */}
          <a
            href="#quote"
            className="
              mt-6 inline-flex items-center gap-2 rounded-full
              bg-indigo-500 px-5 sm:px-6 py-2 sm:py-3
              text-[clamp(13px,3.5vw,16px)] font-semibold text-white
              shadow-[0_6px_24px_rgba(99,102,241,0.35)]
              ring-1 ring-white/20
              hover:opacity-95 active:translate-y-[1px] transition
            "
          >
            <span className="text-white/95">your vision</span>
            모의견적내기 ↗
          </a>
        </div>
      </section>
    </main>
  );
}
