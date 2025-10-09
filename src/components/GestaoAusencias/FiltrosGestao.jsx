import React from 'react';

const FiltrosGestao = ({ filtros, onFiltroChange }) => {
  const colaboradores = [
    'João Silva - Produção',
    'Maria Santos - Qualidade',
    'Pedro Costa - Logística',
    'Ana Oliveira - Administrativo',
    'Carlos Lima - TI'
  ];

  const handleChange = (campo, valor) => {
    onFiltroChange({ ...filtros, [campo]: valor });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Filtros</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Filtro por Colaborador */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Colaborador
          </label>
          <select
            value={filtros.colaborador}
            onChange={(e) => handleChange('colaborador', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Todos os Colaboradores</option>
            {colaboradores.map(colab => (
              <option key={colab} value={colab}>{colab}</option>
            ))}
          </select>
        </div>

        {/* Filtro por Período */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Período
          </label>
          <select
            value={filtros.periodo}
            onChange={(e) => handleChange('periodo', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="semana">Semana</option>
            <option value="mes">Mês</option>
            <option value="trimestre">Trimestre</option>
            <option value="semestre">Semestre</option>
            <option value="ano">Ano</option>
          </select>
        </div>

        {/* Filtro por Tipo de Ausência */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de Ausência
          </label>
          <select
            value={filtros.tipoAusencia}
            onChange={(e) => handleChange('tipoAusencia', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="todos">Todos os Tipos</option>
            <option value="justificada">Justificadas</option>
            <option value="nao-justificada">Não Justificadas</option>
            <option value="ferias">Férias</option>
          </select>
        </div>

        {/* Botão Limpar Filtros */}
        <div className="flex items-end">
          <button
            onClick={() => onFiltroChange({
              colaborador: '',
              periodo: 'mes',
              dataInicio: '',
              dataFim: '',
              tipoAusencia: 'todos'
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

export default FiltrosGestao;