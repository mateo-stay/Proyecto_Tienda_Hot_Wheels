import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const isTest = typeof process !== 'undefined' && process.env.NODE_ENV === 'test';

export default function Login({ setUsuario }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = isTest ? () => {} : useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuarioValido = usuarios.find(
      (u) => u.email === email && u.password === password
    );

    if (usuarioValido) {
      toast.success(`Bienvenido ${usuarioValido.nombre}`);
      setUsuario(usuarioValido);
      setEmail('');
      setPassword('');
      navigate('/');
    } else {
      toast.error('Email o contraseña incorrectos');
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
