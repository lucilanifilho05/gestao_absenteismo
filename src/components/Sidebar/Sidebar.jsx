import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// Menu para Admin
const ADMIN_NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", path: "/dashboard", icon: DashboardIcon },
  { id: "analise", label: "Análise de Absenteísmo", path: "/analise", icon: ChartIcon },
  { id: "gestao-ausencias", label: "Gestão de Ausências", path: "/gestao-ausencias", icon: UsersIcon },
  { id: "risk-scoring", label: "Risk Scoring", path: "/risk-scoring", icon: TargetIcon },
  { id: "analytics-saude", label: "Analytics Saúde", path: "/analytics-saude", icon: HeartIcon },
];

// Menu para Colaborador
const COLABORADOR_NAV_ITEMS = [
  { id: "meu-painel", label: "Meu Painel", path: "/meu-painel", icon: DashboardIcon },
  { id: "minhas-ausencias", label: "Minhas Ausências", path: "/minhas-ausencias", icon: UsersIcon },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  // estado inicial compatível com SSR e navegadores antigos
  const getIsMobile = () =>
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(max-width: 1023px)").matches;

  const [isMobile, setIsMobile] = useState(getIsMobile());
  const [open, setOpen] = useState(() => (getIsMobile() ? false : true));
  const [confirmLogout, setConfirmLogout] = useState(false);

  // Selecionar menu baseado na role do usuário
  const NAV_ITEMS = useMemo(() => {
    if (user?.role === 'admin') {
      return ADMIN_NAV_ITEMS;
    } else if (user?.role === 'colaborador') {
      return COLABORADOR_NAV_ITEMS;
    }
    // Fallback para usuários sem role definida
    return COLABORADOR_NAV_ITEMS;
  }, [user?.role]);

  // media query listener (com fallback addListener/removeListener)
  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;

    const mq = window.matchMedia("(max-width: 1023px)");
    const onChange = (e) => {
      const matches = e?.matches ?? mq.matches;
      setIsMobile(matches);
      setOpen(!matches); // desktop abre, mobile fecha
    };

    if (mq.addEventListener) {
      mq.addEventListener("change", onChange);
    } else if (mq.addListener) {
      mq.addListener(onChange);
    }
    // sincroniza no mount
    onChange(mq);

    return () => {
      if (mq.removeEventListener) {
        mq.removeEventListener("change", onChange);
      } else if (mq.removeListener) {
        mq.removeListener(onChange);
      }
    };
  }, []);

  const isActive = (p) => location.pathname === p;

  const initials = useMemo(() => {
    const name = user?.name || "Usu";
    const parts = name.split(" ").filter(Boolean);
    return (parts[0]?.[0] || "U") + (parts[1]?.[0] || "");
  }, [user]);

  const handleNav = (path) => {
    navigate(path);
    if (isMobile) setOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    setConfirmLogout(false);
    navigate("/login");
  };

  // Função para obter informações do usuário para exibição
  const getUserDisplayInfo = () => {
    if (!user) return { name: "Usuário", email: "", cargo: "", setor: "" };
    
    return {
      name: user.name || "Usuário",
      email: user.email || "",
      cargo: user.cargo || (user.role === 'admin' ? 'Administrador' : 'Colaborador'),
      setor: user.setor || ""
    };
  };

  const userInfo = getUserDisplayInfo();

  return (
    <>
      {/* Toggle (mobile) */}
      {isMobile && (
        <button
          onClick={() => setOpen(true)}
          className="fixed left-4 top-4 z-[60] inline-flex items-center justify-center rounded-xl bg-violet-600 p-3 text-white shadow-lg outline-none ring-offset-2 transition hover:bg-violet-700 focus-visible:ring-2 focus-visible:ring-violet-400 lg:hidden"
          aria-label="Abrir menu"
        >
          <BurgerIcon />
        </button>
      )}

      {/* Overlay (mobile) */}
      {isMobile && open && (
        <button
          className="fixed inset-0 z-[55] bg-black/40 backdrop-blur-[1px]"
          onClick={() => setOpen(false)}
          aria-label="Fechar menu"
        />
      )}

      {/* Sidebar */}
      <aside
        className={[
          // Altura correta no mobile (dvh) + safe area inferior p/ iOS
          "fixed z-[70] flex h-[100dvh] flex-col pb-[env(safe-area-inset-bottom)]",
          // Visual e bordas
          "border-r border-violet-100/60 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85 shadow-sm",
          // Transições + posições
          "transition-[transform,width] duration-300 ease-in-out",
          isMobile ? (open ? "translate-x-0" : "-translate-x-full") : "translate-x-0",
          open ? "w-[280px]" : "w-[80px]",
          "lg:static lg:translate-x-0 lg:h-screen",
        ].join(" ")}
        role="navigation"
        aria-label="Barra lateral"
      >
        {/* Cabeçalho / Logo */}
        <div className="flex h-16 items-center gap-3 px-4 shrink-0">
          <button
            onClick={() => navigate(user?.role === 'admin' ? "/dashboard" : "/meu-painel")}
            className="inline-flex items-center gap-3 rounded-xl px-2 py-1 outline-none ring-offset-2 transition focus-visible:ring-2 focus-visible:ring-violet-400"
            aria-label="Ir para a página inicial"
          >
            <img src="./isotipo.png" alt="Seraphinys" className="h-9 w-9 rounded-lg object-contain ring-1 ring-black/5" />
            {open && (
              <div className="text-left">
                <div className="text-sm font-semibold text-gray-900">Seraphinys</div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-gray-500">
                  {user?.role === 'admin' ? 'Admin Console' : 'Colaborador'}
                </div>
              </div>
            )}
          </button>

          {/* Botão colapsar (desktop) */}
          {!isMobile && (
            <button
              onClick={() => setOpen((v) => !v)}
              className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-lg text-gray-600 outline-none ring-offset-2 transition hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-violet-400"
              aria-label={open ? "Recolher barra lateral" : "Expandir barra lateral"}
              title={open ? "Recolher" : "Expandir"}
            >
              {open ? <CollapseIcon /> : <ExpandIcon />}
            </button>
          )}
        </div>

        {/* Trilho do ativo (área rolável) */}
        <div className="relative mt-2 flex-1 min-h-0 overflow-y-auto overscroll-contain px-2">
          <div className="absolute inset-y-0 left-[34px] w-px bg-gradient-to-b from-violet-200 via-violet-100 to-transparent" aria-hidden />

          <nav className="space-y-1">
            {NAV_ITEMS.map(({ id, label, path, icon: Icon }) => {
              const active = isActive(path);
              return (
                <button
                  key={id}
                  onClick={() => handleNav(path)}
                  className={[
                    "group relative flex w-full items-center rounded-xl px-2 py-2.5 text-left outline-none ring-offset-2 transition",
                    active ? "bg-violet-50 text-violet-800 ring-1 ring-violet-200" : "text-gray-700 hover:bg-gray-100",
                  ].join(" ")}
                  aria-current={active ? "page" : undefined}
                  title={open ? undefined : label}
                >
                  <span className="relative mr-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white text-gray-700 shadow-sm ring-1 ring-black/5 group-hover:ring-black/10">
                    {/* Marcador ativo */}
                    {active && <span className="absolute -left-[22px] h-9 w-[3px] rounded-full bg-violet-500" aria-hidden />}
                    <Icon className="h-5 w-5" />
                  </span>
                  {open && <span className="text-sm font-medium truncate">{label}</span>}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Rodapé: usuário + sair (sempre visível) */}
        <div className="sticky bottom-0 z-10 border-t border-gray-100 p-3 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85 shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-600 text-white shadow-sm">
              <span className="text-xs font-semibold">{user?.avatar || initials}</span>
            </div>
            {open && (
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900">{userInfo.name}</p>
                <p className="truncate text-xs text-gray-500">
                  {userInfo.cargo}
                  {userInfo.setor && ` • ${userInfo.setor}`}
                </p>
                {userInfo.email && (
                  <p className="truncate text-xs text-gray-400 mt-0.5">{userInfo.email}</p>
                )}
              </div>
            )}
            <button
              onClick={() => setConfirmLogout(true)}
              className="ml-auto inline-flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 outline-none ring-offset-2 transition hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-violet-400"
              title="Sair"
              aria-label="Sair do sistema"
            >
              <LogoutIcon />
            </button>
          </div>
        </div>
      </aside>

      {/* Modal de logout */}
      {confirmLogout && (
        <div className="fixed inset-0 z-[80] grid place-items-center bg-black/40 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900">Confirmar saída</h3>
            <p className="mt-1 text-sm text-gray-600">Tem certeza de que deseja sair do sistema?</p>
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => setConfirmLogout(false)}
                className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-700"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ---------------- Icons ---------------- */
function BurgerIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}
function CollapseIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  );
}
function ExpandIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}
function LogoutIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 20a2 2 0 01-2 2H7a2 2 0 01-2-2V4a2 2 0 012-2h4a2 2 0 012 2" />
    </svg>
  );
}
function ChartIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v18h18" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 15l4-4 3 3 5-6" />
    </svg>
  );
}
function UsersIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 11c1.657 0 3-1.79 3-4s-1.343-4-3-4-3 1.79-3 4 1.343 4 3 4zM8 13c1.657 0 3-1.79 3-4S9.657 5 8 5 5 6.79 5 9s1.343 4 3 4z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2 21c0-2.761 2.91-5 6.5-5 1.87 0 3.54.54 4.7 1.42M14 16.07C15.17 15.39 16.73 15 18.5 15 22.09 15 25 17.24 25 20" />
    </svg>
  );
}
function TargetIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" {...props}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
function HeartIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" />
    </svg>
  );
}
function DashboardIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" {...props} >
      <rect x="3" y="3" width="7" height="7" rx="1" ry="1" />
      <rect x="14" y="3" width="7" height="4" rx="1" ry="1" />
      <rect x="14" y="9" width="7" height="12" rx="1" ry="1" />
      <rect x="3" y="12" width="7" height="9" rx="1" ry="1" />
    </svg>
  );
}
function PlusIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  );
}