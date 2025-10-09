import React, { useState } from 'react';

const TendenciaAcoes = ({ dados }) => {
  const [acaoSelecionada, setAcaoSelecionada] = useState(null);

  const getTipoAcaoCor = (tipo) => {
    switch (tipo) {
      case 'leve': return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediaria': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'direta': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTipoAcaoTexto = (tipo) => {
    switch (tipo) {
      case 'leve': return 'Ação Leve';
      case 'intermediaria': return 'Ação Intermediária';
      case 'direta': return 'Ação Direta';
      default: return 'Ação';
    }
  };

  const aplicarAcao = (acao) => {
    setAcaoSelecionada(acao);
    // Simular aplicação da ação
    console.log('Aplicando ação:', acao);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6">Tendências & Ações Rápidas</h2>
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Tendências */}
        <div>
          <h3 className="text-lg font-medium mb-4">Visão das Tendências</h3>
          <div className="space-y-4">
            {dados.tendencias.map((tendencia) => (
              <div key={tendencia.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">{tendencia.setor}</h4>
                    <p className="text-sm text-gray-600">{tendencia.metrica}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-gray-900">{tendencia.valor}</span>
                    <span className={`text-sm ml-2 ${tendencia.variacao.includes('+') ? 'text-red-500' : 'text-green-500'}`}>
                      {tendencia.variacao}
                    </span>
                  </div>
                </div>
                
                <div className="mb-3">
                  <p className="text-sm font-medium text-gray-700 mb-2">Pontos Recorrentes:</p>
                  <div className="flex flex-wrap gap-1">
                    {tendencia.pontosRecorrentes.map((ponto, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                        {ponto}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="p-3 bg-blue-50 rounded">
                  <p className="text-sm text-blue-800">
                    <strong>Insight:</strong> {tendencia.insight}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ações Rápidas */}
        <div>
          <h3 className="text-lg font-medium mb-4">Ações Rápidas Sugeridas</h3>
          <div className="space-y-3">
            {dados.acoesRapidas.map((acao) => (
              <div key={acao.id} className={`p-4 rounded-lg border-2 ${getTipoAcaoCor(acao.tipo)}`}>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-medium px-2 py-1 rounded">
                    {getTipoAcaoTexto(acao.tipo)}
                  </span>
                  <span className="text-xs text-gray-500">Prazo: {acao.prazo}</span>
                </div>
                
                <p className="font-medium mb-2">{acao.descricao}</p>
                
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">
                    {acao.destinatario} • {acao.setor}
                  </span>
                  <button
                    onClick={() => aplicarAcao(acao)}
                    className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
                  >
                    Aplicar
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Insights das Ações */}
          <div className="mt-6">
            <h4 className="text-lg font-medium mb-3">Insights de Ações Anteriores</h4>
            <div className="space-y-2">
              {dados.insightsAcoes.map((insight, index) => (
                <div key={index} className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm text-green-800">✅ {insight}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Confirmação */}
      {acaoSelecionada && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Confirmar Ação
            </h3>
            <p className="text-gray-600 mb-4">
              Deseja aplicar a ação "<strong>{acaoSelecionada.descricao}</strong>" para {acaoSelecionada.destinatario}?
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setAcaoSelecionada(null)}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  // Aqui você implementaria a lógica de aplicação da ação
                  console.log('Ação aplicada:', acaoSelecionada);
                  setAcaoSelecionada(null);
                }}
                className="flex-1 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TendenciaAcoes;