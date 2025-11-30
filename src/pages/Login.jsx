// src/pages/Login.jsx
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { signIn, clearAuth } from "../services/auth";

const isTest = typeof process !== "undefined" && process.env.NODE_ENV === "test";

export default function Login({ setUsuario }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { usuario } = await signIn(email, password);

      toast.success("Bienvenido 👋");

      if (typeof setUsuario === "function") {
        setUsuario(usuario);
      }

      setEmail("");
      setPassword("");

      if (!isTest) navigate("/");
    } catch (err) {
      console.error(err);
      clearAuth();
      toast.error("Email o contraseña incorrectos");
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
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="login-btn">
            Iniciar sesión
          </button>
        </form>

        <p className="login-extra">
          ¿No tienes cuenta aún? <a href="/registro">Regístrate aquí</a>
        </p>
      </div>
    </main>
  );
}
