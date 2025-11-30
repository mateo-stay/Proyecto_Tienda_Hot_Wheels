// src/pages/Registro.jsx
import React, { useState } from "react";
import { toast } from "react-toastify";
import { registrarUsuario } from "../services/api";

export default function Registro() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
  });

  const [cargando, setCargando] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validarEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleRegistro = async (e) => {
    e.preventDefault();

    const { nombre, email, password } = form;

    if (!nombre || !email || !password) {
      toast.error("Todos los campos son obligatorios");
      return;
    }

    if (!validarEmail(email)) {
      toast.error("Correo inválido");
      return;
    }

    try {
      setCargando(true);

      await registrarUsuario({ nombre, email, password });

      toast.success("Registro exitoso");
      setForm({ nombre: "", email: "", password: "" });
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Error al registrar usuario");
    } finally {
      setCargando(false);
    }
  };

  return (
    <main className="login-page">
      <div className="login-card">
        <h2 className="login-title">Crear cuenta</h2>
        <p className="login-subtitle">
          Regístrate para guardar tu usuario y seguir comprando tus Hot Wheels favoritos.
        </p>

        <form onSubmit={handleRegistro}>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
            disabled={cargando}
          />
          <input
            type="email"
            name="email"
            placeholder="Correo"
            value={form.email}
            onChange={handleChange}
            disabled={cargando}
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            disabled={cargando}
          />

          <button
            type="submit"
            className="login-btn"
            disabled={cargando}
          >
            {cargando ? "Registrando..." : "Registrarse"}
          </button>
        </form>

        <p className="login-extra">
          ¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a>
        </p>
      </div>
    </main>
  );
}
