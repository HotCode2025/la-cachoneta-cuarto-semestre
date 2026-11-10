import { NavLink } from "react-router";

function Breadcrumbs() {
  return (
    <section className="w-full bg-surface-container-low border-b border-surface-variant">
      <div className="max-w-[1320px] mx-auto px-margin-desktop py-space-sm flex items-center justify-between">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-space-xs font-label-md text-label-md text-secondary"
        >
          <NavLink className="hover:text-primary transition-colors" to="/">
            Inicio
          </NavLink>
          <span className="text-outline-variant">/</span>
          <NavLink
            className="hover:text-primary transition-colors"
            to="/componentes"
          >
            Componentes
          </NavLink>
          <span className="text-outline-variant">/</span>
          <span className="text-on-surface font-bold">
            Placas de Video &amp; Procesadores
          </span>
        </nav>
        <div className="hidden sm:flex items-center gap-space-sm text-secondary font-label-sm text-label-sm">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-tertiary"></span>
            Stock sincronizado en tiempo real
          </span>
        </div>
      </div>
    </section>
  );
}

export default Breadcrumbs;
