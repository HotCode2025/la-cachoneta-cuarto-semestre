import { useEffect, useState } from "react";
import { Link } from "react-router";
import dayjs from "dayjs";
import { formatMoney } from "../../utils/money.js";
import axiosAuth from "../../api/axiosAuth.js";

/** Destinos de referencia para mostrar la ubicación de los pedidos. */
const DESTINOS_POSIBLES = [
  {
    ciudad: "Córdoba",
    provincia: "Córdoba",
    sucursal: "Sucursal Andreani Córdoba Centro",
  },
  {
    ciudad: "Rosario",
    provincia: "Santa Fe",
    sucursal: "Centro de Retiro Andreani Rosario Norte",
  },
  {
    ciudad: "Mendoza",
    provincia: "Mendoza",
    sucursal: "Punto de Entrega Andreani Mendoza",
  },
  {
    ciudad: "San Miguel de Tucumán",
    provincia: "Tucumán",
    sucursal: "Sucursal Andreani Tucumán",
  },
  {
    ciudad: "Mar del Plata",
    provincia: "Buenos Aires",
    sucursal: "Depósito Andreani Mar del Plata",
  },
  {
    ciudad: "Neuquén",
    provincia: "Neuquén",
    sucursal: "Agencia Andreani Neuquén Capital",
  },
];

/** Selecciona de forma estable un destino de referencia según el ID del pedido. */
const getUbicacionAleatoria = (id) => {
  const index =
    Math.abs(id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)) %
    DESTINOS_POSIBLES.length;
  return DESTINOS_POSIBLES[index];
};

