import React from "react";

const Pill = ({ ok, children }) => (
  <span
    className={`text-xs px-2 py-0.5 rounded ${
      ok ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
    }`}
  >
    {children}
  </span>
);

const KpiCard = ({ title, value, subtitle, trend }) => {
  const isPositive = (trend ?? 0) >= 0;
  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <Pill ok={isPositive}>{isPositive ? "↗︎" : "↘︎"} {Math.abs(trend || 0)}%</Pill>
      </div>
      <div className="mt-2 text-2xl font-bold text-gray-900">{value}</div>
      {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
    </div>
  );
};

const KpiCards = ({ kpis }) => {
  if (!kpis) return null;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      <KpiCard
        title="Taxa de Engajamento Geral"
        value={`${kpis.engagementRate}%`}
        trend={kpis.engagementTrend}
        subtitle="Média ponderada por campanhas/metas"
      />
      <KpiCard
        title="Redução do Absenteísmo Pós-Campanha"
        value={`${kpis.absenceReduction}%`}
        trend={kpis.absenceTrend}
        subtitle="Δ antes vs. depois"
      />
      <KpiCard
        title="Setores/Células mais Engajados"
        value={kpis.topUnitsLabel || "—"}
        subtitle="Top 1 no período"
      />
      <KpiCard
        title="Metas Ativas • Encerradas"
        value={`${kpis.goalsActive} • ${kpis.goalsClosed}`}
        subtitle="Contagem atual"
        trend={kpis.goalsDelta}
      />
    </div>
  );
};

export default KpiCards;
