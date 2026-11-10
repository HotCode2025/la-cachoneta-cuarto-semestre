function SearchSidebarFilters({
  handleResetFilters,
  filters,
  handlePriceChange,
  handleCheckboxChange,
  handleVramSelect,
  handleCategoryChange,
}) {
  const categoriasList = [
    "Computadoras",
    "Coolers",
    "Discos",
    "Fuentes",
    "Gabinetes",
    "Gaming",
    "Memoria Ram",
    "Microprocesadores",
    "Monitores LED",
    "Motherboards",
    "Notebooks",
    "Parlantes, Auriculares",
    "Placas de Expansión",
    "Placas de Video",
    "Smart TVs",
    "Tablets",
    "Teclados, Mouse",
    "UPS, Estabilizadores",
    "Webcams",
    "Cámaras de Seguridad",
  ];

  return (
    <aside className="lg:col-span-3 flex flex-col gap-space-lg bg-surface-container-lowest border border-surface-variant p-space-md rounded">
      <div className="flex items-center justify-between pb-space-sm border-b border-surface-variant">
        <span className="font-headline-sm text-headline-sm uppercase text-on-surface tracking-tight flex items-center gap-1">
          <span className="material-symbols-outlined text-[20px] text-primary">
            filter_list
          </span>
          Filtros Técnicos
        </span>
        <button
          className="font-label-sm text-label-sm text-secondary hover:text-primary uppercase"
          type="button"
          onClick={handleResetFilters}
        >
          Reset
        </button>
      </div>

      <div className="flex flex-col gap-2 pb-space-md border-b border-surface-variant">
        <label className="font-label-lg text-label-lg text-on-surface font-bold uppercase tracking-wide">
          Categoría
        </label>
        <select
          className="w-full bg-surface-container-low border border-surface-variant text-on-surface text-body-md p-2 rounded focus:outline-none focus:border-primary"
          value={filters.categoria}
          onChange={handleCategoryChange}
        >
          <option value="">Todas las categorías</option>
          {categoriasList.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range Filter */}
      <div className="flex flex-col gap-space-xs pb-space-md border-b border-surface-variant">
        <label className="font-label-lg text-label-lg text-on-surface font-bold uppercase tracking-wide">
          Rango de Precio (ARS)
        </label>
        <div className="flex items-center justify-between gap-2 mt-2">
          <div className="flex flex-col">
            <span className="font-label-sm text-[10px] text-secondary">
              MÍNIMO
            </span>
            <div className="flex items-center border border-surface-variant bg-surface-container-low px-2 h-9 rounded">
              <span className="text-secondary font-label-md mr-1">$</span>
              <input
                className="w-20 bg-transparent text-body-md text-on-surface focus:outline-none"
                type="number"
                value={filters.priceMin}
                onChange={(e) => handlePriceChange(e, "priceMin")}
              />
            </div>
          </div>
          <span className="text-secondary mt-3">-</span>
          <div className="flex flex-col">
            <span className="font-label-sm text-[10px] text-secondary">
              MÁXIMO
            </span>
            <div className="flex items-center border border-surface-variant bg-surface-container-low px-2 h-9 rounded">
              <span className="text-secondary font-label-md mr-1">$</span>
              <input
                className="w-24 bg-transparent text-body-md text-on-surface focus:outline-none"
                type="number"
                value={filters.priceMax}
                onChange={(e) => handlePriceChange(e, "priceMax")}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Chipset & GPU Series */}
      <div className="flex flex-col gap-2 pb-space-md border-b border-surface-variant">
        <span className="font-label-lg text-label-lg text-on-surface font-bold uppercase tracking-wide">
          Chipset / Serie
        </span>
        <div className="max-h-48 overflow-y-auto flex flex-col gap-2 pr-1">
          {Object.keys(filters.chipsets).map((chip) => (
            <label
              key={chip}
              className="flex items-center gap-space-xs text-body-md text-on-surface cursor-pointer"
            >
              <input
                className="w-[18px] h-[18px] accent-primary"
                type="checkbox"
                checked={filters.chipsets[chip]}
                onChange={() => handleCheckboxChange("chipsets", chip)}
              />
              <span>{chip}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Brand / Manufacturer */}
      <div className="flex flex-col gap-2 pb-space-md border-b border-surface-variant">
        <span className="font-label-lg text-label-lg text-on-surface font-bold uppercase tracking-wide">
          Fabricante / Ensamblador
        </span>
        <div className="grid grid-cols-2 gap-2">
          {Object.keys(filters.marcas).map((marca) => (
            <label
              key={marca}
              className="flex items-center gap-1.5 text-body-md text-on-surface cursor-pointer"
            >
              <input
                className="w-[18px] h-[18px] accent-primary"
                type="checkbox"
                checked={filters.marcas[marca]}
                onChange={() => handleCheckboxChange("marcas", marca)}
              />
              <span>{marca}</span>
            </label>
          ))}
        </div>
      </div>

      {/* VRAM Memory Size */}
      <div className="flex flex-col gap-2 pb-space-md border-b border-surface-variant">
        <span className="font-label-lg text-label-lg text-on-surface font-bold uppercase tracking-wide">
          RAM
        </span>
        <div className="flex flex-wrap gap-1.5">
          {["8 GB", "12 GB", "16 GB", "24 GB"].map((size) => (
            <button
              key={size}
              className={`px-2.5 py-1 text-label-md font-label-md border rounded transition-colors ${
                filters.vram === size
                  ? "bg-primary text-on-primary border-primary font-bold"
                  : "border-surface-variant bg-surface-container-low text-secondary hover:text-on-surface"
              }`}
              type="button"
              onClick={() => handleVramSelect(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default SearchSidebarFilters;
