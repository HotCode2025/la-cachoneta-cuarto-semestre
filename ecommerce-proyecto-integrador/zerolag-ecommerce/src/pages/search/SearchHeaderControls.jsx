function SearchHeaderControls({
  filteredProducts,
  searchTerm,
  setSearchTerm,
  filters,
  handleVramSelect,
  handleResetFilters,
}) {
  return (
    <section className="w-full bg-surface-container-lowest border-b border-surface-variant">
      <div className="max-w-[1320px] mx-auto px-margin-desktop py-space-lg flex flex-col gap-space-md">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 bg-primary-container text-on-primary font-label-sm text-label-sm uppercase rounded">
                Gamer Enthusiast
              </span>
              <span className="font-body-sm text-body-sm text-secondary">
                {filteredProducts.length} productos encontrados
              </span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface uppercase tracking-tight">
              Catálogo de Hardware de Alto Rendimiento
            </h1>
          </div>
          {/* Search bar inside category */}
          <div className="w-full lg:w-96 flex">
            <input
              className="w-full h-10 px-space-md bg-surface-container-low border border-surface-variant rounded-l text-body-md text-on-surface placeholder:text-secondary focus:outline-none focus:border-primary-container"
              placeholder="Filtrar por chipset, modelo o serie..."
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="h-10 px-space-md bg-inverse-surface text-inverse-on-surface font-label-md text-label-md rounded-r flex items-center justify-center hover:bg-on-surface transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">
                search
              </span>
            </button>
          </div>
        </div>

        {/* Action Toolbar / Sorting / View switches */}
        <div className="pt-space-sm border-t border-surface-variant flex flex-wrap items-center justify-between gap-space-md">
          <div className="flex flex-wrap items-center gap-space-xs font-label-sm text-label-sm">
            <span className="text-secondary uppercase">Filtros Activos:</span>
            {filters.vram && (
              <span className="inline-flex items-center gap-1 bg-surface-container border border-surface-variant px-2 py-1 text-on-surface rounded">
                VRAM: {filters.vram}
                <button
                  className="text-secondary hover:text-primary leading-none"
                  type="button"
                  onClick={() => handleVramSelect(filters.vram)}
                >
                  ×
                </button>
              </span>
            )}
            <button
              className="text-primary hover:text-primary ml-1 font-bold"
              type="button"
              onClick={handleResetFilters}
            >
              Limpiar todos
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SearchHeaderControls;
