import React from 'react';
import StatusBadge from './StatusBadge';

const AbsencesTable = ({ ausencias, onOpen, formatDateBR, getStatusInfo }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Histórico de Ausências</h3>
      </div>

      <div className="overflow-x-auto">
        <div className="max-h-[480px] overflow-y-auto">
          <table className="w-full">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Data</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tipo</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Duração</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Causa</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {ausencias.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50">
                  <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{formatDateBR(a.data)}</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700">{a.tipo}</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700">{a.duracao}</td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    <StatusBadge statusInfo={getStatusInfo(a.status)} />
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-700">{a.causa || '-'}</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm">
                    <button
                      onClick={() => onOpen(a)}
                      className="text-violet-600 hover:text-violet-800 font-medium"
                    >
                      Ver detalhes
                    </button>
                  </td>
                </tr>
              ))}
              {ausencias.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    Nenhuma ausência encontrada para os filtros atuais.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AbsencesTable;
