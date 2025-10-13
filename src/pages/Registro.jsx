import React, { useState } from 'react';
import { toast } from 'react-toastify';

export default function Registro() {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validarEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleRegistro = (e) => {
    e.preventDefault();

    const { nombre, email, password } = form;

    if (!nombre || !email || !password) {
      toast.error('Todos los campos son obligatorios');
      return;
    }

    if (!validarEmail(email)) {
      toast.error('Correo inválido');
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    if (usuarios.some((u) => u.email === email)) {
      toast.error('Este correo ya está registrado');
      return;
    }

    const nuevoUsuario = { nombre, email, password };
    localStorage.setItem('usuarios', JSON.stringify([...usuarios, nuevoUsuario]));

    toast.success('Registro exitoso');

    setForm({ nombre: '', email: '', password: '' });
  };

  return (
    <main className="registro-page">
      <h2>Registro</h2>
      <form onSubmit={handleRegistro}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Correo"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
        />
        <button type="submit">Registrarse</button>
      </form>
    </main>
  );
}