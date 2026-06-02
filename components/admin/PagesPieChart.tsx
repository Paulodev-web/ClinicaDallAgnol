"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts";
import type { PathBreakdownItem } from "@/lib/admin/analytics";

const COLORS = ["#2A5F8F", "#4A90C4", "#7FB3D8", "#8A9BB0", "#C2C8D0", "#1D4A72"];

interface PagesPieChartProps {
  data: PathBreakdownItem[];
}

export function PagesPieChart({ data }: PagesPieChartProps) {
  const chartData = data.map((d) => ({
    name: d.label,
    value: d.count,
  }));

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <h3 className="font-semibold text-slate-900 mb-6">Páginas Mais Visitadas</h3>
      {chartData.length === 0 ? (
        <p className="text-slate-500 text-sm py-12 text-center">
          Nenhuma página visitada neste período
        </p>
      ) : (
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="45%"
                innerRadius={50}
                outerRadius={85}
                paddingAngle={2}
                dataKey="value"
              >
                {chartData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [value ?? 0, "Visualizações"]}
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                }}
              />
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                iconType="circle"
                wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
