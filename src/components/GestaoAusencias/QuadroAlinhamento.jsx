import React from 'react';

const QuadroAlinhamento = ({ dados }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6">Quadro de Alinhamento de Faltas</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Férias */}
        <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
          <h3 className="text-lg font-semibold text-blue-800 mb-4">Férias</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Saldo Disponível</span>
              <span className="text-lg font-bold text-green-600">{dados.ferias.saldo} dias</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Utilizados no Ano</span>
              <span className="text-lg font-bold text-blue-600">{dados.ferias.utilizados} dias</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Solicitações Pendentes</span>
              <span className="text-lg font-bold text-orange-600">{dados.ferias.pendentes}</span>
            </div>
          </div>
        </div>

        {/* Solicitações */}
        <div className="p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
          <h3 className="text-lg font-semibold text-purple-800 mb-4">Solicitações</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Pendentes de Aprovação</span>
              <span className="text-lg font-bold text-yellow-600">{dados.solicitacoes.pendentes}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Aprovadas no Período</span>
              <span className="text-lg font-bold text-green-600">{dados.solicitacoes.aprovadas}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Reprovadas no Período</span>
              <span className="text-lg font-bold text-red-600">{dados.solicitacoes.reprovadas}</span>
            </div>
          </div>
        </div>

        {/* Faltas */}
        <div className="p-4 bg-orange-50 rounded-lg border-2 border-orange-200">
          <h3 className="text-lg font-semibold text-orange-800 mb-4">Faltas</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Justificadas</span>
              <span className="text-lg font-bold text-green-600">{dados.faltas.justificadas}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Não Justificadas</span>
              <span className="text-lg font-bold text-red-600">{dados.faltas.naoJustificadas}</span>
            </div>
            <div className="flex justify-between items-center border-t pt-2">
              <span className="text-sm font-medium text-gray-700">Total de Ausências</span>
              <span className="text-lg font-bold text-gray-800">{dados.faltas.total} dias</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuadroAlinhamento;