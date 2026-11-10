# E-commerce Backend API

API REST para una plataforma de comercio electrónico desarrollada como proyecto universitario de la carrera de Técnico Universitario en Programación.

El backend permite gestionar usuarios, productos, categorías, carritos de compra, pedidos y pagos mediante la integración con Mercado Pago.

Actualmente se encuentra desplegado en **Render** y utiliza **Supabase PostgreSQL** como base de datos.

## Tecnologías utilizadas

- **Node.js:** entorno de ejecución.
- **Express:** framework para construir la API REST.
- **Prisma ORM:** acceso y comunicación con la base de datos.
- **PostgreSQL:** sistema de gestión de base de datos.
- **Supabase:** alojamiento de la base de datos y almacenamiento de imágenes.
- **JWT:** autenticación y protección de rutas.
- **Mercado Pago SDK:** creación de preferencias de pago y procesamiento de notificaciones.
- **Render:** despliegue del backend.

## Arquitectura del proyecto

El proyecto utiliza una organización por responsabilidades, separando rutas, controladores, servicios y middlewares.

```text
backend-ecommerce-lc/
│
├── prisma/
│   └── schema.prisma
│
├── src/
│   ├── controllers/
│   ├── middlewares/
│   ├── routes/
│   ├── services/
│   └── server.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

### Responsabilidades

- **Routes:** definen los endpoints y los middlewares asociados.
- **Controllers:** reciben las solicitudes HTTP y gestionan las respuestas.
- **Services:** contienen la lógica de negocio.
- **Middlewares:** implementan funcionalidades transversales, como la autenticación.
- **Prisma:** permite interactuar con PostgreSQL mediante modelos y consultas.

## Despliegue

La API se encuentra desplegada en Render.

**URL base:**

https://backend-ecommerce-lc.onrender.com

**Ejemplo de solicitud:**

```http
GET https://backend-ecommerce-lc.onrender.com/api/productos
```

> El servicio utiliza el plan gratuito de Render, por lo que puede entrar en reposo después de un período de inactividad. La primera solicitud posterior puede demorar mientras se reactiva.

## Instalación y ejecución local

### Requisitos

- Node.js.
- npm.
- Acceso a una base de datos PostgreSQL configurada.
- Credenciales de Supabase.
- Credenciales de Mercado Pago para las funcionalidades de pago.

### 1. Clonar el repositorio

```bash
git clone https://github.com/EmmanuelYapura/backend-ecommerce-lc.git
```

### 2. Ingresar al proyecto

```bash
cd backend-ecommerce-lc
```

### 3. Instalar dependencias

```bash
npm install
```

### 4. Configurar las variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
DATABASE_URL=
DIRECT_URL=
JWT_SECRET=
MERCADOPAGO_ACCESS_TOKEN=
MERCADOPAGO_WEBHOOK_SECRET=
MERCADOPAGO_NOTIFICATION_URL=
FRONTEND_URL=
```

Completar las variables con las credenciales correspondientes.

`FRONTEND_URL` es la direccion publica del frontend y se usa para armar las URLs de retorno de Mercado Pago. En desarrollo suele ser `http://localhost:5173`. Si no se define, se utiliza la URL del sitio desplegado.

**Importante:** nunca subir el archivo `.env` ni publicar credenciales privadas en el repositorio.

### 5. Generar Prisma Client

```bash
npx prisma generate
```

### 6. Iniciar el servidor

```bash
node src/server.js
```

El servidor utilizará el puerto definido en `PORT` o, si no está configurado, el puerto 3000.

## Endpoints disponibles

Todos los endpoints utilizan como prefijo:

```text
/api
```

### Usuarios y autenticación

| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/api/usuarios` | Registrar un usuario. |
| POST | `/api/usuarios/login` | Iniciar sesión y obtener un JWT. |

### Productos

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/productos` | Obtener los productos activos. |
| GET | `/api/productos/:id` | Obtener un producto por su identificador. |

El listado devuelve únicamente los productos con `activo = true`. Un administrador autenticado puede agregar `?incluirInactivos=true` para recibir también los productos dados de baja.

