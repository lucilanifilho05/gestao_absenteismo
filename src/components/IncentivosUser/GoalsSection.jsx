import React, { useMemo, useState } from "react";
import NewGoalModal from "./NewGoalModal";

const XP_OPTIONS = [50, 100, 150, 200];

const GoalRow = ({ goal, onComplete, onRemove }) => {
  return (
    <div className="flex items-center justify-between p-3 border rounded-lg">
      <div>
        <p className="font-medium text-gray-900">{goal.title}</p>
        <p className="text-xs text-gray-500">
          {goal.type === "daily" ? "Diária" : "Semanal"} • <b>{goal.xp} XP</b>
        </p>
      </div>
      <div className="flex items-center gap-2">
        {!goal.completed ? (
          <button
            onClick={() => onComplete(goal.id)}
            className="px-3 py-1.5 rounded bg-violet-600 hover:bg-violet-700 text-white text-sm"
          >
            Concluir
          </button>
        ) : (
          <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700">Concluída</span>
        )}
        <button
          onClick={() => onRemove(goal.id)}
          className="px-3 py-1.5 rounded border text-sm hover:bg-gray-50"
        >
          Remover
        </button>
      </div>
    </div>
  );
};

const GoalsList = ({ items = [], onComplete, onRemove }) => {
  if (!items.length) return <p className="text-sm text-gray-500">Sem metas.</p>;
  return (
    <div className="space-y-2">
      {items.map((g) => (
        <GoalRow key={g.id} goal={g} onComplete={onComplete} onRemove={onRemove} />
      ))}
    </div>
  );
};

const GoalsSection = ({ dailyGoals, weeklyGoals, onCreateGoal, onCompleteGoal, onRemoveGoal }) => {
  const [tab, setTab] = useState("daily");
  const [open, setOpen] = useState(false);

  const examples = useMemo(
    () => ({
      daily: ["Bater o ponto antes do limite", "Cumprimentar seus colegas", "Entregar demanda do dia"],
      weekly: ["Fechar as entregas da semana", "Participar do check-in de equipe", "Zerar pendências urgentes"],
    }),
    []
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="inline-flex rounded-lg border border-gray-300 overflow-hidden">
          {[
            { k: "daily", l: "Metas Diárias" },
            { k: "weekly", l: "Metas Semanais" },
          ].map((t, i) => (
            <button
              key={t.k}
              onClick={() => setTab(t.k)}
              className={`px-4 py-2 text-sm font-medium transition
                ${tab === t.k ? "bg-violet-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"}
                ${i !== 0 ? "border-l border-gray-300" : ""}
              `}
            >
              {t.l}
            </button>
          ))}
        </div>

        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 rounded-lg bg-gray-900 hover:bg-black text-white"
        >
          + Criar Meta
        </button>
      </div>

      {/* dica de exemplos */}
      <div className="mb-4 text-xs text-gray-500">
        Exemplos: {examples[tab].join(" • ")}. Valores sugeridos: {XP_OPTIONS.join("XP, ")}XP.
      </div>

      {tab === "daily" ? (
        <GoalsList items={dailyGoals} onComplete={onCompleteGoal} onRemove={onRemoveGoal} />
      ) : (
        <GoalsList items={weeklyGoals} onComplete={onCompleteGoal} onRemove={onRemoveGoal} />
      )}

      <NewGoalModal
        open={open}
        onClose={() => setOpen(false)}
        onCreate={(payload) => {
          onCreateGoal(payload);
          setOpen(false);
        }}
      />
    </div>
  );
};

export default GoalsSection;
