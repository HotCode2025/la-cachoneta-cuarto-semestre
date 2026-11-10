/* eslint-disable */

import { Routes, Route } from "react-router";
import { useEffect, useState } from "react";
import axiosAuth from "./api/axiosAuth.js";

/* Rutas protegidas */
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import PublicRoute from "./components/PublicRoute.jsx";

/* Páginas y componentes */
import HomePage from "./pages/HomePage.jsx";
import CartPage from "./pages/CartPage.jsx";
import MyAccountPage from "./pages/MyAccountPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import AboutUsPage from "./pages/AboutUsPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ProductDetailsPage from "./pages/ProductDetailsPage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import InventoryPage from "./pages/InventoryPage.jsx";

/** Renderiza las rutas y coordina el estado compartido del carrito. */
function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [loadingCart, setLoadingCart] = useState(false);
  const [hideHeaderFooter, setHideHeaderFooter] = useState(false);

  /** Carga el carrito del usuario autenticado. */
  const loadCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setCart([]);
      return;
    }

    try {
      setLoadingCart(true);
      const response = await axiosAuth.get(`/api/carrito`);
      setCart(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setCart([]);
      } else {
        console.error("Error al cargar el carrito:", error);
      }
    } finally {
      setLoadingCart(false);
    }
  };

  /** Agrega un producto al carrito y actualiza su estado. */
  const handleAddToCart = async (producto_id) => {
    try {
      await axiosAuth.post("/api/carrito/items", {
        producto_id,
        cantidad: 1,
      });

      console.log("Se ha agregado un producto al carrito con exito!");
      await loadCart();
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
      throw error; // Propaga el error para que el componente solicitante pueda gestionarlo.
    }
  };

  useEffect(() => {
    // Carga inicial del carrito.
    loadCart();

    // Actualiza el carrito después de iniciar sesión.
    const handleLoginEvent = () => {
      loadCart();
    };

    window.addEventListener("user-logged-in", handleLoginEvent);

    // Retira el listener al desmontar el componente.
    return () => {
      window.removeEventListener("user-logged-in", handleLoginEvent);
    };
  }, []);

  return (
    <>
      {!hideHeaderFooter && (
        <Header
          cart={cart}
          searchTerm={searchTerm}
          loadingCart={loadingCart}
          setSearchTerm={setSearchTerm}
        />
      )}

      <Routes>
        {/* Rutas públicas */}
        <Route
          index
          element={
            <HomePage
              cart={cart}
              loadCart={loadCart}
              handleAddToCart={handleAddToCart}
            />
          }
        />
        <Route
          path="product-details/:productId"
          element={<ProductDetailsPage handleAddToCart={handleAddToCart} />}
        />
        <Route
          path="search"
          element={
            <SearchPage
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              handleAddToCart={handleAddToCart}
            />
          }
        />
        <Route path="about-us" element={<AboutUsPage />} />
        <Route path="*" element={<NotFoundPage />} />

        {/* Rutas para usuarios no autenticados */}
        <Route element={<PublicRoute />}>
          <Route path="login" element={<LoginPage />} />
        </Route>

        {/* Rutas para usuarios autenticados */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="checkout"
            element={<CartPage cart={cart} loadCart={loadCart} />}
          />
          <Route path="orders" element={<MyAccountPage />} />
        </Route>

        {/* Rutas de administración */}
        <Route element={<AdminRoute />}>
          <Route path="inventory" element={<InventoryPage />}></Route>
        </Route>
      </Routes>

      {!hideHeaderFooter && <Footer />}
    </>
  );
}

export default App;
