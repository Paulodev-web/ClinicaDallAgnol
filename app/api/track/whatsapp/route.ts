import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const { pageOrigin, deviceType } = await request.json();
    if (!pageOrigin) {
      return NextResponse.json({ error: "pageOrigin obrigatório" }, { status: 400 });
    }
    const supabase = createServerClient();
    const { error } = await supabase.from("whatsapp_clicks").insert({
      page_origin: pageOrigin,
      device_type: deviceType || "desktop",
    });
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Track whatsapp error:", e);
    return NextResponse.json({ error: "Erro ao registrar clique" }, { status: 500 });
  }
}
