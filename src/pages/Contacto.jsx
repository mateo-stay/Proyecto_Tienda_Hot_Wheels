// src/pages/Contacto.jsx
import React from "react";

export default function Contacto() {
  return (
    <main>
      <h2>Contacto</h2>
      <p className="p-text">
        ¿Tienes dudas sobre pedidos, productos o tu colección Hot Wheels?
        Déjanos tu mensaje y te responderemos a la brevedad.
      </p>

      <section className="productos-container contact-section">
        {/* Tarjeta con info de contacto */}
        <article className="card contact-card">
          <h3>Datos de la tienda</h3>
          <p>
            Esta es una tienda demo de Hot Wheels para el proyecto de DuocUC.
            Aquí puedes simular la información real de tu negocio.
          </p>

          <p>
            <strong>📍 Dirección</strong>
            Mall Plaza Vespucio – Sector coleccionistas (referencial).
          </p>

          <p>
            <strong>✉ Correo</strong>
            contacto@hotwheels-store.cl
          </p>

          <p>
            <strong>📞 Teléfono</strong>
            +56 9 1234 5678
          </p>

          <p>
            <strong>🕒 Horario de atención</strong>
            Lunes a sábado de 10:00 a 20:00 hrs.
          </p>

          <ul className="contact-highlights">
            <li>Soporte sobre pedidos y estado de compra.</li>
            <li>Consultas sobre disponibilidad de modelos.</li>
            <li>Sugerencias para mejorar la tienda.</li>
          </ul>
        </article>

        {/* Formulario usando el <form> global que ya tienes estilizado */}
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
            <textarea placeholder="Escribe tu mensaje aquí..." />
          </label>

          <button type="submit" disabled>
            Enviar (solo demo)
          </button>
        </form>
      </section>
    </main>
  );
}
