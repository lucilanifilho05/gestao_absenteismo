// pages/MinhasAusencias.jsx
import React, { useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext';

// components
import Modal from '../components/MinhasAusencias/Modal';
import HeaderBar from '../components/MinhasAusencias/HeaderBar';
import FilterBar from '../components/MinhasAusencias/FilterBar';
import StatsPanel from '../components/MinhasAusencias/StatsPanel';
import AbsencesTable from '../components/MinhasAusencias/AbsencesTable';
import StatusBadge from '../components/MinhasAusencias/StatusBadge';

/* ============ MOCK (local) ============ */
const AUSENCIAS_MOCK = [
  { id: 1, data: '2024-01-15', tipo: 'Consulta médica', status: 'justificada', duracao: '1 dia', causa: 'Exame de rotina', documentacao: 'Atestado médico anexado', dataRegistro: '2024-01-14' },
  { id: 2, data: '2024-01-20', tipo: 'Atestado médico', status: 'justificada', duracao: '2 dias', causa: 'Gripe', documentacao: 'Atestado válido por 2 dias', dataRegistro: '2024-01-19' },
  { id: 3, data: '2024-02-05', tipo: 'Falta', status: 'injustificada', duracao: '1 dia', causa: '', documentacao: '', dataRegistro: '2024-02-06' },
  { id: 4, data: '2024-02-12', tipo: 'Questões pessoais', status: 'pendente', duracao: '1 dia', causa: 'Assuntos familiares', documentacao: 'Aguardando aprovação', dataRegistro: '2024-02-11' },
  { id: 5, data: '2024-02-18', tipo: 'Licença', status: 'justificada', duracao: '5 dias', causa: 'Licença maternidade', documentacao: 'Documentação aprovada', dataRegistro: '2024-02-10' },
];

/* ============ UTILS (locais) ============ */
const statusMeta = {
  justificada: { text: 'Justificada', badge: 'bg-green-100 text-green-800 border-green-200' },
  injustificada: { text: 'Injustificada', badge: 'bg-red-100 text-red-800 border-red-200' },
  pendente:     { text: 'Pendente',     badge: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  default:      { text: 'Indefinido',   badge: 'bg-gray-100 text-gray-800 border-gray-200' },
};
const getStatusInfo = (status) => statusMeta[status] || statusMeta.default;
const formatDateBR = (iso) => { try { return new Date(iso).toLocaleDateString('pt-BR'); } catch { return iso; } };

const MinhasAusencias = () => {
  const { user } = useAuth();

  const [modalAberto, setModalAberto] = useState(false);
  const [ausenciaSelecionada, setAusenciaSelecionada] = useState(null);

  // filtros
  const [filtroPeriodo, setFiltroPeriodo] = useState('mes');
  const [query, setQuery] = useState('');
  const [statusAtivo, setStatusAtivo] = useState('todos');

  const dados = AUSENCIAS_MOCK;

  // aplica filtros (ajuste a lógica de período quando tiver datas reais)
  const ausenciasFiltradas = useMemo(() => {
    return dados.filter(a => {
      if (statusAtivo !== 'todos' && a.status !== statusAtivo) return false;
      if (query) {
        const q = query.toLowerCase();
        const alvo = `${a.tipo} ${a.causa} ${a.status}`.toLowerCase();
        if (!alvo.includes(q)) return false;
      }
      return true;
    });
  }, [dados, statusAtivo, query, filtroPeriodo]);

  const abrirModal = (ausencia) => { setAusenciaSelecionada(ausencia || null); setModalAberto(true); };
  const fecharModal = () => { setModalAberto(false); setTimeout(() => setAusenciaSelecionada(null), 180); };
  const handleAlinhamento = (payload) => { console.log('Dados para alinhamento:', payload); fecharModal(); };

  return (
    <div className="space-y-6">
      {/* Header */}
      <HeaderBar onPrimaryClick={() => abrirModal(null)} />

      <section aria-label="Resumo de Ausências" className="space-y-2">
        <div className="mb-3">
          <h2 className="text-lg font-semibold text-violet-900">Resumo</h2>
          <p className="text-sm text-violet-700/80">Visão geral das suas ausências</p>
        </div>
          <StatsPanel ausencias={ausenciasFiltradas} />
      </section>

      {/* ======= SECTION: FILTROS (logo abaixo dos cards) ======= */}
      <section aria-label="Filtros de Busca">
        <FilterBar
          filtroPeriodo={filtroPeriodo} setFiltroPeriodo={setFiltroPeriodo}
          query={query} setQuery={setQuery}
          statusAtivo={statusAtivo} setStatusAtivo={setStatusAtivo}
          onClear={() => { setQuery(''); setStatusAtivo('todos'); setFiltroPeriodo('mes'); }}
          getStatusInfo={getStatusInfo}
        />
      </section>

      {/* Lista */}
      <AbsencesTable
        ausencias={ausenciasFiltradas}
        onOpen={abrirModal}
        formatDateBR={formatDateBR}
        getStatusInfo={getStatusInfo}
      />

      {/* Modal */}
      <Modal
        open={modalAberto}
        onClose={fecharModal}
        title={ausenciaSelecionada ? 'Detalhes da Ausência' : 'Alinhar Ausência com RH'}
        footer={
          <>
            <button
              type="button"
              onClick={fecharModal}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={() => handleAlinhamento(ausenciaSelecionada)}
              className="px-4 py-2 text-sm font-medium text-white bg-violet-600 border border-transparent rounded-lg hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
            >
              {ausenciaSelecionada ? 'Fechar' : 'Enviar para RH'}
            </button>
          </>
        }
      >
        {ausenciaSelecionada ? (
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-900">Informações da Ausência</h3>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">Data</span>
                  <span className="font-medium">{formatDateBR(ausenciaSelecionada.data)}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">Tipo</span>
                  <span className="font-medium">{ausenciaSelecionada.tipo}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">Duração</span>
                  <span className="font-medium">{ausenciaSelecionada.duracao}</span>
                </div>
                <div className="flex justify-between gap-4 items-center">
                  <span className="text-gray-500">Status</span>
                  <span><StatusBadge statusInfo={getStatusInfo(ausenciaSelecionada.status)} /></span>
                </div>
              </div>
            </div>

            {ausenciaSelecionada.causa && (
              <div>
                <h3 className="font-medium text-gray-900">Causa Registrada</h3>
                <p className="mt-2 text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                  {ausenciaSelecionada.causa}
                </p>
              </div>
            )}

            {ausenciaSelecionada.documentacao && (
              <div>
                <h3 className="font-medium text-gray-900">Documentação</h3>
                <p className="mt-2 text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                  {ausenciaSelecionada.documentacao}
                </p>
              </div>
            )}

            {ausenciaSelecionada.status === 'injustificada' && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-medium text-yellow-800 mb-2">⚠️ Ausência Injustificada</h4>
                <p className="text-sm text-yellow-700">
                  Esta ausência não possui justificativa registrada. Entre em contato com o RH para regularizar.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Data da Ausência</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-violet-500 focus:border-violet-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Ausência</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-violet-500 focus:border-violet-500">
                  <option value="">Selecione o tipo</option>
                  <option value="medica">Atestado Médico</option>
                  <option value="consulta">Consulta Médica</option>
                  <option value="pessoal">Assuntos Pessoais</option>
                  <option value="familia">Questões Familiares</option>
                  <option value="outros">Outros</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Causa/Justificativa</label>
              <textarea
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-violet-500 focus:border-violet-500"
                placeholder="Descreva o motivo da ausência..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Anexar Documentação</label>
              <input
                type="file"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-violet-500 focus:border-violet-500"
              />
              <p className="text-xs text-gray-500 mt-1">Anexe atestados ou comprovantes se necessário</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MinhasAusencias;