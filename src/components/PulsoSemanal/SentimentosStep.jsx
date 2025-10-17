import React from "react";

const OPTIONS = [
  { key: "feliz", label: "Feliz", icon: "🙂" },
  { key: "triste", label: "Triste", icon: "😔" },
  { key: "ansioso", label: "Ansioso", icon: "😟" },
  { key: "estressado", label: "Estressado", icon: "😫" },
  { key: "motivado", label: "Motivado", icon: "🚀" },
  { key: "desmotivado", label: "Desmotivado", icon: "📉" },
];

const SentimentosStep = ({ value, onSelect }) => {
  return (
    <div>
      <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
        Qual sentimento melhor descreve sua semana de trabalho?
      </h2>
      <p className="text-gray-600 mt-1">
        Selecione uma opção. Avançaremos automaticamente para a próxima etapa.
      </p>

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {OPTIONS.map((opt) => {
          const selected = value === opt.key;
          return (
            <button
              key={opt.key}
              onClick={() => onSelect(opt.key)}
              className={`p-4 rounded-xl border transition text-center
                ${selected ? "border-violet-600 ring-2 ring-violet-200"
                           : "border-gray-200 hover:bg-gray-50"}
              `}
            >
              <div className="text-2xl">{opt.icon}</div>
              <div className="mt-2 font-medium text-gray-800">{opt.label}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SentimentosStep;
