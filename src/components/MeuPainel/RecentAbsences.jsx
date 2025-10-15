// components/painel/RecentAbsences.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const RecentAbsences = ({ ausencias }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Ausências Recentes</h3>
        <button
          onClick={() => navigate('/minhas-ausencias')}
          className="text-violet-600 hover:text-violet-800 text-sm font-medium"
        >
          Ver todas →
        </button>
      </div>

      <div className="space-y-3">
        {ausencias.map((a) => (
          <div key={a.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">
                {new Date(a.data).toLocaleDateString('pt-BR')}
              </p>
              <p className="text-sm text-gray-600">{a.tipo}</p>
            </div>
            <div className="text-right">
              <span
                className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                  a.status === 'justificada' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}
              >
                {a.status === 'justificada' ? 'Justificada' : 'Injustificada'}
              </span>
              <p className="text-sm text-gray-600 mt-1">{a.duracao}</p>
            </div>
          </div>
        ))}
      </div>

      {ausencias.length === 0 && (
        <div className="text-center py-4 text-gray-500">Nenhuma ausência recente registrada.</div>
      )}
    </div>
  );
};

export default RecentAbsences;
