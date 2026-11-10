function RightCol() {
  return (
    <div className="lg:col-span-5 flex flex-col gap-space-md">
      {/* Beneficios de la Cuenta */}
      <div className="bg-surface-container-lowest border border-surface-variant rounded-lg p-space-lg">
        <div className="flex items-center gap-space-xs mb-space-md border-b border-surface-variant pb-space-sm">
          <span className="material-symbols-outlined text-primary text-[22px]">
            verified_user
          </span>
          <h3 className="font-headline-sm text-headline-sm text-on-surface">
            Beneficios de tu Cuenta ZeroLag
          </h3>
        </div>
        <div className="flex flex-col gap-space-md">
          <div className="flex items-start gap-space-sm p-space-sm bg-surface rounded border border-surface-variant">
            <div className="w-8 h-8 rounded bg-tertiary-container text-on-tertiary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[18px]">
                percent
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-lg text-label-lg text-on-surface font-bold">
                15% OFF Primera Transferencia
              </span>
              <span className="font-body-sm text-body-sm text-secondary mt-0.5">
                Precio cash directo liquidado al tipo de cambio BNA sin recargo
                bancario extra.
              </span>
            </div>
          </div>
          <div className="flex items-start gap-space-sm p-space-sm bg-surface rounded border border-surface-variant">
            <div className="w-8 h-8 rounded bg-surface-container text-primary flex items-center justify-center shrink-0 border border-surface-variant">
              <span className="material-symbols-outlined text-[18px]">
                build_circle
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-lg text-label-lg text-on-surface font-bold">
                Seguimiento RMA y Garantías
              </span>
              <span className="font-body-sm text-body-sm text-secondary mt-0.5">
                Ticket único con número de serie del componente para reemplazo
                directo en laboratorio técnico.
              </span>
            </div>
          </div>
          <div className="flex items-start gap-space-sm p-space-sm bg-surface rounded border border-surface-variant">
            <div className="w-8 h-8 rounded bg-surface-container text-on-surface flex items-center justify-center shrink-0 border border-surface-variant">
              <span className="material-symbols-outlined text-[18px]">
                memory
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-lg text-label-lg text-on-surface font-bold">
                Historial de Compatibilidad
              </span>
              <span className="font-body-sm text-body-sm text-secondary mt-0.5">
                Guardá tus ensambles en el configurador y verificá
                compatibilidad de socket, TDP y clearance de gabinete.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Información de Showroom y Retiros */}
      <div className="bg-surface-container-low border border-surface-variant rounded-lg p-space-md flex flex-col gap-space-sm">
        <div className="flex items-center justify-between">
          <span className="font-label-sm text-label-sm uppercase font-bold text-secondary tracking-wider">
            Atención Presencial &amp; Retiros
          </span>
          <span className="font-label-sm text-tertiary font-bold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-tertiary"></span>
            Showroom Abierto
          </span>
        </div>
        <div className="flex items-start gap-space-sm text-body-sm font-body-sm text-on-surface">
          <span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">
            location_on
          </span>
          <div className="flex flex-col">
            <span className="font-bold">Showroom Belgrano, CABA</span>
            <span className="text-secondary">
              Av. Cabildo 2450, Piso 3 - Oficinas ZeroLag
            </span>
            <span className="text-secondary text-[11px] mt-1">
              Lunes a Viernes 10:00 a 19:00 hs | Sábados 10:00 a 14:00 hs
            </span>
          </div>
        </div>
        <div className="border-t border-surface-variant pt-space-xs flex items-center justify-between font-label-sm text-label-sm">
          <span className="text-secondary">Soporte por WhatsApp:</span>
          <span className="font-bold text-on-surface">+54 11 4920-8800</span>
        </div>
      </div>

      {/* Sello de Seguridad Bancaria */}
      <div className="border border-surface-variant rounded-lg bg-surface-container-lowest p-space-md flex items-center justify-between gap-space-md">
        <div className="flex flex-col">
          <span className="font-label-sm text-[10px] uppercase tracking-wider text-secondary font-bold">
            Seguridad Bancaria
          </span>
          <span className="font-body-sm text-body-sm text-on-surface">
            Operaciones verificadas con token y cifrado SSL
          </span>
        </div>
        <div className="flex items-center gap-1 text-secondary">
          <span className="material-symbols-outlined text-[20px] text-tertiary">
            shield
          </span>
          <span className="font-label-sm text-[11px] font-bold">256-BIT</span>
        </div>
      </div>
    </div>
  );
}

export default RightCol;
