import ZeroLagLogo from "../assets/zerolag-logo.svg";

function Footer() {
  return (
    <footer className="w-full bg-surface-container-low border-t border-surface-variant">
      <div className="max-w-[1320px] mx-auto px-margin-desktop py-space-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-xl">
          <div className="flex flex-col gap-space-sm">
            <div className="flex items-center gap-space-xs">
              <img
                alt="ZeroLag Logo"
                className="h-12 w-auto object-contain"
                src={ZeroLagLogo}
              />
            </div>
            <p className="font-body-md text-body-md text-secondary leading-relaxed">
              Especialistas en hardware de alto rendimiento, workstations y
              ensamble gamer para toda la República Argentina. Garantía oficial
              directa.
            </p>
            <div className="flex flex-col gap-1 font-body-sm text-body-sm text-secondary">
              <span className="font-bold text-on-surface">
                Showroom Belgrano, CABA
              </span>
              <span>Av. Cabildo 2450, Piso 3</span>
              <span>Lunes a Viernes de 10:00 a 19:00 hs</span>
            </div>
          </div>
          <div className="flex flex-col gap-space-sm">
            <h4 className="font-label-lg text-label-lg uppercase tracking-wider text-on-surface font-bold border-b border-surface-variant pb-2">
              Categorías Populares
            </h4>
            <ul className="flex flex-col gap-2 font-body-md text-body-md text-secondary">
              <li className="hover:text-primary transition-colors">
                <a data-path="placas-de-video-gpu" href="#">
                  Placas de Video GeForce RTX &amp; Radeon
                </a>
              </li>
              <li className="hover:text-primary transition-colors">
                <a data-path="procesadores-cpu" href="#">
                  Procesadores Intel Core &amp; AMD Ryzen
                </a>
              </li>
              <li className="hover:text-primary transition-colors">
                <a data-path="pc-armadas-gaming" href="#">
                  PC Gamers Ensambladas
                </a>
              </li>
              <li className="hover:text-primary transition-colors">
                <a data-path="monitores" href="#">
                  Monitores Gaming 144Hz / 240Hz
                </a>
              </li>
              <li className="hover:text-primary transition-colors">
                <a data-path="notebooks-laptops" href="#">
                  Notebooks Gamers &amp; Creadores
                </a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-space-sm">
            <h4 className="font-label-lg text-label-lg uppercase tracking-wider text-on-surface font-bold border-b border-surface-variant pb-2">
              Soporte y Garantía
            </h4>
            <ul className="flex flex-col gap-2 font-body-md text-body-md text-secondary">
              <li className="hover:text-primary transition-colors">
                <a data-path="garantias-y-rma" href="#">
                  Gestión de Garantías y RMA
                </a>
              </li>
              <li className="hover:text-primary transition-colors">
                <a data-path="ayuda-faq" href="#">
                  Preguntas Frecuentes
                </a>
              </li>
              <li className="hover:text-primary transition-colors">
                <a data-path="arma-tu-pc" href="#">
                  Simulador de Compatibilidad
                </a>
              </li>
              <li className="hover:text-primary transition-colors">
                <a data-path="venta-corporativa" href="#">
                  Venta Mayorista y Factura A
                </a>
              </li>
              <li className="hover:text-primary transition-colors">
                <a data-path="terminos-condiciones" href="#">
                  Términos, Condiciones y Defensa al Consumidor
                </a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-space-sm">
            <h4 className="font-label-lg text-label-lg uppercase tracking-wider text-on-surface font-bold border-b border-surface-variant pb-2">
              Pagos y Logística
            </h4>
            <div className="flex flex-col gap-space-sm">
              <p className="font-body-sm text-body-sm text-secondary">
                Aceptamos Mercado Pago, MODO, Transferencia Directa (15% OFF) y
                todas las tarjetas de crédito bancarias.
              </p>
              <div className="grid grid-cols-2 gap-2">
                <div className="border border-surface-variant bg-surface-container-lowest p-2 rounded text-center font-label-sm text-label-sm text-on-surface">
                  Andreani Oficial
                </div>
                <div className="border border-surface-variant bg-surface-container-lowest p-2 rounded text-center font-label-sm text-label-sm text-on-surface">
                  Correo Argentino
                </div>
                <div className="border border-surface-variant bg-surface-container-lowest p-2 rounded text-center font-label-sm text-label-sm text-on-surface">
                  Mercado Pago
                </div>
                <div className="border border-surface-variant bg-surface-container-lowest p-2 rounded text-center font-label-sm text-label-sm text-on-surface">
                  Transferencia BNA
                </div>
              </div>
              <div className="border border-surface-variant bg-surface-container-lowest p-2 rounded flex items-center justify-between text-secondary">
                <span className="font-label-sm text-[10px]">
                  DATA FISCAL AFIP 960/D
                </span>
                <span className="material-symbols-outlined text-[20px] text-tertiary">
                  verified
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-surface-variant mt-space-2xl pt-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md font-body-sm text-body-sm text-secondary">
          <div>
            © 2025 ZeroLag Hardware Argentina S.R.L. - CUIT 30-71829304-8. Todos
            los derechos reservados.
          </div>
          <div className="flex items-center gap-space-md">
            <a className="hover:text-on-surface transition-colors" href="#">
              Privacidad
            </a>
            <a className="hover:text-on-surface transition-colors" href="#">
              Seguridad y SSL
            </a>
            <a className="hover:text-on-surface transition-colors" href="#">
              Botón de Arrepentimiento
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
