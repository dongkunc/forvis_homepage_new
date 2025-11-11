// app/quote/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type StepType = "yn" | "number";
type Step = {
  title: string;
  subs: string;
  type: StepType;
  unit?: string;
  placeholder?: string;
};

const STEPS: Step[] = [
  { title: "카메라 종류", subs: "검사할 대상이 이동중에 검사를 해야 하나요?", type: "yn" },
  { title: "카메라 결정", subs: "검사할 대상의 최대 크기는 폭 기준으로 얼마일까요?(mm)", type: "number", unit: "mm", placeholder: "예) 350" },
  { title: "조명결정", subs: "검사할 대상의 최대 크기는 폭 기준으로 얼마일까요?(mm)", type: "number", unit: "mm", placeholder: "예) 350" },
  { title: "PC결정", subs: "설비의 생산 속도는 얼마인가요?(m/min)", type: "number", unit: "m/min", placeholder: "예) 30" },
  { title: "옵션선택", subs: "설비간 통신이 필요한가요? (PLC, 상위 서버등)", type: "yn" },
  { title: "옵션선택2", subs: "데이터 조회 기능이 필요한가요? (지난이력, 검사이력등)", type: "yn" },
  { title: "옵션선택3", subs: "딥러닝 기능이 필요한가요?", type: "yn" },
];

type Answers = {
  moving?: boolean;
  camWidth?: number;
  lightWidth?: number;
  speed?: number;
  comm?: boolean;
  history?: boolean;
  dl?: boolean;
};

// ===== 가격 계산 유틸 =====
const KRW = (n: number) =>
  new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW", maximumFractionDigits: 0 }).format(n);

function cameraCost(moving: boolean | undefined, width: number | undefined): number {
  if (moving == null || width == null) return 0;
  if (moving) {
    if (width < 300) return 2_500_000;
    if (width < 600) return 3_500_000;
    return 7_500_000;
  } else {
    if (width < 300) return 1_800_000;
    return 2_800_000;
  }
}

function lightCost(width: number | undefined): number {
  if (width == null) return 0;
  if (width < 500) return 2_500_000;
  if (width < 1000) return 3_500_000;
  return 4_500_000;
}

function pcCost(speed: number | undefined): number {
  if (speed == null) return 0;
  if (speed < 30) return 2_500_000;
  if (speed < 60) return 3_000_000;
  return 3_500_000;
}

function optionCost(comm?: boolean, history?: boolean, dl?: boolean): { comm: number; history: number; dl: number } {
  return {
    comm: comm ? 2_000_000 : 0,
    history: history ? 2_000_000 : 0,
    dl: dl ? 12_000_000 : 0,
  };
}

