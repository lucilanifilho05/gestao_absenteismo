import React, { useEffect, useMemo, useState } from "react";
import KpiCards from "../components/Incentivos/KpiCards";
import RankCard from "../components/Incentivos/RankCard";
import InsightsCard from "../components/Incentivos/InsightsCard";
import CampaignsTable from "../components/Incentivos/CampaignsTable";
import GoalsTable from "../components/Incentivos/GoalsTable";
import CreateCampaignModal from "../components/Incentivos/CreateCampaignModal";
import CreateGoalModal from "../components/Incentivos/CreateGoalModal";
import {
  seedIfEmpty,
  getDashboard,
  listCampaigns,
  listGoals,
} from "../services/incentivesService";

const PERIODS = [
  { value: 1, label: "Último mês" },
  { value: 3, label: "Últimos 3 meses" },
  { value: 6, label: "Últimos 6 meses" },
];

const IncentivosAdmin = () => {
  const [period, setPeriod] = useState(3);
  const [kpis, setKpis] = useState(null);
  const [ranking, setRanking] = useState(null);
  const [insights, setInsights] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openCampModal, setOpenCampModal] = useState(false);
  const [openGoalModal, setOpenGoalModal] = useState(false);

  const reload = async () => {
    setLoading(true);
    await seedIfEmpty(); // popula mock uma vez
    const dash = await getDashboard(period);
    const camps = await listCampaigns();
    const metas = await listGoals();
    setKpis(dash.kpis);
    setRanking(dash.ranking);
    setInsights(dash.insights);
    setCampaigns(camps);
    setGoals(metas);
    setLoading(false);
  };

  useEffect(() => {
    reload();
  }, [period]);

  const periodLabel = useMemo(
    () => PERIODS.find((p) => p.value === period)?.label || "",
    [period]
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#5b24ca]">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-[#5b24ca] tracking-tight">
              Incentivos & Reconhecimento
            </h1>
            <p className="text-gray-600 mt-1">
              Crie campanhas e metas, acompanhe engajamento e resultados.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="inline-flex rounded-lg border border-gray-300 overflow-hidden">
              {PERIODS.map((p, idx) => {
                const active = period === p.value;
                return (
                  <button
                    key={p.value}
                    onClick={() => setPeriod(p.value)}
                    className={`px-4 py-2 text-sm font-medium transition
                      ${active ? "bg-violet-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"}
                      ${idx !== 0 ? "border-l border-gray-300" : ""}
                    `}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setOpenCampModal(true)}
              className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 text-white"
            >
              + Criar Campanha
            </button>
            <button
              onClick={() => setOpenGoalModal(true)}
              className="px-4 py-2 rounded-lg border border-violet-600 text-violet-700 hover:bg-violet-50"
            >
              + Criar Meta
            </button>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Indicadores-Chave</h2>
          <span className="text-sm text-gray-500">{periodLabel}</span>
        </div>
        {loading ? (
          <p className="text-sm text-gray-500">Carregando…</p>
        ) : (
          <KpiCards kpis={kpis} />
        )}
      </div>

      {/* Rank + Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Ranking de Engajamento</h2>
          {loading ? (
            <p className="text-sm text-gray-500">Carregando…</p>
          ) : (
            <RankCard ranking={ranking} />
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Insights</h2>
          {loading ? (
            <p className="text-sm text-gray-500">Carregando…</p>
          ) : (
            <InsightsCard items={insights} />
          )}
        </div>
      </div>

      {/* Listas de Campanhas / Metas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Campanhas</h2>
          {loading ? (
            <p className="text-sm text-gray-500">Carregando…</p>
          ) : (
            <CampaignsTable items={campaigns} />
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Metas</h2>
          {loading ? (
            <p className="text-sm text-gray-500">Carregando…</p>
          ) : (
            <GoalsTable items={goals} />
          )}
        </div>
      </div>

      {/* Modais */}
      <CreateCampaignModal
        open={openCampModal}
        onClose={() => setOpenCampModal(false)}
        onSaved={reload}
      />
      <CreateGoalModal
        open={openGoalModal}
        onClose={() => setOpenGoalModal(false)}
        onSaved={reload}
      />
    </div>
  );
};

export default IncentivosAdmin;
