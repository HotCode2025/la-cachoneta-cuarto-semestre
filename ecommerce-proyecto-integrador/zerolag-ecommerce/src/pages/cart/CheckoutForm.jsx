import { useState } from "react";

/** Recopila los datos de envío y facturación antes del pago. */
function CheckoutForm({ setCurrentStep }) {
  const [direccion, setDireccion] = useState("");
  const [facturacion, setFacturacion] = useState("Consumidor Final");

  const handleSubmitEnvioFacturacion = (e) => {
    e.preventDefault();
    // Continúa al paso de pago mientras no se envían estos datos al servidor.
    setCurrentStep(3);
  };

  return (
    <div className="bg-surface-container-lowest border border-surface-variant rounded-DEFAULT p-space-lg max-w-2xl mx-auto w-full">
      <h2 className="font-headline-sm text-headline-sm uppercase tracking-tight text-on-surface mb-space-md">
        Envío y Facturación
      </h2>
      <form
        onSubmit={handleSubmitEnvioFacturacion}
        className="flex flex-col gap-space-md"
      >
        {/* Dirección de envío */}
        <div className="flex flex-col gap-1.5">
          <label className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
            Dirección de Envío
          </label>
          <input
            type="text"
            required
            className="h-10 px-space-sm bg-surface-container-low border border-surface-variant text-body-md text-on-surface rounded-DEFAULT focus:outline-none focus:border-primary-container"
            placeholder="Ej: Av. Corrientes 1234, CABA"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
          />
        </div>

        {/* Tipo de facturación */}
        <div className="flex flex-col gap-1.5">
          <label className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
            Tipo de Facturación
          </label>
          <select
            className="h-10 px-space-sm bg-surface-container-low border border-surface-variant text-body-md text-on-surface rounded-DEFAULT focus:outline-none focus:border-primary-container"
            value={facturacion}
            onChange={(e) => setFacturacion(e.target.value)}
          >
            <option value="Consumidor Final">
              Factura B - Consumidor Final
            </option>
            <option value="Responsable Inscripto">
              Factura A - Responsable Inscripto
            </option>
            <option value="Monotributo">Factura A - Monotributo</option>
          </select>
        </div>

        <button
          type="submit"
          className="mt-4 w-full h-12 bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg uppercase tracking-wider font-bold rounded-DEFAULT transition-colors flex items-center justify-center gap-space-xs"
        >
          <span>Proceder a Pagar</span>
          <span className="material-symbols-outlined text-[20px]">
            arrow_forward
          </span>
        </button>
      </form>
    </div>
  );
}

export default CheckoutForm;
