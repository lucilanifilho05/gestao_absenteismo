import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/analise';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const result = await login(email, password);

    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  const handleDemoLogin = () => {
    setEmail('admin@empresa.com');
    setPassword('admin123');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#6c2eec] via-[#8c5cff] to-[#a98aff] p-6">
      <div className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 transition-all animate-fadeIn">
        {/* Logo e Título */}
        <div className="text-center mb-8">
          <div onClick={() => navigate('/')} className="cursor-pointer transition-transform hover:scale-110">
            <img
                src="/logoroxa.png"
                alt="Logo"
                className="mx-auto w-35 h-35 object-contain"
            />
          </div>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">
            Bem-vindo de volta 👋
          </h2>
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
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-[#6c2eec] focus:border-[#6c2eec] sm:text-sm"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-[#6c2eec] focus:border-[#6c2eec] sm:text-sm"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 p-4">
              <p className="text-sm text-red-700 font-medium">{error}</p>
            </div>
          )}

          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-700">
              <input
                type="checkbox"
                className="h-4 w-4 text-[#6c2eec] border-gray-300 rounded focus:ring-[#6c2eec]"
              />
              <span className="ml-2">Lembrar-me</span>
            </label>
            <a href="#" className="text-sm font-medium text-[#6c2eec] hover:underline">
              Esqueceu sua senha?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-lg text-white font-medium bg-[#6c2eec] hover:bg-[#5a25c7] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6c2eec] disabled:opacity-50 transition"
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

          <div className="text-center mt-4">
            <button
              type="button"
              onClick={handleDemoLogin}
              className="text-sm text-[#6c2eec] hover:underline"
            >
              Usar credenciais de demonstração
            </button>
          </div>
        </form>

        {/* Credenciais de demonstração */}
        <div className="mt-6 bg-gray-50 rounded-lg p-4 text-sm text-gray-700">
          <h4 className="font-medium mb-1">Credenciais de Demonstração:</h4>
          <p><strong>Email:</strong> admin@empresa.com</p>
          <p><strong>Senha:</strong> admin123</p>
        </div>

        {/* Rodapé */}
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
