import React, { useEffect, useState } from "react";
import LevelIndicator from "../components/IncentivosUser/LevelIndicator";
import GoalsSection from "../components/IncentivosUser/GoalsSection";
import AttendanceStreak from "../components/IncentivosUser/AttendanceStreak";
import {
  seedUserIfEmpty,
  getUserState,
  gainXp,
  completeGoal,
  createGoal,
  removeGoal,
  registerAttendanceToday,
} from "../services/incentivesUserService";

const IncentivosColaborador = () => {
  // substitua por user?.id quando integrar
  const userId = "mock-user";

  const [state, setState] = useState(null);
  const [loading, setLoading] = useState(true);

  const reload = async () => {
    setLoading(true);
    await seedUserIfEmpty(userId);
    const s = await getUserState(userId);
    setState(s);
    setLoading(false);
  };

  useEffect(() => {
    reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading || !state) {
    return <div className="p-6 text-sm text-gray-500">Carregando…</div>;
  }

  const onCompleteGoal = async (goalId) => {
    const res = await completeGoal(userId, goalId);
    if (res?.xpGained) {
      await gainXp(userId, 0); // forçar recalcular/level up (ganho já aplicado em completeGoal)
    }
    await reload();
  };

  const onCreateGoal = async (payload) => {
    await createGoal(userId, payload);
    await reload();
  };

  const onRemoveGoal = async (goalId) => {
    await removeGoal(userId, goalId);
    await reload();
  };

  const onRegisterAttendance = async () => {
    const awarded = await registerAttendanceToday(userId);
    if (awarded?.xp) {
      await gainXp(userId, 0); // recalcular
    }
    await reload();
  };

  const nextBonusLevel = Math.ceil((state.level + 1) / 10) * 10;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#5b24ca]">
        <h1 className="text-3xl font-extrabold text-[#5b24ca] tracking-tight">Meus Incentivos</h1>
        <p className="text-gray-600 mt-1">
          Complete metas, acumule XP e evolua seu nível. A cada 10 níveis, há uma bonificação sugerida.
        </p>
      </div>

      {/* Nível + Streak */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-1">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Seu Nível</h2>
          <LevelIndicator
            level={state.level}
            xp={state.xp}
            xpTarget={state.xpTarget}
            percent={(state.xp / state.xpTarget) * 100}
          />
          <div className="mt-4 text-sm text-gray-700">
            <p>Próximo nível: {state.level + 1}</p>
            <p>
              Sugestão de bonificação recorrente: a cada <b>10 níveis</b> (ex.: próximo marco aos{" "}
              <b>níveis {nextBonusLevel - 10}→{nextBonusLevel}</b>).
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Dias Presentes (Streak)</h2>
          <AttendanceStreak
            streak={state.attendance.streak}
            lastDate={state.attendance.lastDate}
            nextRewardHint={state.attendance.nextRewardHint}
            onRegisterToday={onRegisterAttendance}
          />
        </div>
      </div>

      {/* Metas */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <GoalsSection
          dailyGoals={state.goals.daily}
          weeklyGoals={state.goals.weekly}
          onCreateGoal={onCreateGoal}
          onCompleteGoal={onCompleteGoal}
          onRemoveGoal={onRemoveGoal}
        />
      </div>
    </div>
  );
};

export default IncentivosColaborador;
