import React from 'react';
import { Bar } from 'react-chartjs-2';

const DiasSemanaFaltas = ({ dados }) => {
  const chartData = {
    labels: dados.labels,
    datasets: [
      {
        label: 'Percentual de Faltas',
        data: dados.dados,
        backgroundColor: [
          '#EF4444', // Segunda - Vermelho
          '#F59E0B', // Terça - Laranja
          '#10B981', // Quarta - Verde
          '#3B82F6', // Quinta - Azul
          '#8B5CF6', // Sexta - Roxo
          '#6B7280'  // Sábado - Cinza
        ],
        borderColor: '#FFFFFF',
        borderWidth: 1,
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `Faltas: ${context.parsed.y}%`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 40,
        title: {
          display: true,
          text: 'Percentual de Faltas (%)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Dias da Semana'
        }
      }
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6">Dias da Semana com Mais Faltas</h2>
      
      <div className="h-80">
        <Bar data={chartData} options={chartOptions} />
      </div>

      {/* Análise */}
      <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <h4 className="font-medium text-yellow-800 mb-2">📊 Análise do Padrão:</h4>
        <p className="text-sm text-yellow-700">
          Maior incidência de faltas às segundas-feiras ({Math.max(...dados.dados)}%) e sextas-feiras, 
          sugerindo possível padrão de prolongamento de finais de semana.
        </p>
      </div>
    </div>
  );
};

export default DiasSemanaFaltas;