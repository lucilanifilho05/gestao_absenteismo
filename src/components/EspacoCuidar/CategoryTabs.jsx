import React from "react";

const CategoryTabs = ({ value, onChange }) => {
  const items = [
    { key: "all", label: "Tudo" },
    { key: "physical", label: "Saúde Física" },
    { key: "mental", label: "Saúde Mental" },
  ];

  return (
    <div className="inline-flex rounded-lg border border-gray-300 overflow-hidden">
      {items.map((it, idx) => {
        const active = value === it.key;
        return (
          <button
            key={it.key}
            onClick={() => onChange(it.key)}
            className={`px-4 py-2 text-sm font-medium transition
              ${active ? "bg-violet-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"}
              ${idx !== 0 ? "border-l border-gray-300" : ""}
            `}
          >
            {it.label}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryTabs;
