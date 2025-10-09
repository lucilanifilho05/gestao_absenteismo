import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import FiltrosGestao from '../components/GestaoAusencias/FiltrosGestao';
import TaxaAbsenteismo from '../components/GestaoAusencias/TaxaAbsenteismo';
import RegistrosFaltas from '../components/GestaoAusencias/RegistrosFaltas';
import MotivosFaltas from '../components/GestaoAusencias/MotivosFaltas';
import DiasSemanaFaltas from '../components/GestaoAusencias/DiasSemanaFaltas';
import QuadroAlinhamento from '../components/GestaoAusencias/QuadroAlinhamento';
import HistoricoFaltas from '../components/GestaoAusencias/HistoricoFaltas';

// Registrar componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const GestaoAusencias = () => {
  const [filtros, setFiltros] = useState({
    colaborador: '',
    periodo: 'mes',
    dataInicio: '',
    dataFim: '',
    tipoAusencia: 'todos'
  });

  // Dados mockados - substituir por API real
  const [dados, setDados] = useState({
    taxaIndividual: {
      percentual: 8.5,
      classificacao: 'moderado',
      diasTrabalhados: 220,
      diasFaltados: 19,
      comparativoSetor: 6.2
    },
    registrosFaltas: [
      {
        id: 1,
        data: '2024-01-15',
        motivo: 'Consulta médica',
        tipo: 'justificada',
        duracao: '1 dia',
        recorrencia: 'Primeira vez',
        status: 'aprovado'
      },
      {
        id: 2,
        data: '2024-01-20',
        motivo: 'Atestado médico - gripe',
        tipo: 'justificada',
        duracao: '2 dias',
        recorrencia: 'Segunda vez no semestre',
        status: 'aprovado'
      },
      {
        id: 3,
        data: '2024-02-05',
        motivo: 'Falta sem justificativa',
        tipo: 'nao-justificada',
        duracao: '1 dia',
        recorrencia: 'Terceira vez no ano',
        status: 'reprovado'
      },
      {
        id: 4,
        data: '2024-02-15',
        motivo: 'Questões familiares',
        tipo: 'justificada',
        duracao: '1 dia',
        recorrencia: 'Primeira vez',
        status: 'pendente'
      }
    ],
    motivosFaltas: {
      labels: ['Consulta Médica', 'Atestado Médico', 'Questões Familiares', 'Licença', 'Falta sem Justificativa', 'Outros'],
      dados: [35, 25, 15, 10, 10, 5]
    },
    diasSemana: {
      labels: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      dados: [25, 15, 10, 12, 28, 10]
    },
    quadroAlinhamento: {
      ferias: {
        saldo: 18,
        utilizados: 12,
        pendentes: 5
      },
      solicitacoes: {
        pendentes: 3,
        aprovadas: 8,
        reprovadas: 2
      },
      faltas: {
        justificadas: 14,
        naoJustificadas: 5,
        total: 19
      }
    },
    historico: [
      {
        id: 1,
        data: '2024-01-15',
        tipo: 'Consulta médica',
        duracao: '1 dia',
        status: 'aprovado',
        justificativa: 'Apresentado atestado médico'
      },
      {
        id: 2,
        data: '2024-01-20',
        tipo: 'Atestado médico',
        duracao: '2 dias',
        status: 'aprovado',
        justificativa: 'Gripe - atestado válido'
      },
      {
        id: 3,
        data: '2024-02-05',
        tipo: 'Falta sem justificativa',
        duracao: '1 dia',
        status: 'reprovado',
        justificativa: 'Não apresentou justificativa'
      },
      {
        id: 4,
        data: '2024-02-15',
        tipo: 'Questões familiares',
        duracao: '1 dia',
        status: 'pendente',
        justificativa: 'Aguardando documentação'
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
        <h1 className="text-3xl font-bold text-gray-900">Gestão de Ausências</h1>
        <p className="text-gray-600 mt-2">
          Controle individualizado de faltas e análise de padrões de absenteísmo
        </p>
      </div>

      {/* Filtros */}
      <FiltrosGestao filtros={filtros} onFiltroChange={handleFiltroChange} />

      {/* Taxa de Absenteísmo Individual */}
      <TaxaAbsenteismo dados={dados.taxaIndividual} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Motivos das Faltas */}
        <MotivosFaltas dados={dados.motivosFaltas} />

        {/* Dias da Semana com Mais Faltas */}
        <DiasSemanaFaltas dados={dados.diasSemana} />
      </div>

      {/* Quadro de Alinhamento */}
      <QuadroAlinhamento dados={dados.quadroAlinhamento} />

      {/* Registros de Faltas */}
      <RegistrosFaltas registros={dados.registrosFaltas} />

      {/* Histórico de Faltas */}
      <HistoricoFaltas historico={dados.historico} />
    </div>
  );
};

export default GestaoAusencias;