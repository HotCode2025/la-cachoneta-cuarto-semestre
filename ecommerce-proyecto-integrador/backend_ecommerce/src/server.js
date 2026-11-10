import "dotenv/config";
import express from "express";

import productosRoutes from "./routes/productos.routes.js";
import categoriasRoutes from "./routes/categorias.routes.js";
import usuariosRoutes from "./routes/usuarios.routes.js";
import carritoRoutes from "./routes/carrito.routes.js";
import pedidosRoutes from "./routes/pedidos.routes.js";
import pagosRoutes from "./routes/pagos.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/productos", productosRoutes);
app.use("/api/categorias", categoriasRoutes);
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/carrito", carritoRoutes);
app.use("/api/pedidos", pedidosRoutes);
app.use("/api/pagos", pagosRoutes);

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});