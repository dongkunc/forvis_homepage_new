"use client";
import Image from "next/image";
import Link from "next/link";

export default function MockQuoteSection() {
  return (
    <section id="quote" className=" scroll-mt-20 min-h-[800px] w-full bg-white text-white">
      {/* 검정 패널 (좌/상/하 여백, 우측은 붙임) */}
      <div className="ml-28 mt-14 mb-14 mr-0 rounded-l-2xl bg-black overflow-hidden">
        <div className="mx-auto max-w-[1500px] px-6 md:px-12 py-[136px] md:py-[168px]">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 items-center">
            {/* 왼쪽: 로고/타이틀/설명/버튼 */}
            <div className="space-y-20">
              <div>
                <h2
                  className="font-semibold tracking-widest leading-[1.2]"
                  style={{ fontSize: "42px", lineHeight: "2" }}
                >
                  모의견적
                </h2>
                <p className="text-white/90" style={{ fontSize: "22px" }}>
                  실시간 견적.{" "}
                  <span
                    className="text-[#00AEEF] font-semibold"
                    style={{ fontSize: "26px", letterSpacing: "1px" }}
                  >
                    원하는 사양에 맞게 특별한 가격을 확인하세요.
                  </span>
                </p>
              </div>

              {/* 견적 버튼 */}
              <Link
                href="/quote"
                className="inline-flex items-center justify-center rounded-xl bg-white px-7 py-4 text-black text-[18px] font-semibold shadow-[0_4px_20px_rgba(255,255,255,0.08)] hover:opacity-90 active:scale-[0.99] transition"
              >
                견적 시작하기
              </Link>
            </div>

            {/* 오른쪽: 장비 이미지 3개 (검정 영역 우측 정렬) */}
            <div className="flex justify-end">
              <div className="grid grid-cols-2 xl:grid-cols-3 gap-40">
                {[
                  "/froduct/product4.png",
                  "/froduct/product3.png",
                  "/froduct/product2.png",
                ].map((src, i) => (
                  <div
                    key={i}
                    className="relative w-[300px] aspect-[4/5] rounded-3xl bg-white/5 ring-1 ring-white/10 overflow-hidden"
                  >
                    <Image
                      src={src}
                      alt={`장비 이미지 ${i + 1}`}
                      fill
                      className="object-contain"
                      sizes="(min-width:1280px) 33vw, (min-width:1024px) 50vw, 100vw"
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
