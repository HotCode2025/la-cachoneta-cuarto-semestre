import { useState, useEffect } from "react";
import CartLayout from "./cart/CartLayout";
import StepperBuyProcess from "./cart/StepperBuyProcess";
import CheckoutForm from "./cart/CheckoutForm";
import PaymentConfirmation from "./cart/PaymentConfirmation";
import axiosAuth from "../api/axiosAuth.js";

/** Gestiona los pasos del proceso de compra y el pedido pendiente. */
function CartPage({ cart, loadCart }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [pedidoId, setPedidoId] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);

  // Recupera el pedido pendiente para continuar un proceso de compra iniciado.
  useEffect(() => {
    const verificarPedidoPendiente = async () => {
      try {
        const response = await axiosAuth.get("/api/pedidos");
        const pedidos = response.data || [];

        const pedidoPendiente = pedidos.find((p) => p.estado === "PENDIENTE");

        if (pedidoPendiente) {
          const idEncontrado = pedidoPendiente.id;
          setPedidoId(idEncontrado);
          setCurrentStep(2); // Continúa en el paso de envío y facturación.
        }
      } catch (error) {
        console.error("Error al verificar pedidos existentes:", error);
      } finally {
        setLoadingInitial(false);
      }
    };

    verificarPedidoPendiente();
  }, []);

  /** Restablece el proceso de compra para iniciar un pedido nuevo. */
  const resetCheckout = () => {
    setCurrentStep(1);
    setPedidoId(null);
  };

  if (loadingInitial) {
    return (
      <div className="w-full pt-[156px] bg-surface min-h-[calc(100vh-156px)] flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span className="font-body-md text-secondary uppercase tracking-wider text-xs">
            Verificando estado del carrito...
          </span>
        </div>
      </div>
    );
  }

  return (
    <>
      <link rel="icon" type="image/svg+xml" href="/cart-favicon.svg" />
      <title>Carrito</title>

      <main className="w-full pt-[156px] bg-surface min-h-[calc(100vh-156px)]">
        <div className="flex flex-col w-full">
          <div className="max-w-[1320px] mx-auto w-full px-margin-desktop py-space-lg">
            <StepperBuyProcess currentStep={currentStep} />

            {currentStep === 1 && (
              <CartLayout
                cart={cart}
                loadCart={loadCart}
                setCurrentStep={setCurrentStep}
                setPedidoId={setPedidoId}
              />
            )}

            {currentStep === 2 && (
              <CheckoutForm
                cart={cart}
                pedidoId={pedidoId}
                setCurrentStep={setCurrentStep}
              />
            )}

            {currentStep === 3 && (
              <PaymentConfirmation
                pedidoId={pedidoId}
                resetCheckout={resetCheckout}
              />
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default CartPage;
