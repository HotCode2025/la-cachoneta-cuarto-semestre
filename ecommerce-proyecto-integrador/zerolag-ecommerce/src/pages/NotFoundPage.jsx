import Breadcrumbs from "../components/Breadcrumbs";

/** Presenta opciones de navegación cuando la ruta solicitada no existe. */
function NotFoundPage() {
  return (
    <>
      <main className="w-full pt-[156px] bg-surface min-h-[calc(100vh-156px)]">
        <div className="flex flex-col w-full">
          {/* Contenido principal del error 404 */}
          <div className="w-full max-w-[1320px] mx-auto px-margin-desktop py-space-xl">
            <Breadcrumbs />

            {/* Diagnóstico del error y opciones de búsqueda */}
            <div className="w-full bg-surface-container-lowest border border-surface-variant p-space-lg md:p-space-xl rounded-none relative">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
                {/* Código de estado y diagnóstico */}
                <div className="lg:col-span-5 flex flex-col items-start border-b lg:border-b-0 lg:border-r border-surface-variant pb-space-lg lg:pb-0 lg:pr-space-xl">
                  <div className="flex items-center gap-space-xs font-mono font-label-sm text-label-sm text-primary uppercase tracking-widest mb-space-xs">
                    <span className="material-symbols-outlined text-[18px]">
                      terminal
                    </span>
                    <span>HARDWARE_REGISTRY_ERROR // BUS_ID: 0x00000404</span>
                  </div>
                  <div className="flex items-baseline gap-space-sm select-none">
                    <span className="font-headline-xl text-[72px] lg:text-[88px] font-extrabold tracking-tighter text-on-surface leading-none">
                      404
                    </span>
                    <span className="px-2 py-1 bg-primary text-on-primary font-label-sm text-label-sm uppercase tracking-wider font-bold">
                      PAGE FAULT
                    </span>
                  </div>
                  <div className="w-full mt-space-md p-space-sm bg-surface-container-low border border-surface-variant font-mono text-[11px] leading-tight text-secondary">
                    <div className="flex justify-between border-b border-surface-variant pb-1 mb-1">
                      <span>TARGET_URI:</span>
                      <span className="text-primary font-bold">
                        /sys/components/render-target
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-surface-variant pb-1 mb-1">
                      <span>CONTROLLER:</span>
                      <span className="text-on-surface font-semibold">
                        ZeroLag_CoreRouter_v4
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>MEMORY DUMP:</span>
                      <span className="text-tertiary font-bold">
                        0x004F: READY (CACHE PURGED)
                      </span>
                    </div>
                  </div>
                </div>
                {/* Mensaje de error y búsqueda de productos */}
                <div className="lg:col-span-7 flex flex-col justify-center">
                  <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider mb-space-xs">
                    Desconexión de Línea de Datos
                  </span>
                  <h1 className="font-headline-lg text-headline-lg text-on-surface uppercase tracking-tight font-extrabold mb-space-sm">
                    ERROR 404: PÁGINA O HARDWARE FUERA DE STOCK / NO ENCONTRADO
                  </h1>
                  <p className="font-body-lg text-body-lg text-secondary leading-relaxed mb-space-lg">
                    El componente o enlace que estás buscando fue descontinuado,
                    cambió de socket o nunca existió en nuestro bus de datos. No
                    te preocupes, no perdiste tus frames: nuestro inventario
                    sigue 100% operativo con envíos directos a toda la
                    Argentina.
                  </p>
                  {/* Búsqueda de productos */}
                  <div className="w-full bg-surface-container-low border border-surface-variant p-2 mb-space-lg">
                    <form
                      action="#"
                      className="flex flex-col sm:flex-row gap-2 w-full"
                      method="GET"
                    >
                      <div className="relative flex-1">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-[20px]">
                          search
                        </span>
                        <input
                          className="w-full h-10 pl-10 pr-3 bg-surface-container-lowest border border-surface-variant text-on-surface font-body-md text-body-md focus:border-primary-container focus:outline-none transition-colors"
                          placeholder="Buscar componentes, placas de video, procesadores, periféricos..."
                          type="text"
                        />
                      </div>
                      <button
                        className="h-10 px-space-lg bg-primary-container text-on-primary font-label-lg text-label-lg flex items-center justify-center gap-2 hover:bg-primary transition-colors uppercase font-bold shrink-0"
                        type="submit"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          memory
                        </span>
                        <span>Buscar Hardware</span>
                      </button>
                    </form>
                  </div>
                  {/* Accesos directos */}
                  <div className="flex flex-wrap items-center gap-space-sm">
                    <a
                      className="h-10 px-space-lg bg-primary-container text-on-primary font-label-lg text-label-lg flex items-center gap-2 hover:bg-primary transition-colors font-bold uppercase"
                      data-path="home"
                      href="#"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        home
                      </span>
                      <span>Volver a la Página Principal</span>
                    </a>
                    <a
                      className="h-10 px-space-lg bg-surface-container-lowest border border-surface-variant text-on-surface font-label-lg text-label-lg flex items-center gap-2 hover:bg-surface-container transition-colors font-bold uppercase"
                      data-path="componentes"
                      href="#"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        grid_view
                      </span>
                      <span>Ir al Catálogo de Productos</span>
                    </a>
                    <a
                      className="h-10 px-space-md text-secondary hover:text-primary font-label-md text-label-md flex items-center gap-1 transition-colors underline decoration-surface-variant underline-offset-4"
                      data-path="garantias-y-rma"
                      href="#"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        contact_support
                      </span>
                      <span>Consultar Soporte Técnico</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Acceso rápido a categorías */}
            <div className="mt-space-2xl">
              <div className="flex items-center justify-between border-b border-surface-variant pb-space-xs mb-space-lg">
                <div className="flex items-center gap-space-xs">
                  <span className="w-2.5 h-2.5 bg-primary inline-block"></span>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface uppercase tracking-tight font-bold">
                    Quizás estabas buscando estas categorías populares
                  </h2>
                </div>
                <span className="font-label-sm text-label-sm text-secondary uppercase font-semibold hidden md:inline">
                  Ruteo Rápido de Componentes
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
                {/* Categoría */}
                <a
                  className="group bg-surface-container-lowest border border-surface-variant p-space-md flex flex-col justify-between hover:border-primary transition-colors"
                  data-path="placas-de-video-gpu"
                  href="#"
                >
                  <div className="flex items-start justify-between">
                    <span className="material-symbols-outlined text-primary text-[32px]">
                      view_in_ar
                    </span>
                    <span className="font-mono text-[10px] text-secondary font-bold">
                      PCIe Gen 5.0
                    </span>
                  </div>
                  <div className="mt-space-lg">
                    <h3 className="font-headline-sm text-[16px] leading-snug font-bold text-on-surface group-hover:text-primary transition-colors uppercase">
                      Placas de Video (GPU)
                    </h3>
                    <p className="font-body-sm text-body-sm text-secondary mt-1">
                      NVIDIA GeForce RTX Serie 40 y AMD Radeon RX 7000.
                    </p>
                  </div>
                  <div className="mt-space-md pt-space-xs border-t border-surface-variant flex items-center justify-between font-label-sm text-label-sm font-bold text-on-surface">
                    <span>Explorar Stock GPU</span>
                    <span className="material-symbols-outlined text-[16px] text-primary group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </div>
                </a>
                {/* Categoría */}
                <a
                  className="group bg-surface-container-lowest border border-surface-variant p-space-md flex flex-col justify-between hover:border-primary transition-colors"
                  data-path="procesadores-cpu"
                  href="#"
                >
                  <div className="flex items-start justify-between">
                    <span className="material-symbols-outlined text-primary text-[32px]">
                      developer_board
                    </span>
                    <span className="font-mono text-[10px] text-secondary font-bold">
                      LGA1700 / AM5
                    </span>
                  </div>
                  <div className="mt-space-lg">
                    <h3 className="font-headline-sm text-[16px] leading-snug font-bold text-on-surface group-hover:text-primary transition-colors uppercase">
                      Procesadores (CPU)
                    </h3>
                    <p className="font-body-sm text-body-sm text-secondary mt-1">
                      Intel Core i5, i7, i9 de 14va Gen y AMD Ryzen Serie
                      7000/9000.
                    </p>
                  </div>
                  <div className="mt-space-md pt-space-xs border-t border-surface-variant flex items-center justify-between font-label-sm text-label-sm font-bold text-on-surface">
                    <span>Ver Microprocesadores</span>
                    <span className="material-symbols-outlined text-[16px] text-primary group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </div>
                </a>
                {/* Categoría */}
                <a
                  className="group bg-surface-container-lowest border border-surface-variant p-space-md flex flex-col justify-between hover:border-primary transition-colors"
                  data-path="pc-armadas-gaming"
                  href="#"
                >
                  <div className="flex items-start justify-between">
                    <span className="material-symbols-outlined text-primary text-[32px]">
                      desktop_windows
                    </span>
                    <span className="font-mono text-[10px] text-tertiary font-bold">
                      TESTEADAS EN BANCO
                    </span>
                  </div>
                  <div className="mt-space-lg">
                    <h3 className="font-headline-sm text-[16px] leading-snug font-bold text-on-surface group-hover:text-primary transition-colors uppercase">
                      PCs Armadas Gaming
                    </h3>
                    <p className="font-body-sm text-body-sm text-secondary mt-1">
                      Equipos optimizados para eSports, Streaming y Rendimiento
                      Extremo.
                    </p>
                  </div>
                  <div className="mt-space-md pt-space-xs border-t border-surface-variant flex items-center justify-between font-label-sm text-label-sm font-bold text-on-surface">
                    <span>Configuraciones Listas</span>
                    <span className="material-symbols-outlined text-[16px] text-primary group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </div>
                </a>
                {/* Categoría */}
                <a
                  className="group bg-surface-container-lowest border border-surface-variant p-space-md flex flex-col justify-between hover:border-primary transition-colors"
                  data-path="perifericos"
                  href="#"
                >
                  <div className="flex items-start justify-between">
                    <span className="material-symbols-outlined text-primary text-[32px]">
                      keyboard
                    </span>
                    <span className="font-mono text-[10px] text-secondary font-bold">
                      POLLING RATE 8000Hz
                    </span>
                  </div>
                  <div className="mt-space-lg">
                    <h3 className="font-headline-sm text-[16px] leading-snug font-bold text-on-surface group-hover:text-primary transition-colors uppercase">
                      Periféricos de Alto Nivel
                    </h3>
                    <p className="font-body-sm text-body-sm text-secondary mt-1">
                      Teclados mecánicos hot-swap, ratones ultralivianos y
                      headsets 7.1.
                    </p>
                  </div>
                  <div className="mt-space-md pt-space-xs border-t border-surface-variant flex items-center justify-between font-label-sm text-label-sm font-bold text-on-surface">
                    <span>Equipamiento Competitivo</span>
                    <span className="material-symbols-outlined text-[16px] text-primary group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default NotFoundPage;
