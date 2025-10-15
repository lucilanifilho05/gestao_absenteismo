import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const CTA = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-28 overflow-hidden">
      {/* BG: grid sutil + blobs de glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(108,60,255,0.08)_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-[#6c3cff]/20 blur-[160px] rounded-full" />
        <div className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] bg-[#9c83ff]/20 blur-[140px] rounded-full" />
      </div>

      <motion.div
        className="relative max-w-6xl mx-auto px-6 sm:px-10"
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Card com vidro + borda gradiente animada */}
        <div className="relative rounded-3xl p-[2px] bg-gradient-to-r from-[#6c3cff] via-[#8a73ff] to-[#5b2ad8]">
          <div className="relative rounded-3xl bg-white/70 backdrop-blur-xl overflow-hidden">
            {/* brilho diagonal suave */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.6),transparent)] opacity-0 hover:opacity-100 transition-opacity duration-700" />
            {/* anel conic girando bem sutil no fundo */}
            <motion.div
              aria-hidden
              className="absolute -inset-32 rounded-full bg-[conic-gradient(from_0deg,rgba(108,60,255,0.08),transparent,rgba(156,131,255,0.08),transparent)]"
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            />
            <div className="relative z-10 px-8 sm:px-16 py-16 text-center">
              <motion.h2
                className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-[#2a186e] via-[#3d2aa3] to-[#6c3cff] bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05, duration: 0.6 }}
              >
                Pronto para transformar sua gestão?
              </motion.h2>

              <motion.p
                className="mt-4 text-lg sm:text-xl text-gray-700/90 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.6 }}
              >
                Descubra como a <span className="font-semibold text-[#6c3cff]">Seraphinys</span> pode reduzir custos
                e elevar o bem-estar da sua equipe com analytics em tempo real.
              </motion.p>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                {/* Botão primário com efeito magnético/press */}
                <motion.button
                  onClick={() => navigate('/analise')}
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative inline-flex items-center justify-center rounded-xl px-6 sm:px-7 py-3.5 font-semibold
                             text-white bg-gradient-to-r from-[#6c3cff] to-[#5b2ad8] shadow-[0_10px_25px_rgba(108,60,255,0.35)]
                             hover:shadow-[0_14px_32px_rgba(108,60,255,0.45)] transition-shadow"
                  aria-label="Experimentar Gratuitamente"
                >
                  <span className="relative z-10">Experimentar Gratuitamente</span>
                  {/* brilho que varre */}
                  <span className="pointer-events-none absolute inset-0 rounded-xl overflow-hidden">
                    <span className="absolute -inset-1 bg-[radial-gradient(circle_at_30%_-10%,rgba(255,255,255,0.25),transparent_40%),radial-gradient(circle_at_80%_120%,rgba(255,255,255,0.18),transparent_45%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </span>
                </motion.button>

                {/* Botão secundário vidro + borda sutil */}
                <motion.button
                  onClick={() => navigate('/dashboard')}
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center rounded-xl px-6 sm:px-7 py-3.5 font-semibold
                             text-[#3a2a7a] bg-white/60 backdrop-blur border border-[#6c3cff]/30
                             hover:bg-white/80 hover:border-[#6c3cff]/50 transition"
                  aria-label="Agendar Demonstração"
                >
                  Agendar Demonstração
                </motion.button>
              </div>

              {/* linha de confiança / social proof opcional */}
              <motion.div
                className="mt-8 text-sm text-gray-600/90"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.6 }}
              >
                Sem cartão de crédito • Cancelamento a qualquer momento • Suporte humano
              </motion.div>
            </div>
          </div>

          {/* Borda “viva” animada */}
          <motion.span
            aria-hidden
            className="pointer-events-none absolute -inset-[2px] rounded-3xl"
            style={{
              background:
                'conic-gradient(from 180deg at 50% 50%, rgba(108,60,255,0.25), rgba(156,131,255,0.15), rgba(108,60,255,0.25))',
              mask:
                'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
              WebkitMask:
                'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              padding: 2,
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default CTA;
