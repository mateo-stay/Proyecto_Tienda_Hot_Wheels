// src/pages/Login.jsx
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { signIn, clearAuth } from "../services/auth";

const isTest = typeof process !== "undefined" && process.env.NODE_ENV === "test";

export default function Login({ setUsuario = () => {} }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // llama a la API, guarda token y usuario en localStorage
      const { usuario } = await signIn(email, password);

      toast.success("Bienvenido 👋");

      if (typeof setUsuario === "function") {
        // usuario = { email, rol }
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
      <h2>Inicio de sesión</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Iniciar sesión</button>
      </form>
    </main>
  );
}
