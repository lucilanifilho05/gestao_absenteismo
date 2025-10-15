import React from 'react';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="mx-auto w-20 h-20 bg-red-100 rounded-2xl flex items-center justify-center">
          <span className="text-red-500 text-2xl">🚫</span>
        </div>
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          Acesso Negado
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Você não tem permissão para acessar esta página.
        </p>
        <div className="mt-6 space-y-3">
          <button
            onClick={() => navigate('/home')}
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Voltar ao Dashboard
          </button>
          <button
            onClick={() => navigate('/login')}
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Fazer Login com Outra Conta
          </button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;