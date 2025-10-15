// components/painel/MetricCard.jsx
import React from 'react';

const MetricCard = ({ title, value, badge, variationText, variationClass, children }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {variationText && <span className={`text-sm font-medium ${variationClass}`}>{variationText}</span>}
      </div>

      <div className="text-center mb-4">
        <div className="text-4xl font-bold text-gray-900 mb-2">{value}</div>
        {badge}
      </div>

      {children}
    </div>
  );
};

export default MetricCard;
