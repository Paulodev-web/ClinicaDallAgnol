import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { requireAuth, mergeAuthCookies } from "@/lib/supabase/route-handler";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const authResult = await requireAuth(request);
  if (authResult.jsonResponse) return authResult.jsonResponse;

  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("whatsapp_clicks")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) throw error;
    const jsonRes = NextResponse.json(data ?? []);
    return mergeAuthCookies(authResult.response, jsonRes);
  } catch (error) {
    console.error("Admin whatsapp-clicks error:", error);
    return NextResponse.json({ error: "Erro ao buscar cliques" }, { status: 500 });
  }
}
