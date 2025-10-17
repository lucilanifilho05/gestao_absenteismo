import React from "react";

const FinalStep = ({ onGoHome, onGoWellbeing }) => {
  return (
    <div className="text-center">
      <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-3xl">
        ✅
      </div>
      <h2 className="mt-4 text-2xl font-semibold text-gray-900">Obrigado!</h2>
      <p className="mt-2 text-gray-700">
        Suas respostas foram registradas com sucesso.
      </p>

      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          onClick={onGoHome}
          className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
        >
          Ir para início
        </button>
        <button
          onClick={onGoWellbeing}
          className="px-5 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-medium transition"
        >
          Ver Meu Wellbeing
        </button>
      </div>
    </div>
  );
};

export default FinalStep;
