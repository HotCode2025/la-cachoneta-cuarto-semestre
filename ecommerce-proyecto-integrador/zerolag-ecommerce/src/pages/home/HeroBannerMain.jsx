import { Link } from "react-router";

function HeroBannerMain() {
  return (
    <section className="w-full border-b border-surface-variant bg-surface">
      <div className="max-w-[1320px] mx-auto px-margin-desktop py-space-lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md">
          <div className="lg:col-span-8 border border-surface-variant bg-surface-container-lowest p-space-xl flex flex-col justify-between relative">
            <div className="flex flex-col gap-space-sm z-10 max-w-xl">
              <div className="inline-flex items-center gap-space-xs self-start bg-surface-container px-2 py-1 rounded">
                <span className="w-2 h-2 rounded-full bg-primary inline-block"></span>
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface">
                  Lanzamiento Hardware 2025
                </span>
              </div>
              <h1 className="font-headline-xl text-headline-xl text-on-surface uppercase tracking-tight">
                Especial NVIDIA GeForce{" "}
                <span className="text-primary-container">
                  RTX Serie 40 SUPER
                </span>{" "}
                &amp; AMD Ryzen 7000
              </h1>
              <p className="font-body-lg text-body-lg text-secondary">
                Rendimiento extremo sin cuello de botella. Tasa de cuadros ultra
                alta en 1440p y 4K con trazado de rayos completo y DLSS 3.5 con
                garantía directa oficial.
              </p>
            </div>
            <div className="mt-space-xl pt-space-lg border-t border-surface-variant flex flex-wrap items-center justify-between gap-space-md z-10">
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-secondary uppercase">
                  Disponibilidad Inmediata
                </span>
                <span className="font-headline-sm text-headline-sm text-on-surface">
                  Stock Certificado CABA
                </span>
              </div>
              <div className="flex items-center gap-space-sm">
                <Link
                  className="inline-flex items-center justify-center h-10 px-space-xl bg-primary-container text-on-primary font-label-lg text-label-lg rounded hover:bg-primary transition-colors"
                  data-path="placas-de-video-gpu"
                  to="/search?categoria=Placas de Video"
                >
                  Ver Placas de Video
                </Link>
                <Link
                  className="inline-flex items-center justify-center h-10 px-space-lg bg-surface-container border border-surface-variant text-on-surface font-label-lg text-label-lg rounded hover:bg-surface-variant transition-colors"
                  data-path="procesadores-cpu"
                  to="/search?categoria=Microprocesadores"
                >
                  Ver Procesadores
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-space-md">
            <div className="flex-1 border border-surface-variant bg-surface-container-lowest p-space-lg flex flex-col justify-between">
              <div className="flex flex-col gap-space-xs">
                <div className="flex items-center justify-between text-secondary">
                  <span className="material-symbols-outlined text-[20px] text-tertiary">
                    verified_user
                  </span>
                  <span className="font-label-sm text-label-sm uppercase font-bold text-tertiary">
                    3 Años de Cobertura
                  </span>
                </div>
                <h2 className="font-headline-sm text-headline-sm text-on-surface uppercase mt-2">
                  Ensamblados ZeroLag Pro
                </h2>
                <p className="font-body-md text-body-md text-secondary">
                  PCs de alto rendimiento testeadas bajo estrés con Cinebench y
                  FurMark. Ensambladas por técnicos especializados.
                </p>
              </div>
              <div className="mt-space-md pt-space-sm border-t border-surface-variant flex items-center justify-between">
                <span className="font-label-md text-label-md text-on-surface">
                  Armadas listas para jugar
                </span>
                <Link
                  className="inline-flex items-center text-primary font-label-lg text-label-lg hover:text-primary-container transition-colors gap-1"
                  data-path="pc-armadas-gaming"
                  to="/search?categoria=Computadoras"
                >
                  <span>Configurar</span>
                  <span className="material-symbols-outlined text-[16px]">
                    arrow_forward
                  </span>
                </Link>
              </div>
            </div>

            <div className="flex-1 border border-surface-variant bg-surface-container-lowest p-space-lg flex flex-col justify-between">
              <div className="flex flex-col gap-space-xs">
                <div className="flex items-center justify-between text-secondary">
                  <span className="material-symbols-outlined text-[20px] text-primary">
                    laptop_chromebook
                  </span>
                  <span className="font-label-sm text-label-sm uppercase font-bold text-primary">
                    Financiación Exclusiva
                  </span>
                </div>
                <h2 className="font-headline-sm text-headline-sm text-on-surface uppercase mt-2">
                  Notebooks ASUS ROG &amp; Legion
                </h2>
                <p className="font-body-md text-body-md text-secondary">
                  Modelos 2024/2025 con pantallas OLED y RTX Serie 40.
                  Disponibles en 6 y 12 cuotas fijas sin interés.
                </p>
              </div>
              <div className="mt-space-md pt-space-sm border-t border-surface-variant flex items-center justify-between">
                <span className="font-label-md text-label-md text-on-surface">
                  Hasta 12 Cuotas
                </span>
                <Link
                  className="inline-flex items-center text-primary font-label-lg text-label-lg hover:text-primary-container transition-colors gap-1"
                  data-path="notebooks-laptops"
                  to="/search?categoria=Notebooks"
                >
                  <span>Explorar</span>
                  <span className="material-symbols-outlined text-[16px]">
                    arrow_forward
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroBannerMain;
