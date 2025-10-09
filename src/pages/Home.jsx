import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useSEO } from "../hooks/useSEO"; // novo hook SEO

const Home = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  // 🔹 Novo SEO dinâmico nativo
  useSEO({
    title: "Seraphinys | Inteligência Preditiva para Gestão de Absenteísmo",
    description:
      "Transforme a gestão de ausências com IA preditiva. Reduza o absenteísmo e aumente a produtividade com a Seraphinys.",
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      icon: "📊",
      title: "Análise de Absenteísmo",
      description:
        "Dashboards interativos com dados precisos sobre comportamento e desempenho organizacional.",
      path: "/analise",
    },
    {
      icon: "👥",
      title: "Gestão de Ausências",
      description:
        "Controle detalhado de faltas e padrões de comportamento em tempo real.",
      path: "/gestao-ausencias",
    },
    {
      icon: "🎯",
      title: "Risk Scoring",
      description:
        "Predição proativa de ausências com base em IA e histórico de comportamento.",
      path: "/risk-scoring",
    },
    {
      icon: "❤️",
      title: "Analytics Saúde",
      description:
        "Visualize métricas de saúde e absenteísmo em tempo real para decisões mais assertivas e gestão proativa.",
      path: "/analytics-saude",
    },
  ];

  const stats = [
    { number: "98%", label: "Precisão Preditiva" },
    { number: "156", label: "Colaboradores Monitorados" },
    { number: "32%", label: "Redução de Absenteísmo" },
    { number: "24/7", label: "Monitoramento Ativo" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9f7ff] to-[#eef0ff] text-gray-900">
      {/* HEADER */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-4 flex justify-between items-center">
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-3 cursor-pointer"
          >
            <img
              src="/isotipo.png"
              alt="Seraphinys"
              className="w-10 h-10 object-contain"
            />
            <span
              className={`text-xl font-bold transition-colors ${
                scrolled ? "text-gray-900" : "text-white"
              }`}
            >
              Seraphinys
            </span>
          </div>

          <nav className="hidden md:flex gap-8 items-center">
            {[
              { name: "Início", path: "/" },
              { name: "Análise", path: "/analise" },
              { name: "Dashboard", path: "/dashboard" },
              { name: "Contato", path: "/contato" },
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className={`text-base font-medium transition-colors ${
                  scrolled
                    ? "text-gray-800 hover:text-[#6c3cff]"
                    : "text-white hover:text-[#e3d8ff]"
                }`}
              >
                {item.name}
              </button>
            ))}
            <button
              onClick={() => navigate("/login")}
              className={`ml-4 px-5 py-2 rounded-md font-medium transition-all ${
                scrolled
                  ? "bg-[#6c3cff] text-white hover:bg-[#5a2ed4]"
                  : "bg-white/20 text-purple-700 border border-white/30 hover:bg-white/30"
              }`}
            >
              Login
            </button>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="relative">
        <div className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden">
          <img
            src="/banner_home.webp"
            alt="Painel Seraphinys"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a002b]/90 via-[#2d0a52]/70 to-transparent" />
          <motion.div
            className="relative z-10 max-w-3xl text-center text-white px-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Reduza o absenteísmo com inteligência preditiva
            </h1>            
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-base text-[#6c3cff] font-semibold uppercase tracking-wider">
              Funcionalidades
            </h2>
            <p className="mt-2 text-3xl font-extrabold sm:text-4xl">
              Tudo que você precisa em uma plataforma
            </p>
            <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-lg">
              Ferramentas completas para monitorar, analisar e agir com precisão.
            </p>
          </motion.div>

          <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <motion.div
                key={i}
                onClick={() => navigate(f.path)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:border-[#6c3cff]/40 transition cursor-pointer group"
              >
                <div className="w-14 h-14 flex items-center justify-center text-3xl mb-4 bg-gradient-to-br from-[#6c3cff]/10 to-[#9c83ff]/20 text-[#6c3cff] rounded-xl">
                  {f.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-[#6c3cff] transition">
                  {f.title}
                </h3>
                <p className="text-gray-500">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-[#1a002b] py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 text-center">
          <motion.h2
            className="text-3xl font-extrabold text-white sm:text-4xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Confiança em Números
          </motion.h2>
          <p className="mt-3 text-lg text-[#cdb7ff]">
            Resultados reais de empresas que transformaram sua gestão
          </p>

          <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-4xl font-extrabold text-white">
                  {stat.number}
                </div>
                <div className="text-lg text-[#cdb7ff] mt-2">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-20">
        <motion.div
          className="max-w-6xl mx-auto bg-gradient-to-r from-[#6c3cff] to-[#5b2ad8] rounded-2xl shadow-xl px-8 py-16 text-center text-white"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Pronto para transformar sua gestão?
          </h2>
          <p className="mt-4 text-lg text-[#e9d9ff]">
            Descubra como a Seraphinys pode reduzir custos e melhorar o bem-estar da sua equipe.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => navigate("/analise")}
              className="bg-white text-[#6c3cff] px-6 py-3 rounded-lg font-semibold hover:bg-[#f5efff] transition"
            >
              Experimentar Gratuitamente
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
            >
              Agendar Demonstração
            </button>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#150028] text-gray-300">
        <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">
          <div>
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <img src="/logo.png" alt="Seraphinys" className="w-8 h-8" />
              <span className="text-xl font-bold text-white">Seraphinys</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed">
              Plataforma inteligente para monitoramento e prevenção do absenteísmo.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Soluções
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Para Empresas</a></li>
              <li><a href="#" className="hover:text-white">Para RH</a></li>
              <li><a href="#" className="hover:text-white">Para Gestores</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Suporte
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Documentação</a></li>
              <li><a href="#" className="hover:text-white">FAQ</a></li>
              <li><a href="#" className="hover:text-white">Contato</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 text-center py-6 text-sm">
          &copy; 2025 Seraphinys. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
};

export default Home;
