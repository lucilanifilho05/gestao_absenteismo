// components/painel/Header.jsx
import React from 'react';

const Header = ({ userName, right }) => {
  return (
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
};

export default Header;
