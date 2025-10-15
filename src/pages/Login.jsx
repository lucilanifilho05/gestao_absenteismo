import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Função para determinar o redirecionamento correto baseado no usuário
  const getRedirectPath = (user) => {
    // Se veio de uma página específica, mantém o destino
    if (location.state?.from?.pathname) {
      return location.state.from.pathname;
    }
    
    // Redireciona para a página inicial correta baseada na role
    if (user?.role === 'admin') {
      return "/dashboard";
    } else {
      return "/meu-painel";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await login(email.trim(), password);

    if (result?.success) {
      // Obtém o usuário do AuthContext após o login bem-sucedido
      const user = JSON.parse(localStorage.getItem('user'));
      const redirectPath = getRedirectPath(user);
      navigate(redirectPath, { replace: true });
    } else {
      setError(result?.error || "Não foi possível entrar. Tente novamente.");
    }

    setLoading(false);
  };

  const handleDemoLogin = (role = 'admin') => {
    if (role === 'admin') {
      setEmail("admin@empresa.com");
      setPassword("123456");
    } else {
      setEmail("joao.silva@empresa.com");
      setPassword("123456");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#776ba7] p-6">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-md p-8">
        {/* Logo e Título */}
        <div className="text-center mb-8">
          <div
            onClick={() => navigate("/")}
            className="cursor-pointer transition-transform hover:scale-105"
          >
            <img
              src="./logoroxa.png"
              alt="Logo"
              className="mx-auto w-20 h-20 object-contain"
            />
          </div>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">Bem-vindo</h2>
          <p className="text-gray-600 mt-2 text-sm">
            Faça login para acessar sua conta
          </p>
        </div>

        {/* Formulário */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-violet-500 focus:border-violet-500 sm:text-sm"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-violet-500 focus:border-violet-500 sm:text-sm"
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-violet-600 focus:outline-none"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18M10.585 10.585A2 2 0 0112 10a2 2 0 012 2c0 .414-.126.798-.341 1.115M9.88 9.88A4 4 0 0116 12c0 .78-.224 1.504-.608 2.111M6.72 6.72C5.077 7.73 3.77 9.106 3 12c2.25 5 7.5 7 9 7 1.02 0 3.92-.81 6.28-3.17M13.06 13.06A4 4 0 0110.94 10.94" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12zm10-3a3 3 0 100 6 3 3 0 000-6z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 p-3">
              <p className="text-sm text-red-700 font-medium">{error}</p>
            </div>
          )}

          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-700">
              <input
                type="checkbox"
                className="h-4 w-4 text-violet-600 border-gray-300 rounded focus:ring-violet-500"
              />
              <span className="ml-2">Lembrar-me</span>
            </label>
            <a href="#" className="text-sm font-medium text-violet-600 hover:underline">
              Esqueceu sua senha?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-lg text-white font-medium bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 disabled:opacity-50 transition"
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Entrando...
              </div>
            ) : (
              'Entrar'
            )}
          </button>

          <div className="text-center mt-4 space-y-2">
            <button
              type="button"
              onClick={() => handleDemoLogin('admin')}
              className="text-sm text-violet-600 hover:underline block w-full"
            >
              Usar credenciais de administrador
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('colaborador')}
              className="text-sm text-violet-600 hover:underline block w-full"
            >
              Usar credenciais de colaborador
            </button>
          </div>
        </form>        

        <div className="text-center mt-8">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Seraphinys. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;