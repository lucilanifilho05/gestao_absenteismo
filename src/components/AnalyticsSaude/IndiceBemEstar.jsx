import React from 'react';

const IndiceBemEstar = ({ dados }) => {
  const getIndiceCor = (indice) => {
    if (indice >= 8) return 'text-green-600 bg-green-100';
    if (indice >= 6) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getIndiceTexto = (indice) => {
    if (indice >= 8) return 'Excelente';
    if (indice >= 6) return 'Bom';
    if (indice >= 4) return 'Regular';
    return 'Crítico';
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6">Índice de Bem-Estar Geral</h2>
      
      {/* Card Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="col-span-1 lg:col-span-1">
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border-2 border-blue-200">
            <p className="text-sm text-blue-600 font-medium">Índice Geral</p>
            <div className={`text-4xl font-bold my-4 ${getIndiceCor(dados.geral)} px-4 py-2 rounded-full inline-block`}>
              {dados.geral}
            </div>
            <p className="text-lg font-semibold text-blue-800">{getIndiceTexto(dados.geral)}</p>
            <p className="text-sm text-blue-600 mt-2">Média organizacional</p>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm text-green-600 font-medium">Sentimentos Positivos</p>
              <p className="text-2xl font-bold text-green-700 mt-2">
                {Math.round(dados.setores.reduce((acc, setor) => acc + setor.sentimentosPositivos, 0) / dados.setores.length)}%
              </p>
              <p className="text-xs text-green-600 mt-1">Média dos setores</p>
            </div>
            
            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <p className="text-sm text-orange-600 font-medium">Reclamações Ergonomia</p>
              <p className="text-2xl font-bold text-orange-700 mt-2">
                {Math.round(dados.setores.reduce((acc, setor) => acc + setor.reclamacoesErgonomia, 0) / dados.setores.length)}
              </p>
              <p className="text-xs text-orange-600 mt-1">Média mensal por setor</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabela de Setores */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Desempenho por Setor</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Setor</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Índice</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Classificação</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Sentimentos Positivos</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Reclamações Ergonomia</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {dados.setores.map((setor, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{setor.nome}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getIndiceCor(setor.indice)}`}>
                      {setor.indice}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{getIndiceTexto(setor.indice)}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{setor.sentimentosPositivos}%</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{setor.reclamacoesErgonomia}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Células em Destaque */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Células em Destaque</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {dados.celulas.map((celula, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm font-medium text-gray-900">{celula.nome}</p>
              <p className="text-xs text-gray-600 mb-2">{celula.setor}</p>
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded text-xs font-medium ${getIndiceCor(celula.indice)}`}>
                  {celula.indice}
                </span>
                <span className="text-xs text-gray-500">{getIndiceTexto(celula.indice)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IndiceBemEstar;