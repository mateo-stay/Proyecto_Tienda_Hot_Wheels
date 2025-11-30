// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.scss";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "./layouts/Layout";
import Producto from "./pages/Producto";
import Carrito from "./pages/Carrito";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Blogs from "./pages/Blogs";
import Contacto from "./pages/Contacto";
import Nosotros from "./pages/Nosotros";
import Admin from "./pages/Admin";

import { getProductos } from "./services/api";
import { getCurrentUser } from "./services/auth";

// 👇 Ruta protegida solo para admin
function AdminRoute({ usuario, children }) {
  if (!usuario) {
    return <Navigate to="/login" replace />;
  }
  if (usuario.rol !== "admin") {
    return <Navigate to="/" replace />;
  }
  return children;
}

function App() {
  const [productos, setProductos] = useState([]);
  const [loadingProductos, setLoadingProductos] = useState(true);
  const [errorProductos, setErrorProductos] = useState(null);

  const [carrito, setCarrito] = useState([]);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) setUsuario(user);
  }, []);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await getProductos();
        setProductos(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error al cargar productos:", error);
        setErrorProductos("Ocurrió un error al cargar los productos.");
      } finally {
        setLoadingProductos(false);
      }
    };

    fetchProductos();
  }, []);

  const agregarAlCarrito = (nombre, precio) => {
    setCarrito((prev) => [
      ...prev,
      { id: Date.now(), nombre, precio },
    ]);
    toast.success(`${nombre} agregado al carrito`);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <Layout
              carrito={carrito}
              usuario={usuario}
              setUsuario={setUsuario}
            />
          }
        >
          <Route
            path="/"
            element={
              <Producto
                productos={productos}
                loading={loadingProductos}
                error={errorProductos}
                agregarAlCarrito={agregarAlCarrito}
              />
            }
          />

          <Route
            path="/producto"
            element={
              <Producto
                productos={productos}
                loading={loadingProductos}
                error={errorProductos}
                agregarAlCarrito={agregarAlCarrito}
              />
            }
          />

          <Route
            path="/carrito"
            element={<Carrito carrito={carrito} setCarrito={setCarrito} />}
          />

          <Route path="/login" element={<Login setUsuario={setUsuario} />} />
          <Route path="/registro" element={<Registro />} />

          <Route path="/blogs" element={<Blogs />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/nosotros" element={<Nosotros />} />

          {/* 👇 Ruta protegida solo admin */}
          <Route
            path="/admin"
            element={
              <AdminRoute usuario={usuario}>
                <Admin />
              </AdminRoute>
            }
          />
        </Route>
      </Routes>

      <ToastContainer position="top-center" autoClose={2000} />
    </BrowserRouter>
  );
}

export default App;
