import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";

function MyAccountHeader() {
  const { userName, userRole, logout } = useAuth();
  const navigate = useNavigate();

  let usuario = null;
  const usuarioString = localStorage.getItem("usuario");
  if (usuarioString) {
    try {
      usuario = JSON.parse(usuarioString);
    } catch (error) {
      console.error(
        "Error al parsear los datos del usuario desde localStorage:",
        error,
      );
    }
  }

  const token = localStorage.getItem("token");

  const iniciales =
    usuario?.nombre && usuario?.apellido
      ? `${usuario.nombre[0]}`.toUpperCase() +
        `${usuario.apellido[0]}`.toUpperCase()
      : userName !== "Gamer"
        ? userName[0].toUpperCase()
        : "MG font-bold";

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <section className="bg-surface-container-lowest border border-surface-variant p-4 sm:p-space-lg">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
        {/* Identidad y Membresía */}
        <div className="flex flex-col sm:flex-row items-start gap-space-md">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-surface-container-highest border border-surface-variant flex items-center justify-center shrink-0 self-start">
            <span className="font-headline-lg text-headline-lg text-primary uppercase font-extrabold">
              {iniciales}
            </span>
          </div>
          <div className="flex flex-col w-full">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="font-headline-md text-xl sm:text-headline-md text-on-surface">
                Hola,{" "}
                {usuario ? `${usuario.nombre} ${usuario.apellido}` : userName}
              </h1>
              <span className="bg-tertiary text-on-tertiary font-label-sm text-label-sm px-2 py-0.5 tracking-wider uppercase font-bold">
                {userRole || (usuario ? usuario.rol : "VISITANTE")}
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-secondary mt-1 break-words">
              Email:{" "}
              <span className="font-bold text-on-surface break-all">
                {usuario ? usuario.email : "No disponible"}
              </span>{" "}
              <span className="hidden sm:inline">•</span>{" "}
              <br className="sm:hidden" />
              Teléfono:{" "}
              <span className="font-bold text-on-surface">
                {usuario ? usuario.telefono : "No registrado"}
              </span>
            </p>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-2 text-body-sm font-body-sm text-secondary">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-tertiary shrink-0">
                  verified_user
                </span>
                <span>
                  {token
                    ? "Cuenta Verificada (Token activo)"
                    : "Sin sesión iniciada"}
                </span>
              </span>
              <span className="hidden xs:inline">•</span>
              <span>Socio desde: Marzo 2022</span>
            </div>
          </div>
        </div>

        {/* Botón de Logout Rojo */}
        <div className="flex items-stretch gap-space-md w-full sm:w-auto lg:flex-nowrap mt-2 sm:mt-0">
          <div className="flex flex-col justify-center w-full sm:w-auto">
            <button
              onClick={handleLogout}
              className="h-10 px-space-md w-full sm:w-auto bg-error-container text-error hover:bg-error hover:text-on-error border border-error/30 font-label-lg text-label-lg flex items-center justify-center gap-space-xs transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">
                logout
              </span>
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MyAccountHeader;
