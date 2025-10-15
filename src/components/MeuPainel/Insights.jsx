// components/painel/Insights.jsx
import React from 'react';

const Insights = ({ classificacao, injustificados }) => {
  return (
    <div className="bg-gradient-to-r from-violet-50 to-blue-50 p-6 rounded-lg border border-violet-200">
      <h3 className="text-lg font-semibold text-violet-800 mb-3">💡 Insights do Seu Perfil</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-violet-700 font-medium">Sua taxa de absenteísmo está:</p>
          <p className="text-violet-600">
            {classificacao === 'moderado'
              ? 'Dentro da média esperada. Continue mantendo o equilíbrio!'
              : 'Abaixo da média. Excelente desempenho!'}
          </p>
        </div>
        <div>
          <p className="text-violet-700 font-medium">Recomendação:</p>
          <p className="text-violet-600">
            {injustificados > 0
              ? 'Regularize suas ausências injustificadas com o RH.'
              : 'Todos os seus registros estão em dia. Parabéns!'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Insights;
