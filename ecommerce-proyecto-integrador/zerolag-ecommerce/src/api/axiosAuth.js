import axios from "axios";

/** Cliente HTTP compartido para solicitudes autenticadas. */
const axiosAuth = axios.create({
  baseURL: "",
});

// Añade el token de autenticación a las solicitudes.
axiosAuth.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Limpia la sesión y redirige al login cuando las credenciales expiran.
axiosAuth.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("La sesión ha expirado. Limpiando credenciales...");

      // Elimina las credenciales almacenadas.
      localStorage.removeItem("token");
      localStorage.removeItem("usuario");

      // Evita repetir la redirección si el usuario ya está en la página de login.
      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

export default axiosAuth;
