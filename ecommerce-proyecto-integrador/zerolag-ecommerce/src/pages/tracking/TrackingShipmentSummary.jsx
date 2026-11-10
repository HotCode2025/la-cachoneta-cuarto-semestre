import dayjs from "dayjs";
import es from "dayjs/locale/es";

dayjs.locale(es);

function TrackingShipmentSummary({ order }) {
  return (
    <div className="bg-surface-container-lowest border border-surface-variant rounded-[4px] p-space-lg mb-space-xl">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md border-b border-surface-variant pb-space-md">
        <div className="flex flex-wrap items-center gap-space-md">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-primary text-[28px]">
              local_shipping
            </span>
            <div className="flex flex-col">
              <span className="font-label-sm text-[10px] uppercase text-secondary">
                Número de Pedido
              </span>
              <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                {order.id}
              </span>
            </div>
          </div>
          <div className="h-8 w-px bg-surface-variant hidden sm:block"></div>
          <div className="flex flex-col">
            <span className="font-label-sm text-[10px] uppercase text-secondary">
              Guía Logística Homologada
            </span>
            <div className="flex items-center gap-1 font-body-md text-body-md font-bold text-on-surface">
              <span>AR-938210928</span>
              <span className="px-1.5 py-0.2 bg-surface-container text-secondary text-[11px] font-normal rounded-[2px]">
                Andreani Prioritario
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-space-sm">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary text-on-primary font-label-md text-label-md rounded-[2px] uppercase tracking-wide">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            En camino a Sucursal Belgrano (Retiro Express)
          </span>
        </div>
      </div>
      {/* Quick Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md pt-space-md">
        <div className="p-space-sm bg-surface-container-low rounded-[2px] border border-surface-variant">
          <span className="font-label-sm text-[10px] uppercase text-secondary block mb-1">
            Disponibilidad Estimada
          </span>
          <div className="flex items-baseline gap-1">
            <span className="font-headline-sm text-headline-sm text-tertiary font-bold capitalize">
              {dayjs(order.orderTimeMs).format("dddd, MMMM D")}
            </span>
          </div>
          <span className="font-body-sm text-[11px] text-secondary mt-1 block">
            Aviso inmediato vía WhatsApp y Mail
          </span>
        </div>
        <div className="p-space-sm bg-surface-container-low rounded-[2px] border border-surface-variant">
          <span className="font-label-sm text-[10px] uppercase text-secondary block mb-1">
            Punto de Entrega Asignado
          </span>
          <div className="font-body-md text-body-md font-bold text-on-surface truncate">
            Showroom Belgrano, CABA
          </div>
          <span className="font-body-sm text-[11px] text-secondary mt-1 block truncate">
            Av. Cabildo 2450, Piso 3 (Con DNI original)
          </span>
        </div>
        <div className="p-space-sm bg-surface-container-low rounded-[2px] border border-surface-variant">
          <span className="font-label-sm text-[10px] uppercase text-secondary block mb-1">
            Comprador Registrado
          </span>
          <div className="font-body-md text-body-md font-bold text-on-surface truncate">
            Martín Gómez
          </div>
          <span className="font-body-sm text-[11px] text-secondary mt-1 block">
            CUIT: 20-38491024-3
          </span>
        </div>
        <div className="p-space-sm bg-surface-container-low rounded-[2px] border border-surface-variant">
          <span className="font-label-sm text-[10px] uppercase text-secondary block mb-1">
            Comprobante Fiscal
          </span>
          <div className="flex items-center justify-between">
            <span className="font-body-md text-body-md font-bold text-on-surface">
              Factura A #0012-00049281
            </span>
            <span className="material-symbols-outlined text-tertiary text-[18px]">
              verified
            </span>
          </div>
          <span className="font-body-sm text-[11px] text-secondary mt-1 block">
            CAE validado ante AFIP
          </span>
        </div>
      </div>
    </div>
  );
}

export default TrackingShipmentSummary;
