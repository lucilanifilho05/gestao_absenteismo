import React from 'react';

const FilterBar = ({
  filtroPeriodo, setFiltroPeriodo,
  query, setQuery,
  statusAtivo, setStatusAtivo,
  onClear,
  getStatusInfo, // vindo da page
}) => {
  const chipBase = 'px-3 py-2 rounded-lg border text-sm font-medium';
  const chipActive = 'bg-violet-600 text-white border-violet-600';
  const chipIdle = 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50';

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Filtros</h3>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Busca */}
        <div className="xl:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Buscar</label>
          <div className="flex">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Pesquisar por tipo, causa..."
              className="w-full px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-violet-500 focus:border-violet-500"
            />
            <button
              onClick={() => setQuery('')}
              className="px-3 border border-l-0 border-gray-300 rounded-r-lg text-gray-600 hover:bg-gray-50"
            >
              Limpar
            </button>
          </div>
        </div>

        {/* Período */}
        <div className="xl:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Período</label>
          <select
            value={filtroPeriodo}
            onChange={(e) => setFiltroPeriodo(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-violet-500 focus:border-violet-500"
          >
            <option value="semana">Esta Semana</option>
            <option value="mes">Este Mês</option>
            <option value="ano">Este Ano</option>
            <option value="todos">Todos</option>
          </select>
        </div>

        {/* Status chips */}
        <div className="xl:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <div className="flex flex-wrap gap-2">
            {['todos', 'justificada', 'injustificada', 'pendente'].map((s) => (
              <button
                key={s}
                onClick={() => setStatusAtivo(s)}
                className={`${chipBase} ${statusAtivo === s ? chipActive : chipIdle}`}
              >
                {s === 'todos' ? 'Todos' : getStatusInfo(s).text}
              </button>
            ))}
            <button onClick={onClear} className="ml-auto text-sm text-gray-600 hover:text-gray-800 underline">
              Limpar filtros
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
