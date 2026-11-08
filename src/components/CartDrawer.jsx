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
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(price)
  }

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
            <span className="cart-drawer__eyebrow">
              PANADERÍA JERUSALÉN
            </span>

            <h2>Tu pedido</h2>
          </div>

          <button
            type="button"
            className="cart-drawer__close"
            onClick={onClose}
            aria-label="Cerrar carrito"
          >
            ×
          </button>

        </div>

        <div className="cart-drawer__content">

          {cart.length === 0 ? (

            <div className="cart-drawer__empty">

              <span>🥐</span>

              <h3>Tu pedido está vacío</h3>

              <p>
                Agrega algunos productos del menú para comenzar.
              </p>

              <button
                type="button"
                onClick={onClose}
              >
                Ver productos
              </button>

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
                    alt={item.name}
                  />

                  <div className="cart-item__information">

                    <div className="cart-item__top">

                      <div>
                        <h3>{item.name}</h3>

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
                      >
                        Eliminar
                      </button>

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

              <span>Subtotal</span>

              <strong>
                {formatPrice(subtotal)}
              </strong>

            </div>

            <p>
              El costo de domicilio se calculará posteriormente.
            </p>

            <button
              type="button"
              className="cart-drawer__checkout"
              onClick={onCheckout}
            >
              Continuar pedido
              <span>→</span>
            </button>

          </div>

        )}

      </aside>
    </>
  )
}

export default CartDrawer