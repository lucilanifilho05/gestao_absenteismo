// Mock completo em localStorage: campanhas, metas, registros de engajamento/adesão
// e cálculo de KPIs, ranking e insights.

const STORE = {
  campaigns: "inc_campaigns",
  goals: "inc_goals",
  telemetry: "inc_telemetry", // registros de engajamento/adesão por unidade/célula/colaborador
};

function load(key, fallback = []) {
  return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
}
function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// --- Seed inicial (executa uma vez) ---
export async function seedIfEmpty() {
  const has = load(STORE.campaigns, null);
  if (has) return;

  const today = new Date();
  const d = (off) => new Date(today.getFullYear(), today.getMonth() - off, rand(1, 28)).toISOString();

  const campaigns = [
    {
      id: crypto.randomUUID(),
      name: "Reconhecimento Contínuo Q3",
      objective: "Aumentar adesão, destacar boas práticas",
      description: "Campanha voltada a setores/células por 90 dias",
      scoring: "Pontos por adesão, check-ins e metas concluídas",
      startDate: d(2),
      endDate: d(0),
      status: "ativa",
    },
    {
      id: crypto.randomUUID(),
      name: "Saúde em Foco",
      objective: "Reduzir absenteísmo por ergonomia e rotina",
      description: "Trilhas de autocuidado e metas curtas",
      scoring: "Pontos por participação semanal",
      startDate: d(5),
      endDate: d(3),
      status: "encerrada",
    },
  ];

  const goals = [
    {
      id: crypto.randomUUID(),
      name: "Check-in diário (2 semanas)",
      objective: "Aumentar ritual de presença",
      description: "Registrar presença diária por 10 dias úteis",
      campaignId: campaigns[0].id,
      assignees: ["ana@empresa.com", "joao@empresa.com"],
      startDate: d(1),
      endDate: d(0),
      status: "ativa",
    },
    {
      id: crypto.randomUUID(),
      name: "Pontualidade + Foco",
      objective: "Zerar atrasos por 15 dias",
      description: "Treino de hábito + reforço positivo",
      campaignId: null,
      assignees: ["maria@empresa.com"],
      startDate: d(4),
      endDate: d(3),
      status: "encerrada",
    },
    {
      id: crypto.randomUUID(),
      name: "Meta Celular 4B",
      objective: "Melhor adesão do time e recorde de entregas",
      description: "Foco em checklists e rituais de passagem",
      campaignId: campaigns[1].id,
      assignees: [],
      startDate: d(5),
      endDate: d(4),
      status: "atingida",
    },
  ];

  // Telemetria de engajamento/adesão (mock)
  // unitType: "setor" | "celula" | "colaborador"
  // fields: name, score (0-100), adherence (0-100), beforeAbs (taxa), afterAbs (taxa), date
  const units = [
    { unitType: "setor", name: "Logística" },
    { unitType: "setor", name: "Produção" },
    { unitType: "setor", name: "Vendas" },
    { unitType: "celula", name: "4B" },
    { unitType: "celula", name: "2A" },
    { unitType: "celula", name: "1C" },
    { unitType: "colaborador", name: "Ana Souza" },
    { unitType: "colaborador", name: "João Lima" },
    { unitType: "colaborador", name: "Maria Dias" },
  ];

  const telemetry = [];
  for (let m = 0; m < 6; m++) {
    const monthDate = new Date(today.getFullYear(), today.getMonth() - m, rand(5, 25)).toISOString();
    for (const u of units) {
      telemetry.push({
        id: crypto.randomUUID(),
        unitType: u.unitType,
        name: u.name,
        score: rand(40, 98),
        adherence: rand(30, 100),
        beforeAbs: rand(6, 15),
        afterAbs: rand(2, 12),
        date: monthDate,
      });
    }
  }

  save(STORE.campaigns, campaigns);
  save(STORE.goals, goals);
  save(STORE.telemetry, telemetry);
}

// --- CRUD simples ---
export async function listCampaigns() {
  return load(STORE.campaigns, []);
}
export async function listGoals() {
  return load(STORE.goals, []);
}

export async function createCampaign({ name, objective, description, scoring, startDate, endDate }) {
  const list = load(STORE.campaigns, []);
  list.unshift({
    id: crypto.randomUUID(),
    name,
    objective,
    description,
    scoring,
    startDate,
    endDate,
    status: "ativa",
  });
  save(STORE.campaigns, list);
}

export async function createGoal({ name, objective, description, campaignId, assignees, startDate, endDate }) {
  const list = load(STORE.goals, []);
  list.unshift({
    id: crypto.randomUUID(),
    name,
    objective,
    description,
    campaignId: campaignId || null,
    assignees: assignees || [],
    startDate,
    endDate,
    status: "ativa",
  });
  save(STORE.goals, list);
}

