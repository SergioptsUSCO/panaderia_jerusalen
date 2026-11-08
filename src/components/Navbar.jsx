import { useI18n } from '../i18n/useI18n'
import { useState } from 'react'
import logo from '../assets/logo/jerusalen-logo.svg'
import './Navbar.css'
import { Link, NavLink } from 'react-router-dom'

function Navbar({ cartCount = 0, onOpenCart }) {
  const { t, language, setLanguage } = useI18n()

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  const navigationLinks = (
    <>
      <Link to="/#inicio" onClick={closeMobileMenu}>{t("Inicio")}</Link>
      <NavLink to="/menu" onClick={closeMobileMenu}>{t("Menú")}</NavLink>
      <Link to="/#nosotros" onClick={closeMobileMenu}>{t("Nosotros")}</Link>
      <Link to="/#contacto" onClick={closeMobileMenu}>{t("Contacto")}</Link>
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
            alt={t("Panadería Jerusalén")}
            className="navbar__brand-logo"
          />
        </Link>

        <nav className="navbar__links" aria-label={t("Navegación principal")}>
          {navigationLinks}
        </nav>

        <div className="navbar__actions">
          <select
            className="navbar__language"
            aria-label={t('Idioma')}
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
          >
            <option value="es" lang="es">ES</option>
            <option value="en" lang="en">EN</option>
          </select>
          {onOpenCart && (
            <button type="button" className="navbar__order" onClick={onOpenCart}>{t("Mi pedido")}<span className="navbar__cart-count">{cartCount}</span>
            </button>
          )}

          <button
            type="button"
            className="navbar__menu-button"
            aria-label={t(isMobileMenuOpen ? 'Cerrar navegación' : 'Abrir navegación')}
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
          aria-label={t("Navegación móvil")}
        >
          {navigationLinks}
        </nav>
      )}
    </header>
  )
}

export default Navbar
