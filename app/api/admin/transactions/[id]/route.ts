import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { requireAuth, mergeAuthCookies } from "@/lib/supabase/route-handler";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await requireAuth(request);
  if (authResult.jsonResponse) return authResult.jsonResponse;

  try {
    const { id } = await params;
    const body = await request.json().catch(() => ({}));
    const { description, amount, type, category_id, due_date, notes, status, professional } = body;

    const supabase = createServerClient();
    const updates: Record<string, unknown> = {};

    if (description !== undefined) updates.description = String(description).trim();
    if (amount !== undefined) {
      const num = Math.abs(Number(String(amount).replace(",", ".")));
      if (isNaN(num) || num <= 0) {
        return NextResponse.json({ error: "Valor inválido" }, { status: 400 });
      }
      updates.amount = num;
    }
    if (type !== undefined) updates.type = type === "despesa" ? "despesa" : "receita";
    if (category_id !== undefined) updates.category_id = category_id || null;
    if (due_date !== undefined) updates.due_date = String(due_date).slice(0, 10);
    if (notes !== undefined) updates.notes = notes ? String(notes).trim() : null;
    if (professional !== undefined) {
      const valid = ["dr_gabriel", "dr_claudio", "dr_paula"];
      updates.professional = professional && valid.includes(String(professional)) ? String(professional) : null;
    }
    if (status !== undefined) {
      const valid = ["pendente", "pago", "cancelado"];
      if (valid.includes(status)) updates.status = status;
      if (status === "pago" && !body.payment_date) {
        updates.payment_date = new Date().toISOString().slice(0, 10);
      }
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "Nenhum campo para atualizar" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("financial_transactions")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    const jsonRes = NextResponse.json(data);
    return mergeAuthCookies(authResult.response, jsonRes);
  } catch (error: unknown) {
    console.error("Transaction PATCH error:", error);
    const msg = error && typeof error === "object" && "message" in error
      ? String((error as { message: string }).message)
      : "Erro ao atualizar";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await requireAuth(request);
  if (authResult.jsonResponse) return authResult.jsonResponse;

  try {
    const { id } = await params;
    const supabase = createServerClient();
    const { error } = await supabase
      .from("financial_transactions")
      .delete()
      .eq("id", id);

    if (error) throw error;
    const jsonRes = NextResponse.json({ ok: true });
    return mergeAuthCookies(authResult.response, jsonRes);
  } catch (error: unknown) {
    console.error("Transaction DELETE error:", error);
    const msg = error && typeof error === "object" && "message" in error
      ? String((error as { message: string }).message)
      : "Erro ao excluir";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
