import { PageHero } from "@/components/sections/PageHero";
import { FooterCTA } from "@/components/sections/FooterCTA";
import { BlogListingGrid } from "@/components/blog/BlogListingGrid";
import { getPublishedPosts } from "@/lib/blog/queries";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default async function BlogPage() {
  let posts: Awaited<ReturnType<typeof getPublishedPosts>> = [];
  let fetchError: string | null = null;

  try {
    posts = await getPublishedPosts();
  } catch (e) {
    console.error("Blog page fetch error:", e);
    fetchError = "Não foi possível carregar os artigos. Tente atualizar a página.";
  }

  return (
    <>
      <PageHero
        title="Blog"
        subtitle="Perspectivas sobre odontologia de excelência — artigos técnicos, estudos de caso e conteúdos sobre saúde bucal, estética e bem-estar."
      />

      <section className="section-py bg-page">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {fetchError ? (
            <div className="max-w-2xl mx-auto text-center bg-red-50 rounded-2xl p-8 border border-red-200 text-red-800">
              {fetchError}
            </div>
          ) : posts.length === 0 ? (
            <div className="max-w-2xl mx-auto text-center bg-surface rounded-2xl p-12 border border-graysoft/60 shadow-brand-md">
              <span className="inline-block text-primary-mid font-medium text-xs tracking-[0.14em] uppercase mb-4">
                Nenhum artigo publicado
              </span>
              <h2 className="text-2xl sm:text-3xl font-light text-ink mb-4">
                O blog ainda não tem postagens visíveis
              </h2>
              <p className="text-ink-secondary text-lg leading-relaxed">
                No painel <strong>/admin/blog</strong>, crie uma página e clique em{" "}
                <strong>Publicar no site</strong> (botão verde). Só então o card aparece aqui.
              </p>
            </div>
          ) : (
            <BlogListingGrid posts={posts} />
          )}
        </div>
      </section>

      <FooterCTA />
    </>
  );
}
