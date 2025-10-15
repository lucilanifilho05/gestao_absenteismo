import React from 'react';
import { getNotificacaoCor, getNotificacaoIcone } from './utils';

const Notifications = ({ items, onOpen }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Notificações</h2>
      <div className="space-y-3">
        {items.map((n) => (
          <div
            key={n.id}
            className={`p-4 rounded-lg border cursor-pointer hover:shadow-md transition-all duration-200 ${getNotificacaoCor(n.tipo)}`}
            onClick={() => onOpen(n.path)}
          >
            <div className="flex items-start space-x-3">
              <span className="text-lg mt-0.5">{getNotificacaoIcone(n.tipo)}</span>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{n.titulo}</h4>
                <p className="text-sm text-gray-600 mt-1">{n.descricao}</p>
                <p className="text-xs text-gray-500 mt-2">{n.tempo}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;