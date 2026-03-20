import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { requireAuth, mergeAuthCookies } from "@/lib/supabase/route-handler";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
  const authResult = await requireAuth(request);
  if (authResult.jsonResponse) return authResult.jsonResponse;

  try {
    const supabase = createServerClient();
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = String(now.getFullYear());
    const start = `${year}-${month}-01`;
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const end = `${year}-${month}-${String(lastDay.getDate()).padStart(2, "0")}`;

    const [
      { count: visitsCount },
      { count: leadsCount },
      { count: whatsappCount },
      { data: originData },
      { data: recentLeads },
      { data: recentClicks },
      { data: transactions },
    ] = await Promise.all([
      supabase.from("page_visits").select("*", { count: "exact", head: true }),
      supabase.from("leads").select("*", { count: "exact", head: true }),
      supabase.from("whatsapp_clicks").select("*", { count: "exact", head: true }),
      supabase.from("whatsapp_clicks").select("page_origin"),
      supabase.from("leads").select("*").order("created_at", { ascending: false }).limit(5),
      supabase.from("whatsapp_clicks").select("*").order("created_at", { ascending: false }).limit(5),
      supabase
        .from("financial_transactions")
        .select("*")
        .gte("due_date", start)
        .lte("due_date", end)
        .neq("status", "cancelado"),
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
    const originBreakdown = Object.entries(originMap)
      .map(([origin, count]) => ({ origin, count }))
      .sort((a, b) => b.count - a.count);

    const receitas = (transactions || []).filter((t) => t.type === "receita");
    const despesas = (transactions || []).filter((t) => t.type === "despesa");
    const totalReceitas = receitas.reduce((s, t) => s + Number(t.amount), 0);
    const totalDespesas = despesas.reduce((s, t) => s + Number(t.amount), 0);
    const saldo = totalReceitas - totalDespesas;

    const data = {
      analytics: {
        visits,
        leads,
        whatsappClicks,
        conversionRate,
        originBreakdown,
      },
      recentLeads: recentLeads ?? [],
      recentClicks: recentClicks ?? [],
      financial: {
        receitas: totalReceitas,
        despesas: totalDespesas,
        saldo,
      },
    };
    const res = NextResponse.json(data);
    return mergeAuthCookies(authResult.response, res);
  } catch (error) {
    console.error("Dashboard error:", error);
    return NextResponse.json({ error: "Erro ao carregar dashboard" }, { status: 500 });
  }
}
