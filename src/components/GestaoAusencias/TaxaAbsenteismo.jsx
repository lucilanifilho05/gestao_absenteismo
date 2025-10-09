import React from 'react';

const TaxaAbsenteismo = ({ dados }) => {
  const getClassificacaoCor = (classificacao) => {
    switch (classificacao) {
      case 'baixo': return 'text-green-600 bg-green-100';
      case 'moderado': return 'text-yellow-600 bg-yellow-100';
      case 'alto': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getClassificacaoTexto = (classificacao) => {
    switch (classificacao) {
      case 'baixo': return 'Baixo';
      case 'moderado': return 'Moderado';
      case 'alto': return 'Alto';
      default: return 'Não classificado';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6">Taxa de Absenteísmo Individual</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Taxa Principal */}
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-600">Taxa de Absenteísmo</p>
          <p className="text-3xl font-bold text-blue-700 mt-2">{dados.percentual}%</p>
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${getClassificacaoCor(dados.classificacao)}`}>
            {getClassificacaoTexto(dados.classificacao)}
          </span>
        </div>

        {/* Dias Trabalhados */}
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <p className="text-sm text-gray-600">Dias Trabalhados</p>
          <p className="text-2xl font-bold text-green-700 mt-2">{dados.diasTrabalhados}</p>
          <p className="text-xs text-gray-500 mt-1">No período</p>
        </div>

        {/* Dias Faltados */}
        <div className="text-center p-4 bg-orange-50 rounded-lg">
          <p className="text-sm text-gray-600">Dias Faltados</p>
          <p className="text-2xl font-bold text-orange-700 mt-2">{dados.diasFaltados}</p>
          <p className="text-xs text-gray-500 mt-1">No período</p>
        </div>

        {/* Comparativo Setor */}
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <p className="text-sm text-gray-600">Média do Setor</p>
          <p className="text-2xl font-bold text-purple-700 mt-2">{dados.comparativoSetor}%</p>
          <p className={`text-xs font-medium mt-1 ${
            dados.percentual > dados.comparativoSetor ? 'text-red-600' : 'text-green-600'
          }`}>
            {dados.percentual > dados.comparativoSetor ? 'Acima da média' : 'Abaixo da média'}
          </p>
        </div>
      </div>

      {/* Legenda */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-700 mb-2">Classificação da Taxa:</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span>Baixo (0-5%): Dentro do esperado</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded"></div>
            <span>Moderado (5-10%): Requer atenção</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span>Alto (10%+): Necessita intervenção</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxaAbsenteismo;