import { useI18n } from '../i18n/useI18n'
import './CartDrawer.css'

function CartDrawer({
  isOpen,
  cart,
  onClose,
  onIncrease,
  onDecrease,
  onRemove,
  onCheckout,
}) {
  const { t, formatPrice } = useI18n()



  const subtotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  )

  return (
    <>
      <div
        className={
          isOpen
            ? 'cart-overlay cart-overlay--visible'
            : 'cart-overlay'
        }
        onClick={onClose}
      />

      <aside
        className={
          isOpen
            ? 'cart-drawer cart-drawer--open'
            : 'cart-drawer'
        }
      >

        <div className="cart-drawer__header">

          <div>
            <span className="cart-drawer__eyebrow">{t("PANADERÍA JERUSALÉN")}</span>

            <h2>{t("Tu pedido")}</h2>
          </div>

          <button
            type="button"
            className="cart-drawer__close"
            onClick={onClose}
            aria-label={t("Cerrar carrito")}
          >{t("×")}</button>

        </div>

        <div className="cart-drawer__content">

          {cart.length === 0 ? (

            <div className="cart-drawer__empty">

              <span>🥐</span>

              <h3>{t("Tu pedido está vacío")}</h3>

              <p>{t("Agrega algunos productos del menú para comenzar.")}</p>

              <button
                type="button"
                onClick={onClose}
              >{t("Ver productos")}</button>

            </div>

          ) : (

            <div className="cart-drawer__products">

              {cart.map((item) => (

                <article
                  key={item.id}
                  className="cart-item"
                >

                  <img
                    src={item.image}
                    alt={t(item.name)}
                  />

                  <div className="cart-item__information">

                    <div className="cart-item__top">

                      <div>
                        <h3>{t(item.name)}</h3>

                        <span>
                          {formatPrice(item.price)}
                        </span>
                      </div>

                      <button
                        type="button"
                        className="cart-item__remove"
                        onClick={() =>
                          onRemove(item.id)
                        }
                      >{t("Eliminar")}</button>

                    </div>

                    <div className="cart-item__quantity">

                      <button
                        type="button"
                        onClick={() =>
                          onDecrease(item.id)
                        }
                      >
                        −
                      </button>

                      <span>
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          onIncrease(item.id)
                        }
                      >
                        +
                      </button>

                    </div>

                  </div>

                </article>

              ))}

            </div>

          )}

        </div>

        {cart.length > 0 && (

          <div className="cart-drawer__footer">

            <div className="cart-drawer__subtotal">

              <span>{t("Subtotal")}</span>

              <strong>
                {formatPrice(subtotal)}
              </strong>

            </div>

            <p>{t("El costo de domicilio se calculará posteriormente.")}</p>

            <button
              type="button"
              className="cart-drawer__checkout"
              onClick={onCheckout}
            >{t("Continuar pedido")}<span>→</span>
            </button>

          </div>

        )}

      </aside>
    </>
  )
}

export default CartDrawer