function Login({
  authTab,
  handleLogin,
  email,
  setEmail,
  password,
  setPassword,
  error,
}) {
  return (
    <div
      className={`flex-col ${authTab === "login" ? "flex" : "hidden"}`}
      id="form-login-pane"
    >
      <div className="mb-space-md">
        <h2 className="font-headline-sm text-headline-sm text-on-surface">
          Bienvenido de vuelta
        </h2>
        <p className="font-body-sm text-body-sm text-secondary mt-1">
          Ingresá tus credenciales para administrar tus órdenes, garantías RMA y
          presupuestos guardados.
        </p>
      </div>

      <form
        action="#"
        className="flex flex-col gap-space-md"
        method="POST"
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        {/* Input de Correo */}
        <div className="flex flex-col gap-1">
          <label
            className="font-label-md text-label-md text-on-surface"
            htmlFor="login-email"
          >
            Correo Electrónico
          </label>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-secondary text-[18px]">
              mail
            </span>
            <input
              className="w-full h-10 pl-10 pr-space-md bg-surface border border-surface-variant rounded text-body-md font-body-md text-on-surface placeholder:text-secondary focus:outline-none focus:border-primary-container"
              id="login-email"
              placeholder="tu-usuario@dominio.com.ar"
              required
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
        </div>

        {/* Input de Contraseña */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <label
              className="font-label-md text-label-md text-on-surface"
              htmlFor="login-password"
            >
              Contraseña
            </label>
            <a
              className="font-label-sm text-label-sm text-primary hover:text-primary font-semibold"
              href="#"
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-secondary text-[18px]">
              key
            </span>
            <input
              className="w-full h-10 pl-10 pr-10 bg-surface border border-surface-variant rounded text-body-md font-body-md text-on-surface placeholder:text-secondary focus:outline-none focus:border-primary-container"
              id="login-password"
              placeholder="••••••••••••"
              required
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button
              aria-label="Mostrar contraseña"
              className="absolute right-3 text-secondary hover:text-on-surface"
              onClick={() => {}}
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">
                visibility
              </span>
            </button>
          </div>
        </div>

        {/* Checkbox Recordar Sesión */}
        <div className="flex items-center justify-between py-1">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              className="w-4 h-4 rounded border-surface-variant accent-primary cursor-pointer"
              type="checkbox"
            />
            <span className="font-body-sm text-body-sm text-on-surface">
              Recordar sesión en este equipo
            </span>
          </label>
          <span className="font-label-sm text-label-sm text-secondary hidden sm:inline">
            Protección reCAPTCHA
          </span>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Botón de Ingreso */}
        <button
          className="w-full h-11 bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg rounded flex items-center justify-center gap-space-xs transition-colors tracking-wide font-bold"
          type="submit"
        >
          <span className="material-symbols-outlined text-[20px]">login</span>
          <span>INGRESAR A ZEROLAG</span>
        </button>
      </form>

      {/* Separador de Redes Sociales / Proveedores Externos */}
      <div className="relative my-space-lg">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-surface-variant"></div>
        </div>
        <div className="relative flex justify-center text-label-sm font-label-sm uppercase tracking-wider">
          <span className="bg-surface-container-lowest px-space-md text-secondary">
            O acceder directamente con
          </span>
        </div>
      </div>

      {/* Botones de Proveedores (Google, Steam, Discord) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm">
        <button
          className="h-10 px-space-sm bg-surface hover:bg-surface-container border border-surface-variant rounded flex items-center justify-center gap-2 font-label-md text-label-md text-on-surface transition-colors"
          type="button"
        >
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            ></path>
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            ></path>
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              fill="#FBBC05"
            ></path>
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              fill="#EA4335"
            ></path>
          </svg>
          <span>Google</span>
        </button>
        <button
          className="h-10 px-space-sm bg-surface hover:bg-surface-container border border-surface-variant rounded flex items-center justify-center gap-2 font-label-md text-label-md text-on-surface transition-colors"
          type="button"
        >
          <span className="material-symbols-outlined text-[18px] text-on-surface">
            sports_esports
          </span>
          <span>Steam</span>
        </button>
        <button
          className="h-10 px-space-sm bg-surface hover:bg-surface-container border border-surface-variant rounded flex items-center justify-center gap-2 font-label-md text-label-md text-on-surface transition-colors"
          type="button"
        >
          <span className="material-symbols-outlined text-[18px] text-[#5865F2]">
            forum
          </span>
          <span>Discord</span>
        </button>
      </div>
    </div>
  );
}

export default Login;
