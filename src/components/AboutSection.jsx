import { useI18n } from '../i18n/useI18n'
import './AboutSection.css'

function AboutSection() {
  const { t } = useI18n()

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
              alt={t("Preparación artesanal de pan")}
              className="about-section__image"
            />

          </div>

          <div className="about-section__stamp">
            <span>{t("Hecho")}</span>
            <strong>{t("con tradición")}</strong>
            <span>{t("cada día")}</span>
          </div>

        </div>

        <div className="about-section__content">

          <span className="about-section__eyebrow">{t("NUESTRA HISTORIA")}</span>

          <h2 className="about-section__title">{t("Más que pan,")}<span>{t(" compartimos momentos.")}</span>
          </h2>

          <p className="about-section__description">{t("En Panadería Jerusalén creemos que las mejores historias comienzan alrededor de una mesa. Cada producto busca conservar ese sabor cercano, sencillo y tradicional que acompaña los momentos cotidianos.")}</p>

          <p className="about-section__description">{t("Desde panes recién horneados hasta postres, hojaldres y bebidas, trabajamos para que cada visita tenga algo especial.")}</p>

          <div className="about-section__values">

            <article className="about-value">
              <span>01</span>

              <div>
                <h3>{t("Hecho cada día")}</h3>
                <p>{t("Productos preparados para ofrecer frescura y buen sabor.")}</p>
              </div>
            </article>

            <article className="about-value">
              <span>02</span>

              <div>
                <h3>{t("Recetas con tradición")}</h3>
                <p>{t("Sabores familiares combinados con una presentación moderna.")}</p>
              </div>
            </article>

            <article className="about-value">
              <span>03</span>

              <div>
                <h3>{t("Ingredientes seleccionados")}</h3>
                <p>{t("Cuidamos cada preparación desde sus ingredientes hasta el horno.")}</p>
              </div>
            </article>

          </div>

        </div>

      </div>

    </section>
  )
}

export default AboutSection