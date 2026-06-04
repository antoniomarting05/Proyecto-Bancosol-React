import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '/src/services/authService';

export default function RutaProtegida({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}