import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import SearchHeaderControls from "./search/SearchHeaderControls";
import SearchSidebarFilters from "./search/SearchSidebarFilters";
import SearchProductGrid from "./search/SearchProductGrid";
import { useSearchParams } from "react-router";

/** Muestra el catálogo y aplica los filtros seleccionados por el usuario. */
function SearchPage({ searchTerm, setSearchTerm, handleAddToCart }) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();
  const categoriaUrl = searchParams.get("categoria") || "";

  const [filters, setFilters] = useState({
    priceMin: 150000,
    priceMax: 4500000,
    inMediato: false,
    preventa: false,
    showroom: false,
    categoria: categoriaUrl, // Inicializa el filtro con la categoría de la URL.
    chipsets: {
      "NVIDIA GeForce RTX 4090": false,
      "GeForce RTX 4080 SUPER": false,
      "GeForce RTX 4070 Ti SUPER": false,
      "GeForce RTX 4070 SUPER": false,
      "GeForce RTX 4060 Ti / 4060": false,
      "AMD Radeon RX 7900 XTX": false,
      "AMD Radeon RX 7800 XT": false,
    },
    marcas: {
      ASUS: false,
      MSI: false,
      Gigabyte: false,
      Zotac: false,
      PNY: false,
      Sapphire: false,
      XFX: false,
      Palit: false,
    },
    vram: null,
    psu: {
      "650W a 750W": false,
      "750W a 850W": false,
      "1000W o superior": false,
    },
  });

  // Carga los productos del catálogo.
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/productos");
      setProductos(response.data);
    } catch (error) {
      console.error("Ha ocurrido un error al obtener los productos: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Sincroniza la categoría seleccionada cuando cambia la URL.
  useEffect(() => {
    const cat = searchParams.get("categoria") || "";
    setFilters((prev) => ({ ...prev, categoria: cat }));
  }, [searchParams]);

  // Actualiza los filtros seleccionados.
  const handlePriceChange = (e, type) => {
    const value = Number(e.target.value);
    setFilters((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleCheckboxChange = (category, key) => {
    setFilters((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: !prev[category][key],
      },
    }));
  };

  const handleSimpleCheckbox = (key) => {
    setFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Actualiza la categoría seleccionada y su parámetro en la URL.
  const handleCategoryChange = (e) => {
    const nuevaCategoria = e.target.value;

    setFilters((prev) => ({
      ...prev,
      categoria: nuevaCategoria,
    }));

    if (nuevaCategoria) {
      setSearchParams({ categoria: nuevaCategoria });
    } else {
      searchParams.delete("categoria");
      setSearchParams(searchParams);
    }
  };

  const handleVramSelect = (size) => {
    setFilters((prev) => ({
      ...prev,
      vram: prev.vram === size ? null : size,
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      priceMin: 150000,
      priceMax: 4500000,
      inMediato: false,
      preventa: false,
      showroom: false,
      categoria: "",
      chipsets: Object.keys(filters.chipsets).reduce(
        (acc, k) => ({ ...acc, [k]: false }),
        {},
      ),
      marcas: Object.keys(filters.marcas).reduce(
        (acc, k) => ({ ...acc, [k]: false }),
        {},
      ),
      vram: null,
      psu: Object.keys(filters.psu).reduce(
        (acc, k) => ({ ...acc, [k]: false }),
        {},
      ),
    });
    setSearchParams({});
    setSearchTerm("");
  };

  // Aplica los filtros al catálogo cargado.
  const filteredProducts = useMemo(() => {
    return productos.filter((prod) => {
      const precioNum = Number(prod.precio) || 0;
      const nombreDesc = `${prod.nombre} ${prod.descripcion}`.toLowerCase();

      // Categoría.
      if (filters.categoria && prod.categorias?.nombre !== filters.categoria) {
        return false;
      }

      // Texto de búsqueda.
      if (searchTerm && !nombreDesc.includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Rango de precio.
      if (precioNum < filters.priceMin || precioNum > filters.priceMax) {
        return false;
      }

      // Chipset.
      const activeChipsets = Object.keys(filters.chipsets).filter(
        (k) => filters.chipsets[k],
      );
      if (activeChipsets.length > 0) {
        const matchesChipset = activeChipsets.some((chip) =>
          nombreDesc.includes(chip.toLowerCase()),
        );
        if (!matchesChipset) return false;
      }

      // Marca o fabricante.
      const activeMarcas = Object.keys(filters.marcas).filter(
        (k) => filters.marcas[k],
      );
      if (activeMarcas.length > 0) {
        const matchesMarca = activeMarcas.some((marca) =>
          nombreDesc.includes(marca.toLowerCase()),
        );
        if (!matchesMarca) return false;
      }

      // Memoria VRAM.
      if (filters.vram) {
        if (!nombreDesc.includes(filters.vram.toLowerCase())) {
          return false;
        }
      }

      return true;
    });
  }, [productos, filters, searchTerm]);

  return (
    <>
      <main className="w-full pt-[156px] bg-surface min-h-[calc(100vh-156px)]">
        <div className="flex flex-col w-full">
          {/* Navegación y metadatos */}
          <Breadcrumbs />

          {/* Encabezado y controles del catálogo */}
          <SearchHeaderControls
            filteredProducts={filteredProducts}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filters={filters}
            handleVramSelect={handleVramSelect}
            handleResetFilters={handleResetFilters}
          />

          {/* Catálogo de productos */}
          <section className="w-full py-space-xl">
            <div className="max-w-[1320px] mx-auto px-margin-desktop">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-start">
                {/* Filtros del catálogo */}
                <SearchSidebarFilters
                  handleResetFilters={handleResetFilters}
                  filters={filters}
                  handlePriceChange={handlePriceChange}
                  handleCheckboxChange={handleCheckboxChange}
                  handleVramSelect={handleVramSelect}
                  handleCategoryChange={handleCategoryChange}
                />

                {/* Resultados */}
                <SearchProductGrid
                  loading={loading}
                  filteredProducts={filteredProducts}
                  handleAddToCart={handleAddToCart}
                />
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default SearchPage;
