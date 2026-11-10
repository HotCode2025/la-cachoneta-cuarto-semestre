import { useEffect, useState } from "react";
import axiosAuth from "../../api/axiosAuth.js";

/** Crea la preferencia de pago y redirige al usuario a la pasarela. */
function PaymentConfirmation({ pedidoId }) {
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const crearPreferenciaPago = async () => {
      try {
        const response = await axiosAuth.post("/api/pagos/crear-preferencia", {
          pedido_id: pedidoId,
        });

        const urlPago = response.data?.url_pago_prueba;

        if (urlPago) {
          window.location.href = urlPago;
        } else {
          setErrorMsg("No se encontró la URL de pago en la respuesta.");
        }
      } catch (error) {
        console.error("Error al crear preferencia de pago:", error);
        setErrorMsg("Hubo un problema al conectar con la pasarela de pagos.");
      }
    };

    if (pedidoId) {
      crearPreferenciaPago();
    }
  }, [pedidoId]);

  return (
    <div className="bg-surface-container-lowest border border-surface-variant rounded-DEFAULT p-space-xl max-w-md mx-auto w-full text-center flex flex-col items-center justify-center gap-space-md min-h-[300px]">
      {!errorMsg ? (
        <>
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <h2 className="font-headline-sm text-headline-sm uppercase tracking-tight text-on-surface">
            Redirigiendo a Mercado Pago...
          </h2>
          <p className="font-body-md text-secondary">
            Por favor, aguardá unos segundos mientras procesamos tu pago de
            forma segura.
          </p>
        </>
      ) : (
        <div className="flex flex-col gap-2 text-error">
          <span className="material-symbols-outlined text-[36px]">error</span>
          <p className="font-bold">{errorMsg}</p>
        </div>
      )}
    </div>
  );
}

export default PaymentConfirmation;
