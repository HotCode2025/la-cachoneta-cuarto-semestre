import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router";

/** Muestra los datos de un producto y permite agregarlo al carrito. */
function ProductDetailsPage({ handleAddToCart }) {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`/api/productos/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error al obtener los detalles del producto:", error);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

  const onAddToCart = async () => {
    if (!product || isAdding) return;
    try {
      setIsAdding(true);
      await handleAddToCart(product.id);
    } catch (error) {
      console.error("Error al agregar al carrito desde detalles:", error);
    } finally {
      setIsAdding(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full pt-[156px] bg-surface min-h-[calc(100vh-156px)] flex items-center justify-center">
        <p className="text-on-surface font-headline-md">
          Cargando detalles del producto...
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="w-full pt-[156px] bg-surface min-h-[calc(100vh-156px)] flex items-center justify-center">
        <p className="text-on-surface font-headline-md">
          Producto no encontrado.
        </p>
      </div>
    );
  }

  return (
    <>
      <main className="w-full pt-[156px] bg-surface min-h-[calc(100vh-156px)]">
        <div className="flex flex-col w-full">
          <div className="max-w-[1320px] mx-auto px-margin-desktop py-space-md w-full">
            {/* Navegación de rutas */}
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-space-xs text-secondary font-label-md text-label-md mb-space-lg flex-wrap"
            >
              <Link
                to="/"
                className="hover:text-primary transition-colors flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[16px]">
                  home
                </span>
                <span>Inicio</span>
              </Link>
              <span className="text-surface-variant font-bold">/</span>
              <span className="hover:text-primary transition-colors">
                {product.categorias?.nombre || "Categoría"}
              </span>
              <span className="text-surface-variant font-bold">/</span>
              <span className="text-on-surface font-semibold truncate max-w-xs md:max-w-md">
                {product.nombre}
              </span>
            </nav>

            {/* Galería del producto y detalles de compra */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-start">
              {/* Imagen del producto */}
              <div className="lg:col-span-7 flex flex-col gap-space-md">
                <div className="relative bg-surface-container-lowest border border-surface-variant rounded-none p-space-lg flex items-center justify-center min-h-[460px]">
                  <div className="absolute top-space-md left-space-md flex flex-col gap-1 z-10">
                    <span className="bg-primary text-on-primary font-label-sm text-label-sm px-2 py-1 tracking-wider uppercase font-bold">
                      Destacado
                    </span>
                  </div>
                  <button
                    className="absolute top-space-md right-space-md w-9 h-9 border border-surface-variant bg-surface-container-lowest text-secondary hover:text-primary hover:border-primary flex items-center justify-center transition-colors"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      favorite_border
                    </span>
                  </button>
                  <img
                    alt={product.nombre}
                    className="max-h-[380px] w-auto object-contain select-none"
                    src={product.img}
                  />
                </div>

                {/* Insignias y garantía */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-sm mt-space-xs">
                  <div className="border border-surface-variant bg-surface-container-low p-space-sm flex items-center gap-space-sm">
                    <div className="w-10 h-10 bg-surface-container-lowest border border-surface-variant flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-primary text-[22px]">
                        verified_user
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md font-bold text-on-surface uppercase leading-tight">
                        Garantía Oficial
                      </span>
                      <span className="font-body-sm text-body-sm text-secondary">
                        Soporte directo y factura A/B
                      </span>
                    </div>
                  </div>
                  <div className="border border-surface-variant bg-surface-container-low p-space-sm flex items-center gap-space-sm">
                    <div className="w-10 h-10 bg-surface-container-lowest border border-surface-variant flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-tertiary text-[22px]">
                        local_shipping
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md font-bold text-on-surface uppercase leading-tight">
                        Envío Rápido
                      </span>
                      <span className="font-body-sm text-body-sm text-secondary">
                        Despacho seguro garantizado
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Compra y especificaciones */}
              <div className="lg:col-span-5 flex flex-col border border-surface-variant bg-surface-container-lowest p-space-lg gap-space-md">
                {/* Información y calificación */}
                <div className="flex flex-col gap-1 border-b border-surface-variant pb-space-sm">
                  <div className="flex items-center justify-between font-label-sm text-label-sm text-secondary uppercase flex-wrap gap-2">
                    <span>
                      ID:
                      <strong className="text-on-surface font-semibold ml-1">
                        {product.id}
                      </strong>
                    </span>
                    <span className="text-tertiary flex items-center gap-1 font-bold">
                      <span className="w-2 h-2 rounded-full bg-tertiary inline-block"></span>
                      En Stock ({product.stock} un.)
                    </span>
                  </div>
                  <h1 className="font-headline-md text-headline-md text-on-surface mt-1 leading-tight tracking-tight">
                    {product.nombre}
                  </h1>
                </div>

                {/* Precio */}
                <div className="bg-surface-container-low border border-surface-variant p-space-md flex flex-col gap-space-sm">
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">
                      Precio:
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-headline-xl text-headline-xl text-primary font-extrabold tracking-tight">
                        ${Number(product.precio).toLocaleString("es-AR")}
                      </span>
                    </div>
                    <span className="font-body-sm text-body-sm text-secondary mt-0.5">
                      IVA incluido • Emitimos Factura A o B
                    </span>
                  </div>
                </div>

                {/* Descripción */}
                <div className="border-t border-surface-variant pt-space-md flex flex-col gap-2">
                  <h3 className="font-label-lg text-label-lg text-on-surface font-bold uppercase">
                    Descripción
                  </h3>
                  <p className="font-body-md text-body-md text-secondary leading-relaxed">
                    {product.descripcion}
                  </p>
                </div>

                {/* Cantidad y acción de compra */}
                <div className="flex flex-col gap-space-sm pt-space-xs">
                  <button
                    onClick={onAddToCart}
                    disabled={isAdding || product.stock <= 0}
                    className="w-full h-11 bg-primary text-on-primary font-label-lg text-label-lg font-bold flex items-center justify-center gap-2 hover:bg-[#8f0d15] active:scale-[0.99] transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
                    type="button"
                  >
                    {isAdding ? (
                      <>
                        <span className="material-symbols-outlined text-[20px] animate-spin">
                          progress_activity
                        </span>
                        <span>AGREGANDO...</span>
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-[20px]">
                          shopping_cart
                        </span>
                        <span>AGREGAR AL CARRITO</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default ProductDetailsPage;
