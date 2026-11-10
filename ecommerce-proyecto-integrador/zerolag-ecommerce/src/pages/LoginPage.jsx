import { useState } from "react";
import LoginHeader from "./login/LoginHeader";
import RightCol from "./login/RightCol";
import Register from "./login/Register";
import Login from "./login/Login";
import axios from "axios";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext.jsx";

/** Gestiona el registro y el inicio de sesión de los usuarios. */
function LoginPage() {
  const [authTab, setAuthTab] = useState("login");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telefono, setTelefono] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { login } = useAuth();

  /** Registra una cuenta y autentica al usuario al finalizar. */
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      console.log(nombre, apellido, email, telefono, password);
      await axios.post("/api/usuarios", {
        nombre,
        apellido,
        email,
        telefono,
        pw: password,
      });

      console.log("Se ha registrado con exito!");
      // Inicia sesión automáticamente después de completar el registro.
      await handleLogin();
    } catch (error) {
      console.error("Error al intentar registrarse: ", error);
      setError("Error al registrarse. Verificá los datos ingresados.");
    }
  };

  /** Valida las credenciales e inicia la sesión del usuario. */
  const handleLogin = async (e) => {
    // Previene el envío tradicional cuando la función recibe un evento.
    if (e && e.preventDefault) e.preventDefault();

    setError(null);

    try {
      const response = await axios.post("/api/usuarios/login", {
        email,
        pw: password,
      });

      const { token, usuario } = response.data;

      // Guarda la sesión mediante el contexto de autenticación.
      login(token, usuario);

      console.log("Inicio de sesion exitoso");
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setError("Credenciales inválidas o error en el servidor.");
    }
  };

  return (
    <>
      <main className="w-full pt-[156px] bg-surface min-h-[calc(100vh-156px)]">
        <div className="flex flex-col w-full">
          <LoginHeader />

          <div className="max-w-[1320px] mx-auto px-margin-desktop py-space-xl w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-start">
              <div className="lg:col-span-7 bg-surface-container-lowest border border-surface-variant rounded-lg p-space-lg sm:p-space-xl">
                <div className="flex items-center justify-between border-b border-surface-variant pb-space-md mb-space-lg">
                  <div>
                    <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider font-bold">
                      Portal Clientes
                    </span>
                    <h1 className="font-headline-md text-headline-md text-on-surface mt-1">
                      Acceso y Registro ZeroLag
                    </h1>
                  </div>
                  <span className="material-symbols-outlined text-secondary text-[28px]">
                    sports_esports
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-space-xs p-1 bg-surface-container rounded-lg border border-surface-variant mb-space-lg">
                  <button
                    className={`py-2 text-center font-label-lg text-label-lg rounded transition-colors ${
                      authTab === "login"
                        ? "bg-surface-container-lowest text-primary font-bold border border-surface-variant"
                        : "text-secondary hover:text-on-surface font-semibold"
                    }`}
                    id="tab-login-btn"
                    onClick={() => setAuthTab("login")}
                    type="button"
                  >
                    Iniciar Sesión
                  </button>
                  <button
                    className={`py-2 text-center font-label-lg text-label-lg rounded transition-colors ${
                      authTab === "register"
                        ? "bg-surface-container-lowest text-primary font-bold border border-surface-variant"
                        : "text-secondary hover:text-on-surface font-semibold"
                    }`}
                    id="tab-register-btn"
                    onClick={() => setAuthTab("register")}
                    type="button"
                  >
                    Crear Cuenta Nueva
                  </button>
                </div>

                <Login
                  authTab={authTab}
                  handleLogin={handleLogin}
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  error={error}
                />

                <Register
                  authTab={authTab}
                  handleRegister={handleRegister}
                  nombre={nombre}
                  setNombre={setNombre}
                  apellido={apellido}
                  setApellido={setApellido}
                  telefono={telefono}
                  setTelefono={setTelefono}
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                />
              </div>

              <RightCol />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default LoginPage;
