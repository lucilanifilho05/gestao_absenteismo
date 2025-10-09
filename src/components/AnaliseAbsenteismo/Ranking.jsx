import React from 'react';

const Ranking = ({ ranking }) => {
  const getTendenciaIcon = (tendencia) => {
    switch (tendencia) {
      case 'alta': return '🔺';
      case 'baixa': return '🔻';
      case 'estavel': return '➡️';
      default: return '➡️';
    }
  };

  const getTendenciaCor = (tendencia) => {
    switch (tendencia) {
      case 'alta': return 'text-red-600';
      case 'baixa': return 'text-green-600';
      case 'estavel': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6">Ranking de Desempenho</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Piores Resultados */}
        <div>
          <h3 className="text-lg font-medium text-red-700 mb-4">Piores Resultados</h3>
          <div className="space-y-3">
            {ranking.piores.map((setor, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center space-x-3">
                  <span className="text-red-700 font-bold">#{index + 1}</span>
                  <div>
                    <p className="font-medium text-gray-900">{setor.setor}</p>
                    <p className="text-sm text-gray-600">FTE: {setor.fte} | Taxa: {setor.taxa}%</p>
                  </div>
                </div>
                <span className={`text-sm font-medium ${getTendenciaCor(setor.tendencia)}`}>
                  {getTendenciaIcon(setor.tendencia)} {setor.tendencia}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Melhores Resultados */}
        <div>
          <h3 className="text-lg font-medium text-green-700 mb-4">Melhores Resultados</h3>
          <div className="space-y-3">
            {ranking.melhores.map((setor, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center space-x-3">
                  <span className="text-green-700 font-bold">#{index + 1}</span>
                  <div>
                    <p className="font-medium text-gray-900">{setor.setor}</p>
                    <p className="text-sm text-gray-600">FTE: {setor.fte} | Taxa: {setor.taxa}%</p>
                  </div>
                </div>
                <span className={`text-sm font-medium ${getTendenciaCor(setor.tendencia)}`}>
                  {getTendenciaIcon(setor.tendencia)} {setor.tendencia}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ranking;