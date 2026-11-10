import MyAccountHeader from "./myaccount/MyAccountHeader";
import MyAccountMain from "./myaccount/MyAccountMain";

/** Presenta la cabecera y los paneles de gestión de la cuenta. */
function MyAccount() {
  return (
    <>
      <link rel="icon" type="image/svg+xml" href="/orders-favicon.svg" />
      <title>Mi Perfil</title>

      {/* Contenido principal de la cuenta */}
      <main className="w-full pt-24 sm:pt-[156px] bg-surface min-h-[calc(100vh-156px)]">
        <div className="flex flex-col w-full">
          <div className="max-w-[1320px] mx-auto w-full px-4 sm:px-6 md:px-margin-desktop py-space-md sm:py-space-lg flex flex-col gap-space-md sm:gap-space-lg">
            {/* Cabecera del perfil de usuario */}
            <MyAccountHeader />

            {/* Paneles de gestión de la cuenta */}
            <MyAccountMain />
          </div>
        </div>
      </main>
    </>
  );
}

export default MyAccount;