#### Administración del catálogo

Estos endpoints requieren un JWT cuyo usuario tenga el rol `ADMIN`. Un usuario autenticado sin ese rol recibe `403`.

| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/api/productos` | Alta de producto. |
| PUT | `/api/productos/:id` | Modificación de los datos del producto. |
| PATCH | `/api/productos/:id/stock` | Ajustar el stock por diferencia. |
| PATCH | `/api/productos/:id/activo` | Dar de baja o rehabilitar un producto. |
| DELETE | `/api/productos/:id` | Baja lógica del producto. |

**Alta (`POST /api/productos`)**

```json
{
  "nombre": "Placa de video RTX 5070",
  "descripcion": "12 GB GDDR7",
  "precio": 980000,
  "stock": 5,
  "img": "https://.../rtx5070.png",
  "categoria_id": "uuid-de-la-categoria"
}
```

`nombre`, `precio` y `stock` son obligatorios. `descripcion`, `img` y `categoria_id` son opcionales. El precio debe ser mayor a cero, el stock un entero mayor o igual a cero y la categoría debe existir.

**Modificación (`PUT /api/productos/:id`)**

Acepta los mismos campos que el alta, todos opcionales, y aplica solo los que se envían. El stock no se modifica por este endpoint: usar `PATCH /api/productos/:id/stock`.

**Ajuste de stock (`PATCH /api/productos/:id/stock`)**

```json
{ "cantidad": 10 }
```

La cantidad es una diferencia: positiva para un ingreso de mercadería y negativa para un ajuste por rotura o faltante. Se rechaza con `400` si el resultado quedaría en negativo. La operación se realiza dentro de una transacción.

**Baja lógica (`DELETE /api/productos/:id` y `PATCH /api/productos/:id/activo`)**

El registro nunca se borra de la base, porque los pedidos históricos y los ítems de carrito lo referencian. El `DELETE` marca `activo = false`; el `PATCH` permite enviar `{ "activo": true }` para rehabilitarlo.

### Categorías

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/categorias` | Obtener las categorías. |
| GET | `/api/categorias/:id` | Obtener una categoría por su identificador. |

#### Administración de categorías

Estos endpoints requieren un JWT cuyo usuario tenga el rol `ADMIN`.

| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/api/categorias` | Alta de categoría. |
| PUT | `/api/categorias/:id` | Modificación de la categoría. |
| DELETE | `/api/categorias/:id` | Baja de la categoría. |

**Alta (`POST /api/categorias`)**

```json
{
  "nombre": "Placas de video",
  "descripcion": "GPUs para gaming y diseño"
}
```

`nombre` es obligatorio (entre 3 y 100 caracteres) y `descripcion` es opcional. No se permiten dos categorías con el mismo nombre, sin distinguir mayúsculas: el intento devuelve `409`.

**Modificación (`PUT /api/categorias/:id`)**

Acepta los mismos campos, todos opcionales, y aplica solo los que se envían.

**Baja (`DELETE /api/categorias/:id`)**

La baja es física, pero solo se permite cuando la categoría no tiene ningún producto asociado. Si todavía los tiene, responde `409` indicando cuántos son:

```json
{
  "error": "No se puede eliminar: la categoría tiene 12 producto(s) asociado(s). Reasignalos a otra categoría antes de eliminarla.",
  "cantidad_productos": 12
}
```

El recuento incluye los productos dados de baja, porque la referencia en la base de datos existe de todos modos. Para liberar la categoría hay que reasignar esos productos con `PUT /api/productos/:id` (enviando otro `categoria_id`, o `null` para dejarlos sin categoría).

### Carrito

Estos endpoints requieren autenticación mediante JWT.

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/carrito` | Consultar el carrito del usuario autenticado. |
| POST | `/api/carrito/items` | Agregar un producto al carrito. |
| PUT | `/api/carrito/items/:itemId` | Modificar la cantidad de un producto. |
| DELETE | `/api/carrito/items/:itemId` | Eliminar un producto del carrito. |

