import { createServerClient } from "@/lib/supabase/server";
import type { BlogPost, BlogPostListItem } from "./types";

export async function getPublishedPosts(): Promise<BlogPostListItem[]> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("id, title, slug, excerpt, cover_image_url, published_at, author")
    .eq("published", true)
    .order("published_at", { ascending: false, nullsFirst: false });

  if (error) throw error;
  return (data ?? []) as BlogPostListItem[];
}

export async function getPublishedPostBySlug(slug: string): Promise<BlogPost | null> {
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
