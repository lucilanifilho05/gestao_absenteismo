// Mock simples usando localStorage para salvar/leitura do Pulso Semanal

const STORAGE_KEY = "weeklyPulse";

export async function savePulse(entry) {
  const current = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  current.push(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  // Simula latência
  await new Promise((r) => setTimeout(r, 300));
  return entry;
}

export async function getLastPulse(userId) {
  const current = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  const filtered = current.filter((e) => e.userId === userId);
  return filtered.length ? filtered[filtered.length - 1] : null;
}

export async function getAllPulses() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}

export async function getPulsesByUser(userId) {
  const all = await getAllPulses();
  return all.filter((e) => e.userId === userId);
}

export async function getPulsesByPeriod(userId, lastNMonths = 1) {
  const all = await getPulsesByUser(userId);
  if (!Array.isArray(all) || all.length === 0) return [];

  const now = new Date();
  const cutoff = new Date(now);
  cutoff.setMonth(now.getMonth() - (lastNMonths || 1));

  return all
    .filter((e) => {
      const d = new Date(e.date);
      return d >= cutoff && d <= now;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // mais recentes primeiro
}
