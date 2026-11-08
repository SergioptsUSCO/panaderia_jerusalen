import { useI18n } from '../i18n/useI18n'
import { products } from '../data/products'

import './DailySpecial.css'

function DailySpecial({
  onAddToCart,
}) {
  const { t, formatPrice } = useI18n()

  const specialProduct =
    products.find(
      (product) => product.id === 3
    )



  return (
    <section className="daily-special">

      <div className="daily-special__container container">

        <div className="daily-special__content">

          <span className="daily-special__eyebrow">{t("RECOMENDADO DE LA CASA")}</span>

          <h2 className="daily-special__title">{t("Un favorito para")}<span>{t(" acompañar tu día.")}</span>
          </h2>

          <p className="daily-special__description">{t("Nuestro croissant artesanal combina una textura ligera y crujiente con un interior suave. Perfecto para acompañar con café.")}</p>

          <div className="daily-special__bottom">

            <div className="daily-special__price">

              <span>{t("Precio")}</span>

              <strong>
                {formatPrice(specialProduct.price)}
              </strong>

            </div>

            <button
              type="button"
              className="daily-special__button"
              onClick={() =>
                onAddToCart(specialProduct)
              }
            >{t("Agregar al pedido")}<span>+</span>
            </button>

          </div>

        </div>

        <div className="daily-special__visual">

          <img
            src={specialProduct.image}
            alt={t(specialProduct.name)}
          />

          <div className="daily-special__label">
            <span>{t("Recomendado")}</span>

            <strong>
              {t(specialProduct.name)}
            </strong>
          </div>

        </div>

      </div>

    </section>
  )
}

export default DailySpecial