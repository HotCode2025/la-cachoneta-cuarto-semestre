function LoginHeader() {
  return (
    <div className="w-full bg-surface-container-low border-b border-surface-variant">
      <div className="max-w-[1320px] mx-auto px-margin-desktop py-space-sm flex flex-wrap items-center justify-between gap-space-sm font-label-sm text-label-sm text-secondary">
        <div className="flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-[16px] text-tertiary">
            lock
          </span>
          <span>
            Conexión cifrada TLS 1.3 | Autenticación Segura ZeroLag ID
          </span>
        </div>
        <div className="flex items-center gap-space-md">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px] text-primary">
              storefront
            </span>
            Showroom Belgrano: Av. Cabildo 2450
          </span>
          <span className="hidden sm:inline text-surface-variant">|</span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px] text-tertiary">
              check_circle
            </span>
            AFIP Factura A y B Electrónica
          </span>
        </div>
      </div>
    </div>
  );
}

export default LoginHeader;
