import { useState } from 'react'
import logo from '../assets/logo/jerusalen-logo.svg'
import './Navbar.css'
import { Link, NavLink } from 'react-router-dom'

function Navbar({ cartCount = 0, onOpenCart }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  const navigationLinks = (
    <>
      <Link to="/#inicio" onClick={closeMobileMenu}>Inicio</Link>
      <NavLink to="/menu" onClick={closeMobileMenu}>Menú</NavLink>
      <Link to="/#nosotros" onClick={closeMobileMenu}>Nosotros</Link>
      <Link to="/#contacto" onClick={closeMobileMenu}>Contacto</Link>
    </>
  )

  return (
    <header className="navbar">
      <div className="navbar__container container">
        <Link
          to="/#inicio"
          className="navbar__brand"
        >
          <img
            src={logo}
            alt="Panadería Jerusalén"
            className="navbar__brand-logo"
          />
        </Link>

        <nav className="navbar__links" aria-label="Navegación principal">
          {navigationLinks}
        </nav>

        <div className="navbar__actions">
          {onOpenCart && (
            <button type="button" className="navbar__order" onClick={onOpenCart}>
              Mi pedido
              <span className="navbar__cart-count">{cartCount}</span>
            </button>
          )}

          <button
            type="button"
            className="navbar__menu-button"
            aria-label={isMobileMenuOpen ? 'Cerrar navegación' : 'Abrir navegación'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <nav
          id="mobile-navigation"
          className="navbar__mobile-links"
          aria-label="Navegación móvil"
        >
          {navigationLinks}
        </nav>
      )}
    </header>
  )
}

export default Navbar
