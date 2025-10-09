import React, { useState } from 'react';
import IndiceBemEstar from '../components/AnalyticsSaude/IndiceBemEstar';
import GraficoSaudeMentalErgonomia from '../components/AnalyticsSaude/GraficoSaudeMentalErgonomia';
import TendenciaAcoes from '../components/AnalyticsSaude/TendenciaAcoes';
import FiltrosSaude from '../components/AnalyticsSaude/FiltrosSaude';

const AnalyticsSaude = () => {
  const [filtros, setFiltros] = useState({
    setor: '',
    celula: '',
    periodo: '30dias',
    tipoAnalise: 'saude-mental'
  });

  // Dados mockados - substituir por API real
  const [dados, setDados] = useState({
    indiceBemEstar: {
      geral: 7.2,
      setores: [
        { nome: 'Produção', indice: 6.8, sentimentosPositivos: 65, reclamacoesErgonomia: 12 },
        { nome: 'Qualidade', indice: 7.5, sentimentosPositivos: 75, reclamacoesErgonomia: 8 },
        { nome: 'Logística', indice: 6.9, sentimentosPositivos: 68, reclamacoesErgonomia: 15 },
        { nome: 'Administrativo', indice: 8.1, sentimentosPositivos: 82, reclamacoesErgonomia: 5 },
        { nome: 'TI', indice: 7.8, sentimentosPositivos: 78, reclamacoesErgonomia: 6 }
      ],
      celulas: [
        { nome: 'Montagem A', setor: 'Produção', indice: 7.1 },
        { nome: 'Pintura B', setor: 'Produção', indice: 6.2 },
        { nome: 'Inspeção', setor: 'Qualidade', indice: 7.8 },
        { nome: 'Expedição', setor: 'Logística', indice: 6.5 }
      ]
    },
    saudeMental: {
      sentimentos: [
        { sentimento: 'Feliz', porcentagem: 35, variacao: 5 },
        { sentimento: 'Motivado', porcentagem: 25, variacao: 2 },
        { sentimento: 'Ansioso', porcentagem: 15, variacao: -3 },
        { sentimento: 'Estressado', porcentagem: 12, variacao: 8 },
        { sentimento: 'Desmotivado', porcentagem: 8, variacao: 4 },
        { sentimento: 'Triste', porcentagem: 5, variacao: -1 }
      ],
      insights: [
        "Setor Produção apresenta aumento de 10% em desmotivação por questões de liderança",
        "Célula Montagem A com 15% mais casos de estresse por pressão por produtividade",
        "Administrativo mostra melhora de 8% em sentimentos positivos após programa de bem-estar"
      ]
    },
    ergonomia: {
      desconfortos: [
        { area: 'Lombar', porcentagem: 35, setores: ['Produção', 'Logística'] },
        { area: 'Punho', porcentagem: 25, setores: ['Produção', 'Administrativo'] },
        { area: 'Pescoço', porcentagem: 18, setores: ['Administrativo', 'TI'] },
        { area: 'Joelho', porcentagem: 12, setores: ['Produção'] },
        { area: 'Calcanhar', porcentagem: 10, setores: ['Produção', 'Logística'] }
      ],
      insights: [
        "Células X e Z estão com aumento de 20% em dores no punho, proveniente da má posição ofertada pelas máquinas de costura",
        "Setor Logística com 30% mais queixas de dores lombares por levantamento inadequado",
        "Postos administrativos necessitam de ajustes ergonômicos em 40% das estações"
      ]
    },
    tendenciasAcoes: {
      tendencias: [
        {
          id: 1,
          setor: 'Produção',
          metrica: 'Desmotivação',
          valor: '15%',
          variacao: '10%',
          pontosRecorrentes: ['Pressão por produtividade', 'Falta de feedback', 'Comunicação inadequada'],
          insight: 'Aumento consistente na desmotivação relacionado a estilo de liderança'
        },
        {
          id: 2,
          setor: 'Logística',
          metrica: 'Dores Lombares',
          valor: '30%',
          variacao: '12%',
          pontosRecorrentes: ['Levantamento manual', 'Postura inadequada', 'Falta de pausas'],
          insight: 'Necessidade urgente de treinamento em técnicas de levantamento'
        },
        {
          id: 3,
          setor: 'Administrativo',
          metrica: 'Estresse',
          valor: '18%',
          variacao: '-5%',
          pontosRecorrentes: ['Carga horária', 'Cumprimento de prazos', 'Multitarefa'],
          insight: 'Melhora após implementação de programa de gestão do tempo'
        }
      ],
      acoesRapidas: [
        {
          id: 1,
          tipo: 'leve',
          descricao: 'Realizar um 1:1 com supervisor da célula X',
          destinatario: 'Célula Montagem A',
          setor: 'Produção',
          prazo: '7 dias'
        },
        {
          id: 2,
          tipo: 'intermediaria',
          descricao: 'Implementar programa de ginástica laboral',
          destinatario: 'Setor Logística',
          setor: 'Logística',
          prazo: '15 dias'
        },
        {
          id: 3,
          tipo: 'direta',
          descricao: 'Revisão imediata das estações de trabalho',
          destinatario: 'Célula Pintura B',
          setor: 'Produção',
          prazo: '48 horas'
        },
        {
          id: 4,
          tipo: 'leve',
          descricao: 'Workshop de técnicas de relaxamento',
          destinatario: 'Setor Administrativo',
          setor: 'Administrativo',
          prazo: '10 dias'
        }
      ],
      insightsAcoes: [
        "IBO do setor de vendas aumentou em 20%. A ação foi efetiva",
        "Redução de 15% em afastamentos após implementação de ginástica laboral",
        "Satisfação aumentou 25% pós-programa de feedback"
      ]
    }
  });

  const handleFiltroChange = (novosFiltros) => {
    setFiltros(novosFiltros);
    console.log('Aplicando filtros:', novosFiltros);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-900">Analytics Saúde Organizacional</h1>
        <p className="text-gray-600 mt-2">
          Monitoramento proativo do bem-estar e saúde mental dos colaboradores
        </p>
      </div>

      {/* Filtros */}
      <FiltrosSaude filtros={filtros} onFiltroChange={handleFiltroChange} />

      {/* Índice de Bem-Estar Geral */}
      <IndiceBemEstar dados={dados.indiceBemEstar} />

      {/* Gráfico de Saúde Mental e Ergonomia */}
      <GraficoSaudeMentalErgonomia 
        saudeMental={dados.saudeMental} 
        ergonomia={dados.ergonomia}
        tipoAnalise={filtros.tipoAnalise}
      />

      {/* Tendências & Ações Rápidas */}
      <TendenciaAcoes dados={dados.tendenciasAcoes} />
    </div>
  );
};

export default AnalyticsSaude;