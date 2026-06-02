import Image from "next/image";
import Link from "next/link";
import type { BlogPostListItem } from "@/lib/blog/types";

function formatDate(dateStr: string | null) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

interface BlogPostFeaturedCardProps {
  post: BlogPostListItem;
}

export function BlogPostFeaturedCard({ post }: BlogPostFeaturedCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group grid lg:grid-cols-2 gap-0 bg-surface rounded-2xl border border-graysoft/60 shadow-brand-md overflow-hidden hover:shadow-brand-lg transition-shadow"
    >
      <div className="relative min-h-[280px] lg:min-h-[400px] bg-section-alt">
        {post.cover_image_url ? (
          <Image
            src={post.cover_image_url}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-ink-secondary/40">
            Sem imagem de capa
          </div>
        )}
        <span className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-primary text-white text-xs font-medium tracking-wide uppercase">
          Destaque
        </span>
      </div>
      <div className="p-8 lg:p-12 flex flex-col justify-center">
        {post.published_at && (
          <time
            dateTime={post.published_at}
            className="text-xs text-primary-mid tracking-[0.12em] uppercase mb-3"
          >
            {formatDate(post.published_at)}
          </time>
        )}
        <h2 className="text-3xl sm:text-4xl font-light text-ink mb-4 group-hover:text-primary-mid transition-colors">
          {post.title}
        </h2>
        {(post.hero_subtitle || post.excerpt) && (
          <p className="text-ink-secondary text-lg leading-relaxed mb-6 line-clamp-4">
            {post.hero_subtitle || post.excerpt}
          </p>
        )}
        {post.author && (
          <p className="text-sm text-ink-secondary/80 mb-6">{post.author}</p>
        )}
        <span className="inline-flex items-center text-primary-mid font-medium">
          Ler artigo completo →
        </span>
      </div>
    </Link>
  );
}
