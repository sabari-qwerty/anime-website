import { useId } from 'react'
import { ProductCard } from './BestSellers'

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

/**
 * Reusable "New Arrivals" product section. Reuses the shared ProductCard so
 * cards, wishlist behaviour, pricing, and colour swatches stay consistent.
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
export default function NewArrivals({
  items = [],
  title = 'New Arrivals',
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
