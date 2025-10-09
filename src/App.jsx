import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components//ProtectedRoute/ProtectedRoute';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Login from './pages/Login'
import AnaliseAbsenteismo from './pages/AnaliseAbsenteismo';
import GestaoAusencias from './pages/GestaoAusencias';
import RiskScoring from './pages/RiskScoring';
import AnalyticsSaude from './pages/AnalyticsSaude';

// Componente para rotas públicas quando autenticado
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/analise" replace /> : children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Página inicial pública */}
          <Route path="/" element={
            <PublicRoute>
              <Home />
            </PublicRoute>
          } />
          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          <Route path="/analise" element={
            <ProtectedRoute>
              <Layout>
                <AnaliseAbsenteismo />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/gestao-ausencias" element={
            <ProtectedRoute>
              <Layout>
                <GestaoAusencias />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/risk-scoring" element={
            <ProtectedRoute>
              <Layout>
                <RiskScoring />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/analytics-saude" element={
          <ProtectedRoute>
            <Layout>
              <AnalyticsSaude />
            </Layout>
          </ProtectedRoute>
          } />

          {/* Rota fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;