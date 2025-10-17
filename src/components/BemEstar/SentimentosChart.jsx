import React, { useMemo } from "react";
import { Bar } from "react-chartjs-2";

const LABELS = {
  feliz: "Feliz",
  triste: "Triste",
  ansioso: "Ansioso",
  estressado: "Estressado",
  motivado: "Motivado",
  desmotivado: "Desmotivado",
};

const SentimentosChart = ({ dataFreq = {}, loading = false }) => {
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
        // cores suaves “sem brand lock”; ajuste à vontade
        backgroundColor: "rgba(124, 58, 237, 0.25)", // violeta-600 com alpha
        borderColor: "rgba(124, 58, 237, 1)",
        borderWidth: 1,
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // permite ocupar a altura do container
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true, ticks: { precision: 0 } },
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

export default SentimentosChart;
