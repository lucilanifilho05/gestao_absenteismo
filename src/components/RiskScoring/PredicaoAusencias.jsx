import React from 'react';

const PredicaoAusencias = ({ predicoes }) => {
  const getClassificacaoCor = (classificacao) => {
    switch (classificacao) {
      case 'alto': return 'bg-red-100 text-red-800 border-red-300';
      case 'medio': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'baixo': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getProbabilidadeCor = (probabilidade) => {
    if (probabilidade >= 70) return 'text-red-600';
    if (probabilidade >= 40) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getBarraProgressoCor = (probabilidade) => {
    if (probabilidade >= 70) return 'bg-red-500';
    if (probabilidade >= 40) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6">Predição de Possíveis Ausências</h2>
      
      <div className="space-y-4">
        {predicoes.map((predicao) => (
          <div key={predicao.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="font-semibold text-gray-900">{predicao.nome}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getClassificacaoCor(predicao.classificacao)}`}>
                    {predicao.classificacao.toUpperCase()} RISCO
                  </span>
                </div>
                <p className="text-sm text-gray-600">{predicao.cargo} • {predicao.departamento}</p>
              </div>
              
              <div className="text-right">
                <div className={`text-2xl font-bold ${getProbabilidadeCor(predicao.probabilidade)}`}>
                  {predicao.probabilidade}%
                </div>
                <p className="text-xs text-gray-500">Probabilidade</p>
              </div>
            </div>

            {/* Barra de probabilidade */}
            <div className="mb-3">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Nível de risco</span>
                <span>Período estimado: {predicao.periodoEstimado}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${getBarraProgressoCor(predicao.probabilidade)}`}
                  style={{ width: `${predicao.probabilidade}%` }}
                ></div>
              </div>
            </div>

            {/* Fatores de Risco */}
            <div className="mb-3">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Fatores de Risco Identificados:</h4>
              <div className="flex flex-wrap gap-1">
                {predicao.fatoresRisco.map((fator, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                  >
                    {fator}
                  </span>
                ))}
              </div>
            </div>

            {/* Informações adicionais */}
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>Última avaliação: {new Date(predicao.ultimaAvaliacao).toLocaleDateString('pt-BR')}</span>
              <button className="text-blue-600 hover:text-blue-800 font-medium">
                Ver detalhes →
              </button>
            </div>
          </div>
        ))}
      </div>

      {predicoes.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Nenhuma predição de ausência encontrada para os filtros selecionados.
        </div>
      )}

      {/* Legenda */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-700 mb-2">Legenda de Classificação:</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span>Alto Risco (70%+): Intervenção imediata necessária</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded"></div>
            <span>Médio Risco (40-69%): Acompanhamento recomendado</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span>Baixo Risco (0-39%): Situação sob controle</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredicaoAusencias;