import { NextResponse } from "next/server";
import { getPublishedPosts } from "@/lib/blog/queries";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

/** Listagem pública de posts publicados (sem cache). */
export async function GET() {
  try {
    const posts = await getPublishedPosts();
    return NextResponse.json(posts);
  } catch (error) {
    console.error("GET /api/blog/posts error:", error);
    return NextResponse.json(
      { error: "Erro ao carregar artigos" },
      { status: 500 }
    );
  }
}
