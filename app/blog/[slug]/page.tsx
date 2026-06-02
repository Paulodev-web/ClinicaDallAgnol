import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BlogArticleView } from "@/components/blog/BlogArticleView";
import { getPublishedPostBySlug, getRelatedPosts } from "@/lib/blog/queries";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) {
    return { title: "Artigo não encontrado | Blog" };
  }
  return {
    title: `${post.title} | Blog Dall Agnol`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      ...(post.cover_image_url ? { images: [{ url: post.cover_image_url }] } : {}),
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) notFound();

  const relatedPosts = await getRelatedPosts(post.id);

  return <BlogArticleView post={post} relatedPosts={relatedPosts} />;
}
