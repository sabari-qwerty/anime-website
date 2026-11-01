import { useId } from 'react'
import { LuPackage, LuRefreshCw, LuShieldCheck, LuTruck } from 'react-icons/lu'

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

const defaultBenefits = [
  {
    id: 'free-shipping',
    title: 'Free Shipping',
    description: 'On orders above ₹1,499',
    icon: <LuTruck />,
  },
  {
    id: 'premium-quality',
    title: 'Premium Quality',
    description: 'Cotton fabric & lasting prints',
    icon: <LuShieldCheck />,
  },
  {
    id: 'cod',
    title: 'COD Available',
    description: 'Across India',
    icon: <LuPackage />,
  },
  {
    id: 'easy-returns',
    title: 'Easy Returns',
    description: '7 day hassle free returns',
    icon: <LuRefreshCw />,
  },
]

/**
 * Reusable "limited drop" promotional banner — editorial copy on paper with a
 * full-bleed illustration, vertical Japanese type, and an ink seal.
 *
 * @param {object} props
 * @param {string} [props.eyebrow]
 * @param {string | string[]} [props.titleLines] Each entry renders as its own line. The accent is appended to the last line.
 * @param {string} [props.accent]
 * @param {string} [props.description]
 * @param {string} [props.ctaLabel]
 * @param {string} [props.ctaHref]
 * @param {(event: React.MouseEvent<HTMLAnchorElement>) => void} [props.onCtaClick]
 * @param {string} [props.image]
 * @param {string} [props.imageAlt]
 * @param {string} [props.imagePosition] Tailwind object-position utilities for art-directed cropping.
 * @param {string} [props.verticalText] Decorative vertical Japanese type shown beside the artwork.
 * @param {string} [props.sealText] Single glyph inside the red seal stamp.
 * @param {Array<{ id?: string, title: string, description: string, icon?: React.ReactNode }>} [props.benefits] Trust strip rendered below the banner. Pass an empty array to hide it.
 * @param {string} [props.id]
 * @param {string} [props.className]
 */
