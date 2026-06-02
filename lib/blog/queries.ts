import { unstable_noStore as noStore } from "next/cache";
import { createServerClient } from "@/lib/supabase/server";
import type { BlogPost, BlogPostListItem } from "./types";

export async function getPublishedPosts(): Promise<BlogPostListItem[]> {
  noStore();
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("id, title, slug, excerpt, cover_image_url, hero_subtitle, published_at, author")
    .eq("published", true)
    .order("published_at", { ascending: false, nullsFirst: false });

  if (error) {
    console.error("getPublishedPosts error:", error);
    throw error;
  }
  return (data ?? []) as BlogPostListItem[];
}

export async function getPublishedPostBySlug(slug: string): Promise<BlogPost | null> {
  noStore();
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error) throw error;
  return data as BlogPost | null;
}

export async function getRelatedPosts(
  excludeId: string,
  limit = 3
): Promise<BlogPostListItem[]> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("id, title, slug, excerpt, cover_image_url, hero_subtitle, published_at, author")
    .eq("published", true)
    .neq("id", excludeId)
    .order("published_at", { ascending: false, nullsFirst: false })
    .limit(limit);

  if (error) throw error;
  return (data ?? []) as BlogPostListItem[];
}
