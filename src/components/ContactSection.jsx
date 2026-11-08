import OpenStreetMap from './OpenStreetMap'

import { business } from '../data/business'

import './ContactSection.css'

function ContactSection() {
  const directionsUrl =
    'https://www.openstreetmap.org/search' +
    `?query=${encodeURIComponent(
      business.address
    )}`

  return (
    <section
      className="contact-section"
      id="contacto"
    >
      <div className="container">

        <div className="contact-section__header">

          <span className="contact-section__eyebrow">
            VEN A VISITARNOS
          </span>

          <h2 className="contact-section__title">
            Siempre hay algo
            <span> recién horneado.</span>
          </h2>

          <p>
            Visítanos, conoce nuestros productos
            y disfruta del sabor de Panadería Jerusalén.
          </p>

        </div>

        <div className="contact-section__grid">

          <div className="contact-section__map">
            <OpenStreetMap />
          </div>

          <div className="contact-section__information">

            <article className="contact-card">

              <span className="contact-card__number">
                01
              </span>

              <div>

                <span className="contact-card__label">
                  UBICACIÓN
                </span>

                <h3>
                  {business.address}
                </h3>

                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Ver en el mapa
                  <span>↗</span>
                </a>

              </div>

            </article>

            <article className="contact-card">

              <span className="contact-card__number">
                02
              </span>

              <div>

                <span className="contact-card__label">
                  CONTACTO
                </span>

                <a
                  className="contact-card__main-link"
                  href={`tel:${business.phone}`}
                >
                  {business.phone}
                </a>

                <a
                  className="contact-card__secondary-link"
                  href={`mailto:${business.email}`}
                >
                  {business.email}
                </a>

              </div>

            </article>

            <article className="contact-card">

              <span className="contact-card__number">
                03
              </span>

              <div className="contact-card__schedule">

                <span className="contact-card__label">
                  HORARIOS
                </span>

                {business.schedule.map((item) => (
                  <div
                    className="schedule-row"
                    key={item.days}
                  >
                    <span>
                      {item.days}
                    </span>

                    <strong>
                      {item.hours}
                    </strong>
                  </div>
                ))}

              </div>

            </article>

          </div>

        </div>

      </div>
    </section>
  )
}

export default ContactSection