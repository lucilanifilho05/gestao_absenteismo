import React from "react";

const typeEmoji = {
  video: "🎬",
  audio: "🎧",
  guide: "📘",
};

const RecommendationCard = ({ item }) => {
  const onOpen = () => {
    alert(`Abrir: ${item.title}\n(tipo: ${item.typeLabel}, duração: ${item.duration})`);
    console.log("OPEN_RESOURCE", item);
  };

  return (
    <div className="p-4 border border-violet-200 rounded-lg bg-violet-50">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">{typeEmoji[item.type]}</span>
          <h3 className="font-semibold text-gray-900">{item.title}</h3>
        </div>
        <span className="text-xs px-2 py-1 rounded bg-white text-violet-700 border border-violet-200">
          {item.typeLabel} • {item.duration}
        </span>
      </div>

      <p className="text-sm text-gray-700 mt-2">{item.description}</p>

      <div className="flex flex-wrap gap-2 mt-3">
        {item.tags.map((t) => (
          <span
            key={t}
            className="text-xs px-2 py-0.5 rounded bg-white border border-violet-200 text-violet-700"
          >
            #{t}
          </span>
        ))}
      </div>

      <div className="mt-4">
        <button
          onClick={onOpen}
          className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium"
        >
          Abrir recurso
        </button>
      </div>
    </div>
  );
};

export default RecommendationCard;
