const formatToARGMoney = new Intl.NumberFormat("es-AR", {
  useGrouping: true,
});

/** Formatea un importe según la configuración regional de Argentina. */
export function formatMoney(amountCents) {
  return `$${formatToARGMoney.format(amountCents)}`;
}
