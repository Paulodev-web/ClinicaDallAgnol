import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { requireAuth, mergeAuthCookies } from "@/lib/supabase/route-handler";
import {
  parsePeriodDays,
  getPeriodBounds,
  aggregatePeriodMetrics,
  buildWhatsappOriginBreakdown,
  buildTrends,
  extractKnownSessions,
  type PageVisitRow,
} from "@/lib/admin/analytics";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
  const authResult = await requireAuth(request);
  if (authResult.jsonResponse) return authResult.jsonResponse;

  try {
    const supabase = createServerClient();
    const days = parsePeriodDays(request.nextUrl.searchParams.get("days"));
    const { periodStart, periodEnd, previousStart, previousEnd } =
      getPeriodBounds(days);

    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = String(now.getFullYear());
    const start = `${year}-${month}-01`;
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const end = `${year}-${month}-${String(lastDay.getDate()).padStart(2, "0")}`;

    const periodStartIso = periodStart.toISOString();
    const previousStartIso = previousStart.toISOString();

    const [
      { data: allVisitsRaw },
      { data: visitsBeforePeriod },
      { data: leadsRows },
      { data: whatsappRows },
      { data: recentLeads },
      { data: recentClicks },
      { data: transactions },
    ] = await Promise.all([
      supabase
        .from("page_visits")
        .select("session_id, created_at, path")
        .gte("created_at", previousStartIso),
      supabase
        .from("page_visits")
        .select("session_id, created_at")
        .lt("created_at", periodStartIso),
      supabase
        .from("leads")
        .select("created_at")
        .gte("created_at", previousStartIso),
      supabase
        .from("whatsapp_clicks")
        .select("created_at, page_origin")
        .gte("created_at", previousStartIso),
      supabase.from("leads").select("*").order("created_at", { ascending: false }).limit(5),
      supabase
        .from("whatsapp_clicks")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5),
      supabase
        .from("financial_transactions")
        .select("*")
        .gte("due_date", start)
        .lte("due_date", end)
        .neq("status", "cancelado"),
    ]);

    const allVisits = (allVisitsRaw ?? []) as PageVisitRow[];
    const beforeRows = visitsBeforePeriod ?? [];
    const knownSessions = extractKnownSessions(
      beforeRows.map((r) => ({
        session_id: r.session_id,
        created_at: r.created_at,
        path: "",
      }))
    );
    const leads = leadsRows ?? [];
    const whatsapp = whatsappRows ?? [];

    const current = aggregatePeriodMetrics(
      allVisits,
      leads,
      whatsapp,
      knownSessions,
      periodStart,
      periodEnd
    );

    const previousKnown = new Set<string>();
    const prevCutoff = previousStart.getTime();
    for (const row of beforeRows) {
      if (row.session_id && new Date(row.created_at).getTime() < prevCutoff) {
        previousKnown.add(row.session_id);
      }
    }

    const previous = aggregatePeriodMetrics(
      allVisits,
      leads,
      whatsapp,
      previousKnown,
      previousStart,
      previousEnd
    );

    const trends = buildTrends(current, previous);
    const whatsappOriginBreakdown = buildWhatsappOriginBreakdown(
      whatsapp as { created_at: string; page_origin: string }[],
      periodStart,
      periodEnd
    );

    const receitas = (transactions || []).filter((t) => t.type === "receita");
    const despesas = (transactions || []).filter((t) => t.type === "despesa");
    const totalReceitas = receitas.reduce((s, t) => s + Number(t.amount), 0);
    const totalDespesas = despesas.reduce((s, t) => s + Number(t.amount), 0);
    const saldo = totalReceitas - totalDespesas;

    const data = {
      analytics: {
        periodDays: days,
        ...current,
        whatsappOriginBreakdown,
        trends,
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
