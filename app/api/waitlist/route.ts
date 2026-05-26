import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { email?: string; name?: string; teamSize?: string };
    if (!body.email || !body.email.includes("@")) {
      return NextResponse.json({ error: "valid email required" }, { status: 400 });
    }
    // Landing-mode stub: in fullstack mode this would persist to Supabase or
    // forward to Loops / ConvertKit / Resend. For the pre-launch landing build
    // we just acknowledge — the operator can wire a real provider later.
    console.log("[waitlist]", body);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: "invalid payload" }, { status: 400 });
  }
}
