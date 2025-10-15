import React, { useMemo } from 'react';
import StatCard from './StatCard';

const StatsPanel = ({ ausencias, className = '' }) => {
  const stats = useMemo(() => ({
    total: ausencias.length,
    justificadas: ausencias.filter(a => a.status === 'justificada').length,
    injustificadas: ausencias.filter(a => a.status === 'injustificada').length,
    pendentes: ausencias.filter(a => a.status === 'pendente').length,
  }), [ausencias]);

  // Ícones simples (sem dependências externas)
  const icons = {
    total: '📋',
    just: '✅',
    inj: '⛔',
    pend: '⏳',
  };

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
      <StatCard
        label="Total"
        value={stats.total}
        caption="Registros no período"
        icon={icons.total}
        trend={0}              // substitua quando tiver dados históricos
        trendSuffix=""
        trendLabel=""
      />

      <StatCard
        label="Justificadas"
        value={stats.justificadas}
        caption="Comprovadas"
        icon={icons.just}
        trend={0}
        trendSuffix=""
        trendLabel=""
      />

      <StatCard
        label="Injustificadas"
        value={stats.injustificadas}
        caption="Sem justificativa"
        icon={icons.inj}
        trend={0}
        trendSuffix=""
        trendLabel=""
      />

      <StatCard
        label="Pendentes"
        value={stats.pendentes}
        caption="Aguardando análise"
        icon={icons.pend}
        trend={0}
        trendSuffix=""
        trendLabel=""
      />
    </div>
  );
};

export default StatsPanel;
