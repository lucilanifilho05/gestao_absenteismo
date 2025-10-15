import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Features = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: "📊",
      title: "Análise de Absenteísmo",
      description: "Dashboards interativos com dados precisos sobre comportamento e desempenho organizacional.",
      path: "/analise",
    },
    {
      icon: "👥",
      title: "Gestão de Ausências",
      description: "Controle detalhado de faltas e padrões de comportamento em tempo real.",
      path: "/gestao-ausencias",
    },
    {
      icon: "🎯",
      title: "Risk Scoring",
      description: "Predição proativa de ausências com base em IA e histórico de comportamento.",
      path: "/risk-scoring",
    },
    {
      icon: "❤️",
      title: "Analytics Saúde",
      description: "Visualize métricas de saúde e absenteísmo em tempo real para decisões mais assertivas e gestão proativa.",
      path: "/analytics-saude",
    },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-white via-[#f9f8ff] to-[#f3f0ff] overflow-hidden">
      {/* Glow background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#6c3cff]/20 blur-[160px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-sm font-semibold tracking-widest uppercase text-[#6c3cff]">
            Funcionalidades
          </h2>
          <h3 className="mt-3 text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-[#6c3cff] to-[#9c83ff] bg-clip-text text-transparent">
            Tudo que você precisa em uma plataforma
          </h3>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
            Ferramentas completas para monitorar, analisar e agir com precisão.
          </p>
        </motion.div>

        <div className="mt-20 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              onClick={() => navigate(feature.path)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative p-8 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/20 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_25px_rgba(108,60,255,0.15)] transition-all cursor-pointer group overflow-hidden"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-[#6c3cff]/10 to-[#9c83ff]/20 blur-lg rounded-2xl"></div>

              <div className="relative z-10">
                <div className="w-16 h-16 flex items-center justify-center text-4xl mb-6 bg-gradient-to-br from-[#6c3cff]/10 to-[#9c83ff]/20 text-[#6c3cff] rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-[#6c3cff] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
