import { Link } from "react-router";

function HardwareCategoriesBanner() {
  return (
    <section className="w-full border-b border-surface-variant bg-surface">
      <div className="max-w-[1320px] mx-auto px-margin-desktop py-space-xl">
        <div className="flex items-center justify-between mb-space-md pb-space-xs border-b border-surface-variant">
          <h2 className="font-headline-md text-headline-md text-on-surface uppercase tracking-tight flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[24px]">
              grid_view
            </span>
            Hardware por Categoría
          </h2>
          <span className="font-label-sm text-label-sm text-secondary uppercase">
            Explorar catálogo integral
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-space-sm">
          <Link
            className="border border-surface-variant bg-surface-container-lowest p-space-md flex flex-col items-center text-center group hover:border-primary-container transition-colors rounded"
            data-path="notebooks-laptops"
            to="/search?categoria=Notebooks"
          >
            <div className="w-12 h-12 flex items-center justify-center bg-surface-container-low text-on-surface group-hover:bg-primary-container group-hover:text-on-primary transition-colors rounded mb-2">
              <span className="material-symbols-outlined text-[26px]">
                laptop_mac
              </span>
            </div>
            <span className="font-label-md text-label-md text-on-surface font-bold leading-tight">
              Notebooks
            </span>
            <span className="font-body-sm text-body-sm text-secondary mt-1">
              Portátiles
            </span>
          </Link>
          <Link
            className="border border-surface-variant bg-surface-container-lowest p-space-md flex flex-col items-center text-center group hover:border-primary-container transition-colors rounded"
            data-path="placas-de-video-gpu"
            to="/search?categoria=Placas de Video"
          >
            <div className="w-12 h-12 flex items-center justify-center bg-surface-container-low text-on-surface group-hover:bg-primary-container group-hover:text-on-primary transition-colors rounded mb-2">
              <span className="material-symbols-outlined text-[26px]">
                developer_board
              </span>
            </div>
            <span className="font-label-md text-label-md text-on-surface font-bold leading-tight">
              Placas GPU
            </span>
            <span className="font-body-sm text-body-sm text-secondary mt-1">
              GeForce / AMD
            </span>
          </Link>
          <Link
            className="border border-surface-variant bg-surface-container-lowest p-space-md flex flex-col items-center text-center group hover:border-primary-container transition-colors rounded"
            data-path="procesadores-cpu"
            to="/search?categoria=Microprocesadores"
          >
            <div className="w-12 h-12 flex items-center justify-center bg-surface-container-low text-on-surface group-hover:bg-primary-container group-hover:text-on-primary transition-colors rounded mb-2">
              <span className="material-symbols-outlined text-[26px]">
                memory
              </span>
            </div>
            <span className="font-label-md text-label-md text-on-surface font-bold leading-tight">
              Procesadores
            </span>
            <span className="font-body-sm text-body-sm text-secondary mt-1">
              Intel &amp; Ryzen
            </span>
          </Link>
          <Link
            className="border border-surface-variant bg-surface-container-lowest p-space-md flex flex-col items-center text-center group hover:border-primary-container transition-colors rounded"
            data-path="monitores"
            to="/search?categoria=Monitores LED"
          >
            <div className="w-12 h-12 flex items-center justify-center bg-surface-container-low text-on-surface group-hover:bg-primary-container group-hover:text-on-primary transition-colors rounded mb-2">
              <span className="material-symbols-outlined text-[26px]">
                monitor
              </span>
            </div>
            <span className="font-label-md text-label-md text-on-surface font-bold leading-tight">
              Monitores
            </span>
            <span className="font-body-sm text-body-sm text-secondary mt-1">
              144Hz / 240Hz
            </span>
          </Link>
          <Link
            className="border border-surface-variant bg-surface-container-lowest p-space-md flex flex-col items-center text-center group hover:border-primary-container transition-colors rounded"
            data-path="perifericos"
            to="/search?categoria=Teclados, Mouse"
          >
            <div className="w-12 h-12 flex items-center justify-center bg-surface-container-low text-on-surface group-hover:bg-primary-container group-hover:text-on-primary transition-colors rounded mb-2">
              <span className="material-symbols-outlined text-[26px]">
                keyboard
              </span>
            </div>
            <span className="font-label-md text-label-md text-on-surface font-bold leading-tight">
              Periféricos
            </span>
            <span className="font-body-sm text-body-sm text-secondary mt-1">
              Mouse &amp; Teclados
            </span>
          </Link>
          <Link
            className="border border-surface-variant bg-surface-container-lowest p-space-md flex flex-col items-center text-center group hover:border-primary-container transition-colors rounded"
            data-path="componentes"
            to="/search?categoria=Discos"
          >
            <div className="w-12 h-12 flex items-center justify-center bg-surface-container-low text-on-surface group-hover:bg-primary-container group-hover:text-on-primary transition-colors rounded mb-2">
              <span className="material-symbols-outlined text-[26px]">
                save
              </span>
            </div>
            <span className="font-label-md text-label-md text-on-surface font-bold leading-tight">
              Almacenamiento
            </span>
            <span className="font-body-sm text-body-sm text-secondary mt-1">
              SSD M.2 NVMe
            </span>
          </Link>
          <Link
            className="border border-surface-variant bg-surface-container-lowest p-space-md flex flex-col items-center text-center group hover:border-primary-container transition-colors rounded"
            data-path="componentes"
            to="/search?categoria=Fuentes"
          >
            <div className="w-12 h-12 flex items-center justify-center bg-surface-container-low text-on-surface group-hover:bg-primary-container group-hover:text-on-primary transition-colors rounded mb-2">
              <span className="material-symbols-outlined text-[26px]">
                power
              </span>
            </div>
            <span className="font-label-md text-label-md text-on-surface font-bold leading-tight">
              Fuentes 80+
            </span>
            <span className="font-body-sm text-body-sm text-secondary mt-1">
              Gold &amp; Platinum
            </span>
          </Link>
          <Link
            className="border border-surface-variant bg-surface-container-lowest p-space-md flex flex-col items-center text-center group hover:border-primary-container transition-colors rounded"
            data-path="componentes"
            to="/search?categoria=Gabinetes"
          >
            <div className="w-12 h-12 flex items-center justify-center bg-surface-container-low text-on-surface group-hover:bg-primary-container group-hover:text-on-primary transition-colors rounded mb-2">
              <span className="material-symbols-outlined text-[26px]">
                mode_fan
              </span>
            </div>
            <span className="font-label-md text-label-md text-on-surface font-bold leading-tight">
              Gabinetes &amp; Cool
            </span>
            <span className="font-body-sm text-body-sm text-secondary mt-1">
              Watercooling
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HardwareCategoriesBanner;
