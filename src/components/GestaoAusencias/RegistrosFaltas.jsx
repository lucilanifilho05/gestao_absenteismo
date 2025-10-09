import React from 'react';

const RegistrosFaltas = ({ registros }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'aprovado':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Aprovado</span>;
      case 'reprovado':
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">Reprovado</span>;
      case 'pendente':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Pendente</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">Indefinido</span>;
    }
  };

  const getTipoBadge = (tipo) => {
    return tipo === 'justificada' 
      ? <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Justificada</span>
      : <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">Não Justificada</span>;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6">Registros de Faltas</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Data</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Motivo</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Tipo</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Duração</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Recorrência</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {registros.map((registro) => (
              <tr key={registro.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                  {new Date(registro.data).toLocaleDateString('pt-BR')}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{registro.motivo}</td>
                <td className="px-4 py-3 text-sm">{getTipoBadge(registro.tipo)}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{registro.duracao}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{registro.recorrencia}</td>
                <td className="px-4 py-3 text-sm">{getStatusBadge(registro.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {registros.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Nenhum registro de falta encontrado para os filtros selecionados.
        </div>
      )}
    </div>
  );
};

export default RegistrosFaltas;