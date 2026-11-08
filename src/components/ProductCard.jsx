import { useI18n } from '../i18n/useI18n'
import './ProductCard.css'

function ProductCard({
  product,
  onAddToCart,
  onViewProduct,
}) {
  const { t, formatPrice } = useI18n()



  const getCategoryName = (category) => {
    const categoryNames = {
      panes: 'Panes',
      hojaldres: 'Hojaldres',
      pasteleria: 'Pastelería',
      salados: 'Salados',
      bebidas: 'Bebidas',
    }

    return categoryNames[category] || category
  }

  return (
    <article className="product-card">

      {/* Imagen */}
      <button
        type="button"
        className="product-card__image-wrapper"
        onClick={() =>
          onViewProduct(product)
        }
        aria-label={t('Ver detalles de {name}', { name: t(product.name) })}
      >

        <img
          src={product.image}
          alt={t(product.name)}
          className="product-card__image"
          loading="lazy"
        />

        {product.featured && (
          <span className="product-card__featured">{t("Favorito")}</span>
        )}

      </button>

      {/* Información */}
      <div className="product-card__content">

        <span className="product-card__category">
          {t(getCategoryName(product.category))}
        </span>

        <button
          type="button"
          className="product-card__title-button"
          onClick={() =>
            onViewProduct(product)
          }
        >
          <h3 className="product-card__title">
            {t(product.name)}
          </h3>
        </button>

        <button
          type="button"
          className="product-card__details"
          onClick={() =>
            onViewProduct(product)
          }
        >{t("Ver detalles")}<span>→</span>
        </button>

        <div className="product-card__footer">

          <strong className="product-card__price">
            {formatPrice(product.price)}
          </strong>

          <button
            type="button"
            className="product-card__add"
            onClick={() =>
              onAddToCart(product)
            }
          >
            <span>+</span>{t("Agregar")}</button>

        </div>

      </div>

    </article>
  )
}

export default ProductCard