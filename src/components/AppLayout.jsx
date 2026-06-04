import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import RutaProtegida from './RutaProtegida'; 
import LoginPage from '../pages/AuthPage';
import TiendaPage from '../pages/TiendaPage';

export default function AppLayout() {
  const location = useLocation();
  const esPantallaLogin = location.pathname === '/login';

  return (
    <>
      {!esPantallaLogin && <Navbar />}

      <div className="page-content" style={{ padding: esPantallaLogin ? '0px' : '20px' }}>
        <Routes>
          <Route path="/" element={<Navigate to="/tiendas" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/tiendas" element={<RutaProtegida><TiendaPage /></RutaProtegida>} />
        </Routes>
      </div>
    </>
  );
}