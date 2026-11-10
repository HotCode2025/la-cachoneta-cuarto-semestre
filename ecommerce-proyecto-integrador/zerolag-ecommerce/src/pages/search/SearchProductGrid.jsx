import { useState } from "react";
import { Link } from "react-router";

function SearchProductGrid({ loading, filteredProducts, handleAddToCart }) {
  // Estado para llevar el registro de qué IDs de productos están cargando actualmente
  const [loadingIds, setLoadingIds] = useState({});

  // Estado para la paginación actual
  const [currentPage, setCurrentPage] = useState(1);
  const PRODUCTS_PER_PAGE = 9;

  const handleAddClick = async (prodId) => {
    setLoadingIds((prev) => ({ ...prev, [prodId]: true }));
    try {
      await handleAddToCart(prodId);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingIds((prev) => ({ ...prev, [prodId]: false }));
    }
  };

  // Cálculo de índices para la paginación basada en los productos filtrados
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE,
  );

  // Cambia de página y desplaza la vista al inicio de los resultados.
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <main className="lg:col-span-9 flex flex-col gap-space-lg">
      {loading ? (
        <div className="text-center py-12 text-secondary">
          Cargando productos...
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-12 text-secondary bg-surface-container-lowest border border-surface-variant rounded">
          No se encontraron productos que coincidan con los filtros
          seleccionados.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-gutter-desktop">
            {currentProducts.map((prod) => {
              const isThisLoading = !!loadingIds[prod.id];

              return (
                <article
                  key={prod.id}
                  className="bg-surface-container-lowest border border-surface-variant p-space-md rounded flex flex-col justify-between hover:border-primary transition-colors group"
                >
                  <div>
                    <div className="w-full h-48 bg-surface-container-low border border-surface-variant flex items-center justify-center p-2 rounded-sm mb-space-sm overflow-hidden">
                      <img
                        className="h-full w-auto object-contain group-hover:scale-105 transition-transform duration-200"
                        src={prod.img}
                        alt={prod.nombre}
                      />
                    </div>
                    <div className="flex flex-col mb-space-sm">
                      <span className="font-label-sm text-[11px] text-secondary uppercase font-bold">
                        {prod.categorias?.nombre || "Hardware"}
                      </span>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors leading-snug line-clamp-2">
                        {prod.nombre}
                      </h3>
                    </div>
                    <p className="font-body-sm text-body-sm text-secondary line-clamp-3 mb-space-sm">
                      {prod.descripcion}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 font-label-sm text-label-sm text-tertiary mb-2">
                      <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                      <span>Stock disponible: {prod.stock} un.</span>
                    </div>
                    <div className="border-t border-surface-variant pt-space-xs mb-space-sm">
                      <div className="flex flex-col">
                        <span className="font-label-sm text-[10px] text-secondary uppercase">
                          Precio contado
                        </span>
                        <span className="font-headline-md text-headline-md text-primary font-bold leading-none">
                          ${Number(prod.precio).toLocaleString("es-AR")}
                          <span className="text-xs font-normal text-secondary ml-1">
                            ARS
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      <button
                        className="col-span-3 h-10 bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md uppercase font-bold rounded flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        type="button"
                        onClick={() => handleAddClick(prod.id)}
                        disabled={isThisLoading}
                      >
                        {isThisLoading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-on-primary border-t-transparent rounded-full animate-spin"></div>
                            <span>Agregando...</span>
                          </>
                        ) : (
                          <>
                            <span className="material-symbols-outlined text-[18px]">
                              add_shopping_cart
                            </span>
                            <span>Comprar</span>
                          </>
                        )}
                      </button>
                      <Link
                        className="col-span-1 h-10 border border-surface-variant hover:border-on-surface bg-surface-container-low text-secondary hover:text-on-surface font-label-sm text-label-sm uppercase rounded flex items-center justify-center transition-colors"
                        to={`/product-details/${prod.id}`}
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          info
                        </span>
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Barra de navegación de páginas (Paginador) */}
          {totalPages > 1 && (
            <nav className="flex items-center justify-center gap-2 pt-space-md border-t border-surface-variant mt-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 h-10 border border-surface-variant bg-surface-container-low text-secondary hover:text-on-surface hover:border-on-surface font-label-sm uppercase rounded flex items-center gap-1 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">
                  chevron_left
                </span>
                <span>Anterior</span>
              </button>

              <div className="flex items-center gap-1 px-2">
                {Array.from({ length: totalPages }, (_, index) => {
                  const pageNumber = index + 1;
                  const isActive = pageNumber === currentPage;

                  return (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`w-10 h-10 rounded font-label-sm font-bold flex items-center justify-center transition-colors ${
                        isActive
                          ? "bg-primary text-on-primary"
                          : "border border-surface-variant bg-surface-container-lowest text-secondary hover:text-on-surface hover:border-on-surface"
                      }`}
                      type="button"
                    >
                      {pageNumber}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 h-10 border border-surface-variant bg-surface-container-low text-secondary hover:text-on-surface hover:border-on-surface font-label-sm uppercase rounded flex items-center gap-1 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                type="button"
              >
                <span>Siguiente</span>
                <span className="material-symbols-outlined text-[18px]">
                  chevron_right
                </span>
              </button>
            </nav>
          )}
        </>
      )}
    </main>
  );
}

export default SearchProductGrid;
