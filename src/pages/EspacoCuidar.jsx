import React, { useEffect, useMemo, useState } from "react";
import { getLastPulse } from "../services/weeklyPulseService";
import { getLibrary, getPopularFallback } from "../services/careLibraryService";
import RecommendationCard from "../components/EspacoCuidar/RecommendationCard";
import LibraryCard from "../components/EspacoCuidar/LibraryCard";
import CategoryTabs from "../components/EspacoCuidar/CategoryTabs";

const EspacoCuidar = () => {
  // Em produção troque por user?.id
  const userId = "mock-user";

  const [lastPulse, setLastPulse] = useState(null);
  const [library, setLibrary] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all"); // all | physical | mental
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const lp = await getLastPulse(userId);
      setLastPulse(lp);
      const lib = await getLibrary();
      setLibrary(lib);
      setLoading(false);
    };
    load();
  }, []);

  // --- Recomendações baseada no último Pulso ---
  const recommendations = useMemo(() => {
    if (!library.length) return [];
    const recs = [];
    const feeling = lastPulse?.feeling || "";
    const ergs = Array.isArray(lastPulse?.ergonomics) ? lastPulse.ergonomics : [];

    // 1) Estresse -> Técnica de Respiração (audio-breathing)
    if (feeling === "estressado") {
      const breathing = library.find((i) => i.slug === "audio-breathing-3min");
      if (breathing) recs.push(breathing);
    }

    // 2) Pescoço -> Alongamento de Pescoço (video-neck)
    if (ergs.includes("pescoco")) {
      const neck = library.find((i) => i.slug === "video-neck-stretch-2min");
      if (neck && !recs.some((r) => r.id === neck.id)) recs.push(neck);
    }

    // 3) Ansioso -> Grounding 5-4-3-2-1 (guia-grounding)
    if (feeling === "ansioso") {
      const grounding = library.find((i) => i.slug === "guide-grounding-541");
      if (grounding && !recs.some((r) => r.id === grounding.id)) recs.push(grounding);
    }

    // Completa até 3 com populares
    if (recs.length < 3) {
      for (const item of getPopularFallback(library)) {
        if (recs.length >= 3) break;
        if (!recs.some((r) => r.id === item.id)) recs.push(item);
      }
    }
    return recs.slice(0, 3);
  }, [lastPulse, library]);

  // --- Filtro de biblioteca ---
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return library
      .filter((i) => (category === "all" ? true : i.category === category))
      .filter((i) => {
        if (!q) return true;
        const hay =
          `${i.title} ${i.typeLabel} ${i.description} ${i.tags.join(" ")}`.toLowerCase();
        return hay.includes(q);
      });
  }, [library, query, category]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#5b24ca]">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-[#5b24ca] tracking-tight">Espaço Cuidar</h1>
            <p className="text-gray-600 mt-1">
              Recursos práticos e imediatos de autocuidado — sugestões personalizadas a partir do seu Pulso Semanal.
            </p>
          </div>
        </div>
      </div>

      {/* Para Você (recomendações) */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Para Você</h2>
          <span className="text-sm text-gray-500">
            {lastPulse
              ? `Baseado no seu último registro (${new Date(lastPulse.date).toLocaleDateString("pt-BR")})`
              : "Baseado nos seus registros recentes"}
          </span>
        </div>

        {loading && <p className="text-sm text-gray-500">Carregando…</p>}

        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendations.map((item) => (
              <RecommendationCard key={item.id} item={item} />
            ))}
          </div>
        )}

        {!loading && recommendations.length === 0 && (
          <p className="text-sm text-gray-500">Sem recomendações no momento.</p>
        )}
      </div>

      {/* Biblioteca */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Biblioteca de Acesso Livre</h2>

          <div className="flex items-center gap-3">
            <CategoryTabs value={category} onChange={setCategory} />
            <div className="relative">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar por nome, tag, tipo…"
                className="w-64 rounded-lg border border-gray-300 px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">🔎</span>
            </div>
          </div>
        </div>

        {loading && <p className="text-sm text-gray-500">Carregando…</p>}

        {!loading && (
          <>
            {filtered.length === 0 && (
              <p className="text-sm text-gray-500">Nenhum recurso encontrado.</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filtered.map((item) => (
                <LibraryCard key={item.id} item={item} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EspacoCuidar;
