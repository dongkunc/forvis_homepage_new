// app/components/MockQuoteSection.tsx
"use client";
import Image from "next/image";
import Link from "next/link";

export default function MockQuoteSection() {
  return (
    <section id="quote" className="scroll-mt-20 bg-white text-white">
      {/* full-bleed 검정 패널 */}
      <div className="relative left-1/2 -translate-x-1/2 w-screen bg-black rounded-none md:rounded-l-2xl overflow-hidden">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 md:px-8 py-16 lg:py-24">
          {/* 👉 데스크탑에서 오른쪽 컬럼 더 넓게 */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_minmax(640px,900px)] items-center gap-10 lg:gap-12 xl:gap-14">
            {/* 왼쪽: 타이틀/설명/버튼 */}
            <div className="space-y-8 lg:space-y-10">
              <div>
                <h2 className="font-semibold tracking-widest leading-[1.2] text-[clamp(22px,4.8vw,42px)]">
                  모의견적
                </h2>
                <p className="mt-2 text-white/90 text-[clamp(14px,3.5vw,22px)]">
                  실시간 견적.{" "}
                  <span className="text-[#00AEEF] font-semibold">
                    원하는 사양에 맞게 특별한 가격을 확인하세요.
                  </span>
                </p>
              </div>

              <Link
                href="/quote"
                className="inline-flex items-center justify-center rounded-xl bg-white px-5 sm:px-6 py-2.5 sm:py-3 text-black text-[clamp(14px,3.6vw,18px)] font-semibold shadow-[0_4px_20px_rgba(255,255,255,0.08)] hover:opacity-90 active:translate-y-px transition"
              >
                견적 시작하기
              </Link>
            </div>

            {/* 오른쪽: 장비 이미지 (데스크탑에서 더 크게) */}
            <div className="flex justify-end">
              {/* md+: 각 카드 최소 220~260px로 넓힘 */}
              <div className="
                grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 xl:gap-10
                md:[grid-template-columns:repeat(3,minmax(220px,1fr))]
                xl:[grid-template-columns:repeat(3,minmax(260px,1fr))]
              ">
                {[
                  "/froduct/product4.png",
                  "/froduct/product3.png",
                  "/froduct/product2.png",
                ].map((src, i) => (
                  <div
                    key={i}
                    className="relative w-full aspect-[1/1] xl:aspect-[3/4] rounded-2xl bg-white/5 ring-1 ring-white/10 overflow-hidden"
                  >
                    <Image
                      src={src}
                      alt={`장비 이미지 ${i + 1}`}
                      fill
                      className="object-contain"
                      /* 👉 데스크탑에서 더 큰 리소스 요청 */
                      sizes="(max-width: 768px) 45vw, (max-width: 1280px) 30vw, 420px"
                      priority={i === 0}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
