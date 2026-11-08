import { useI18n } from '../i18n/useI18n'
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
  const { t, formatPrice } = useI18n()

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
          aria-label={t("Cerrar detalle")}
        >{t("×")}</button>

        <div className="product-modal__image">

          <img
            src={product.image}
            alt={t(product.name)}
          />

          {product.featured && (
            <span className="product-modal__featured">{t("Favorito")}</span>
          )}

        </div>

        <div className="product-modal__content">

          <span className="product-modal__category">
            {t({ panes: 'Panes', hojaldres: 'Hojaldres', pasteleria: 'Pastelería', salados: 'Salados', bebidas: 'Bebidas' }[product.category] || product.category)}
          </span>

          <h2>
            {t(product.name)}
          </h2>

          <strong className="product-modal__price">
            {formatPrice(product.price)}
          </strong>

          <p className="product-modal__description">
            {t(product.description)}
          </p>

          <div className="product-modal__separator" />

          <div className="product-modal__quantity-section">

            <div>
              <span className="product-modal__label">{t("CANTIDAD")}</span>

              <p>{t("Selecciona cuántas unidades quieres agregar.")}</p>
            </div>

            <div className="product-modal__quantity">

              <button
                type="button"
                onClick={decreaseQuantity}
                aria-label={t("Disminuir cantidad")}
              >
                −
              </button>

              <span>
                {quantity}
              </span>

              <button
                type="button"
                onClick={increaseQuantity}
                aria-label={t("Aumentar cantidad")}
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

            <span>{t("Agregar al pedido")}</span>

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