import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { requireAuth, mergeAuthCookies } from "@/lib/supabase/route-handler";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const authResult = await requireAuth(request);
  if (authResult.jsonResponse) return authResult.jsonResponse;

  try {
    const supabase = createServerClient();

    const [
      { count: clientsCount },
      { count: appointmentsCount },
      { count: transactionsCount },
      { count: visitorsCount },
    ] = await Promise.all([
      supabase.from("clients").select("*", { count: "exact", head: true }),
      supabase.from("appointments").select("*", { count: "exact", head: true }),
      supabase.from("financial_transactions").select("*", { count: "exact", head: true }),
      supabase.from("site_visitors").select("*", { count: "exact", head: true }),
    ]);

    const jsonRes = NextResponse.json({
      clients: clientsCount ?? 0,
      appointments: appointmentsCount ?? 0,
      transactions: transactionsCount ?? 0,
      visitors: visitorsCount ?? 0,
    });
    return mergeAuthCookies(authResult.response, jsonRes);
  } catch (error) {
    console.error("Admin stats error:", error);
    return NextResponse.json(
      { error: "Erro ao buscar estatísticas" },
      { status: 500 }
    );
  }
}
