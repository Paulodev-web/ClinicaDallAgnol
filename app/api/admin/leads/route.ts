import { NextRequest, NextResponse } from "next/server";
import { requireAuth, mergeAuthCookies } from "@/lib/supabase/route-handler";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const authResult = await requireAuth(request);
  if (authResult.jsonResponse) return authResult.jsonResponse;

  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key =
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) {
      throw new Error("Supabase URL e key não configurados");
    }
    const res = await fetch(
      `${url}/rest/v1/leads?select=*&order=created_at.desc&limit=200`,
      {
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) {
      throw new Error(`Supabase error: ${res.status}`);
    }
    const data = await res.json();
    const leads = Array.isArray(data) ? data : [];
    const jsonRes = NextResponse.json(leads);
    return mergeAuthCookies(authResult.response, jsonRes);
  } catch (error) {
    console.error("Admin leads error:", error);
    return NextResponse.json({ error: "Erro ao buscar leads" }, { status: 500 });
  }
}
