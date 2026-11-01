import { useId, useState } from 'react'
import { Link } from 'react-router-dom'

function ArrowRight({ className = 'h-4 w-4' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  )
}

function Heart({ filled, className = 'h-4 w-4' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0 0-7.8Z" />
    </svg>
  )
}

function formatPrice(price) {
  if (typeof price === 'string') return price
  if (typeof price !== 'number') return null

  return `₹${price.toLocaleString('en-IN')}`
}

function ColorSwatches({ colors, name }) {
  if (!colors?.length) return null

  const colorNames = colors.map((color) => color.name).join(', ')

  return (
    <div
      role="group"
      aria-label={`Available colors for ${name}: ${colorNames}`}
      className="flex shrink-0 items-center gap-1.5 pt-1"
    >
      {colors.map((color) => (
        <span
          key={color.name}
          aria-hidden="true"
          title={color.name}
          className="h-2.5 w-2.5 rounded-full ring-1 ring-ink/15 sm:h-3 sm:w-3"
          style={{ backgroundColor: color.value }}
        />
      ))}
    </div>
  )
}

/**
 * Single product card used by BestSellers.
 *
 * @param {object} props
 * @param {object} props.product
 * @param {(product: object, wishlisted: boolean) => void} [props.onWishlistToggle]
 */
export function ProductCard({ product, onWishlistToggle }) {
  const [wishlisted, setWishlisted] = useState(false)
  const price = formatPrice(product.price)

  const handleWishlistToggle = () => {
    setWishlisted((current) => {
      const next = !current
      onWishlistToggle?.(product, next)
      return next
    })
  }

  return (
    <article className="relative min-w-0">
      <Link
        to={`/product/${product.id}`}
        className="group block rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
      >
        <span className="relative block aspect-[3/4] overflow-hidden rounded-2xl border border-ink/[0.06] bg-paper-200">
          <img
            src={product.image}
            alt={product.alt ?? `${product.name} product photo`}
            width="800"
            height="1067"
            loading="lazy"
            decoding="async"
            className={`h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035] ${
              product.imagePosition ?? 'object-center'
            }`}
          />
        </span>

        <div className="mt-3.5 flex items-start justify-between gap-2.5">
          <div className="min-w-0">
            <h3 className="text-[11px] font-medium leading-[1.35] text-ink transition-colors duration-300 group-hover:text-brand sm:text-[13px]">
              {product.name}
            </h3>
            {price ? (
              <p className="mt-1 font-heading text-[13px] font-bold tracking-tight text-ink sm:text-sm">
                {price}
              </p>
            ) : null}
          </div>

          <ColorSwatches colors={product.colors} name={product.name} />
        </div>
      </Link>

      <button
        type="button"
        onClick={handleWishlistToggle}
        aria-pressed={wishlisted}
        aria-label={
          wishlisted
            ? `Remove ${product.name} from wishlist`
            : `Add ${product.name} to wishlist`
        }
        className={`absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/90 shadow-[0_2px_10px_rgba(17,17,17,0.08)] ring-1 ring-ink/[0.05] backdrop-blur-sm transition-[color,transform] duration-300 active:scale-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:h-10 sm:w-10 ${
          wishlisted ? 'text-brand' : 'text-ink/55 hover:text-brand'
        }`}
      >
        <Heart filled={wishlisted} className="h-4 w-4 sm:h-[1.1rem] sm:w-[1.1rem]" />
      </button>
    </article>
  )
}

/**
 * Reusable "Best Sellers" product section.
 *
 * @param {object} props
 * @param {Array<{
 *   id?: string,
 *   name: string,
 *   price?: number | string,
 *   image: string,
 *   alt?: string,
 *   href?: string,
 *   imagePosition?: string,
 *   colors?: Array<{ name: string, value: string }>
 * }>} props.items
 * @param {string} props.title
 * @param {string} props.viewAllLabel
 * @param {string} [props.viewAllHref]
 * @param {string} [props.id]
 * @param {string} [props.className]
 * @param {(product: object, wishlisted: boolean) => void} [props.onWishlistToggle]
 */
export default function BestSellers({
  items = [],
  title = 'Best Sellers',
  viewAllLabel = 'View All',
  viewAllHref = '#',
  id,
  className = '',
  onWishlistToggle,
}) {
  const headingId = useId()

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`relative border-t border-line bg-paper py-12 font-body text-ink sm:py-16 lg:py-20 ${className}`}
    >
      <div className="mx-auto w-full max-w-[1680px] px-5 sm:px-8 lg:px-16 xl:px-20">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <h2
            id={headingId}
            className="font-heading text-[1.7rem] font-extrabold uppercase leading-none tracking-[-0.045em] text-ink sm:text-[2.1rem] lg:text-[2.35rem]"
          >
            {title}
            <span aria-hidden="true" className="text-brand">
              .
            </span>
          </h2>

          {viewAllHref ? (
            <a
              href={viewAllHref}
              className="group ml-auto inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/60 transition-colors duration-300 hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand sm:text-[11px]"
            >
              {viewAllLabel}
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          ) : null}
        </div>

        <ul className="mt-9 grid grid-cols-2 gap-x-3 gap-y-8 sm:mt-10 sm:gap-x-5 sm:gap-y-10 lg:mt-12 lg:grid-cols-4 lg:gap-x-5 xl:gap-x-6">
          {items.map((product) => (
            <li key={product.id ?? product.name} className="min-w-0">
              <ProductCard
                product={product}
                onWishlistToggle={onWishlistToggle}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
