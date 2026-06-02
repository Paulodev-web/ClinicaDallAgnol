"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  Users,
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
  Zap,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { PeriodFilter } from "@/components/admin/PeriodFilter";
import { DashboardKpiCard } from "@/components/admin/DashboardKpiCard";
import { VisitorAnalysisCard } from "@/components/admin/VisitorAnalysisCard";
import { VisitsTrendChart } from "@/components/admin/VisitsTrendChart";
import { PagesPieChart } from "@/components/admin/PagesPieChart";
import {
  ORIGIN_LABELS,
  type PeriodDays,
  type DailyPoint,
  type PathBreakdownItem,
  type AnalyticsTrends,
} from "@/lib/admin/analytics";

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

interface AnalyticsPayload {
  periodDays: number;
  uniqueVisitors: number;
  totalViews: number;
  leads: number;
  whatsappClicks: number;
  engagementPerVisitor: number;
  conversionRate: number;
  visitorAnalysis: { new: number; returning: number; total: number };
  dailySeries: DailyPoint[];
  pathBreakdown: PathBreakdownItem[];
  whatsappOriginBreakdown: { origin: string; count: number }[];
  trends: AnalyticsTrends;
}

interface DashboardData {
  analytics: AnalyticsPayload;
  recentLeads: {
    id: string;
    name: string;
    phone: string;
    message: string | null;
    created_at: string;
  }[];
  recentClicks: {
    id: string;
    page_origin: string;
    device_type: string;
    created_at: string;
  }[];
  financial: { receitas: number; despesas: number; saldo: number };
}

export default function AdminDashboardPage() {
  const [periodDays, setPeriodDays] = useState<PeriodDays>(7);
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/dashboard?days=${periodDays}`, {
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
  }, [periodDays]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading && !data) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  const a = data?.analytics;
  const waChartData =
    a?.whatsappOriginBreakdown?.map(({ origin, count }) => ({
      name: ORIGIN_LABELS[origin] || origin,
      cliques: count,
    })) ?? [];

  const totalEngagements = (a?.leads ?? 0) + (a?.whatsappClicks ?? 0);

  return (
    <div className="p-8 lg:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
              Dashboard Administrativo
            </h1>
            <p className="text-slate-500 mt-1">
              Visão completa das métricas e performance do site
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <PeriodFilter value={periodDays} onChange={setPeriodDays} />
            <button
              type="button"
              onClick={fetchData}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-primary/30 rounded-xl text-primary hover:bg-primary/5 transition-colors disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4" />
              )}
              Atualizar
            </button>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-4 mb-6 bg-red-50 border border-red-200 rounded-xl text-red-700">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {data && a && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              <DashboardKpiCard
                title="Visitantes Únicos"
                value={a.uniqueVisitors}
                subtitle={`${a.totalViews} visualizações totais · Últimos ${a.periodDays} dias`}
                icon={Users}
                iconClassName="bg-primary"
                trend={a.trends.uniqueVisitors}
              />
              <DashboardKpiCard
                title="Engajamento por Visitante"
                value={a.engagementPerVisitor}
                subtitle={`${totalEngagements} interações · formulários e WhatsApp`}
                icon={Zap}
                iconClassName="bg-primary-mid"
                trend={a.trends.engagementPerVisitor}
              />
              <DashboardKpiCard
                title="Taxa de Conversão"
                value={`${a.conversionRate}%`}
                subtitle={`${totalEngagements} conversões de ${a.uniqueVisitors} visitantes`}
                icon={Eye}
                iconClassName="bg-[#4A90C4]"
                trend={a.trends.conversionRate}
              />
              <DashboardKpiCard
                title="Formulários"
                value={a.leads}
                subtitle={`${a.whatsappClicks} cliques WhatsApp · últimos ${a.periodDays} dias`}
                icon={FileText}
                iconClassName="bg-emerald-600"
                trend={a.trends.leads}
              />
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-6 border border-primary/20">
              <p className="text-slate-700 font-medium mb-1">
                O site está trabalhando para você?
              </p>
              <p className="text-2xl font-bold text-slate-900">
                {a.conversionRate > 0
                  ? `Sim! ${a.conversionRate}% dos visitantes únicos entraram em contato.`
                  : a.uniqueVisitors > 0
                    ? "Ainda não. Nenhuma conversão registrada neste período."
                    : "Aguardando visitantes..."}
              </p>
            </div>

            <VisitorAnalysisCard
              newCount={a.visitorAnalysis.new}
              returningCount={a.visitorAnalysis.returning}
              total={a.visitorAnalysis.total}
              periodDays={a.periodDays}
            />

            <div className="grid lg:grid-cols-2 gap-6">
              <VisitsTrendChart data={a.dailySeries} periodDays={a.periodDays} />
              <PagesPieChart data={a.pathBreakdown} />
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h3 className="font-semibold text-slate-900 mb-6 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-[#25D366]" />
                  Origem dos Cliques (WhatsApp)
                </h3>
                {waChartData.length === 0 ? (
                  <p className="text-slate-500 text-sm py-8 text-center">
                    Nenhum clique registrado neste período
                  </p>
                ) : (
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={waChartData}
                        layout="vertical"
                        margin={{ left: 0, right: 20 }}
                      >
                        <XAxis type="number" hide />
                        <YAxis
                          type="category"
                          dataKey="name"
                          width={90}
                          tick={{ fontSize: 12 }}
                        />
                        <Tooltip
                          formatter={(v) => [v ?? 0, "Cliques"]}
                          contentStyle={{ borderRadius: "8px" }}
                        />
                        <Bar dataKey="cliques" fill="#2A5F8F" radius={[0, 4, 4, 0]} />
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
                  <p className="text-slate-500 text-sm py-6">Nenhum lead recebido</p>
                ) : (
                  <div className="space-y-3">
                    {data.recentLeads.map((l) => (
                      <div
                        key={l.id}
                        className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0"
                      >
                        <div>
                          <p className="font-medium text-slate-900">{l.name}</p>
                          <p className="text-sm text-slate-500">{formatPhone(l.phone)}</p>
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
                  <p className="text-slate-500 text-sm py-6">Nenhum clique registrado</p>
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
