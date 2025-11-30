import React from "react";

export default function Blogs() {
  return (
    <main className="blogs-page">

      <section className="blogs-hero">
        <div className="blogs-hero-text">
          <h2>Blog Hot Wheels Store</h2>
          <p className="p-text">
            Tips rápidos, ideas y noticias para llevar tu colección al siguiente nivel.
          </p>
        </div>
      </section>

      <section className="blogs-lista productos-container">
        <article className="card blog-card">
          <div className="blog-meta">
            <span className="blog-tag">Guía</span>
          </div>
          <h3>Cómo iniciar tu colección Hot Wheels</h3>
          <p>
            Parte eligiendo una temática que te guste (JDM, clásicos, racing) y
            compra pocos modelos bien seleccionados. Prioriza calidad por sobre
            cantidad y aprovecha las ediciones especiales cuando aparezcan.
          </p>
        </article>

        <article className="card blog-card">
          <div className="blog-meta">
            <span className="blog-tag">Cuidados</span>
          </div>
          <h3>Consejos para cuidar tus autos a escala</h3>
          <p>
            Mantén tus autos lejos de la humedad y del sol directo. Usa vitrinas,
            cajas organizadoras y una limpieza suave para que la pintura y los
            detalles se mantengan como nuevos por más tiempo.
          </p>
        </article>

        <article className="card blog-card">
          <div className="blog-meta">
            <span className="blog-tag">Colección</span>
          </div>
          <h3>Dónde encontrar los mejores modelos</h3>
          <p>
            Combina retail, tiendas especializadas, ferias de coleccionistas y
            grupos en redes sociales. Así aumentas tus posibilidades de conseguir
            piezas raras y lanzamientos limitados.
          </p>
        </article>
      </section>
    </main>
  );
}
