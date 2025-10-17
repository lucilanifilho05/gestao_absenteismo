import React from "react";

function formatDateBR(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("pt-BR");
  } catch {
    return iso;
  }
}

const labelSentimento = {
  feliz: "Feliz",
  triste: "Triste",
  ansioso: "Ansioso",
  estressado: "Estressado",
  motivado: "Motivado",
  desmotivado: "Desmotivado",
};

const labelErgo = {
  punho: "Punho",
  lombar: "Lombar",
  joelho: "Joelho",
  calcanhar: "Calcanhar",
  pescoco: "Pescoço",
  nenhum: "Nenhum",
};

const HistoricoLista = ({ entries = [], loading = false }) => {
  return (
    <div className="max-h-80 overflow-y-auto space-y-3 pr-1">
      {loading && <p className="text-sm text-gray-500">Carregando…</p>}
      {!loading && entries.length === 0 && (
        <p className="text-sm text-gray-500">Sem registros no período.</p>
      )}

      {entries.map((p) => {
        const semana = formatDateBR(p.date);
        const sentimento = labelSentimento[p.feeling] || p.feeling || "—";
        const desconfortos =
          Array.isArray(p.ergonomics) && p.ergonomics.length
            ? p.ergonomics.map((e) => labelErgo[e] || e).join(", ")
            : "—";

        return (
          <div
            key={p.date + p.feeling + (p.ergonomics || []).join("-")}
            className="p-3 border border-gray-200 rounded-lg flex items-center justify-between"
          >
            <div>
              <p className="font-medium text-gray-900">
                Semana de {semana}: Sentimento <span className="font-semibold">{sentimento}</span>
              </p>
              <p className="text-sm text-gray-600">
                Desconfortos: {desconfortos || "—"}
              </p>
            </div>
            <span className="text-xs text-gray-500">registrado</span>
          </div>
        );
      })}
    </div>
  );
};

export default HistoricoLista;
