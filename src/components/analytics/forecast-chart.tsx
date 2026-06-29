import { Target } from "lucide-react";

import { formatMoney, formatMoneyCompact } from "@/lib/format";
import type { ForecastMonthPoint } from "@/server/queries/analytics";
import { ChartCard } from "@/components/analytics/chart-card";
import { ColumnChart } from "@/components/analytics/column-chart";

export function ForecastChart({
  data,
  total,
  currentKey,
}: {
  data: ForecastMonthPoint[];
  total: number;
  currentKey: string;
}) {
  const bars = data.map((m) => ({
    key: m.key,
    label: m.label,
    value: Math.round(m.weighted),
    valueText:
      m.weighted > 0 ? formatMoneyCompact(Math.round(m.weighted)) : "",
    title: `${m.label}: ${formatMoney(Math.round(m.weighted))} ponderado · ${
      m.count
    } ${m.count === 1 ? "negocio" : "negocios"} · ${formatMoney(
      Math.round(m.value),
    )} en juego`,
    highlight: m.key === currentKey,
  }));

  return (
    <ChartCard
      icon={Target}
      title="Previsión por mes"
      description={`Ingreso ponderado por fecha de cierre prevista. Total abierto: ${formatMoney(
        Math.round(total),
      )}.`}
    >
      <ColumnChart
        bars={bars}
        emptyText="Ningún negocio abierto con fecha de cierre en los próximos meses."
      />
    </ChartCard>
  );
}
