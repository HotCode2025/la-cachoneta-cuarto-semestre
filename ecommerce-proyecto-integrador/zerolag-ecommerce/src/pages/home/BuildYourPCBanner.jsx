function BuildYourPCBanner() {
  return (
    <section className="w-full bg-inverse-surface text-inverse-on-surface border-b border-surface-variant">
      <div className="max-w-[1320px] mx-auto px-margin-desktop py-space-2xl">
        <div className="border border-secondary p-space-xl bg-surface-container-highest/10 flex flex-col lg:flex-row items-center justify-between gap-space-xl">
          <div className="flex flex-col gap-space-sm max-w-2xl">
            <div className="inline-flex items-center gap-space-xs bg-inverse-surface border border-secondary px-2.5 py-1 rounded self-start">
              <span className="material-symbols-outlined text-tertiary-fixed text-[18px]">
                rule
              </span>
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-inverse-on-surface font-bold">
                Algoritmo de Compatibilidad 100% Validado
              </span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-inverse-on-surface uppercase tracking-tight">
              Configurador Digital "Armá Tu PC"
            </h2>
            <p className="font-body-lg text-body-lg text-secondary-fixed leading-relaxed">
              Nuestra herramienta técnica comprueba en tiempo real el socket del
              procesador con el chipset del motherboard, la longitud máxima de
              placa de video dentro del gabinete seleccionado y los watts reales
              requeridos de tu fuente certificada. Evitá incompatibilidades
              físicas y eléctricas.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md pt-space-sm">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary-fixed text-[20px]">
                  check_circle
                </span>
                <span className="font-label-md text-label-md">
                  Socket CPU &amp; VRM
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary-fixed text-[20px]">
                  check_circle
                </span>
                <span className="font-label-md text-label-md">
                  Cálculo TDP Fuente 80+
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary-fixed text-[20px]">
                  check_circle
                </span>
                <span className="font-label-md text-label-md">
                  Espacio para Radiadores
                </span>
              </div>
            </div>
          </div>
          <div className="shrink-0 flex flex-col items-center sm:items-end gap-space-sm w-full lg:w-auto">
            <a
              className="w-full sm:w-auto inline-flex items-center justify-center h-12 px-space-2xl bg-primary-container text-on-primary font-headline-sm text-headline-sm rounded hover:bg-primary transition-colors gap-space-xs text-center"
              data-path="arma-tu-pc"
              href="#"
            >
              <span className="material-symbols-outlined text-[22px]">
                tune
              </span>
              <span>Comenzar a Armar mi PC</span>
            </a>
            <span className="font-body-sm text-body-sm text-secondary-fixed">
              Ensamble sin cargo extra en compras completas
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BuildYourPCBanner;
