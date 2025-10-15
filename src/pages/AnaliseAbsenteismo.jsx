// pages/AnaliseAbsenteismo.jsx
import React, { useMemo, useState } from 'react';
import Filtros from '../components/AnaliseAbsenteismo/Filtros';
import VisaoGeral from '../components/AnaliseAbsenteismo/VisaoGeral';
import DetalhamentoSetor from '../components/AnaliseAbsenteismo/DetalhamentoSetor';
import CurvasTemporais from '../components/AnaliseAbsenteismo/CurvasTemporais';
import AnaliseTendencia from '../components/AnaliseAbsenteismo/AnaliseTendencia';
import Ranking from '../components/AnaliseAbsenteismo/Ranking';

const AnaliseAbsenteismo = () => {
  const [filtros, setFiltros] = useState({
    setor: '',
    celula: '',
    periodo: 'mes',
    dataInicio: '',
    dataFim: ''
  });

  const [dados] = useState({
    taxaGeral: 8.2,
    fte: 156,
    setoresRisco: 3,
    colaboradoresAtivos: 142,
    setores: [
      { id: 1, nome: 'Produção', taxa: 12.5, fte: 45, celulas: 5 },
      { id: 2, nome: 'Qualidade', taxa: 6.2, fte: 18, celulas: 3 },
      { id: 3, nome: 'Logística', taxa: 9.8, fte: 22, celulas: 4 },
      { id: 4, nome: 'Administrativo', taxa: 4.1, fte: 35, celulas: 2 },
      { id: 5, nome: 'TI', taxa: 3.2, fte: 16, celulas: 2 }
    ],
    insights: [
      "Saúde e bem-estar do colaborador aumentou em 15% a Taxa Geral de Absenteísmo",
      "Setor Produção apresenta 45% acima da meta estabelecida",
      "Célula Embalagem no turno da noite tem 28% de absenteísmo"
    ],
    // Série simples (Taxa x Meta) – permanece para compatibilidade
    evolucaoTemporal: [
      { mes: 'Jan', taxa: 7.8, meta: 6.0 },
      { mes: 'Fev', taxa: 8.1, meta: 6.0 },
      { mes: 'Mar', taxa: 8.5, meta: 6.0 },
      { mes: 'Abr', taxa: 8.2, meta: 6.0 },
      { mes: 'Mai', taxa: 7.9, meta: 6.0 },
      { mes: 'Jun', taxa: 8.2, meta: 6.0 }
    ],
    // ⬇️ NOVO: série multissetorial (chaves = nome dos setores)
    evolucaoTemporalSetores: [
      { mes: 'Jan', Produção: 10.8, Qualidade: 5.3, Logística: 8.4, Administrativo: 3.9, TI: 2.7, meta: 6.0 },
      { mes: 'Fev', Produção: 11.2, Qualidade: 5.9, Logística: 9.1, Administrativo: 4.2, TI: 3.0, meta: 6.0 },
      { mes: 'Mar', Produção: 12.5, Qualidade: 6.6, Logística: 10.2, Administrativo: 4.5, TI: 3.4, meta: 6.0 },
      { mes: 'Abr', Produção: 11.9, Qualidade: 6.1, Logística: 9.6, Administrativo: 4.0, TI: 3.1, meta: 6.0 },
      { mes: 'Mai', Produção: 10.7, Qualidade: 5.7, Logística: 9.0, Administrativo: 4.2, TI: 3.0, meta: 6.0 },
      { mes: 'Jun', Produção: 11.3, Qualidade: 6.0, Logística: 9.5, Administrativo: 4.1, TI: 3.2, meta: 6.0 }
    ],
    ranking: {
      piores: [
        { setor: 'Produção', taxa: 12.5, fte: 45, tendencia: 'alta' },
        { setor: 'Logística', taxa: 9.8, fte: 22, tendencia: 'estavel' },
        { setor: 'Qualidade', taxa: 6.2, fte: 18, tendencia: 'baixa' }
      ],
      melhores: [
        { setor: 'TI', taxa: 3.2, fte: 16, tendencia: 'baixa' },
        { setor: 'Administrativo', taxa: 4.1, fte: 35, tendencia: 'estavel' }
      ]
    }
  });

  const dadosFiltrados = useMemo(() => {
  const setoresBase = dados.setores || [];
  const setoresFiltrados = filtros.setor
    ? setoresBase.filter(s => s.nome === filtros.setor)
    : setoresBase;

  const taxaGeral =
    setoresFiltrados.length > 0
      ? Number(
          (
            setoresFiltrados.reduce((acc, s) => acc + (s.taxa || 0), 0) /
            setoresFiltrados.length
          ).toFixed(1)
        )
      : 0;

  const fte = setoresFiltrados.reduce((acc, s) => acc + (s.fte || 0), 0);

  const setoresRisco = setoresFiltrados.reduce((acc, s) => acc + ((s.taxa || 0) > 8 ? 1 : 0), 0);

  const temColabPorSetor = setoresFiltrados.every(
    s => typeof s.colaboradoresAtivos === 'number'
  );
  const colaboradoresAtivos = temColabPorSetor
    ? setoresFiltrados.reduce((acc, s) => acc + (s.colaboradoresAtivos || 0), 0)
    : fte;

  const ordenado = [...setoresFiltrados].sort((a, b) => b.taxa - a.taxa);
  const toRankingItem = (s) => ({
    setor: s.nome,
    taxa: s.taxa,
    fte: s.fte,
    tendencia: s.taxa >= 9 ? 'alta' : s.taxa <= 4.5 ? 'baixa' : 'estavel'
  });

  const ranking = {
    piores: ordenado.slice(0, 3).map(toRankingItem),
    melhores: ordenado.slice(-2).map(toRankingItem).reverse()
  };

  return {
    ...dados,
    taxaGeral,
    fte,
    setoresRisco,
    colaboradoresAtivos,
    setores: setoresFiltrados,
    ranking
  };
}, [dados, filtros]);

  const handleFiltroChange = (novosFiltros) => {
    setFiltros(novosFiltros);
    console.log('Aplicando filtros:', novosFiltros);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#5b24ca]">
        <h1 className="text-3xl font-extrabold text-[#5b24ca] tracking-tight">
          Análise de Absenteísmo
        </h1>
        <p className="text-gray-600 mt-2">
          Monitoramento completo e análise detalhada do absenteísmo organizacional
        </p>
      </div>

      {/* Filtros */}
      <Filtros filtros={filtros} onFiltroChange={handleFiltroChange} />

      {/* Dados filtrados */}
      <VisaoGeral dados={dadosFiltrados} />
      <DetalhamentoSetor setores={dadosFiltrados.setores} />

      {/* ⬇️ Passo a série multissetorial + setor selecionado */}
      <CurvasTemporais
        dadosEvolucao={dados.evolucaoTemporal}
        dadosEvolucaoSetores={dados.evolucaoTemporalSetores}
        setorSelecionado={filtros.setor}
      />

      <AnaliseTendencia insights={dados.insights} />
      <Ranking ranking={dadosFiltrados.ranking} />
    </div>
  );
};

export default AnaliseAbsenteismo;
