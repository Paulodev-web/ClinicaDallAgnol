import type { SupabaseClient } from "@supabase/supabase-js";
import { slugify, ensureUniqueSlug } from "./slug";

export async function resolveSlug(
  supabase: SupabaseClient,
  title: string,
  providedSlug?: string,
  excludeId?: string
): Promise<string> {
  const base = slugify(providedSlug?.trim() || title) || "post";

  return ensureUniqueSlug(base, async (candidate) => {
    let q = supabase.from("blog_posts").select("id").eq("slug", candidate);
    if (excludeId) q = q.neq("id", excludeId);
    const { data } = await q.maybeSingle();
    return !!data;
  });
}

export function validatePublishFields(body: {
  title?: string;
  excerpt?: string;
  content?: string;
  cover_image_url?: string | null;
  published?: boolean;
}): string | null {
  if (!body.title?.trim()) return "Título é obrigatório";
  if (!body.excerpt?.trim()) return "Resumo é obrigatório";
  if (body.published) {
    if (!body.content?.trim()) {
      return "Conteúdo é obrigatório para publicar";
    }
    if (!body.cover_image_url?.trim()) {
      return "Imagem de capa é obrigatória para publicar (aparece no card e no topo da página)";
    }
  }
  return null;
}
