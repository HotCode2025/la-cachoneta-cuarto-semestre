import CartItemDetails from "./hardwarelisting/CartItemDetails.jsx";
import axiosAuth from "../../../api/axiosAuth.js";

/** Renderiza los productos del carrito y los servicios asociados. */
function HardwareListing({ cart, loadCart }) {
  return (
    <section className="lg:col-span-8 flex flex-col gap-space-md top-[176px]">
      <div className="bg-surface-container-lowest border border-surface-variant rounded-DEFAULT overflow-hidden">
        <div className="px-space-md py-space-sm bg-surface-container border-b border-surface-variant flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-[18px] text-primary">
              memory
            </span>
            <h1 className="font-headline-sm text-headline-sm uppercase tracking-tight text-on-surface">
              Hardware en Carrito (
              <span id="cart-item-count">
                {cart?.carrito_items?.reduce(
                  (totalQuantity, cartItem) =>
                    totalQuantity + cartItem.cantidad,
                  0,
                ) ?? 0}
              </span>
              )
            </h1>
          </div>
        </div>

        <div
          className="divide-y divide-surface-variant"
          id="cart-items-container"
        >
          {cart?.carrito_items?.map((cartItem) => {
            const deleteCartItem = async () => {
              await axiosAuth.delete(`/api/carrito/items/${cartItem.id}`);
              await loadCart();
            };

            return (
              <article
                key={cartItem.id}
                className="p-space-md flex flex-col sm:flex-row gap-space-md items-start sm:items-center justify-between bg-surface-container-lowest"
                data-product-id="tuf-4070ti"
              >
                <CartItemDetails
                  cartItem={cartItem}
                  loadCart={loadCart}
                  deleteCartItem={deleteCartItem}
                />
              </article>
            );
          })}
        </div>

        {/* Acciones secundarias del carrito */}
        <div className="p-space-md bg-surface-container-low border-t border-surface-variant flex flex-col sm:flex-row items-center justify-between gap-space-md">
          <a
            className="font-label-md text-label-md text-secondary hover:text-on-surface flex items-center gap-space-xs transition-colors"
            href="#"
          >
            <span className="material-symbols-outlined text-[18px]">
              arrow_back
            </span>
            <span>Seguir agregando componentes</span>
          </a>
          <div className="flex items-center gap-space-sm text-secondary font-label-sm text-label-sm">
            <span className="material-symbols-outlined text-[18px] text-tertiary">
              lock
            </span>
            <span>Checkout 256-bit SSL Encriptado</span>
          </div>
        </div>
      </div>

      {/* Subsección: Servicios Extras Garantizados ZeroLag */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
        <div className="p-space-md bg-surface-container-lowest border border-surface-variant rounded-DEFAULT flex items-start gap-space-sm">
          <span className="material-symbols-outlined text-primary text-[24px]">
            construction
          </span>
          <div>
            <h3 className="font-label-md text-label-md text-on-surface uppercase font-bold">
              Servicio de Ensamble
            </h3>
            <p className="font-body-sm text-body-sm text-secondary mt-0.5">
              Armado, gestión de cables y benchmark térmico previo a la entrega
              sin cargo extra.
            </p>
          </div>
        </div>
        <div className="p-space-md bg-surface-container-lowest border border-surface-variant rounded-DEFAULT flex items-start gap-space-sm">
          <span className="material-symbols-outlined text-primary text-[24px]">
            verified
          </span>
          <div>
            <h3 className="font-label-md text-label-md text-on-surface uppercase font-bold">
              Facturación A / B
            </h3>
            <p className="font-body-sm text-body-sm text-secondary mt-0.5">
              Emitimos comprobantes oficiales AFIP con CUIT al completar tus
              datos fiscales.
            </p>
          </div>
        </div>
        <div className="p-space-md bg-surface-container-lowest border border-surface-variant rounded-DEFAULT flex items-start gap-space-sm">
          <span className="material-symbols-outlined text-primary text-[24px]">
            support_agent
          </span>
          <div>
            <h3 className="font-label-md text-label-md text-on-surface uppercase font-bold">
              Soporte RMA Directo
            </h3>
            <p className="font-body-sm text-body-sm text-secondary mt-0.5">
              Canal de gestión técnica express en Belgrano, CABA con stock
              propio de reemplazo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HardwareListing;
