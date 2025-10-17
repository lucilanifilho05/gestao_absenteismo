// Estado do usuário em localStorage, com nível, XP, metas (diárias/semanais) e streak de presença.

const KEY = (userId) => `inc_user_state:${userId}`;

function load(userId) {
  return JSON.parse(localStorage.getItem(KEY(userId) ) || "null");
}
function save(userId, state) {
  localStorage.setItem(KEY(userId), JSON.stringify(state));
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

// meta de XP aumenta com o nível (base + incremento)
function xpTargetFor(level) {
  const base = 1000;         // para nível 1
  const inc = 250;           // incremento por nível
  return base + (level - 1) * inc;
}

function newGoal({ title, type = "daily", xp = 50 }) {
  return {
    id: crypto.randomUUID(),
    title: title.trim(),
    type,
    xp: Number(xp),
    createdAt: new Date().toISOString(),
    completed: false,
  };
}

function defaultState() {
  return {
    level: 1,
    xp: 0,
    xpTarget: xpTargetFor(1),
    attendance: {
      streak: 0,
      lastDate: null,
      // usado para dica da próxima recompensa
      nextRewardHint: { label: "10 XP", in: 1 },
    },
    goals: {
      daily: [],
      weekly: [],
      lastDailyReset: todayISO(),
      lastWeeklyResetISOWeek: isoWeekOf(new Date()),
    },
  };
}

// reset diário/semanal simples
function isoWeekOf(d) {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  return Math.ceil(((date - yearStart) / 86400000 + 1) / 7);
}

function maybeResetGoals(state) {
  const today = todayISO();

  // reset diário
  if (state.goals.lastDailyReset !== today) {
    state.goals.daily = state.goals.daily.map((g) => ({ ...g, completed: false }));
    state.goals.lastDailyReset = today;
  }

  // reset semanal
  const thisWeek = isoWeekOf(new Date());
  if (state.goals.lastWeeklyResetISOWeek !== thisWeek) {
    state.goals.weekly = state.goals.weekly.map((g) => ({ ...g, completed: false }));
    state.goals.lastWeeklyResetISOWeek = thisWeek;
  }
}

export async function seedUserIfEmpty(userId) {
  const has = load(userId);
  if (has) return;

  const s = defaultState();
  // metas automáticas de exemplo
  s.goals.daily.push(
    newGoal({ title: "Bater o ponto antes do limite", type: "daily", xp: 50 }),
    newGoal({ title: "Cumprimentar seus colegas de trabalho", type: "daily", xp: 50 }),
    newGoal({ title: "Entregar suas demandas diárias", type: "daily", xp: 100 })
  );
  s.goals.weekly.push(
    newGoal({ title: "Fechar as entregas da semana", type: "weekly", xp: 150 }),
    newGoal({ title: "Participar de 2 check-ins de equipe", type: "weekly", xp: 200 })
  );

  save(userId, s);
}

export async function getUserState(userId) {
  const s = load(userId) || defaultState();
  maybeResetGoals(s);
  save(userId, s);
  return s;
}

// aplica XP e realiza level up se necessário
export async function gainXp(userId, amount) {
  const s = await getUserState(userId);
  s.xp += amount;

  while (s.xp >= s.xpTarget) {
    s.xp -= s.xpTarget;
    s.level += 1;
    s.xpTarget = xpTargetFor(s.level);
  }
  save(userId, s);
  return s;
}

// completar meta -> concede XP da meta
export async function completeGoal(userId, goalId) {
  const s = await getUserState(userId);
  const all = [...s.goals.daily, ...s.goals.weekly];
  const g = all.find((x) => x.id === goalId);
  if (!g || g.completed) return { xpGained: 0 };

  g.completed = true;
  await gainXp(userId, g.xp);
  save(userId, s);
  return { xpGained: g.xp };
}

export async function createGoal(userId, { title, type, xp }) {
  const s = await getUserState(userId);
  const goal = newGoal({ title, type, xp });
  if (goal.type === "daily") s.goals.daily.unshift(goal);
  else s.goals.weekly.unshift(goal);
  save(userId, s);
  return goal;
}

export async function removeGoal(userId, goalId) {
  const s = await getUserState(userId);
  s.goals.daily = s.goals.daily.filter((g) => g.id !== goalId);
  s.goals.weekly = s.goals.weekly.filter((g) => g.id !== goalId);
  save(userId, s);
}

// Streak de presença com ciclo de XP 10/15/20/30
function nextXpCycle(stepIndex) {
  const cycle = [10, 15, 20, 30];
  return cycle[stepIndex % cycle.length];
}

export async function registerAttendanceToday(userId) {
  const s = await getUserState(userId);
  const today = todayISO();

  if (s.attendance.lastDate === today) {
    return { ok: false, reason: "already-registered" };
  }

  const last = s.attendance.lastDate ? new Date(s.attendance.lastDate) : null;
  const y = new Date();
  y.setDate(y.getDate() - 1);
  const yesterdayISO = y.toISOString().slice(0, 10);

  if (!last || s.attendance.lastDate === yesterdayISO) {
    s.attendance.streak += 1;
  } else {
    // quebrou a sequência
    s.attendance.streak = 1;
  }

  s.attendance.lastDate = today;

  // recompensa (cíclica) diária: 10, 15, 20, 30...
  const xp = nextXpCycle(s.attendance.streak - 1);
  await gainXp(userId, xp);

  // dica da próxima recompensa
  const nextXp = nextXpCycle(s.attendance.streak);
  s.attendance.nextRewardHint = { label: `${nextXp} XP`, in: 1 };

  save(userId, s);
  return { ok: true, xp };
}
