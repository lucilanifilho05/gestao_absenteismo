import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const MotivosFaltas = ({ dados }) => {
  const chartData = {
    labels: dados.labels,
    datasets: [
      {
        data: dados.dados,
        backgroundColor: [
          '#3B82F6', // Azul
          '#60A5FA', // Azul claro
          '#8B5CF6', // Roxo
          '#A78BFA', // Roxo claro
          '#EF4444', // Vermelho
          '#6B7280'  // Cinza
        ],
        borderColor: '#FFFFFF',
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 12,
          padding: 15,
          font: {
            size: 11
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.parsed}%`;
          }
        }
      }
    },
    cutout: '60%',
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6">Motivos das Faltas</h2>
      
      <div className="h-80 flex items-center justify-center">
        <Doughnut data={chartData} options={chartOptions} />
      </div>

      {/* Detalhamento em lista */}
      <div className="mt-6 space-y-2">
        {dados.labels.map((label, index) => (
          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
            <div className="flex items-center space-x-3">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: chartData.datasets[0].backgroundColor[index] }}
              ></div>
              <span className="text-sm">{label}</span>
            </div>
            <span className="text-sm font-medium">{dados.dados[index]}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MotivosFaltas;