import panCampesino from '../assets/products/pan-campesino.jpg'
import panQueso from '../assets/products/pan-queso.jpg'
import croissant from '../assets/products/croissant.jpg'
import croissantChocolate from '../assets/products/croissant-chocolate.jpg'
import tortaChocolate from '../assets/products/torta-chocolate.jpg'
import tortaZanahoria from '../assets/products/torta-zanahoria.jpg'
import pastelPollo from '../assets/products/pastel-pollo.jpg'
import sandwich from '../assets/products/sandwich.jpg'
import cafe from '../assets/products/cafe.jpg'
import cappuccino from '../assets/products/cappuccino.jpg'

export const categories = [
  {
    id: 'todos',
    name: 'Todos',
  },
  {
    id: 'panes',
    name: 'Panes',
  },
  {
    id: 'hojaldres',
    name: 'Hojaldres',
  },
  {
    id: 'pasteleria',
    name: 'Pastelería',
  },
  {
    id: 'salados',
    name: 'Salados',
  },
  {
    id: 'bebidas',
    name: 'Bebidas',
  },
]

export const products = [
  {
    id: 1,
    name: 'Pan campesino',
    category: 'panes',
    price: 5.00,
    description:
      'Pan artesanal de corteza dorada, miga suave y sabor tradicional.',
    image:
      panCampesino,
    featured: true,
  },

  {
    id: 2,
    name: 'Pan de queso',
    category: 'panes',
    price: 3.50,
    description:
      'Suave por dentro, ligeramente dorado y preparado con queso.',
    image:
      panQueso,
    featured: false,
  },

  {
    id: 3,
    name: 'Croissant artesanal',
    category: 'hojaldres',
    price: 4.50,
    description:
      'Capas crujientes de masa hojaldrada con un delicado sabor a mantequilla.',
    image:
      croissant,
    featured: true,
  },

  {
    id: 4,
    name: 'Croissant de chocolate',
    category: 'hojaldres',
    price: 5.50,
    description:
      'Croissant artesanal relleno de chocolate y horneado cada mañana.',
    image:
      croissantChocolate,
    featured: false,
  },

  {
    id: 5,
    name: 'Torta de chocolate',
    category: 'pasteleria',
    price: 8.00,
    description:
      'Porción de torta húmeda de chocolate con una cobertura suave y cremosa.',
    image:
      tortaChocolate,
    featured: true,
  },

  {
    id: 6,
    name: 'Torta de zanahoria',
    category: 'pasteleria',
    price: 7.50,
    description:
      'Torta casera de zanahoria con especias y una cubierta cremosa.',
    image:
      tortaZanahoria,
    featured: false,
  },

  {
    id: 7,
    name: 'Pastel de pollo',
    category: 'salados',
    price: 6.50,
    description:
      'Masa dorada y crujiente con relleno casero de pollo.',
    image:
      pastelPollo,
    featured: true,
  },

  {
    id: 8,
    name: 'Sándwich de la casa',
    category: 'salados',
    price: 9.00,
    description:
      'Pan artesanal acompañado de ingredientes frescos y preparado al momento.',
    image:
      sandwich,
    featured: false,
  },

  {
    id: 9,
    name: 'Café americano',
    category: 'bebidas',
    price: 4.00,
    description:
      'Café recién preparado, perfecto para acompañar nuestros panes.',
    image:
      cafe,
    featured: false,
  },

  {
    id: 10,
    name: 'Cappuccino',
    category: 'bebidas',
    price: 6.00,
    description:
      'Espresso acompañado de leche vaporizada y una cremosa capa de espuma.',
    image:
      cappuccino,
    featured: true,
  },
]