### Pedidos

Estos endpoints requieren autenticación mediante JWT.

| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/api/pedidos` | Crear un pedido a partir del carrito. |
| GET | `/api/pedidos` | Consultar los pedidos del usuario autenticado. |
| GET | `/api/pedidos/:id` | Consultar un pedido específico. |

Al crear un pedido, el backend registra sus detalles, calcula el total, descuenta el stock correspondiente y vacía el carrito.

El pedido se genera inicialmente con estado `PENDIENTE`.

### Pagos

| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/api/pagos/crear-preferencia` | Crear una preferencia de pago de Mercado Pago. |
| POST | `/api/pagos/webhook` | Recibir y procesar notificaciones de Mercado Pago. |

La creación de preferencias requiere autenticación mediante JWT.

El endpoint de webhook es utilizado por Mercado Pago y no debe ser invocado directamente desde el frontend.

### Retorno despues del pago

La preferencia se crea con `back_urls` y `auto_return`, de modo que al terminar de pagar Mercado Pago devuelve al comprador a:

```text
<FRONTEND_URL>/pago/resultado
```

Las tres situaciones (`success`, `failure` y `pending`) apuntan a la misma pantalla. Mercado Pago agrega sus propios parametros a esa URL, entre ellos `external_reference` con el identificador del pedido. El frontend usa ese identificador para consultar `GET /api/pedidos/:id` y mostrar el estado real del pedido, sin confiar en los parametros de la URL, que el usuario puede modificar.

Como el webhook puede llegar unos segundos despues del retorno, la pantalla reintenta la consulta mientras el pedido siga en `PENDIENTE` y Mercado Pago haya informado el pago como aprobado.

## Autenticación

La API utiliza JSON Web Tokens (JWT) para proteger las operaciones que requieren un usuario autenticado.

Después de iniciar sesión mediante:

```http
POST /api/usuarios/login
```

El servidor devuelve un token que debe enviarse en las solicitudes protegidas mediante el encabezado:

```http
Authorization: Bearer TOKEN
```

El backend utiliza este token para identificar al usuario y restringir el acceso a sus recursos.

## Flujo de compra

El proceso de compra implementado sigue esta secuencia:

```text
Usuario
   |
   v
Iniciar sesión
   |
   v
Agregar productos al carrito
   |
   v
Crear pedido
   |
   v
Registrar detalles y descontar stock
   |
   v
Vaciar carrito
   |
   v
Crear preferencia de Mercado Pago
   |
   v
Realizar el pago
   |
   v
Mercado Pago envía notificación
   |
   v
Backend procesa el webhook
   |
   v
Actualizar estado del pago y del pedido
```

Los pagos se encuentran configurados para pruebas mediante las credenciales de prueba de Mercado Pago.

## Base de datos

La aplicación utiliza PostgreSQL alojado en Supabase.

Entre las entidades principales se encuentran:

- Usuarios.
- Productos.
- Categorías.
- Carritos.
- Ítems del carrito.
- Pedidos.
- Detalles de pedidos.
- Pagos.

Las relaciones entre estas entidades permiten gestionar el proceso de compra y mantener la información asociada a cada usuario.

## Pruebas realizadas

Se verificaron los principales endpoints mediante Postman, tanto durante el desarrollo local como desde la URL pública de Render.

Las pruebas realizadas incluyen:

- Registro e inicio de sesión.
- Autenticación mediante JWT.
- Acceso a rutas protegidas.
- Consulta, agregado, modificación y eliminación de productos del carrito.
- Creación y consulta de pedidos.
- Descuento de stock y vaciado del carrito.
- Creación de preferencias de pago.
- Recepción y procesamiento de notificaciones de Mercado Pago.
- Actualización del estado del pago y del pedido en Supabase.

## Estado del proyecto

El backend cuenta con las funcionalidades principales del proceso de compra y se encuentra preparado para su integración con el frontend.

La administración del catálogo se encuentra implementada y protegida por rol: alta, modificación, ajuste de stock y baja lógica de productos, y alta, modificación y baja de categorías.
