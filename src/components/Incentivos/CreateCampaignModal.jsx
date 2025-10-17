import React, { useState } from "react";
import { createCampaign } from "../../services/incentivesService";

const CreateCampaignModal = ({ open, onClose, onSaved }) => {
  const [name, setName] = useState("");
  const [objective, setObjective] = useState("");
  const [description, setDescription] = useState("");
  const [scoring, setScoring] = useState("Pontos por adesão e conclusão");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [saving, setSaving] = useState(false);

  if (!open) return null;

  const canSave = name && startDate && endDate && objective;

  const handleSave = async () => {
    if (!canSave || saving) return;
    setSaving(true);
    await createCampaign({
      name,
      objective,
      description,
      scoring,
      startDate,
      endDate,
    });
    setSaving(false);
    onSaved?.();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 relative">
          <button onClick={onClose} className="absolute right-3 top-3 p-2 rounded hover:bg-gray-100">✕</button>
          <h2 className="text-xl font-semibold text-gray-900">Nova Campanha</h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-700">Nome*</label>
              <input className="mt-1 w-full border rounded-lg px-3 py-2"
                value={name} onChange={(e)=>setName(e.target.value)} placeholder="Ex.: Reconhecer + Participação" />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-700">Objetivo*</label>
              <input className="mt-1 w-full border rounded-lg px-3 py-2"
                value={objective} onChange={(e)=>setObjective(e.target.value)} placeholder="Ex.: Elevar adesão e reduzir absenteísmo" />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-700">Descrição</label>
              <textarea rows={3} className="mt-1 w-full border rounded-lg px-3 py-2"
                value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Detalhes da campanha, público-alvo, regras..." />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Início*</label>
              <input type="date" className="mt-1 w-full border rounded-lg px-3 py-2"
                value={startDate} onChange={(e)=>setStartDate(e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Fim*</label>
              <input type="date" className="mt-1 w-full border rounded-lg px-3 py-2"
                value={endDate} onChange={(e)=>setEndDate(e.target.value)} />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-700">Critérios de Pontuação</label>
              <input className="mt-1 w-full border rounded-lg px-3 py-2"
                value={scoring} onChange={(e)=>setScoring(e.target.value)} />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button onClick={onClose} className="px-4 py-2 rounded-lg border">Cancelar</button>
            <button
              onClick={handleSave}
              disabled={!canSave || saving}
              className={`px-5 py-2 rounded-lg text-white ${canSave ? "bg-violet-600 hover:bg-violet-700" : "bg-violet-300"}`}
            >
              {saving ? "Salvando..." : "Salvar Campanha"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCampaignModal;
