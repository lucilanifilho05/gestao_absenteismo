import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Header,
  KpiCard,
  Notifications,
  Insights,
  TrendBars,
  QuickActions,
  Recommendations,
} from '../components/Dashboard';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Dados mockados - substituir por API real
  const dados = {
    saudacao: `Bom dia, ${user?.name?.split(' ')[0] || 'Gestor'}! 👋`,
    dataAtual: new Date().toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    statusGeral: {
      novasAusencias: 3,
      tendencia: 'queda',
      variacaoAbsenteismo: -2.1,
    },
    kpis: [
      {
        id: 'absenteismo',
        titulo: 'Análise de Absenteísmo',
        valor: '8.2%',
        variacao: -1.2,
        descricao: 'Taxa atual',
        icone: '📊',
        cor: 'blue',
        path: '/analise',
      },
      {
        id: 'ausencias',
        titulo: 'Gestão de Ausências',
        valor: '12',
        variacao: -3,
        descricao: 'Ausências abertas',
        icone: '👥',
        cor: 'green',
        path: '/gestao-ausencias',
      },
      {
        id: 'risk',
        titulo: 'Risk Scoring',
        valor: '5',
        variacao: 2,
        descricao: 'Riscos críticos',
        icone: '🎯',
        cor: 'red',
        path: '/risk-scoring',
      },
      {
        id: 'saude',
        titulo: 'Business Health',
        valor: '7.8',
        variacao: 0.5,
        descricao: 'Índice de saúde',
        icone: '❤️',
        cor: 'purple',
        path: '/analytics-saude',
      },
    ],
    notificacoes: [
      {
        id: 1,
        tipo: 'alerta',
        titulo: 'Setor Produção superou limite de ausência',
        descricao: '15% acima do previsto para este mês',
        tempo: '2 horas atrás',
        path: '/analise',
      },
      {
        id: 2,
        tipo: 'pendencia',
        titulo: '2 novos afastamentos aguardam validação',
        descricao: 'Documentação pendente de análise',
        tempo: '5 horas atrás',
        path: '/gestao-ausencias',
      },
      {
        id: 3,
        tipo: 'lembrete',
        titulo: 'Revisar relatório semanal',
        descricao: 'Prazo até sexta-feira',
        tempo: '1 dia atrás',
        path: '/analise',
      },
      {
        id: 4,
        tipo: 'risco',
        titulo: '3 colaboradores em risco crítico',
        descricao: 'Probabilidade acima de 80%'
        ,
        tempo: '2 dias atrás',
        path: '/risk-scoring',
      },
    ],
    insights: [
      {
        id: 1,
        titulo: 'Queda no absenteísmo',
        descricao: 'Redução de 15% no setor Administrativo após programa de bem-estar',
        tipo: 'positivo',
        icone: '📉',
      },
      {
        id: 2,
        titulo: 'Tendência positiva',
        descricao: 'Aumento de 20% em sentimentos positivos no último mês',
        tipo: 'positivo',
        icone: '💪',
      },
      {
        id: 3,
        titulo: 'Atenção necessária',
        descricao: 'Setor Logística com aumento de 25% em dores lombares',
        tipo: 'alerta',
        icone: '⚠️',
      },
    ],
    atalhos: [
      {
        id: 1,
        titulo: 'Registrar Nova Ausência',
        descricao: 'Adicionar falta ou afastamento',
        icone: '➕',
        path: '/gestao-ausencias',
        cor: 'blue',
      },
      {
        id: 2,
        titulo: 'Gerar Relatório',
        descricao: 'Criar relatório personalizado',
        icone: '📄',
        path: '/analise',
        cor: 'green',
      },
      {
        id: 3,
        titulo: 'Colaboradores em Risco',
        descricao: 'Ver lista priorizada',
        icone: '🎯',
        path: '/risk-scoring',
        cor: 'red',
      },
      {
        id: 4,
        titulo: 'Saúde por Setor',
        descricao: 'Análise organizacional',
        icone: '❤️',
        path: '/analytics-saude',
        cor: 'purple',
      },
    ],
    tendencias: {
      absenteismo: [8.5, 8.2, 7.9, 8.1, 8.2, 7.8, 8.0],
      saude: [7.2, 7.4, 7.5, 7.6, 7.7, 7.8, 7.8],
      riscos: [8, 7, 6, 8, 5, 6, 5],
    },
  };

  const onOpen = (path) => navigate(path);

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <Header
        saudacao={dados.saudacao}
        dataAtual={dados.dataAtual}
        statusGeral={dados.statusGeral}
      />

      {/* KPIs */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Visão Geral do Sistema</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dados.kpis.map((kpi) => (
            <KpiCard key={kpi.id} kpi={kpi} onOpen={onOpen} />
          ))}
        </div>
      </div>

      {/* Colunas principais */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Notificações */}
        <div className="lg:col-span-1">
          <Notifications items={dados.notificacoes} onOpen={onOpen} />
        </div>

        {/* Insights e Tendências */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Insights e Tendências</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Insights items={dados.insights} />
            <TrendBars tendencias={dados.tendencias} />
          </div>

          <QuickActions atalhos={dados.atalhos} onOpen={onOpen} />
        </div>
      </div>

      {/* Recomendações */}
      <Recommendations />
    </div>
  );
};

export default Dashboard;