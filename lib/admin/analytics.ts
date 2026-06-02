export const PERIOD_OPTIONS = [7, 30, 60, 90] as const;
export type PeriodDays = (typeof PERIOD_OPTIONS)[number];

export const PATH_LABELS: Record<string, string> = {
  home: "Início",
  servicos: "Serviços",
  equipe: "Equipe",
  contato: "Contato",
  blog: "Blog",
  facetas: "Facetas",
  periodontia: "Periodontia",
  implantodontia: "Implantodontia",
  claudio: "Dr. Cláudio",
};

export const ORIGIN_LABELS: Record<string, string> = {
  home: "Início",
  servicos: "Serviços",
  equipe: "Equipe",
  contato: "Contato",
  blog: "Blog",
};

export interface PageVisitRow {
  session_id: string;
  created_at: string;
  path: string;
}

export interface DailyPoint {
  date: string;
  uniqueVisitors: number;
  totalViews: number;
}

export interface PathBreakdownItem {
  path: string;
  label: string;
  count: number;
}

export interface VisitorAnalysis {
  new: number;
  returning: number;
  total: number;
}

export interface PeriodMetrics {
  uniqueVisitors: number;
  totalViews: number;
  leads: number;
  whatsappClicks: number;
  engagementPerVisitor: number;
  conversionRate: number;
  visitorAnalysis: VisitorAnalysis;
  dailySeries: DailyPoint[];
  pathBreakdown: PathBreakdownItem[];
}

export interface AnalyticsTrends {
  uniqueVisitors: number | null;
  totalViews: number | null;
  leads: number | null;
  whatsappClicks: number | null;
  engagementPerVisitor: number | null;
  conversionRate: number | null;
}

const TZ = "America/Sao_Paulo";

export function parsePeriodDays(value: string | null): PeriodDays {
  const n = Number(value);
  if (PERIOD_OPTIONS.includes(n as PeriodDays)) return n as PeriodDays;
  return 7;
}

/** Start of calendar day in São Paulo as UTC Date */
function startOfDaySP(date: Date): Date {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const y = parts.find((p) => p.type === "year")!.value;
  const m = parts.find((p) => p.type === "month")!.value;
  const d = parts.find((p) => p.type === "day")!.value;
  return new Date(`${y}-${m}-${d}T03:00:00.000Z`);
}

export function getPeriodBounds(days: PeriodDays): {
  periodStart: Date;
  periodEnd: Date;
  previousStart: Date;
  previousEnd: Date;
} {
  const now = new Date();
  const periodEnd = new Date(now.getTime() + 60_000);
  const periodStart = startOfDaySP(new Date(now.getTime() - (days - 1) * 86_400_000));
  const previousEnd = new Date(periodStart.getTime() - 1);
  const previousStart = startOfDaySP(
    new Date(periodStart.getTime() - days * 86_400_000)
  );
  return { periodStart, periodEnd, previousStart, previousEnd };
}

export function toDateKeySP(iso: string): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(iso));
}

export function formatChartDate(dateKey: string): string {
  const [, m, d] = dateKey.split("-");
  return `${d}/${m}`;
}

export function percentChange(current: number, previous: number): number | null {
  if (previous === 0) return current > 0 ? 100 : null;
  return Math.round(((current - previous) / previous) * 1000) / 10;
}

