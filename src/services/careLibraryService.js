// Mock da biblioteca de recursos do Espaço Cuidar.
// Em produção, troque por fetch/axios para sua API.

let _cache = null;

export async function getLibrary() {
  if (_cache) return _cache;

  // id, slug, type: "video" | "audio" | "guide", typeLabel, duration, category: "physical"|"mental"
  const data = [
    // Regras específicas
    {
      id: "rec-1",
      slug: "audio-breathing-3min",
      type: "audio",
      typeLabel: "Áudio guiado",
      title: "Técnica de Respiração 4-7-8",
      duration: "3 min",
      category: "mental",
      description: "Exercício simples para reduzir estresse e melhorar o foco.",
      tags: ["respiração", "estresse", "calma"],
      popularity: 95,
    },
    {
      id: "rec-2",
      slug: "video-neck-stretch-2min",
      type: "video",
      typeLabel: "Vídeo",
      title: "Alongamento para o Pescoço",
      duration: "2 min",
      category: "physical",
      description: "Sequência curta para aliviar tensões na região cervical.",
      tags: ["pescoço", "alongamento", "ergonomia"],
      popularity: 92,
    },
    {
      id: "rec-3",
      slug: "guide-grounding-541",
      type: "guide",
      typeLabel: "Guia com GIFs",
      title: "Grounding 5-4-3-2-1",
      duration: "3 min",
      category: "mental",
      description: "Técnica de aterramento para ansiedade: perceba 5-4-3-2-1 estímulos ao seu redor.",
      tags: ["ansiedade", "atenção plena", "mindfulness"],
      popularity: 90,
    },

    // Biblioteca geral
    {
      id: "lib-1",
      slug: "video-shoulder-mobility-4min",
      type: "video",
      typeLabel: "Vídeo",
      title: "Mobilidade de Ombros",
      duration: "4 min",
      category: "physical",
      description: "Rotina rápida para melhorar mobilidade de ombros (ótimo para quem fica no computador).",
      tags: ["ombro", "alongamento", "ergonomia"],
      popularity: 88,
    },
    {
      id: "lib-2",
      slug: "audio-body-scan-5min",
      type: "audio",
      typeLabel: "Áudio guiado",
      title: "Body Scan Mindful",
      duration: "5 min",
      category: "mental",
      description: "Escaneie o corpo e note tensões, promovendo relaxamento progressivo.",
      tags: ["meditação", "relaxamento", "atenção plena"],
      popularity: 87,
    },
    {
      id: "lib-3",
      slug: "guide-wrist-stretches-3min",
      type: "guide",
      typeLabel: "Guia com GIFs",
      title: "Alongamento de Punhos",
      duration: "3 min",
      category: "physical",
      description: "Sequência prática para aliviar punhos (uso de mouse/teclado).",
      tags: ["punho", "alongamento", "digitacao"],
      popularity: 85,
    },
    {
      id: "lib-4",
      slug: "audio-box-breathing-4min",
      type: "audio",
      typeLabel: "Áudio guiado",
      title: "Respiração Box (4x4x4x4)",
      duration: "4 min",
      category: "mental",
      description: "Ritmo respiratório em quatro tempos para reduzir a ativação.",
      tags: ["respiração", "estresse", "foco"],
      popularity: 84,
    },
    {
      id: "lib-5",
      slug: "video-lower-back-3min",
      type: "video",
      typeLabel: "Vídeo",
      title: "Alívio Lombar Rápido",
      duration: "3 min",
      category: "physical",
      description: "Exercícios simples para aliviar rigidez na lombar.",
      tags: ["lombar", "alongamento", "postura"],
      popularity: 83,
    },
  ];

  _cache = data;
  return data;
}

export function getPopularFallback(list) {
  // retorna itens por popularidade (desc)
  return [...list].sort((a, b) => b.popularity - a.popularity);
}
