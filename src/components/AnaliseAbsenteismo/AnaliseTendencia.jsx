import React from 'react';

const AnaliseTendencia = ({ insights }) => {
  const tendencias = [
    "Taxa de absenteísmo mostra tendência de estabilização após pico no mês de março",
    "Setor Produção continua com tendência de alta, requer atenção imediata",
    "Implementação do programa de bem-estar mostra resultados positivos em 60% dos setores",
    "Turno da noite apresenta 35% mais absenteísmo que turno da manhã"
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6">Análise de Tendência</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tendencias.map((tendencia, index) => (
          <div key={index} className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
            <div className="flex items-start space-x-3">
              <span className="text-purple-500 mt-1">
                {index % 3 === 0 ? '📈' : index % 3 === 1 ? '⚠️' : '✅'}
              </span>
              <p className="text-sm text-gray-700 leading-relaxed">{tendencia}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnaliseTendencia;