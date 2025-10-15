// components/painel/DaysAbsentCard.jsx
import React from 'react';
import { getTendenciaCor, getTendenciaIcone } from '../../utils/painelFormatters';

const DaysAbsentCard = ({ total, justificados, injustificados, tendencia, currentPeriodValue }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Dias Ausentes</h3>
        <span className={`text-sm font-medium ${getTendenciaCor(tendencia)}`}>
          {getTendenciaIcone(tendencia)} {tendencia}
        </span>
      </div>

      <div className="text-center mb-4">
        <div className="text-4xl font-bold text-gray-900 mb-2">{currentPeriodValue}</div>
        <p className="text-sm text-gray-600">No período selecionado</p>
      </div>

      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex justify-between">
          <span>Justificados:</span>
          <span className="font-medium text-green-600">{justificados}</span>
        </div>
        <div className="flex justify-between">
          <span>Injustificados:</span>
          <span className="font-medium text-red-600">{injustificados}</span>
        </div>
        <div className="flex justify-between border-t pt-2">
          <span className="font-medium">Total:</span>
          <span className="font-bold">{total}</span>
        </div>
      </div>

      {/* “pizza” simplificada */}
      <div className="mt-4 flex justify-center">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-green-500" />
          <div
            className="absolute inset-0 rounded-full border-4 border-red-500"
            style={{ clipPath: 'inset(0 0 0 50%)' }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-xs font-medium">
            {Math.round((justificados / (total || 1)) * 100)}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default DaysAbsentCard;
