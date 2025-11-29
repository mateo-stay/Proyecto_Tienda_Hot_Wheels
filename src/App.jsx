// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Layout principal
import Layout from "./layouts/Layout";

// Páginas
import Producto from "./pages/Producto";
import Carrito from "./pages/Carrito";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Blogs from "./pages/Blogs";
import Contacto from "./pages/Contacto";
import Nosotros from "./pages/Nosotros";
import Admin from "./pages/Admin";

// Servicio para traer los productos desde el backend
import { getProductos } from "./services/api";

function App() {
  const [productos, setProductos] = useState([]);
  const [loadingProductos, setLoadingProductos] = useState(true);
  const [errorProductos, setErrorProductos] = useState(null);

  const [carrito, setCarrito] = useState([]);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await getProductos();
        setProductos(data); // ajusta si tu API devuelve otra estructura
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
      {
        id: Date.now(),
        nombre,
        precio,
      },
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
          {/* Productos en "/" */}
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

          {/* Misma vista en /producto (opcional) */}
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

          {/* Carrito */}
          <Route
            path="/carrito"
            element={
              <Carrito carrito={carrito} setCarrito={setCarrito} />
            }
          />

          {/* Login y registro */}
          <Route path="/login" element={<Login setUsuario={setUsuario} />} />
          <Route path="/registro" element={<Registro />} />

          {/* Otras páginas */}
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/nosotros" element={<Nosotros />} />

          {/* Admin (simple, sin protección por ahora) */}
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>

      <ToastContainer position="top-center" autoClose={2000} />
    </BrowserRouter>
  );
}

export default App;