// --- Cálculos de dashboard ---
function filterByMonths(arr, months) {
  const now = new Date();
  const cutoff = new Date(now);
  cutoff.setMonth(now.getMonth() - months);
  return arr.filter((r) => {
    const d = new Date(r.date);
    return d >= cutoff && d <= now;
  });
}

function avg(arr) {
  if (!arr.length) return 0;
  return Math.round((arr.reduce((s, n) => s + n, 0) / arr.length) * 10) / 10;
}

function topBy(arr, key) {
  const sorted = [...arr].sort((a, b) => b[key] - a[key]);
  return sorted[0];
}

function toRank(list, unitType) {
  const subset = list.filter((r) => r.unitType === unitType);
  // consolida média por nome
  const map = {};
  for (const r of subset) {
    map[r.name] = map[r.name] || { id: r.name, name: r.name, scores: [], adherences: [] };
    map[r.name].scores.push(r.score);
    map[r.name].adherences.push(r.adherence);
  }
  const rows = Object.values(map).map((m) => ({
    id: m.id,
    name: m.name,
    score: Math.round(avg(m.scores)),
    adherence: Math.round(avg(m.adherences)),
  }));
  return rows.sort((a, b) => b.score - a.score);
}

function kpisFrom(telemetrySlice, goals, prevSlice) {
  const engRate = Math.round(avg(telemetrySlice.map((t) => t.score)));
  const absBefore = avg(telemetrySlice.map((t) => t.beforeAbs));
  const absAfter = avg(telemetrySlice.map((t) => t.afterAbs));
  const reduction = Math.max(0, Math.round((absBefore - absAfter) * 10) / 10);

  const activeGoals = goals.filter((g) => g.status === "ativa").length;
  const closedGoals = goals.filter((g) => g.status !== "ativa").length;

  // tendências (vs período anterior)
  const prevEngRate = Math.round(avg(prevSlice.map((t) => t.score)));
  const prevReduction = (() => {
    const b = avg(prevSlice.map((t) => t.beforeAbs));
    const a = avg(prevSlice.map((t) => t.afterAbs));
    return Math.max(0, Math.round((b - a) * 10) / 10);
  })();

  const engagementTrend = Math.round((engRate - prevEngRate) * 10) / 10; // em pontos
  const absenceTrend = Math.round((reduction - prevReduction) * 10) / 10;
  const goalsDelta = 0; // mock simples

  // top unidade
  const unitTop = topBy(telemetrySlice, "adherence");
  const topUnitsLabel = unitTop ? `${unitTop.name}` : "—";

  return {
    engagementRate: engRate,
    engagementTrend,
    absenceReduction: reduction,
    absenceTrend,
    goalsActive: activeGoals,
    goalsClosed: closedGoals,
    goalsDelta,
    topUnitsLabel,
  };
}

function buildInsights(curr, prev) {
  const out = [];
  // exemplo: aumento de adesão na Logística
  const byName = (arr) =>
    arr.reduce((acc, r) => {
      acc[r.name] = acc[r.name] || { adhs: [] };
      acc[r.name].adhs.push(r.adherence);
      return acc;
    }, {});
  const cMap = byName(curr);
  const pMap = byName(prev);

  for (const name of Object.keys(cMap)) {
    const cAvg = Math.round(avg(cMap[name].adhs));
    const pAvg = Math.round(avg((pMap[name]?.adhs || [])));
    const delta = cAvg - pAvg;
    if (delta >= 8) {
      out.push(`O setor/célula ${name} apresentou aumento de ${delta}% na adesão à campanha.`);
    }
  }

  // “célula 4B atingiu recorde” caso score médio > 90
  const cell4B = curr.filter((r) => r.unitType === "celula" && r.name === "4B");
  if (cell4B.length && Math.round(avg(cell4B.map((r) => r.score))) >= 90) {
    out.push("A célula 4B atingiu um novo recorde de metas e engajamento.");
  }

  // fallback
  if (!out.length) {
    out.push("Engajamento estável no período. Avalie novas ações para impulsionar adesão.");
  }
  return out.slice(0, 6);
}

export async function getDashboard(months = 3) {
  const telemetryAll = load(STORE.telemetry, []);
  const goals = load(STORE.goals, []);

  const curr = filterByMonths(telemetryAll, months);
  const prev = filterByMonths(telemetryAll, months * 2).filter((r) => {
    const d = new Date(r.date);
    const now = new Date();
    const prevCutoff = new Date(now);
    prevCutoff.setMonth(now.getMonth() - months);
    // pega o bloco imediatamente anterior
    return d < prevCutoff;
  });

  const kpis = kpisFrom(curr, goals, prev);

  const ranking = {
    setores: toRank(curr, "setor"),
    celulas: toRank(curr, "celula"),
    colaboradores: toRank(curr, "colaborador"),
  };

  const insights = buildInsights(curr, prev);

  return { kpis, ranking, insights };
}
