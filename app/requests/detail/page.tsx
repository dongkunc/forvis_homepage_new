// app/requests/detail/page.tsx
"use client";
import { useEffect, useRef, useState } from "react";

export default function RequestDetailPage() {
  const [page, setPage] = useState<0 | 1>(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // 3초 자동 전환 (호버 시 정지)
  useEffect(() => {
    if (paused) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setPage((p) => (p === 0 ? 1 : 0));
    }, 3000);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [paused]);

  return (
    <main className="min-h-screen bg-white text-black">
      <section
      id="program"
        className="mx-auto max-w-[1500px] px-6 md:px-12 py-10 scroll-mt-20 md:scroll-mt-24"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* 타이틀 */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold">고객 맞춤형 프로그램</h1>
        </div>

        {/* 본문 */}
        <div className="relative rounded-3xl overflow-hidden bg-black">
          {page === 0 ? <PageOneImmediate /> : <PageTwo />}

          {/* 점 네비 */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-3 z-[60]">
            {[0, 1].map((i) => (
              <button
                key={i}
                onClick={() => setPage(i as 0 | 1)}
                aria-label={`go to slide ${i + 1}`}
                className={`h-3.5 w-3.5 rounded-full transition ${
                  page === i ? "bg-white" : "bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

/* ---- 페이지1: 즉시 표시 (순차 등장 없음) ---- */
function PageOneImmediate() {
  const copy = [
    "고객의 고유한 요구와 목표를 반영한 Custom Program을 제공합니다.",
    "고객이 가진 특별한 사항을 명확히 충족시키기 위해 유연하고 개인화된 접근으로 설계합니다.",
    "사업 환경·비즈니스 모델·시장 목표에 맞춰 최적화된 솔루션을 제안합니다.",
    "기대 그 이상을 제공하기 위해 모든 제품과 서비스는 ‘완벽’을 목표로 설계됩니다.",
  ];

  return (
    <div className="relative grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-10 items-center p-10 md:p-16 min-h-[600px] text-white">
      {/* 좌: 카피 */}
      <div className="space-y-5">
        <div className="space-y-3 text-white/85 leading-relaxed text-[16px] md:text-[18px]">
          {copy.map((line, i) => (
            <p key={i} className="tracking-[-0.01em]">{line}</p>
          ))}
        </div>
      </div>

      {/* 우: 3이미지 레이어 */}
      <div className="relative h-[460px] md:h-[520px]">
        {/* 중앙 시트 */}
        <div className="absolute left-6 right-16 top-10 bottom-10 rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)] z-[30]">
          <img
            src="/CustomerRequestSection/report.png"
            alt="report"
            className="w-full h-full object-cover"
          />
        </div>

        {/* 상단 우측 패널 */}
        <div className="absolute -top-2 right-0 w-[75%] h-[48%] rounded-2xl overflow-hidden border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.55)] z-[40]">
          <img
            src="/CustomerRequestSection/ui.png"
            alt="ui"
            className="w-full h-full object-cover"
          />
        </div>

        {/* 우하단 카드 */}
        <div className="absolute -bottom-2 right-2 w-[56%] h-[46%] rotate-[10deg] rounded-2xl overflow-hidden border border-white/10 shadow-[0_16px_50px_rgba(0,0,0,0.6)] z-[50]">
          <img
            src="/CustomerRequestSection/graph.png"
            alt="graph"
            className="w-full h-full object-cover"
          />
        </div>

        {/* 비네트(디자인 요소) */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-tr from-black/20 via-transparent to-black/10 z-[5]" />
      </div>
    </div>
  );
}

/* ---- 페이지2 ---- */
/* ---- 페이지2 (멀티라인 설명) ---- */
function PageTwo() {
  const items = [
    {
      title: "영상처리 기술",
      desc: [
        "이미지 필터링(Filter, Blurring, Sharpening)",
        "에지 검출(Edge Detection) – Canny, Sobel, 허프변환",
        "이진화(Binarization) – Normal, Otsu, Adaptive Threshold",
        "형태학적 연산(Morphological Operations) – Erosion, Dilation, Opening, Closing",
        "객체 추적(Object Tracking) – Centroid Tracking, Kalman Filter",
        "영상 정합(Image Registration) – Pattern Matching",
        "ROI(Region of Interest) 설정 및 추출",
        "컬러 스페이스 변환 – RGB ↔ HSV, YCrCb",
      ],
    },
    {
      title: "인공지능/딥러닝",
      desc: [
        "분류(Classification) – CNN 기반",
        "객체 탐지(Object Detection) – YOLO",
        "문자 인식(OCR)",
      ],
    },
    {
      title: "소프트웨어 개발",
      desc: [
        "C++ / Python 개발",
        "멀티스레딩 / 비동기 처리 – OpenMP",
        "DB 연동(MSSQL, ORACLE, POSTGRESQL, MYSQL 등) / MFC UI",
      ],
    },
    {
      title: "하드웨어 연동",
      desc: [
        "Camera InterfaceGigE Vision / USB3 Vision / Camera Link",
        "GenICam / GenTL (표준 카메라 프로토콜)",
        "프레임 그래버 SDK",
        "디지털 I/O, Serial 통신 (RS232/RS485)",
        "PLC 통신 (Melsec, Siemens, OPC UA, EtherCAT )",
        "TCP/IP, UDP 통신",
        "광센서, 거리센서 등",
        "모션 제어",
      ],
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-10 md:p-16 min-h-[560px] text-white">
      {items.map((it, i) => (
        <div
          key={i}
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm"
        >
          <div className="text-2xl font-semibold mb-4 text-[#6cb8ff] border-b border-[#6cb8ff]/30 pb-2">
            {`${i + 1}. ${it.title}`}
          </div>
          <ul className="list-disc list-inside text-white/80 space-y-1 text-[15px] leading-relaxed">
            {it.desc.map((line, idx) => (
              <li key={idx}>{line}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
