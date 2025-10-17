import React, { useState } from "react";

const XP_VALUES = [50, 100, 150, 200];

const NewGoalModal = ({ open, onClose, onCreate }) => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("daily");
  const [xp, setXp] = useState(50);
  const canSave = title && XP_VALUES.includes(Number(xp));

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 relative">
          <button onClick={onClose} className="absolute right-3 top-3 p-2 rounded hover:bg-gray-100">✕</button>
          <h3 className="text-lg font-semibold text-gray-900">Nova Meta</h3>

          <div className="mt-4 space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-700">Título*</label>
              <input
                className="mt-1 w-full border rounded-lg px-3 py-2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex.: Entregar minhas tarefas diárias"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-gray-700">Tipo*</label>
                <select
                  className="mt-1 w-full border rounded-lg px-3 py-2"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="daily">Diária</option>
                  <option value="weekly">Semanal</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">XP*</label>
                <select
                  className="mt-1 w-full border rounded-lg px-3 py-2"
                  value={xp}
                  onChange={(e) => setXp(Number(e.target.value))}
                >
                  {XP_VALUES.map((v) => (
                    <option key={v} value={v}>
                      {v} XP
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button onClick={onClose} className="px-4 py-2 rounded-lg border">Cancelar</button>
            <button
              onClick={() => canSave && onCreate({ title, type, xp })}
              disabled={!canSave}
              className={`px-5 py-2 rounded-lg text-white ${canSave ? "bg-violet-600 hover:bg-violet-700" : "bg-violet-300"}`}
            >
              Salvar Meta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewGoalModal;
