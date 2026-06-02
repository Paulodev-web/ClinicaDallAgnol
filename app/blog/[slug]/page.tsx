import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { FooterCTA } from "@/components/sections/FooterCTA";
import { MarkdownContent } from "@/components/blog/MarkdownContent";
import { getPublishedPostBySlug } from "@/lib/blog/queries";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
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

  return (
    <>
      <section className="relative min-h-[55vh] flex items-end overflow-hidden">
        {post.cover_image_url ? (
          <Image
            src={post.cover_image_url}
            alt={post.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0 bg-section-alt" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/40 to-ink/20" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-32">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao blog
          </Link>
          <span className="block text-primary-light text-xs tracking-[0.14em] uppercase mb-3">
            Blog
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white max-w-4xl">
            {post.title}
          </h1>
        </div>
      </section>

      <section className="section-py bg-page border-b border-graysoft/40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-ink-secondary">
            {post.published_at && (
              <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
            )}
            {post.author && <span>{post.author}</span>}
          </div>
          {post.excerpt && (
            <p className="mt-4 text-lg text-ink-secondary leading-relaxed">{post.excerpt}</p>
          )}
        </div>
      </section>

      <section className="section-py bg-page">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <MarkdownContent content={post.content} />
        </div>
      </section>

      <FooterCTA />
    </>
  );
}
