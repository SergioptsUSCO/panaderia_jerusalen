import { business } from '../data/business'
import logo from '../assets/logo/jerusalen-logo.svg'

import './Footer.css'

function Footer() {
  return (
    <footer className="footer">

      <div className="container">

        <div className="footer__grid">

          <div className="footer__brand">

            <img
              src={logo}
              alt="Panadería Jerusalén"
              className="footer__brand-logo"
            />

          </div>

          <div>

            <span className="footer__label">
              CONTACTO
            </span>

            <div className="footer__links">

              <a href={`tel:${business.phone}`}>
                {business.phone}
              </a>

              <a href={`mailto:${business.email}`}>
                {business.email}
              </a>

            </div>

          </div>

          <div>

            <span className="footer__label">
              SÍGUENOS
            </span>

            <div className="footer__links">

              <a
                href={business.social.instagram}
              >
                Instagram
              </a>

              <a
                href={business.social.facebook}
              >
                Facebook
              </a>

            </div>

          </div>

        </div>

        <div className="footer__bottom">

          <span>
            © {new Date().getFullYear()} {business.name}
          </span>

          <span>
            Todos los derechos reservados
          </span>

        </div>

      </div>

    </footer>
  )
}

export default Footer