import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

/** Proporciona el estado y las acciones de autenticación a la aplicación. */
export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("Gamer");
  const [userRole, setUserRole] = useState(null);

  /** Sincroniza el estado de autenticación con las credenciales almacenadas. */
  const checkUserSession = () => {
    const token = localStorage.getItem("token");
    const usuarioString = localStorage.getItem("usuario");

    if (token) {
      setIsLoggedIn(true);
      if (usuarioString) {
        try {
          const usuario = JSON.parse(usuarioString);
          if (usuario) {
            if (usuario.nombre) setUserName(usuario.nombre);
            if (usuario.rol) setUserRole(usuario.rol);
          }
        } catch (error) {
          console.error("Error al parsear el usuario del localStorage", error);
        }
      }
    } else {
      setIsLoggedIn(false);
      setUserName("Gamer");
      setUserRole(null);
    }
  };

  useEffect(() => {
    checkUserSession();

    // Sincroniza la sesión cuando cambia el almacenamiento en otra pestaña.
    window.addEventListener("storage", checkUserSession);
    return () => window.removeEventListener("storage", checkUserSession);
  }, []);

  /** Guarda las credenciales y notifica el inicio de sesión. */
  const login = (token, usuario) => {
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(usuario));
    checkUserSession();
    window.dispatchEvent(new Event("user-logged-in"));
  };

  /** Elimina las credenciales y restablece el estado de autenticación. */
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    checkUserSession();
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userName,
        userRole,
        login,
        logout,
        checkUserSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/** Devuelve el contexto de autenticación actual. */
export function useAuth() {
  return useContext(AuthContext);
}
