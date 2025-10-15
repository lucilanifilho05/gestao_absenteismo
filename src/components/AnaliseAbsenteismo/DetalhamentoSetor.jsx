import React, { useState } from 'react';

const DetalhamentoSetor = ({ setores }) => {
  const [setorSelecionado, setSetorSelecionado] = useState(null);

  const causasPorSetor = {
    'Produção': [
      { causa: 'Problemas de Saúde', porcentagem: 45 },
      { causa: 'Questões Pessoais', porcentagem: 25 },
      { causa: 'Transporte', porcentagem: 15 },
      { causa: 'Clima Organizacional', porcentagem: 10 },
      { causa: 'Outros', porcentagem: 5 }
    ],
    'Qualidade': [
      { causa: 'Problemas de Saúde', porcentagem: 35 },
      { causa: 'Qualificação', porcentagem: 30 },
      { causa: 'Questões Pessoais', porcentagem: 20 },
      { causa: 'Outros', porcentagem: 15 }
    ]
    // Adicionar mais setores conforme necessário
  };

  const abrirDetalhes = (setor) => {
    setSetorSelecionado(setor);
  };

  const fecharDetalhes = () => {
    setSetorSelecionado(null);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6">Detalhamento por Setor</h2>
      
      {/* Tabela de Setores */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Setor</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Taxa de Absenteísmo</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">FTE</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Células</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {setores.map((setor) => (
              <tr key={setor.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{setor.nome}</td>
                <td className="px-4 py-3 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    setor.taxa > 8 ? 'bg-red-100 text-red-800' : 
                    setor.taxa > 5 ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-green-100 text-green-800'
                  }`}>
                    {setor.taxa}%
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{setor.fte}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{setor.celulas}</td>
                <td className="px-4 py-3 text-sm">
                  <button
                    onClick={() => abrirDetalhes(setor)}
                    className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-xs"
                  >
                    Ver Detalhes
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de Detalhes */}
      {setorSelecionado && (
        <div className="fixed inset-0 backdrop-blur-md bg-transparent flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Detalhes - {setorSelecionado.nome}</h3>
                <button
                  onClick={fecharDetalhes}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Mapa de Causas</h4>
                <div className="space-y-2">
                  {causasPorSetor[setorSelecionado.nome]?.map((causa, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">{causa.causa}</span>
                      <span className="text-sm font-medium">{causa.porcentagem}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Células do Setor</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 bg-blue-50 rounded text-sm">Célula A</div>
                  <div className="p-2 bg-blue-50 rounded text-sm">Célula B</div>
                  <div className="p-2 bg-blue-50 rounded text-sm">Célula C</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetalhamentoSetor;