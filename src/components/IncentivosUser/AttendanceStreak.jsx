import React from "react";

const AttendanceStreak = ({ streak = 0, lastDate, nextRewardHint, onRegisterToday }) => {
  const today = new Date().toISOString().slice(0, 10);
  const alreadyToday = lastDate === today;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-4xl font-bold text-gray-900">{streak} dias</p>
          <p className="text-gray-600">consecutivos presentes</p>
          <p className="text-xs text-gray-500 mt-1">
            Próxima recompensa: <b>{nextRewardHint?.label || "—"}</b>
            {nextRewardHint?.in ? ` em ${nextRewardHint.in} dia(s)` : ""}
          </p>
        </div>
        <button
          onClick={onRegisterToday}
          disabled={alreadyToday}
          className={`px-4 py-2 rounded-lg text-white ${
            alreadyToday ? "bg-gray-300 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {alreadyToday ? "Presença de hoje registrada" : "Registrar Presença de Hoje"}
        </button>
      </div>

      <div className="mt-4">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-2 bg-green-600"
            style={{ width: `${Math.min(100, (streak % 10) * 10)}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Dica: bônus de XP (10/15/20/30) em ciclo diário — mantenha a sequência!
        </p>
      </div>
    </div>
  );
};

export default AttendanceStreak;
