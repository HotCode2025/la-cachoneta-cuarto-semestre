import { useState } from "react";
import { NavLink, useNavigate, Link } from "react-router";
import { useAuth } from "../context/AuthContext";

import ZeroLagLogo from "../assets/zerolag-logo.svg";

/** Renderiza la navegación principal, la búsqueda y el acceso al carrito. */
function Header({ cart, loadingCart, searchTerm, setSearchTerm }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  let totalQuantity = 0;
  if (cart?.carrito_items) {
    cart.carrito_items.forEach((cartItem) => {
      totalQuantity += cartItem.cantidad;
    });
  }

  const navigate = useNavigate();
  const { isLoggedIn, userName, userRole } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isCartActive = ({ isActive }) =>
    isActive
      ? "flex items-center gap- space-xs border border-primary-container bg-surface-container-lowest px-2 md:px-space-sm h-9 md:h-10 rounded-lg relative"
      : "flex items-center gap-space-xs border border-surface-variant bg-surface-container-lowest px-2 md:px-space-sm h-9 md:h-10 rounded-lg hover:border-on-surface transition-colors relative";

  const categoriasList = [
    "Notebooks",
    "Computadoras",
    "Placas de Video",
    "Microprocesadores",
    "Monitores LED",
    "Parlantes, Auriculares",
    "Memoria Ram",
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-surface-container-lowest border-b border-surface-variant">
      {/* Barra de anuncios */}
      <div className="bg-surface-container border-b border-surface-variant">
        <div className="max-w-[1320px] mx-auto px-3 md:px-margin-desktop h-7 md:h-8 flex items-center justify-between font-label-sm text-[10px] md:text-label-sm">
          <div className="flex items-center gap-space-xs text-secondary truncate">
            <span className="material-symbols-outlined text-[14px] text-tertiary">
              local_shipping
            </span>
            <span className="truncate">
              Envíos a todo el país | Hasta 12 cuotas sin interés | Local en
              Belgrano, CABA
            </span>
          </div>
        </div>
      </div>

      {/* Navegación principal */}
      <div className="border-b border-surface-variant">
        <div className="max-w-[1320px] mx-auto px-3 md:px-margin-desktop h-14 md:h-20 flex items-center justify-between gap-2 md:gap-space-lg">
          {/* Menú móvil */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-on-surface p-1 focus:outline-none shrink-0"
            aria-label="Abrir menú"
          >
            <span className="material-symbols-outlined text-[26px]">
              {isMenuOpen ? "close" : "menu"}
            </span>
          </button>

          {/* Logo */}
          <NavLink to="/" className="flex items-center shrink-0">
            <img
              alt="ZeroLag Logo"
              className="h-7 md:h-12 w-auto object-contain"
              src={ZeroLagLogo}
            />
          </NavLink>

          {/* Búsqueda de productos */}
          <div className="flex-1 max-w-2xl min-w-0">
            <form onSubmit={handleSearch} className="flex w-full">
              <input
                className="w-full h-9 md:h-10 px-2.5 md:px-space-md bg-surface-container-lowest border border-surface-variant border-r-0 rounded-l-lg text-xs md:text-body-md font-body-md text-on-surface placeholder:text-secondary focus:outline-none focus:border-primary-container truncate"
                placeholder="Buscar productos..."
                type="text"
                value={searchTerm || ""}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                className="h-9 md:h-10 px-2.5 md:px-space-lg bg-primary-container text-on-primary font-label-lg text-label-lg rounded-r-lg flex items-center justify-center shrink-0 hover:bg-primary transition-colors"
                type="submit"
                aria-label="Buscar"
              >
                <span className="material-symbols-outlined text-[18px]">
                  search
                </span>
                <span className="hidden md:inline ml-1">Buscar</span>
              </button>
            </form>
          </div>

          {/* Cotización en dólares, visible en pantallas extra grandes */}
          <div className="hidden xl:flex items-center gap-space-xs border border-surface-variant bg-surface-container-low px-space-sm py-1 rounded-lg shrink-0">
            <span className="material-symbols-outlined text-tertiary text-[20px]">
              currency_exchange
            </span>
            <div className="flex flex-col">
              <div className="flex items-center gap-1 font-label-sm text-label-sm">
                <span className="text-secondary">USD BNA:</span>
                <span className="font-bold text-on-surface">$1.085</span>
              </div>
              <span className="text-[10px] leading-tight font-bold text-tertiary uppercase">
                Transferencia -15% OFF
              </span>
            </div>
          </div>

          {/* Cuenta de usuario y carrito */}
          <div className="flex items-center gap-1.5 md:gap-space-md shrink-0">
            <NavLink
              className="flex items-center gap-space-xs text-left group"
              to={isLoggedIn ? "/orders" : "/login"}
            >
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-on-primary text-[18px]">
                  person
                </span>
              </div>
              <div className="hidden md:flex flex-col">
                <span className="font-label-sm text-[10px] text-secondary leading-tight">
                  Hola, {userName}!
                </span>
                <span className="font-label-md text-label-md text-on-surface group-hover:text-primary transition-colors leading-tight">
                  {isLoggedIn ? "Ver mis pedidos" : "Ingresar / Registro"}
                </span>
              </div>
            </NavLink>

            <div className="h-8 w-px bg-surface-variant hidden md:block"></div>

            <NavLink className={isCartActive} to="/checkout">
              <span className="material-symbols-outlined text-[20px] text-on-surface">
                shopping_cart
              </span>
              <span className="hidden md:inline font-label-md text-label-md text-on-surface">
                Mi Carrito
              </span>
              <span className="bg-primary text-on-primary font-label-sm text-label-sm px-1.5 py-0.5 rounded-sm flex items-center justify-center min-w-[18px] min-h-[18px] text-[11px]">
                {loadingCart ? (
                  <div className="w-3 h-3 border-2 border-on-primary border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  totalQuantity
                )}
              </span>
            </NavLink>
          </div>
        </div>
      </div>

      {/* Categorías en escritorio */}
      <div className="bg-surface-container-lowest hidden md:block">
        <div className="max-w-[1320px] mx-auto px-margin-desktop h-11 flex items-center justify-between">
          <nav className="flex items-center gap-space-md overflow-x-auto h-full scrollbar-none">
            {categoriasList.map((cat) => (
              <NavLink
                key={cat}
                className="text-on-surface-variant hover:text-on-surface font-label-md text-label-md whitespace-nowrap h-full flex items-center border-b-2 border-transparent transition-colors"
                to={`/search?categoria=${cat}`}
              >
                {cat}
              </NavLink>
            ))}
          </nav>

          {userRole === "ADMIN" && (
            <div className="flex items-center pl-space-md shrink-0 border-l border-surface-variant h-6">
              <Link
                className="font-label-sm text-label-sm text-secondary hover:text-primary transition-colors flex items-center gap-1 uppercase tracking-wider"
                to="/inventory"
              >
                <span className="material-symbols-outlined text-[16px]">
                  tune
                </span>
                <span>Panel Admin</span>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Menú de categorías en dispositivos móviles */}
      {isMenuOpen && (
        <div className="md:hidden bg-surface-container-lowest border-b border-surface-variant px-4 py-3 flex flex-col gap-3 shadow-lg">
          <span className="font-bold text-xs text-secondary uppercase tracking-wider">
            Categorías
          </span>
          <nav className="flex flex-col gap-2">
            {categoriasList.map((cat) => (
              <NavLink
                key={cat}
                onClick={() => setIsMenuOpen(false)}
                className="text-on-surface hover:text-primary text-sm py-1 border-b border-surface-variant/40"
                to={`/search?categoria=${cat}`}
              >
                {cat}
              </NavLink>
            ))}
          </nav>

          {userRole === "ADMIN" && (
            <Link
              onClick={() => setIsMenuOpen(false)}
              className="font-label-sm text-sm text-primary flex items-center gap-1 uppercase tracking-wider pt-2 border-t border-surface-variant/40"
              to="/control-panel"
            >
              <span className="material-symbols-outlined text-[18px]">
                tune
              </span>
              <span>Panel Admin</span>
            </Link>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
