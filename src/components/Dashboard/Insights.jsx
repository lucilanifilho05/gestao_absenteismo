import React from 'react';
import { getInsightCor } from './utils';

const Insights = ({ items }) => {
  return (
    <div className="space-y-3">
      {items.map((insight) => (
        <div key={insight.id} className={`p-4 rounded-lg border ${getInsightCor(insight.tipo)}`}>
          <div className="flex items-start space-x-3">
            <span className="text-lg">{insight.icone}</span>
            <div>
              <h4 className="font-medium">{insight.titulo}</h4>
              <p className="text-sm mt-1">{insight.descricao}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Insights;