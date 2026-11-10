import dayjs from "dayjs";
import es from "dayjs/locale/es";
import { formatMoney } from "../../../utils/money";
import { useState } from "react";
import axiosAuth from "../../../api/axiosAuth.js";

dayjs.locale(es);

/** Muestra los importes del carrito y permite iniciar el pago. */
function CheckoutSummary({ cart, setCurrentStep, setPedidoId, loadCart }) {
  const [costoEnvio, setCostoEnvio] = useState("GRATIS");
  const [loadingPedido, setLoadingPedido] = useState(false);

  const pago = cart?.carrito_items?.reduce(
    (totalQuantity, cartItem) =>
      totalQuantity + cartItem.cantidad * cartItem.productos.precio,
    0,
  );

  const handleContinuarPago = async () => {
    try {
      setLoadingPedido(true);
      const response = await axiosAuth.post("/api/pedidos");
      const idPedidoCreado = response.data.id || response.data.pedido?.id;

      setPedidoId(idPedidoCreado);

      // Actualiza el carrito después de crear el pedido.
      await loadCart();

      setCurrentStep(2);
    } catch (error) {
      console.error("Error al crear el pedido:", error);
      alert("Hubo un error al generar el pedido. Intenta nuevamente.");
    } finally {
      setLoadingPedido(false);
    }
  };

  return (
    <aside className="lg:col-span-4 flex flex-col gap-space-md sticky top-[176px]">
      <div className="bg-surface-container-lowest border border-surface-variant rounded-DEFAULT overflow-hidden">
        <div className="p-space-md bg-surface-container border-b border-surface-variant">
          <h2 className="font-headline-sm text-headline-sm uppercase tracking-tight text-on-surface flex items-center justify-between">
            <span>Resumen del Pedido</span>
            <span className="material-symbols-outlined text-[20px] text-secondary">
              receipt_long
            </span>
          </h2>
        </div>
        <div className="p-space-md flex flex-col gap-space-md">
          {pago && (
            <>
              {/* Desglose de Importes */}
              <div className="flex flex-col gap-space-xs font-body-md text-body-md border-b border-surface-variant pb-space-md">
                <div className="flex items-center justify-between text-secondary">
                  <span>
                    Subtotal Hardware (
                    <span id="summary-qty">
                      {cart?.carrito_items?.reduce(
                        (totalQuantity, cartItem) =>
                          totalQuantity + cartItem.cantidad,
                        0,
                      ) ?? 0}{" "}
                    </span>
                    productos)
                  </span>
                  <span
                    className="font-bold text-on-surface"
                    id="summary-subtotal"
                  >
                    {formatMoney(pago)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-secondary">
                  <span>Costo de Envío</span>
                  <span
                    className="font-bold text-on-surface"
                    id="summary-shipping"
                  >
                    {costoEnvio}
                  </span>
                </div>
              </div>

              {/* Calculador de Envíos y Retiro */}
              <fieldset className="flex flex-col gap-space-xs border-b border-surface-variant pb-space-md">
                <legend className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold mb-2">
                  Seleccioná Método de Entrega:
                </legend>
                <label className="flex items-start gap-space-sm p-space-sm border border-surface-variant bg-surface-container-low hover:border-on-surface cursor-pointer rounded-DEFAULT transition-colors">
                  <input
                    defaultChecked
                    className="mt-1 accent-primary"
                    name="shipping-method"
                    onChange={() => {
                      setCostoEnvio("GRATIS");
                    }}
                    type="radio"
                    value="0"
                  />
                  <div className="flex flex-col w-full">
                    <div className="flex items-center justify-between">
                      <span className="font-label-md text-label-md text-on-surface font-bold">
                        Retiro en Belgrano, CABA
                      </span>
                      <span className="font-label-sm text-label-sm text-tertiary font-bold uppercase">
                        GRATIS
                      </span>
                    </div>
                    <span className="font-body-sm text-[11px] text-secondary">
                      Av. Cabildo 2450, Piso 3. Listo en 2 horas hábiles.
                    </span>
                  </div>
                </label>
                <label className="flex items-start gap-space-sm p-space-sm border border-surface-variant bg-surface-container-low hover:border-on-surface cursor-pointer rounded-DEFAULT transition-colors">
                  <input
                    className="mt-1 accent-primary"
                    name="shipping-method"
                    onChange={(e) => {
                      setCostoEnvio(formatMoney(e.target.value));
                    }}
                    type="radio"
                    value="8500"
                  />
                  <div className="flex flex-col w-full">
                    <div className="flex items-center justify-between">
                      <span className="font-label-md text-label-md text-on-surface font-bold">
                        Envío Moto Express CABA/GBA
                      </span>
                      <span className="font-label-md text-label-md text-on-surface font-bold">
                        $8.500
                      </span>
                    </div>
                    <span className="font-body-sm text-[11px] text-secondary">
                      Llega hoy comprando antes de las 14:00 hs.
                    </span>
                  </div>
                </label>
                <label className="flex items-start gap-space-sm p-space-sm border border-surface-variant bg-surface-container-low hover:border-on-surface cursor-pointer rounded-DEFAULT transition-colors">
                  <input
                    className="mt-1 accent-primary"
                    name="shipping-method"
                    onChange={(e) => {
                      setCostoEnvio(formatMoney(e.target.value));
                    }}
                    type="radio"
                    value="14200"
                  />
                  <div className="flex flex-col w-full">
                    <div className="flex items-center justify-between">
                      <span className="font-label-md text-label-md text-on-surface font-bold">
                        Andreani Nacional Puerta a Puerta
                      </span>
                      <span className="font-label-md text-label-md text-on-surface font-bold">
                        $14.200
                      </span>
                    </div>
                    <span className="font-body-sm text-[11px] text-secondary">
                      Seguimiento en línea 100% asegurado (2 a 4 días).
                    </span>
                  </div>
                </label>
              </fieldset>

              {/* Campo Cupón de Descuento */}
              <div className="flex flex-col gap-1.5 border-b border-surface-variant pb-space-md">
                <label
                  className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold"
                  htmlFor="coupon-code"
                >
                  ¿Tenés cupón de descuento?
                </label>
                <div className="flex gap-space-xs">
                  <input
                    className="flex-1 h-10 px-space-sm bg-surface-container-low border border-surface-variant text-body-md font-body-md text-on-surface placeholder:text-secondary rounded-DEFAULT uppercase focus:outline-none focus:border-primary-container"
                    id="coupon-code"
                    placeholder="Ej: BIENVENIDO-ZEROLAG"
                    type="text"
                  />
                  <button
                    className="h-10 px-space-md bg-surface-container border border-surface-variant hover:border-on-surface text-on-surface font-label-md text-label-md uppercase font-bold rounded-DEFAULT transition-colors"
                    onClick={() => {}}
                    type="button"
                  >
                    Aplicar
                  </button>
                </div>
                <p
                  className="font-body-sm text-[11px] text-tertiary hidden"
                  id="coupon-msg"
                >
                  Cupón aplicado con éxito (-$0 adicional).
                </p>
              </div>

              {/* Bloque de Total Definitivo */}
              <div className="flex flex-col gap-space-xs bg-surface-container-low p-space-md border border-surface-variant rounded-DEFAULT">
                <span className="font-label-sm text-[11px] uppercase tracking-wider text-secondary font-bold">
                  Total con Transferencia / Débito (-15% OFF)
                </span>
                <div
                  className="font-headline-lg text-headline-lg font-bold text-primary leading-none"
                  id="total-cash"
                >
                  {formatMoney(pago)}
                </div>
                <div className="mt-2 pt-2 border-t border-surface-variant flex flex-col gap-0.5">
                  <span className="font-body-sm text-body-sm text-secondary">
                    O con Tarjetas de Crédito:
                  </span>
                  <span
                    className="font-label-md text-label-md text-on-surface font-bold"
                    id="total-installments"
                  >
                    12 cuotas fijas de {formatMoney(pago / 12)}
                  </span>
                  <span className="font-body-sm text-[10px] text-secondary">
                    CFT: 0,00% | Precio de lista: {formatMoney(pago)}
                  </span>
                </div>
              </div>

              {/* Botón Primario de Checkout */}
              <button
                className="w-full h-12 bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg uppercase tracking-wider font-bold rounded-DEFAULT transition-colors flex items-center justify-center gap-space-xs disabled:opacity-50"
                type="button"
                onClick={handleContinuarPago}
                disabled={loadingPedido}
              >
                <span>
                  {loadingPedido ? "Generando Pedido..." : "Continuar al Pago"}
                </span>
                <span className="material-symbols-outlined text-[20px]">
                  arrow_forward
                </span>
              </button>

              {/* Sellos de Confianza y Seguridad */}
              <div className="pt-space-xs flex flex-col gap-2">
                <span className="font-label-sm text-[10px] uppercase tracking-wider text-secondary text-center font-bold">
                  Medios de pago procesados al instante
                </span>
                <div className="grid grid-cols-4 gap-1 text-center font-label-sm text-[10px] text-secondary">
                  <span className="p-1 border border-surface-variant bg-surface-container-lowest rounded-DEFAULT">
                    Transferencia
                  </span>
                  <span className="p-1 border border-surface-variant bg-surface-container-lowest rounded-DEFAULT">
                    MercadoPago
                  </span>
                  <span className="p-1 border border-surface-variant bg-surface-container-lowest rounded-DEFAULT">
                    Visa / Master
                  </span>
                  <span className="p-1 border border-surface-variant bg-surface-container-lowest rounded-DEFAULT">
                    MODO Bancos
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}

export default CheckoutSummary;
