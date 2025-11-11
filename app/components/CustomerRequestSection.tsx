// app/components/CustomerRequestSection.tsx
"use client";
import Image from "next/image";
import Link from "next/link";

export default function CustomerRequestSection() {
  return (
    <section
      id="requests"
      className="scroll-mt-14 bg-[#fafafa] text-black"
    >
      {/* 제목 */}
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 md:px-8 pt-16 md:pt-20">
        <h2
          className="font-semibold tracking-widest leading-[1.2] text-left
                     text-[clamp(24px,4.5vw,42px)]"
        >
          고객의 요청
        </h2>
        <p className="mt-2 text-left leading-relaxed">
          <span className="font-semibold text-[clamp(16px,4vw,25px)]">고객의 요청.</span>
          <span className="ml-3 text-neutral-400 font-semibold tracking-wide text-[clamp(14px,3.6vw,22px)]">
            무엇을 원하든 고객에 맞는 방식으로
          </span>
        </p>
      </div>

      {/* 이미지 버튼 영역 */}
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 md:px-8 py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 xl:gap-16">
          {/* 버튼 1 → /requests/detail#program */}
          <Link
            href="/requests/detail#program"
            className="group block rounded-3xl overflow-hidden border border-black/5 shadow-sm transition-transform md:hover:scale-[1.02] md:hover:shadow-md focus:outline-none"
            aria-label="고객 맞춤 수정안 1 보러가기"
          >
            <div className="relative w-full aspect-[16/10] md:aspect-[16/9]">
              <Image
                src="/modify.png"
                alt="고객 맞춤 수정안 1"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1500px) 50vw, 750px"
              />
            </div>
          </Link>

          {/* 버튼 2 → /requests/detail2#experience */}
          <Link
            href="/requests/detail2#experience"
            className="group block rounded-3xl overflow-hidden border border-black/5 shadow-sm transition-transform md:hover:scale-[1.02] md:hover:shadow-md focus:outline-none"
            aria-label="고객 맞춤 수정안 2 보러가기"
          >
            <div className="relative w-full aspect-[16/10] md:aspect-[16/9]">
              <Image
                src="/modify2.png"
                alt="고객 맞춤 수정안 2"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1500px) 50vw, 750px"
              />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
