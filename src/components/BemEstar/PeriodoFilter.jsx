import React from "react";

const PeriodoFilter = ({ value, onChange, options = [] }) => {
  return (
    <div className="inline-flex rounded-lg border border-gray-300 overflow-hidden">
      {options.map((opt, idx) => {
        const active = value === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`px-4 py-2 text-sm font-medium transition
              ${active ? "bg-violet-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"}
              ${idx !== 0 ? "border-l border-gray-300" : ""}
            `}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
};

export default PeriodoFilter;
