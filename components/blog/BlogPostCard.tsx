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

interface BlogPostCardProps {
  post: BlogPostListItem;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col bg-surface rounded-2xl border border-graysoft/60 shadow-brand-sm overflow-hidden hover:shadow-brand-md transition-shadow"
    >
      <div className="relative aspect-[16/10] bg-section-alt overflow-hidden">
        {post.cover_image_url ? (
          <Image
            src={post.cover_image_url}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-ink-secondary/40 text-sm">
            Sem imagem
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        {post.published_at && (
          <time
            dateTime={post.published_at}
            className="text-xs text-primary-mid tracking-[0.12em] uppercase mb-2"
          >
            {formatDate(post.published_at)}
          </time>
        )}
        <h2 className="text-xl font-light text-ink mb-2 group-hover:text-primary-mid transition-colors">
          {post.title}
        </h2>
        <p className="text-ink-secondary text-sm leading-relaxed line-clamp-3 flex-1">
          {post.hero_subtitle || post.excerpt}
        </p>
        {post.author && (
          <p className="text-xs text-ink-secondary/80 mt-4">{post.author}</p>
        )}
        <span className="inline-block mt-4 text-sm text-primary-mid font-medium">
          Ler artigo →
        </span>
      </div>
    </Link>
  );
}
