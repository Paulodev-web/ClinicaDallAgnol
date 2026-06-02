"use client";

import { motion } from "framer-motion";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { BlogPostFeaturedCard } from "@/components/blog/BlogPostFeaturedCard";
import type { BlogPostListItem } from "@/lib/blog/types";

interface BlogListingGridProps {
  posts: BlogPostListItem[];
}

export function BlogListingGrid({ posts }: BlogListingGridProps) {
  const [featured, ...rest] = posts;

  return (
    <div className="space-y-12">
      {featured && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <BlogPostFeaturedCard post={featured} />
        </motion.div>
      )}

      {rest.length > 0 && (
        <>
          <div className="text-center">
            <span className="inline-block text-primary-mid font-medium text-xs tracking-[0.14em] uppercase mb-2">
              Artigos recentes
            </span>
            <h2 className="text-2xl sm:text-3xl font-light text-ink">
              Mais conteúdos da clínica
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.08 * i }}
              >
                <BlogPostCard post={post} />
              </motion.div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
