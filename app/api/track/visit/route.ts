import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const { path, sessionId, deviceType } = await request.json();
    if (!path || !sessionId) {
      return NextResponse.json({ error: "path e sessionId obrigatórios" }, { status: 400 });
    }
    const supabase = createServerClient();
    const { error } = await supabase.from("page_visits").insert({
      session_id: sessionId,
      path: path || "/",
      device_type: deviceType || "desktop",
    });
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Track visit error:", e);
    return NextResponse.json({ error: "Erro ao registrar visita" }, { status: 500 });
  }
}
