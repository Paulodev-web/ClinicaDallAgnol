"use client";

import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import {
  RefreshCw,
  Loader2,
  AlertCircle,
  Plus,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Search,
  MoreVertical,
  Pencil,
  Trash2,
  BarChart3,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface Category {
  id: string;
  name: string;
  type: string;
  expense_subtype: string | null;
}

interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: string;
  category_id: string | null;
  due_date: string;
  status: string;
  notes: string | null;
  professional: string | null;
}

const PROFESSIONALS = [
  { value: "dr_gabriel", label: "Dr. Gabriel" },
  { value: "dr_claudio", label: "Dr. Claudio" },
  { value: "dr_paula", label: "Dr. Paula" },
] as const;

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function formatMonthYear(m: string, y: string) {
  const i = parseInt(m, 10) - 1;
  return new Date(parseInt(y), i).toLocaleString("pt-BR", {
    month: "long",
    year: "numeric",
  });
}

export default function AdminFinanceiroPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [prevSummary, setPrevSummary] = useState<{
    receitas: number;
    despesas: number;
    saldo: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [month, setMonth] = useState(() =>
    String(new Date().getMonth() + 1).padStart(2, "0")
  );
  const [year, setYear] = useState(String(new Date().getFullYear()));
  const [categoryFilter, setCategoryFilter] = useState("");
  const [professionalFilter, setProfessionalFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAll, setShowAll] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formDesc, setFormDesc] = useState("");
  const [formAmount, setFormAmount] = useState("");
  const [formType, setFormType] = useState<"receita" | "despesa">("receita");
  const [formCatId, setFormCatId] = useState("");
  const [formDate, setFormDate] = useState(() =>
    new Date().toISOString().slice(0, 10)
  );
  const [formNotes, setFormNotes] = useState("");
  const [formProfessional, setFormProfessional] = useState("");
  const [saving, setSaving] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [menuPosition, setMenuPosition] = useState<{ top: number; left: number } | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const url = `/api/admin/transactions?month=${month}&year=${year}${
        categoryFilter ? `&category=${categoryFilter}` : ""
      }${professionalFilter ? `&professional=${encodeURIComponent(professionalFilter)}` : ""}${
        showAll ? "&all=1" : ""
      }${searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : ""}`;

      const prevMonth =
        !showAll && month && year
          ? parseInt(month) === 1
            ? { month: "12", year: String(parseInt(year) - 1) }
            : {
                month: String(parseInt(month) - 1).padStart(2, "0"),
                year,
              }
          : null;

      const fetchOpts: RequestInit = {
        credentials: "include",
        cache: "no-store",
        headers: { "Cache-Control": "no-cache" },
      };

      const [catsRes, transRes, prevRes] = await Promise.all([
        fetch("/api/admin/categories", fetchOpts),
        fetch(url, fetchOpts),
        prevMonth
          ? fetch(
              `/api/admin/transactions/summary?month=${prevMonth.month}&year=${prevMonth.year}`,
              fetchOpts
            )
          : Promise.resolve(null as Response | null),
      ]);

      if (catsRes.status === 401) throw new Error("Sessão expirada. Faça login novamente.");
      if (transRes.status === 401) throw new Error("Sessão expirada. Faça login novamente.");
      if (!catsRes.ok) throw new Error("Erro ao carregar categorias");
      if (!transRes.ok) throw new Error("Erro ao carregar transações");

      const [catsData, transData, prevData] = await Promise.all([
        catsRes.json(),
        transRes.json(),
        prevRes?.ok ? prevRes.json() : Promise.resolve(null),
      ]);

      setCategories(Array.isArray(catsData) ? catsData : []);
      setTransactions(Array.isArray(transData) ? transData : []);
      setPrevSummary(prevData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao conectar");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const t = setTimeout(fetchData, searchTerm ? 350 : 0);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month, year, categoryFilter, professionalFilter, showAll, searchTerm]);

  // Fechar menu ao rolar a tabela
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el || !openMenuId) return;
    const close = () => {
      setOpenMenuId(null);
      setMenuPosition(null);
    };
    el.addEventListener("scroll", close, { passive: true });
    return () => el.removeEventListener("scroll", close);
  }, [openMenuId]);

  const resetForm = () => {
    setFormDesc("");
    setFormAmount("");
    setFormCatId("");
    setFormNotes("");
    setFormProfessional("");
    setFormDate(new Date().toISOString().slice(0, 10));
    setShowForm(false);
    setEditingId(null);
  };

  const parseAmount = (s: string) => {
    const cleaned = s.replace(/\D/g, "");
    return cleaned ? parseInt(cleaned, 10) / 100 : 0;
  };

  const handleSave = async () => {
    if (!formDesc.trim() || !formAmount || !formDate) return;
    const numAmount = parseAmount(formAmount);
    if (numAmount <= 0) return;
    setSaving(true);
    setError(null);
    try {
      const payload = {
        description: formDesc.trim(),
        amount: numAmount,
        type: formType,
        category_id: formCatId || null,
        due_date: formDate,
        notes: formNotes.trim() || null,
        professional: formType === "receita" && formProfessional ? formProfessional : null,
      };
      const url = editingId
        ? `/api/admin/transactions/${editingId}`
        : "/api/admin/transactions";
      const method = editingId ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro ao salvar");
      resetForm();
      fetchData();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro ao salvar");
    } finally {
      setSaving(false);
    }
  };

  const closeMenu = () => {
    setOpenMenuId(null);
    setMenuPosition(null);
  };

  const handleEdit = (t: Transaction) => {
    setEditingId(t.id);
    setFormDesc(t.description);
    setFormAmount(
      Number(t.amount).toFixed(2).replace(".", ",")
    );
    setFormType(t.type as "receita" | "despesa");
    setFormCatId(t.category_id || "");
    setFormProfessional(t.professional || "");
    setFormDate(t.due_date);
    setFormNotes(t.notes || "");
    setShowForm(true);
    closeMenu();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Excluir este lançamento?")) return;
    closeMenu();
    try {
      const res = await fetch(`/api/admin/transactions/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erro");
      fetchData();
    } catch {
      setError("Erro ao excluir");
    }
  };

  const receitas = transactions.filter((t) => t.type === "receita");
  const despesas = transactions.filter((t) => t.type === "despesa");
  const totalReceitas = receitas.reduce((s, t) => s + Number(t.amount), 0);
  const totalDespesas = despesas.reduce((s, t) => s + Number(t.amount), 0);
  const saldo = totalReceitas - totalDespesas;

  const catMap = Object.fromEntries(categories.map((c) => [c.id, c]));
  let despesaFixa = 0,
    despesaVariavel = 0;
  despesas.forEach((t) => {
    const cat = t.category_id ? catMap[t.category_id] : null;
    if (cat?.expense_subtype === "fixa") despesaFixa += Number(t.amount);
    else despesaVariavel += Number(t.amount);
  });
  const pieData = [
    { name: "Fixas", value: despesaFixa, color: "#3B82F6" },
    { name: "Variáveis", value: despesaVariavel, color: "#F59E0B" },
  ].filter((d) => d.value > 0);

  const receitaCategories = categories.filter((c) => c.type === "receita");
  const despesaCategories = categories.filter((c) => c.type === "despesa");

  const variacaoReceita =
    prevSummary && prevSummary.receitas > 0
      ? ((totalReceitas - prevSummary.receitas) / prevSummary.receitas) * 100
      : null;
  const variacaoDespesa =
    prevSummary && prevSummary.despesas > 0
      ? ((totalDespesas - prevSummary.despesas) / prevSummary.despesas) * 100
      : null;

  return (
    <div className="p-8 lg:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
              Fluxo de Caixa
            </h1>
            <p className="text-slate-500 mt-1">
              Controle completo de receitas e despesas
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4" />
              )}
              Atualizar
            </button>
            <button
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
              className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 font-medium shadow-sm"
            >
              <Plus className="w-4 h-4" />
              Novo lançamento
            </button>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-4 mb-6 bg-red-50 border border-red-200 rounded-xl text-red-700">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
            <button
              onClick={() => setError(null)}
              className="ml-auto text-sm underline"
            >
              Fechar
            </button>
          </div>
        )}

        {/* Navegação por mês */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-6 shadow-sm">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-500">
                Organizar por mês
              </span>
              <div className="flex items-center bg-slate-50 rounded-xl border border-slate-200 p-1">
                <button
                  onClick={() => {
                    const m = parseInt(month, 10);
                    const y = parseInt(year, 10);
                    if (m === 1) {
                      setMonth("12");
                      setYear(String(y - 1));
                    } else {
                      setMonth(String(m - 1).padStart(2, "0"));
                    }
                  }}
                  className="p-2 rounded-lg hover:bg-slate-200 transition-colors"
                  aria-label="Mês anterior"
                >
                  <ChevronLeft className="w-5 h-5 text-slate-600" />
                </button>
                <div className="px-4 py-2 min-w-[180px] text-center">
                  <span className="font-semibold text-slate-900 capitalize">
                    {formatMonthYear(month, year)}
                  </span>
                </div>
                <button
                  onClick={() => {
                    const m = parseInt(month, 10);
                    const y = parseInt(year, 10);
                    const now = new Date();
                    if (y < now.getFullYear() || (y === now.getFullYear() && m < now.getMonth() + 1)) {
                      if (m === 12) {
                        setMonth("01");
                        setYear(String(y + 1));
                      } else {
                        setMonth(String(m + 1).padStart(2, "0"));
                      }
                    }
                  }}
                  className="p-2 rounded-lg hover:bg-slate-200 transition-colors disabled:opacity-50"
                  aria-label="Próximo mês"
                >
                  <ChevronRight className="w-5 h-5 text-slate-600" />
                </button>
              </div>
              <select
                value={`${year}-${month}`}
                onChange={(e) => {
                  const [y, m] = e.target.value.split("-");
                  setYear(y);
                  setMonth(m);
                }}
                className="px-3 py-2 border border-slate-200 rounded-lg text-slate-700 bg-white text-sm"
              >
                {[2024, 2025, 2026, 2027].flatMap((y) =>
                  Array.from({ length: 12 }, (_, i) => {
                    const m = String(i + 1).padStart(2, "0");
                    const label = new Date(y, i).toLocaleString("pt-BR", {
                      month: "short",
                      year: "numeric",
                    });
                    return (
                      <option key={`${y}-${m}`} value={`${y}-${m}`}>
                        {label}
                      </option>
                    );
                  })
                ).reverse()}
              </select>
            </div>
            <label className="flex items-center gap-2 cursor-pointer ml-auto">
              <input
                type="checkbox"
                checked={showAll}
                onChange={(e) => setShowAll(e.target.checked)}
                className="rounded border-slate-300"
              />
              <span className="text-sm text-slate-600">Ver todos os meses</span>
            </label>
          </div>
        </div>

        {/* Filtros secundários */}
        <div className="flex flex-wrap gap-4 mb-6">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2.5 border border-slate-200 rounded-xl text-slate-700 bg-white"
          >
            <option value="">Todas as categorias</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <select
            value={professionalFilter}
            onChange={(e) => setProfessionalFilter(e.target.value)}
            className="px-4 py-2.5 border border-slate-200 rounded-xl text-slate-700 bg-white"
          >
            <option value="">Todos os profissionais</option>
            {PROFESSIONALS.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por descrição..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-slate-700 focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        </div>

        {/* Formulário */}
        {showForm && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6 shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-4">
              {editingId ? "Editar lançamento" : "Novo lançamento"}
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-4">
              <input
                placeholder="Descrição *"
                value={formDesc}
                onChange={(e) => setFormDesc(e.target.value)}
                className="px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <input
                placeholder="Valor (R$) *"
                type="text"
                value={formAmount}
                onChange={(e) => {
                  const v = e.target.value.replace(/\D/g, "");
                  if (v === "") {
                    setFormAmount("");
                    return;
                  }
                  const n = parseInt(v, 10) / 100;
                  setFormAmount(
                    n.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  );
                }}
                className="px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <select
                value={formType}
                onChange={(e) => {
                  setFormType(e.target.value as "receita" | "despesa");
                  setFormCatId("");
                  if (e.target.value === "despesa") setFormProfessional("");
                }}
                className="px-4 py-2.5 border border-slate-200 rounded-xl bg-white"
              >
                <option value="receita">Receita</option>
                <option value="despesa">Despesa</option>
              </select>
              <select
                value={formCatId}
                onChange={(e) => setFormCatId(e.target.value)}
                className="px-4 py-2.5 border border-slate-200 rounded-xl bg-white"
              >
                <option value="">Categoria</option>
                {(formType === "receita"
                  ? receitaCategories
                  : despesaCategories
                ).map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              {formType === "receita" && (
                <select
                  value={formProfessional}
                  onChange={(e) => setFormProfessional(e.target.value)}
                  className="px-4 py-2.5 border border-slate-200 rounded-xl bg-white"
                >
                  <option value="">Profissional</option>
                  {PROFESSIONALS.map((p) => (
                    <option key={p.value} value={p.value}>
                      {p.label}
                    </option>
                  ))}
                </select>
              )}
              <input
                type="date"
                value={formDate}
                onChange={(e) => setFormDate(e.target.value)}
                className="px-4 py-2.5 border border-slate-200 rounded-xl"
              />
              <div className="sm:col-span-2 lg:col-span-6">
                <input
                  placeholder="Observações (opcional)"
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
            <div className="flex gap-4 mt-4">
              <button
                onClick={handleSave}
                disabled={saving || !formDesc.trim() || !formAmount}
                className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 disabled:opacity-50 font-medium"
              >
                {saving ? "Salvando..." : "Salvar"}
              </button>
              <button
                onClick={resetForm}
                className="px-5 py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* Cards de resumo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-br from-emerald-50 to-white rounded-2xl border border-emerald-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-700 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Receitas
                </p>
                <p className="text-2xl font-bold text-slate-900 mt-1">
                  {formatCurrency(totalReceitas)}
                </p>
                {variacaoReceita !== null && (
                  <p
                    className={`text-sm mt-1 ${
                      variacaoReceita >= 0 ? "text-emerald-600" : "text-red-600"
                    }`}
                  >
                    {variacaoReceita >= 0 ? "+" : ""}
                    {variacaoReceita.toFixed(1)}% vs mês anterior
                  </p>
                )}
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-white rounded-2xl border border-red-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-700 flex items-center gap-2">
                  <TrendingDown className="w-4 h-4" />
                  Despesas
                </p>
                <p className="text-2xl font-bold text-slate-900 mt-1">
                  {formatCurrency(totalDespesas)}
                </p>
                {variacaoDespesa !== null && (
                  <p
                    className={`text-sm mt-1 ${
                      variacaoDespesa <= 0 ? "text-emerald-600" : "text-red-600"
                    }`}
                  >
                    {variacaoDespesa >= 0 ? "+" : ""}
                    {variacaoDespesa.toFixed(1)}% vs mês anterior
                  </p>
                )}
              </div>
              <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
          <div
            className={`rounded-2xl border p-6 ${
              saldo >= 0
                ? "bg-gradient-to-br from-slate-50 to-white border-slate-200"
                : "bg-gradient-to-br from-red-50 to-white border-red-100"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Saldo do período
                </p>
                <p
                  className={`text-2xl font-bold mt-1 ${
                    saldo >= 0 ? "text-emerald-600" : "text-red-600"
                  }`}
                >
                  {formatCurrency(saldo)}
                </p>
                {!showAll && (
                  <p className="text-xs text-slate-500 mt-1">
                    {formatMonthYear(month, year)}
                  </p>
                )}
              </div>
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  saldo >= 0 ? "bg-emerald-100" : "bg-red-100"
                }`}
              >
                <BarChart3
                  className={`w-6 h-6 ${
                    saldo >= 0 ? "text-emerald-600" : "text-red-600"
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Receitas por profissional */}
        {receitas.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8 shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-6">
              Receitas por profissional
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {PROFESSIONALS.map((p) => {
                const receitasProf = receitas.filter((t) => t.professional === p.value);
                const total = receitasProf.reduce((s, t) => s + Number(t.amount), 0);
                return (
                  <div
                    key={p.value}
                    className="rounded-xl border border-slate-100 p-4 bg-slate-50/50"
                  >
                    <p className="text-sm font-medium text-slate-600">{p.label}</p>
                    <p className="text-xl font-bold text-emerald-600 mt-1">
                      {formatCurrency(total)}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {receitasProf.length} lançamento(s)
                    </p>
                  </div>
                );
              })}
              <div className="rounded-xl border border-slate-200 p-4 bg-slate-50">
                <p className="text-sm font-medium text-slate-600">Sem profissional</p>
                <p className="text-xl font-bold text-slate-700 mt-1">
                  {formatCurrency(
                    receitas
                      .filter((t) => !t.professional)
                      .reduce((s, t) => s + Number(t.amount), 0)
                  )}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {receitas.filter((t) => !t.professional).length} lançamento(s)
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Gráfico + placeholder para mais espaço */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-6">
              Despesas: Fixo x Variável
            </h3>
            {pieData.length === 0 ? (
              <div className="h-56 flex items-center justify-center text-slate-500">
                Nenhuma despesa no período
              </div>
            ) : (
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
                      }
                    >
                      {pieData.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(v) => formatCurrency(Number(v ?? 0))}
                      contentStyle={{ borderRadius: "8px" }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-4">
              Resumo por categoria
            </h3>
            {despesas.length === 0 ? (
              <p className="text-slate-500">Nenhuma despesa para detalhar</p>
            ) : (
              <div className="space-y-3 max-h-56 overflow-y-auto">
                {Object.entries(
                  despesas.reduce<Record<string, number>>((acc, t) => {
                    const cat = t.category_id ? catMap[t.category_id] : null;
                    const name = cat?.name ?? "Sem categoria";
                    acc[name] = (acc[name] || 0) + Number(t.amount);
                    return acc;
                  }, {})
                )
                  .sort((a, b) => b[1] - a[1])
                  .map(([name, total]) => {
                    const pct =
                      totalDespesas > 0 ? (total / totalDespesas) * 100 : 0;
                    return (
                      <div
                        key={name}
                        className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0"
                      >
                        <span className="text-slate-700">{name}</span>
                        <span className="font-medium text-slate-900">
                          {formatCurrency(total)} ({pct.toFixed(0)}%)
                        </span>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </div>

        {/* Histórico */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <h3 className="font-semibold text-slate-900 p-6 border-b border-slate-100 flex items-center justify-between">
            <span>Movimentações</span>
            {!showAll && (
              <span className="text-sm font-normal text-slate-500">
                {formatMonthYear(month, year)}
              </span>
            )}
          </h3>
          {loading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : transactions.length === 0 ? (
            <div className="p-16 text-center">
              <p className="text-slate-500 mb-4">
                Nenhuma movimentação no período
              </p>
              <p className="text-sm text-slate-400 mb-2">
                Se você já cadastrou dados, marque &quot;Ver todos os meses&quot; para buscar em outros períodos.
              </p>
              <p className="text-sm text-slate-400 mb-6">
                Ou clique em &quot;+ Novo lançamento&quot; para adicionar receitas e despesas.
              </p>
              <button
                onClick={() => {
                  resetForm();
                  setShowForm(true);
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 font-medium"
              >
                <Plus className="w-4 h-4" />
                Adicionar primeiro lançamento
              </button>
            </div>
          ) : (
            <div
              ref={scrollContainerRef}
              className="overflow-auto max-h-[min(70vh,600px)]"
            >
              {(() => {
                const byMonth = showAll
                  ? transactions.reduce<Record<string, Transaction[]>>(
                      (acc, t) => {
                        const key = t.due_date.slice(0, 7);
                        if (!acc[key]) acc[key] = [];
                        acc[key].push(t);
                        return acc;
                      },
                      {}
                    )
                  : { [`${year}-${month}`]: transactions };

                const months = Object.keys(byMonth).sort().reverse();

                return months.map((monthKey) => {
                  const list = byMonth[monthKey];
                  const [y, m] = monthKey.split("-");
                  const monthLabel = formatMonthYear(m, y);
                  const monthReceitas = list
                    .filter((x) => x.type === "receita")
                    .reduce((s, x) => s + Number(x.amount), 0);
                  const monthDespesas = list
                    .filter((x) => x.type === "despesa")
                    .reduce((s, x) => s + Number(x.amount), 0);
                  const monthSaldo = monthReceitas - monthDespesas;

                  return (
                    <div key={monthKey} className="border-b border-slate-200 last:border-b-0">
                      {showAll && (
                        <div
                          className="bg-slate-50 px-6 py-4 flex items-center justify-between border-b border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors"
                          onClick={() => {
                            setMonth(m);
                            setYear(y);
                            setShowAll(false);
                          }}
                        >
                          <span className="font-semibold text-slate-800 capitalize">
                            {monthLabel}
                          </span>
                          <div className="flex items-center gap-6 text-sm">
                            <span className="text-emerald-600">
                              +{formatCurrency(monthReceitas)}
                            </span>
                            <span className="text-red-600">
                              -{formatCurrency(monthDespesas)}
                            </span>
                            <span
                              className={
                                monthSaldo >= 0
                                  ? "text-emerald-600 font-medium"
                                  : "text-red-600 font-medium"
                              }
                            >
                              Saldo: {formatCurrency(monthSaldo)}
                            </span>
                            <button className="text-primary hover:underline text-xs">
                              Ver apenas este mês →
                            </button>
                          </div>
                        </div>
                      )}
                      <table className="w-full min-w-[860px] table-fixed">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200 sticky top-0 z-10">
                            <th className="text-left p-4 font-semibold text-slate-700 w-24">
                              Data
                            </th>
                            <th className="text-left p-4 font-semibold text-slate-700 min-w-0">
                              Descrição
                            </th>
                            <th className="text-left p-4 font-semibold text-slate-700 w-28">
                              Categoria
                            </th>
                            <th className="text-left p-4 font-semibold text-slate-700 w-28">
                              Profissional
                            </th>
                            <th className="text-right p-4 font-semibold text-slate-700 w-24">
                              Valor
                            </th>
                            <th className="w-14 p-4"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {list
                            .sort(
                              (a, b) =>
                                new Date(b.due_date).getTime() -
                                new Date(a.due_date).getTime()
                            )
                            .map((t) => {
                    const cat = t.category_id ? catMap[t.category_id] : null;
                    return (
                      <tr
                        key={t.id}
                        className="border-b border-slate-100 hover:bg-slate-50/50 group"
                      >
                        <td className="p-4 text-slate-600">
                          {formatDate(t.due_date)}
                        </td>
                        <td className="p-4 min-w-0">
                          <div className="min-w-0">
                            <span className="font-medium text-slate-900 block truncate">
                              {t.description}
                            </span>
                            {t.notes && (
                              <p className="text-xs text-slate-500 mt-0.5 truncate">
                                {t.notes}
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="p-4 text-slate-600 truncate">
                          {cat?.name ?? "—"}
                        </td>
                        <td className="p-4 text-slate-600 truncate">
                          {t.type === "receita" && t.professional
                            ? PROFESSIONALS.find((p) => p.value === t.professional)?.label ?? t.professional
                            : "—"}
                        </td>
                        <td
                          className={`p-4 text-right font-medium ${
                            t.type === "receita"
                              ? "text-emerald-600"
                              : "text-red-600"
                          }`}
                        >
                          {t.type === "despesa" ? "-" : "+"}
                          {formatCurrency(t.amount)}
                        </td>
                        <td className="p-4 relative">
                          <button
                            onClick={(e) => {
                              const rect = e.currentTarget.getBoundingClientRect();
                              if (openMenuId === t.id) {
                                closeMenu();
                              } else {
                                let top = rect.bottom + 4;
                                let left = rect.right - 160;
                                if (top + 80 > window.innerHeight) top = rect.top - 80;
                                if (left < 8) left = 8;
                                if (left + 160 > window.innerWidth - 8) left = window.innerWidth - 168;
                                setMenuPosition({ top, left });
                                setOpenMenuId(t.id);
                              }
                            }}
                            className="p-1 rounded-lg hover:bg-slate-100"
                          >
                            <MoreVertical className="w-4 h-4 text-slate-500" />
                          </button>
                        </td>
                      </tr>
                    );
                          })}
                        </tbody>
                      </table>
                    </div>
                  );
                });
              })()}
            </div>
          )}
        </div>

        {/* Portal do menu para evitar clipping e problemas de z-index */}
        {typeof document !== "undefined" &&
          openMenuId &&
          menuPosition &&
          createPortal(
            <>
              <div
                className="fixed inset-0 z-[9998]"
                onClick={closeMenu}
                aria-hidden="true"
              />
              <div
                className="fixed z-[9999] bg-white border border-slate-200 rounded-xl shadow-lg py-1 min-w-[160px]"
                style={{
                  top: menuPosition.top,
                  left: menuPosition.left,
                }}
              >
                {(() => {
                  const openTransaction = transactions.find(
                    (tr) => tr.id === openMenuId
                  );
                  if (!openTransaction) return null;
                  return (
                    <>
                      <button
                        onClick={() => handleEdit(openTransaction)}
                        className="w-full flex items-center gap-2 px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 first:rounded-t-xl last:rounded-b-xl"
                      >
                        <Pencil className="w-4 h-4 flex-shrink-0" />
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(openTransaction.id)}
                        className="w-full flex items-center gap-2 px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 first:rounded-t-xl last:rounded-b-xl"
                      >
                        <Trash2 className="w-4 h-4 flex-shrink-0" />
                        Excluir
                      </button>
                    </>
                  );
                })()}
              </div>
            </>,
            document.body
          )}
      </div>
    </div>
  );
}
