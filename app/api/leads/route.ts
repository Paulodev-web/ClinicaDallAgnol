import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const { name, phone, message } = await request.json();
    if (!name?.trim() || !phone?.trim()) {
      return NextResponse.json({ error: "Nome e telefone são obrigatórios" }, { status: 400 });
    }
    const supabase = createServerClient();
    const { error } = await supabase.from("leads").insert({
      name: name.trim(),
      phone: phone.replace(/\D/g, ""),
      message: message?.trim() || null,
    });
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Leads submit error:", e);
    return NextResponse.json({ error: "Erro ao enviar formulário" }, { status: 500 });
  }
}