export default function LimitedDrop({
  eyebrow = 'Limited Drop',
  titleLines = ['Wear', 'Your Fandom'],
  accent = '.',
  description = 'Exclusive designs. Limited quantities.',
  ctaLabel = 'Shop Limited Drop',
  ctaHref = '#',
  onCtaClick,
  image,
  imageAlt = '',
  imagePosition = 'object-[86%_30%] sm:object-[80%_32%] lg:object-[72%_36%]',
  verticalText = '',
  sealText = '',
  benefits = defaultBenefits,
  id,
  className = '',
}) {
  const headingId = useId()
  const lines = Array.isArray(titleLines) ? titleLines : [titleLines]

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`relative bg-paper py-8 font-body text-ink sm:py-10 lg:py-14 ${className}`}
    >
      <div className="mx-auto w-full max-w-[1680px] px-5 sm:px-8 lg:px-16 xl:px-20">
        <div className="overflow-hidden rounded-[1.5rem] border border-ink/[0.07] bg-surface shadow-soft sm:rounded-[1.75rem]">
          <div className="group relative isolate flex min-h-[24rem] flex-col justify-end overflow-hidden bg-[#F3F0EB] sm:min-h-[26rem] lg:min-h-[30rem] lg:justify-center">
            {image ? (
              <img
                src={image}
                alt={imageAlt}
                loading="lazy"
                decoding="async"
                className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02] ${imagePosition}`}
              />
            ) : null}

            {/* Readability washes: vertical + copy-side paper on small screens, horizontal on desktop. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(247,246,242,0.02)_0%,rgba(247,246,242,0.12)_24%,rgba(247,246,242,0.78)_50%,rgba(247,246,242,0.97)_68%,#F7F6F2_100%)] lg:hidden"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(247,246,242,0.92)_0%,rgba(247,246,242,0.82)_25%,rgba(247,246,242,0.5)_50%,rgba(247,246,242,0.15)_70%,rgba(247,246,242,0)_88%)] sm:hidden"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(90deg,#F7F6F2_0%,rgba(247,246,242,0.97)_27%,rgba(247,246,242,0.9)_41%,rgba(247,246,242,0.5)_55%,rgba(247,246,242,0.08)_69%,rgba(247,246,242,0)_79%)] lg:block"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 hidden w-24 bg-[linear-gradient(270deg,#F7F6F2_0%,rgba(247,246,242,0.9)_34%,rgba(247,246,242,0.4)_66%,rgba(247,246,242,0)_100%)] sm:block lg:w-28"
            />
            <div
              aria-hidden="true"
              className="paper-grain pointer-events-none absolute inset-0 opacity-[0.32]"
            />

            <div className="relative z-10 max-w-[34rem] px-6 pb-8 pt-24 sm:px-9 sm:pb-11 sm:pt-28 lg:max-w-[43rem] lg:px-12 lg:py-16 xl:px-16">
              <p className="text-[10px] font-semibold uppercase tracking-label text-ink/50 sm:text-[11px]">
                {eyebrow}
              </p>

              <h2
                id={headingId}
                className="mt-4 font-heading text-[2.6rem] font-extrabold leading-[0.92] tracking-tightest text-ink sm:mt-5 sm:text-[3.75rem] lg:text-[5rem] xl:text-[5.5rem]"
              >
                {lines.map((line, index) => (
                  <span key={`${line}-${index}`} className="block">
                    {line}
                    {index === lines.length - 1 && accent ? (
                      <span
                        aria-hidden="true"
                        className="-ml-[0.055em] text-brand"
                      >
                        {accent}
                      </span>
                    ) : null}
                  </span>
                ))}
              </h2>

              <p className="mt-4 max-w-[22rem] text-[13px] leading-[1.7] text-ink/55 sm:mt-5 sm:text-sm">
                {description}
              </p>

              <a
                href={ctaHref}
                onClick={onCtaClick}
                className="group/cta mt-6 inline-flex items-center gap-3 rounded-pill bg-ink px-6 py-3.5 text-[11px] font-semibold tracking-[0.02em] text-white transition-colors duration-300 hover:bg-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand sm:mt-8 sm:px-7 sm:py-4 sm:text-[12px]"
              >
                {ctaLabel}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
              </a>
            </div>

            {verticalText || sealText ? (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute right-5 top-7 z-10 hidden flex-col items-center gap-4 sm:flex lg:right-8 lg:top-8 lg:gap-5"
              >
                {verticalText ? (
                  <p
                    style={{ writingMode: 'vertical-rl' }}
                    className="font-japanese text-[11px] leading-[1.9] tracking-[0.32em] text-ink/65 lg:text-[13px]"
                  >
                    {verticalText}
                  </p>
                ) : null}

                {sealText ? (
                  <span className="grid h-6 w-6 place-items-center rounded-[3px] bg-brand font-japanese text-[12px] leading-none text-white shadow-red lg:h-7 lg:w-7 lg:text-[13px]">
                    {sealText}
                  </span>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>

        {benefits.length > 0 ? (
          <ul className="mt-6 grid grid-cols-2 sm:mt-8 lg:grid-cols-4">
            {benefits.map((benefit, index) => {
              const dividerClass = [
                index % 2 === 1 ? 'border-l' : '',
                index >= 2 ? 'border-t lg:border-t-0' : '',
                index > 0 && index % 2 === 0 ? 'lg:border-l' : '',
              ]
                .filter(Boolean)
                .join(' ')

              return (
                <li
                  key={benefit.id ?? benefit.title}
                  className={`flex items-center gap-3 border-ink/20 px-4 py-4 sm:gap-4 sm:px-6 sm:py-5 lg:px-8 lg:py-6 xl:px-10 ${dividerClass}`}
                >
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-ink [&>svg]:h-7 [&>svg]:w-7 lg:[&>svg]:h-8 lg:[&>svg]:w-8"
                  >
                    {benefit.icon}
                  </span>

                  <div className="min-w-0">
                    <p className="text-xs font-semibold leading-tight text-ink sm:text-[13px]">
                      {benefit.title}
                    </p>
                    <p className="mt-1 text-[10px] leading-[1.5] text-ink/45 sm:text-[11px]">
                      {benefit.description}
                    </p>
                  </div>
                </li>
              )
            })}
          </ul>
        ) : null}
      </div>
    </section>
  )
}
