import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

/**
 * Cria um cliente Supabase para Route Handlers (API routes) com suporte a cookies.
 * Use para verificar a sessão do usuário em rotas protegidas.
 */
export async function createAuthClient(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error("Supabase URL e ANON_KEY devem estar definidos");
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  return { supabase, response };
}

/**
 * Verifica se o usuário está autenticado. Retorna { user, supabase, response } ou
 * redireciona com 401 e headers de cookie atualizados.
 */
export async function requireAuth(request: NextRequest) {
  const { supabase, response } = await createAuthClient(request);
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    const jsonResponse = NextResponse.json(
      { error: "Não autorizado. Faça login para continuar." },
      { status: 401 }
    );
    // Copiar cookies de sessão atualizados para a resposta
    const setCookies = response.headers.getSetCookie?.() ?? [];
    setCookies.forEach((cookie) => jsonResponse.headers.append("Set-Cookie", cookie));
    return { user: null, jsonResponse };
  }

  return { user, supabase, response };
}

/**
 * Copia os cookies de sessão do Supabase para a resposta JSON.
 * Use após requireAuth para garantir que o token seja atualizado no cliente.
 */
export function mergeAuthCookies(
  authResponse: NextResponse,
  targetResponse: NextResponse
) {
  const setCookies = authResponse.headers.getSetCookie?.() ?? [];
  setCookies.forEach((cookie) =>
    targetResponse.headers.append("Set-Cookie", cookie)
  );
  return targetResponse;
}
