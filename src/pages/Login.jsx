// src/pages/Login.jsx
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { signIn, clearAuth } from "../services/auth";

const isTest = typeof process !== "undefined" && process.env.NODE_ENV === "test";

export default function Login({ setUsuario }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cargando, setCargando] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setCargando(true);

      // signIn devuelve { token, usuario }
      const { usuario } = await signIn(email, password);

      toast.success(
        `Bienvenido, ${usuario.nombre} 👋`
      );

      if (typeof setUsuario === "function") {
        setUsuario(usuario);
      }

      setEmail("");
      setPassword("");

      if (!isTest) {
        // 👇 Redirección según rol
        if (usuario.rol === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      console.error(err);
      clearAuth();
      toast.error(err.message || "Email o contraseña incorrectos");
    } finally {
      setCargando(false);
    }
  };

  return (
    <main className="login-page">
      <div className="login-card">
        <h2 className="login-title">Inicio de sesión</h2>
        <p className="login-subtitle">
          Ingresa con tu cuenta para seguir armando tu colección Hot Wheels.
        </p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={cargando}
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={cargando}
          />

          <button type="submit" className="login-btn" disabled={cargando}>
            {cargando ? "Ingresando..." : "Iniciar sesión"}
          </button>
        </form>

        <p className="login-extra">
          ¿No tienes cuenta aún? <a href="/registro">Regístrate aquí</a>
        </p>
      </div>
    </main>
  );
}
