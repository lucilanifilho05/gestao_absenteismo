import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
// Se tiver AuthContext, você pode ativar a linha abaixo e usar user?.id
// import { useAuth } from "../context/AuthContext";

import Stepper from "../components/PulsoSemanal/Stepper";
import SentimentosStep from "../components/PulsoSemanal/SentimentosStep";
import ErgonomiaStep from "../components/PulsoSemanal/ErgonomiaStep";
import FinalStep from "../components/PulsoSemanal/FinalStep";
import { savePulse } from "../services/weeklyPulseService"

const STEPS = {
  SENTIMENTOS: 0,
  ERGONOMIA: 1,
  FINAL: 2,
};

const PulsoSemanal = () => {
  const navigate = useNavigate();
  // const { user } = useAuth();
  const [step, setStep] = useState(STEPS.SENTIMENTOS);
  const [feeling, setFeeling] = useState(null);
  const [ergonomics, setErgonomics] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const canGoBack = step === STEPS.ERGONOMIA;
  const canFinish = step === STEPS.ERGONOMIA && feeling !== null;

  const handleSelectFeeling = (value) => {
    setFeeling(value);
    // Avança automaticamente após uma micro-animação:
    setTimeout(() => setStep(STEPS.ERGONOMIA), 180);
  };

  const toggleErgonomic = (value) => {
    setErgonomics((prev) => {
      const isNone = value === "nenhum";
      if (isNone) return ["nenhum"]; // Exclusivo
      const hadNone = prev.includes("nenhum");
      const base = hadNone ? [] : prev;
      if (base.includes(value)) return base.filter((v) => v !== value);
      return [...base, value];
    });
  };

  const onBack = () => setStep((s) => Math.max(STEPS.SENTIMENTOS, s - 1));

  const onFinish = async () => {
    if (!canFinish || submitting) return;
    try {
      setSubmitting(true);
      // Mock de persistência
      await savePulse({
        // userId: user?.id ?? "mock-user",
        userId: "mock-user",
        date: new Date().toISOString(),
        feeling,
        ergonomics,
      });
      setStep(STEPS.FINAL);
    } finally {
      setSubmitting(false);
    }
  };

  const progress = useMemo(() => {
    switch (step) {
      case STEPS.SENTIMENTOS:
        return 33;
      case STEPS.ERGONOMIA:
        return 66;
      case STEPS.FINAL:
        return 100;
      default:
        return 0;
    }
  }, [step]);

  return (
    <div className="space-y-6">
      {/* Header / breadcrumb simples */}
      <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#5b24ca]">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-[#5b24ca] tracking-tight">Pulso Semanal</h1>
            <p className="text-gray-600 mt-1">
              Leva menos de 1 minuto. Suas respostas ajudam a melhorar o bem-estar no trabalho.
            </p>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="self-start lg:self-auto px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
          >
            ← Voltar
          </button>
        </div>

        {/* Stepper */}
        <div className="mt-4">
          <Stepper
            steps={["Sentimentos", "Ergonomia", "Concluído"]}
            activeIndex={step}
            progress={progress}
          />
        </div>
      </div>

      {/* Card do conteúdo do passo */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        {step === STEPS.SENTIMENTOS && (
          <SentimentosStep value={feeling} onSelect={handleSelectFeeling} />
        )}

        {step === STEPS.ERGONOMIA && (
          <>
            <ErgonomiaStep values={ergonomics} onToggle={toggleErgonomic} />
            <div className="mt-6 flex items-center justify-between">
              <button
                onClick={onBack}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
              >
                ← Voltar
              </button>

              <button
                onClick={onFinish}
                disabled={!canFinish || submitting}
                className={`px-5 py-2 rounded-lg font-medium text-white transition
                  ${canFinish && !submitting ? "bg-violet-600 hover:bg-violet-700" : "bg-violet-300 cursor-not-allowed"}
                `}
              >
                {submitting ? "Enviando..." : "Finalizar"}
              </button>
            </div>
          </>
        )}

        {step === STEPS.FINAL && (
          <FinalStep
            onGoHome={() => navigate("/")}
            onGoWellbeing={() => navigate("/meu-wellbeing")}
          />
        )}
      </div>
    </div>
  );
};

export default PulsoSemanal;
