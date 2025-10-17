import React, { useEffect, useMemo, useState } from "react";
import { getPulsesByPeriod } from "../services/weeklyPulseService";
import PeriodoFilter from "../components/BemEstar/PeriodoFilter";
import SentimentosChart from "../components/BemEstar/SentimentosChart";
import DesconfortosChart from "../components/BemEstar/DesconfortosChart";
import HistoricoLista from "../components/BemEstar/HistoricoLista";
import { ensureChartsRegistered } from "../lib/chartsSetup";

ensureChartsRegistered();


const PERIODOS = {
  M1: "M1",
  M3: "M3",
};

const BemEstar = () => {
  // const { user } = useAuth();
  const userId = "mock-user"; // substitua por user?.id quando integrar

  const [periodo, setPeriodo] = useState(PERIODOS.M1);
  const [pulsos, setPulsos] = useState([]);
  const [loading, setLoading] = useState(true);

  const reload = async () => {
    setLoading(true);
    const months = periodo === PERIODOS.M1 ? 1 : 3;
    const data = await getPulsesByPeriod(userId, months);
    setPulsos(data);
    setLoading(false);
  };

  useEffect(() => {
    reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [periodo]);

  const sentimentoFreq = useMemo(() => {
    const base = {
      feliz: 0,
      triste: 0,
      ansioso: 0,
      estressado: 0,
      motivado: 0,
      desmotivado: 0,
    };
    for (const p of pulsos) {
      if (p.feeling && base[p.feeling] !== undefined) {
        base[p.feeling] += 1;
      }
    }
    return base;
  }, [pulsos]);

  const ergonomiaFreq = useMemo(() => {
    const base = {
      punho: 0,
      lombar: 0,
      joelho: 0,
      calcanhar: 0,
      pescoco: 0,
    };
    for (const p of pulsos) {
      if (Array.isArray(p.ergonomics)) {
        // "nenhum" não entra nas contagens
        p.ergonomics
          .filter((e) => e !== "nenhum")
          .forEach((e) => {
            if (base[e] !== undefined) base[e] += 1;
          });
      }
    }
    return base;
  }, [pulsos]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#5b24ca]">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-[#5b24ca] tracking-tight">Bem-Estar</h1>
            <p className="text-gray-600 mt-1">
              Visualize seus dados históricos de forma privada e identifique padrões pessoais.
            </p>
          </div>

          <PeriodoFilter
            value={periodo}
            onChange={setPeriodo}
            options={[
              { value: PERIODOS.M1, label: "Último mês" },
              { value: PERIODOS.M3, label: "Últimos 3 meses" },
            ]}
          />
        </div>
      </div>

      {/* Gráfico de Sentimentos */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Gráfico de Sentimentos</h2>
          <span className="text-sm text-gray-500">
            {periodo === PERIODOS.M1 ? "Período: 30 dias" : "Período: 90 dias"}
          </span>
        </div>

        <SentimentosChart dataFreq={sentimentoFreq} loading={loading} />
        {!loading && pulsos.length === 0 && (
          <p className="text-sm text-gray-500 mt-3">
            Ainda não há registros no período selecionado.
          </p>
        )}
      </div>

      {/* Gráfico de Desconfortos Físicos */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Desconfortos Físicos</h2>
          <span className="text-sm text-gray-500">
            {periodo === PERIODOS.M1 ? "Período: 30 dias" : "Período: 90 dias"}
          </span>
        </div>

        <DesconfortosChart dataFreq={ergonomiaFreq} loading={loading} />
        {!loading && pulsos.length === 0 && (
          <p className="text-sm text-gray-500 mt-3">
            Ainda não há registros no período selecionado.
          </p>
        )}
      </div>

      {/* Histórico de Registros */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Histórico de Registros</h2>
          <span className="text-sm text-gray-500">
            {pulsos.length} {pulsos.length === 1 ? "registro" : "registros"}
          </span>
        </div>

        <HistoricoLista entries={pulsos} loading={loading} />
      </div>
    </div>
  );
};

export default BemEstar;
