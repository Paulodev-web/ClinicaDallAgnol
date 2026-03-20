"use client";

import { useEffect, useState, Suspense } from "react";
import {
  RefreshCw,
  Loader2,
  AlertCircle,
  Users,
  ExternalLink,
} from "lucide-react";

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
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getWhatsAppUrl(phone: string): string {
  const d = phone.replace(/\D/g, "");
  const full = d.startsWith("55") ? d : `55${d}`;
  const msg = encodeURIComponent("Olá! Vi seu contato através do site da clínica.");
  return `https://wa.me/${full}?text=${msg}`;
}

interface Lead {
  id: string;
  name: string;
  phone: string;
  message: string | null;
  created_at: string;
}

function AdminLeadsContent() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/leads");
      if (!res.ok) throw new Error("Erro ao carregar leads");
      const leadsData = await res.json();
      setLeads(Array.isArray(leadsData) ? leadsData : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao conectar");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-8 lg:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
              Repositório de Leads
            </h1>
            <p className="text-slate-500 mt-1">
              Contatos preenchidos no formulário do site
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

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {leads.length === 0 ? (
              <div className="p-16 text-center text-slate-500">
                <Users className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                <p className="font-medium">Nenhum lead cadastrado</p>
                <p className="text-sm mt-1">
                  Os contatos preenchidos no formulário aparecerão aqui
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="text-left p-4 font-semibold text-slate-700">
                        Nome
                      </th>
                      <th className="text-left p-4 font-semibold text-slate-700">
                        Telefone
                      </th>
                      <th className="text-left p-4 font-semibold text-slate-700">
                        Mensagem
                      </th>
                      <th className="text-left p-4 font-semibold text-slate-700">
                        Data
                      </th>
                      <th className="text-left p-4 font-semibold text-slate-700">
                        Ação
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((l) => (
                      <tr
                        key={l.id}
                        className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors"
                      >
                        <td className="p-4 font-medium text-slate-900">
                          {l.name}
                        </td>
                        <td className="p-4 text-slate-600">
                          {formatPhone(l.phone)}
                        </td>
                        <td className="p-4 text-slate-600 max-w-xs truncate">
                          {l.message ?? "—"}
                        </td>
                        <td className="p-4 text-slate-500 text-sm">
                          {formatDate(l.created_at)}
                        </td>
                        <td className="p-4">
                          <a
                            href={getWhatsAppUrl(l.phone)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#25D366] text-white text-sm font-medium rounded-lg hover:bg-[#20BD5A] transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                            WhatsApp
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminLeadsPage() {
  return (
    <Suspense fallback={
      <div className="p-8 lg:p-10 flex items-center justify-center min-h-[50vh]">
        <div className="animate-pulse text-slate-400">Carregando...</div>
      </div>
    }>
      <AdminLeadsContent />
    </Suspense>
  );
}
