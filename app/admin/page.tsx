"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Eye,
  FileText,
  MessageCircle,
  TrendingUp,
  RefreshCw,
  Loader2,
  AlertCircle,
  ArrowRight,
  DollarSign,
  Smartphone,
  Monitor,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

const ORIGIN_LABELS: Record<string, string> = {
  home: "Início",
  servicos: "Serviços",
  equipe: "Equipe",
  contato: "Contato",
  blog: "Blog",
};

function formatPhone(phone: string) {
  const d = phone.replace(/\D/g, "");
  if (d.length === 11) return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  if (d.length === 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return phone;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
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

interface DashboardData {
  analytics: {
    visits: number;
    leads: number;
    whatsappClicks: number;
    conversionRate: number;
    originBreakdown: { origin: string; count: number }[];
  };
  recentLeads: { id: string; name: string; phone: string; message: string | null; created_at: string }[];
  recentClicks: { id: string; page_origin: string; device_type: string; created_at: string }[];
  financial: { receitas: number; despesas: number; saldo: number };
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/dashboard", {
        cache: "no-store",
        headers: { "Cache-Control": "no-cache" },
      });
      if (!res.ok) throw new Error("Erro ao carregar");
      const json = await res.json();
      if (json.error) throw new Error(json.error);
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao conectar");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading && !data) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  const chartData = data?.analytics?.originBreakdown?.map(({ origin, count }) => ({
    name: ORIGIN_LABELS[origin] || origin,
    cliques: count,
  })) ?? [];

  return (
    <div className="p-8 lg:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
              Dashboard
            </h1>
            <p className="text-slate-500 mt-1">
              Visão geral do desempenho do site e finanças
            </p>
          </div>
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
        </div>

        {error && (
          <div className="flex items-center gap-2 p-4 mb-6 bg-red-50 border border-red-200 rounded-xl text-red-700">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {data && (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              <StatCard
                title="Visitas"
                value={data.analytics.visits}
                icon={Eye}
                color="bg-violet-500"
                trend={null}
              />
              <StatCard
                title="Formulários"
                value={data.analytics.leads}
                icon={FileText}
                color="bg-emerald-500"
              />
              <StatCard
                title="Cliques WhatsApp"
                value={data.analytics.whatsappClicks}
                icon={MessageCircle}
                color="bg-[#25D366]"
              />
              <StatCard
                title="Taxa de Conversão"
                value={`${data.analytics.conversionRate}%`}
                icon={TrendingUp}
                color="bg-primary"
              />
            </div>

            {/* Status do Site */}
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-6 border border-primary/20">
              <p className="text-slate-700 font-medium mb-1">
                O site está trabalhando para você?
              </p>
              <p className="text-2xl font-bold text-slate-900">
                {data.analytics.conversionRate > 0
                  ? `Sim! ${data.analytics.conversionRate}% dos visitantes entraram em contato.`
                  : data.analytics.visits > 0
                    ? "Ainda não. Nenhuma conversão registrada."
                    : "Aguardando visitantes..."}
              </p>
            </div>

            {/* Grid: Gráfico + Financeiro */}
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h3 className="font-semibold text-slate-900 mb-6">
                  Origem dos Cliques (WhatsApp)
                </h3>
                {chartData.length === 0 ? (
                  <p className="text-slate-500 text-sm py-8 text-center">
                    Nenhum clique registrado ainda
                  </p>
                ) : (
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData} layout="vertical" margin={{ left: 0, right: 20 }}>
                        <XAxis type="number" hide />
                        <YAxis
                          type="category"
                          dataKey="name"
                          width={80}
                          tick={{ fontSize: 12 }}
                        />
                        <Tooltip
                          formatter={(v) => [v ?? 0, "Cliques"]}
                          contentStyle={{ borderRadius: "8px" }}
                        />
                        <Bar dataKey="cliques" fill="#35A7DD" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h3 className="font-semibold text-slate-900 mb-6">
                  Fluxo de Caixa (Este Mês)
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-slate-100">
                    <span className="text-slate-600 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-emerald-500" />
                      Receitas
                    </span>
                    <span className="font-semibold text-emerald-600">
                      {formatCurrency(data.financial.receitas)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-slate-100">
                    <span className="text-slate-600 flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-red-500" />
                      Despesas
                    </span>
                    <span className="font-semibold text-red-600">
                      -{formatCurrency(data.financial.despesas)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-4">
                    <span className="font-semibold text-slate-900">Saldo</span>
                    <span
                      className={`text-xl font-bold ${
                        data.financial.saldo >= 0 ? "text-emerald-600" : "text-red-600"
                      }`}
                    >
                      {formatCurrency(data.financial.saldo)}
                    </span>
                  </div>
                </div>
                <Link
                  href="/admin/financeiro"
                  className="mt-4 flex items-center gap-2 text-primary hover:text-primary/80 font-medium text-sm"
                >
                  Ver detalhes
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Últimos Leads e Cliques */}
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-slate-900">Últimos Leads</h3>
                  <Link
                    href="/admin/leads"
                    className="text-sm text-primary hover:text-primary/80 font-medium flex items-center gap-1"
                  >
                    Ver todos
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
                {data.recentLeads.length === 0 ? (
                  <p className="text-slate-500 text-sm py-6">
                    Nenhum lead recebido
                  </p>
                ) : (
                  <div className="space-y-3">
                    {data.recentLeads.map((l) => (
                      <div
                        key={l.id}
                        className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0"
                      >
                        <div>
                          <p className="font-medium text-slate-900">{l.name}</p>
                          <p className="text-sm text-slate-500">
                            {formatPhone(l.phone)}
                          </p>
                        </div>
                        <span className="text-xs text-slate-400">
                          {formatDate(l.created_at)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-slate-900">
                    Últimos Cliques WhatsApp
                  </h3>
                  <Link
                    href="/admin/leads"
                    className="text-sm text-primary hover:text-primary/80 font-medium flex items-center gap-1"
                  >
                    Ver todos
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
                {data.recentClicks.length === 0 ? (
                  <p className="text-slate-500 text-sm py-6">
                    Nenhum clique registrado
                  </p>
                ) : (
                  <div className="space-y-3">
                    {data.recentClicks.map((c) => (
                      <div
                        key={c.id}
                        className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0"
                      >
                        <div className="flex items-center gap-3">
                          {c.device_type === "mobile" ? (
                            <Smartphone className="w-4 h-4 text-slate-400" />
                          ) : (
                            <Monitor className="w-4 h-4 text-slate-400" />
                          )}
                          <span className="font-medium text-slate-900">
                            {ORIGIN_LABELS[c.page_origin] || c.page_origin}
                          </span>
                        </div>
                        <span className="text-xs text-slate-400">
                          {formatDate(c.created_at)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon: Icon,
  color,
}: {
  title: string;
  value: number | string;
  icon: React.ElementType;
  color: string;
  trend?: number | null;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex items-start justify-between hover:shadow-md transition-shadow">
      <div>
        <p className="text-slate-500 text-sm font-medium">{title}</p>
        <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
      </div>
      <div
        className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center text-white flex-shrink-0`}
      >
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
}
