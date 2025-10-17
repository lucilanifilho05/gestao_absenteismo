import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import AnaliseAbsenteismo from './pages/AnaliseAbsenteismo';
import GestaoAusencias from './pages/GestaoAusencias';
import RiskScoring from './pages/RiskScoring';
import AnalyticsSaude from './pages/AnalyticsSaude';
import Dashboard from './pages/Dashboard';
import Unauthorized from './pages/Unauthorized';
import MeuPainel from './pages/MeuPainel';
import MinhasAusencias from './pages/MinhasAusencias';
import PulsoSemanal from './pages/PulsoSemanal';
import BemEstar from './pages/BemEstar';
import CanalDireto from './pages/CanalDireto';
import EspacoCuidar from './pages/EspacoCuidar';
import IncentivosAdmin from './pages/IncentivosAdmin';
import IncentivosColaborador from './pages/IncentivosColaborador';

// Componente para rotas públicas quando autenticado
const PublicRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  
  if (isAuthenticated) {
    // Redireciona para a página inicial correta baseada na role
    if (user?.role === 'admin') {
      return <Navigate to="/dashboard" replace />;
    } else {
      return <Navigate to="/meu-painel" replace />;
    }
  }
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router basename={import.meta.env.PROD ? '/gestao_absenteismo/' : '/'}>
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

          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Rotas exclusivas para Admin */}
          <Route path="/dashboard" element={
            <ProtectedRoute requiredRole="admin">
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/analise" element={
            <ProtectedRoute requiredRole="admin">
              <Layout>
                <AnaliseAbsenteismo />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/gestao-ausencias" element={
            <ProtectedRoute requiredRole="admin">
              <Layout>
                <GestaoAusencias />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/risk-scoring" element={
            <ProtectedRoute requiredRole="admin">
              <Layout>
                <RiskScoring />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/analytics-saude" element={
            <ProtectedRoute requiredRole="admin">
              <Layout>
                <AnalyticsSaude />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/incentivos-admin" element={
            <ProtectedRoute requiredRole="admin">
              <Layout>
                <IncentivosAdmin />
              </Layout>
            </ProtectedRoute>
          } />

          {/* Rotas exclusivas para Colaborador */}
          <Route path="/meu-painel" element={
            <ProtectedRoute requiredRole="colaborador">
              <Layout>
                <MeuPainel />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/minhas-ausencias" element={
            <ProtectedRoute requiredRole="colaborador">
              <Layout>
                <MinhasAusencias />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/pulso-semanal" element={
            <ProtectedRoute requiredRole="colaborador">
              <Layout>
                <PulsoSemanal />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/meu-wellbeing" element={
            <ProtectedRoute requiredRole="colaborador">
              <Layout>
                <BemEstar />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/canal-direto" element={
            <ProtectedRoute requiredRole="colaborador">
              <Layout>
                <CanalDireto />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/espaco-cuidar" element={
            <ProtectedRoute requiredRole="colaborador">
              <Layout>
                <EspacoCuidar />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/incentivos-colaborador" element={
            <ProtectedRoute requiredRole="colaborador">
              <Layout>
                <IncentivosColaborador />
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