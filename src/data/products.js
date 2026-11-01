const sharedSizes = ['S', 'M', 'L', 'XL', 'XXL']

export const products = [
  {
    id: 'luffy-gear-5-tee',
    name: 'Luffy Gear 5 Tee',
    series: 'One Piece',
    price: 999,
    compareAt: 1299,
    discount: '23% OFF',
    image: '/images/product-luffy-gear-5.webp',
    alt: 'Black Luffy Gear 5 graphic tee with red ink artwork',
    colors: [{ name: 'Black', value: '#111111' }, { name: 'White', value: '#f4f4f2' }, { name: 'Grey', value: '#c8c8c8' }],
    rating: '4.9',
    reviews: '1,248',
    bought: '2.3K+',
    description: 'Unleash the spirit of the Pirate King with our Luffy Gear 5 Tee. Featuring a bold, manga-inspired print, this tee captures Luffy’s iconic Gear 5 look — full of energy, freedom, and joy.',
    bullets: ['High-quality, breathable cotton (180 GSM)', 'Vibrant, long-lasting anime print', 'Comfortable unisex fit', 'Perfect for everyday wear or anime events'],
    sizes: sharedSizes,
  },
  {
    id: 'naruto-sage-tee', name: 'Naruto Sage Tee', series: 'Naruto', price: 999,
    image: '/images/product-naruto-sage.webp', alt: 'Black Naruto tee with an orange sage cloak graphic',
    colors: [{ name: 'Black', value: '#161616' }, { name: 'Ember', value: '#E8611C' }, { name: 'Off White', value: '#F2EFE8' }], sizes: sharedSizes,
  },
  {
    id: 'sukuna-curse-tee', name: 'Sukuna Curse Tee', series: 'Jujutsu Kaisen', price: 999,
    image: '/images/product-sukuna-curse.webp', alt: 'Off-white Sukuna graphic tee',
    colors: [{ name: 'Off White', value: '#F2EFE8' }, { name: 'Ink', value: '#161616' }, { name: 'Crimson', value: '#B32025' }], sizes: sharedSizes,
  },
  {
    id: 'gojo-satoru-tee', name: 'Gojo Satoru Tee', series: 'Jujutsu Kaisen', price: 999,
    image: '/images/product-dragon-fist.webp', alt: 'Black Gojo-inspired graphic tee',
    colors: [{ name: 'Black', value: '#161616' }, { name: 'Lilac', value: '#7771BE' }, { name: 'Blue', value: '#526AB8' }], sizes: sharedSizes,
  },
  {
    id: 'zenitsu-thunder-tee', name: 'Zenitsu Thunder Tee', series: 'Demon Slayer', price: 999,
    image: '/images/product-zenitsu-thunder.webp', alt: 'Black Zenitsu graphic tee',
    colors: [{ name: 'Black', value: '#161616' }, { name: 'Gold', value: '#E8A317' }], sizes: sharedSizes,
  },
  {
    id: 'tanjiro-breath-tee', name: 'Tanjiro Breath Tee', series: 'Demon Slayer', price: 999,
    image: '/images/product-tanjiro-breath.webp', alt: 'Black Tanjiro tee with green checkered artwork',
    colors: [{ name: 'Black', value: '#161616' }, { name: 'Forest', value: '#1F7A4D' }, { name: 'Crimson', value: '#D42A4C' }], sizes: sharedSizes,
  },
  {
    id: 'dragon-fist-tee', name: 'Gojo Satoru Tee', series: 'Jujutsu Kaisen', price: 999,
    image: '/images/product-dragon-fist.webp', alt: 'Black Gojo-inspired graphic tee',
    colors: [{ name: 'Black', value: '#161616' }, { name: 'Lilac', value: '#7771BE' }, { name: 'Blue', value: '#526AB8' }], sizes: sharedSizes,
  },
  {
    id: 'goku-ultra-tee', name: 'Goku Ultra Tee', series: 'Dragon Ball', price: 999,
    image: '/images/product-goku-ultra.webp', alt: 'White Goku graphic tee',
    colors: [{ name: 'Off White', value: '#F2EFE8' }, { name: 'Black', value: '#161616' }], sizes: sharedSizes,
  },
  {
    id: 'tanjiro-hinokami-tee', name: 'Tanjiro Hinokami Tee', series: 'Demon Slayer', price: 999,
    image: '/images/product-tanjiro-hinokami.webp', alt: 'Black Tanjiro flame graphic tee',
    colors: [{ name: 'Black', value: '#161616' }, { name: 'Blush', value: '#E5486A' }, { name: 'Off White', value: '#F2EFE8' }], sizes: sharedSizes,
  },
  {
    id: 'zoro-ink-tee', name: 'Zoro Ink Slash Tee', series: 'One Piece', price: 999,
    image: '/images/product-zoro-ink.webp', alt: 'White Zoro graphic tee',
    colors: [{ name: 'Off White', value: '#F2EFE8' }, { name: 'Black', value: '#161616' }, { name: 'Jade', value: '#1B8A6B' }], sizes: sharedSizes,
  },
]

export const newArrivals = products.filter((product) => ['naruto-sage-tee', 'sukuna-curse-tee', 'gojo-satoru-tee'].includes(product.id))
export const bestSellers = products.filter((product) => ['zenitsu-thunder-tee', 'tanjiro-breath-tee', 'luffy-gear-5-tee'].includes(product.id))

export function getProduct(id) {
  return products.find((product) => product.id === id)
}
