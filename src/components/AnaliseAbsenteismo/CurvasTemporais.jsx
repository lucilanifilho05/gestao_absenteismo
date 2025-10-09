import React from 'react';
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

// Registra os elementos necessários para o gráfico de linha
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const GraficoEvolucaoPorSetor = () => {
  // Dados mocados com a nova estrutura, incluindo os setores
  const dadosMensais = [
    { mes: 'Jul', producao: 8.1, vendas: 6.5, admin: 4.2, geral: 7.1, meta: 6.0 },
    { mes: 'Ago', producao: 8.8, vendas: 7.0, admin: 4.5, geral: 7.8, meta: 6.0 },
    { mes: 'Set', producao: 8.2, vendas: 6.8, admin: 5.0, geral: 7.5, meta: 6.0 },
    { mes: 'Out', producao: 9.5, vendas: 7.2, admin: 4.8, geral: 8.1, meta: 6.0 },
    { mes: 'Nov', producao: 7.5, vendas: 6.1, admin: 4.0, geral: 6.8, meta: 6.0 },
    { mes: 'Dez', producao: 7.9, vendas: 6.5, admin: 4.3, geral: 7.0, meta: 6.0 },
  ];

  // Prepara os dados para o formato do Chart.js
  const data = {
    labels: dadosMensais.map(d => d.mes), // Eixo X com os meses
    datasets: [
      // Linha para o setor de Produção
      {
        label: 'Produção',
        data: dadosMensais.map(d => d.producao),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.1,
      },
      // Linha para o setor de Vendas
      {
        label: 'Vendas',
        data: dadosMensais.map(d => d.vendas),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        tension: 0.1,
      },
      // Linha para o setor de Administração
      {
        label: 'Administração',
        data: dadosMensais.map(d => d.admin),
        borderColor: 'rgb(139, 92, 246)',
        backgroundColor: 'rgba(139, 92, 246, 0.5)',
        tension: 0.1,
      },
      // Linha para a TAXA GERAL (com maior destaque)
      {
        label: 'Taxa Geral',
        data: dadosMensais.map(d => d.geral),
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        borderWidth: 3, // Linha mais grossa para destaque
        tension: 0.1,
      },
      // Linha para a META (tracejada e mais sutil)
      {
        label: 'Meta',
        data: dadosMensais.map(d => d.meta),
        borderColor: 'rgb(107, 114, 128)',
        backgroundColor: 'rgba(107, 114, 128, 0.5)',
        borderDash: [5, 5], // Cria o efeito tracejado
        borderWidth: 2,
        pointRadius: 0, // Remove os pontos da linha da meta
      }
    ]
  };

  // Configurações e customizações do gráfico
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top', // Posição da legenda
      },
      title: {
        display: true,
        text: 'Evolução do Absenteísmo por Setor (%)',
        font: {
          size: 18
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.parsed.y}%`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        suggestedMin: 3,
        suggestedMax: 12,
        ticks: {
          callback: function(value) {
            return value.toFixed(1) + '%'; // Adiciona '%' e uma casa decimal
          }
        }
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="h-96"> {/* Aumentei a altura para melhor visualização */}
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default GraficoEvolucaoPorSetor;