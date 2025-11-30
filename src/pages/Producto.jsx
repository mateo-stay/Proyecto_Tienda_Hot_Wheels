// src/pages/Producto.jsx
import React from "react";

export default function Producto({
  productos,
  loading,
  error,
  agregarAlCarrito,
}) {
  const cantidad = Array.isArray(productos) ? productos.length : 0;

  return (
    <main className="productos-page">
      <div className="productos-card productos-card">
        {/* Header de catálogo */}
        <section id="bienvenida">
          <h2 className="login-title">Catálogo completo Hot Wheels</h2>
          <p className="login-subtitle">
            Elige tus modelos favoritos y añádelos al carrito para completar tu
            colección.
          </p>
        </section>

        {/* Resumen de productos */}
        <section id="productos">
          <div className="productos-header">
            <h3>Todos los modelos disponibles</h3>

            <p className="productos-resumen">
              {loading
                ? "Cargando catálogo..."
                : cantidad === 0
                ? "Por ahora no hay modelos registrados."
                : `${cantidad} modelo${cantidad > 1 ? "s" : ""} disponibles`}
            </p>
          </div>

          {loading && <p>Cargando productos...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}

          {!loading && !error && (
            <div className="productos-container">
              {/* Si no hay productos */}
              {cantidad === 0 && (
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
                    <div className="card producto-card" key={p.id}>
                      <div className="producto-img-wrapper">
                        <img src={p.imagen_url} alt={p.nombre} />
                      </div>

                      {p.categoria && (
                        <p className="producto-categoria">{p.categoria}</p>
                      )}

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
      </div>
    </main>
  );
}
