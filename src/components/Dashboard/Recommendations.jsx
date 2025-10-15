import React from 'react';

const Recommendations = () => {
  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg border border-purple-200">
      <h3 className="text-lg font-semibold text-purple-800 mb-3">🎯 Recomendações do Sistema</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-purple-700 font-medium">Prioridade Alta:</p>
          <p className="text-purple-600">Revisar os 3 casos críticos no Risk Scoring e agendar intervenções</p>
        </div>
        <div>
          <p className="text-purple-700 font-medium">Manutenção:</p>
          <p className="text-purple-600">Validar pendências de ausências para manter dados atualizados</p>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;