import React from 'react';

// recebe o objeto já resolvido pela page
const StatusBadge = ({ statusInfo }) => {
  const { text, badge } = statusInfo || {};
  return <span className={`px-3 py-1 rounded-full text-xs font-medium border ${badge}`}>{text}</span>;
};

export default StatusBadge;
