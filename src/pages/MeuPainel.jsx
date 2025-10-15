// pages/MeuPainel.jsx
import React, { useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

/* =========================
   MOCK: dados locais
   ========================= */
const dadosMock = {
  absenteismo: {
    percentual: 8.5,
    variacao: -1.2,
    diasTrabalhados: 220,
    diasUteis: 240,
    classificacao: 'moderado',
  },
  fte: {
    valor: 0.92,
    variacao: 0.03,
    horasTrabalhadas: 1760,
    horasPrevistas: 1920,
  },
  diasAusentes: {
    total: 19,
    justificados: 14,
    injustificados: 5,
    tendencia: 'diminuindo',
  },
  ausenciasRecentes: [
    { id: 1, data: '2024-01-15', tipo: 'Consulta médica', status: 'justificada', duracao: '1 dia' },
    { id: 2, data: '2024-01-20', tipo: 'Atestado médico', status: 'justificada', duracao: '2 dias' },
    { id: 3, data: '2024-02-05', tipo: 'Falta', status: 'injustificada', duracao: '1 dia' },
  ],
  metricasPeriodo: {
    semana: { absenteismo: 5.2, fte: 0.95, diasAusentes: 1 },
    mes: { absenteismo: 8.5, fte: 0.92, diasAusentes: 19 },
    ano: { absenteismo: 7.8, fte: 0.94, diasAusentes: 185 },
  },
};

/* =========================
   UTILS: helpers locais
   ========================= */
const getClassificacaoCor = (classificacao) => {
  switch (classificacao) {
    case 'baixo': return 'text-green-600 bg-green-100';
    case 'moderado': return 'text-yellow-600 bg-yellow-100';
    case 'alto': return 'text-red-600 bg-red-100';
    default: return 'text-gray-600 bg-gray-100';
  }
};
const getClassificacaoTexto = (classificacao) => {
  switch (classificacao) {
    case 'baixo': return 'Baixo';
    case 'moderado': return 'Moderado';
    case 'alto': return 'Alto';
    default: return 'Não classificado';
  }
};
const getTendenciaCor = (tendencia) => (tendencia === 'diminuindo' ? 'text-green-600' : 'text-red-600');
const getTendenciaIcone = (tendencia) => (tendencia === 'diminuindo' ? '↘️' : '↗️');
const getVariacaoCor = (variacao) => (variacao > 0 ? 'text-red-500' : variacao < 0 ? 'text-green-500' : 'text-gray-500');
const getVariacaoIcone = (variacao) => (variacao > 0 ? '↗️' : variacao < 0 ? '↘️' : '→');

/* =========================
   Subcomponentes locais
   ========================= */

const Header = ({ userName, right }) => (
  <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#5b24ca]">
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="text-3xl font-extrabold text-[#5b24ca] tracking-tight">Meu Painel</h1>
        <p className="text-gray-600 mt-2">
          Bem-vindo, {userName}! Aqui você acompanha suas métricas pessoais.
        </p>
      </div>
      <div className="mt-4 lg:mt-0">{right}</div>
    </div>
  </div>
);

const PeriodSelect = ({ value, onChange }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-violet-500 focus:border-violet-500"
  >
    <option value="semana">Esta Semana</option>
    <option value="mes">Este Mês</option>
    <option value="ano">Este Ano</option>
  </select>
);

const ProgressBar = ({ value, labelLeft, labelRight, barColor = 'bg-green-500' }) => {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className="mt-4">
      {(labelLeft || labelRight) && (
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>{labelLeft}</span>
          <span>{labelRight}</span>
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div className={`${barColor} h-2 rounded-full transition-all duration-500`} style={{ width: `${clamped}%` }} />
      </div>
    </div>
  );
};

const MetricCard = ({ title, value, badge, variationText, variationClass, children }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      {variationText && <span className={`text-sm font-medium ${variationClass}`}>{variationText}</span>}
    </div>
    <div className="text-center mb-4">
      <div className="text-4xl font-bold text-gray-900 mb-2">{value}</div>
      {badge}
    </div>
    {children}
  </div>
);

const DaysAbsentCard = ({ total, justificados, injustificados, tendencia, currentPeriodValue }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-gray-900">Dias Ausentes</h3>
      <span className={`text-sm font-medium ${getTendenciaCor(tendencia)}`}>
        {getTendenciaIcone(tendencia)} {tendencia}
      </span>
    </div>

    <div className="text-center mb-4">
      <div className="text-4xl font-bold text-gray-900 mb-2">{currentPeriodValue}</div>
      <p className="text-sm text-gray-600">No período selecionado</p>
    </div>

    <div className="space-y-2 text-sm text-gray-600">
      <div className="flex justify-between">
        <span>Justificados:</span>
        <span className="font-medium text-green-600">{justificados}</span>
      </div>
      <div className="flex justify-between">
        <span>Injustificados:</span>
        <span className="font-medium text-red-600">{injustificados}</span>
      </div>
      <div className="flex justify-between border-t pt-2">
        <span className="font-medium">Total:</span>
        <span className="font-bold">{total}</span>
      </div>
    </div>

    {/* “pizza” simplificada */}
    <div className="mt-4 flex justify-center">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-green-500" />
        <div
          className="absolute inset-0 rounded-full border-4 border-red-500"
          style={{ clipPath: 'inset(0 0 0 50%)' }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-xs font-medium">
          {Math.round((justificados / (total || 1)) * 100)}%
        </div>
      </div>
    </div>
  </div>
);

const RecentAbsences = ({ ausencias }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Ausências Recentes</h3>
        <button
          onClick={() => navigate('/minhas-ausencias')}
          className="text-violet-600 hover:text-violet-800 text-sm font-medium"
        >
          Ver todas →
        </button>
      </div>

      <div className="space-y-3">
        {ausencias.map((a) => (
          <div key={a.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">{new Date(a.data).toLocaleDateString('pt-BR')}</p>
              <p className="text-sm text-gray-600">{a.tipo}</p>
            </div>
            <div className="text-right">
              <span
                className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                  a.status === 'justificada' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}
              >
                {a.status === 'justificada' ? 'Justificada' : 'Injustificada'}
              </span>
              <p className="text-sm text-gray-600 mt-1">{a.duracao}</p>
            </div>
          </div>
        ))}
      </div>

      {ausencias.length === 0 && (
        <div className="text-center py-4 text-gray-500">Nenhuma ausência recente registrada.</div>
      )}
    </div>
  );
};

const QuickActions = () => {
  const navigate = useNavigate();
  const ActionButton = ({ onClick, icon, title, subtitle, bgClass, iconClass }) => (
    <button
      onClick={onClick}
      className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
    >
      <div className="flex items-center space-x-3">
        <div className={`w-10 h-10 ${bgClass} rounded-lg flex items-center justify-center`}>
          <span className={iconClass}>{icon}</span>
        </div>
        <div>
          <p className="font-medium text-gray-900">{title}</p>
          <p className="text-sm text-gray-600">{subtitle}</p>
        </div>
      </div>
    </button>
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
      <div className="space-y-3">
        <ActionButton
          onClick={() => navigate('/minhas-ausencias')}
          icon="📋"
          title="Minhas Ausências"
          subtitle="Ver histórico completo"
          bgClass="bg-violet-100"
          iconClass="text-violet-600"
        />
        <ActionButton
          onClick={() => navigate('/meu-wellbeing')}
          icon="💚"
          title="Meu Wellbeing"
          subtitle="Acompanhar saúde"
          bgClass="bg-green-100"
          iconClass="text-green-600"
        />
        <ActionButton
          onClick={() => {
            // abrir modal de nova ausência
          }}
          icon="➕"
          title="Registrar Ausência"
          subtitle="Solicitar novo afastamento"
          bgClass="bg-blue-100"
          iconClass="text-blue-600"
        />
      </div>
    </div>
  );
};

const Insights = ({ classificacao, injustificados }) => (
  <div className="bg-gradient-to-r from-violet-50 to-blue-50 p-6 rounded-lg border border-violet-200">
    <h3 className="text-lg font-semibold text-violet-800 mb-3">💡 Insights do Seu Perfil</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
      <div>
        <p className="text-violet-700 font-medium">Sua taxa de absenteísmo está:</p>
        <p className="text-violet-600">
          {classificacao === 'moderado'
            ? 'Dentro da média esperada. Continue mantendo o equilíbrio!'
            : 'Abaixo da média. Excelente desempenho!'}
        </p>
      </div>
      <div>
        <p className="text-violet-700 font-medium">Recomendação:</p>
        <p className="text-violet-600">
          {injustificados > 0
            ? 'Regularize suas ausências injustificadas com o RH.'
            : 'Todos os seus registros estão em dia. Parabéns!'}
        </p>
      </div>
    </div>
  </div>
);

/* =========================
   Page
   ========================= */

const MeuPainel = () => {
  const { user } = useAuth();
  const [filtroPeriodo, setFiltroPeriodo] = useState('mes');

  // trocar por API quando quiser
  const dados = dadosMock;

  const metricasAtuais = useMemo(
    () => dados.metricasPeriodo[filtroPeriodo] || dados.metricasPeriodo.mes,
    [filtroPeriodo]
  );

  return (
    <div className="space-y-6">
      <Header
        userName={user?.name || 'Usuário'}
        right={<PeriodSelect value={filtroPeriodo} onChange={setFiltroPeriodo} />}
      />

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Absenteísmo */}
        <MetricCard
          title="Absenteísmo Pessoal"
          value={`${metricasAtuais.absenteismo}%`}
          variationText={`${getVariacaoIcone(dados.absenteismo.variacao)} ${
            dados.absenteismo.variacao > 0 ? '+' : ''
          }${dados.absenteismo.variacao}%`}
          variationClass={getVariacaoCor(dados.absenteismo.variacao)}
          badge={
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getClassificacaoCor(
                dados.absenteismo.classificacao
              )}`}
            >
              {getClassificacaoTexto(dados.absenteismo.classificacao)}
            </span>
          }
        >
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Dias trabalhados:</span>
              <span className="font-medium">{dados.absenteismo.diasTrabalhados}</span>
            </div>
            <div className="flex justify-between">
              <span>Dias úteis:</span>
              <span className="font-medium">{dados.absenteismo.diasUteis}</span>
            </div>
          </div>

          <ProgressBar
            value={100 - metricasAtuais.absenteismo}
            labelLeft="Taxa de presença"
            labelRight={`${100 - metricasAtuais.absenteismo}%`}
            barColor="bg-green-500"
          />
        </MetricCard>

        {/* FTE */}
        <MetricCard
          title="FTE Pessoal"
          value={metricasAtuais.fte}
          variationText={`${getVariacaoIcone(dados.fte.variacao)} ${
            dados.fte.variacao > 0 ? '+' : ''
          }${dados.fte.variacao}`}
          variationClass={getVariacaoCor(dados.fte.variacao)}
          badge={<p className="text-sm text-gray-600">Full-Time Equivalent</p>}
        >
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Horas trabalhadas:</span>
              <span className="font-medium">{dados.fte.horasTrabalhadas}h</span>
            </div>
            <div className="flex justify-between">
              <span>Horas previstas:</span>
              <span className="font-medium">{dados.fte.horasPrevistas}h</span>
            </div>
          </div>

          <ProgressBar
            value={Math.round(metricasAtuais.fte * 100)}
            labelLeft="Capacidade"
            labelRight={`${Math.round(metricasAtuais.fte * 100)}%`}
            barColor={
              metricasAtuais.fte >= 0.9
                ? 'bg-green-500'
                : metricasAtuais.fte >= 0.7
                ? 'bg-yellow-500'
                : 'bg-red-500'
            }
          />
        </MetricCard>

        {/* Dias Ausentes */}
        <DaysAbsentCard
          total={dados.diasAusentes.total}
          justificados={dados.diasAusentes.justificados}
          injustificados={dados.diasAusentes.injustificados}
          tendencia={dados.diasAusentes.tendencia}
          currentPeriodValue={metricasAtuais.diasAusentes}
        />
      </div>

      {/* Conteúdo secundário */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentAbsences ausencias={dados.ausenciasRecentes} />
        <QuickActions />
      </div>

      {/* Insights */}
      <Insights
        classificacao={dados.absenteismo.classificacao}
        injustificados={dados.diasAusentes.injustificados}
      />
    </div>
  );
};

export default MeuPainel;
