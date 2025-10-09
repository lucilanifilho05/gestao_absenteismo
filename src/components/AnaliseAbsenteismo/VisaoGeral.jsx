import React from 'react';

const VisaoGeral = ({ dados }) => {
  const cards = [
    {
      titulo: 'Taxa Geral de Absenteísmo',
      valor: `${dados.taxaGeral}%`,
      descricao: 'Média geral da organização',
      cor: 'bg-red-50 border-red-200',
      texto: 'text-red-700'
    },
    {
      titulo: 'FTE',
      valor: dados.fte,
      descricao: 'Full-Time Equivalent',
      cor: 'bg-blue-50 border-blue-200',
      texto: 'text-blue-700'
    },
    {
      titulo: 'Setores em Risco',
      valor: dados.setoresRisco,
      descricao: 'Acima de 8% de absenteísmo',
      cor: 'bg-orange-50 border-orange-200',
      texto: 'text-orange-700'
    },
    {
      titulo: 'Colaboradores Ativos',
      valor: dados.colaboradoresAtivos,
      descricao: 'Presentes no período',
      cor: 'bg-green-50 border-green-200',
      texto: 'text-green-700'
    }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6">Visão Geral</h2>
      
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card, index) => (
          <div key={index} className={`p-4 rounded-lg border-2 ${card.cor}`}>
            <p className="text-sm font-medium text-gray-600">{card.titulo}</p>
            <p className={`text-2xl font-bold ${card.texto} mt-2`}>{card.valor}</p>
            <p className="text-xs text-gray-500 mt-1">{card.descricao}</p>
          </div>
        ))}
      </div>

      {/* Insights Gerais */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">Insights Gerais</h3>
        <div className="space-y-3">
          {dados.insights.map((insight, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <span className="text-yellow-500 mt-1">💡</span>
              <p className="text-sm text-gray-700">{insight}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VisaoGeral;