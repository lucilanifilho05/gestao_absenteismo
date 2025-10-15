    import React from 'react';

const TrendBars = ({ tendencias }) => {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <h4 className="font-medium text-gray-900 mb-4">Evolução Recente (Últimos 7 dias)</h4>

      {/* Absenteísmo */}
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Taxa de Absenteísmo</span>
            <span className="text-green-600">-2.1%</span>
          </div>
          <div className="flex items-end space-x-1 h-12">
            {tendencias.absenteismo.map((valor, index) => {
              const max = 15; // valor de referência
              const altura = (valor / max) * 100;
              return (
                <div
                  key={index}
                  className="flex-1 bg-blue-200 rounded-t hover:bg-blue-300 transition-all duration-200"
                  style={{ height: `${altura}%` }}
                  title={`${valor}%`}
                />
              );
            })}
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1 px-1">
            {['S', 'T', 'Q', 'Q', 'S', 'S', 'D'].map((dia, i) => (
              <span key={i}>{dia}</span>
            ))}
          </div>
        </div>

        {/* Saúde Organizacional */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Índice de Saúde</span>
            <span className="text-green-600">+0.6</span>
          </div>
          <div className="flex items-end space-x-1 h-12">
            {tendencias.saude.map((valor, index) => {
              const altura = (valor / 10) * 100;
              return (
                <div
                  key={index}
                  className="flex-1 bg-green-200 rounded-t hover:bg-green-300 transition-all duration-200"
                  style={{ height: `${altura}%` }}
                  title={`${valor}/10`}
                />
              );
            })}
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1 px-1">
            {['S', 'T', 'Q', 'Q', 'S', 'S', 'D'].map((dia, i) => (
              <span key={i}>{dia}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendBars;