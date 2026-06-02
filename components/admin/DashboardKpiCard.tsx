"use client";

import { TrendingDown, TrendingUp } from "lucide-react";

interface DashboardKpiCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ElementType;
  iconClassName?: string;
  trend?: number | null;
}

export function DashboardKpiCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconClassName = "bg-primary",
  trend,
}: DashboardKpiCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex items-start justify-between hover:shadow-md transition-shadow">
      <div className="min-w-0 flex-1 pr-3">
        <p className="text-slate-500 text-sm font-medium">{title}</p>
        <p className="text-2xl lg:text-3xl font-bold text-slate-900 mt-1">{value}</p>
        <p className="text-slate-500 text-xs mt-1.5">{subtitle}</p>
        {trend !== null && trend !== undefined && (
          <p
            className={`flex items-center gap-1 text-xs font-medium mt-2 ${
              trend >= 0 ? "text-emerald-600" : "text-red-600"
            }`}
          >
            {trend >= 0 ? (
              <TrendingUp className="w-3.5 h-3.5" />
            ) : (
              <TrendingDown className="w-3.5 h-3.5" />
            )}
            {trend >= 0 ? "+" : ""}
            {trend}% vs. período anterior
          </p>
        )}
      </div>
      <div
        className={`w-12 h-12 rounded-xl ${iconClassName} flex items-center justify-center text-white flex-shrink-0`}
      >
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
}
