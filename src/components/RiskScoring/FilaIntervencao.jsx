import React from 'react';

const FilaIntervencao = ({ fila }) => {
  const getCriticidadeCor = (nivel) => {
    switch (nivel) {
      case 'critico': return 'bg-red-100 text-red-800 border-red-300';
      case 'alto': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'medio': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default: return 'bg-blue-100 text-blue-800 border-blue-300';
    }
  };

  const getCriticidadeIcon = (nivel) => {
    switch (nivel) {
      case 'critico': return '🚨';
      case 'alto': return '⚠️';
      case 'medio': return '📋';
      default: return 'ℹ️';
    }
  };

  const getPrioridadeOrdem = (nivel) => {
    switch (nivel) {
      case 'critico': return 1;
      case 'alto': return 2;
      case 'medio': return 3;
      default: return 4;
    }
  };

  // Ordenar por prioridade
  const filaOrdenada = [...fila].sort((a, b) => 
    getPrioridadeOrdem(a.nivelCriticidade) - getPrioridadeOrdem(b.nivelCriticidade)
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6">Fila de Intervenção Priorizada</h2>
      
      <div className="space-y-4">
        {filaOrdenada.map((item) => (
          <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <span className="text-xl">{getCriticidadeIcon(item.nivelCriticidade)}</span>
                <div>
                  <h3 className="font-semibold text-gray-900">{item.nome}</h3>
                  <p className="text-sm text-gray-600">{item.cargo} • {item.departamento}</p>
                </div>
              </div>
              
              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCriticidadeCor(item.nivelCriticidade)}`}>
                  {item.nivelCriticidade.toUpperCase()}
                </span>
                <p className="text-xs text-gray-500 mt-1">{item.probabilidade}% probabilidade</p>
              </div>
            </div>

            {/* Informações de tempo e última intervenção */}
            <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
              <div>
                <span className="text-gray-600">Tempo em risco:</span>
                <span className="font-medium ml-2">{item.tempoRisco}</span>
              </div>
              <div>
                <span className="text-gray-600">Última intervenção:</span>
                <span className="font-medium ml-2">
                  {new Date(item.ultimaIntervencao).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </div>

            {/* Ações Recomendadas */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Ações Recomendadas:</h4>
              <ul className="space-y-1">
                {item.acoesRecomendadas.map((acao, index) => (
                  <li key={index} className="flex items-start space-x-2 text-sm">
                    <span className="text-green-500 mt-0.5">•</span>
                    <span className="text-gray-700">{acao}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Botões de ação */}
            <div className="flex space-x-2 mt-4">
              <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors">
                Agendar Ação
              </button>
              <button className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors">
                Adiar 1 Semana
              </button>
              <button className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition-colors">
                Marcar como Resolvido
              </button>
            </div>
          </div>
        ))}
      </div>

      {filaOrdenada.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Nenhum colaborador na fila de intervenção para os filtros selecionados.
        </div>
      )}

      {/* Estatísticas da Fila */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-700 mb-3">Resumo da Fila:</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <div className="text-red-600 font-bold text-lg">
              {fila.filter(item => item.nivelCriticidade === 'critico').length}
            </div>
            <div className="text-gray-600">Críticos</div>
          </div>
          <div className="text-center">
            <div className="text-orange-600 font-bold text-lg">
              {fila.filter(item => item.nivelCriticidade === 'alto').length}
            </div>
            <div className="text-gray-600">Alto Risco</div>
          </div>
          <div className="text-center">
            <div className="text-yellow-600 font-bold text-lg">
              {fila.filter(item => item.nivelCriticidade === 'medio').length}
            </div>
            <div className="text-gray-600">Médio Risco</div>
          </div>
          <div className="text-center">
            <div className="text-gray-600 font-bold text-lg">{fila.length}</div>
            <div className="text-gray-600">Total</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilaIntervencao;