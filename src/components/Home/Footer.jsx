import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#150028] text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">
        <div>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src="./logo.png" alt="Seraphinys" className="w-8 h-8" />
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
  );
};

export default Footer;