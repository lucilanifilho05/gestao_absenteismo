import React from 'react';

const InsightsGestao = ({ insights }) => {
  const getClassificacaoCor = (classificacao) => {
    switch (classificacao) {
      case 'alto': return 'bg-red-50 border-red-200 text-red-800';
      case 'medio': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'baixo': return 'bg-green-50 border-green-200 text-green-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getTendenciaIcon = (tendencia) => {
    switch (tendencia) {
      case 'alta': return '↗️';
      case 'baixa': return '↘️';
      case 'estavel': return '→';
      default: return '−';
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

  const indicadores = [
    {
      chave: 'saude',
      titulo: 'Saúde',
      descricao: 'Funcionários com estresse elevado',
      icone: '❤️',
      unidade: 'funcionários'
    },
    {
      chave: 'demandas',
      titulo: 'Demandas',
      descricao: 'Volume acima da capacidade',
      icone: '📊',
      unidade: 'setores'
    },
    {
      chave: 'sobrecarga',
      titulo: 'Sobrecarga',
      descricao: 'Excesso de horas trabalhadas',
      icone: '⏰',
      unidade: 'funcionários'
    },
    {
      chave: 'ocupacao',
      titulo: 'Ocupação',
      descricao: 'Subutilização de recursos',
      icone: '👥',
      unidade: 'funcionários'
    }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6">Insights de Gestão de Pessoas</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {indicadores.map((indicador) => {
          const dados = insights[indicador.chave];
          
          return (
            <div key={indicador.chave} className={`p-4 rounded-lg border-2 ${getClassificacaoCor(dados.classificacao)}`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{indicador.icone}</span>
                <span className={`text-sm font-medium ${getTendenciaCor(dados.tendencia)}`}>
                  {getTendenciaIcon(dados.tendencia)} {dados.tendencia}
                </span>
              </div>
              
              <h3 className="font-semibold text-lg mb-1">{indicador.titulo}</h3>
              <p className="text-sm opacity-80 mb-3">{indicador.descricao}</p>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Quantidade:</span>
                  <span className="font-bold">{dados.valor} {indicador.unidade}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Percentual:</span>
                  <span className="font-bold">{dados.percentual}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Classificação:</span>
                  <span className="font-bold capitalize">{dados.classificacao} risco</span>
                </div>
              </div>

              {/* Barra de progresso */}
              <div className="mt-3 bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    dados.classificacao === 'alto' ? 'bg-red-500' :
                    dados.classificacao === 'medio' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${dados.percentual}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Resumo Executivo */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="font-semibold text-blue-800 mb-2">📈 Resumo Executivo:</h4>
        <p className="text-sm text-blue-700">
          {insights.saude.valor} colaboradores em situação de alto risco de saúde, 
          com {insights.demandas.percentual}% dos setores operando acima da capacidade ideal. 
          Recomenda-se intervenção imediata nos casos críticos.
        </p>
      </div>
    </div>
  );
};

export default InsightsGestao;