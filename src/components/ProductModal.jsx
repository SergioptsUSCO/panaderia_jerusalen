import {
  useEffect,
  useState,
} from 'react'

import './ProductModal.css'

function ProductModal({
  product,
  onClose,
  onAddToCart,
}) {
  const [quantity, setQuantity] =
    useState(1)

  useEffect(() => {
    if (!product) {
      return
    }

    setQuantity(1)

    document.body.style.overflow =
      'hidden'

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener(
      'keydown',
      handleEscape
    )

    return () => {
      document.body.style.overflow = ''

      window.removeEventListener(
        'keydown',
        handleEscape
      )
    }
  }, [product, onClose])

  if (!product) {
    return null
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat(
      'es-CO',
      {
        style: 'currency',
        currency: 'COP',
        maximumFractionDigits: 0,
      }
    ).format(price)
  }

  const total =
    product.price * quantity

  const increaseQuantity = () => {
    setQuantity(
      (currentQuantity) =>
        currentQuantity + 1
    )
  }

  const decreaseQuantity = () => {
    setQuantity(
      (currentQuantity) =>
        Math.max(
          1,
          currentQuantity - 1
        )
    )
  }

  const handleAdd = () => {
    onAddToCart(
      product,
      quantity
    )

    onClose()
  }

  return (
    <div
      className="product-modal__overlay"
      onClick={onClose}
    >

      <div
        className="product-modal"
        onClick={(event) =>
          event.stopPropagation()
        }
      >

        <button
          type="button"
          className="product-modal__close"
          onClick={onClose}
          aria-label="Cerrar detalle"
        >
          ×
        </button>

        <div className="product-modal__image">

          <img
            src={product.image}
            alt={product.name}
          />

          {product.featured && (
            <span className="product-modal__featured">
              Favorito
            </span>
          )}

        </div>

        <div className="product-modal__content">

          <span className="product-modal__category">
            {product.category}
          </span>

          <h2>
            {product.name}
          </h2>

          <strong className="product-modal__price">
            {formatPrice(product.price)}
          </strong>

          <p className="product-modal__description">
            {product.description}
          </p>

          <div className="product-modal__separator" />

          <div className="product-modal__quantity-section">

            <div>
              <span className="product-modal__label">
                CANTIDAD
              </span>

              <p>
                Selecciona cuántas unidades
                quieres agregar.
              </p>
            </div>

            <div className="product-modal__quantity">

              <button
                type="button"
                onClick={decreaseQuantity}
                aria-label="Disminuir cantidad"
              >
                −
              </button>

              <span>
                {quantity}
              </span>

              <button
                type="button"
                onClick={increaseQuantity}
                aria-label="Aumentar cantidad"
              >
                +
              </button>

            </div>

          </div>

          <button
            type="button"
            className="product-modal__add"
            onClick={handleAdd}
          >

            <span>
              Agregar al pedido
            </span>

            <strong>
              {formatPrice(total)}
            </strong>

          </button>

        </div>

      </div>

    </div>
  )
}

export default ProductModal