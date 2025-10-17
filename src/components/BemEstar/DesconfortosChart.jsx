import React, { useMemo } from "react";
import { Bar } from "react-chartjs-2";

const LABELS = {
  punho: "Punho",
  lombar: "Lombar",
  joelho: "Joelho",
  calcanhar: "Calcanhar",
  pescoco: "Pescoço",
};

const DesconfortosChart = ({ dataFreq = {}, loading = false }) => {
  const labels = useMemo(() => Object.keys(LABELS).map((k) => LABELS[k]), []);
  const values = useMemo(
    () => Object.keys(LABELS).map((k) => dataFreq[k] || 0),
    [dataFreq]
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Frequência",
        data: values,
        backgroundColor: "rgba(59, 130, 246, 0.25)", // azul-500 com alpha
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 1,
        borderRadius: 8,
      },
    ],
  };

  const options = {
    indexAxis: "y", // ← barras horizontais
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { beginAtZero: true, ticks: { precision: 0 } },
      y: { grid: { display: false } },
    },
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true },
    },
  };

  return (
    <div className="h-72">
      <Bar data={data} options={options} />
      {loading && <p className="text-sm text-gray-500 mt-2">Carregando…</p>}
    </div>
  );
};

export default DesconfortosChart;
