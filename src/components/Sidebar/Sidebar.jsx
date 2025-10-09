import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const menuItems = [
    {
      id: 'analise',
      label: 'Análise de Absenteísmo',
      icon: '📈',
      path: '/analise'
    },
    {
      id: 'gestao-ausencias',
      label: 'Gestão de Ausências',
      icon: '👥',
      path: '/gestao-ausencias'
    },
    {
      id: 'risk-scoring',
      label: 'Risk Scoring',
      icon: '🎯',
      path: '/risk-scoring'
    },
    {
      id: 'analytics-saude',
      label: 'Analytics Saúde',
      icon: '❤️',
      path: '/analytics-saude'
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMenuClick = (path) => {
    navigate(path);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    logout();
    setShowLogoutConfirm(false);
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Botão hambúrguer (mobile) */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-3 rounded-md bg-[#6c2eec] text-white shadow-lg hover:bg-[#5b24ca] transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      )}

      {/* Overlay para capturar cliques no mobile */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Modal de confirmação de logout */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Confirmar Saída
            </h3>
            <p className="text-gray-600 mb-4">
              Tem certeza que deseja sair do sistema?
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-2 text-white bg-[#6c2eec] rounded-md hover:bg-[#5b24ca] transition-colors"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed md:relative z-40 h-full bg-[#6c2eec] text-white flex flex-col
          transition-all duration-300 ease-in-out
          ${sidebarOpen ? 'w-64 translate-x-0 shadow-2xl' : 'w-0 -translate-x-full md:translate-x-0 md:w-16'}
          ${isMobile && !sidebarOpen ? 'hidden' : 'block'}
        `}
      >
        {/* Logo (imagem) */}
        <div
          className={`p-4 border-b border-[#5b24ca] flex-shrink-0 flex items-center justify-center cursor-pointer ${!sidebarOpen && 'md:p-3'}`}
          onClick={() => navigate('/')}
        >
          <img
            src="/logo.png"
            alt="Logo GestãoAbs"
            className={`transition-all duration-300 object-contain rounded-lg
              ${sidebarOpen ? 'w-32 h-auto' : 'w-10 h-10 md:w-8 md:h-8'}
            `}
          />
        </div>

        {/* Menu de navegação */}
        <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
          {menuItems.map((menu) => (
            <button
              key={menu.id}
              onClick={() => handleMenuClick(menu.path)}
              className={`
                w-full flex items-center p-3 rounded-lg transition-all duration-200
                ${
                  isActive(menu.path)
                    ? 'bg-[#5b24ca] text-white shadow-md'
                    : 'text-[#d5baff] hover:bg-[#5b24ca] hover:text-white'
                }
                ${sidebarOpen ? 'justify-start space-x-3' : 'justify-center md:justify-center'}
                ${!sidebarOpen && 'md:p-2'}
              `}
              title={!sidebarOpen ? menu.label : ''}
            >
              <span
                className={`flex-shrink-0 ${
                  sidebarOpen ? 'text-lg' : 'text-xl md:text-lg'
                }`}
              >
                {menu.icon}
              </span>
              <span
                className={`
                  font-medium whitespace-nowrap transition-all duration-200
                  ${sidebarOpen ? 'opacity-100' : 'opacity-0 absolute md:opacity-0'}
                `}
              >
                {menu.label}
              </span>
            </button>
          ))}
        </nav>

        {/* Informações do usuário e logout */}
        <div
          className={`p-3 border-t border-[#5b24ca] flex-shrink-0 ${
            !sidebarOpen && 'md:p-2'
          }`}
        >
          <div
            className={`flex items-center ${
              sidebarOpen
                ? 'space-x-3'
                : 'justify-center md:justify-center'
            }`}
          >
            <div
              className={`bg-[#5b24ca] rounded-full flex items-center justify-center flex-shrink-0 ${
                sidebarOpen
                  ? 'w-8 h-8'
                  : 'w-10 h-10 md:w-8 md:h-8'
              }`}
            >
              <span className="text-sm">{user?.avatar || '👤'}</span>
            </div>
            
            <div
              className={`${
                sidebarOpen
                  ? 'block flex-1'
                  : 'hidden md:hidden'
              } overflow-hidden transition-all duration-300`}
            >
              <p className="text-sm font-medium whitespace-nowrap">
                {user?.name || 'Administrador'}
              </p>
              <p className="text-xs text-[#d5baff] whitespace-nowrap">
                {user?.email || 'admin@empresa.com'}
              </p>
            </div>

            {/* Botão de logout - visível apenas quando sidebar está expandida */}
            {sidebarOpen && (
              <button
                onClick={() => setShowLogoutConfirm(true)}
                className="p-2 text-[#d5baff] hover:text-white hover:bg-[#5b24ca] rounded-md transition-all duration-200"
                title="Sair do sistema"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </button>
            )}

            {/* Ícone de logout quando sidebar recolhida */}
            {!sidebarOpen && (
              <button
                onClick={() => setShowLogoutConfirm(true)}
                className="p-2 text-[#d5baff] hover:text-white hover:bg-[#5b24ca] rounded-md transition-all duration-200 md:block hidden"
                title="Sair do sistema"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </button>
            )}
          </div>

          {/* Botão de logout expandido para mobile quando sidebar recolhida */}
          {!sidebarOpen && isMobile && (
            <div className="mt-2 flex justify-center">
              <button
                onClick={() => setShowLogoutConfirm(true)}
                className="p-2 text-[#d5baff] hover:text-white hover:bg-[#5b24ca] rounded-md transition-all duration-200"
                title="Sair do sistema"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;