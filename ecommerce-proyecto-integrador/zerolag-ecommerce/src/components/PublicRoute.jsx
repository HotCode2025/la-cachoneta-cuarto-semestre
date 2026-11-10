import { Navigate, Outlet } from "react-router";

/** Evita que usuarios autenticados accedan a rutas públicas como el login. */
export default function PublicRoute() {
  const token = localStorage.getItem("token");

  // Redirige al inicio cuando ya existe una sesión activa.
  if (token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
