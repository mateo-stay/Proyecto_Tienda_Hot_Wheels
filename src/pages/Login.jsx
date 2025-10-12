import React, { useState } from "react";
import { toast } from "react-toastify";
import { signIn } from "../services/auth";

function Login({ setUsuario }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setCargando(true);

    try {
      const usuario = await signIn(email, password);
      toast.success(`Bienvenido ${usuario.nombre}`);
      setUsuario(usuario);
      setEmail("");
      setPassword("");
    } catch (error) {
      toast.error("Email o contraseña incorrectos");
    } finally {
      setCargando(false);
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
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={cargando}>
          {cargando ? "Ingresando..." : "Iniciar sesión"}
        </button>
      </form>
    </main>
  );
}

export default Login;
