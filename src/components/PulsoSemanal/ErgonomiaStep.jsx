import React from "react";

const AREAS = [
  { key: "punho", label: "Punho" },
  { key: "lombar", label: "Lombar" },
  { key: "joelho", label: "Joelho" },
  { key: "calcanhar", label: "Calcanhar" },
  { key: "pescoco", label: "Pescoço" },
];

const ErgonomiaStep = ({ values = [], onToggle }) => {
  const isNone = values.includes("nenhum");

  return (
    <div>
      <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
        Você sentiu algum desconforto físico constante relacionado ao trabalho esta semana?
      </h2>
      <p className="text-gray-600 mt-1">Selecione todas as áreas aplicáveis.</p>

      <div className="mt-5 space-y-3">
        {AREAS.map((a) => {
          const checked = values.includes(a.key);
          return (
            <label
              key={a.key}
              className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition
                ${checked ? "border-violet-600 bg-violet-50" : "border-gray-200 hover:bg-gray-50"}
                ${isNone ? "opacity-60 pointer-events-none" : ""}
              `}
            >
              <input
                type="checkbox"
                className="h-4 w-4"
                checked={checked}
                onChange={() => onToggle(a.key)}
                disabled={isNone}
              />
              <span className="text-gray-800">{a.label}</span>
            </label>
          );
        })}

        <label
          className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition
            ${isNone ? "border-green-600 bg-green-50" : "border-gray-200 hover:bg-gray-50"}
          `}
        >
          <input
            type="checkbox"
            className="h-4 w-4"
            checked={isNone}
            onChange={() => onToggle("nenhum")}
          />
          <span className="text-gray-800">Nenhum desconforto</span>
        </label>
      </div>
    </div>
  );
};

export default ErgonomiaStep;
