import React from "react";

const Stepper = ({ steps = [], activeIndex = 0, progress = 0 }) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        {steps.map((label, idx) => {
          const done = idx < activeIndex;
          const active = idx === activeIndex;
          return (
            <div key={label} className="flex-1 flex items-center">
              <div
                className={`flex items-center justify-center w-9 h-9 rounded-full border-2
                ${done ? "bg-violet-600 border-violet-600 text-white"
                      : active ? "border-violet-600 text-violet-700"
                      : "border-gray-300 text-gray-500"}
                `}
                title={label}
                aria-label={label}
              >
                {done ? "✓" : idx + 1}
              </div>
              {idx < steps.length - 1 && (
                <div className="flex-1 h-0.5 mx-2 bg-gray-200" />
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
        <div
          className="h-2 rounded-full bg-violet-600 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default Stepper;
