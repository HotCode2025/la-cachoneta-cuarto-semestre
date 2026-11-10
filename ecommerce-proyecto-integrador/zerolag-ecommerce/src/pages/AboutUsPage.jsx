/** Presenta información institucional y canales de contacto de ZeroLag. */
function AboutUsPage() {
  return (
    <>
      <main className="w-full pt-[156px] bg-surface min-h-[calc(100vh-156px)]">
        <div className="flex flex-col w-full">
          <section className="w-full bg-surface-container-low border-b border-surface-variant">
            <div className="max-w-[1320px] mx-auto px-margin-desktop py-space-xl">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg">
                <div className="flex flex-col gap-space-xs max-w-3xl">
                  <div className="flex items-center gap-space-xs">
                    <span className="inline-block w-2.5 h-2.5 bg-primary rounded-none"></span>
                    <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">
                      Infraestructura &amp; Respaldo Técnico
                    </span>
                  </div>
                  <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight uppercase">
                    Soporte Técnico, Showroom &amp; Preguntas Frecuentes
                  </h1>
                  <p className="font-body-lg text-body-lg text-secondary leading-relaxed">
                    Especialistas en ensamble de alto rendimiento, workstations
                    de render y PC gaming en Argentina. Asistencia técnica
                    personalizada en Belgrano, CABA y logística asegurada para
                    todo el territorio nacional.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-space-sm shrink-0">
                  <a
                    className="h-10 px-space-lg bg-primary text-on-primary font-label-lg text-label-lg flex items-center gap-space-xs hover:bg-on-primary-fixed-variant transition-colors"
                    href="#contacto-soporte"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      contact_support
                    </span>
                    <span>Contactar a un Técnico</span>
                  </a>
                  <a
                    className="h-10 px-space-lg bg-surface-container-lowest border border-surface-variant text-on-surface font-label-lg text-label-lg flex items-center gap-space-xs hover:bg-surface-container transition-colors"
                    href="#faq-tecnico"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      quiz
                    </span>
                    <span>Ver Preguntas Frecuentes</span>
                  </a>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md mt-space-xl">
                <div className="bg-surface-container-lowest border border-surface-variant p-space-md flex flex-col justify-between">
                  <div className="flex items-center justify-between text-secondary mb-space-sm">
                    <span className="font-label-sm text-label-sm uppercase font-bold text-secondary">
                      Volumen Ensamble
                    </span>
                    <span className="material-symbols-outlined text-primary text-[20px]">
                      precision_manufacturing
                    </span>
                  </div>
                  <div className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-bold">
                    +15.000
                  </div>
                  <span className="font-body-sm text-body-sm text-secondary mt-1">
                    PCs ensambladas y testeadas bajo estrés térmico continuo.
                  </span>
                </div>
                <div className="bg-surface-container-lowest border border-surface-variant p-space-md flex flex-col justify-between">
                  <div className="flex items-center justify-between text-secondary mb-space-sm">
                    <span className="font-label-sm text-label-sm uppercase font-bold text-secondary">
                      Respaldo Oficial
                    </span>
                    <span className="material-symbols-outlined text-tertiary text-[20px]">
                      verified
                    </span>
                  </div>
                  <div className="font-headline-lg text-headline-lg text-tertiary tracking-tight font-bold">
                    100%
                  </div>
                  <span className="font-body-sm text-body-sm text-secondary mt-1">
                    Componentes con Garantía Oficial de Fábrica directa (12-36
                    meses).
                  </span>
                </div>
                <div className="bg-surface-container-lowest border border-surface-variant p-space-md flex flex-col justify-between">
                  <div className="flex items-center justify-between text-secondary mb-space-sm">
                    <span className="font-label-sm text-label-sm uppercase font-bold text-secondary">
                      Atención Presencial
                    </span>
                    <span className="material-symbols-outlined text-on-surface text-[20px]">
                      storefront
                    </span>
                  </div>
                  <div className="font-headline-sm text-headline-sm text-on-surface tracking-tight font-bold">
                    Showroom Belgrano
                  </div>
                  <span className="font-body-sm text-body-sm text-secondary mt-1">
                    Av. Cabildo 2450, Piso 3, CABA. Lunes a Viernes 10:00 a
                    19:00 hs.
                  </span>
                </div>
                <div className="bg-surface-container-lowest border border-surface-variant p-space-md flex flex-col justify-between">
                  <div className="flex items-center justify-between text-secondary mb-space-sm">
                    <span className="font-label-sm text-label-sm uppercase font-bold text-secondary">
                      Transparencia AFIP
                    </span>
                    <span className="material-symbols-outlined text-primary text-[20px]">
                      receipt_long
                    </span>
                  </div>
                  <div className="font-headline-sm text-headline-sm text-on-surface tracking-tight font-bold">
                    Factura A y B
                  </div>
                  <span className="font-body-sm text-body-sm text-secondary mt-1">
                    Cotización transparente ligada a Dólar BNA Oficial sin
                    sobreprecios.
                  </span>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full bg-surface py-space-xl border-b border-surface-variant">
            <div className="max-w-[1320px] mx-auto px-margin-desktop">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
                <div className="lg:col-span-7 flex flex-col gap-space-lg">
                  <div className="flex flex-col gap-space-xs">
                    <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">
                      Sobre Nuestra Operación
                    </span>
                    <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                      Rigor Técnico, Rendimiento Real &amp; Trazabilidad
                    </h2>
                  </div>
                  <div className="font-body-md text-body-md text-secondary space-y-3 leading-relaxed">
                    <p>
                      ZeroLag nació como respuesta a la falta de precisión
                      técnica en el ecosistema informático nacional. No
                      ensamblamos cajas de manera genérica: cada configuración
                      que sale de nuestro laboratorio de CABA es optimizada a
                      nivel de firmware, curvas térmicas de refrigeración
                      líquida y sincronización de latencias de memoria DRAM.
                    </p>
                    <p>
                      Abastecemos a empresas de arquitectura, estudios de render
                      3D, laboratorios de deep learning y atletas de eSports que
                      no pueden tolerar throttling o micro-stuttering.
                      Entendemos el hardware a nivel microscópico y validamos
                      cada lote recibido directamente con los fabricantes
                      autorizados en Argentina.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md pt-space-xs">
                    <div className="bg-surface-container-low border border-surface-variant p-space-md">
                      <div className="flex items-center gap-space-xs text-primary mb-1">
                        <span className="material-symbols-outlined text-[18px]">
                          verified_user
                        </span>
                        <span className="font-label-md text-label-md uppercase font-bold text-on-surface">
                          Transparencia Impositiva
                        </span>
                      </div>
                      <p className="font-body-sm text-body-sm text-secondary">
                        Emitimos Facturas A (con discriminación estricta de IVA
                        para cómputo de crédito fiscal) y Facturas B a
                        consumidor final. Cotización basada en dólar oficial
                        BNA.
                      </p>
                    </div>
                    <div className="bg-surface-container-low border border-surface-variant p-space-md">
                      <div className="flex items-center gap-space-xs text-tertiary mb-1">
                        <span className="material-symbols-outlined text-[18px]">
                          local_shipping
                        </span>
                        <span className="font-label-md text-label-md uppercase font-bold text-on-surface">
                          Cadena de Frío &amp; Antiestática
                        </span>
                      </div>
                      <p className="font-body-sm text-body-sm text-secondary">
                        Embalaje industrial de doble núcleo con espuma expansiva
                        interna para placas de video pesadas y caja exterior
                        reforzada de Andreani Express.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-5 flex flex-col gap-space-md">
                  <div className="bg-surface-container-lowest border border-surface-variant p-space-lg flex flex-col gap-space-md">
                    <div className="flex items-center gap-space-xs border-b border-surface-variant pb-space-sm">
                      <span className="material-symbols-outlined text-primary text-[22px]">
                        domain
                      </span>
                      <div>
                        <h3 className="font-headline-sm text-headline-sm text-on-surface">
                          Showroom Belgrano
                        </h3>
                        <span className="font-body-sm text-body-sm text-secondary">
                          Retiro de compras, diagnóstico y RMA presencial
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-space-sm font-body-sm text-body-sm text-secondary">
                      <div className="flex items-start gap-space-xs">
                        <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">
                          pin_drop
                        </span>
                        <div>
                          <span className="font-bold text-on-surface block">
                            Dirección Legal y Retiros:
                          </span>
                          <span>
                            Av. Cabildo 2450, Piso 3 (Intersección con Monroe)
                          </span>
                          <span className="block text-secondary">
                            Belgrano, Ciudad Autónoma de Buenos Aires (C1428)
                          </span>
                        </div>
                      </div>
                      <div className="flex items-start gap-space-xs">
                        <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">
                          schedule
                        </span>
                        <div>
                          <span className="font-bold text-on-surface block">
                            Horarios de Atención:
                          </span>
                          <span>
                            Lunes a Viernes de 10:00 a 19:00 hs (corrido)
                          </span>
                          <span className="block text-secondary">
                            Sábados de 10:00 a 14:00 hs (solo retiro de compras
                            previas)
                          </span>
                        </div>
                      </div>
                      <div className="flex items-start gap-space-xs">
                        <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">
                          subway
                        </span>
                        <div>
                          <span className="font-bold text-on-surface block">
                            Accesos y Transporte:
                          </span>
                          <span>
                            Subte Línea D (Estación Congreso de Tucumán a 150m)
                            y Metrobús Cabildo.
                          </span>
                        </div>
                      </div>
                    </div>
                    <div
                      className="w-full h-44 bg-surface-container border border-surface-variant bg-cover bg-center flex items-end p-space-sm"
                      data-location="Av. Cabildo 2450, Belgrano, Buenos Aires, Argentina"
                      style={{
                        backgroundImage:
                          'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDQ6x79sKamSBnP_9mj5tPFiF1EST8H04L0LygSuiGz0kzF6WxcAOSTHa3Dc_0GpbPeT-0FnnlX9AUKzS17tjGuEVB6AkD3RJKxmuc2OZxe42qIMc-JEdtPl81kAXnd__40fe59cr-WBwJN0NNblV9w_st_6L7RI6MS9hE3q_c3CTXxtahR3989wmSaZV8oItZbLGKCFn3WLVXHZTEIhSFsQ-8vvkedOmuYkPm-AoB0Od8pDWlopVr4")',
                      }}
                    >
                      <span className="bg-on-surface text-on-primary font-label-sm text-[10px] uppercase px-2 py-1 tracking-wider">
                        Av. Cabildo 2450, Piso 3
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section
            className="w-full bg-surface-container-low py-space-xl border-b border-surface-variant"
            id="contacto-soporte"
          >
            <div className="max-w-[1320px] mx-auto px-margin-desktop">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
                <div className="lg:col-span-4 flex flex-col gap-space-md">
                  <div className="flex flex-col gap-space-xs">
                    <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">
                      Mesa de Asistencia Directa
                    </span>
                    <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                      Canales Técnicos Inmediatos
                    </h2>
                    <p className="font-body-md text-body-md text-secondary">
                      Comunícate con ingenieros de hardware y especialistas en
                      ensambles de lunes a viernes de 10:00 a 19:00 hs.
                    </p>
                  </div>
                  <div className="flex flex-col gap-space-sm">
                    <a
                      className="bg-surface-container-lowest border border-surface-variant p-space-md flex items-center justify-between hover:border-tertiary transition-colors group"
                      href="https://wa.me/5491140291122"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <div className="flex items-center gap-space-sm">
                        <div className="w-10 h-10 bg-tertiary text-on-tertiary flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-[20px]">
                            chat
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-label-sm text-[10px] text-secondary uppercase font-bold">
                            WhatsApp Ensamble Directo
                          </span>
                          <span className="font-headline-sm text-[15px] font-bold text-on-surface group-hover:text-tertiary transition-colors">
                            +54 9 11 4029-8831
                          </span>
                          <span className="font-body-sm text-[11px] text-tertiary">
                            Respuesta promedio: &lt; 15 min
                          </span>
                        </div>
                      </div>
                      <span className="material-symbols-outlined text-secondary group-hover:text-tertiary text-[20px]">
                        arrow_forward
                      </span>
                    </a>
                    <a
                      className="bg-surface-container-lowest border border-surface-variant p-space-md flex items-center justify-between hover:border-primary transition-colors group"
                      href="mailto:soporte@zerolag.com.ar"
                    >
                      <div className="flex items-center gap-space-sm">
                        <div className="w-10 h-10 bg-primary text-on-primary flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-[20px]">
                            mail
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-label-sm text-[10px] text-secondary uppercase font-bold">
                            Mesa de Ayuda RMA &amp; Tickets
                          </span>
                          <span className="font-headline-sm text-[15px] font-bold text-on-surface group-hover:text-primary transition-colors">
                            soporte@zerolag.com.ar
                          </span>
                          <span className="font-body-sm text-[11px] text-secondary">
                            Trazabilidad oficial de incidencias
                          </span>
                        </div>
                      </div>
                      <span className="material-symbols-outlined text-secondary group-hover:text-primary text-[20px]">
                        arrow_forward
                      </span>
                    </a>
                    <div className="bg-surface-container-lowest border border-surface-variant p-space-md flex items-start gap-space-sm">
                      <div className="w-10 h-10 bg-surface-container text-on-surface flex items-center justify-center shrink-0 border border-surface-variant">
                        <span className="material-symbols-outlined text-[20px]">
                          phone_in_talk
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-sm text-[10px] text-secondary uppercase font-bold">
                          Central Telefónica Showroom
                        </span>
                        <span className="font-headline-sm text-[15px] font-bold text-on-surface">
                          (011) 4782-9011
                        </span>
                        <span className="font-body-sm text-[11px] text-secondary">
                          Líneas rotativas para ventas mayoristas
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-surface-container border border-surface-variant p-space-md">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="material-symbols-outlined text-primary text-[18px]">
                        info
                      </span>
                      <span className="font-label-md text-label-md uppercase font-bold text-on-surface">
                        ¿Tenés una cotización previa?
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-secondary">
                      Podés adjuntar tu presupuesto en PDF o captura de pantalla
                      de otra tienda en el formulario. Igualamos o mejoramos
                      presupuestos de componentes oficiales con factura en mano.
                    </p>
                  </div>
                </div>
                <div className="lg:col-span-8">
                  <div className="bg-surface-container-lowest border border-surface-variant p-space-lg">
                    <div className="border-b border-surface-variant pb-space-sm mb-space-lg flex items-center justify-between">
                      <div>
                        <h3 className="font-headline-md text-headline-md text-on-surface">
                          Formulario Técnico de Atención
                        </h3>
                        <p className="font-body-sm text-body-sm text-secondary">
                          Completa el formulario y te asignaremos un ticket
                          técnico para seguimiento directo.
                        </p>
                      </div>
                      <span className="font-label-sm text-label-sm bg-surface-container px-2 py-1 border border-surface-variant text-secondary">
                        SLA: 2hs Hábiles
                      </span>
                    </div>
                    <form
                      className="space-y-space-md"
                      id="contact-support-form"
                      onSubmit={() => {}}
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                        <div className="flex flex-col gap-1">
                          <label
                            className="font-label-md text-label-md text-on-surface"
                            htmlFor="contact-name"
                          >
                            Nombre y Apellido
                            <span className="text-primary">*</span>
                          </label>
                          <input
                            className="w-full h-10 px-space-md bg-surface-container-low border border-surface-variant text-body-md text-on-surface placeholder:text-secondary focus:outline-none focus:border-primary-container"
                            id="contact-name"
                            placeholder="Ej. Mateo Rossi"
                            required=""
                            type="text"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label
                            className="font-label-md text-label-md text-on-surface"
                            htmlFor="contact-email"
                          >
                            Correo Electrónico
                            <span className="text-primary">*</span>
                          </label>
                          <input
                            className="w-full h-10 px-space-md bg-surface-container-low border border-surface-variant text-body-md text-on-surface placeholder:text-secondary focus:outline-none focus:border-primary-container"
                            id="contact-email"
                            placeholder="mateo@ejemplo.com.ar"
                            required=""
                            type="email"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                        <div className="flex flex-col gap-1">
                          <label
                            className="font-label-md text-label-md text-on-surface"
                            htmlFor="contact-phone"
                          >
                            Teléfono / WhatsApp
                            <span className="text-primary">*</span>
                          </label>
                          <input
                            className="w-full h-10 px-space-md bg-surface-container-low border border-surface-variant text-body-md text-on-surface placeholder:text-secondary focus:outline-none focus:border-primary-container"
                            id="contact-phone"
                            placeholder="+54 11 1234-5678"
                            required=""
                            type="tel"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label
                            className="font-label-md text-label-md text-on-surface"
                            htmlFor="contact-reason"
                          >
                            Motivo de Consulta
                            <span className="text-primary">*</span>
                          </label>
                          <select
                            className="w-full h-10 px-space-md bg-surface-container-low border border-surface-variant text-body-md text-on-surface focus:outline-none focus:border-primary-container"
                            id="contact-reason"
                            required=""
                          >
                            <option disabled="" defaultValue value="">
                              Selecciona una opción...
                            </option>
                            <option value="ensamble">
                              Asesoramiento de Ensamble y Presupuestos
                            </option>
                            <option value="compatibilidad">
                              Compatibilidad de Hardware (Sockets, RAM, PSU)
                            </option>
                            <option value="stock">
                              Consulta de Stock Inmediato y Precios
                            </option>
                            <option value="rma">
                              Estado de RMA / Gestión de Garantía Directa
                            </option>
                            <option value="corporativo">
                              Ventas Corporativas &amp; Facturación A
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label
                          className="font-label-md text-label-md text-on-surface"
                          htmlFor="contact-message"
                        >
                          Detalle de la Consulta
                          <span className="text-primary">*</span>
                        </label>
                        <textarea
                          className="w-full p-space-md bg-surface-container-low border border-surface-variant text-body-md text-on-surface placeholder:text-secondary focus:outline-none focus:border-primary-container resize-none"
                          id="contact-message"
                          placeholder="Especifica qué componentes buscas combinar, resolución de juego/trabajo, o describe el fallo con número de factura..."
                          required=""
                          rows="4"
                        ></textarea>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="font-label-md text-label-md text-on-surface">
                          Adjuntar Archivo o Presupuesto (Opcional)
                        </label>
                        <div
                          className="relative border border-dashed border-surface-variant bg-surface-container-low p-space-md flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary transition-colors"
                          onClick={() => {}}
                        >
                          <input
                            accept=".pdf,.png,.jpg,.jpeg"
                            className="hidden"
                            id="file-upload"
                            onChange="updateFileLabel(this)"
                            type="file"
                          />
                          <span className="material-symbols-outlined text-secondary text-[28px] mb-1">
                            attach_file
                          </span>
                          <span
                            className="font-label-md text-label-md text-on-surface font-semibold"
                            id="file-label"
                          >
                            Haz clic para subir un PDF o captura (máx. 10MB)
                          </span>
                          <span className="font-body-sm text-[11px] text-secondary mt-0.5">
                            Formatos admitidos: .PDF, .PNG, .JPG de órdenes
                            previas o benchmarks.
                          </span>
                        </div>
                      </div>
                      <div className="pt-space-xs flex flex-col sm:flex-row items-center justify-between gap-space-md">
                        <div className="flex items-center gap-2">
                          <input
                            className="w-4 h-4 accent-primary rounded-none cursor-pointer"
                            id="accept-policy"
                            required=""
                            type="checkbox"
                          />
                          <label
                            className="font-body-sm text-body-sm text-secondary cursor-pointer"
                            htmlFor="accept-policy"
                          >
                            Acepto la política de privacidad de datos y registro
                            de soporte técnico.
                          </label>
                        </div>
                        <button
                          className="w-full sm:w-auto h-11 px-space-xl bg-primary text-on-primary font-label-lg text-label-lg flex items-center justify-center gap-space-xs hover:bg-on-primary-fixed-variant transition-colors shrink-0"
                          type="submit"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            send
                          </span>
                          <span>ENVIAR MENSAJE A SOPORTE TÉCNICO</span>
                        </button>
                      </div>
                      <div
                        className="hidden border border-tertiary bg-on-tertiary-container/20 p-space-md flex items-start gap-space-sm text-tertiary"
                        id="form-success-banner"
                      >
                        <span className="material-symbols-outlined text-[20px] shrink-0 mt-0.5">
                          check_circle
                        </span>
                        <div className="flex flex-col">
                          <span className="font-label-md text-label-md font-bold">
                            ¡Mensaje recibido con éxito!
                          </span>
                          <span className="font-body-sm text-body-sm text-on-surface">
                            Generamos el ticket de soporte
                            <strong>#ZL-2025-0894</strong>. Te contactaremos vía
                            WhatsApp y correo dentro de las próximas 2 horas
                            hábiles.
                          </span>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full bg-surface py-space-2xl" id="faq-tecnico">
            <div className="max-w-[1320px] mx-auto px-margin-desktop">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-surface-variant pb-space-lg mb-space-xl gap-space-md">
                <div className="flex flex-col gap-space-xs max-w-2xl">
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">
                    Centro de Respuestas
                  </span>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                    Preguntas Frecuentes de Hardware &amp; Compras
                  </h2>
                  <p className="font-body-md text-body-md text-secondary">
                    Políticas detalladas de RMA, procedimientos de testeo en
                    laboratorio, logística al interior y facturación.
                  </p>
                </div>
                <div className="flex items-center gap-space-xs bg-surface-container border border-surface-variant px-space-md py-2">
                  <span className="material-symbols-outlined text-tertiary text-[20px]">
                    verified
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface font-semibold">
                    Términos alineados con Ley 24.240 de Defensa al Consumidor
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
                <div
                  className="lg:col-span-8 flex flex-col gap-space-sm"
                  id="faq-accordion-group"
                >
                  <div className="border border-surface-variant bg-surface-container-lowest">
                    <button
                      className="w-full p-space-md text-left flex items-center justify-between gap-space-md hover:bg-surface-container transition-colors"
                      onClick={() => {}}
                      type="button"
                    >
                      <div className="flex items-center gap-space-sm">
                        <span className="font-label-sm text-label-sm text-primary font-bold">
                          01.
                        </span>
                        <span className="font-headline-sm text-[16px] text-on-surface font-semibold">
                          ¿Cómo funciona la garantía directa y gestión de RMA en
                          ZeroLag?
                        </span>
                      </div>
                      <span className="material-symbols-outlined text-secondary transition-transform duration-200">
                        expand_more
                      </span>
                    </button>
                    <div className="faq-content p-space-md border-t border-surface-variant bg-surface-container-low font-body-md text-body-md text-secondary space-y-2">
                      <p>
                        Todos los productos cuentan con cobertura oficial de
                        <strong>12 a 36 meses</strong> según la marca (ASUS,
                        MSI, Gigabyte, Corsair, AMD, Intel). Si el componente
                        presenta falla de fábrica dentro de las
                        <strong>72 horas hábiles</strong> de recibido,
                        efectuamos el cambio inmediato por una unidad nueva
                        sellada en nuestro showroom de Belgrano o mediante
                        retiro a domicilio bonificado.
                      </p>
                      <p>
                        Pasadas las 72 horas, nuestro departamento técnico
                        evalúa la pieza en un plazo no mayor a 5 días hábiles
                        para certificar el número de serie y derivar a canal
                        oficial o resolver con reemplazo directo. No te hacemos
                        esperar meses de importación: respondemos con nuestro
                        propio inventario de respaldo.
                      </p>
                    </div>
                  </div>
                  <div className="border border-surface-variant bg-surface-container-lowest">
                    <button
                      className="w-full p-space-md text-left flex items-center justify-between gap-space-md hover:bg-surface-container transition-colors"
                      onClick={() => {}}
                      type="button"
                    >
                      <div className="flex items-center gap-space-sm">
                        <span className="font-label-sm text-label-sm text-primary font-bold">
                          02.
                        </span>
                        <span className="font-headline-sm text-[16px] text-on-surface font-semibold">
                          ¿Las PC armadas vienen testeadas y con drivers
                          instalados?
                        </span>
                      </div>
                      <span className="material-symbols-outlined text-secondary transition-transform duration-200">
                        expand_more
                      </span>
                    </button>
                    <div className="faq-content p-space-md border-t border-surface-variant bg-surface-container-low font-body-md text-body-md text-secondary space-y-2">
                      <p>
                        Absolutamente sí. Cada ensamble completo pasa por una
                        rutina ininterrumpida de
                        <strong>4 horas de estrés térmico</strong> utilizando
                        Cinebench R23 (CPU y VRMs) y FurMark / 3DMark TimeSpy
                        (GPU).
                      </p>
                      <p>Además:</p>
                      <ul className="list-disc list-inside space-y-1 pl-2 font-body-sm text-body-sm">
                        <li>
                          Actualizamos la BIOS del motherboard a la versión
                          estable más reciente.
                        </li>
                        <li>
                          Habilitamos los perfiles XMP / EXPO de las memorias
                          RAM para garantizar su velocidad declarada (ej.
                          6000MHz CL30).
                        </li>
                        <li>
                          Optimizamos la curva de ventilación del chasis para
                          mantener niveles acústicos mínimos en reposo.
                        </li>
                        <li>
                          Instalamos la suite de controladores oficiales sin
                          programas basura ni bloatware publicitario.
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="border border-surface-variant bg-surface-container-lowest">
                    <button
                      className="w-full p-space-md text-left flex items-center justify-between gap-space-md hover:bg-surface-container transition-colors"
                      onClick={() => {}}
                      type="button"
                    >
                      <div className="flex items-center gap-space-sm">
                        <span className="font-label-sm text-label-sm text-primary font-bold">
                          03.
                        </span>
                        <span className="font-headline-sm text-[16px] text-on-surface font-semibold">
                          ¿Hacen envíos al interior del país y cómo se embala el
                          hardware?
                        </span>
                      </div>
                      <span className="material-symbols-outlined text-secondary transition-transform duration-200">
                        expand_more
                      </span>
                    </button>
                    <div className="faq-content p-space-md border-t border-surface-variant bg-surface-container-low font-body-md text-body-md text-secondary space-y-2">
                      <p>
                        Despachamos de lunes a viernes a todo el territorio
                        nacional a través de
                        <strong>Andreani Express Prioritario</strong> y Correo
                        Argentino. Todos los envíos viajan con
                        <strong>
                          seguro de reposición total contra rotura, robo o
                          extravío
                        </strong>
                        .
                      </p>
                      <p>
                        Para PC armadas con placas de video de gran porte
                        (series RTX 4070/4080/4090 o RX 7800/7900), introducimos
                        espuma expansiva bi-componente antiestática dentro del
                        gabinete para evitar que el puerto PCI-Express sufra
                        palancas por movimientos bruscos en el transporte.
                        Adjuntamos instrucciones sencillas para retirarla antes
                        del encendido.
                      </p>
                    </div>
                  </div>
                  <div className="border border-surface-variant bg-surface-container-lowest">
                    <button
                      className="w-full p-space-md text-left flex items-center justify-between gap-space-md hover:bg-surface-container transition-colors"
                      onClick={() => {}}
                      type="button"
                    >
                      <div className="flex items-center gap-space-sm">
                        <span className="font-label-sm text-label-sm text-primary font-bold">
                          04.
                        </span>
                        <span className="font-headline-sm text-[16px] text-on-surface font-semibold">
                          ¿Cuáles son los medios de pago y cómo accedo al 15%
                          OFF?
                        </span>
                      </div>
                      <span className="material-symbols-outlined text-secondary transition-transform duration-200">
                        expand_more
                      </span>
                    </button>
                    <div className="faq-content p-space-md border-t border-surface-variant bg-surface-container-low font-body-md text-body-md text-secondary space-y-2">
                      <p>
                        El precio con <strong>15% OFF Especial</strong> aplica
                        de forma inmediata abonando mediante Transferencia
                        Bancaria Directa (CBU/CVU), depósito en cuenta corriente
                        corporativa o efectivo billete en nuestro Showroom de
                        Belgrano.
                      </p>
                      <p>
                        Para pagos con tarjeta, contamos con planes de
                        <strong>3, 6 y 12 cuotas fijas</strong> procesadas vía
                        pasarela bancaria segura con certificación TLS 256-bit.
                        La factura electrónica AFIP con el CAE correspondiente
                        se remite automáticamente al correo electrónico tras la
                        aprobación de la operación.
                      </p>
                    </div>
                  </div>
                  <div className="border border-surface-variant bg-surface-container-lowest">
                    <button
                      className="w-full p-space-md text-left flex items-center justify-between gap-space-md hover:bg-surface-container transition-colors"
                      onClick={() => {}}
                      type="button"
                    >
                      <div className="flex items-center gap-space-sm">
                        <span className="font-label-sm text-label-sm text-primary font-bold">
                          05.
                        </span>
                        <span className="font-headline-sm text-[16px] text-on-surface font-semibold">
                          ¿Puedo llevar mis propios componentes para que ustedes
                          los ensamblen?
                        </span>
                      </div>
                      <span className="material-symbols-outlined text-secondary transition-transform duration-200">
                        expand_more
                      </span>
                    </button>
                    <div className="faq-content p-space-md border-t border-surface-variant bg-surface-container-low font-body-md text-body-md text-secondary space-y-2">
                      <p>
                        Sí. Contamos con un servicio de
                        <strong>
                          Ensamble de Laboratorio &amp; Cable Management
                          Profesional
                        </strong>
                        para clientes que ya disponen de componentes propios o
                        adquiridos previamente.
                      </p>
                      <p>
                        El servicio incluye limpieza por aire comprimido
                        ionizado, reemplazo de pasta térmica (utilizamos
                        exclusivamente Arctic MX-6 o Noctua NT-H2), orden de
                        cableado modular, flasheo de BIOS y certificación de
                        temperaturas bajo banco de pruebas. La tarifa es fija y
                        se abona al momento de la entrega.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-4 flex flex-col gap-space-md">
                  <div className="bg-surface-container-lowest border border-surface-variant p-space-md">
                    <h4 className="font-label-lg text-label-lg uppercase tracking-wider text-on-surface font-bold border-b border-surface-variant pb-2 mb-space-sm">
                      Garantía por Fabricante
                    </h4>
                    <div className="space-y-space-sm">
                      <div className="flex items-center justify-between text-body-sm">
                        <span className="font-bold text-on-surface">
                          Placas de Video ASUS / ROG
                        </span>
                        <span className="text-tertiary font-bold">
                          36 Meses
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-body-sm border-t border-surface-variant pt-2">
                        <span className="font-bold text-on-surface">
                          Procesadores AMD Ryzen Box
                        </span>
                        <span className="text-tertiary font-bold">
                          36 Meses
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-body-sm border-t border-surface-variant pt-2">
                        <span className="font-bold text-on-surface">
                          Fuentes Seasonic / Corsair Gold
                        </span>
                        <span className="text-tertiary font-bold">
                          60 a 120 Meses
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-body-sm border-t border-surface-variant pt-2">
                        <span className="font-bold text-on-surface">
                          Almacenamiento NVMe PCIe 4.0
                        </span>
                        <span className="text-tertiary font-bold">
                          60 Meses
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-body-sm border-t border-surface-variant pt-2">
                        <span className="font-bold text-on-surface">
                          Monitores Gaming 144Hz+
                        </span>
                        <span className="text-tertiary font-bold">
                          36 Meses (Zero Pixel)
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-surface-container-lowest border border-surface-variant p-space-md flex flex-col gap-space-sm">
                    <div className="flex items-center gap-space-xs text-primary">
                      <span className="material-symbols-outlined text-[20px]">
                        report
                      </span>
                      <span className="font-label-md text-label-md font-bold uppercase">
                        Procedimiento de RMA Express
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-secondary leading-relaxed">
                      Para tramitar una garantía ten a mano el número de factura
                      emitida por ZeroLag Hardware Argentina S.R.L. y el número
                      de serie impreso en la etiqueta de la caja original.
                    </p>
                    <div className="bg-surface-container p-2 border border-surface-variant font-mono text-[11px] text-on-surface">
                      FORMATO TICKET: RMA-[AÑO]-[NRO FACTURA]
                    </div>
                    <a
                      className="h-9 px-space-md bg-surface-container-low border border-surface-variant text-on-surface hover:border-primary text-center font-label-md text-label-md flex items-center justify-center gap-1 transition-colors"
                      href="mailto:rma@zerolag.com.ar"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        mail
                      </span>
                      <span>Escribir a rma@zerolag.com.ar</span>
                    </a>
                  </div>
                  <div className="bg-surface-container border border-surface-variant p-space-md flex items-center gap-space-sm">
                    <span className="material-symbols-outlined text-secondary text-[24px]">
                      policy
                    </span>
                    <div className="flex flex-col">
                      <span className="font-label-sm text-label-sm font-bold text-on-surface">
                        Botón de Arrepentimiento
                      </span>
                      <span className="font-body-sm text-[11px] text-secondary">
                        Conforme al Art. 34 de la Ley 24.240 tenés 10 días
                        corridos para revocar tu compra online.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default AboutUsPage;
