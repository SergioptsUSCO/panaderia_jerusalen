import { useI18n } from '../i18n/useI18n'
import './MarqueeStrip.css'

const items = [
  'Pan artesanal',
  'Café',
  'Postres',
  'Hojaldres',
  'Tradición',
]

function MarqueeStrip() {
  const { t } = useI18n()

  return (
    <section
      className="marquee"
      aria-label={t("Productos de Panadería Jerusalén")}
    >
      <div className="marquee__track">

        {[...items, ...items].map((item, index) => (
          <div
            className="marquee__item"
            key={`${t(item)}-${index}`}
          >
            <span>{t(item)}</span>
            <strong>✦</strong>
          </div>
        ))}

      </div>
    </section>
  )
}

export default MarqueeStrip