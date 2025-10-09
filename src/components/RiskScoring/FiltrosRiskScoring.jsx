import React from 'react';

const FiltrosRiskScoring = ({ filtros, onFiltroChange }) => {
  const departamentos = ['Produção', 'Qualidade', 'Logística', 'Administrativo', 'TI', 'Comercial'];
  
  const niveisRisco = [
    { valor: 'todos', label: 'Todos os Níveis' },
    { valor: 'critico', label: 'Crítico' },
    { valor: 'alto', label: 'Alto Risco' },
    { valor: 'medio', label: 'Médio Risco' },
    { valor: 'baixo', label: 'Baixo Risco' }
  ];

  const periodos = [
    { valor: '15dias', label: 'Próximos 15 dias' },
    { valor: '30dias', label: 'Próximos 30 dias' },
    { valor: '60dias', label: 'Próximos 60 dias' }
  ];

  const handleChange = (campo, valor) => {
    onFiltroChange({ ...filtros, [campo]: valor });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Filtros de Risco</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Filtro por Departamento */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Departamento
          </label>
          <select
            value={filtros.departamento}
            onChange={(e) => handleChange('departamento', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Todos os Departamentos</option>
            {departamentos.map(depto => (
              <option key={depto} value={depto}>{depto}</option>
            ))}
          </select>
        </div>

        {/* Filtro por Nível de Risco */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nível de Risco
          </label>
          <select
            value={filtros.nivelRisco}
            onChange={(e) => handleChange('nivelRisco', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {niveisRisco.map(nivel => (
              <option key={nivel.valor} value={nivel.valor}>{nivel.label}</option>
            ))}
          </select>
        </div>

        {/* Filtro por Período */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Período de Predição
          </label>
          <select
            value={filtros.periodo}
            onChange={(e) => handleChange('periodo', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {periodos.map(periodo => (
              <option key={periodo.valor} value={periodo.valor}>{periodo.label}</option>
            ))}
          </select>
        </div>

        {/* Botão Limpar Filtros */}
        <div className="flex items-end">
          <button
            onClick={() => onFiltroChange({
              departamento: '',
              nivelRisco: 'todos',
              periodo: '30dias'
            })}
            className="w-full px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            Limpar Filtros
          </button>
        </div>
      </div>
    </div>
  );
};

export default FiltrosRiskScoring;