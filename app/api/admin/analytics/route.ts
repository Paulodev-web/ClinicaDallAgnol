import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { requireAuth, mergeAuthCookies } from "@/lib/supabase/route-handler";

export async function GET(request: NextRequest) {
  const authResult = await requireAuth(request);
  if (authResult.jsonResponse) return authResult.jsonResponse;

  try {
    const supabase = createServerClient();

    const [
      { count: visitsCount },
      { count: leadsCount },
      { count: whatsappCount },
      { data: originData },
    ] = await Promise.all([
      supabase.from("page_visits").select("*", { count: "exact", head: true }),
      supabase.from("leads").select("*", { count: "exact", head: true }),
      supabase.from("whatsapp_clicks").select("*", { count: "exact", head: true }),
      supabase.from("whatsapp_clicks").select("page_origin"),
    ]);

    const visits = visitsCount ?? 0;
    const leads = leadsCount ?? 0;
    const whatsappClicks = whatsappCount ?? 0;
    const conversions = leads + whatsappClicks;
    const conversionRate = visits > 0 ? Math.round((conversions / visits) * 100) : 0;

    const originMap: Record<string, number> = {};
    (originData || []).forEach((row: { page_origin: string }) => {
      const k = row.page_origin || "outros";
      originMap[k] = (originMap[k] || 0) + 1;
    });
    const originBreakdown = Object.entries(originMap).map(([origin, count]) => ({ origin, count }));

    const jsonRes = NextResponse.json({
      visits,
      leads,
      whatsappClicks,
      conversionRate,
      originBreakdown,
    });
    return mergeAuthCookies(authResult.response, jsonRes);
  } catch (error) {
    console.error("Admin analytics error:", error);
    return NextResponse.json({ error: "Erro ao buscar analytics" }, { status: 500 });
  }
}
