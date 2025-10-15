import React from 'react';
import { motion } from 'framer-motion';

const Stats = () => {
  const stats = [
    { 
      number: "98%", 
      label: "Precisão Preditiva",
      description: "Taxa de acerto em previsões comportamentais",
      color: "#8B5CF6",
      progress: 98,
      icon: "📊"
    },
    { 
      number: "156", 
      label: "Colaboradores Monitorados",
      description: "Pessoas sob análise contínua",
      color: "#06D6A0",
      progress: 100,
      icon: "👥"
    },
    { 
      number: "32%", 
      label: "Redução de Absenteísmo",
      description: "Queda significativa em faltas",
      color: "#EF476F",
      progress: 32,
      icon: "📉"
    },
    { 
      number: "24/7", 
      label: "Monitoramento Ativo",
      description: "Análise em tempo real",
      color: "#118AB2",
      progress: 100,
      icon: "🔄"
    },
  ];

  const ProgressRing = ({ progress, color, size = 80 }) => {
    const strokeWidth = 6;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
      </div>
    );
  };

  return (
    <section className="bg-gradient-to-br from-[#1a002b] to-[#2d0066] py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-purple-500 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-pink-500 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-blue-500 rounded-full blur-xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-extrabold sm:text-5xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Confiança em Números
          </h2>
          <p className="mt-4 text-xl text-[#cdb7ff] max-w-2xl mx-auto">
            Resultados reais de empresas que transformaram sua gestão com nossa tecnologia
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500 hover:transform hover:scale-105"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              whileHover={{ y: -5 }}
            >
              {/* Icon */}
              <div className="text-3xl mb-4">{stat.icon}</div>
              
              {/* Progress Ring */}
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <ProgressRing progress={stat.progress} color={stat.color} size={100} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">{stat.number}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-2">{stat.label}</h3>
              <p className="text-sm text-[#cdb7ff] opacity-80">{stat.description}</p>
              
              {/* Hover Effect */}
              <div 
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(45deg, ${stat.color}20, transparent)`
                }}
              ></div>
            </motion.div>
          ))}
        </div>

        {/* Additional Visual Chart */}
        <motion.div
          className="mt-16 bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <h3 className="text-2xl font-bold text-white mb-6">Evolução dos Resultados</h3>
          <div className="flex items-end justify-center space-x-4 h-32">
            {[30, 45, 65, 85, 98].map((height, index) => (
              <motion.div
                key={index}
                className="w-12 bg-gradient-to-t from-purple-500 to-pink-500 rounded-t-lg relative group"
                initial={{ height: 0 }}
                whileInView={{ height: `${height}%` }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.8 }}
              >
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {height}%
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center space-x-4 mt-4 text-sm text-[#cdb7ff]">
            {['Mês 1', 'Mês 2', 'Mês 3', 'Mês 4', 'Mês 5'].map((label, index) => (
              <div key={index}>{label}</div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;