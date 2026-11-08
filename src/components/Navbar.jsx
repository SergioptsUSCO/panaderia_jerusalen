import logo from '../assets/logo/jerusalen-logo.svg'
import './Navbar.css'
import { Link } from "react-router-dom";

function Navbar() {
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

        <nav className="navbar__links">
          <Link to="/#inicio">Inicio</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/#nosotros">Nosotros</Link>
          <Link to="/#contacto">Contacto</Link>
        </nav>

        <div className="navbar__actions"></div>
      </div>
    </header>
  )
}

export default Navbar
