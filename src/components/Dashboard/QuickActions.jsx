import React from 'react';
import { getCorClasses } from './utils';

const QuickActions = ({ atalhos, onOpen }) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4">Ações Rápidas</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {atalhos.map((atalho) => (
          <button
            key={atalho.id}
            onClick={() => onOpen(atalho.path)}
            className={`p-4 rounded-lg border-2 text-left hover:shadow-md transition-all duration-200 ${getCorClasses(atalho.cor)} hover:scale-105`}
          >
            <span className="text-2xl block mb-2">{atalho.icone}</span>
            <h4 className="font-semibold text-sm">{atalho.titulo}</h4>
            <p className="text-xs opacity-80 mt-1">{atalho.descricao}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;