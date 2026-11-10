# ZeroLag Ecommerce

Aplicación web de comercio electrónico para la exploración y compra de hardware, desarrollada como proyecto grupal. La interfaz está en español y presenta productos, categorías, ofertas, carrito, autenticación, pedidos y herramientas de administración.

## Equipo

El proyecto fue realizado por el grupo **La Cachoneta**, integrado por:

- Ramiro Soria
- Enzo Ulloa
- Emmanuel Yapura
- Germán Fratucello
- Agustín Gonzalez
- Esteban Montenegro

## Índice

- [Tecnologías](#tecnologías)
- [Requisitos y puesta en marcha](#requisitos-y-puesta-en-marcha)
- [Comandos disponibles](#comandos-disponibles)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Secciones de la aplicación](#secciones-de-la-aplicación)
- [Rutas y acceso](#rutas-y-acceso)
- [Autenticación y estado compartido](#autenticación-y-estado-compartido)
- [Integración con el backend](#integración-con-el-backend)
- [Estilos y recursos](#estilos-y-recursos)
- [Despliegue](#despliegue)
- [Roadmap](#roadmap)
- [Notas del estado actual](#notas-del-estado-actual)

## Tecnologías

- **React 19** para la interfaz y los componentes.
- **Vite 8** para el servidor de desarrollo y la compilación.
- **React Router 7** para la navegación.
- **Tailwind CSS 4** y `@tailwindcss/vite` para los estilos.
- **Axios** para las solicitudes HTTP.
- **Day.js** para el manejo de fechas.
- **ESLint** con reglas para JavaScript, React y hooks.

El proyecto utiliza módulos ES y componentes escritos en JavaScript y JSX.

## Requisitos y puesta en marcha

Se necesita Node.js y pnpm instalados. El repositorio incluye `pnpm-lock.yaml`; se recomienda usar pnpm para instalar las mismas versiones de dependencias.

Desde la carpeta del proyecto:

```bash
pnpm install
pnpm dev
```

Vite muestra en la terminal la dirección local para abrir en el navegador. La aplicación espera que el backend configurado esté disponible para cargar datos dinámicos.

## Comandos disponibles

| Comando        | Descripción                                           |
| -------------- | ----------------------------------------------------- |
| `pnpm dev`     | Inicia Vite en modo desarrollo.                       |
| `pnpm build`   | Genera la compilación de producción en `dist/`.       |
| `pnpm preview` | Sirve localmente la compilación para previsualizarla. |
| `pnpm lint`    | Ejecuta ESLint sobre el proyecto.                     |

También se pueden ejecutar los scripts con npm (`npm run dev`, `npm run build`, etc.), aunque pnpm es el gestor indicado por el archivo de bloqueo.

## Estructura del proyecto

```text
.
├── public/                 Recursos estáticos publicados sin transformación
├── src/
│   ├── api/                Cliente Axios con gestión de autenticación
│   ├── assets/             Recursos importados por la aplicación
│   ├── components/         Componentes globales y controles de acceso
│   ├── context/            Contexto de autenticación
│   ├── pages/              Páginas y componentes específicos de cada sección
│   │   ├── cart/           Flujo de carrito y checkout
│   │   │   └── cartlayout/ Componentes del listado y resumen del carrito
│   │   ├── home/           Secciones de la página principal
│   │   ├── login/          Formularios y elementos de acceso
│   │   ├── myaccount/      Perfil e historial de pedidos
│   │   ├── search/         Controles, filtros y resultados
│   │   └── tracking/       Componentes de seguimiento de envíos
│   ├── utils/              Funciones reutilizables
│   ├── App.jsx             Rutas y coordinación del estado compartido
│   ├── index.css           Estilos globales y tema Tailwind
│   └── main.jsx            Punto de entrada de React
├── eslint.config.js        Configuración de ESLint
├── index.html              Documento HTML de entrada
├── package.json            Dependencias y scripts
├── pnpm-lock.yaml          Versiones bloqueadas de dependencias
├── vercel.json             Reglas de proxy y fallback para Vercel
└── vite.config.js          Plugins y proxy de desarrollo
```

### Organización de `src`

- `App.jsx` declara las rutas, el encabezado y el pie de página, y comparte el estado del carrito.
- `components/` contiene elementos reutilizados, como `Header`, `Footer`, `Breadcrumbs` y las rutas protegidas.
- `context/AuthContext.jsx` expone el estado de sesión mediante `AuthProvider` y el hook `useAuth`.
- `api/axiosAuth.js` agrega las credenciales del usuario a las solicitudes protegidas y trata las respuestas `401`.
- `pages/` agrupa las páginas y sus piezas de interfaz por dominio.
- `utils/money.js` centraliza el formato de importes para la configuración regional argentina.

## Secciones de la aplicación

- **Inicio:** banners, categorías, ensamblados destacados y productos con stock bajo.
- **Catálogo:** búsqueda de productos y filtros por categoría, precio, chipset, marca y VRAM; las opciones se reflejan en los parámetros de la URL cuando corresponde.
- **Detalle de producto:** consulta un producto por identificador y permite agregarlo al carrito.
- **Acceso y registro:** formularios de alta e inicio de sesión.
- **Carrito y checkout:** listado de artículos, modificación de cantidades, creación de pedido, datos de envío/facturación y solicitud de preferencia de pago.
- **Pedidos y cuenta:** datos de perfil e historial de pedidos del usuario autenticado.
- **Inventario:** listado administrativo, filtro por categoría, valor del inventario y paginación.
- **Información institucional y página 404:** contenido informativo y navegación alternativa para rutas no encontradas.
- **Seguimiento:** hay componentes y una página de seguimiento implementados en `pages/tracking/` y `pages/TrackingPage.jsx`; actualmente esa página no está registrada en las rutas de `App.jsx`.

## Rutas y acceso

Las rutas declaradas en `App.jsx` son:

| Ruta                          | Acceso                        | Contenido                     |
| ----------------------------- | ----------------------------- | ----------------------------- |
| `/`                           | Público                       | Inicio                        |
| `/product-details/:productId` | Público                       | Detalle de producto           |
| `/search`                     | Público                       | Catálogo y filtros            |
| `/about-us`                   | Público                       | Información institucional     |
| `/login`                      | Solo usuarios no autenticados | Inicio de sesión y registro   |
| `/checkout`                   | Usuario autenticado           | Carrito y proceso de compra   |
| `/orders`                     | Usuario autenticado           | Cuenta e historial de pedidos |
| `/inventory`                  | Administrador                 | Gestión del inventario        |
| `*`                           | Público                       | Página 404                    |

`ProtectedRoute` requiere una sesión para las rutas de usuario. `AdminRoute` además comprueba que el rol almacenado sea `ADMIN`. `PublicRoute` redirige al inicio a los usuarios que ya iniciaron sesión.

## Autenticación y estado compartido

`AuthProvider`, montado desde `main.jsx`, proporciona el estado de autenticación al resto de la aplicación. La sesión se guarda en `localStorage` usando las claves `token` y `usuario`; el contexto extrae de los datos del usuario el nombre y el rol.

`axiosAuth.js` adjunta el token a las solicitudes autenticadas. Si el backend devuelve `401`, elimina las credenciales y redirige a `/login`. Al iniciar sesión también se emite el evento `user-logged-in`, que `App.jsx` escucha para volver a cargar el carrito.

El carrito se mantiene en el estado de `App.jsx` y se vuelve a consultar después de agregar, actualizar o eliminar artículos y al crear un pedido.

## Integración con el backend

La aplicación consume una API externa. Durante el desarrollo, `vite.config.js` redirige las solicitudes a `/api` e `/images` a `backend-ecommerce-lc.onrender.com`. En Vercel, `vercel.json` define rewrites equivalentes y entrega `index.html` para las rutas de la aplicación.

Las llamadas observadas en el código incluyen:

| Método   | Endpoint                               | Uso                               |
| -------- | -------------------------------------- | --------------------------------- |
| `GET`    | `/api/productos`                       | Catálogo e inventario             |
| `GET`    | `/api/productos/:productId`            | Detalle de producto               |
| `POST`   | `/api/usuarios`                        | Registro                          |
| `POST`   | `/api/usuarios/login`                  | Inicio de sesión                  |
| `GET`    | `/api/carrito`                         | Carga del carrito                 |
| `POST`   | `/api/carrito/items`                   | Agregar un producto               |
| `PUT`    | `/api/carrito/items/:itemId`           | Actualizar cantidad               |
| `DELETE` | `/api/carrito/items/:itemId`           | Eliminar un artículo              |
| `GET`    | `/api/pedidos`                         | Consultar pedidos                 |
| `POST`   | `/api/pedidos`                         | Crear un pedido                   |
| `POST`   | `/api/pagos/crear-preferencia`         | Solicitar una preferencia de pago |
| `GET`    | `/api/orders/:orderId?expand=products` | Consultar datos para seguimiento  |

Las respuestas y nombres de campos dependen del backend. Para cambiar el servicio remoto, hay que revisar tanto `vite.config.js` como `vercel.json`.

## Estilos y recursos

`src/index.css` importa Tailwind CSS, define los colores, tipografías, radios y espaciados del tema, e incluye estilos globales. La interfaz utiliza Inter y Material Symbols, cargados desde Google Fonts.

Los recursos visuales importados desde el código se encuentran en `src/assets/`; los archivos de `public/` —incluidos los favicons— se sirven directamente desde la raíz del sitio.

## Despliegue

El proyecto incluye configuración de Vercel en `vercel.json`:

1. Reenvía `/api/*` e `/images/*` al backend remoto.
2. Reescribe las demás rutas hacia `index.html` para permitir la navegación del cliente con React Router.

Para generar manualmente los archivos de producción:

```bash
pnpm build
```

El resultado se guarda en `dist/`. Esa carpeta es un artefacto generado y no contiene el código fuente del proyecto.

## Roadmap

### Hito 1: Configuración Inicial, Arquitectura Base y Estilos

- **Fecha:** Octubre de 2026
- **Descripción:** Establecimiento de los cimientos del proyecto, configuración del entorno de desarrollo, integración de herramientas de diseño y la primera conexión inicial con la arquitectura del servidor backend.
- **Características Principales:**
  - Configuración inicial del repositorio ([`dbeb318`](../../commit/dbeb318)).
  - Instalación de Tailwind CSS y creación de las vistas iniciales de Home y Checkout ([`cd360e1`](../../commit/cd360e1)).
  - Implementación de enrutamiento con React Router mediante componentes `Link` ([`0ec75e2`](../../commit/0ec75e2)) y `NavLink` con estilos personalizados para el carrito ([`5de178c`](../../commit/5de178c)), junto con la reorganización de carpetas de páginas ([`5637750`](../../commit/5637750)).
  - Creación de componentes estructurales como la página de Tracking y 404, además del componente de `Breadcrumbs` ([`17af2b5`](../../commit/17af2b5)).
  - Configuración de peticiones HTTP con Axios ([`1ed1df4`](../../commit/1ed1df4)), eliminación de la carpeta de código estático para usar datos del backend ([`ca6dd2a`](../../commit/ca6dd2a)), obtención del carrito y conteo de ítems ([`30bc1b6`](../../commit/30bc1b6)), y configuración de proxy del servidor para `/api` e `/images` ([`6f9dbdb`](../../commit/6f9dbdb)).
  - Generación de opciones de prueba para envíos ([`96c9f49`](../../commit/96c9f49)), creación preliminar del resumen de pago con diseño _sticky_ ([`6b18c39`](../../commit/6b18c39)), y carga dinámica de tarjetas en `FlashOffers` utilizando datos de prueba ([`1bfb516`](../../commit/1bfb516)).

### Hito 2: Autenticación, Gestión de Usuarios y Vistas de Cuenta

- **Fecha:** Octubre de 2026
- **Descripción:** Desarrollo de los flujos de identidad de usuario, integración de bases de datos relacionales y estructuración de los resúmenes de pago interactivos.
- **Características Principales:**
  - Corrección de elementos estéticos generales, favicon, títulos dinámicos y redirección del logo en el header ([`9f6220d`](../../commit/9f6220d)).
  - Incorporación inicial de la página `MyAccount` ([`695f3fc`](../../commit/695f3fc)) y estandarización del idioma de los títulos al español ([`d70e58f`](../../commit/d70e58f)).
  - Migración y refactorización de peticiones asíncronas utilizando `async/await` dentro de los `useEffect` en `HomePage`, `App` y `CheckoutSummary` ([`2283cde`](../../commit/2283cde)).
  - Conexión a la base de datos real, habilitación de páginas pendientes, registro/inicio de sesión de usuarios y consumo correcto de tokens de autenticación ([`2b7fcee`](../../commit/2b7fcee)).

### Hito 3: Catálogo, Buscador Avanzado y Experiencia de Compra (Checkout)

- **Fecha:** Noviembre de 2026
- **Descripción:** Refactorización profunda de la experiencia de navegación, optimización del motor de búsqueda de productos y estructuración completa del flujo del carrito de compras.
- **Características Principales:**
  - Ocultamiento dinámico de header y footer en páginas exclusivas de administración ([`e6329d7`](../../commit/e6329d7)).
  - Integración del carrito de compras (`CartPage`) consumiendo datos directos de la base de datos ([`e9fa71f`](../../commit/e9fa71f)).
  - Implementación del buscador en el header con redirección y búsqueda precisa en la vista de resultados ([`0852c13`](../../commit/0852c13)).
  - Factorización de `SearchPage` en subcomponentes modulares e integración de filtros por categoría ([`aad3406`](../../commit/aad3406)).
  - Sincronización de las categorías en `SearchPage` mediante parámetros de URL, vinculando el header y la `HomePage` con la vista de búsqueda ([`0a16176`](../../commit/0a16176)).
  - Actualización de `FlashOffers` para limitar la visualización a 6 productos, mostrando stock real dinámico y barras de progreso proporcionales ([`b250e52`](../../commit/b250e52)).
  - Corrección de redirecciones en botones de categorías de la `HomePage` ([`0270941`](../../commit/0270941)) y enlaces de información de productos hacia `product-details` ([`7f536fb`](../../commit/7f536fb)).
  - Modificación del componente de `breadcrumbs` para adaptarlo a `SearchPage` y verificación condicional de tokens en las peticiones del carrito dentro de `App` ([`383382e`](../../commit/383382e)).
  - Implementación del flujo transaccional completo: confirmación del carrito, paso a envío/facturación, creación del pedido y redirección a la pasarela de pagos de **MercadoPago** ([`485ddd6`](../../commit/485ddd6)).

### Hito 4: Roles de Seguridad, Inventario y Despliegue a Producción

- **Fecha:** Noviembre de 2026
- **Descripción:** Fortalecimiento de la seguridad basada en roles, optimización del estado global de autenticación, ampliación del panel de inventario y preparación del entorno para despliegue en la nube.
- **Características Principales:**
  - Funcionalidad completa en botones de adición al carrito con indicadores de carga (_spinners_) y pantallas de carga globales para todas las interacciones con el backend ([`b1a06c4`](../../commit/b1a06c4)).
  - Restricción de acceso visual y lógico al **Panel de Administración** validando de forma exclusiva el rol `ADMIN` del usuario ([`113d19f`](../../commit/113d19f)).
  - Limpieza de archivos obsoletos e implementación de un `AuthContext` dedicado al manejo reactivo del estado de sesión y renderizado de páginas, junto con mejoras de adaptabilidad responsiva ([`e11feaa`](../../commit/e11feaa)).
  - Actualización del comportamiento del contador de ítems del carrito al confirmar pedidos ([`a77c988`](../../commit/a77c988)).
  - Preparación del proyecto para despliegue mediante la incorporación del archivo de configuración `vercel.json` ([`f9253cd`](../../commit/f9253cd)).
  - Optimización y mejora general de comentarios en los archivos del código fuente con asistencia de IA ([`5045f96`](../../commit/5045f96)).
  - Creación y documentación inicial del repositorio mediante el archivo README ([`f27a868`](../../commit/f27a868)).

## Notas del estado actual

- El formulario de checkout mantiene dirección y tipo de facturación en estado local; el código actual no los envía al backend.
- La pantalla de pago busca `url_pago_prueba` en la respuesta del backend y redirige a esa URL.
- Los ensamblados mensuales se presentan como contenido definido en la interfaz; no se cargan desde la API en este componente.
- La página de seguimiento existe, pero falta incorporarla al árbol de rutas de `App.jsx` para acceder a ella mediante una ruta de la aplicación.
- Los datos del catálogo, el carrito, las cuentas, los pedidos y el pago requieren que el backend responda con la estructura esperada por cada pantalla.
