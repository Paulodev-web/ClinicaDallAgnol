import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { requireAuth, mergeAuthCookies } from "@/lib/supabase/route-handler";
import { resolveSlug, validatePublishFields } from "@/lib/blog/api-helpers";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const authResult = await requireAuth(request);
  if (authResult.jsonResponse) return authResult.jsonResponse;

  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("updated_at", { ascending: false });

    if (error) throw error;
    const jsonRes = NextResponse.json(data ?? []);
    return mergeAuthCookies(authResult.response, jsonRes);
  } catch (error) {
    console.error("Admin blog GET error:", error);
    return NextResponse.json({ error: "Erro ao buscar postagens" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const authResult = await requireAuth(request);
  if (authResult.jsonResponse) return authResult.jsonResponse;

  try {
    const body = await request.json().catch(() => ({}));
    const {
      title,
      slug: slugInput,
      excerpt,
      content,
      cover_image_url,
      hero_subtitle,
      author,
      published,
    } = body;

    const validationError = validatePublishFields({
      title,
      excerpt,
      content,
      cover_image_url,
      published: !!published,
    });
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const supabase = createServerClient();
    const slug = await resolveSlug(supabase, String(title), slugInput);
    const isPublished = !!published;
    const now = new Date().toISOString();

    const { data, error } = await supabase
      .from("blog_posts")
      .insert({
        title: String(title).trim(),
        slug,
        excerpt: String(excerpt).trim(),
        content: content ? String(content) : "",
        cover_image_url: cover_image_url ? String(cover_image_url).trim() : null,
        hero_subtitle: hero_subtitle ? String(hero_subtitle).trim() : null,
        author: author ? String(author).trim() : null,
        published: isPublished,
        published_at: isPublished ? now : null,
        created_by: authResult.user?.id ?? null,
      })
      .select()
      .single();

    if (error) throw error;
    const jsonRes = NextResponse.json(data);
    return mergeAuthCookies(authResult.response, jsonRes);
  } catch (error: unknown) {
    console.error("Admin blog POST error:", error);
    const msg =
      error && typeof error === "object" && "message" in error
        ? String((error as { message: string }).message)
        : "Erro ao criar postagem";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
