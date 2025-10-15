// components/painel/ProgressBar.jsx
import React from 'react';

const ProgressBar = ({ value, labelLeft, labelRight, barColor = 'bg-green-500' }) => {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className="mt-4">
      {(labelLeft || labelRight) && (
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>{labelLeft}</span>
          <span>{labelRight}</span>
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`${barColor} h-2 rounded-full transition-all duration-500`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
