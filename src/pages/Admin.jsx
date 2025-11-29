// src/pages/Admin.jsx
import React, { useEffect, useState } from "react";
import { getProductos, deleteProducto } from "../services/api";
import { toast } from "react-toastify";

export default function Admin() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const cargarProductos = async () => {
    try {
      setCargando(true);
      setError("");

      const data = await getProductos();
      setProductos(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar los productos");
      setProductos([]);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este producto?")) return;

    try {
      await deleteProducto(id);
      toast.success("Producto eliminado correctamente");
      setProductos((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      toast.error("Error al eliminar el producto");
    }
  };

  const formatearPrecio = (valor) =>
    new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(valor ?? 0);

  return (
    <div className="admin-container">
      {/* Sidebar roja que ya está estilizada en tu SCSS */}
      <aside className="sidebar">
        <h2>Panel de administración</h2>
        <ul>
          <li>
            <a href="#">Productos</a>
          </li>
          <li>
            <a href="#">Órdenes (próximamente)</a>
          </li>
          <li>
            <a href="#">Usuarios (próximamente)</a>
          </li>
        </ul>
      </aside>

      {/* Contenido principal */}
      <main className="admin-content">
        <h2>Gestión de productos</h2>
        <p>Revisa, administra y elimina productos de la tienda.</p>

        {cargando && <p>Cargando productos...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!cargando && !error && productos.length === 0 && (
          <p>No hay productos registrados.</p>
        )}

        {!cargando && !error && productos.length > 0 && (
          <div className="admin-table-wrapper">
            <table className="tabla-admin">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Categoría</th>
                  <th>Imagen</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((p) => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.nombre}</td>
                    <td>{formatearPrecio(p.precio)}</td>
                    <td>{p.stock}</td>
                    <td>{p.categoria}</td>
                    <td>
                      {p.imagen_url ? (
                        <img
                          src={p.imagen_url}
                          alt={p.nombre}
                          className="admin-img"
                        />
                      ) : (
                        <span>Sin imagen</span>
                      )}
                    </td>
                    <td>
                      <button
                        className="btn-admin-eliminar"
                        onClick={() => handleEliminar(p.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
