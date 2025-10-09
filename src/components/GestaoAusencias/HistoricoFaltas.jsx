import React from 'react';

const HistoricoFaltas = ({ historico }) => {
  const getStatusDetalhado = (status) => {
    switch (status) {
      case 'aprovado':
        return { texto: 'Aprovado', cor: 'bg-green-100 text-green-800', icone: '✅' };
      case 'reprovado':
        return { texto: 'Reprovado', cor: 'bg-red-100 text-red-800', icone: '❌' };
      case 'pendente':
        return { texto: 'Pendente', cor: 'bg-yellow-100 text-yellow-800', icone: '⏳' };
      default:
        return { texto: 'Indefinido', cor: 'bg-gray-100 text-gray-800', icone: '❓' };
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6">Histórico de Faltas</h2>
      
      <div className="space-y-4">
        {historico.map((item) => {
          const statusInfo = getStatusDetalhado(item.status);
          
          return (
            <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{statusInfo.icone}</span>
                  <div>
                    <h3 className="font-medium text-gray-900">{item.tipo}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(item.data).toLocaleDateString('pt-BR')} • {item.duracao}
                    </p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusInfo.cor}`}>
                  {statusInfo.texto}
                </span>
              </div>
              
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-700">
                  <strong>Justificativa:</strong> {item.justificativa}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {historico.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Nenhum histórico encontrado para os filtros selecionados.
        </div>
      )}
    </div>
  );
};

export default HistoricoFaltas;