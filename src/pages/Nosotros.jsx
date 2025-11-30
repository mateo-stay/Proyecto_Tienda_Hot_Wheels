// src/pages/Nosotros.jsx
import React from "react";

export default function Nosotros() {
  return (
    <main className="nosotros-page">
      {/* Hero / presentación */}
      <section className="nosotros-hero">
        <div className="nosotros-hero-text">
          <h2>Sobre Hot Wheels Store</h2>
          <p className="p-text">
            Hot Wheels Store es una tienda ficticia creada como parte de un
            proyecto académico en Duoc UC. El objetivo es simular una tienda
            online para coleccionistas y fans de los autos a escala.
          </p>
        </div>
      </section>

      {/* Cards de información */}
      <section className="productos-container nosotros-grid">
        <article className="card">
          <h3>Nuestra misión</h3>
          <p>
            Acercar el mundo de los autos a escala a todos los fanáticos,
            ofreciendo un catálogo claro, visual y fácil de navegar, pensado
            tanto para quienes recién comienzan como para coleccionistas más
            avanzados.
          </p>
        </article>

        <article className="card">
          <h3>Nuestra propuesta</h3>
          <ul className="nosotros-lista">
            <li>Modelos icónicos y difíciles de encontrar (simulados).</li>
            <li>Experiencia de compra simple y rápida.</li>
            <li>Interfaz amigable para explorar y elegir autos.</li>
          </ul>
        </article>

        <article className="card">
          <h3>En contexto académico</h3>
          <p>
            Esta plataforma integra frontend en React y un backend con API
            para gestionar productos, usuarios y carrito. El enfoque está en
            aprender buenas prácticas de desarrollo web y arquitectura de
            aplicaciones.
          </p>
        </article>
      </section>
    </main>
  );
}