/** Muestra los pedidos y la información principal de la cuenta. */
function MyAccountMain() {
  const [Pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPedidosData = async () => {
      try {
        const response = await axiosAuth.get("api/pedidos");
        setPedidos(response.data);
      } catch (error) {
        console.error("Error al cargar los pedidos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPedidosData();
  }, []);

  if (loading) {
    return (
      <div className="w-full pt-24 sm:pt-[156px] bg-surface min-h-[calc(100vh-156px)] flex items-center justify-center">
        <div className="flex flex-col items-center gap-2 p-4 text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span className="font-body-md text-secondary uppercase tracking-wider text-xs">
            Verificando historial de pedidos...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
      {/* NAVEGACIÓN LATERAL / PESTAÑAS TÉCNICAS */}
      <aside className="lg:col-span-3 flex flex-col gap-space-sm w-full">
        <nav
          className="bg-surface-container-lowest border border-surface-variant flex flex-col"
          id="profileTabs"
        >
          <button
            className="tab-btn w-full text-left px-space-md py-3 font-label-md text-label-md border-b border-surface-variant flex items-center justify-between bg-surface-container-low text-primary border-l-4 border-l-primary font-bold transition-none"
            id="tab-Pedidos"
            onClick={() => {}}
          >
            <span className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-[18px]">
                receipt_long
              </span>
              <span>Historial de Pedidos</span>
            </span>
            <span className="bg-primary text-on-primary font-label-sm text-[10px] px-1.5 py-0.5 font-bold">
              {Pedidos.length} Activos
            </span>
          </button>
        </nav>

        {/* Widget de Asistencia Técnica Directa */}
        <div className="bg-surface-container-lowest border border-surface-variant p-space-md flex flex-col gap-space-xs">
          <div className="flex items-center gap-space-xs text-on-surface">
            <span className="material-symbols-outlined text-[20px] text-primary shrink-0">
              headset_mic
            </span>
            <span className="font-label-md text-label-md font-bold uppercase text-on-surface">
              Soporte Técnico ZeroLag
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-secondary">
            ¿Dudas de compatibilidad de BIOS, voltajes o problemas de
            post-ensamble?
          </p>
          <div className="bg-surface-container-low border border-surface-variant p-2 font-mono text-[12px] text-on-surface mt-1 break-words">
            WhatsApp Exclusivo:{" "}
            <span className="font-bold text-tertiary block sm:inline">
              +54 9 11 4920-8812
            </span>
          </div>
          <span className="text-[10px] text-secondary">
            Lunes a Viernes 10:00 a 19:00 hs. Atención por técnicos
            especializados.
          </span>
        </div>
      </aside>

      {/* ÁREA DE CONTENIDO DINÁMICO */}
      <main className="lg:col-span-9 flex flex-col gap-space-lg w-full">
        <section
          className="tab-panel flex flex-col gap-space-lg"
          id="panel-Pedidos"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm border-b border-surface-variant pb-space-sm">
            <div>
              <h2 className="font-headline-sm text-headline-sm text-on-surface">
                Historial de Pedidos y Hardware
              </h2>
              <p className="font-body-sm text-body-sm text-secondary">
                Visualizá tus comprobantes fiscales, guías de despacho y estados
                de ensamble.
              </p>
            </div>
            <div className="flex items-center gap-space-xs w-full sm:w-auto">
              <span className="font-label-sm text-label-sm text-secondary uppercase font-bold shrink-0">
                Filtro:
              </span>
              <select className="h-8 px-2 w-full sm:w-auto bg-surface-container-low border border-surface-variant font-label-md text-label-md text-on-surface focus:outline-none">
                <option>Todos los pedidos (2026)</option>
                <option>Pendientes</option>
                <option>Aprobados</option>
                <option>Entregados</option>
              </select>
            </div>
          </div>

          {Pedidos.map((order) => {
            const isPendiente = order.estado === "PENDIENTE";
            const destinoAleatorio = getUbicacionAleatoria(order.id);

            return (
              <article
                key={order.id}
                className="bg-surface-container-lowest border border-surface-variant overflow-hidden"
              >
                {/* Cabecera de la Orden */}
                <div className="bg-surface-container-low border-b border-surface-variant p-3 sm:p-space-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-sm">
                  <div className="flex items-center gap-2 sm:gap-space-md flex-wrap">
                    <span className="font-headline-sm text-headline-sm text-on-surface font-extrabold tracking-tight">
                      Pedido #{order.id.slice(0, 8)}
                    </span>
                    <span className="text-secondary font-body-sm text-body-sm capitalize">
                      | {dayjs(order.fecha_creacion).format("D [de] MMMM YYYY")}
                    </span>
                    <span
                      className={`font-label-sm text-[11px] px-2.5 py-0.5 uppercase font-bold text-on-primary ${
                        isPendiente ? "bg-amber-600" : "bg-[#1976D2]"
                      }`}
                    >
                      {order.estado}
                    </span>
                  </div>
                  <div className="text-left sm:text-right w-full sm:w-auto border-t sm:border-t-0 pt-2 sm:pt-0 border-surface-variant/50">
                    <span className="font-label-sm text-[11px] text-secondary uppercase block">
                      Total a Pagar
                    </span>
                    <span className="font-headline-sm text-headline-sm text-on-surface font-extrabold">
                      {formatMoney(Number(order.total))}
                      <span className="font-body-sm text-[12px] font-normal text-secondary">
                        {" "}
                        ARS
                      </span>
                    </span>
                  </div>
                </div>

                {/* Tracking / Despacho */}
                {!isPendiente && (
                  <div className="p-3 sm:p-space-md border-b border-surface-variant bg-surface-container-lowest">
                    <div className="bg-surface-container-low border border-surface-variant p-space-sm flex flex-col md:flex-row md:items-center justify-between gap-space-md">
                      <div className="flex items-start sm:items-center gap-space-sm">
                        <span className="material-symbols-outlined text-[24px] text-[#1976D2] shrink-0 mt-0.5 sm:mt-0">
                          local_shipping
                        </span>
                        <div>
                          <span className="font-label-md text-label-md text-on-surface font-bold">
                            Seguimiento Andreani Express
                          </span>
                          <p className="font-body-sm text-body-sm text-secondary break-words">
                            Número de Guía:
                            <span className="font-mono font-bold text-on-surface">
                              {" "}
                              AR-938210928{" "}
                            </span>
                            • Destino:
                            <strong className="text-on-surface">
                              {" "}
                              {destinoAleatorio.sucursal} (
                              {destinoAleatorio.ciudad},{" "}
                              {destinoAleatorio.provincia})
                            </strong>
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center w-full md:w-auto">
                        <span className="bg-[#1976D2] text-on-primary px-3 py-1 font-label-sm text-label-sm font-bold text-center w-full md:w-auto">
                          En tránsito a {destinoAleatorio.ciudad},{" "}
                          {destinoAleatorio.provincia}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Mapeo de detalle_pedidos y productos */}
                {order.detalle_pedidos?.map((detalle) => {
                  const producto = detalle.productos;
                  return (
                    <div
                      key={detalle.id}
                      className="p-3 sm:p-space-md divide-y divide-surface-variant"
                    >
                      <div className="py-space-sm flex flex-col sm:flex-row sm:items-center justify-between gap-space-md first:pt-0 last:pb-0">
                        <div className="flex items-start sm:items-center gap-space-md">
                          <img
                            className="w-16 h-16 object-contain bg-surface-container-lowest border border-surface-variant p-1 shrink-0"
                            alt={producto?.nombre}
                            src={producto?.img}
                          />
                          <div className="flex flex-col">
                            <span className="font-label-sm text-[10px] text-secondary uppercase font-bold">
                              Hardware / Periféricos
                            </span>
                            <span className="font-label-lg text-label-lg text-on-surface font-bold">
                              {producto?.nombre}
                            </span>
                            <span className="font-body-sm text-body-sm text-secondary">
                              SKU: {producto?.id.slice(0, 8)} • Cantidad:{" "}
                              {detalle.cantidad} unidad
                              {detalle.cantidad > 1 ? "es" : ""}
                            </span>
                          </div>
                        </div>
                        <div className="text-left sm:text-right shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-surface-variant/40 flex sm:flex-col justify-between items-center sm:items-end">
                          <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                            {formatMoney(Number(detalle.subtotal))}
                          </span>
                          <span className="font-body-sm text-[11px] text-tertiary block font-bold">
                            {isPendiente
                              ? "Pago pendiente"
                              : "Pagado con Mercado Pago"}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Pie de la Orden */}
                <div className="bg-surface-container-low border-t border-surface-variant p-3 sm:p-space-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-space-sm">
                  <div className="flex items-center gap-space-xs text-body-sm font-body-sm text-secondary">
                    <span className="material-symbols-outlined text-[16px] text-tertiary shrink-0">
                      check
                    </span>
                    <span className="capitalize">
                      Fecha de orden:{" "}
                      {dayjs(order.fecha_creacion).format("MMMM D, YYYY")}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-space-xs w-full sm:w-auto">
                    {isPendiente && (
                      <Link
                        to="/checkout"
                        className="h-9 px-space-md bg-primary text-on-primary hover:bg-primary/90 transition-colors flex items-center justify-center gap-1 font-bold rounded w-full sm:w-auto"
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          credit_card
                        </span>
                        <span>Proceder al pago</span>
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      </main>
    </div>
  );
}

export default MyAccountMain;
