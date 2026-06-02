import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { requireAuth, mergeAuthCookies } from "@/lib/supabase/route-handler";
import { resolveSlug, validatePublishFields } from "@/lib/blog/api-helpers";

export const dynamic = "force-dynamic";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await requireAuth(request);
  if (authResult.jsonResponse) return authResult.jsonResponse;

  try {
    const { id } = await params;
    const body = await request.json().catch(() => ({}));
    const supabase = createServerClient();

    const { data: existing, error: fetchError } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (fetchError) throw fetchError;
    if (!existing) {
      return NextResponse.json({ error: "Postagem não encontrada" }, { status: 404 });
    }

    const coverUrl =
      body.cover_image_url !== undefined
        ? body.cover_image_url
          ? String(body.cover_image_url).trim()
          : null
        : existing.cover_image_url;

    const merged = {
      title: body.title !== undefined ? String(body.title) : existing.title,
      excerpt: body.excerpt !== undefined ? String(body.excerpt) : existing.excerpt,
      content: body.content !== undefined ? String(body.content) : existing.content,
      cover_image_url: coverUrl,
      published:
        body.published !== undefined ? !!body.published : existing.published,
    };

    const validationError = validatePublishFields(merged);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const updates: Record<string, unknown> = {};

    if (body.title !== undefined) updates.title = merged.title.trim();
    if (body.excerpt !== undefined) updates.excerpt = merged.excerpt.trim();
    if (body.content !== undefined) updates.content = merged.content;
    if (body.cover_image_url !== undefined) {
      updates.cover_image_url = body.cover_image_url
        ? String(body.cover_image_url).trim()
        : null;
    }
    if (body.author !== undefined) {
      updates.author = body.author ? String(body.author).trim() : null;
    }
    if (body.hero_subtitle !== undefined) {
      updates.hero_subtitle = body.hero_subtitle
        ? String(body.hero_subtitle).trim()
        : null;
    }
    if (body.published !== undefined) {
      updates.published = merged.published;
      if (merged.published) {
        updates.published_at = existing.published_at ?? new Date().toISOString();
      } else {
        updates.published_at = null;
      }
    }
    if (body.slug !== undefined || body.title !== undefined) {
      updates.slug = await resolveSlug(
        supabase,
        merged.title,
        body.slug !== undefined ? String(body.slug) : existing.slug,
        id
      );
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "Nenhum campo para atualizar" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("blog_posts")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    const jsonRes = NextResponse.json(data);
    return mergeAuthCookies(authResult.response, jsonRes);
  } catch (error: unknown) {
    console.error("Admin blog PATCH error:", error);
    const msg =
      error && typeof error === "object" && "message" in error
        ? String((error as { message: string }).message)
        : "Erro ao atualizar postagem";
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
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) throw error;
    const jsonRes = NextResponse.json({ ok: true });
    return mergeAuthCookies(authResult.response, jsonRes);
  } catch (error) {
    console.error("Admin blog DELETE error:", error);
    return NextResponse.json({ error: "Erro ao excluir postagem" }, { status: 500 });
  }
}
