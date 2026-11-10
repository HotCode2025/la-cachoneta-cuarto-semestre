/** Muestra los ensamblados destacados del mes. */
function MonthlyAssemblies() {
  return (
    <section className="w-full border-b border-surface-variant bg-surface-container-low">
      <div className="max-w-[1320px] mx-auto px-margin-desktop py-space-2xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg gap-space-sm">
          <div>
            <div className="flex items-center gap-space-xs text-primary font-label-sm text-label-sm uppercase font-bold tracking-wider">
              <span className="material-symbols-outlined text-[16px]">
                precision_manufacturing
              </span>
              <span>Taller Oficial ZeroLag</span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface uppercase tracking-tight mt-1">
              Ensamblados del Mes
            </h2>
            <p className="font-body-md text-body-md text-secondary">
              Equipos armados, testeados con perfil XMP/EXPO activo, Windows 11
              Trial instalado y curva de ventilación optimizada.
            </p>
          </div>
          <a
            className="inline-flex items-center gap-1 font-label-lg text-label-lg text-primary hover:text-primary-container transition-colors"
            data-path="pc-armadas-gaming"
            href="#"
          >
            <span>Ver todas las PC Armadas</span>
            <span className="material-symbols-outlined text-[18px]">
              chevron_right
            </span>
          </a>
        </div>

        {/* Ensamblados destacados */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-lg">
          <div className="border border-surface-variant bg-surface-container-lowest flex flex-col justify-between">
            <div className="p-space-md border-b border-surface-variant flex items-center justify-between bg-surface">
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">
                Gama Media 1080p Ultra
              </span>
              <span className="inline-flex items-center gap-1 bg-tertiary text-on-tertiary px-2 py-0.5 rounded font-label-sm text-label-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-surface-container-lowest"></span>
                En Stock Inmediato
              </span>
            </div>
            <div className="p-space-lg flex flex-col flex-1">
              <h3 className="font-headline-sm text-headline-sm text-on-surface">
                ZeroLag Starter V1
              </h3>
              <span className="font-body-sm text-body-sm text-secondary mt-1">
                Ideal Esports competitivo y streaming inicial
              </span>
              <div className="mt-space-md border border-surface-variant divide-y divide-surface-variant text-body-sm font-body-sm">
                <div className="p-2 flex justify-between bg-surface-container-low">
                  <span className="font-bold text-secondary">CPU</span>
                  <span className="text-on-surface font-semibold text-right">
                    Intel Core i5 13400F
                  </span>
                </div>
                <div className="p-2 flex justify-between bg-surface-container-lowest">
                  <span className="font-bold text-secondary">GPU</span>
                  <span className="text-on-surface font-semibold text-right">
                    GeForce RTX 4060 8GB
                  </span>
                </div>
                <div className="p-2 flex justify-between bg-surface-container-low">
                  <span className="font-bold text-secondary">RAM</span>
                  <span className="text-on-surface font-semibold text-right">
                    16GB (2x8GB) DDR5 5200MHz
                  </span>
                </div>
                <div className="p-2 flex justify-between bg-surface-container-lowest">
                  <span className="font-bold text-secondary">SSD</span>
                  <span className="text-on-surface font-semibold text-right">
                    1TB NVMe PCIe 4.0 M.2
                  </span>
                </div>
                <div className="p-2 flex justify-between bg-surface-container-low">
                  <span className="font-bold text-secondary">Fuente</span>
                  <span className="text-on-surface font-semibold text-right">
                    650W 80 Plus Bronze
                  </span>
                </div>
              </div>
              <div className="mt-space-lg pt-space-md border-t border-surface-variant">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-tertiary uppercase font-bold">
                    Precio Especial Transferencia
                  </span>
                  <span className="font-headline-md text-headline-md text-primary-container leading-none my-1">
                    $1.249.990
                    <span className="font-label-md text-label-md text-secondary">
                      ARS
                    </span>
                  </span>
                  <span className="font-body-sm text-body-sm text-secondary">
                    o 12 cuotas fijas de
                    <strong className="text-on-surface">$138.500 ARS</strong>
                  </span>
                </div>
              </div>
            </div>
            <div className="p-space-md border-t border-surface-variant bg-surface flex items-center gap-space-sm">
              <a
                className="w-full h-10 bg-primary-container text-on-primary font-label-lg text-label-lg rounded flex items-center justify-center gap-1 hover:bg-primary transition-colors"
                data-path="pc-armadas-gaming"
                href="#"
              >
                <span>Ver Configuración</span>
                <span className="material-symbols-outlined text-[18px]">
                  build
                </span>
              </a>
            </div>
          </div>

          <div className="border-2 border-primary bg-surface-container-lowest flex flex-col justify-between relative">
            <div className="p-space-md border-b border-surface-variant flex items-center justify-between bg-surface-container">
              <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider font-bold">
                Más Vendido 1440p High-FPS
              </span>
              <span className="inline-flex items-center gap-1 bg-tertiary text-on-tertiary px-2 py-0.5 rounded font-label-sm text-label-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-surface-container-lowest"></span>
                En Stock Inmediato
              </span>
            </div>
            <div className="p-space-lg flex flex-col flex-1">
              <h3 className="font-headline-sm text-headline-sm text-on-surface">
                ZeroLag Pro Gamer V3
              </h3>
              <span className="font-body-sm text-body-sm text-secondary mt-1">
                Configuración líder en benchmarks con arquitectura 3D V-Cache
              </span>
              <div className="mt-space-md border border-surface-variant divide-y divide-surface-variant text-body-sm font-body-sm">
                <div className="p-2 flex justify-between bg-surface-container-low">
                  <span className="font-bold text-secondary">CPU</span>
                  <span className="text-on-surface font-semibold text-right">
                    AMD Ryzen 7 7800X3D
                  </span>
                </div>
                <div className="p-2 flex justify-between bg-surface-container-lowest">
                  <span className="font-bold text-secondary">GPU</span>
                  <span className="text-on-surface font-semibold text-right">
                    GeForce RTX 4070 Ti SUPER 16GB
                  </span>
                </div>
                <div className="p-2 flex justify-between bg-surface-container-low">
                  <span className="font-bold text-secondary">RAM</span>
                  <span className="text-on-surface font-semibold text-right">
                    32GB (2x16GB) DDR5 6000MHz CL30
                  </span>
                </div>
                <div className="p-2 flex justify-between bg-surface-container-lowest">
                  <span className="font-bold text-secondary">Cooling</span>
                  <span className="text-on-surface font-semibold text-right">
                    Watercooling AIO 240mm ARGB
                  </span>
                </div>
                <div className="p-2 flex justify-between bg-surface-container-low">
                  <span className="font-bold text-secondary">Fuente</span>
                  <span className="text-on-surface font-semibold text-right">
                    850W 80 Plus Gold Modular
                  </span>
                </div>
              </div>
              <div className="mt-space-lg pt-space-md border-t border-surface-variant">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-tertiary uppercase font-bold">
                    Precio Especial Transferencia
                  </span>
                  <span className="font-headline-md text-headline-md text-primary-container leading-none my-1">
                    $2.890.000
                    <span className="font-label-md text-label-md text-secondary">
                      ARS
                    </span>
                  </span>
                  <span className="font-body-sm text-body-sm text-secondary">
                    o 12 cuotas fijas de
                    <strong className="text-on-surface">$320.200 ARS</strong>
                  </span>
                </div>
              </div>
            </div>
            <div className="p-space-md border-t border-surface-variant bg-surface flex items-center gap-space-sm">
              <a
                className="w-full h-10 bg-primary-container text-on-primary font-label-lg text-label-lg rounded flex items-center justify-center gap-1 hover:bg-primary transition-colors"
                data-path="pc-armadas-gaming"
                href="#"
              >
                <span>Ver Configuración</span>
                <span className="material-symbols-outlined text-[18px]">
                  build
                </span>
              </a>
            </div>
          </div>

          <div className="border border-surface-variant bg-surface-container-lowest flex flex-col justify-between">
            <div className="p-space-md border-b border-surface-variant flex items-center justify-between bg-surface">
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">
                Workstation &amp; 4K Ultra
              </span>
              <span className="inline-flex items-center gap-1 bg-tertiary text-on-tertiary px-2 py-0.5 rounded font-label-sm text-label-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-surface-container-lowest"></span>
                En Stock Inmediato
              </span>
            </div>
            <div className="p-space-lg flex flex-col flex-1">
              <h3 className="font-headline-sm text-headline-sm text-on-surface">
                ZeroLag Master Streamer
              </h3>
              <span className="font-body-sm text-body-sm text-secondary mt-1">
                Renderizado 3D pesado, edición 4K y gaming competitivo sin
                concesiones
              </span>
              <div className="mt-space-md border border-surface-variant divide-y divide-surface-variant text-body-sm font-body-sm">
                <div className="p-2 flex justify-between bg-surface-container-low">
                  <span className="font-bold text-secondary">CPU</span>
                  <span className="text-on-surface font-semibold text-right">
                    Intel Core i9 14900KF
                  </span>
                </div>
                <div className="p-2 flex justify-between bg-surface-container-lowest">
                  <span className="font-bold text-secondary">GPU</span>
                  <span className="text-on-surface font-semibold text-right">
                    GeForce RTX 4080 SUPER 16GB
                  </span>
                </div>
                <div className="p-2 flex justify-between bg-surface-container-low">
                  <span className="font-bold text-secondary">RAM</span>
                  <span className="text-on-surface font-semibold text-right">
                    64GB (2x32GB) DDR5 6400MHz
                  </span>
                </div>
                <div className="p-2 flex justify-between bg-surface-container-lowest">
                  <span className="font-bold text-secondary">SSD</span>
                  <span className="text-on-surface font-semibold text-right">
                    2TB NVMe PCIe Gen4 (7400 MB/s)
                  </span>
                </div>
                <div className="p-2 flex justify-between bg-surface-container-low">
                  <span className="font-bold text-secondary">Fuente</span>
                  <span className="text-on-surface font-semibold text-right">
                    1000W ATX 3.0 PCIe 5.0 Gold
                  </span>
                </div>
              </div>
              <div className="mt-space-lg pt-space-md border-t border-surface-variant">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-tertiary uppercase font-bold">
                    Precio Especial Transferencia
                  </span>
                  <span className="font-headline-md text-headline-md text-primary-container leading-none my-1">
                    $4.150.000
                    <span className="font-label-md text-label-md text-secondary">
                      ARS
                    </span>
                  </span>
                  <span className="font-body-sm text-body-sm text-secondary">
                    o 12 cuotas fijas de
                    <strong className="text-on-surface">$459.800 ARS</strong>
                  </span>
                </div>
              </div>
            </div>
            <div className="p-space-md border-t border-surface-variant bg-surface flex items-center gap-space-sm">
              <a
                className="w-full h-10 bg-primary-container text-on-primary font-label-lg text-label-lg rounded flex items-center justify-center gap-1 hover:bg-primary transition-colors"
                data-path="pc-armadas-gaming"
                href="#"
              >
                <span>Ver Configuración</span>
                <span className="material-symbols-outlined text-[18px]">
                  build
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MonthlyAssemblies;
