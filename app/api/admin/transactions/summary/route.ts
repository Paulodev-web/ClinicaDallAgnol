import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { requireAuth, mergeAuthCookies } from "@/lib/supabase/route-handler";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const authResult = await requireAuth(request);
  if (authResult.jsonResponse) return authResult.jsonResponse;

  try {
    const { searchParams } = new URL(request.url);
    const year = searchParams.get("year");
    const month = searchParams.get("month");

    if (!year || !month) {
      return NextResponse.json(
        { error: "year e month obrigatórios" },
        { status: 400 }
      );
    }

    const m = month.padStart(2, "0");
    const start = `${year}-${m}-01`;
    const lastDay = new Date(parseInt(year), parseInt(month), 0);
    const end = `${year}-${m}-${String(lastDay.getDate()).padStart(2, "0")}`;

    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("financial_transactions")
      .select("type, amount")
      .gte("due_date", start)
      .lte("due_date", end)
      .neq("status", "cancelado");

    if (error) throw error;

    let receitas = 0;
    let despesas = 0;
    (data || []).forEach((r: { type: string; amount: number }) => {
      if (r.type === "receita") receitas += Number(r.amount);
      else despesas += Number(r.amount);
    });

    const jsonRes = NextResponse.json({
      receitas,
      despesas,
      saldo: receitas - despesas,
    });
    return mergeAuthCookies(authResult.response, jsonRes);
  } catch (error) {
    console.error("Summary error:", error);
    return NextResponse.json({ error: "Erro ao buscar resumo" }, { status: 500 });
  }
}
