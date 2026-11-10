function LocalBenefits() {
  return (
    <section className="w-full border-b border-surface-variant bg-surface-container-lowest">
      <div className="max-w-[1320px] mx-auto px-margin-desktop py-space-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
          <div className="border border-surface-variant p-space-md flex items-start gap-space-sm bg-surface">
            <div className="w-10 h-10 shrink-0 bg-surface-container flex items-center justify-center rounded">
              <span className="material-symbols-outlined text-on-surface text-[22px]">
                local_shipping
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-lg text-label-lg text-on-surface font-bold">
                Envíos Seguros a Todo el País
              </span>
              <span className="font-body-sm text-body-sm text-secondary mt-1">
                Andreani, Correo Argentino y Moto Express en CABA/GBA en el día.
              </span>
            </div>
          </div>
          <div className="border border-surface-variant p-space-md flex items-start gap-space-sm bg-surface">
            <div className="w-10 h-10 shrink-0 bg-tertiary-container flex items-center justify-center rounded">
              <span className="material-symbols-outlined text-on-tertiary text-[22px]">
                payments
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-lg text-label-lg text-tertiary font-bold">
                15% OFF Transferencia Directa
              </span>
              <span className="font-body-sm text-body-sm text-secondary mt-1">
                Acreditación instantánea vía CBU/CVU con precio final
                bonificado.
              </span>
            </div>
          </div>
          <div className="border border-surface-variant p-space-md flex items-start gap-space-sm bg-surface">
            <div className="w-10 h-10 shrink-0 bg-surface-container flex items-center justify-center rounded">
              <span className="material-symbols-outlined text-on-surface text-[22px]">
                format_image_left
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-lg text-label-lg text-on-surface font-bold">
                Garantía y RMA Express
              </span>
              <span className="font-body-sm text-body-sm text-secondary mt-1">
                Cambio directo durante los primeros 30 días en nuestro local de
                Belgrano.
              </span>
            </div>
          </div>
          <div className="border border-surface-variant p-space-md flex items-start gap-space-sm bg-surface">
            <div className="w-10 h-10 shrink-0 bg-surface-container flex items-center justify-center rounded">
              <span className="material-symbols-outlined text-on-surface text-[22px]">
                support_agent
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-lg text-label-lg text-on-surface font-bold">
                Soporte por Especialistas
              </span>
              <span className="font-body-sm text-body-sm text-secondary mt-1">
                Asesoría técnica en compatibilidad de componentes vía WhatsApp.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LocalBenefits;
