"use client";

export default function HomeHeroOnly() {
  return (
    <main className="min-h-screen bg-black">
            {/* Hero */}
      <section
        className="relative h-screen w-full grid place-items-center text-right pt-14 overflow-hidden text-white"
        style={{
          backgroundImage: "url('/hero_light.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 px-4 translate-y-[-6vh]">
          <h1 className="text-[28px] md:text-4xl lg:text-5xl font-semibold tracking-tight leading-snug">
            고객에 맞는 방식으로
            <br />
            구성해 주는 가장 좋은 방법
          </h1>
          <a
            href="#quote"
            className="mt-[30px] inline-flex items-center gap-2 rounded-full
             bg-indigo-500 px-[20px] py-[10px] text-[16px] font-semibold !text-white
             shadow-[0_6px_24px_rgba(99,102,241,0.35)] ring-1 ring-white/20
             hover:opacity-95 active:translate-y-[1px] transition"
          >
            <span className="!text-white/95">your vision </span>
            모의견적내기 ↗
          </a>
        </div>
      </section>
    </main>
  );
}
