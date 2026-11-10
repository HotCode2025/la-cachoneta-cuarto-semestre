import { NavLink } from "react-router";

function AdminSideBar() {
  // Clase base compartida por los enlaces de navegación.
  const baseLinkClasses =
    "px-space-md py-2.5 rounded-lg font-label-md text-label-md transition-colors block";

  return (
    <aside className="w-64 fixed left-0 top-[156px] bottom-0 bg-surface-container-low border-r border-surface-variant flex flex-col justify-between p-space-md z-40">
      <div className="flex flex-col gap-space-md">
        <div className="font-label-sm text-label-sm uppercase text-secondary tracking-wider px-space-xs font-bold">
          Módulos de Gestión
        </div>
        <nav className="flex flex-col gap-1">
          <NavLink
            to="/inventory"
            className={({ isActive }) =>
              `${baseLinkClasses} ${
                isActive
                  ? "bg-primary text-on-primary font-bold"
                  : "text-on-surface hover:bg-surface-container-highest"
              }`
            }
          >
            Inventario &amp; Productos
          </NavLink>
        </nav>
      </div>

      <div className="border-t border-surface-variant pt-space-md flex flex-col gap-2">
        <div className="px-space-xs font-label-sm text-[11px] text-secondary">
          ZeroLag Backoffice v2.4
          <br />
          Belgrano Hub, CABA
        </div>
        <a
          className="text-error hover:bg-error-container hover:text-on-error-container px-space-md py-2 rounded-lg font-label-md text-label-md transition-colors block text-center border border-error-container"
          data-path="auth"
          href="#"
        >
          Cerrar Sesión
        </a>
      </div>
    </aside>
  );
}

export default AdminSideBar;
