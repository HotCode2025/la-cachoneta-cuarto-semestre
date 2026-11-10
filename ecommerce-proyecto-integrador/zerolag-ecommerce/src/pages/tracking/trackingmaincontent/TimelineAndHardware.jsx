function TimelineAndHardware({ order }) {
  return (
    <div className="lg:col-span-8 flex flex-col gap-space-xl">
      {/* Live Timeline Stepper */}
      <div className="bg-surface-container-lowest border border-surface-variant rounded-[4px] p-space-lg">
        <div className="flex items-center justify-between border-b border-surface-variant pb-space-sm mb-space-lg">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-primary text-[22px]">
              route
            </span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
              Cadena de Custodia y Estados del Envío
            </h2>
          </div>
          <span className="font-label-sm text-label-sm text-secondary">
            Etapa 4 de 5
          </span>
        </div>
        {/* Vertical Timeline Steps */}
        <div className="relative pl-6 sm:pl-8 space-y-space-lg">
          {/* Connecting Line */}
          <div className="absolute left-2.5 sm:left-3.5 top-2 bottom-3 w-0.5 bg-surface-variant"></div>
          {/* Step 1: Completed */}
          <div className="relative flex items-start gap-space-md">
            <div className="absolute -left-6 sm:-left-8 mt-0.5 w-6 h-6 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[16px]">
                check
              </span>
            </div>
            <div className="flex-1 bg-surface-container-low p-space-md rounded-[2px] border border-surface-variant">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                <h3 className="font-label-lg text-label-lg font-bold text-on-surface">
                  1. Pedido Confirmado y Pago Acreditado
                </h3>
                <span className="font-label-sm text-[11px] text-secondary">
                  22 Oct, 10:15 hs
                </span>
              </div>
              <p className="font-body-md text-body-md text-secondary">
                Transferencia Bancaria BNA aprobada con beneficio del 15% OFF
                aplicada. Facturación electrónica generada con CUIT
                20-38491024-3.
              </p>
              <div className="mt-2 text-[11px] font-mono text-secondary flex items-center gap-2">
                <span className="bg-surface px-1.5 py-0.5 rounded-[2px] border border-surface-variant">
                  Comprobante #BNA-984102
                </span>
                <span className="text-tertiary flex items-center gap-0.5 font-bold">
                  <span className="material-symbols-outlined text-[14px]">
                    done_all
                  </span>
                  Verificado
                </span>
              </div>
            </div>
          </div>
          {/* Step 2: Completed */}
          <div className="relative flex items-start gap-space-md">
            <div className="absolute -left-6 sm:-left-8 mt-0.5 w-6 h-6 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[16px]">
                check
              </span>
            </div>
            <div className="flex-1 bg-surface-container-low p-space-md rounded-[2px] border border-surface-variant">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                <h3 className="font-label-lg text-label-lg font-bold text-on-surface">
                  2. Control de Números de Serie &amp; Embalaje Antiestático
                </h3>
                <span className="font-label-sm text-[11px] text-secondary">
                  22 Oct, 14:30 hs
                </span>
              </div>
              <p className="font-body-md text-body-md text-secondary">
                Técnico de laboratorio asignado verificó integridad de sellos de
                fábrica, escaneó serial de garantía directa y colocó precinto
                inviolable holográfico ZeroLag.
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px]">
                <span className="font-mono bg-surface px-2 py-0.5 rounded-[2px] border border-surface-variant text-on-surface">
                  Precinto: #ZL-SEC-8841
                </span>
                <span className="font-mono bg-surface px-2 py-0.5 rounded-[2px] border border-surface-variant text-on-surface">
                  Operador: Lab-04 (Control OK)
                </span>
              </div>
            </div>
          </div>
          {/* Step 3: Completed */}
          <div className="relative flex items-start gap-space-md">
            <div className="absolute -left-6 sm:-left-8 mt-0.5 w-6 h-6 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[16px]">
                check
              </span>
            </div>
            <div className="flex-1 bg-surface-container-low p-space-md rounded-[2px] border border-surface-variant">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                <h3 className="font-label-lg text-label-lg font-bold text-on-surface">
                  3. Despachado en Colecta Logística Andreani
                </h3>
                <span className="font-label-sm text-[11px] text-secondary">
                  22 Oct, 18:20 hs
                </span>
              </div>
              <p className="font-body-md text-body-md text-secondary">
                Bulto entregado a la unidad de transporte blindada Andreani en
                Centro de Distribución Mayorista Tortuguitas con destino al Hub
                Urbano Norte CABA.
              </p>
              <div className="mt-2 text-[11px] text-secondary flex items-center gap-2">
                <span className="bg-surface px-1.5 py-0.5 rounded-[2px] border border-surface-variant font-mono">
                  Manifiesto Colecta #AN-66329
                </span>
              </div>
            </div>
          </div>
          {/* Step 4: ACTIVE / IN PROGRESS */}
          <div className="relative flex items-start gap-space-md">
            <div className="absolute -left-6 sm:-left-8 mt-0.5 w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[16px] animate-spin">
                autorenew
              </span>
            </div>
            <div className="flex-1 bg-surface-container-lowest p-space-md rounded-[2px] border-2 border-primary">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-label-lg text-label-lg font-bold text-primary">
                    4. En Tránsito / Arribo a Sucursal Belgrano
                  </h3>
                  <span className="px-2 py-0.5 bg-primary text-on-primary text-[10px] font-bold rounded-[2px] uppercase">
                    Estado Actual
                  </span>
                </div>
                <span className="font-label-sm text-[11px] font-bold text-primary">
                  23 Oct, 08:45 hs
                </span>
              </div>
              <p className="font-body-md text-body-md text-on-surface">
                Camión de distribución urbana en tramo final hacia el Showroom
                de Av. Cabildo 2450. Al ser descargado, el equipo de mostrador
                registrará el ingreso en el sistema de recepción.
              </p>
              <div className="mt-3 p-space-sm bg-surface-container-low border border-surface-variant rounded-[2px] flex items-center justify-between text-body-sm">
                <div className="flex items-center gap-2 text-secondary">
                  <span className="material-symbols-outlined text-primary text-[18px]">
                    pin_drop
                  </span>
                  <span>
                    Ubicación estimada del móvil:
                    <strong>Corredor Norte / Av. Libertador</strong>
                  </span>
                </div>
                <span className="text-tertiary font-bold text-[11px]">
                  En horario previsto
                </span>
              </div>
            </div>
          </div>
          {/* Step 5: Pending */}
          <div className="relative flex items-start gap-space-md opacity-60">
            <div className="absolute -left-6 sm:-left-8 mt-0.5 w-6 h-6 rounded-full bg-surface-variant text-secondary flex items-center justify-center shrink-0 border border-surface-variant">
              <span className="material-symbols-outlined text-[14px]">
                radio_button_unchecked
              </span>
            </div>
            <div className="flex-1 bg-surface-container-low p-space-md rounded-[2px] border border-surface-variant">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                <h3 className="font-label-lg text-label-lg font-semibold text-secondary">
                  5. Listo para Retirar / Entregado
                </h3>
                <span className="font-label-sm text-[11px] text-secondary">
                  Pendiente de arribo
                </span>
              </div>
              <p className="font-body-md text-body-md text-secondary">
                Recepción definitiva en mostrador. Recibirás tu PIN de seguridad
                de 4 dígitos para presentar junto al DNI en mesa de entregas.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Hardware Detail & Serial Traceability */}
      <div className="bg-surface-container-lowest border border-surface-variant rounded-[4px] p-space-lg">
        <div className="flex items-center justify-between border-b border-surface-variant pb-space-sm mb-space-md">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-primary text-[22px]">
              memory
            </span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
              Hardware Transportado &amp; Trazabilidad Serial RMA
            </h2>
          </div>
          <span className="font-label-sm text-label-sm text-tertiary font-bold">
            {order.products.reduce((acc, product) => {
              return acc + product.quantity;
            }, 0)}{" "}
            Artículo Verificado
          </span>
        </div>
        {order.products.map((product) => {
          return (
            <div
              key={product.productId}
              className="border border-surface-variant rounded-[2px] p-space-md bg-surface-container-low mb-space-sm"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md">
                <div className="flex items-center gap-space-md">
                  <div className="w-20 h-20 bg-surface-container-lowest border border-surface-variant rounded-[2px] flex items-center justify-center shrink-0 p-2">
                    <img
                      className="max-h-full max-w-full object-contain"
                      data-alt="Logitech G PRO X TKL Lightspeed wireless mechanical gaming keyboard with tactile brown switches, clean top-down flat tech studio lighting on pure white background, Argentine hardware store catalog photography."
                      src={product.product.image}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-[10px] uppercase tracking-wider text-secondary">
                      Periférico Gamer Profesional
                    </span>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                      {product.product.name}
                    </h3>
                    <span className="font-body-sm text-body-sm text-secondary">
                      Variante: Tactile Brown Switches | Layout Español
                      Latinoamericano
                    </span>
                  </div>
                </div>
                <div className="flex flex-col md:items-end shrink-0 w-full md:w-auto border-t md:border-t-0 border-surface-variant pt-2 md:pt-0">
                  <span className="font-label-sm text-[10px] uppercase text-secondary">
                    Precio Abonado (BNA -15%)
                  </span>
                  <span className="font-headline-sm text-headline-sm text-primary font-bold">
                    $218.450 ARS
                  </span>
                  <span className="font-body-sm text-[11px] text-secondary">
                    Transferencia bancaria directa
                  </span>
                </div>
              </div>
              {/* Technical RMA / Serial Block */}
              <div className="mt-space-md pt-space-md border-t border-surface-variant grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-space-sm font-body-sm text-body-sm">
                <div className="p-2 bg-surface-container-lowest border border-surface-variant rounded-[2px]">
                  <span className="font-label-sm text-[10px] uppercase text-secondary block">
                    SKU Proveedor
                  </span>
                  <span className="font-mono font-bold text-on-surface">
                    LOG-920-012135
                  </span>
                </div>
                <div className="p-2 bg-surface-container-lowest border border-surface-variant rounded-[2px]">
                  <span className="font-label-sm text-[10px] uppercase text-secondary block">
                    Número de Serie (S/N)
                  </span>
                  <span className="font-mono font-bold text-primary">
                    S/N-LGT-99214-AR
                  </span>
                </div>
                <div className="p-2 bg-surface-container-lowest border border-surface-variant rounded-[2px]">
                  <span className="font-label-sm text-[10px] uppercase text-secondary block">
                    Garantía ZeroLag
                  </span>
                  <span className="font-bold text-on-surface flex items-center gap-1">
                    24 Meses Oficial
                    <span className="material-symbols-outlined text-tertiary text-[14px]">
                      verified_user
                    </span>
                  </span>
                </div>
                <div className="p-2 bg-surface-container-lowest border border-surface-variant rounded-[2px]">
                  <span className="font-label-sm text-[10px] uppercase text-secondary block">
                    Precinto de Bulto
                  </span>
                  <span className="font-mono font-bold text-secondary">
                    #ZL-SEC-8841
                  </span>
                </div>
              </div>
              <div className="mt-space-sm flex items-center justify-between text-body-sm text-secondary bg-surface-container-lowest p-2 border border-surface-variant rounded-[2px]">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-tertiary text-[18px]">
                    verified
                  </span>
                  <span>
                    Serial vinculado automáticamente a tu cuenta para tramitar
                    RMA sin requerir conservar factura física.
                  </span>
                </div>
                <a
                  className="text-primary font-label-md text-label-md hover:underline font-bold"
                  data-path="profile"
                  href="#"
                >
                  Ver Garantía
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TimelineAndHardware;
