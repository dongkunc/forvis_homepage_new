"use client";
import Image from "next/image";
import Link from "next/link";

export default function CustomerRequestSection() {
  return (
    <section
      id="requests"
      className=" scroll-mt-14 min-h-[800px] bg-[#fafafa] text-black flex flex-col items-center justify-start"
    >
      {/* 제목 */}
      <div className="w-full max-w-[1500px] px-6 md:px-12 mt-16 mb-8">
        <h2
          className="font-semibold text-left pl-[30px] tracking-widest leading-[1.2]"
          style={{ fontSize: "42px", lineHeight: "2" }}
        >
          고객의 요청
        </h2>
        <p className="text-left pl-[30px] leading-2">
          <span
            className="text-black tracking-normal"
            style={{ fontSize: "25px" }}
          >
            고객의 요청.
          </span>
          <span
            className="text-neutral-400 font-semibold tracking-wide ml-[15px]"
            style={{ fontSize: "22px" }}
          >
            무엇을 원하든 고객에 맞는 방식으로
          </span>
        </p>
      </div>

      {/* 이미지 버튼 영역 */}
      <div className="w-full max-w-[1800px] px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 pl-[30px] justify-center items-center">
          {/* 버튼 1 → /requests/detail */}
          <Link
            href="/requests/detail#program"
            className="rounded-3xl overflow-hidden shadow-md transition-transform hover:scale-105 hover:shadow-xl focus:outline-none block"
          >
            <Image
              src="/modify.png"
              alt="고객 맞춤 수정안 1"
              width={1200}
              height={773}
              className="w-full h-auto object-cover rounded-3xl"
              priority
            />
          </Link>

          {/* 버튼 2 → /requests/detail2 */}
          <Link
            href="/requests/detail2#experience"
            className="rounded-3xl overflow-hidden shadow-md transition-transform hover:scale-105 hover:shadow-xl focus:outline-none block"
          >
            <Image
              src="/modify2.png"
              alt="고객 맞춤 수정안 2"
              width={1200}
              height={773}
              className="w-full h-auto object-cover rounded-3xl"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
