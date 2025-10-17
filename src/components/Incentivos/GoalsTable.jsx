import React from "react";

const Status = ({ s }) => {
  const map = {
    ativa: "bg-green-100 text-green-700",
    encerrada: "bg-gray-100 text-gray-700",
    atingida: "bg-violet-100 text-violet-700",
  };
  return <span className={`text-xs px-2 py-0.5 rounded ${map[s] || "bg-gray-100 text-gray-700"}`}>{s}</span>;
};

const GoalsTable = ({ items = [] }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-600">
            <th className="py-2">Nome</th>
            <th className="py-2">Vinculação</th>
            <th className="py-2">Período</th>
            <th className="py-2">Atribuídos</th>
            <th className="py-2">Status</th>
          </tr>
        </thead>
        <tbody className="[&>tr:hover]:bg-gray-50">
          {items.map((g) => (
            <tr key={g.id} className="border-t">
              <td className="py-2 font-medium text-gray-900">{g.name}</td>
              <td className="py-2 text-gray-700">
                {g.campaignId ? `Campanha #${g.campaignId.slice(0, 6)}` : "—"}
              </td>
              <td className="py-2 text-gray-600">
                {new Date(g.startDate).toLocaleDateString("pt-BR")} — {new Date(g.endDate).toLocaleDateString("pt-BR")}
              </td>
              <td className="py-2 text-gray-600">{g.assignees?.length || 0}</td>
              <td className="py-2"><Status s={g.status} /></td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr>
              <td colSpan={5} className="py-3 text-gray-500">Nenhuma meta cadastrada.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GoalsTable;
