function TrackingBanner() {
  return (
    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg mb-space-xl border-b border-surface-variant pb-space-lg">
      <div className="flex flex-col gap-space-xs">
        <div className="flex items-center gap-space-xs">
          <span className="px-2 py-0.5 bg-tertiary-container text-on-tertiary-container font-label-sm text-label-sm rounded-[2px] uppercase">
            Sistema Oficial RMA &amp; Logística
          </span>
          <span className="text-body-sm font-body-sm text-secondary">
            Actualizado: Hoy, 09:12 hs
          </span>
        </div>
        <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
          Seguimiento en Tiempo Real y Trazabilidad Logística
        </h1>
        <p className="font-body-md text-body-md text-secondary max-w-3xl">
          Monitoreo oficial de despacho, cadena de custodia y control
          térmico/serial de hardware para tu pedido. Cobertura asegurada ZeroLag
          contra robo o siniestro en tránsito.
        </p>
      </div>
      {/* Quick Switcher Input */}
      <div className="shrink-0 w-full lg:w-auto">
        <label
          className="block font-label-sm text-label-sm uppercase text-secondary mb-1"
          htmlFor="tracking-search"
        >
          Consultar otro envío o RMA
        </label>
        <form
          className="flex items-center gap-0 w-full lg:w-80"
          onSubmit="
                  event.preventDefault();
                  alert('Cargando datos de la guía ingresada...');
                "
        >
          <input
            className="h-10 px-3 bg-surface-container-low border border-surface-variant border-r-0 rounded-l-[2px] font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary-container w-full"
            id="tracking-search"
            placeholder="Ej: AR-938210928 o #ZL-"
            type="text"
            value="AR-938210928"
          />
          <button
            className="h-10 px-4 bg-primary text-on-primary font-label-md text-label-md rounded-r-[2px] flex items-center justify-center shrink-0 hover:bg-primary-container transition-colors"
            type="submit"
          >
            <span className="material-symbols-outlined text-[18px]">
              search
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default TrackingBanner;
