import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProductsSection from '../components/ProductsSection'
import CartDrawer from '../components/CartDrawer'
import CheckoutPanel from '../components/CheckoutPanel'

function Menu() {
  const [cart, setCart] = useState([])
  const [activePanel, setActivePanel] = useState(null)

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)

  const handleAddToCart = (product, quantity = 1) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === product.id)

      return existingItem
        ? currentCart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        : [...currentCart, { ...product, quantity }]
    })
    setActivePanel('cart')
  }

  const updateQuantity = (id, change) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  return (
    <>
      <Navbar
        cartCount={cartCount}
        onOpenCart={() => setActivePanel('cart')}
      />

      <main aria-label="Menú de productos">
        <ProductsSection onAddToCart={handleAddToCart} />
      </main>

      <Footer />

      {activePanel === 'cart' && (
        <CartDrawer
          isOpen
          cart={cart}
          onClose={() => setActivePanel(null)}
          onIncrease={(id) => updateQuantity(id, 1)}
          onDecrease={(id) => updateQuantity(id, -1)}
          onRemove={(id) =>
            setCart((currentCart) => currentCart.filter((item) => item.id !== id))
          }
          onCheckout={() => setActivePanel('checkout')}
        />
      )}

      {activePanel === 'checkout' && (
        <CheckoutPanel
          isOpen
          cart={cart}
          onClose={() => setActivePanel(null)}
          onBackToCart={() => setActivePanel('cart')}
          onOrderSuccess={() => {
            setCart([])
            setActivePanel(null)
          }}
        />
      )}
    </>
  )
}

export default Menu
