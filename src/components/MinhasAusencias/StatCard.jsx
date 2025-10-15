import React from 'react';

const StatCard = ({
  label,
  value,
  suffix = '',
  caption,
  icon,
  trend,
  trendSuffix = '',
  trendLabel,
  className = '',
}) => {
  const hasTrend = typeof trend === 'number' && !Number.isNaN(trend);
  const isUp = hasTrend && trend > 0;
  const isDown = hasTrend && trend < 0;

  const trendClasses =
    isUp
      ? 'bg-red-50 text-red-700 ring-red-200'
      : isDown
      ? 'bg-emerald-50 text-emerald-700 ring-emerald-200'
      : 'bg-gray-50 text-gray-700 ring-gray-200';

  const trendIcon = isUp ? '↗' : isDown ? '↘' : '→';

  return (
    <div className={`group relative rounded-2xl p-[1px] bg-gradient-to-br from-violet-200/70 to-blue-200/70 ${className}`}>
      <div className="rounded-2xl bg-white/90 backdrop-blur-sm p-5 shadow-sm ring-1 ring-gray-200/70 transition-all duration-200 group-hover:shadow-md group-hover:ring-gray-300">
        {/* Top row: label + trend chip */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {icon && (
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-100 to-blue-100 text-violet-700 ring-1 ring-violet-200/60">
                <span className="text-lg leading-none">{icon}</span>
              </span>
            )}
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">{label}</p>
            </div>
          </div>

          {hasTrend && (
            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${trendClasses}`}>
              <span aria-hidden>{trendIcon}</span>
              {trend > 0 && '+'}
              {trend}
              {trendSuffix}
              {trendLabel ? <span className="hidden sm:inline text-gray-500/80">&nbsp;{trendLabel}</span> : null}
            </span>
          )}
        </div>

        {/* Value */}
        <div className="mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-gray-900">
              {value}
              {suffix && <span className="ml-1 text-2xl font-semibold text-gray-500">{suffix}</span>}
            </span>
          </div>
          {caption && <p className="mt-1 text-sm text-gray-500">{caption}</p>}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
