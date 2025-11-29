// src/pages/Blogs.jsx
import React from "react";

export default function Blogs() {
  return (
    <main>
      <h2>Blogs</h2>
      <p className="p-text">
        Noticias, tips y consejos para que tu colección Hot Wheels se vea brutal.
      </p>

      <section className="blogs-lista productos-container">
        <article className="card">
          <h3>Cómo iniciar tu colección Hot Wheels</h3>
          <p>
            Elige una línea que te guste (JDM, clásicos, racing) y comienza con
            pocos modelos bien seleccionados. Prioriza calidad por sobre cantidad
            y aprovecha las ediciones especiales.
          </p>
        </article>

        <article className="card">
          <h3>Consejos para cuidar tus autos a escala</h3>
          <p>
            Evita la humedad y el sol directo, guárdalos en vitrinas o cajas y
            limpia el polvo suavemente. Así mantienes la pintura y los detalles
            como nuevos.
          </p>
        </article>

        <article className="card">
          <h3>Dónde encontrar los mejores modelos</h3>
          <p>
            Revisa tiendas especializadas, ferias de coleccionistas y lanzamientos
            en retail. Sigue páginas de comunidad para no perderte las novedades.
          </p>
        </article>
      </section>
    </main>
  );
}
