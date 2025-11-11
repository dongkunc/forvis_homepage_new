// app/about/page.tsx
"use client";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="bg-[#fafafa] text-black">
      {/* 1) 기업소개 헤더 */}
        <section id="about" className="scroll-mt-14 w-full max-w-[1500px] mx-auto px-8 mt-20 mb-10">
            <div className="pt-[40px]"> {/* ← 텍스트만 내림 */}
                <h1 className="text-4xl font-bold mb-2">기업소개</h1>
                <p className="mb-6 leading-relaxed">
                <span className="text-[26px] text-black font-semibold">생각.</span>
                <span className="text-[22px] text-gray-500 ml-5">포비스의 중심</span>
                </p>
            </div>
        </section>


      {/* 1) 이미지 패널(흰 배경 full-bleed) */}
      <div
        className="
          relative left-1/2 -translate-x-1/2
          w-screen bg-white
          ml-0 mt-14 mb-14 mr-0 rounded-l-2xl overflow-hidden 
          flex justify-center py-10 
        "
      >
        <div className="w-full max-w-[1500px] flex justify-center ">
          <Image
            src="/think.png"
            alt="생각. 포비스의 중심"
            width={1200}
            height={800}
            priority
          />
        </div>
      </div>

      {/* 2) 함께 헤더 */}
      <section className="w-full max-w-[1500px] mx-auto px-8 mt-10 mb-10">
        <p className="mb-6 leading-relaxed">
          <span className="text-3xl font-bold text-black">함께.</span>
          <span className="text-[22px] text-neutral-400 ml-5 font-semibold">
            임직원 모두가 주인인
          </span>
        </p>
      </section>

      {/* 2) 이미지 패널(흰 배경 full-bleed) */}
      <div
        className="
          relative left-1/2 -translate-x-1/2
          w-screen bg-white
          ml-0 mt-14 mb-14 mr-24 rounded-l-2xl overflow-hidden
          flex justify-center py-10
        "
      >
        <div className="w-full max-w-[1500px] flex justify-center">
          <Image
            src="/welfare.png"
            alt="함께. 임직원 모두가 주인인"
            width={1200}
            height={700}
            className="rounded-xl shadow-sm"
          />
        </div>
      </div>
    </main>
  );
}
