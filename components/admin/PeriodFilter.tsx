"use client";

import { PERIOD_OPTIONS, type PeriodDays } from "@/lib/admin/analytics";

interface PeriodFilterProps {
  value: PeriodDays;
  onChange: (days: PeriodDays) => void;
}

export function PeriodFilter({ value, onChange }: PeriodFilterProps) {
  return (
    <div className="flex rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
      {PERIOD_OPTIONS.map((d) => (
        <button
          key={d}
          type="button"
          onClick={() => onChange(d)}
          className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
            value === d
              ? "bg-primary text-white"
              : "text-slate-600 hover:bg-slate-50"
          }`}
        >
          {d}d
        </button>
      ))}
    </div>
  );
}
