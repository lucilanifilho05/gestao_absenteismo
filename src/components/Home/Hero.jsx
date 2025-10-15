import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const shouldReduceMotion = useReducedMotion();
  const navigate = useNavigate();

  return (
    <section
      className="relative isolate overflow-hidden pt-20 bg-gradient-to-b from-white via-slate-50 to-gray-100"
      aria-label="Abertura do site Seraphinys"
    >
      <div className="relative flex h-[90vh] min-h-[600px] flex-col items-center justify-center px-6 text-center md:px-12 lg:px-20">
        {/* Fundo animado leve */}
        {!shouldReduceMotion && (
          <>
            <motion.div
              className="absolute -left-20 top-24 h-64 w-64 rounded-full bg-fuchsia-200/20 blur-3xl"
              animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-24 -right-16 h-72 w-72 rounded-full bg-violet-200/20 blur-3xl"
              animate={{ y: [0, 15, 0], x: [0, -10, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            />
          </>
        )}

        {/* Texto principal */}
        <motion.h1
          className="relative z-10 max-w-5xl text-5xl font-bold tracking-tight text-gray-800 sm:text-6xl md:text-7xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Seraphinys
          <span className="block mt-4 text-2xl font-light text-gray-600 sm:text-3xl md:text-4xl">
            Proteja o presente, previna o ausente
          </span>
        </motion.h1>

        {/* Frase de apoio */}
        <motion.p
          className="mt-6 max-w-4xl text-lg text-gray-600 sm:text-xl md:text-2xl leading-relaxed"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          Desenvolvemos soluções inteligentes que transformam dados em{" "}
          <span className="font-medium text-gray-800">
            insights preditivos
          </span>{" "}
          para o controle e prevenção do absenteísmo, ajudando sua empresa a
          agir antes que os desafios apareçam.
        </motion.p>

        {/* Botão de chamada para ação */}
        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <button
            onClick={() => navigate("/login")}
            className="inline-block rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-500 px-10 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-fuchsia-300"
          >
            Conheça nossos serviços
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
