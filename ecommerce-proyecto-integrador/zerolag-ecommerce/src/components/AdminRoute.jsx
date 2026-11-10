import { Navigate, Outlet } from "react-router";

/** Restringe el acceso a las rutas de administración. */
export default function AdminRoute() {
  const token = localStorage.getItem("token");
  const usuarioString = localStorage.getItem("usuario");
  const usuarioJson = JSON.parse(usuarioString);

  // Redirige a la página principal si el usuario no tiene permisos.
  if (!token || usuarioJson.rol !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
