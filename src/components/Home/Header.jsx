import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const NAV_ITEMS = [
  { name: "Início", path: "/" },
  { name: "Análise", path: "/analise" },
  { name: "Dashboard", path: "/dashboard" },
  { name: "Contato", path: "/contato" },
];

const Header = ({ scrolled, menuOpen, setMenuOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-xl shadow-sm"
            : "bg-gradient-to-b from-violet-900/80 via-violet-800/60 to-transparent backdrop-blur-[2px]"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8">
          {/* Logo e título */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-3 cursor-pointer"
          >
            <img
              src="./isotipo.png"
              alt="Seraphinys"
              className="h-10 w-10 object-contain"
            />
            <span
              className={`text-xl font-bold transition-colors ${
                scrolled ? "text-gray-900" : "text-white"
              }`}
            >
              Seraphinys
            </span>
          </button>

          {/* Menu Desktop */}
          <nav className="hidden md:flex gap-8 items-center">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className={`relative text-base font-medium transition-colors ${
                  scrolled
                    ? "text-gray-800 hover:text-violet-700"
                    : "text-white hover:text-violet-200"
                }`}
              >
                {item.name}
                {isActive(item.path) && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-500"
                  />
                )}
              </button>
            ))}

            <button
              onClick={() => navigate("/login")}
              className={`ml-4 px-5 py-2 rounded-md font-medium transition-all ${
                scrolled
                  ? "bg-violet-600 text-white hover:bg-violet-700"
                  : "bg-white/20 text-white border border-white/30 hover:bg-white/30"
              }`}
            >
              Login
            </button>
          </nav>

          {/* Botão Mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(true)}
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke={scrolled ? "#111" : "#fff"}
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </>
  );
};

const MobileMenu = ({ menuOpen, setMenuOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <AnimatePresence>
      {menuOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
          />
          <motion.div
            className="fixed top-0 right-0 w-72 h-full bg-white shadow-xl z-50 flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
          >
            <div className="flex justify-between items-center p-4 border-b bg-gradient-to-r from-violet-600 to-fuchsia-500">
              <div className="flex items-center gap-3">
                <img
                  src="./isotipo.png"
                  alt="Seraphinys"
                  className="w-9 h-9 object-contain drop-shadow-sm"
                />
                <span className="text-lg font-bold text-white">Seraphinys</span>
              </div>
              <button onClick={() => setMenuOpen(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="#fff"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-col p-6 space-y-4">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    navigate(item.path);
                    setMenuOpen(false);
                  }}
                  className={`text-left text-gray-700 font-medium transition ${
                    isActive(item.path)
                      ? "text-violet-600"
                      : "hover:text-violet-600"
                  }`}
                >
                  {item.name}
                </button>
              ))}
              <button
                onClick={() => {
                  navigate("/login");
                  setMenuOpen(false);
                }}
                className="mt-4 bg-violet-600 text-white px-5 py-2 rounded-md font-medium hover:bg-violet-700 transition"
              >
                Login
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Header;
