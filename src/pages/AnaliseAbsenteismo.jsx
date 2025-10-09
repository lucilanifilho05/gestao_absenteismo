import React, { useState } from 'react';
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

  const [dados, setDados] = useState({
    // Dados mockados - substituir por API real
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
    evolucaoTemporal: [
      { mes: 'Jan', taxa: 7.8, meta: 6.0 },
      { mes: 'Fev', taxa: 8.1, meta: 6.0 },
      { mes: 'Mar', taxa: 8.5, meta: 6.0 },
      { mes: 'Abr', taxa: 8.2, meta: 6.0 },
      { mes: 'Mai', taxa: 7.9, meta: 6.0 },
      { mes: 'Jun', taxa: 8.2, meta: 6.0 }
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

  const handleFiltroChange = (novosFiltros) => {
    setFiltros(novosFiltros);
    // Aqui você faria a chamada para a API com os novos filtros
    console.log('Aplicando filtros:', novosFiltros);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-900">Análise de Absenteísmo</h1>
        <p className="text-gray-600 mt-2">
          Monitoramento completo e análise detalhada do absenteísmo organizacional
        </p>
      </div>

      {/* Filtros */}
      <Filtros filtros={filtros} onFiltroChange={handleFiltroChange} />

      {/* Visão Geral */}
      <VisaoGeral dados={dados} />

      {/* Detalhamento por Setor */}
      <DetalhamentoSetor setores={dados.setores} />

      {/* Curvas Temporais */}
      <CurvasTemporais dadosEvolucao={dados.evolucaoTemporal} />

      {/* Análise de Tendência */}
      <AnaliseTendencia insights={dados.insights} />

      {/* Ranking */}
      <Ranking ranking={dados.ranking} />
    </div>
  );
};

export default AnaliseAbsenteismo;