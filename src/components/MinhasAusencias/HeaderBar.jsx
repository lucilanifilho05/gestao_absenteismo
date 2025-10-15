import React from 'react';

const HeaderBar = ({ onPrimaryClick }) => (
  <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#5b24ca]">
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="text-3xl font-extrabold text-[#5b24ca] tracking-tight">Minhas Ausências</h1>
        <p className="text-gray-600 mt-2">Histórico e gestão das suas ausências</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Voltar ao topo
        </button>
        <button
          onClick={onPrimaryClick}
          className="px-6 py-3 bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition-colors font-medium shadow-sm"
        >
          Alinhar ausências com RH
        </button>
      </div>
    </div>
  </div>
);

export default HeaderBar;
