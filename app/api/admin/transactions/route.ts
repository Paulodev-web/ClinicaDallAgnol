import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { requireAuth, mergeAuthCookies } from "@/lib/supabase/route-handler";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const authResult = await requireAuth(request);
  if (authResult.jsonResponse) return authResult.jsonResponse;

  try {
    const { searchParams } = new URL(request.url);
    const month = searchParams.get("month");
    const year = searchParams.get("year");
    const categoryId = searchParams.get("category");
    const professional = searchParams.get("professional");
    const search = searchParams.get("search");
    const all = searchParams.get("all") === "1";

    const supabase = createServerClient();
    let q = supabase
      .from("financial_transactions")
      .select("*")
      .order("due_date", { ascending: false })
      .limit(500);

    const includeCanceled = searchParams.get("cancelados") === "1";
    if (!includeCanceled) q = q.neq("status", "cancelado");

    if (!all && month && year) {
      const m = month.padStart(2, "0");
      const start = `${year}-${m}-01`;
      const lastDay = new Date(parseInt(year), parseInt(month), 0);
      const end = `${year}-${m}-${String(lastDay.getDate()).padStart(2, "0")}`;
      q = q.gte("due_date", start).lte("due_date", end);
    }
    if (categoryId) q = q.eq("category_id", categoryId);
    if (professional?.trim()) q = q.eq("professional", professional.trim());
    if (search?.trim()) q = q.ilike("description", `%${search.trim()}%`);

    const { data, error } = await q;
    if (error) throw error;
    const jsonRes = NextResponse.json(data ?? []);
    return mergeAuthCookies(authResult.response, jsonRes);
  } catch (error) {
    console.error("Admin transactions error:", error);
    return NextResponse.json(
      { error: "Erro ao buscar transações" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const authResult = await requireAuth(request);
  if (authResult.jsonResponse) return authResult.jsonResponse;

  try {
    const body = await request.json().catch(() => ({}));
    const { description, amount, type, category_id, due_date, notes, professional } = body;
    if (!description || amount == null || !type || !due_date) {
      return NextResponse.json(
        { error: "Descrição, valor, tipo e data são obrigatórios" },
        { status: 400 }
      );
    }
    const numAmount = Math.abs(Number(String(amount).replace(",", ".")));
    if (isNaN(numAmount) || numAmount <= 0) {
      return NextResponse.json(
        { error: "Valor deve ser um número positivo" },
        { status: 400 }
      );
    }
    const supabase = createServerClient();
    const validProfessionals = ["dr_gabriel", "dr_claudio", "dr_paula"];
    const prof = professional && validProfessionals.includes(String(professional)) ? String(professional) : null;

    const { data, error } = await supabase
      .from("financial_transactions")
      .insert({
        description: String(description).trim(),
        amount: numAmount,
        type: type === "despesa" ? "despesa" : "receita",
        category_id: category_id || null,
        due_date: String(due_date).slice(0, 10),
        notes: notes ? String(notes).trim() : null,
        professional: prof,
        status: "pendente",
      })
      .select()
      .single();
    if (error) throw error;
    const jsonRes = NextResponse.json(data);
    return mergeAuthCookies(authResult.response, jsonRes);
  } catch (error: unknown) {
    console.error("Admin transactions POST error:", error);
    const msg = error && typeof error === "object" && "message" in error
      ? String((error as { message: string }).message)
      : "Erro ao criar lançamento";
    return NextResponse.json(
      { error: msg },
      { status: 500 }
    );
  }
}
