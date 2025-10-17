import React from "react";

const LevelIndicator = ({ level = 1, xp = 0, xpTarget = 1000, percent = 0 }) => {
  const size = 170;         // px
  const stroke = 14;        // espessura do arco
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const clamped = Math.max(0, Math.min(100, percent || 0));
  const dash = (clamped / 100) * c;

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} className="block">
        <g transform={`translate(${size / 2}, ${size / 2})`}>
          {/* trilha */}
          <circle r={r} fill="none" stroke="#e5e7eb" strokeWidth={stroke} />
          {/* arco de progresso */}
          <circle
            r={r}
            fill="none"
            stroke="#7c3aed"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${dash} ${c - dash}`}
            transform="rotate(-90)"
          />
          {/* número do nível */}
          <text
            x="0"
            y="-6"
            textAnchor="middle"
            className="font-bold"
            style={{ fontSize: 36, fill: "#111827" }}
          >
            {level}
          </text>
          <text
            x="0"
            y="22"
            textAnchor="middle"
            className="font-medium"
            style={{ fontSize: 12, fill: "#6b7280", letterSpacing: "0.04em" }}
          >
            nível
          </text>
        </g>
      </svg>

      {/* XP atual / meta + barra fina */}
      <div className="mt-2 w-full max-w-[220px]">
        <div className="flex items-center justify-between text-sm text-gray-700">
          <span>XP</span>
          <span className="font-medium">
            {Math.max(0, Math.floor(xp))}/{Math.max(1, Math.floor(xpTarget))}
          </span>
        </div>
        <div className="mt-1 h-2 rounded-full bg-gray-200 overflow-hidden">
          <div
            className="h-2 bg-violet-600"
            style={{ width: `${clamped}%`, transition: "width .3s ease" }}
          />
        </div>
      </div>
    </div>
  );
};

export default LevelIndicator;
