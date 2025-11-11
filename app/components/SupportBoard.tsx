// app/components/SupportBoard.tsx
"use client";

import { useEffect, useState } from "react";

type FormState = {
  title: string;
  content: string;
  name: string;
  email: string;
  touched: {
    title: boolean;
    content: boolean;
    name: boolean;
    email: boolean;
  };
};

type Answers = {
  moving?: boolean;
  camWidth?: number;
  lightWidth?: number;
  speed?: number;
  comm?: boolean;
  history?: boolean;
  dl?: boolean;
};

// ✅ 로컬스토리지 → 자동 본문 생성
function buildPrefilledBody(): { title: string; content: string } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("forvis_quote_answers");
    if (!raw) return null;
    const a = JSON.parse(raw) as Answers;

    const movingText =
      a.moving == null ? "-" : a.moving ? "라인스캔(이동 중 검사)" : "에어리어(정지 검사)";
    const yesNo = (v?: boolean) => (v == null ? "-" : v ? "예" : "아니오");

    const content = [
      "※ 자동 채워진 견적 정보입니다. 수정해서 보내주세요.",
      "",
      `- 검사 방식: ${movingText}`,
      `- 카메라 폭(최대): ${a.camWidth ?? "-"} mm`,
      `- 조명 폭(최대): ${a.lightWidth ?? "-"} mm`,
      `- 설비 속도: ${a.speed ?? "-"} m/min`,
      `- 설비 간 통신(PLC/상위 서버): ${yesNo(a.comm)}`,
      `- 데이터 조회(지난 이력/검사 이력): ${yesNo(a.history)}`,
      `- 딥러닝 기능: ${yesNo(a.dl)}`,
      "",
      "추가 문의사항:",
    ].join("\n");

    return { title: "견적 문의", content };
  } catch {
    return null;
  }
}

