// src/pages/Contacto.jsx
import React from "react";

export default function Contacto() {
  return (
    <main className="contact-page">
      <h2>Contacto</h2>
      <p className="p-text">
        ¿Tienes dudas sobre pedidos, productos o tu colección Hot Wheels?
        Escríbenos y te responderemos a la brevedad.
      </p>

      <form className="contact-form">
        <h3>Envíanos un mensaje</h3>

        <label>
          Nombre
          <input type="text" placeholder="Tu nombre" />
        </label>

        <label>
          Correo electrónico
          <input type="email" placeholder="tucorreo@ejemplo.com" />
        </label>

        <label>
          Mensaje
          <textarea placeholder="Escribe tu mensaje aquí..." rows={4} />
        </label>

        <button type="submit" disabled>
          Enviar
        </button>
      </form>
    </main>
  );
}
