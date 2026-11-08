import './AboutSection.css'

function AboutSection() {
  return (
    <section
      className="about-section"
      id="nosotros"
    >

      <div className="about-section__container container">

        <div className="about-section__visual">

          <div className="about-section__image-wrapper">

            <img
              src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=85"
              alt="Preparación artesanal de pan"
              className="about-section__image"
            />

          </div>

          <div className="about-section__stamp">
            <span>Hecho</span>
            <strong>con tradición</strong>
            <span>cada día</span>
          </div>

        </div>

        <div className="about-section__content">

          <span className="about-section__eyebrow">
            NUESTRA HISTORIA
          </span>

          <h2 className="about-section__title">
            Más que pan,
            <span> compartimos momentos.</span>
          </h2>

          <p className="about-section__description">
            En Panadería Jerusalén creemos que las mejores
            historias comienzan alrededor de una mesa.
            Cada producto busca conservar ese sabor cercano,
            sencillo y tradicional que acompaña los momentos
            cotidianos.
          </p>

          <p className="about-section__description">
            Desde panes recién horneados hasta postres,
            hojaldres y bebidas, trabajamos para que cada visita
            tenga algo especial.
          </p>

          <div className="about-section__values">

            <article className="about-value">
              <span>01</span>

              <div>
                <h3>Hecho cada día</h3>
                <p>
                  Productos preparados para ofrecer
                  frescura y buen sabor.
                </p>
              </div>
            </article>

            <article className="about-value">
              <span>02</span>

              <div>
                <h3>Recetas con tradición</h3>
                <p>
                  Sabores familiares combinados con
                  una presentación moderna.
                </p>
              </div>
            </article>

            <article className="about-value">
              <span>03</span>

              <div>
                <h3>Ingredientes seleccionados</h3>
                <p>
                  Cuidamos cada preparación desde
                  sus ingredientes hasta el horno.
                </p>
              </div>
            </article>

          </div>

        </div>

      </div>

    </section>
  )
}

export default AboutSection