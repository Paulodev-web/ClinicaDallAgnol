"use client";

import Image from "next/image";
import {
  Loader2,
  AlertCircle,
  Upload,
  ArrowLeft,
  Globe,
  Eye,
  FileImage,
} from "lucide-react";
import { slugify } from "@/lib/blog/slug";

export interface BlogEditorFormState {
  title: string;
  slug: string;
  slugManual: boolean;
  heroSubtitle: string;
  excerpt: string;
  content: string;
  author: string;
  coverUrl: string;
  published: boolean;
}

interface BlogPostEditorProps {
  editingId: string | null;
  form: BlogEditorFormState;
  setForm: React.Dispatch<React.SetStateAction<BlogEditorFormState>>;
  formError: string | null;
  saving: boolean;
  uploading: boolean;
  onCoverUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSaveDraft: () => void;
  onPublish: () => void;
  onCancel: () => void;
}

export function BlogPostEditor({
  editingId,
  form,
  setForm,
  formError,
  saving,
  uploading,
  onCoverUpload,
  onSaveDraft,
  onPublish,
  onCancel,
}: BlogPostEditorProps) {
  const update = (patch: Partial<BlogEditorFormState>) =>
    setForm((prev) => ({ ...prev, ...patch }));

  const handleTitleChange = (title: string) => {
    setForm((prev) => ({
      ...prev,
      title,
      slug: !prev.slugManual && !editingId ? slugify(title) : prev.slug,
    }));
  };

  return (
    <div className="max-w-5xl mx-auto">
      <button
        type="button"
        onClick={onCancel}
        className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 text-sm mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar à lista
      </button>

      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {editingId ? "Editar página do blog" : "Nova página do blog"}
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Monte a página como no site: capa, texto do hero, seções em Markdown e publicação.
          </p>
        </div>
        {form.slug && (
          <a
            href={`/blog/${form.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-primary/30 text-primary text-sm hover:bg-primary/5"
          >
            <Eye className="w-4 h-4" />
            Prévia (após publicar)
          </a>
        )}
      </div>

      <div className="mb-6 p-4 rounded-xl border border-amber-200 bg-amber-50 text-amber-900 text-sm">
        <p className="font-medium flex items-center gap-2">
          <Globe className="w-4 h-4" />
          Só aparece em /blog depois de clicar em &quot;Publicar no site&quot; (botão verde).
        </p>
      </div>

      {formError && (
        <div className="mb-6 flex items-center gap-2 p-4 rounded-xl bg-red-50 text-red-700 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          {formError}
        </div>
      )}

      <div className="space-y-8">
        <section className="bg-white rounded-2xl border border-slate-200 p-6 lg:p-8">
          <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-6 flex items-center gap-2">
            <FileImage className="w-4 h-4 text-primary" />
            Hero da página (topo)
          </h2>
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Título da página *
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl"
                  placeholder="Ex.: Facetas e imagem profissional"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Subtítulo do hero
                </label>
                <textarea
                  value={form.heroSubtitle}
                  onChange={(e) => update({ heroSubtitle: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl resize-none"
                  placeholder="Texto grande abaixo do título na página do artigo"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  URL (slug)
                </label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) =>
                    update({ slug: e.target.value, slugManual: true })
                  }
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl font-mono text-sm"
                />
                <p className="text-xs text-slate-400 mt-1">/blog/{form.slug || "..."}</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Imagem de capa * (card + hero)
              </label>
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-100 border border-dashed border-slate-300 mb-3">
                {form.coverUrl ? (
                  <Image
                    src={form.coverUrl}
                    alt="Capa"
                    fill
                    className="object-cover"
                    sizes="480px"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 text-sm p-4 text-center">
                    <Upload className="w-8 h-8 mb-2 opacity-50" />
                    Envie a imagem principal da página
                  </div>
                )}
              </div>
              <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-sm cursor-pointer hover:bg-slate-200">
                {uploading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Upload className="w-4 h-4" />
                )}
                {uploading ? "Enviando..." : "Enviar capa"}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  className="hidden"
                  onChange={onCoverUpload}
                  disabled={uploading}
                />
              </label>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-slate-200 p-6 lg:p-8">
          <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-6">
            Card em /blog
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Resumo do card *
              </label>
              <textarea
                value={form.excerpt}
                onChange={(e) => update({ excerpt: e.target.value })}
                rows={3}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl resize-none"
                placeholder="Aparece no card da listagem do blog"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Autor
              </label>
              <input
                type="text"
                value={form.author}
                onChange={(e) => update({ author: e.target.value })}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl"
              />
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-slate-200 p-6 lg:p-8">
          <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-2">
            Corpo da página
          </h2>
          <p className="text-sm text-slate-500 mb-6">
            Use Markdown: ## para títulos, listas, negrito, etc. Vira as seções da página pública.
          </p>
          <textarea
            value={form.content}
            onChange={(e) => update({ content: e.target.value })}
            rows={18}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-mono leading-relaxed"
            placeholder={"## Por que isso importa\n\nTexto da primeira seção...\n\n## Como funciona\n\nMais conteúdo..."}
          />
        </section>

        <section className="bg-white rounded-2xl border border-slate-200 p-6">
          <p className="text-sm text-slate-600 mb-4">
            Use <strong>Publicar no site</strong> para criar o card em /blog e a página em{" "}
            <code className="text-xs bg-slate-100 px-1 rounded">/blog/{form.slug || "seu-slug"}</code>.
            Rascunho não aparece no blog público.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm order-3 sm:order-1 sm:mr-auto"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={onSaveDraft}
              disabled={saving}
              className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-sm font-medium disabled:opacity-60 order-2"
            >
              Salvar rascunho
            </button>
            <button
              type="button"
              onClick={onPublish}
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 disabled:opacity-60 order-1 sm:order-3"
            >
              {saving && <Loader2 className="w-4 h-4 animate-spin" />}
              Publicar no site
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
