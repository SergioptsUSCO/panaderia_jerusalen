import './MarqueeStrip.css'

const items = [
  'Pan artesanal',
  'Café',
  'Postres',
  'Hojaldres',
  'Tradición',
]

function MarqueeStrip() {
  return (
    <section
      className="marquee"
      aria-label="Productos de Panadería Jerusalén"
    >
      <div className="marquee__track">

        {[...items, ...items].map((item, index) => (
          <div
            className="marquee__item"
            key={`${item}-${index}`}
          >
            <span>{item}</span>
            <strong>✦</strong>
          </div>
        ))}

      </div>
    </section>
  )
}

export default MarqueeStrip