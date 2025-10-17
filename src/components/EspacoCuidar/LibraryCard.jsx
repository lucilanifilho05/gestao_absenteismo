import React from "react";

const typeEmoji = {
  video: "🎬",
  audio: "🎧",
  guide: "📘",
};

const LibraryCard = ({ item }) => {
  const onOpen = () => {
    alert(`Abrir: ${item.title}\n(tipo: ${item.typeLabel}, duração: ${item.duration})`);
    console.log("OPEN_RESOURCE", item);
  };

  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">{typeEmoji[item.type]}</span>
          <h3 className="font-semibold text-gray-900">{item.title}</h3>
        </div>
        <span className="text-xs px-2 py-1 rounded bg-gray-50 text-gray-700 border border-gray-200">
          {item.typeLabel} • {item.duration}
        </span>
      </div>

      <p className="text-sm text-gray-700 mt-2">{item.description}</p>

      <div className="flex flex-wrap gap-2 mt-3">
        {item.tags.map((t) => (
          <span key={t} className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-700">
            #{t}
          </span>
        ))}
      </div>

      <div className="mt-4">
        <span className={`text-xs px-2 py-0.5 rounded 
          ${item.category === "physical" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>
          {item.category === "physical" ? "Saúde Física" : "Saúde Mental"}
        </span>
      </div>

      <div className="mt-4">
        <button
          onClick={onOpen}
          className="px-4 py-2 rounded-lg bg-gray-900 hover:bg-black text-white text-sm font-medium"
        >
          Abrir recurso
        </button>
      </div>
    </div>
  );
};

export default LibraryCard;
