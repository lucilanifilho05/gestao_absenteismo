import React from 'react';

const Filtros = ({ filtros, onFiltroChange }) => {
  const setores = ['Produção', 'Qualidade', 'Logística', 'Administrativo', 'TI'];
  const celulas = {
    'Produção': ['Montagem', 'Pintura', 'Embalagem', 'Controle Qualidade', 'Expedição'],
    'Qualidade': ['Inspeção', 'Testes', 'Calibração'],
    'Logística': ['Recebimento', 'Armazenagem', 'Expedição', 'Transporte'],
    'Administrativo': ['RH', 'Financeiro'],
    'TI': ['Infraestrutura', 'Desenvolvimento']
  };

  const handleChange = (campo, valor) => {
    const novosFiltros = { ...filtros, [campo]: valor };
    
    // Se mudou o setor, limpa a célula selecionada
    if (campo === 'setor' && valor !== filtros.setor) {
      novosFiltros.celula = '';
    }
    
    onFiltroChange(novosFiltros);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Filtros</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Filtro por Setor */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Setor
          </label>
          <select
            value={filtros.setor}
            onChange={(e) => handleChange('setor', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Todos os Setores</option>
            {setores.map(setor => (
              <option key={setor} value={setor}>{setor}</option>
            ))}
          </select>
        </div>

        {/* Filtro por Célula */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Célula
          </label>
          <select
            value={filtros.celula}
            onChange={(e) => handleChange('celula', e.target.value)}
            disabled={!filtros.setor}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
          >
            <option value="">Todas as Células</option>
            {filtros.setor && celulas[filtros.setor]?.map(celula => (
              <option key={celula} value={celula}>{celula}</option>
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
            <option value="bimestre">Bimestre</option>
            <option value="semestre">Semestre</option>
            <option value="ano">Ano</option>
          </select>
        </div>

        {/* Botão Limpar Filtros */}
        <div className="flex items-end">
          <button
            onClick={() => onFiltroChange({
              setor: '',
              celula: '',
              periodo: 'mes',
              dataInicio: '',
              dataFim: ''
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

export default Filtros;