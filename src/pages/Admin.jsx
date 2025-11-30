// src/pages/Admin.jsx
import React, { useEffect, useState } from "react";
import {
  getProductos,
  deleteProducto,
  createProducto,
  updateProducto,
  getUsuarios,
  deleteUsuario,
  updateUsuario,
} from "../services/api";
import { toast } from "react-toastify";

const estadoInicialFormProducto = {
  id: null,
  nombre: "",
  descripcion: "",
  precio: "",
  stock: "",
  categoria: "",
  imagen_url: "",
};

const estadoInicialFormUsuario = {
  id: null,
  nombre: "",
  email: "",
  rol: "cliente",
  password: "",
};

export default function Admin() {
  // ====== Productos ======
  const [productos, setProductos] = useState([]);
  const [cargandoProductos, setCargandoProductos] = useState(false);
  const [errorProductos, setErrorProductos] = useState("");

  const [formProducto, setFormProducto] = useState(estadoInicialFormProducto);
  const [guardandoProducto, setGuardandoProducto] = useState(false);
  const [modoEditarProducto, setModoEditarProducto] = useState(false);

  // ====== Usuarios ======
  const [usuarios, setUsuarios] = useState([]);
  const [cargandoUsuarios, setCargandoUsuarios] = useState(false);
  const [errorUsuarios, setErrorUsuarios] = useState("");

  const [formUsuario, setFormUsuario] = useState(estadoInicialFormUsuario);
  const [guardandoUsuario, setGuardandoUsuario] = useState(false);
  const [modoEditarUsuario, setModoEditarUsuario] = useState(false);

  // pestaña activa: "productos" | "usuarios"
  const [tabActiva, setTabActiva] = useState("productos");

  // =========================
  // Cargar productos
  // =========================
  const cargarProductos = async () => {
    try {
      setCargandoProductos(true);
      setErrorProductos("");

      const data = await getProductos();
      setProductos(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setErrorProductos("No se pudieron cargar los productos");
      setProductos([]);
    } finally {
      setCargandoProductos(false);
    }
  };

  // =========================
  // Cargar usuarios
  // =========================
  const cargarUsuarios = async () => {
    try {
      setCargandoUsuarios(true);
      setErrorUsuarios("");

      const data = await getUsuarios(); // GET /api/usuarios (solo admin)
      setUsuarios(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setErrorUsuarios("No se pudieron cargar los usuarios");
      setUsuarios([]);
    } finally {
      setCargandoUsuarios(false);
    }
  };

  useEffect(() => {
    if (tabActiva === "productos") {
      cargarProductos();
    } else if (tabActiva === "usuarios") {
      cargarUsuarios();
    }
  }, [tabActiva]);

  // =========================
  // Formulario Productos
  // =========================
  const handleChangeProducto = (e) => {
    const { name, value } = e.target;

    setFormProducto((prev) => ({
      ...prev,
      [name]:
        name === "precio" || name === "stock"
          ? value.replace(/[^\d]/g, "") // solo números
          : value,
    }));
  };

  const resetFormularioProducto = () => {
    setFormProducto(estadoInicialFormProducto);
    setModoEditarProducto(false);
  };

  const validarFormProducto = () => {
    if (!formProducto.nombre || !formProducto.precio || !formProducto.stock) {
      toast.error("Nombre, precio y stock son obligatorios");
      return false;
    }

    if (Number(formProducto.precio) <= 0) {
      toast.error("El precio debe ser mayor a 0");
      return false;
    }

    if (Number(formProducto.stock) < 0) {
      toast.error("El stock no puede ser negativo");
      return false;
    }

    return true;
  };

  const handleSubmitProducto = async (e) => {
    e.preventDefault();
    if (!validarFormProducto()) return;

    const payload = {
      nombre: formProducto.nombre,
      descripcion: formProducto.descripcion || "",
      precio: Number(formProducto.precio),
      stock: Number(formProducto.stock),
      categoria: formProducto.categoria || "",
      imagen_url: formProducto.imagen_url || "",
    };

    try {
      setGuardandoProducto(true);

      if (modoEditarProducto && formProducto.id != null) {
        const actualizado = await updateProducto(formProducto.id, payload);
        setProductos((prev) =>
          prev.map((p) => (p.id === formProducto.id ? actualizado : p))
        );
        toast.success("Producto actualizado correctamente");
      } else {
        const creado = await createProducto(payload);
        setProductos((prev) => [...prev, creado]);
        toast.success("Producto creado correctamente");
      }

      resetFormularioProducto();
    } catch (err) {
      console.error(err);
      toast.error("Error al guardar el producto");
    } finally {
      setGuardandoProducto(false);
    }
  };

  const handleEditarProducto = (producto) => {
    setModoEditarProducto(true);
    setFormProducto({
      id: producto.id,
      nombre: producto.nombre ?? "",
      descripcion: producto.descripcion ?? "",
      precio: producto.precio ?? "",
      stock: producto.stock ?? "",
      categoria: producto.categoria ?? "",
      imagen_url: producto.imagen_url ?? "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEliminarProducto = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este producto?")) return;

    try {
      await deleteProducto(id);
      toast.success("Producto eliminado correctamente");
      setProductos((prev) => prev.filter((p) => p.id !== id));

      if (modoEditarProducto && formProducto.id === id) {
        resetFormularioProducto();
      }
    } catch (err) {
      console.error(err);
      toast.error("Error al eliminar el producto");
    }
  };

  // =========================
  // Formulario Usuarios
  // =========================
  const handleChangeUsuario = (e) => {
    const { name, value } = e.target;

    setFormUsuario((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetFormularioUsuario = () => {
    setFormUsuario(estadoInicialFormUsuario);
    setModoEditarUsuario(false);
  };

  const validarFormUsuario = () => {
    if (!formUsuario.nombre || !formUsuario.email) {
      toast.error("Nombre y email son obligatorios");
      return false;
    }

    if (!["admin", "cliente"].includes(formUsuario.rol)) {
      toast.error("El rol debe ser admin o cliente");
      return false;
    }

    return true;
  };

  const handleSubmitUsuario = async (e) => {
    e.preventDefault();
    if (!validarFormUsuario()) return;
    if (formUsuario.id == null) {
      toast.error("No hay usuario seleccionado para editar");
      return;
    }

    const payload = {
      nombre: formUsuario.nombre,
      email: formUsuario.email,
      rol: formUsuario.rol,
    };

    // Si escribió una nueva contraseña, la mandamos
    if (formUsuario.password) {
      payload.password = formUsuario.password;
    }

    try {
      setGuardandoUsuario(true);

      const actualizado = await updateUsuario(formUsuario.id, payload);
      setUsuarios((prev) =>
        prev.map((u) => (u.id === formUsuario.id ? actualizado : u))
      );

      toast.success("Usuario actualizado correctamente");
      resetFormularioUsuario();
    } catch (err) {
      console.error(err);
      toast.error("Error al actualizar el usuario");
    } finally {
      setGuardandoUsuario(false);
    }
  };

  const handleEditarUsuario = (usuario) => {
    setModoEditarUsuario(true);
    setFormUsuario({
      id: usuario.id,
      nombre: usuario.nombre ?? "",
      email: usuario.email ?? "",
      rol: usuario.rol ?? "cliente",
      password: "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEliminarUsuario = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este usuario?")) return;

    try {
      await deleteUsuario(id);
      toast.success("Usuario eliminado correctamente");
      setUsuarios((prev) => prev.filter((u) => u.id !== id));

      if (modoEditarUsuario && formUsuario.id === id) {
        resetFormularioUsuario();
      }
    } catch (err) {
      console.error(err);
      toast.error("Error al eliminar el usuario");
    }
  };

  // =========================
  // Utils
  // =========================
  const formatearPrecio = (valor) =>
    new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(valor ?? 0);

  // =========================
  // Render secciones por tab
  // =========================
  const renderContenido = () => {
    // -------- Productos --------
    if (tabActiva === "productos") {
      return (
        <>
          {/* FORMULARIO PRODUCTO */}
          <section className="admin-card">
            <h3 className="admin-card-title">
              {modoEditarProducto ? "Editar producto" : "Crear nuevo producto"}
            </h3>
            <p className="admin-card-subtitle">
              Completa los datos del producto que quieres{" "}
              {modoEditarProducto ? "modificar" : "agregar"} al catálogo.
            </p>

            <form onSubmit={handleSubmitProducto}>
              <label>
                Nombre
                <input
                  type="text"
                  name="nombre"
                  value={formProducto.nombre}
                  onChange={handleChangeProducto}
                  disabled={guardandoProducto}
                  placeholder="Hot Wheels Nissan Skyline GT-R"
                />
              </label>

              <label>
                Descripción
                <textarea
                  name="descripcion"
                  value={formProducto.descripcion}
                  onChange={handleChangeProducto}
                  disabled={guardandoProducto}
                  placeholder="Edición especial, detalles premium, etc."
                />
              </label>

              <label>
                Precio (CLP)
                <input
                  type="text"
                  name="precio"
                  value={formProducto.precio}
                  onChange={handleChangeProducto}
                  disabled={guardandoProducto}
                  placeholder="2990"
                />
              </label>

              <label>
                Stock
                <input
                  type="text"
                  name="stock"
                  value={formProducto.stock}
                  onChange={handleChangeProducto}
                  disabled={guardandoProducto}
                  placeholder="10"
                />
              </label>

              <label>
                Categoría
                <input
                  type="text"
                  name="categoria"
                  value={formProducto.categoria}
                  onChange={handleChangeProducto}
                  disabled={guardandoProducto}
                  placeholder="Básico, Premium, Coleccionista..."
                />
              </label>

              <label>
                URL de imagen
                <input
                  type="text"
                  name="imagen_url"
                  value={formProducto.imagen_url}
                  onChange={handleChangeProducto}
                  disabled={guardandoProducto}
                  placeholder="/img/skyline_gtr.jpg o URL completa"
                />
              </label>

              <div className="admin-form-actions">
                <button type="submit" disabled={guardandoProducto}>
                  {guardandoProducto
                    ? modoEditarProducto
                      ? "Guardando cambios..."
                      : "Creando..."
                    : modoEditarProducto
                    ? "Guardar cambios"
                    : "Crear producto"}
                </button>

                {modoEditarProducto && (
                  <button
                    type="button"
                    className="btn-cerrar"
                    onClick={resetFormularioProducto}
                    disabled={guardandoProducto}
                  >
                    Cancelar edición
                  </button>
                )}
              </div>
            </form>
          </section>

          {/* TABLA PRODUCTOS */}
          <section className="admin-card">
            <h3 className="admin-card-title">Listado de productos</h3>
            <p className="admin-card-subtitle">
              Total: {productos.length} producto
              {productos.length !== 1 ? "s" : ""} registrados.
            </p>

            {cargandoProductos && <p>Cargando productos...</p>}
            {errorProductos && (
              <p style={{ color: "red" }}>{errorProductos}</p>
            )}

            {!cargandoProductos && !errorProductos && productos.length === 0 && (
              <p>No hay productos registrados.</p>
            )}

            {!cargandoProductos && !errorProductos && productos.length > 0 && (
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
                            className="btn-admin-editar"
                            onClick={() => handleEditarProducto(p)}
                          >
                            Editar
                          </button>
                          <button
                            className="btn-admin-eliminar"
                            onClick={() => handleEliminarProducto(p.id)}
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
          </section>
        </>
      );
    }

    // -------- Usuarios --------
    if (tabActiva === "usuarios") {
      return (
        <>
          {/* FORMULARIO USUARIO */}
          <section className="admin-card">
            <h3 className="admin-card-title">
              {modoEditarUsuario
                ? "Editar usuario"
                : "Selecciona un usuario para editar"}
            </h3>
            <p className="admin-card-subtitle">
              Puedes modificar nombre, correo, rol y, opcionalmente,
              asignar una nueva contraseña.
            </p>

            <form onSubmit={handleSubmitUsuario}>
              <label>
                Nombre
                <input
                  type="text"
                  name="nombre"
                  value={formUsuario.nombre}
                  onChange={handleChangeUsuario}
                  disabled={guardandoUsuario || !modoEditarUsuario}
                  placeholder="Nombre del usuario"
                />
              </label>

              <label>
                Correo electrónico
                <input
                  type="email"
                  name="email"
                  value={formUsuario.email}
                  onChange={handleChangeUsuario}
                  disabled={guardandoUsuario || !modoEditarUsuario}
                  placeholder="correo@ejemplo.com"
                />
              </label>

              <label>
                Rol
                <select
                  name="rol"
                  value={formUsuario.rol}
                  onChange={handleChangeUsuario}
                  disabled={guardandoUsuario || !modoEditarUsuario}
                >
                  <option value="cliente">Cliente</option>
                  <option value="admin">Admin</option>
                </select>
              </label>

              <label>
                Nueva contraseña (opcional)
                <input
                  type="password"
                  name="password"
                  value={formUsuario.password}
                  onChange={handleChangeUsuario}
                  disabled={guardandoUsuario || !modoEditarUsuario}
                  placeholder="Deja en blanco para no cambiar"
                />
              </label>

              <div className="admin-form-actions">
                <button
                  type="submit"
                  disabled={guardandoUsuario || !modoEditarUsuario}
                >
                  {guardandoUsuario
                    ? "Guardando..."
                    : "Guardar cambios de usuario"}
                </button>

                {modoEditarUsuario && (
                  <button
                    type="button"
                    className="btn-cerrar"
                    onClick={resetFormularioUsuario}
                    disabled={guardandoUsuario}
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </section>

          {/* TABLA USUARIOS */}
          <section className="admin-card">
            <h3 className="admin-card-title">Usuarios registrados</h3>
            <p className="admin-card-subtitle">
              Haz clic en "Editar" para cargar los datos en el formulario.
            </p>

            {cargandoUsuarios && <p>Cargando usuarios...</p>}
            {errorUsuarios && (
              <p style={{ color: "red" }}>{errorUsuarios}</p>
            )}

            {!cargandoUsuarios && !errorUsuarios && usuarios.length === 0 && (
              <p>No hay usuarios registrados.</p>
            )}

            {!cargandoUsuarios && !errorUsuarios && usuarios.length > 0 && (
              <div className="admin-table-wrapper">
                <table className="tabla-admin">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Email</th>
                      <th>Rol</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usuarios.map((u) => (
                      <tr key={u.id}>
                        <td>{u.id}</td>
                        <td>{u.nombre}</td>
                        <td>{u.email}</td>
                        <td>{u.rol}</td>
                        <td>
                          <button
                            className="btn-admin-editar"
                            onClick={() => handleEditarUsuario(u)}
                          >
                            Editar
                          </button>
                          <button
                            className="btn-admin-eliminar"
                            onClick={() => handleEliminarUsuario(u.id)}
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
          </section>
        </>
      );
    }

    return null;
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="sidebar-title">Admin Hot Wheels</h2>
        <ul className="sidebar-menu">
          <li>
            <button
              type="button"
              className={`sidebar-link ${
                tabActiva === "productos" ? "active" : ""
              }`}
              onClick={() => setTabActiva("productos")}
            >
              Productos
            </button>
          </li>
          <li>
            <button
              type="button"
              className={`sidebar-link ${
                tabActiva === "usuarios" ? "active" : ""
              }`}
              onClick={() => setTabActiva("usuarios")}
            >
              Usuarios
            </button>
          </li>
        </ul>
      </aside>

      {/* Contenido principal dinámico */}
      <main className="admin-content">
        <h2>Panel de administración</h2>
        <p style={{ marginBottom: "16px", color: "#555", fontSize: "0.95rem" }}>
          Gestiona el catálogo y administra las cuentas de la tienda.
        </p>

        {renderContenido()}
      </main>
    </div>
  );
}
