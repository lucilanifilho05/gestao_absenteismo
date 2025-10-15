// components/AnaliseAbsenteismo/CurvasTemporais.jsx
import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

/**
 * Espera:
 * - dadosEvolucao: [{ mes, taxa, meta }]
 * - dadosEvolucaoSetores: [{ mes, <Setor 1>: number, <Setor 2>: number, ..., meta: number }]
 * - setorSelecionado: string | ''  (nome do setor, ex.: 'Produção')
 */
const CurvasTemporais = ({
  dadosEvolucao = [],
  dadosEvolucaoSetores = [],
  setorSelecionado = ''
}) => {
  // Detecta nomes de séries de setor (todas as chaves, menos 'mes' e 'meta')
  const nomesSetores = useMemo(() => {
    if (!Array.isArray(dadosEvolucaoSetores) || dadosEvolucaoSetores.length === 0) return [];
    const keys = Object.keys(dadosEvolucaoSetores[0] || {});
    return keys.filter(k => k !== 'mes' && k !== 'meta');
  }, [dadosEvolucaoSetores]);

  // Paleta básica (pode trocar por uma lib de cores, se quiser)
  const palette = [
    'rgb(59, 130, 246)',   // azul
    'rgb(34, 197, 94)',    // verde
    'rgb(139, 92, 246)',   // roxo
    'rgb(245, 158, 11)',   // amber
    'rgb(236, 72, 153)',   // pink
    'rgb(20, 184, 166)',   // teal
    'rgb(239, 68, 68)',    // red
    'rgb(99, 102, 241)',   // indigo
  ];

  const chartData = useMemo(() => {
    // Se temos série multissetorial, montamos datasets por setor
    if (Array.isArray(dadosEvolucaoSetores) && dadosEvolucaoSetores.length > 0) {
      const labels = dadosEvolucaoSetores.map(d => d.mes);

      const setoresParaPlotar = setorSelecionado
        ? nomesSetores.filter(n => n === setorSelecionado) // apenas o selecionado
        : nomesSetores;                                     // todos os setores

      const datasetsSetores = setoresParaPlotar.map((nome, idx) => ({
        label: nome,
        data: dadosEvolucaoSetores.map(d => d[nome]),
        borderColor: palette[idx % palette.length],
        backgroundColor: palette[idx % palette.length].replace('rgb', 'rgba').replace(')', ', 0.3)'),
        borderWidth: setorSelecionado ? 3 : 2,
        tension: 0.2
      }));

      const metaDataset = {
        label: 'Meta',
        data: dadosEvolucaoSetores.map(d => d.meta),
        borderColor: 'rgb(107, 114, 128)',
        backgroundColor: 'rgba(107, 114, 128, 0.5)',
        borderDash: [5, 5],
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.2
      };

      return {
        labels,
        datasets: [...datasetsSetores, metaDataset]
      };
    }

    // Fallback: usa a série simples (Taxa x Meta)
    const labels = (dadosEvolucao || []).map(d => d.mes);
    return {
      labels,
      datasets: [
        {
          label: 'Taxa',
          data: (dadosEvolucao || []).map(d => d.taxa),
          borderColor: 'rgb(239, 68, 68)',
          backgroundColor: 'rgba(239, 68, 68, 0.5)',
          borderWidth: 2,
          tension: 0.2
        },
        {
          label: 'Meta',
          data: (dadosEvolucao || []).map(d => d.meta),
          borderColor: 'rgb(107, 114, 128)',
          backgroundColor: 'rgba(107, 114, 128, 0.5)',
          borderDash: [5, 5],
          borderWidth: 2,
          pointRadius: 0,
          tension: 0.2
        }
      ]
    };
  }, [dadosEvolucao, dadosEvolucaoSetores, nomesSetores, palette, setorSelecionado]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: setorSelecionado
          ? `Evolução do Absenteísmo — ${setorSelecionado} (%)`
          : 'Evolução do Absenteísmo por Setor (%)',
        font: { size: 18 }
      },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y}%`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        suggestedMin: 0,
        suggestedMax: 15,
        ticks: {
          callback(value) {
            return `${Number(value).toFixed(1)}%`;
          }
        }
      }
    }
  }), [setorSelecionado]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="h-96">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default CurvasTemporais;
