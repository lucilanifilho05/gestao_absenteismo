// Utilitários de estilo e ícones
export const getVariacaoCor = (variacao) => {
  if (variacao > 0) return 'text-red-500';
  if (variacao < 0) return 'text-green-500';
  return 'text-gray-500';
};

export const getVariacaoIcone = (variacao) => {
  if (variacao > 0) return '↗️';
  if (variacao < 0) return '↘️';
  return '→';
};

export const getNotificacaoCor = (tipo) => {
  switch (tipo) {
    case 'alerta':
      return 'bg-red-50 border-red-200';
    case 'pendencia':
      return 'bg-yellow-50 border-yellow-200';
    case 'lembrete':
      return 'bg-blue-50 border-blue-200';
    case 'risco':
      return 'bg-orange-50 border-orange-200';
    default:
      return 'bg-gray-50 border-gray-200';
  }
};

export const getNotificacaoIcone = (tipo) => {
  switch (tipo) {
    case 'alerta':
      return '🚨';
    case 'pendencia':
      return '📋';
    case 'lembrete':
      return '⏰';
    case 'risco':
      return '⚠️';
    default:
      return 'ℹ️';
  }
};

export const getInsightCor = (tipo) => {
  return tipo === 'positivo'
    ? 'bg-green-50 border-green-200 text-green-800'
    : 'bg-yellow-50 border-yellow-200 text-yellow-800';
};

export const getCorClasses = (cor) => {
  const cores = {
    blue: 'bg-blue-50 border-blue-200 text-blue-700',
    green: 'bg-green-50 border-green-200 text-green-700',
    red: 'bg-red-50 border-red-200 text-red-700',
    purple: 'bg-purple-50 border-purple-200 text-purple-700',
  };
  return cores[cor] || cores.blue;
};