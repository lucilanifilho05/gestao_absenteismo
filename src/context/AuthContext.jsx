import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se há usuário salvo no localStorage ao carregar a aplicação
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Simulação de API de login - substituir por chamada real
      const users = {
        'admin@empresa.com': {
          id: 1,
          name: 'Administrador',
          email: 'admin@empresa.com',
          role: 'admin',
          avatar: '👤',
          setor: 'Gestão',
          cargo: 'Administrador do Sistema'
        },
        'joao.silva@empresa.com': {
          id: 2,
          name: 'João Silva',
          email: 'joao.silva@empresa.com',
          role: 'colaborador',
          avatar: '👨‍💼',
          setor: 'Produção',
          cargo: 'Operador de Máquinas'
        },
        'maria.santos@empresa.com': {
          id: 3,
          name: 'Maria Santos',
          email: 'maria.santos@empresa.com',
          role: 'colaborador',
          avatar: '👩‍💼',
          setor: 'Qualidade',
          cargo: 'Analista de Qualidade'
        }
      };

      if (users[email] && password === '123456') {
        const userData = users[email];
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return { success: true };
      } else {
        return { success: false, error: 'Credenciais inválidas' };
      }
    } catch (error) {
      return { success: false, error: 'Erro ao fazer login' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const hasPermission = (requiredRole) => {
    if (!user) return false;
    if (requiredRole === 'any') return true;
    return user.role === requiredRole;
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user,
    hasPermission
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};