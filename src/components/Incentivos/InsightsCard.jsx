import React from "react";

const InsightsCard = ({ items = [] }) => {
  if (!items.length) return <p className="text-sm text-gray-500">Sem insights no período.</p>;
  return (
    <ul className="space-y-3">
      {items.map((t, i) => (
        <li key={i} className="p-3 border border-amber-200 bg-amber-50 rounded text-amber-800 text-sm">
          {t}
        </li>
      ))}
    </ul>
  );
};

export default InsightsCard;
