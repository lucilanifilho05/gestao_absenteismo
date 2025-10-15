import React from 'react';

const Header = ({ saudacao, dataAtual, statusGeral }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#5b24ca]">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-[#5b24ca] tracking-tight">{saudacao}</h1>
          <p className="text-gray-600 mt-2 capitalize">{dataAtual}</p>
          <p className="text-sm text-gray-500 mt-2">
            Hoje temos <span className="font-semibold">{statusGeral.novasAusencias} novas ausências</span> registradas e uma tendência de{' '}
            <span className={`font-semibold ${statusGeral.tendencia === 'queda' ? 'text-green-600' : 'text-red-600'}`}>
              {statusGeral.tendencia} no absenteísmo
            </span>{' '}({statusGeral.variacaoAbsenteismo}%).
          </p>
        </div>
        <div className="mt-4 lg:mt-0">
          <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
            <p className="text-sm font-medium text-blue-800">💡 Insight do Dia</p>
            <p className="text-blue-700 mt-1">Programa de bem-estar mostra resultados positivos no setor Administrativo</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;