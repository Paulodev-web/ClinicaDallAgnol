"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  RefreshCw,
  Loader2,
  AlertCircle,
  Plus,
  Pencil,
  Trash2,
  ExternalLink,
  Globe,
} from "lucide-react";
import type { BlogPostAdmin } from "@/lib/blog/types";
import {
  BlogPostEditor,
  type BlogEditorFormState,
} from "@/components/admin/BlogPostEditor";

const defaultForm = (): BlogEditorFormState => ({
  title: "",
  slug: "",
  slugManual: false,
  heroSubtitle: "",
  excerpt: "",
  content: "",
  author: "Clínica Dall'Agnol",
  coverUrl: "",
  published: true,
});

function formatDate(dateStr: string | null) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPostAdmin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<BlogEditorFormState>(defaultForm);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/blog");
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Erro ao carregar postagens");
      }
      setPosts(await res.json());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro ao carregar");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const openCreate = () => {
    setEditingId(null);
    setForm(defaultForm());
    setFormError(null);
    setEditing(true);
  };

  const openEdit = (post: BlogPostAdmin) => {
    setEditingId(post.id);
    setForm({
      title: post.title,
      slug: post.slug,
      slugManual: true,
      heroSubtitle: post.hero_subtitle || "",
      excerpt: post.excerpt,
      content: post.content,
      author: post.author || "",
      coverUrl: post.cover_image_url || "",
      published: post.published,
    });
    setFormError(null);
    setEditing(true);
  };

  const closeEditor = () => {
    setEditing(false);
    setEditingId(null);
    setForm(defaultForm());
    setFormError(null);
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setFormError(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/blog/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro no upload");
      setForm((prev) => ({ ...prev, coverUrl: data.url }));
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Erro no upload");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleSave = async (publish: boolean) => {
    setSaving(true);
    setFormError(null);
    try {
      const payload = {
        title: form.title,
        slug: form.slug,
        excerpt: form.excerpt,
        hero_subtitle: form.heroSubtitle || null,
        content: form.content,
        author: form.author || null,
        cover_image_url: form.coverUrl || null,
        published: publish,
      };

      const res = await fetch(
        editingId ? `/api/admin/blog/${editingId}` : "/api/admin/blog",
        {
          method: editingId ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro ao salvar");

      closeEditor();
      await fetchPosts();
      if (publish) {
        alert(`Publicado! Veja em /blog e em /blog/${data.slug}`);
      } else {
        alert("Rascunho salvo. Use «Publicar no site» para aparecer em /blog.");
      }
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Erro ao salvar");
    } finally {
      setSaving(false);
    }
  };

  const handleQuickPublish = async (post: BlogPostAdmin) => {
    if (!post.cover_image_url) {
      alert("Adicione uma imagem de capa antes de publicar.");
      openEdit(post);
      return;
    }
    if (!post.content?.trim()) {
      alert("Adicione o conteúdo do artigo antes de publicar.");
      openEdit(post);
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/blog/${post.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: true }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro ao publicar");
      await fetchPosts();
      alert(`Publicado! Abra /blog ou /blog/${post.slug}`);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Erro ao publicar");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Excluir esta postagem?")) return;
    try {
      const res = await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Erro ao excluir");
      }
      await fetchPosts();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Erro ao excluir");
    }
  };

  if (editing) {
    return (
      <div className="p-6 lg:p-8">
        <BlogPostEditor
          editingId={editingId}
          form={form}
          setForm={setForm}
          formError={formError}
          saving={saving}
          uploading={uploading}
          onCoverUpload={handleCoverUpload}
          onSaveDraft={() => handleSave(false)}
          onPublish={() => handleSave(true)}
          onCancel={closeEditor}
        />
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Blog</h1>
          <p className="text-slate-500 text-sm mt-1">
            Cada postagem vira um card em /blog e uma página completa no site
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={fetchPosts}
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Atualizar
          </button>
          <button
            type="button"
            onClick={openCreate}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90"
          >
            <Plus className="w-4 h-4" />
            Nova página
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 flex items-center gap-2 p-4 rounded-xl bg-red-50 text-red-700 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-16 text-slate-500 bg-white rounded-2xl border border-slate-200">
          Nenhuma postagem ainda. Clique em &quot;Nova página&quot; para começar.
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-left text-slate-500">
                  <th className="px-4 py-3 font-medium">Capa</th>
                  <th className="px-4 py-3 font-medium">Título</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">No site</th>
                  <th className="px-4 py-3 font-medium text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id} className="border-b border-slate-100 last:border-0">
                    <td className="px-4 py-3">
                      <div className="relative w-16 h-11 rounded-lg overflow-hidden bg-slate-100">
                        {post.cover_image_url ? (
                          <Image
                            src={post.cover_image_url}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        ) : null}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-slate-900">{post.title}</p>
                      <p className="text-xs text-slate-400">/blog/{post.slug}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                          post.published
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {post.published ? "Publicado" : "Rascunho — não aparece em /blog"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {formatDate(post.published_at)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        {!post.published && (
                          <button
                            type="button"
                            onClick={() => handleQuickPublish(post)}
                            disabled={saving}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-medium hover:bg-emerald-700 disabled:opacity-60"
                            title="Publicar no site"
                          >
                            <Globe className="w-3.5 h-3.5" />
                            Publicar
                          </button>
                        )}
                        {post.published && (
                          <a
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100"
                            title="Ver no site"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                        <button
                          type="button"
                          onClick={() => openEdit(post)}
                          className="p-2 rounded-lg text-slate-500 hover:bg-slate-100"
                          title="Editar"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(post.id)}
                          className="p-2 rounded-lg text-red-500 hover:bg-red-50"
                          title="Excluir"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
