import { useId } from 'react'

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
 * Reusable "Shop by Anime" section.
 *
 * @param {object} props
 * @param {Array<{ id?: string, name: string, image: string, alt?: string, href?: string }>} props.items
 * @param {string} props.title
 * @param {string} props.viewAllLabel
 * @param {string} [props.viewAllHref]
 * @param {string} [props.id]
 * @param {string} [props.className]
 */
export default function ShopByAnime({
  items = [],
  title = 'Shop by Anime',
  viewAllLabel = 'View All',
  viewAllHref = '#',
  id,
  className = '',
}) {
  const headingId = useId()

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`relative border-t border-line bg-surface py-12 font-body text-ink sm:py-16 lg:py-20 ${className}`}
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

        <ul className="mt-9 grid grid-cols-2 gap-x-4 gap-y-9 sm:mt-10 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-10 lg:mt-12 xl:grid-cols-6 xl:gap-x-7">
          {items.map((item) => (
            <li key={item.id ?? item.name} className="min-w-0">
              <a
                href={item.href ?? '#'}
                className="group mx-auto block w-full max-w-[13.5rem] rounded-2xl text-center transition-transform duration-500 ease-out hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
              >
                <span className="relative block aspect-square overflow-hidden rounded-full border border-ink/10 bg-paper-200 transition-[border-color,box-shadow] duration-500 group-hover:border-brand/30 group-hover:shadow-[0_16px_36px_rgba(17,17,17,0.14)]">
                  <img
                    src={item.image}
                    alt={item.alt ?? `${item.name} artwork`}
                    width="700"
                    height="700"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                  />
                </span>

                <span className="mt-4 block font-heading text-[11px] font-bold uppercase leading-[1.2] tracking-[0.07em] text-ink sm:text-xs">
                  {item.name}
                </span>

                <span className="mt-1.5 inline-flex items-center gap-1.5 text-[10px] font-medium tracking-[0.01em] text-ink/45 transition-colors duration-300 group-hover:text-brand sm:text-[11px]">
                  Explore
                  <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
