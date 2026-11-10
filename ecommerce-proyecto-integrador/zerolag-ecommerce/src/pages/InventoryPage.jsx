import { useState, useEffect } from "react";
import { Link } from "react-router";
import AdminSideBar from "../components/AdminSideBar";

/** Muestra y filtra el inventario de productos para administración. */
function InventoryPage() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 10;

  useEffect(() => {
    fetch("api/productos")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al obtener los productos");
        }
        return res.json();
      })
      .then((data) => {
        setProductos(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Filtra los productos por categoría.
  const productosFiltrados = productos.filter((product) => {
    if (!categoriaSeleccionada) return true;
    return (
      product.categoria_id === categoriaSeleccionada ||
      product.categorias?.id === categoriaSeleccionada
    );
  });

  // Calcula el valor del inventario filtrado.
  const valorTotalInventario = productosFiltrados.reduce((acc, product) => {
    const precio = Number(product.precio) || 0;
    const stock = Number(product.stock) || 0;
    return acc + precio * stock;
  }, 0);

  // Calcula los índices de la página actual.
  const totalPaginas =
    Math.ceil(productosFiltrados.length / productosPorPagina) || 1;
  const indiceUltimoProducto = paginaActual * productosPorPagina;
  const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
  const productosPaginados = productosFiltrados.slice(
    indicePrimerProducto,
    indiceUltimoProducto,
  );

  // Obtiene las categorías disponibles sin duplicados.
  const categoriasUnicas = Array.from(
    new Map(
      productos
        .filter((p) => p.categorias)
        .map((p) => [p.categorias.id, p.categorias]),
    ).values(),
  );

  // Renderiza los controles de paginación.
  const renderPaginacion = () => (
    <div className="p-space-md border-b border-surface-variant flex flex-col sm:flex-row items-center justify-between gap-space-sm bg-surface-container-low">
      <span className="font-body-sm text-body-sm text-secondary">
        Mostrando{" "}
        <strong className="text-on-surface">
          {productosFiltrados.length > 0 ? indicePrimerProducto + 1 : 0} -{" "}
          {Math.min(indiceUltimoProducto, productosFiltrados.length)}
        </strong>{" "}
        de{" "}
        <strong className="text-on-surface">{productosFiltrados.length}</strong>{" "}
        productos filtrados
      </span>
      <div className="flex items-center gap-1">
        <button
          onClick={() => setPaginaActual((prev) => Math.max(prev - 1, 1))}
          disabled={paginaActual === 1}
          className={`px-2.5 py-1 font-label-md text-label-md rounded border border-surface-variant ${
            paginaActual === 1
              ? "bg-surface-container text-secondary opacity-50 cursor-not-allowed"
              : "bg-surface-container hover:bg-surface-container-high text-on-surface"
          }`}
        >
          Anterior
        </button>
        <span className="px-3 py-1 font-label-md text-label-md text-on-surface">
          Página {paginaActual} de {totalPaginas}
        </span>
        <button
          onClick={() =>
            setPaginaActual((prev) => Math.min(prev + 1, totalPaginas))
          }
          disabled={paginaActual === totalPaginas || totalPaginas === 0}
          className={`px-2.5 py-1 font-label-md text-label-md rounded border border-surface-variant ${
            paginaActual === totalPaginas || totalPaginas === 0
              ? "bg-surface-container text-secondary opacity-50 cursor-not-allowed"
              : "bg-surface-container hover:bg-surface-container-high text-on-surface"
          }`}
        >
          Siguiente
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className="flex min-h-screen pt-[156px]">
        <AdminSideBar />
        <main className="flex-1 pl-64 w-full bg-surface min-h-[calc(100vh-156px)] p-space-xl">
          <div className="flex flex-col w-full">
            {/* Resumen del inventario */}
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-space-md mb-space-lg bg-surface-container-lowest p-space-lg border border-surface-variant rounded">
              <div className="flex flex-col">
                <div className="flex items-center gap-space-xs mb-1">
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">
                    Base de Datos Centralizada
                  </span>
                </div>
                <h1 className="font-headline-lg text-headline-lg text-on-surface uppercase tracking-tight">
                  Inventario de Hardware
                </h1>
                <p className="font-body-md text-body-md text-secondary">
                  Control de existencias físicas en Sucursal Belgrano y Depósito
                  Logístico Central.
                </p>
              </div>
            </div>

            {/* Filtros y valor total del inventario */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md mb-space-lg bg-surface-container-lowest p-space-md border border-surface-variant rounded">
              <div className="flex flex-wrap items-center gap-space-sm">
                <select
                  value={categoriaSeleccionada}
                  onChange={(e) => {
                    setCategoriaSeleccionada(e.target.value);
                    setPaginaActual(1); // Reinicia la paginación al cambiar el filtro.
                  }}
                  className="h-10 px-space-md bg-surface border border-surface-variant text-on-surface font-label-md text-label-md rounded focus:outline-none focus:border-primary"
                >
                  <option value="">Categoría: Todas</option>
                  {categoriasUnicas.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.nombre}
                    </option>
                  ))}
                </select>
                {categoriaSeleccionada && (
                  <button
                    onClick={() => {
                      setCategoriaSeleccionada("");
                      setPaginaActual(1);
                    }}
                    className="h-10 px-space-md bg-surface-container hover:bg-surface-container-high border border-surface-variant text-secondary font-label-md text-label-md rounded flex items-center gap-1 transition-colors"
                    type="button"
                  >
                    <span>Limpiar Filtro</span>
                  </button>
                )}
              </div>
              <div className="flex flex-col items-start lg:items-end">
                <span className="font-label-sm text-label-sm uppercase text-secondary">
                  Valor Total{" "}
                  {categoriaSeleccionada ? "de la Categoría" : "del Inventario"}
                </span>
                <span className="font-headline-md text-headline-md text-primary font-bold">
                  ${valorTotalInventario.toLocaleString("es-AR")} ARS
                </span>
              </div>
            </div>

            {/* Tabla de inventario y paginación */}
            <div className="flex flex-col bg-surface-container-lowest border border-surface-variant rounded">
              {/* Paginación superior */}
              {!loading &&
                !error &&
                productosFiltrados.length > 0 &&
                renderPaginacion()}

              {loading ? (
                <div className="p-space-xl text-center text-secondary font-body-md">
                  Cargando productos...
                </div>
              ) : error ? (
                <div className="p-space-xl text-center text-error font-body-md">
                  Error: {error}
                </div>
              ) : productosFiltrados.length === 0 ? (
                <div className="p-space-xl text-center text-secondary font-body-md">
                  No se encontraron productos en esta categoría.
                </div>
              ) : (
                <div className="overflow-x-auto w-full">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-surface-container-low border-b border-surface-variant text-secondary font-label-sm text-label-sm uppercase tracking-wider">
                        <th className="p-space-md">Producto</th>
                        <th className="p-space-md">Categoría</th>
                        <th className="p-space-md">Stock</th>
                        <th className="p-space-md">Precio Unitario</th>
                        <th className="p-space-md">Precio Total (Stock)</th>
                        <th className="p-space-md text-right">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-variant font-body-md text-body-md">
                      {productosPaginados.map((product) => {
                        const precioUnitario = Number(product.precio) || 0;
                        const stock = Number(product.stock) || 0;
                        const precioTotal = precioUnitario * stock;

                        return (
                          <tr
                            key={product.id}
                            className="hover:bg-surface-container-low transition-colors"
                          >
                            <td className="p-space-md">
                              <div className="flex items-center gap-space-md">
                                <div className="w-12 h-12 bg-surface border border-surface-variant rounded shrink-0 p-1 flex items-center justify-center">
                                  <img
                                    className="w-full h-full object-contain"
                                    src={product.img}
                                    alt={product.nombre}
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <span className="font-headline-sm text-label-lg text-on-surface font-bold leading-tight">
                                    {product.nombre}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className="p-space-md">
                              <span className="font-label-md text-label-md text-on-surface">
                                {product.categorias?.nombre || "Sin categoría"}
                              </span>
                            </td>
                            <td className="p-space-md">
                              <span className="font-body-md text-on-surface font-bold">
                                {stock} un.
                              </span>
                            </td>
                            <td className="p-space-md">
                              <span className="font-body-md text-on-surface font-bold">
                                ${precioUnitario.toLocaleString("es-AR")} ARS
                              </span>
                            </td>
                            <td className="p-space-md">
                              <span className="font-headline-sm text-label-lg text-primary font-bold leading-tight">
                                ${precioTotal.toLocaleString("es-AR")} ARS
                              </span>
                            </td>
                            <td className="p-space-md text-right">
                              <Link
                                to={`/product-details/${product.id}`}
                                className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md rounded transition-colors font-bold"
                              >
                                <span className="material-symbols-outlined text-[18px]">
                                  visibility
                                </span>
                                <span>Ver Detalles</span>
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Paginación inferior */}
              {!loading &&
                !error &&
                productosFiltrados.length > 0 &&
                renderPaginacion()}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default InventoryPage;
