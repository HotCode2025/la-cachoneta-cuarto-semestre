import { useMemo } from "react";
import FlashProduct from "./FlashProduct.jsx";

function FlashOffersAndFeatured({
  products,
  loadCart,
  handleAddToCart,
  loading,
}) {
  const productosFiltradosYAzar = useMemo(() => {
    if (!products) return [];
    return products
      .filter((product) => product.stock < 10) // Solo stock menor a 10
      .sort(() => Math.random() - 0.5) // Ordena los productos de forma aleatoria.
      .slice(0, 6); // Toma un máximo de 6 productos
  }, [products]);

  if (loading) {
    return (
      <div className="w-full pt-[156px] bg-surface min-h-[calc(100vh-156px)] flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span className="font-body-md text-secondary uppercase tracking-wider text-xs">
            Cargando ofertas relámpago...
          </span>
        </div>
      </div>
    );
  }

  return (
    <section className="w-full border-b border-surface-variant bg-surface">
      <div className="max-w-[1320px] mx-auto px-margin-desktop py-space-2xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg pb-space-xs border-b border-surface-variant gap-space-sm">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-primary text-on-primary font-label-sm text-label-sm px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                Flash Sale
              </span>
              <span className="text-secondary font-body-sm text-body-sm flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-primary">
                  timer
                </span>
                Precios válidos hasta agotar stock asignado
              </span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface uppercase tracking-tight mt-1">
              Ofertas Relámpago y Hardware Destacado
            </h2>
          </div>
          <div className="flex items-center gap-space-sm font-label-sm text-label-sm">
            <span className="text-secondary">
              Moneda: ARS (Pesos Argentinos)
            </span>
            <span className="text-surface-variant">|</span>
            <span className="text-tertiary font-bold">
              IVA Incluido Factura A y B
            </span>
          </div>
        </div>

        {/* Contenedor Grid donde irán las tarjetas de productos desde la Base de Datos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-space-md">
          {productosFiltradosYAzar.map((product) => {
            return (
              <FlashProduct
                key={product.id}
                product={product}
                loadCart={loadCart}
                handleAddToCart={handleAddToCart}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FlashOffersAndFeatured;
