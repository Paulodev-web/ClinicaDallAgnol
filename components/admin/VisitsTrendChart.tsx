"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { formatChartDate, type DailyPoint } from "@/lib/admin/analytics";

interface VisitsTrendChartProps {
  data: DailyPoint[];
  periodDays: number;
}

export function VisitsTrendChart({ data, periodDays }: VisitsTrendChartProps) {
  const chartData = data.map((d) => ({
    ...d,
    label: formatChartDate(d.date),
  }));

  const hasData = data.some((d) => d.uniqueVisitors > 0 || d.totalViews > 0);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <h3 className="font-semibold text-slate-900 mb-6">
        Visitantes &amp; Engajamento ({periodDays} dias)
      </h3>
      {!hasData ? (
        <p className="text-slate-500 text-sm py-12 text-center">
          Nenhuma visita registrada neste período
        </p>
      ) : (
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 11, fill: "#64748b" }}
                interval="preserveStartEnd"
              />
              <YAxis tick={{ fontSize: 11, fill: "#64748b" }} allowDecimals={false} />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                }}
                labelFormatter={(_, payload) => {
                  const row = payload?.[0]?.payload as { date?: string } | undefined;
                  return row?.date ? formatChartDate(row.date) : "";
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="uniqueVisitors"
                name="Visitantes Únicos"
                stroke="#2A5F8F"
                strokeWidth={2}
                dot={{ r: 3, fill: "#2A5F8F" }}
              />
              <Line
                type="monotone"
                dataKey="totalViews"
                name="Visualizações Totais"
                stroke="#8A9BB0"
                strokeWidth={2}
                strokeDasharray="6 4"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
