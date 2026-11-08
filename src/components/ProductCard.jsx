import './ProductCard.css'

function ProductCard({
  product,
  onAddToCart,
  onViewProduct,
}) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(price)
  }

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
        aria-label={`Ver detalles de ${product.name}`}
      >

        <img
          src={product.image}
          alt={product.name}
          className="product-card__image"
          loading="lazy"
        />

        {product.featured && (
          <span className="product-card__featured">
            Favorito
          </span>
        )}

      </button>

      {/* Información */}
      <div className="product-card__content">

        <span className="product-card__category">
          {getCategoryName(product.category)}
        </span>

        <button
          type="button"
          className="product-card__title-button"
          onClick={() =>
            onViewProduct(product)
          }
        >
          <h3 className="product-card__title">
            {product.name}
          </h3>
        </button>

        <button
          type="button"
          className="product-card__details"
          onClick={() =>
            onViewProduct(product)
          }
        >
          Ver detalles
          <span>→</span>
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
            <span>+</span>
            Agregar
          </button>

        </div>

      </div>

    </article>
  )
}

export default ProductCard