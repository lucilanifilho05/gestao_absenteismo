import React, { useState } from 'react';
import PredicaoAusencias from '../components/RiskScoring/PredicaoAusencias';
import InsightsGestao from '../components/RiskScoring/InsightsGestao';
import FilaIntervencao from '../components/RiskScoring/FilaIntervencao';
import FiltrosRiskScoring from '../components/RiskScoring/FiltrosRiskScoring';

const RiskScoring = () => {
  const [filtros, setFiltros] = useState({
    departamento: '',
    nivelRisco: 'todos',
    periodo: '30dias'
  });

  // Dados mockados - substituir por API real
  const [dados, setDados] = useState({
    predicoes: [
      {
        id: 1,
        nome: 'João Silva',
        cargo: 'Analista de Produção',
        departamento: 'Produção',
        probabilidade: 85,
        classificacao: 'alto',
        fatoresRisco: ['Sobrecarga de trabalho', 'Histórico de licenças', 'Demandas excessivas'],
        periodoEstimado: '15-30 dias',
        ultimaAvaliacao: '2024-01-15'
      },
      {
        id: 2,
        nome: 'Maria Santos',
        cargo: 'Coordenadora de Qualidade',
        departamento: 'Qualidade',
        probabilidade: 45,
        classificacao: 'medio',
        fatoresRisco: ['Horas extras consistentes', 'Pressão por resultados'],
        periodoEstimado: '30-45 dias',
        ultimaAvaliacao: '2024-01-10'
      },
      {
        id: 3,
        nome: 'Pedro Costa',
        cargo: 'Supervisor de Logística',
        departamento: 'Logística',
        probabilidade: 25,
        classificacao: 'baixo',
        fatoresRisco: ['Desempenho estável'],
        periodoEstimado: '60+ dias',
        ultimaAvaliacao: '2024-01-18'
      },
      {
        id: 4,
        nome: 'Ana Oliveira',
        cargo: 'Analista Financeiro',
        departamento: 'Administrativo',
        probabilidade: 72,
        classificacao: 'alto',
        fatoresRisco: ['Baixa satisfação', 'Conflitos internos', 'Carga horária excessiva'],
        periodoEstimado: '15-20 dias',
        ultimaAvaliacao: '2024-01-12'
      }
    ],
    insights: {
      saude: {
        valor: 12,
        total: 156,
        percentual: 7.7,
        classificacao: 'alto',
        tendencia: 'alta'
      },
      demandas: {
        valor: 8,
        total: 24,
        percentual: 33.3,
        classificacao: 'alto',
        tendencia: 'estavel'
      },
      sobrecarga: {
        valor: 45,
        total: 156,
        percentual: 28.8,
        classificacao: 'medio',
        tendencia: 'alta'
      },
      ocupacao: {
        valor: 18,
        total: 156,
        percentual: 11.5,
        classificacao: 'baixo',
        tendencia: 'baixa'
      }
    },
    filaIntervencao: [
      {
        id: 1,
        nome: 'João Silva',
        cargo: 'Analista de Produção',
        departamento: 'Produção',
        nivelCriticidade: 'critico',
        tempoRisco: '3 semanas',
        probabilidade: 85,
        acoesRecomendadas: [
          'Reunião imediata com gestor',
          'Redistribuição de tarefas urgentes',
          'Avaliação médica obrigatória'
        ],
        ultimaIntervencao: '2024-01-05'
      },
      {
        id: 2,
        nome: 'Ana Oliveira',
        cargo: 'Analista Financeiro',
        departamento: 'Administrativo',
        nivelCriticidade: 'alto',
        tempoRisco: '2 semanas',
        probabilidade: 72,
        acoesRecomendadas: [
          'Acompanhamento semanal',
          'Suporte psicológico',
          'Revisão de carga horária'
        ],
        ultimaIntervencao: '2024-01-08'
      },
      {
        id: 3,
        nome: 'Carlos Lima',
        cargo: 'Operador de Máquinas',
        departamento: 'Produção',
        nivelCriticidade: 'alto',
        tempoRisco: '4 semanas',
        probabilidade: 68,
        acoesRecomendadas: [
          'Check-in diário com supervisor',
          'Avaliação de ergonomia',
          'Rodízio de funções'
        ],
        ultimaIntervencao: '2024-01-02'
      },
      {
        id: 4,
        nome: 'Mariana Costa',
        cargo: 'Assistente Administrativo',
        departamento: 'Administrativo',
        nivelCriticidade: 'medio',
        tempoRisco: '1 semana',
        probabilidade: 52,
        acoesRecomendadas: [
          'Check-ins quinzenais',
          'Feedback constante',
          'Plano de desenvolvimento'
        ],
        ultimaIntervencao: '2024-01-15'
      }
    ]
  });

  const handleFiltroChange = (novosFiltros) => {
    setFiltros(novosFiltros);
    console.log('Aplicando filtros:', novosFiltros);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-900">Risk Scoring</h1>
        <p className="text-gray-600 mt-2">
          Predição de ausências e gestão proativa de riscos organizacionais
        </p>
      </div>

      {/* Filtros */}
      <FiltrosRiskScoring filtros={filtros} onFiltroChange={handleFiltroChange} />

      {/* Insights de Gestão */}
      <InsightsGestao insights={dados.insights} />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Predição de Ausências */}
        <PredicaoAusencias predicoes={dados.predicoes} />

        {/* Fila de Intervenção */}
        <FilaIntervencao fila={dados.filaIntervencao} />
      </div>
    </div>
  );
};

export default RiskScoring;