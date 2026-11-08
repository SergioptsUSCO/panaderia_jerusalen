import { products } from '../data/products'

import './DailySpecial.css'

function DailySpecial({
  onAddToCart,
}) {
  const specialProduct =
    products.find(
      (product) => product.id === 3
    )

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <section className="daily-special">

      <div className="daily-special__container container">

        <div className="daily-special__content">

          <span className="daily-special__eyebrow">
            RECOMENDADO DE LA CASA
          </span>

          <h2 className="daily-special__title">
            Un favorito para
            <span> acompañar tu día.</span>
          </h2>

          <p className="daily-special__description">
            Nuestro croissant artesanal combina una
            textura ligera y crujiente con un interior
            suave. Perfecto para acompañar con café.
          </p>

          <div className="daily-special__bottom">

            <div className="daily-special__price">

              <span>Precio</span>

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
            >
              Agregar al pedido
              <span>+</span>
            </button>

          </div>

        </div>

        <div className="daily-special__visual">

          <img
            src={specialProduct.image}
            alt={specialProduct.name}
          />

          <div className="daily-special__label">
            <span>Recomendado</span>

            <strong>
              {specialProduct.name}
            </strong>
          </div>

        </div>

      </div>

    </section>
  )
}

export default DailySpecial