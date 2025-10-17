import React, { useEffect, useState } from "react";
import { createGoal, listCampaigns } from "../../services/incentivesService";

const CreateGoalModal = ({ open, onClose, onSaved }) => {
  const [name, setName] = useState("");
  const [objective, setObjective] = useState("");
  const [description, setDescription] = useState("");
  const [campaignId, setCampaignId] = useState("");
  const [assignees, setAssignees] = useState(""); // emails/ids separados por vírgula
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [saving, setSaving] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const load = async () => {
      const cs = await listCampaigns();
      setCampaigns(cs);
    };
    if (open) load();
  }, [open]);

  if (!open) return null;

  const canSave = name && startDate && endDate && objective;

  const handleSave = async () => {
    if (!canSave || saving) return;
    setSaving(true);
    await createGoal({
      name,
      objective,
      description,
      campaignId: campaignId || null,
      assignees: assignees
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
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
          <h2 className="text-xl font-semibold text-gray-900">Nova Meta</h2>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-700">Nome*</label>
              <input className="mt-1 w-full border rounded-lg px-3 py-2"
                value={name} onChange={(e)=>setName(e.target.value)} placeholder="Ex.: Zero atrasos por 2 semanas" />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-700">Objetivo*</label>
              <input className="mt-1 w-full border rounded-lg px-3 py-2"
                value={objective} onChange={(e)=>setObjective(e.target.value)} placeholder="Ex.: Aumentar adesão a rituais de check-in" />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-700">Descrição</label>
              <textarea rows={3} className="mt-1 w-full border rounded-lg px-3 py-2"
                value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Detalhes, regras e condições de premiação" />
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
            <div>
              <label className="text-sm font-medium text-gray-700">Vincular a Campanha</label>
              <select className="mt-1 w-full border rounded-lg px-3 py-2"
                value={campaignId} onChange={(e)=>setCampaignId(e.target.value)}>
                <option value="">— Opcional —</option>
                {campaigns.map((c)=>(
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Atribuir a (IDs/Emails)</label>
              <input className="mt-1 w-full border rounded-lg px-3 py-2"
                value={assignees} onChange={(e)=>setAssignees(e.target.value)}
                placeholder="ex.: ana@empresa.com, joao@empresa.com" />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button onClick={onClose} className="px-4 py-2 rounded-lg border">Cancelar</button>
            <button
              onClick={handleSave}
              disabled={!canSave || saving}
              className={`px-5 py-2 rounded-lg text-white ${canSave ? "bg-violet-600 hover:bg-violet-700" : "bg-violet-300"}`}
            >
              {saving ? "Salvando..." : "Salvar Meta"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateGoalModal;
