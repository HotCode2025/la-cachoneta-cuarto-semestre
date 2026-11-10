function StepperBuyProcess({ currentStep = 1 }) {
  const getStepStyle = (stepNumber) => {
    if (currentStep === stepNumber) {
      return "bg-primary-container text-on-primary font-bold";
    }
    if (currentStep > stepNumber) {
      return "bg-surface-container text-primary font-bold";
    }
    return "bg-surface-container-lowest text-secondary";
  };

  const getBadgeStyle = (stepNumber) => {
    if (currentStep === stepNumber) {
      return "bg-surface-container-lowest text-primary";
    }
    return "border border-surface-variant text-secondary";
  };

  return (
    <nav
      aria-label="Progreso de Checkout"
      className="w-full mb-space-lg bg-surface-container-lowest border border-surface-variant rounded-DEFAULT"
    >
      <ol className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-surface-variant font-label-md text-label-md">
        <li
          className={`flex items-center gap-space-sm p-space-md ${getStepStyle(1)}`}
        >
          <span
            className={`flex items-center justify-center w-6 h-6 rounded-DEFAULT text-label-sm ${getBadgeStyle(1)}`}
          >
            1
          </span>
          <div className="flex flex-col">
            <span className="font-bold tracking-wide uppercase">
              Carrito de Compras
            </span>
            <span className="font-body-sm text-[11px] opacity-90 font-normal">
              Revisión de hardware y unidades
            </span>
          </div>
        </li>
        <li
          className={`flex items-center gap-space-sm p-space-md ${getStepStyle(2)}`}
        >
          <span
            className={`flex items-center justify-center w-6 h-6 rounded-DEFAULT text-label-sm ${getBadgeStyle(2)}`}
          >
            2
          </span>
          <div className="flex flex-col">
            <span className="font-bold tracking-wide uppercase">
              Envío y Facturación
            </span>
            <span className="font-body-sm text-[11px] opacity-90 font-normal">
              Destino, sucursal y comprobante fiscal
            </span>
          </div>
        </li>
        <li
          className={`flex items-center gap-space-sm p-space-md ${getStepStyle(3)}`}
        >
          <span
            className={`flex items-center justify-center w-6 h-6 rounded-DEFAULT text-label-sm ${getBadgeStyle(3)}`}
          >
            3
          </span>
          <div className="flex flex-col">
            <span className="font-bold tracking-wide uppercase">
              Pago y Confirmación
            </span>
            <span className="font-body-sm text-[11px] opacity-90 font-normal">
              Transferencia bancaria o cuotas
            </span>
          </div>
        </li>
      </ol>
    </nav>
  );
}

export default StepperBuyProcess;
