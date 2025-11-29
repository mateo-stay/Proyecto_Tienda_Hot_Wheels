// src/pages/Producto.jsx
import React from "react";

export default function Producto({
  productos,
  loading,
  error,
  agregarAlCarrito,
}) {
  return (
    <main>
      <section id="bienvenida">
        <h2>Catálogo completo Hot Wheels</h2>
        <p className="p-text">
          Elige tus modelos favoritos y añádelos al carrito para completar tu colección.
        </p>
      </section>

      <section id="productos">
        <h2>Todos los modelos disponibles</h2>

        {loading && <p>Cargando productos...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && !error && (
          <div className="productos-container">
            {/* Si no hay productos */}
            {Array.isArray(productos) && productos.length === 0 && (
              <p>No hay productos registrados en la tienda.</p>
            )}

            {/* Listado de productos */}
            {Array.isArray(productos) &&
              productos.map((p) => {
                const precioFormateado = new Intl.NumberFormat("es-CL", {
                  style: "currency",
                  currency: "CLP",
                  minimumFractionDigits: 0,
                }).format(p.precio ?? 0);

                return (
                  <div className="card" key={p.id}>
                    <img src={p.imagen_url} alt={p.nombre} />
                    <h3>{p.nombre}</h3>
                    <p className="precio">{precioFormateado}</p>
                    <button
                      onClick={() => agregarAlCarrito(p.nombre, p.precio)}
                    >
                      Añadir al carrito
                    </button>
                  </div>
                );
              })}
          </div>
        )}
      </section>
    </main>
  );
}