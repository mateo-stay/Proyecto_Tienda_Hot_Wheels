// src/pages/Nosotros.jsx
import React from "react";

export default function Nosotros() {
  return (
    <main className="pagina-estatica">
      <h2>Sobre Hot Wheels Store</h2>
      <p>
        Hot Wheels Store es una tienda ficticia creada como proyecto para Duoc
        UC. Nuestra misión es acercar el mundo de los autos a escala a todos
        los fanáticos.
      </p>

      <section className="nosotros-section">
        <h3>Nuestra propuesta</h3>
        <ul>
          <li>Modelos icónicos y difíciles de encontrar.</li>
          <li>Experiencia de compra simple y rápida.</li>
          <li>Catálogo pensado para coleccionistas y principiantes.</li>
        </ul>
      </section>
    </main>
  );
}
