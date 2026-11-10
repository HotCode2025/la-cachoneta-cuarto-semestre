import { Link } from "react-router-dom";
import { Card } from "../components/ui";

function NotFound() {
  return (
    <div className="h-[calc(100vh-64px)] flex items-center justify-center">
      <Card>
        <h1 className="text-2xl font-bold mb-4">404 - Página no encontrada</h1>
        <p className="mb-4">
          La página que estás buscando no existe. Por favor, verifica la URL o
          regresa a la página principal.
        </p>
        <Link to="/" className="text-blue-500 hover:underline">
          Volver a la página principal
        </Link>
      </Card>
    </div>
  );
}

export default NotFound;
