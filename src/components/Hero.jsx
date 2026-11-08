import { useI18n } from '../i18n/useI18n'
import './Hero.css'
import heroImage from '../assets/bakery/hero-bakery.png'
import { Link } from "react-router-dom";

function Hero() {
  const { t } = useI18n()

  return (
    <section className="hero" id="inicio">

      <div className="hero__decoration hero__decoration--one"></div>
      <div className="hero__decoration hero__decoration--two"></div>

      <div className="hero__container container">

        <div className="hero__content">

          <span className="hero__eyebrow">{t("PAN ARTESANAL · DESDE 2004")}</span>

          <h1 className="hero__title">{t("Recién horneado,")}<span>{t(" todos los días.")}</span>
          </h1>

          <p className="hero__description">{t("Elaboramos panes, postres y productos de panadería con ingredientes seleccionados, recetas tradicionales y el sabor de siempre.")}</p>

          <div className="hero__actions">

            <Link to="/menu" className="hero__button hero__button--primary">{t("Ver nuestro menú")}<span>→</span>
            </Link>

            <Link
              to="/#nosotros"
              className="hero__button hero__button--secondary"
            >{t("Nuestra historia")}</Link>

          </div>

          <div className="hero__features">

            <div className="hero__feature">
              <strong>20+</strong>
              <span>{t("Años horneando")}</span>
            </div>

            <div className="hero__feature-line"></div>

            <div className="hero__feature">
              <strong>100%</strong>
              <span>{t("Tradición artesanal")}</span>
            </div>

          </div>

        </div>

        <div className="hero__visual">

          <div className="hero__image-wrapper">

            <img
              src={heroImage}
              alt={t("Productos artesanales de Panadería Jerusalén")}
              className="hero__image"
            />

          </div>

        </div>

      </div>

    </section>
  )
}

export default Hero
