import { Routes, Route, Outlet } from "react-router-dom";
import { Container } from "./components/ui";
import { ProtectedRoute } from "./components/ProtectedRoutes";
import { useAuth } from "./context/AuthContext";
import { TareasProvider } from "./context/TareasContext";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import TareasPage from "./pages/TareasPage";
import TareaFormPage from "./pages/TareaFormPage";
import NotFound from "./pages/NotFound";
import Navbar from "./components/navbar/Navbar";

function App() {
  const { isAuth, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-[calc(100vh-64px)] flex items-center justify-center">
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Container>
        <Routes>
          <Route
            element={
              <ProtectedRoute isAllowed={!isAuth} redirectTo="/tareas" />
            }
          >
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          <Route
            element={<ProtectedRoute isAllowed={isAuth} redirectTo="/login" />}
          >
            <Route path="/perfil" element={<ProfilePage />} />

            <Route
              element={
                <TareasProvider>
                  <Outlet />
                </TareasProvider>
              }
            >
              <Route path="/tareas" element={<TareasPage />} />
              <Route path="/tareas/crear" element={<TareaFormPage />} />
              <Route path="/tareas/:id/editar" element={<TareaFormPage />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
