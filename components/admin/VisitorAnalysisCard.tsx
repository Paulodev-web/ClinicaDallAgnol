"use client";

import { Users } from "lucide-react";

interface VisitorAnalysisCardProps {
  newCount: number;
  returningCount: number;
  total: number;
  periodDays: number;
}

export function VisitorAnalysisCard({
  newCount,
  returningCount,
  total,
  periodDays,
}: VisitorAnalysisCardProps) {
  const newPct = total > 0 ? Math.round((newCount / total) * 1000) / 10 : 0;
  const retPct = total > 0 ? Math.round((returningCount / total) * 1000) / 10 : 0;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
          <Users className="w-5 h-5 text-primary" />
        </div>
        <h3 className="font-semibold text-slate-900">Análise de Visitantes</h3>
      </div>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-3xl font-bold text-primary">{newCount}</p>
          <p className="text-sm font-medium text-slate-700 mt-1">Visitantes Novos</p>
          <p className="text-xs text-slate-500 mt-0.5">{newPct}% do total</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-primary-mid">{returningCount}</p>
          <p className="text-sm font-medium text-slate-700 mt-1">Recorrentes</p>
          <p className="text-xs text-slate-500 mt-0.5">{retPct}% retenção</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-ink">{total}</p>
          <p className="text-sm font-medium text-slate-700 mt-1">Total</p>
          <p className="text-xs text-slate-500 mt-0.5">Últimos {periodDays} dias</p>
        </div>
      </div>
    </div>
  );
}
