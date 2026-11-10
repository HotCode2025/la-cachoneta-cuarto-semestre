import { Navigate, Outlet } from "react-router";

/** Restringe el acceso a las rutas para usuarios autenticados. */
export default function ProtectedRoute() {
  const token = localStorage.getItem("token");

  // Redirige al login cuando no existe una sesión activa.
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