export default function SupportBoard() {
  const [form, setForm] = useState<FormState>(() => {
    const pre = buildPrefilledBody();
    return {
      title: pre?.title ?? "",
      content: pre?.content ?? "",
      name: "",
      email: "",
      touched: { title: false, content: false, name: false, email: false },
    };
  });

  // 1회성 사용: 주입 후 스토리지 제거
  useEffect(() => {
    try {
      localStorage.removeItem("forvis_quote_answers");
    } catch {}
  }, []);

  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState<null | "ok" | "fail">(null);
  const [serverMsg, setServerMsg] = useState<string>("");

  const onChange = (key: keyof FormState, value: string) => {
    if (key === "touched") return;
    setForm((prev) => ({ ...prev, [key]: value }));
  };
  const onBlur = (key: keyof FormState) => {
    if (key === "touched") return;
    setForm((prev) => ({
      ...prev,
      touched: { ...prev.touched, [key]: true },
    }));
  };

  const emailOk = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());

  const canSend = () => {
    const filled = [form.title, form.content, form.name, form.email].every(
      (v) => v.trim().length > 0
    );
    return filled && emailOk(form.email);
  };

  // ── 실제 “보내기”
  const handleSubmit = async () => {
    if (!canSend() || sending) return;
    setSending(true);
    setSent(null);
    setServerMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          content: form.content,
          name: form.name,
          email: form.email,
        }),
      });

      const data = (await res.json()) as { ok?: boolean; message?: string };

      if (res.ok && data?.ok) {
        setSent("ok");
        setServerMsg("문의가 정상 접수되었습니다. 빠르게 회신드릴게요!");
        setForm((prev) => ({
          ...prev,
          title: "",
          content: "",
          touched: { title: false, content: false, name: false, email: false },
        }));
      } else {
        setSent("fail");
        setServerMsg(data?.message || "전송에 실패했어요. 잠시 후 다시 시도해주세요.");
      }
    } catch (e) {
      setSent("fail");
      setServerMsg("네트워크 오류가 발생했어요. 다시 시도해주세요.");
    } finally {
      setSending(false);
    }
  };

  const { title, content, name, email, touched } = form;
  const titleErr = touched.title && title.trim().length === 0;
  const contentErr = touched.content && content.trim().length === 0;
  const nameErr = touched.name && name.trim().length === 0;
  const emailErr = touched.email && !emailOk(email);

  // Ctrl/Cmd + Enter 제출, Shift+Enter 줄바꿈 유지
  const onContentKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <section id="support" className="scroll-mt-14 bg-white text-black">
      {/* 헤더 */}
      <div className="max-w-[1200px] lg:max-w-[1500px] mx-auto px-5 sm:px-6 md:px-8 pt-10 md:pt-12">
        <div className="flex items-end justify-between">
          <h1 className="text-[28px] sm:text-[32px] md:text-[36px] font-bold tracking-tight">
            문의하기
          </h1>
        </div>
      </div>

      {/* 폼 래퍼 (풀블리드 라이트 그레이) */}
      <div className="relative left-1/2 -translate-x-1/2 w-screen bg-[#f5f5f7] mt-5 md:mt-6">
        <div className="max-w-[680px] sm:max-w-[760px] md:max-w-[900px] mx-auto px-5 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12">
          <div className="rounded-3xl border border-black/5 bg-white p-5 sm:p-6 md:p-8 hover:shadow-sm transition-shadow">
            <h3 className="text-xl sm:text-[20px] md:text-2xl font-semibold mb-1">문의사항</h3>
            
            <Field
              label="제목"
              value={title}
              onChange={(v) => onChange("title", v)}
              onBlur={() => onBlur("title")}
              placeholder="예) Vision 관련 문의"
              error={titleErr ? "제목을 입력해주세요." : ""}
              autoComplete="on"
            />

            <FieldArea
              label="내용"
              value={content}
              onChange={(v) => onChange("content", v)}
              onBlur={() => onBlur("content")}
              placeholder="문의 내용을 자세히 적어주세요."
              rows={10}
              error={contentErr ? "내용을 입력해주세요." : ""}
              onKeyDown={onContentKeyDown}
            />

            {/* 이름/이메일: 1열→2열 반응형 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field
                label="보내는사람 이름"
                value={name}
                onChange={(v) => onChange("name", v)}
                onBlur={() => onBlur("name")}
                placeholder="홍길동"
                error={nameErr ? "이름을 입력해주세요." : ""}
                autoComplete="name"
                inputMode="text"
              />
              <Field
                label="이메일"
                type="email"
                value={email}
                onChange={(v) => onChange("email", v)}
                onBlur={() => onBlur("email")}
                placeholder="you@example.com"
                error={emailErr ? "이메일 형식을 확인해주세요." : ""}
                autoComplete="email"
                inputMode="email"
              />
            </div>

            {/* 안내 + 버튼: 모바일 풀폭, 데스크 우측 정렬 */}
            <div className="mt-7 sm:mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs sm:text-[13px] text-neutral-400">
                * 네 칸 모두 입력 + 이메일 형식이 올바르면 버튼이 활성화됩니다.
              </p>

              <button
                onClick={handleSubmit}
                disabled={!canSend() || sending}
                aria-busy={sending}
                className={`h-12 sm:h-11 rounded-2xl text-white text-[15px] transition w-full sm:w-auto px-6
                  ${
                    canSend() && !sending
                      ? "bg-black hover:opacity-90"
                      : "bg-neutral-300 cursor-not-allowed"
                  }`}
              >
                {sending ? "보내는 중…" : "보내기"}
              </button>
            </div>

            {/* 결과 메시지 */}
            {sent && (
              <div
                className={`mt-4 text-sm ${sent === "ok" ? "text-emerald-600" : "text-rose-600"}`}
                role="status"
              >
                {serverMsg}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 공용 입력 필드 (모바일 폰트≥16px로 iOS 자동줌 방지) ───────────────── */

function Field({
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  type = "text",
  error,
  autoComplete,
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  type?: "text" | "email";
  error?: string;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}) {
  return (
    <label className="block mb-4">
      <div className="mb-1 text-[13px] sm:text-sm text-neutral-600">{label}</div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        className={`w-full h-12 sm:h-12 rounded-xl border px-4 outline-none bg-[#fbfbfb] text-[16px] sm:text-[15px] transition
          ${
            error
              ? "border-rose-300 focus:border-rose-400"
              : "border-black/10 focus:border-black/30"
          }`}
      />
      {error ? <p className="mt-1 text-xs text-rose-500">{error}</p> : null}
    </label>
  );
}

function FieldArea({
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  rows = 8,
  hint,
  error,
  counter,
  onKeyDown,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  rows?: number;
  hint?: string;
  error?: string;
  counter?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <label className="block mb-4">
      <div className="mb-1 text-[13px] sm:text-sm text-neutral-600 flex items-center justify-between">
        <span>{label}</span>
        {counter ? <span className="text-neutral-400 text-[12px]">{counter}</span> : null}
      </div>
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        onKeyDown={onKeyDown}
        className={`w-full rounded-xl border px-4 py-3 outline-none bg-[#fbfbfb] resize-y text-[16px] sm:text-[15px] transition
          ${
            error
              ? "border-rose-300 focus:border-rose-400"
              : "border-black/10 focus:border-black/30"
          }`}
      />
      <div className="mt-1 flex items-center justify-between">
        {error ? (
          <p className="text-xs text-rose-500">{error}</p>
        ) : (
          <p className="text-xs text-neutral-400">{hint}</p>
        )}
      </div>
    </label>
  );
}
