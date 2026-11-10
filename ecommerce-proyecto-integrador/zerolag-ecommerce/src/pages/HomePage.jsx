import axios from "axios";
import { useEffect, useState } from "react";
import BuildYourPCBanner from "./home/BuildYourPCBanner.jsx";
import FlashOffersAndFeatured from "./home/FlashOffersAndFeatured.jsx";
import HardwareCategoriesBanner from "./home/HardwareCategoriesBanner.jsx";
import HeroBannerMain from "./home/HeroBannerMain.jsx";
import LocalBenefits from "./home/LocalBenefits.jsx";
import MonthlyAssemblies from "./home/MonthlyAssemblies.jsx";

/** Muestra la página de inicio y carga los productos destacados. */
function HomePage({ loadCart, handleAddToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getHomeData = async () => {
      try {
        const response = await axios.get(`/api/productos`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error al cargar los productos:", error);
      } finally {
        setLoading(false);
      }
    };

    getHomeData();
  }, []);

  return (
    <>
      <link rel="icon" type="image/svg+xml" href="/home-favicon.svg" />
      <title>ZeroLag</title>

      <main className="w-full pt-[156px] bg-surface min-h-[calc(100vh-156px)]">
        <div className="flex flex-col w-full">
          {/* Banner principal */}
          <HeroBannerMain />

          {/* Beneficios locales */}
          <LocalBenefits />

          {/* Categorías de hardware */}
          <HardwareCategoriesBanner />

          {/* Ensamblados destacados */}
          <MonthlyAssemblies />

          {/* Ofertas relámpago y productos destacados */}
          <FlashOffersAndFeatured
            products={products}
            loadCart={loadCart}
            handleAddToCart={handleAddToCart}
            loading={loading}
          />

          {/* Configurador de PC */}
          <BuildYourPCBanner />
        </div>
      </main>
    </>
  );
}

export default HomePage;
