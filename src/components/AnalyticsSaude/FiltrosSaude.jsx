import React from 'react';

const FiltrosSaude = ({ filtros, onFiltroChange }) => {
  const setores = ['Produção', 'Qualidade', 'Logística', 'Administrativo', 'TI', 'Comercial'];
  
  const celulas = {
    'Produção': ['Montagem A', 'Montagem B', 'Pintura A', 'Pintura B', 'Controle Qualidade'],
    'Qualidade': ['Inspeção', 'Testes', 'Calibração'],
    'Logística': ['Recebimento', 'Armazenagem', 'Expedição'],
    'Administrativo': ['RH', 'Financeiro', 'Compras'],
    'TI': ['Infraestrutura', 'Desenvolvimento', 'Suporte']
  };

  const periodos = [
    { valor: '7dias', label: 'Últimos 7 dias' },
    { valor: '30dias', label: 'Últimos 30 dias' },
    { valor: '90dias', label: 'Últimos 90 dias' },
    { valor: 'semestre', label: 'Este semestre' }
  ];

  const tiposAnalise = [
    { valor: 'saude-mental', label: 'Saúde Mental' },
    { valor: 'ergonomia', label: 'Ergonomia' }
  ];

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
      <h2 className="text-xl font-semibold mb-4">Filtros de Análise</h2>
      
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
            {periodos.map(periodo => (
              <option key={periodo.valor} value={periodo.valor}>{periodo.label}</option>
            ))}
          </select>
        </div>

        {/* Filtro por Tipo de Análise */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de Análise
          </label>
          <select
            value={filtros.tipoAnalise}
            onChange={(e) => handleChange('tipoAnalise', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {tiposAnalise.map(tipo => (
              <option key={tipo.valor} value={tipo.valor}>{tipo.label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FiltrosSaude;