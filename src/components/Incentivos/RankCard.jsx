import React, { useState } from "react";

const Tab = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1.5 text-sm rounded ${
      active ? "bg-violet-600 text-white" : "bg-gray-100 text-gray-700"
    }`}
  >
    {children}
  </button>
);

const Row = ({ idx, name, score, adherence }) => (
  <div className="flex items-center justify-between p-2 rounded border border-gray-200">
    <div className="flex items-center gap-2">
      <span className="w-6 text-center font-semibold text-gray-700">{idx}</span>
      <span className="font-medium text-gray-900">{name}</span>
    </div>
    <div className="flex items-center gap-4 text-sm">
      <span className="text-gray-600">Engaj.: <b>{score}</b></span>
      <span className="text-gray-600">Adesão: <b>{adherence}%</b></span>
    </div>
  </div>
);

const RankList = ({ items = [] }) => (
  <div className="space-y-2">
    {items.slice(0, 8).map((it, i) => (
      <Row key={it.id} idx={i + 1} name={it.name} score={it.score} adherence={it.adherence} />
    ))}
    {items.length === 0 && <p className="text-sm text-gray-500">Sem dados.</p>}
  </div>
);

const RankCard = ({ ranking }) => {
  const [tab, setTab] = useState("setores"); // setores | celulas | colaboradores
  if (!ranking) return null;

  return (
    <>
      <div className="flex items-center gap-2 mb-3">
        <Tab active={tab === "setores"} onClick={() => setTab("setores")}>Setores</Tab>
        <Tab active={tab === "celulas"} onClick={() => setTab("celulas")}>Células</Tab>
        <Tab active={tab === "colaboradores"} onClick={() => setTab("colaboradores")}>Colaboradores</Tab>
      </div>

      {tab === "setores" && <RankList items={ranking.setores} />}
      {tab === "celulas" && <RankList items={ranking.celulas} />}
      {tab === "colaboradores" && <RankList items={ranking.colaboradores} />}
    </>
  );
};

export default RankCard;
