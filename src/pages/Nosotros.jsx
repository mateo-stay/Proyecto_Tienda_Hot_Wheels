// src/pages/Nosotros.jsx
import React from "react";

export default function Nosotros() {
  return (
    <main className="login-page">
      <div className="login-card nosotros-card">
        <h2 className="login-title">Sobre Hot Wheels Store</h2>
        <p className="login-subtitle">
          Proyecto académico desarrollado en Duoc UC, pensado para simular una tienda
          online de autos Hot Wheels para coleccionistas y fans.
        </p>

        <section className="nosotros-bloque">
          <h3>Nuestra misión</h3>
          <p>
            Acercar el mundo de los autos a escala a todos los fanáticos, ofreciendo
            un catálogo claro, visual y fácil de navegar, tanto para quienes recién
            comienzan como para coleccionistas más avanzados.
          </p>
        </section>

        <section className="nosotros-bloque">
          <h3>Nuestra propuesta</h3>
          <ul className="nosotros-lista">
            <li>Modelos icónicos y difíciles de encontrar (simulados).</li>
            <li>Experiencia de compra simple y rápida.</li>
            <li>Interfaz amigable para explorar y elegir autos.</li>
          </ul>
        </section>

        <section className="nosotros-bloque">
          <h3>En contexto académico</h3>
          <p>
            Esta plataforma integra frontend en React y un backend con API para
            gestionar productos, usuarios y carrito. El foco está en aplicar buenas
            prácticas de desarrollo web, consumo de APIs y arquitectura de
            aplicaciones.
          </p>
        </section>
      </div>
    </main>
  );
}
