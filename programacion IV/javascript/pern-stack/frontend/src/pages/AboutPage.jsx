import React from "react";

function AboutPage() {
  return (
    <div>
      <h1 className="text-center font-bold py-4 px-3 text-4xl">
        Tecnologías Utilizadas
      </h1>
      <div className="flex text-black flex-wrap justify-center gap-4">
        <div className="bg-gray-100 p-4 rounded shadow-md w-64">
          <h2 className="text-xl font-semibold mb-2">PostgreSQL</h2>
          <p>
            PostgreSQL es un sistema de gestión de bases de datos relacional de
            código abierto. Es conocido por su robustez, escalabilidad y soporte
            para características avanzadas como transacciones, integridad
            referencial y extensibilidad.
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded shadow-md w-64">
          <h2 className="text-xl font-semibold mb-2">Express</h2>
          <p>
            Express es un framework web para Node.js que facilita la creación de
            aplicaciones web y APIs. Proporciona una estructura mínima y
            flexible, permitiendo a los desarrolladores manejar rutas,
            solicitudes HTTP y middleware de manera eficiente.
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded shadow-md w-64">
          <h2 className="text-xl font-semibold mb-2">React</h2>
          <p>
            React es una biblioteca de JavaScript para construir interfaces de
            usuario. Es ampliamente utilizado para crear aplicaciones web
            modernas y dinámicas, ofreciendo un enfoque basado en componentes
            que facilita la reutilización del código y la gestión del estado.
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded shadow-md w-64">
          <h2 className="text-xl font-semibold mb-2">Node.js</h2>
          <p>
            Node.js es un entorno de ejecución de JavaScript del lado del
            servidor. Permite a los desarrolladores ejecutar código JavaScript
            fuera del navegador, facilitando la creación de aplicaciones web
            escalables y de alto rendimiento.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
