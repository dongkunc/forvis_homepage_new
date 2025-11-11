// app/api/contact/route.ts
import { Resend } from "resend";

console.log("✅ RESEND_API_KEY:", process.env.RESEND_API_KEY?.slice(0, 10));

export const runtime = "nodejs";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
if (!RESEND_API_KEY) {
  throw new Error("Missing RESEND_API_KEY in environment");
}
const resend = new Resend(RESEND_API_KEY);

// Resend SDK 응답 타입 안전 처리
type SendResult = Awaited<ReturnType<typeof resend.emails.send>>;
type ResendError = NonNullable<SendResult["error"]>;
const hasResendError = (v: unknown): v is ResendError =>
  typeof v === "object" &&
  v !== null &&
  "name" in v &&
  "message" in v &&
  "statusCode" in v;

type ContactPayload = {
  title?: string;
  content?: string;
  name?: string;
  email?: string;
};

export async function POST(req: Request) {
  try {
    const { title, content, name, email } = (await req.json()) as ContactPayload;

    const isEmail = (s?: string) => !!s && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());

    if (!title || !content || !name || !isEmail(email)) {
      console.log("❌ 입력값 누락 or 이메일 형식 오류:", {
        title,
        hasContent: !!content,
        name,
        email,
      });
      return new Response(JSON.stringify({ ok: false, message: "입력값을 확인해주세요." }), {
        status: 400,
      });
    }

    const subject = `[문의] ${title}`;
    const text = [`이름: ${name}`, `이메일: ${email}`, "", "──────── 문의 내용 ────────", content].join(
      "\n"
    );

    const html = `
      <div style="font-family: system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;">
        <h2 style="margin:0 0 8px 0;">문의 접수</h2>
        <p style="color:#666;margin:0 0 20px 0;">FORVIS 홈페이지에서 접수됨</p>
        <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-bottom:16px">
          <tr><td style="padding:6px 8px;color:#555;">이름</td><td style="padding:6px 8px;"><b>${escapeHtml(
            name!
          )}</b></td></tr>
          <tr><td style="padding:6px 8px;color:#555;">이메일</td><td style="padding:6px 8px;">${escapeHtml(
            email!
          )}</td></tr>
          <tr><td style="padding:6px 8px;color:#555;">제목</td><td style="padding:6px 8px;">${escapeHtml(
            title!
          )}</td></tr>
        </table>
        <div style="padding:12px 14px;border:1px solid #eee;border-radius:10px;background:#fafafa;white-space:pre-wrap">
          ${escapeHtml(content!)}
        </div>
      </div>
    `;

    const to = process.env.CONTACT_TO || "admin@forvis.io";
    const from = process.env.CONTACT_FROM || "FORVIS 문의 <admin@forvis.io>";

    console.log("📤 메일 전송 시도:", { from, to, subject, email });

    const result = await resend.emails.send({
      from,
      to,
      subject,
      text,
      html,
      replyTo: email!, // 위에서 isEmail로 검증
    });

    if (result?.data?.id) {
      console.log("✅ Resend 전송 성공:", result.data.id);
    } else if (result?.error) {
      const err = result.error;
      console.log("❌ Resend 전송 실패:", {
        statusCode: err?.statusCode,
        message: err?.message,
        name: err?.name,
      });
    } else {
      console.log("⚠️ Resend 전송 결과(예상외 포맷):", result);
    }

    return Response.json({
      ok: Boolean(result?.data?.id),
      id: result?.data?.id ?? null,
      error: result?.error ?? null,
    });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : JSON.stringify(e);
    console.error("❌ Resend 전송 오류:", msg);
    return new Response(
      JSON.stringify({
        ok: false,
        message: "서버 오류 발생",
        error: msg,
      }),
      { status: 500 }
    );
  }
}

// replaceAll 미사용(ES2021 미만에서도 안전)
function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
