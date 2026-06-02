import { PageHero } from "@/components/sections/PageHero";
import { FooterCTA } from "@/components/sections/FooterCTA";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { getPublishedPosts } from "@/lib/blog/queries";

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <>
      <PageHero
        title="Blog"
        subtitle="Perspectivas sobre odontologia de excelência — artigos técnicos e conteúdos sobre saúde bucal, estética e bem-estar."
      />

      <section className="section-py bg-page">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="max-w-2xl mx-auto text-center bg-surface rounded-2xl p-12 border border-graysoft/60 shadow-brand-md">
              <span className="inline-block text-primary-mid font-medium text-xs tracking-[0.14em] uppercase mb-4">
                Em breve
              </span>
              <h2 className="text-2xl sm:text-3xl font-light text-ink mb-4">
                Estamos preparando conteúdos exclusivos
              </h2>
              <p className="text-ink-secondary text-lg leading-relaxed">
                Artigos sobre tratamentos, cuidados preventivos e novidades da
                clínica estarão disponíveis aqui em breve.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>

      <FooterCTA />
    </>
  );
}
