// components/painel/QuickActions.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ActionButton = ({ onClick, icon, title, subtitle, bgClass, iconClass }) => (
  <button
    onClick={onClick}
    className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
  >
    <div className="flex items-center space-x-3">
      <div className={`w-10 h-10 ${bgClass} rounded-lg flex items-center justify-center`}>
        <span className={iconClass}>{icon}</span>
      </div>
      <div>
        <p className="font-medium text-gray-900">{title}</p>
        <p className="text-sm text-gray-600">{subtitle}</p>
      </div>
    </div>
  </button>
);

const QuickActions = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
      <div className="space-y-3">
        <ActionButton
          onClick={() => navigate('/minhas-ausencias')}
          icon="📋"
          title="Minhas Ausências"
          subtitle="Ver histórico completo"
          bgClass="bg-violet-100"
          iconClass="text-violet-600"
        />
        <ActionButton
          onClick={() => navigate('/meu-wellbeing')}
          icon="💚"
          title="Meu Wellbeing"
          subtitle="Acompanhar saúde"
          bgClass="bg-green-100"
          iconClass="text-green-600"
        />
        <ActionButton
          onClick={() => {/* abrir modal de nova ausência */}}
          icon="➕"
          title="Registrar Ausência"
          subtitle="Solicitar novo afastamento"
          bgClass="bg-blue-100"
          iconClass="text-blue-600"
        />
      </div>
    </div>
  );
};

export default QuickActions;