export default function QuoteWizardPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [finalPrice, setFinalPrice] = useState<number | null>(null);

  const images = useMemo(() => ["/froduct/product4.png", "/froduct/product3.png", "/froduct/product2.png"], []);

  // 키보드: Enter 다음, Esc 이전
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" && currentValid) next();
      if (e.key === "Escape") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, answers]);

  const currentValid = (() => {
    const s = STEPS[step];
    if (s.type === "yn") {
      if (step === 0) return typeof answers.moving === "boolean";
      if (step === 4) return typeof answers.comm === "boolean";
      if (step === 5) return typeof answers.history === "boolean";
      if (step === 6) return typeof answers.dl === "boolean";
      return false;
    } else {
      const v =
        step === 1 ? answers.camWidth :
        step === 2 ? answers.lightWidth :
        step === 3 ? answers.speed : undefined;
      return typeof v === "number" && isFinite(v) && v >= 0;
    }
  })();

  const onYN = (val: boolean) => {
    if (step === 0) setAnswers(a => ({ ...a, moving: val }));
    if (step === 4) setAnswers(a => ({ ...a, comm: val }));
    if (step === 5) setAnswers(a => ({ ...a, history: val }));
    if (step === 6) setAnswers(a => ({ ...a, dl: val }));
  };

  const onNumber = (raw: string) => {
    if (raw.trim() === "") {
      if (step === 1) setAnswers(a => ({ ...a, camWidth: undefined }));
      if (step === 2) setAnswers(a => ({ ...a, lightWidth: undefined }));
      if (step === 3) setAnswers(a => ({ ...a, speed: undefined }));
      return;
    }
    const cleaned = raw.replace(/[^\d.]/g, "");
    const n = Number(cleaned);
    if (!Number.isNaN(n)) {
      if (step === 1) setAnswers(a => ({ ...a, camWidth: n }));
      if (step === 2) setAnswers(a => ({ ...a, lightWidth: n }));
      if (step === 3) setAnswers(a => ({ ...a, speed: n }));
    }
  };

  const prev = () => setStep(s => Math.max(0, s - 1));
  const next = () => setStep(s => Math.min(STEPS.length - 1, s + 1));

  const finish = () => {
    const cam = cameraCost(answers.moving, answers.camWidth);
    const light = lightCost(answers.lightWidth);
    const pc = pcCost(answers.speed);
    const opt = optionCost(answers.comm, answers.history, answers.dl);
    const subtotal = cam + light + pc + opt.comm + opt.history + opt.dl;
    const final = subtotal + 1_500_000 + 13_400_000; // 고정가산 2종
    setFinalPrice(final);
  };

  const isLast = step === STEPS.length - 1;

  return (
    <main className="min-h-screen bg-white text-black">
      <div className="h-14 md:h-16" />

      <section className="w-full">
        {/* 🔧 모바일에서는 좌여백 제거, md부터 살짝, lg에서 기존 ml-28 느낌 */}
        <div className="ml-0 md:ml-14 lg:ml-28 mt-6 md:mt-8 mb-12 md:mb-16 mr-0 rounded-l-none md:rounded-l-2xl bg-black overflow-hidden">
          <div className="mx-auto max-w-[1500px] px-5 sm:px-6 md:px-12 py-10 sm:py-14 md:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8 md:gap-10 items-center">
              
              {/* 왼쪽: 질문 입력 */}
              <div className="text-white">
                <div className="mb-6 md:mb-8">
                  <h2 className="text-[26px] sm:text-[32px] md:text-[40px] font-semibold tracking-tight">
                    {STEPS[step].title}
                  </h2>
                  <p className="text-white/80 text-[16px] sm:text-[18px] md:text-[20px] mt-2">
                    {STEPS[step].subs}
                  </p>
                </div>

                {STEPS[step].type === "yn" ? (
                  <div className="flex items-center gap-3 sm:gap-4 mt-6 md:mt-8">
                    <YNButton
                      label="Y"
                      active={
                        (step === 0 && answers.moving === true) ||
                        (step === 4 && answers.comm === true) ||
                        (step === 5 && answers.history === true) ||
                        (step === 6 && answers.dl === true)
                      }
                      onClick={() => onYN(true)}
                    />
                    <YNButton
                      label="N"
                      active={
                        (step === 0 && answers.moving === false) ||
                        (step === 4 && answers.comm === false) ||
                        (step === 5 && answers.history === false) ||
                        (step === 6 && answers.dl === false)
                      }
                      onClick={() => onYN(false)}
                    />
                  </div>
                ) : (
                  <div className="mt-6 md:mt-8">
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <input
                        inputMode="decimal"
                        step="any"
                        placeholder={STEPS[step].placeholder}
                        aria-label={STEPS[step].title}
                        value={
                          step === 1
                            ? (answers.camWidth ?? "").toString()
                            : step === 2
                            ? (answers.lightWidth ?? "").toString()
                            : step === 3
                            ? (answers.speed ?? "").toString()
                            : ""
                        }
                        onChange={(e) => onNumber(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && currentValid && next()}
                        className="w-full sm:w-[280px] md:w-[340px] rounded-xl bg-white text-black px-4 py-3 text-[16px] sm:text-[18px] outline-none ring-2 ring-transparent focus:ring-[#00AEEF]"
                      />
                      {STEPS[step].unit && (
                        <span className="text-white/70 text-[14px] sm:text-[16px]">{STEPS[step].unit}</span>
                      )}
                    </div>
                    <p className="text-white/50 text-xs sm:text-sm mt-2">숫자만 입력돼요.</p>
                  </div>
                )}

                {/* 진행바 + 버튼 */}
                <div className="mt-8 md:mt-12">
                  <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 mb-5 md:mb-6" aria-label="진행 상태">
                    {STEPS.map((_, i) => (
                      <div
                        key={i}
                        className={`h-1.5 rounded-full transition-all
                          ${i <= step ? "bg-white w-7 sm:w-8 md:w-10" : "bg-white/20 w-5 sm:w-6 md:w-6"}`}
                      />
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <button
                      onClick={prev}
                      disabled={step === 0}
                      className="h-12 px-5 rounded-xl bg-white/10 text-white disabled:opacity-40 hover:bg-white/15 transition w-full sm:w-auto"
                    >
                      이전
                    </button>

                    {!isLast ? (
                      <button
                        onClick={next}
                        disabled={!currentValid}
                        className="h-12 px-6 rounded-xl bg-white text-black font-semibold disabled:opacity-40 hover:opacity-90 transition w-full sm:w-auto"
                      >
                        다음
                      </button>
                    ) : (
                      <button
                        onClick={finish}
                        disabled={!currentValid}
                        className="h-12 px-6 rounded-xl bg-white text-black font-semibold disabled:opacity-40 hover:opacity-90 transition w-full sm:w-auto"
                      >
                        견적보기
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* 오른쪽: 결과 or 이미지 */}
              <div className="flex justify-center lg:justify-end items-center min-h-[360px] sm:min-h-[440px] md:min-h-[500px]">
                {finalPrice === null ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 xl:gap-40">
                    {images.map((src, i) => (
                      <div
                        key={i}
                        className="relative w-[72vw] sm:w-[240px] md:w-[260px] xl:w-[300px] aspect-[4/5] rounded-3xl bg-white/5 ring-1 ring-white/10 overflow-hidden"
                      >
                        <Image
                          src={src}
                          alt={`장비 이미지 ${i + 1}`}
                          fill
                          className="object-contain"
                          sizes="(max-width:640px) 72vw, (max-width:1280px) 33vw, 300px"
                          priority={i === 0}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center w-full h-full text-center px-4">
                    <h3 className="text-white/70 text-[16px] sm:text-[18px] md:text-[20px] mb-3 md:mb-4">예상 견적 금액</h3>
                    <p className="text-[#00AEEF] text-[36px] sm:text-[44px] md:text-[52px] font-bold tracking-tight">
                      {KRW(finalPrice)}
                    </p>
                    <p className="text-white/50 mt-2 text-xs sm:text-sm">※ 부가세 별도 기준</p>

                    {/* 버튼 두 개: 다시 계산하기 + 문의하기 */}
                    <div className="mt-7 md:mt-10 flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                      <button
                        onClick={() => window.location.reload()}
                        className="inline-flex items-center justify-center h-12 px-6 rounded-xl font-semibold 
                                  bg-white/10 text-white hover:bg-white hover:text-black transition w-full sm:w-auto"
                      >
                        다시 계산하기
                      </button>

                      {/* ✅ 문의하기: answers 저장 + support 섹션 스크롤 */}
                      <button
                        onClick={() => {
                          try {
                            localStorage.setItem("forvis_quote_answers", JSON.stringify(answers));
                          } catch {}
                          const el = document.getElementById("support");
                          if (el) {
                            el.scrollIntoView({ behavior: "smooth", block: "start" });
                          } else {
                            window.location.href = "/#support";
                          }
                        }}
                        className="inline-flex items-center justify-center h-12 px-6 rounded-xl font-semibold 
                                  bg-white/10 text-white hover:bg-white hover:text-black transition w-full sm:w-auto"
                      >
                        문의하기
                      </button>
                    </div>

                    <p className="text-white/60 text-xs sm:text-sm mt-3">
                      실제 견적과 예상 견적 금액은 다를 수 있습니다. 꼭 담당자와 문의하세요!
                    </p>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function YNButton({
  label,
  active,
  onClick,
}: {
  label: "Y" | "N";
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`h-12 px-6 rounded-xl font-semibold transition text-[16px]
        ${active ? "bg-white text-black" : "bg-white/10 text-white hover:bg-white/15"}`}
      aria-pressed={active}
    >
      {label}
    </button>
  );
}
