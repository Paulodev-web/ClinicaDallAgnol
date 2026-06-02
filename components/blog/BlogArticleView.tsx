"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { FooterCTA } from "@/components/sections/FooterCTA";
import { Button } from "@/components/ui/Button";
import { MarkdownContent } from "@/components/blog/MarkdownContent";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import type { BlogPost, BlogPostListItem } from "@/lib/blog/types";

function formatDate(dateStr: string | null) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

interface BlogArticleViewProps {
  post: BlogPost;
  relatedPosts?: BlogPostListItem[];
}

export function BlogArticleView({ post, relatedPosts = [] }: BlogArticleViewProps) {
  const heroText =
    post.hero_subtitle?.trim() || post.excerpt;

  return (
    <>
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        {post.cover_image_url ? (
          <Image
            src={post.cover_image_url}
            alt={post.title}
            fill
            priority
            quality={90}
            className="object-cover"
            sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0 bg-section-alt" />
        )}
        <div
          className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/45 to-ink/25"
          aria-hidden
        />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-white/75 hover:text-white text-sm mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar ao blog
            </Link>
            <span className="inline-block text-primary-light font-medium text-xs tracking-[0.14em] uppercase mb-4">
              Blog · Curadoria de conhecimento
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-white mb-6">
              {post.title}
            </h1>
            {heroText && (
              <p className="text-xl text-white/85 leading-relaxed mb-8">{heroText}</p>
            )}
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/70 mb-8">
              {post.published_at && (
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
                </span>
              )}
              {post.author && (
                <span className="inline-flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  {post.author}
                </span>
              )}
            </div>
            <Button href="/contato" variant="primary" size="lg">
              Agendar avaliação
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="section-py bg-page">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block text-primary-mid font-medium text-xs tracking-[0.14em] uppercase mb-3">
                Sobre este artigo
              </span>
              <h2 className="text-3xl sm:text-4xl font-light text-ink mb-6">
                {post.excerpt.split(/[.!?]/)[0]?.trim() || post.title}
              </h2>
              <p className="text-ink-secondary text-lg leading-relaxed">{post.excerpt}</p>
            </motion.div>
            {post.cover_image_url && (
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-brand-lg border border-graysoft/60"
              >
                <Image
                  src={post.cover_image_url}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {post.content?.trim() && (
        <section className="section-py bg-section-alt">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block text-primary-mid font-medium text-xs tracking-[0.14em] uppercase mb-6">
                Conteúdo completo
              </span>
              <MarkdownContent content={post.content} />
            </motion.div>
          </div>
        </section>
      )}

      <section className="section-py bg-page">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-light text-ink mb-4">
            Quer saber se este tratamento é para você?
          </h2>
          <p className="text-ink-secondary text-lg mb-8">
            Nossa equipe avalia seu caso com o mesmo rigor descrito neste artigo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contato" variant="primary" size="lg">
              Falar com a clínica
            </Button>
            <Button href="/servicos" variant="outline" size="lg">
              Ver tratamentos
            </Button>
          </div>
        </div>
      </section>

      {relatedPosts.length > 0 && (
        <section className="section-py bg-section-alt border-t border-graysoft/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-block text-primary-mid font-medium text-xs tracking-[0.14em] uppercase mb-3">
                Continue lendo
              </span>
              <h2 className="text-3xl font-light text-ink">Outros artigos</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((p) => (
                <BlogPostCard key={p.id} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <FooterCTA />
    </>
  );
}