function pathLabel(path: string): string {
  const key = (path || "outros").replace(/^\//, "") || "home";
  return PATH_LABELS[key] || key;
}

function filterByRange<T extends { created_at: string }>(
  rows: T[],
  start: Date,
  end: Date
): T[] {
  const t0 = start.getTime();
  const t1 = end.getTime();
  return rows.filter((r) => {
    const t = new Date(r.created_at).getTime();
    return t >= t0 && t <= t1;
  });
}

function computeMetricsFromVisits(
  visits: PageVisitRow[],
  leadsCount: number,
  whatsappCount: number,
  knownSessionIds: Set<string>,
  dayKeys: string[]
): PeriodMetrics {
  const sessionsInPeriod = new Set<string>();
  const dailySessions: Record<string, Set<string>> = {};
  const dailyViews: Record<string, number> = {};
  const pathMap: Record<string, number> = {};

  for (const key of dayKeys) {
    dailySessions[key] = new Set();
    dailyViews[key] = 0;
  }

  for (const v of visits) {
    if (!v.session_id) continue;
    sessionsInPeriod.add(v.session_id);
    const dk = toDateKeySP(v.created_at);
    if (dailySessions[dk]) {
      dailySessions[dk].add(v.session_id);
      dailyViews[dk]++;
    }
    const p = v.path || "outros";
    pathMap[p] = (pathMap[p] || 0) + 1;
  }

  const uniqueVisitors = sessionsInPeriod.size;
  const totalViews = visits.length;
  const conversions = leadsCount + whatsappCount;
  const engagementPerVisitor =
    uniqueVisitors > 0
      ? Math.round((conversions / uniqueVisitors) * 10) / 10
      : 0;
  const conversionRate =
    uniqueVisitors > 0 ? Math.round((conversions / uniqueVisitors) * 100) : 0;

  let newCount = 0;
  let returningCount = 0;
  Array.from(sessionsInPeriod).forEach((sid) => {
    if (knownSessionIds.has(sid)) returningCount++;
    else newCount++;
  });

  const dailySeries: DailyPoint[] = dayKeys.map((date) => ({
    date,
    uniqueVisitors: dailySessions[date]?.size ?? 0,
    totalViews: dailyViews[date] ?? 0,
  }));

  const pathBreakdown: PathBreakdownItem[] = Object.entries(pathMap)
    .map(([path, count]) => ({
      path,
      label: pathLabel(path),
      count,
    }))
    .sort((a, b) => b.count - a.count);

  return {
    uniqueVisitors,
    totalViews,
    leads: leadsCount,
    whatsappClicks: whatsappCount,
    engagementPerVisitor,
    conversionRate,
    visitorAnalysis: {
      new: newCount,
      returning: returningCount,
      total: uniqueVisitors,
    },
    dailySeries,
    pathBreakdown,
  };
}

export function buildDayKeys(periodStart: Date, periodEnd: Date): string[] {
  const keys: string[] = [];
  let cursor = startOfDaySP(periodStart);
  const end = startOfDaySP(periodEnd);
  while (cursor.getTime() <= end.getTime()) {
    keys.push(
      new Intl.DateTimeFormat("en-CA", {
        timeZone: TZ,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(cursor)
    );
    cursor = new Date(cursor.getTime() + 86_400_000);
  }
  return keys;
}

export function aggregatePeriodMetrics(
  allVisits: PageVisitRow[],
  leadsRows: { created_at: string }[],
  whatsappRows: { created_at: string; page_origin?: string }[],
  knownSessionIds: Set<string>,
  periodStart: Date,
  periodEnd: Date
): PeriodMetrics {
  const dayKeys = buildDayKeys(periodStart, periodEnd);
  const visits = filterByRange(allVisits, periodStart, periodEnd);
  const leads = filterByRange(leadsRows, periodStart, periodEnd).length;
  const wa = filterByRange(whatsappRows, periodStart, periodEnd).length;
  return computeMetricsFromVisits(
    visits,
    leads,
    wa,
    knownSessionIds,
    dayKeys
  );
}

export function buildWhatsappOriginBreakdown(
  rows: { created_at: string; page_origin: string }[],
  periodStart: Date,
  periodEnd: Date
): { origin: string; count: number }[] {
  const filtered = filterByRange(rows, periodStart, periodEnd);
  const map: Record<string, number> = {};
  for (const r of filtered) {
    const k = r.page_origin || "outros";
    map[k] = (map[k] || 0) + 1;
  }
  return Object.entries(map)
    .map(([origin, count]) => ({ origin, count }))
    .sort((a, b) => b.count - a.count);
}

export function buildTrends(
  current: PeriodMetrics,
  previous: PeriodMetrics
): AnalyticsTrends {
  return {
    uniqueVisitors: percentChange(
      current.uniqueVisitors,
      previous.uniqueVisitors
    ),
    totalViews: percentChange(current.totalViews, previous.totalViews),
    leads: percentChange(current.leads, previous.leads),
    whatsappClicks: percentChange(
      current.whatsappClicks,
      previous.whatsappClicks
    ),
    engagementPerVisitor: percentChange(
      current.engagementPerVisitor,
      previous.engagementPerVisitor
    ),
    conversionRate: percentChange(
      current.conversionRate,
      previous.conversionRate
    ),
  };
}

export function extractKnownSessions(
  visitsBeforePeriod: PageVisitRow[]
): Set<string> {
  const set = new Set<string>();
  for (const v of visitsBeforePeriod) {
    if (v.session_id) set.add(v.session_id);
  }
  return set;
}
