"use client";
import Image from "next/image";
import Link from "next/link";

export default function MockQuoteSection() {
  return (
    <section id="quote" className="scroll-mt-20 bg-white text-white">
      {/* full-bleed 검정 패널 */}
      <div className="relative left-1/2 -translate-x-1/2 w-screen bg-black rounded-none md:rounded-l-2xl overflow-hidden">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 md:px-8 py-16 lg:py-24">
          {/* xl 이상에서만 이미지 보이게 */}
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_minmax(640px,900px)] items-center gap-10 lg:gap-12 xl:gap-14">
            {/* 왼쪽 텍스트 (xl 미만에서는 전체폭으로 확장) */}
            <div className="space-y-8 lg:space-y-10 xl:max-w-none">
              <div>
                <h2 className="break-keep font-semibold tracking-widest leading-[1.2] text-[clamp(22px,4.8vw,42px)]">
                  모의견적
                </h2>
                <p className="break-keep mt-2 text-white/90 text-[clamp(14px,3.5vw,22px)]">
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

            {/* 오른쪽 이미지 (1280px 이상에서만 보이게) */}
            <div className="hidden xl:flex justify-end" aria-hidden="true">
              <div
                className="
                  grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 xl:gap-10
                  xl:[grid-template-columns:repeat(3,minmax(260px,1fr))]
                "
              >
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
                      alt=""
                      fill
                      className="object-contain"
                      sizes="(min-width:1280px) 30vw, 0px"
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
