import { createServerClientForMiddleware } from "@/lib/supabase/middleware";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Proteger todas as rotas /admin exceto /admin/login
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const { supabase, response } = await createServerClientForMiddleware(request);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    return response;
  }

  // Se já logado e acessando /admin/login, redirecionar para /admin
  if (pathname === "/admin/login") {
    const { supabase, response } = await createServerClientForMiddleware(request);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const redirect = request.nextUrl.searchParams.get("redirect") || "/admin";
      return NextResponse.redirect(new URL(redirect, request.url));
    }

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
