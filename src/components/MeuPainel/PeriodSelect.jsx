// components/painel/PeriodSelect.jsx
import React from 'react';

const PeriodSelect = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-violet-500 focus:border-violet-500"
    >
      <option value="semana">Esta Semana</option>
      <option value="mes">Este Mês</option>
      <option value="ano">Este Ano</option>
    </select>
  );
};

export default PeriodSelect;
