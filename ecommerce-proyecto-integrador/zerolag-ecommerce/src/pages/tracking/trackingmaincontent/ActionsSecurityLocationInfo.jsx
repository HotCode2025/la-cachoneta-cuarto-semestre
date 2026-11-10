function ActionsSecurityLocationInfo() {
  return (
    <div className="lg:col-span-4 flex flex-col gap-space-md">
      {/* Quick Action Buttons */}
      <div className="bg-surface-container-lowest border border-surface-variant rounded-[4px] p-space-md flex flex-col gap-space-sm">
        <h3 className="font-label-lg text-label-lg font-bold uppercase tracking-wider text-on-surface pb-2 border-b border-surface-variant">
          Acciones Rápidas
        </h3>
        <button
          className="w-full h-11 bg-primary text-on-primary font-label-lg text-label-lg rounded-[2px] flex items-center justify-center gap-space-xs hover:bg-primary-container transition-colors"
          onClick="
                    this.classList.toggle('bg-tertiary');
                    this.innerText = '¡Notificación WhatsApp Activada!';
                  "
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]">
            notifications_active
          </span>
          <span>Avisarme por WhatsApp al arribar</span>
        </button>
        <span className="font-body-sm text-[11px] text-secondary text-center">
          Enviaremos mensaje directo al +54 9 11 4920-8812
        </span>
        <a
          className="w-full h-10 bg-surface-container border border-surface-variant text-on-surface font-label-md text-label-md rounded-[2px] flex items-center justify-center gap-space-xs hover:bg-surface-container-highest transition-colors"
          href="#"
          onClick="
                    event.preventDefault();
                    alert(
                      'Descargando Factura A y Remito Oficial #0012-00049281 en PDF...',
                    );
                  "
        >
          <span className="material-symbols-outlined text-[18px] text-secondary">
            download
          </span>
          <span>Descargar Factura A / Remito (PDF)</span>
        </a>
        <a
          className="w-full h-10 bg-surface-container-low border border-surface-variant text-on-surface font-label-md text-label-md rounded-[2px] flex items-center justify-center gap-space-xs hover:bg-surface-container-highest transition-colors"
          data-path="about-support"
          href="#"
        >
          <span className="material-symbols-outlined text-[18px] text-secondary">
            description
          </span>
          <span>Ver Protocolo de Garantía &amp; RMA</span>
        </a>
      </div>
      {/* Security & Transit Policy */}
      <div className="bg-surface-container-lowest border border-surface-variant rounded-[4px] p-space-md">
        <div className="flex items-center gap-space-xs mb-space-sm text-on-surface font-bold font-headline-sm text-headline-sm">
          <span className="material-symbols-outlined text-primary text-[20px]">
            shield
          </span>
          <h4>Póliza de Seguridad en Transporte</h4>
        </div>
        <p className="font-body-md text-body-md text-secondary leading-relaxed mb-space-sm">
          Todo componente transportado por Andreani cuenta con seguro de
          reposición del 100% ante siniestro, pérdida o extravío.
        </p>
        <ul className="flex flex-col gap-2 font-body-sm text-body-sm text-secondary">
          <li className="flex items-start gap-2">
            <span className="material-symbols-outlined text-tertiary text-[16px] shrink-0 mt-0.5">
              check_circle
            </span>
            <span>
              <strong>Precinto Holográfico:</strong> Verifica que la faja
              #ZL-SEC-8841 esté íntegra al recibir.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="material-symbols-outlined text-tertiary text-[16px] shrink-0 mt-0.5">
              check_circle
            </span>
            <span>
              <strong>Reemplazo Express:</strong> En caso de falla de fábrica
              dentro de los 7 días corridos, cambio directo en mano.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="material-symbols-outlined text-tertiary text-[16px] shrink-0 mt-0.5">
              check_circle
            </span>
            <span>
              <strong>Retiro por Tercero:</strong> Debe presentar copia de DNI
              de Martín Gómez y número de autorización.
            </span>
          </li>
        </ul>
      </div>
      {/* Pickup Location & Operating Hours */}
      <div className="bg-surface-container-lowest border border-surface-variant rounded-[4px] p-space-md">
        <div className="flex items-center gap-space-xs mb-space-sm text-on-surface font-bold font-headline-sm text-headline-sm">
          <span className="material-symbols-outlined text-primary text-[20px]">
            storefront
          </span>
          <h4>Showroom &amp; Pick-up Point Belgrano</h4>
        </div>
        <div className="space-y-space-xs font-body-sm text-body-sm text-secondary mb-space-md">
          <div className="flex items-center gap-2 text-on-surface font-semibold">
            <span className="material-symbols-outlined text-secondary text-[16px]">
              location_on
            </span>
            <span>Av. Cabildo 2450, Piso 3 (Edificio Belgrano Prime)</span>
          </div>
          <p className="pl-6 text-[12px]">
            A 50 metros de Estación Congreso de Tucumán (Línea D de Subte).
          </p>
        </div>
        <div className="p-space-sm bg-surface-container-low border border-surface-variant rounded-[2px] mb-space-sm font-body-sm text-body-sm">
          <span className="font-label-sm text-[10px] uppercase text-secondary block mb-1">
            Horarios de Atención de Mostrador
          </span>
          <div className="flex justify-between py-0.5">
            <span className="text-on-surface">Lunes a Viernes:</span>
            <span className="font-bold text-on-surface">10:00 a 19:00 hs</span>
          </div>
          <div className="flex justify-between py-0.5 border-t border-surface-variant mt-1">
            <span className="text-on-surface">Sábados:</span>
            <span className="font-bold text-on-surface">10:00 a 14:00 hs</span>
          </div>
          <div className="flex justify-between py-0.5 border-t border-surface-variant mt-1 text-secondary">
            <span>Domingos y Feriados:</span>
            <span>Cerrado</span>
          </div>
        </div>
        {/* Location Map Visualizer */}
        <div
          className="w-full h-36 bg-surface-container border border-surface-variant rounded-[2px] overflow-hidden relative"
          data-alt="Schematic road map diagram of Belgrano Buenos Aires around Cabildo Avenue in flat minimalist graphic design, pinpointing hardware store delivery center location with clean red icon mark."
          data-location="Av. Cabildo 2450, Belgrano, CABA, Argentina"
          style={{
            "background-image":
              'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB3Wq93ZOYpco6tAoL_V2eL702raTDTalGDho5IVzG8aCmRs-RNj6M5TMT9onQgWWVXGxph0UKNk4zKKhBbFT_lgA_nEmc5yiQ8Z9eT5gIrwMZue1j9kktG8rj1AzCKRRMjQeVzUZ3A8vmeCG_tpIl4DiWKZXCIj2uou9zviZiLPaegvZSH-QUb-qw2CK7UsR17NgG0PNPzdQBfNp8sOYV97i2IujGpqb9pfULSLcY")',
          }}
        >
          <div className="absolute bottom-2 left-2 bg-surface-container-lowest/90 px-2 py-1 rounded-[2px] border border-surface-variant font-label-sm text-[10px] text-on-surface font-bold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-primary"></span>
            Showroom ZeroLag Belgrano
          </div>
        </div>
      </div>
      {/* Help Desk Banner */}
      <div className="p-space-md bg-surface-container border border-surface-variant rounded-[4px] flex items-center justify-between">
        <div className="flex flex-col">
          <span className="font-label-sm text-[11px] uppercase text-secondary">
            ¿Dudas con la recepción?
          </span>
          <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
            Mesa de Ayuda RMA
          </span>
          <span className="font-body-sm text-body-sm text-secondary">
            soporte@zerolag.com.ar
          </span>
        </div>
        <a
          className="px-3 py-1.5 bg-surface-container-lowest border border-surface-variant hover:border-primary text-on-surface font-label-md text-label-md rounded-[2px] transition-colors"
          data-path="about-support"
          href="#"
        >
          Contactar
        </a>
      </div>
    </div>
  );
}

export default ActionsSecurityLocationInfo;
