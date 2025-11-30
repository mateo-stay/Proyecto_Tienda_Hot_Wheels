// src/pages/Contacto.jsx
import React from "react";

export default function Contacto() {
  return (
    <main className="login-page">
      <div className="login-card contact-card">
        <h2 className="login-title">Contacto</h2>
        <p className="login-subtitle">
          ¿Tienes dudas sobre pedidos, productos o tu colección Hot Wheels?
          Escríbenos y te responderemos a la brevedad (formulario solo demo).
        </p>

        <form className="contact-form">
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
            <textarea
              placeholder="Escribe tu mensaje aquí..."
              rows={4}
            />
          </label>

          <button
            type="submit"
            className="login-btn contact-btn"
            disabled
          >
            Enviar mensaje
          </button>
        </form>
      </div>
    </main>
  );
}
