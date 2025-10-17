import React from "react";

const Status = ({ s }) => {
  const map = {
    ativa: "bg-green-100 text-green-700",
    encerrada: "bg-gray-100 text-gray-700",
  };
  return <span className={`text-xs px-2 py-0.5 rounded ${map[s] || "bg-gray-100 text-gray-700"}`}>{s}</span>;
};

const CampaignsTable = ({ items = [] }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-600">
            <th className="py-2">Nome</th>
            <th className="py-2">Objetivo</th>
            <th className="py-2">Duração</th>
            <th className="py-2">Critérios</th>
            <th className="py-2">Status</th>
          </tr>
        </thead>
        <tbody className="[&>tr:hover]:bg-gray-50">
          {items.map((c) => (
            <tr key={c.id} className="border-t">
              <td className="py-2 font-medium text-gray-900">{c.name}</td>
              <td className="py-2 text-gray-700">{c.objective}</td>
              <td className="py-2 text-gray-600">
                {new Date(c.startDate).toLocaleDateString("pt-BR")} — {new Date(c.endDate).toLocaleDateString("pt-BR")}
              </td>
              <td className="py-2 text-gray-600">{c.scoring}</td>
              <td className="py-2"><Status s={c.status} /></td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr>
              <td colSpan={5} className="py-3 text-gray-500">Nenhuma campanha cadastrada.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CampaignsTable;
