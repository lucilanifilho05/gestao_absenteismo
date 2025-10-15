import React from 'react';
import { getVariacaoCor, getVariacaoIcone, getCorClasses } from './utils';

const KpiCard = ({ kpi, onOpen }) => {
  return (
    <div
      className={`p-6 rounded-lg border-2 cursor-pointer hover:shadow-lg transition-all duration-200 ${getCorClasses(kpi.cor)}`}
      onClick={() => onOpen(kpi.path)}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-2xl">{kpi.icone}</span>
        <span className={`text-sm font-medium ${getVariacaoCor(kpi.variacao)}`}>
          {getVariacaoIcone(kpi.variacao)} {kpi.variacao > 0 ? '+' : ''}{kpi.variacao}%
        </span>
      </div>
      <h3 className="text-lg font-semibold mb-1">{kpi.titulo}</h3>
      <p className="text-2xl font-bold mb-2">{kpi.valor}</p>
      <p className="text-sm opacity-80 mb-4">{kpi.descricao}</p>
      <button
        onClick={(e) => { e.stopPropagation(); onOpen(kpi.path); }}
        className="w-full py-2 text-sm font-medium rounded-md bg-white hover:bg-opacity-90 transition-colors"
      >
        Ver detalhes →
      </button>
    </div>
  );
};

export default KpiCard;