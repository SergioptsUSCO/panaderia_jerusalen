import { useState } from 'react'

import ProductCard from './ProductCard'
import ProductModal from './ProductModal'

import {
  categories,
  products,
} from '../data/products'

import './ProductsSection.css'

function ProductsSection({
  onAddToCart,
}) {
  const [activeCategory, setActiveCategory] = useState('todos')
  const [
    selectedProduct,
    setSelectedProduct,
  ] = useState(null)

  const filteredProducts =
    activeCategory === 'todos'
      ? products
      : products.filter(
          (product) =>
            product.category === activeCategory
        )

  return (
    <section className="products-section">

      <div className="container">

        <div className="products-section__header">

          <div>
            <span className="products-section__eyebrow">
              NUESTRO MENÚ
            </span>

            <h2 className="products-section__title">
              Algo rico para
              <span> cada momento.</span>
            </h2>
          </div>

          <p className="products-section__intro">
            Descubre nuestros panes, hojaldres,
            postres y preparaciones elaboradas
            diariamente.
          </p>

        </div>

        <div className="products-section__filters">

          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              className={
                activeCategory === category.id
                  ? 'products-section__filter products-section__filter--active'
                  : 'products-section__filter'
              }
              onClick={() =>
                setActiveCategory(category.id)
              }
            >
              {category.name}
            </button>
          ))}

        </div>

        <div className="products-section__grid">

          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onViewProduct={
                setSelectedProduct
              }
            />
          ))}

        </div>

      </div>
          <ProductModal
            product={selectedProduct}
            onClose={() =>
              setSelectedProduct(null)
            }
            onAddToCart={onAddToCart}
          />
    </section>
  )
}

export default ProductsSection