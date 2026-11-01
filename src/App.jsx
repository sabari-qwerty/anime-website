import { useEffect, useState } from 'react'
import {
  FaInstagram,
  FaPinterestP,
  FaXTwitter,
  FaYoutube,
} from 'react-icons/fa6'
import {
  LuMenu,
  LuSearch,
  LuShoppingBag,
  LuUserRound,
  LuX,
} from 'react-icons/lu'
import BestSellers from './components/BestSellers'
import LimitedDrop from './components/LimitedDrop'
import NewArrivals from './components/NewArrivals'
import ShopByAnime from './components/ShopByAnime'

const slides = [
  {
    id: '01',
    name: 'Naruto Enso',
    series: 'Ink Series',
    image: '/images/hero-naruto-enso.webp',
  },
  {
    id: '02',
    name: 'Touseled',
    series: 'Midnight Series',
    image: '/images/hero-touseled.webp',
  },
  {
    id: '03',
    name: 'Samurai',
    series: 'Ronin Series',
    image: '/images/hero-samurai.webp',
  },
]

const stats = [
  { value: '100+', label: 'Unique Designs' },
  { value: 'Premium', label: 'Cotton Fabric' },
  { value: 'COD', label: 'Across India' },
  { value: '7 Days', label: 'Easy Returns' },
]

const features = [
  {
    eyebrow: 'New Arrivals',
    title: 'Fresh Drops',
    image: '/images/feature-fresh-drops.webp',
    alt: 'Zenitsu illustration surrounded by lightning and crimson ink',
    position: 'object-[78%_42%]',
    width: 1400,
    height: 700,
  },
  {
    eyebrow: 'Shop by Anime',
    title: 'Find Your World',
    image: '/images/feature-find-your-world.webp',
    alt: 'Itachi-inspired crimson ink illustration',
    position: 'object-[72%_38%]',
    width: 1400,
    height: 700,
  },
  {
    eyebrow: 'Premium Fabric',
    title: 'Made to Last',
    image: '/images/feature-made-to-last.webp',
    alt: 'Close-up of layered knit fabric folds',
    position: 'object-[60%_38%]',
    width: 1400,
    height: 788,
  },
]

const animeSeries = [
  {
    name: 'One Piece',
    image: '/images/anime-one-piece.webp',
    alt: 'Luffy grinning in his straw hat, framed by ink splashes',
    href: '#collection',
  },
  {
    name: 'Naruto',
    image: '/images/anime-naruto.webp',
    alt: 'Naruto in his leaf headband against crimson brushstrokes',
    href: '#collection',
  },
  {
    name: 'Jujutsu Kaisen',
    image: '/images/anime-jujutsu-kaisen.webp',
    alt: 'Blindfolded Gojo Satoru in monochrome ink',
    href: '#collection',
  },
  {
    name: 'Solo Leveling',
    image: '/images/anime-solo-leveling.webp',
    alt: 'Sung Jinwoo in monochrome ink',
    href: '#collection',
  },
  {
    name: 'Blue Lock',
    image: '/images/anime-blue-lock.webp',
    alt: 'Isagi with glowing blue puzzle eyes',
    href: '#collection',
  },
  {
    name: 'Dragon Ball',
    image: '/images/anime-dragon-ball.webp',
    alt: 'Super Saiyan Goku surrounded by a monochrome ink aura',
    href: '#collection',
  },
]

const newArrivals = [
  {
    id: 'naruto-sage-tee',
    name: 'Naruto Sage Tee',
    price: 999,
    image: '/images/product-naruto-sage.webp',
    alt: 'Black Naruto tee with a glowing orange sage cloak and sword graphic',
    href: '#collection',
    colors: [
      { name: 'Black', value: '#161616' },
      { name: 'Ember', value: '#E8611C' },
      { name: 'Off White', value: '#F2EFE8' },
    ],
  },
  {
    id: 'sukuna-curse-tee',
    name: 'Sukuna Curse Tee',
    price: 999,
    image: '/images/product-sukuna-curse.webp',
    alt: 'Off-white tee with a black cursed skull and reaching hand graphic',
    href: '#collection',
    colors: [
      { name: 'Off White', value: '#F2EFE8' },
      { name: 'Ink', value: '#161616' },
      { name: 'Crimson', value: '#B32025' },
    ],
  },
  {
    id: 'dragon-fist-tee',
    name: 'Dragon Fist Tee',
    price: 999,
    image: '/images/product-dragon-fist.webp',
    alt: 'Black Dragon Ball tee with a silver-haired fighter and golden dragon graphic',
    href: '#collection',
    colors: [
      { name: 'Black', value: '#161616' },
      { name: 'Gold', value: '#D9A21B' },
      { name: 'Off White', value: '#F2EFE8' },
    ],
  },
  {
    id: 'goku-ultra-tee',
    name: 'Goku Ultra Tee',
    price: 999,
    image: '/images/product-goku-ultra.webp',
    alt: 'White Goku tee with a red kanji and black ink battle illustration',
    href: '#collection',
    colors: [
      { name: 'Off White', value: '#F2EFE8' },
      { name: 'Black', value: '#161616' },
    ],
  },
]

const bestSellers = [
  {
    id: 'zenitsu-thunder-tee',
    name: 'Zenitsu Thunder Tee',
    price: 999,
    image: '/images/product-zenitsu-thunder.webp',
    alt: 'Black Zenitsu graphic tee with a gold lightning-striped haori print',
    href: '#collection',
    colors: [
      { name: 'Black', value: '#161616' },
      { name: 'Gold', value: '#E8A317' },
    ],
  },
  {
    id: 'tanjiro-hinokami-tee',
    name: 'Tanjiro Hinokami Tee',
    price: 999,
    image: '/images/product-tanjiro-hinokami.webp',
    alt: 'Black tee with a Tanjiro flame-and-moon graphic',
    href: '#collection',
    colors: [
      { name: 'Black', value: '#161616' },
      { name: 'Blush', value: '#E5486A' },
      { name: 'Off White', value: '#F2EFE8' },
    ],
  },
  {
    id: 'tanjiro-breath-tee',
    name: 'Tanjiro Breath Tee',
    price: 999,
    image: '/images/product-tanjiro-breath.webp',
    alt: 'Black Tanjiro tee with a green checkered haori and Japanese lettering',
    href: '#collection',
    colors: [
      { name: 'Black', value: '#161616' },
      { name: 'Forest', value: '#1F7A4D' },
      { name: 'Crimson', value: '#D42A4C' },
    ],
  },
  {
    id: 'zoro-ink-tee',
    name: 'Zoro Ink Slash Tee',
    price: 999,
    image: '/images/product-zoro-ink.webp',
    alt: 'White Zoro graphic tee with green and black ink brushwork',
    href: '#collection',
    colors: [
      { name: 'Off White', value: '#F2EFE8' },
      { name: 'Black', value: '#161616' },
      { name: 'Jade', value: '#1B8A6B' },
    ],
  },
]

const autoplayDelay = 30000

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

function SlideImages({ active, imageClassName = '' }) {
  return slides.map((slide, index) => (
    <img
      key={slide.id}
      src={slide.image}
      alt=""
      width="1846"
      height="852"
      draggable="false"
      fetchPriority={index === 0 ? 'high' : 'auto'}
      decoding="async"
      className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        active === index
          ? 'scale-100 opacity-100'
          : 'scale-[1.035] opacity-0'
      } ${imageClassName}`}
    />
  ))
}

function FeatureCard({ feature }) {
  return (
    <article className="group relative isolate flex min-h-[15rem] flex-col justify-between overflow-hidden rounded-2xl border border-ink/[0.05] bg-[#F3F1EE] p-5 sm:min-h-[15.5rem] sm:p-6 xl:aspect-[8/5] xl:min-h-[16rem]">
      <img
        src={feature.image}
        alt={feature.alt}
        width={feature.width}
        height={feature.height}
        loading="eager"
        fetchPriority="low"
        decoding="async"
        className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025] ${feature.position}`}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(243,241,238,0.88)_0%,rgba(243,241,238,0.82)_20%,rgba(243,241,238,0.58)_36%,rgba(243,241,238,0.22)_54%,rgba(243,241,238,0.02)_70%,rgba(243,241,238,0)_82%)]" />

      <div className="relative z-10 max-w-[72%]">
        <p className="text-[10px] font-medium tracking-[0.01em] text-ink/45 sm:text-[11px]">
          {feature.eyebrow}
        </p>
        <h3 className="mt-3 font-heading text-[1.6rem] font-bold leading-[1.02] tracking-[-0.045em] text-ink sm:text-[1.75rem] xl:text-[2rem] 2xl:text-[2.25rem]">
          {feature.title}
        </h3>
      </div>

      <span
        aria-hidden="true"
        className="relative z-10 mt-8 grid h-11 w-11 place-items-center rounded-full bg-white text-ink shadow-[0_4px_16px_rgba(17,17,17,0.08)] ring-1 ring-ink/[0.03] sm:h-12 sm:w-12"
      >
        <ArrowRight className="h-4 w-4" />
      </span>
    </article>
  )
}

function App() {
  const [active, setActive] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const slide = slides[active]

  const goTo = (index) => {
    setActive((index + slides.length) % slides.length)
  }

  const showPrevious = () => {
    setActive((current) => (current - 1 + slides.length) % slides.length)
  }

  const showNext = () => {
    setActive((current) => (current + 1) % slides.length)
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') showPrevious()
      if (event.key === 'ArrowRight') showNext()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setActive((current) => (current + 1) % slides.length)
    }, autoplayDelay)

    return () => window.clearTimeout(timer)
  }, [active])

  return (
    <>
      <header className="relative z-30 border-b border-ink/[0.07] bg-paper font-body text-ink">
        <div className="mx-auto flex min-h-[4.75rem] w-full max-w-[1680px] items-center gap-6 px-5 sm:px-8 lg:px-16 xl:px-20">
          <a
            href="#"
            aria-label="Manga Mart home"
            className="shrink-0 font-heading text-[1.3rem] font-extrabold uppercase leading-[0.8] tracking-[-0.08em]"
          >
            <span className="block">Manga</span>
            <span className="block">Mart<span className="text-brand">.</span></span>
            <span className="mt-1 block text-[0.4rem] tracking-[0.24em] text-ink/50">
              マンガマート
            </span>
          </a>

          <nav aria-label="Primary navigation" className="hidden flex-1 items-center justify-center gap-7 lg:flex xl:gap-9">
            {[
              ['Home', '/'],
              ['About', '/about'],
              ['Cart', '/cart'],
              ['Contact Us', '/contact'],
              ['Gallery', '/gallery'],
              ['Products', '/gallery'],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="text-[10px] font-medium text-ink/65 transition-colors hover:text-brand xl:text-[11px]"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-3 sm:gap-4">
            <form
              className="hidden h-9 w-40 items-center gap-2 rounded-full bg-ink/[0.045] px-3 text-ink/40 xl:flex xl:w-48"
              onSubmit={(event) => event.preventDefault()}
            >
              <label htmlFor="site-search" className="sr-only">
                Search anime tees
              </label>
              <LuSearch aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
              <input
                id="site-search"
                type="search"
                placeholder="Search anime tees..."
                className="min-w-0 flex-1 bg-transparent text-[10px] text-ink outline-none placeholder:text-ink/35"
              />
            </form>
            <a
              href="#account"
              aria-label="Account"
              className="hidden text-ink/70 transition-colors hover:text-brand sm:block"
            >
              <LuUserRound className="h-[1.1rem] w-[1.1rem]" />
            </a>
            <a
              href="/cart"
              aria-label="Shopping bag"
              className="relative text-ink/70 transition-colors hover:text-brand"
            >
              <LuShoppingBag className="h-[1.1rem] w-[1.1rem]" />
              <span className="absolute -right-2 -top-2 grid h-3.5 min-w-3.5 place-items-center rounded-full bg-brand px-1 text-[8px] font-semibold leading-none text-white">
                0
              </span>
            </a>
            <button
              type="button"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="grid h-9 w-9 place-items-center rounded-full border border-ink/10 text-ink/70 transition-colors hover:border-ink/30 hover:text-brand lg:hidden"
            >
              {mobileMenuOpen ? <LuX className="h-4 w-4" /> : <LuMenu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen ? (
          <nav aria-label="Mobile navigation" className="border-t border-ink/[0.07] px-5 py-4 sm:px-8 lg:hidden">
            <div className="grid gap-3">
              {[
                ['Home', '/'],
                ['About', '/about'],
                ['Cart', '/cart'],
                ['Contact Us', '/contact'],
                ['Gallery', '/gallery'],
                ['Products', '/gallery'],
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs font-medium text-ink/70 transition-colors hover:text-brand"
                >
                  {label}
                </a>
              ))}
            </div>
          </nav>
        ) : null}
      </header>

      <section
        role="region"
        aria-roledescription="carousel"
        aria-label="Featured collection"
        className="relative isolate min-h-0 w-full overflow-hidden bg-paper font-body text-ink xl:min-h-svh"
      >
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        Slide {active + 1} of {slides.length}: {slide.name}, {slide.series}.
      </p>

      <div
        className="pointer-events-none absolute inset-0 hidden xl:block"
        aria-hidden="true"
      >
        <SlideImages active={active} imageClassName="object-[38%_center]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#F7F6F2_0%,rgba(247,246,242,0.98)_18%,rgba(247,246,242,0.88)_32%,rgba(247,246,242,0.35)_44%,rgba(247,246,242,0)_53%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(247,246,242,0.3)_0%,transparent_18%,transparent_82%,rgba(17,17,17,0.025)_100%)]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-0 w-full max-w-[1680px] flex-col px-8 pb-8 pt-8 sm:px-10 sm:pt-10 lg:px-16 lg:pb-12 lg:pt-14 xl:min-h-svh xl:px-20">
        <div className="xl:flex xl:flex-1 xl:items-center">
          <div className="w-full max-w-none xl:max-w-[42rem]">
            <p className="hero-reveal font-body text-[10px] font-semibold uppercase leading-[1.9] tracking-label text-ink/45 sm:text-[11px]">
              <span className="block">Anime streetwear</span>
              <span className="block">For everyday life</span>
            </p>

            <h1 className="hero-reveal hero-reveal-delay-1 mt-5 font-heading text-[clamp(4.1rem,18vw,5.9rem)] font-extrabold leading-[0.88] tracking-tightest text-ink sm:mt-6 sm:text-[clamp(4.75rem,11vw,6.75rem)] lg:text-[clamp(4.5rem,7vw,7.75rem)]">
              <span className="block">More Than</span>
              <span className="block">
                Anime<span className="text-brand">.</span>
              </span>
            </h1>

            <p className="hero-reveal hero-reveal-delay-2 mt-6 max-w-[27rem] text-sm leading-[1.7] text-ink/55 sm:mt-7 sm:text-base">
              Premium anime-inspired t-shirts for fans who live different
              stories.
            </p>

            <a
              href="#collection"
              className="hero-reveal hero-reveal-delay-3 group mt-7 inline-flex items-center gap-4 rounded-pill bg-ink px-6 py-3.5 text-[12px] font-semibold tracking-[0.02em] text-white transition-colors duration-300 hover:bg-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand sm:mt-8 sm:px-7 sm:py-4 sm:text-[13px]"
            >
              Shop Collection
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        <div className="mt-9 grid w-full grid-cols-2 gap-y-6 border-t border-ink/10 pt-6 sm:grid-cols-4 sm:gap-y-0 xl:mt-0 xl:border-t-0 xl:pt-0">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={
                index === 0
                  ? ''
                  : 'sm:border-l sm:border-ink/10 sm:pl-5 lg:pl-6'
              }
            >
              <p className="font-heading text-[13px] font-bold tracking-tight text-ink sm:text-sm">
                {stat.value}
              </p>
              <p className="mt-0.5 text-[10px] tracking-[0.06em] text-ink/40">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute right-5 top-24 z-20 hidden flex-col items-end gap-5 xl:flex">
        {slides.map((item, index) => {
          const isActive = active === index

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Show slide ${index + 1}: ${item.name}`}
              aria-current={isActive ? 'true' : undefined}
              className="group flex items-center justify-end gap-3"
            >
              <span
                className={`h-px bg-ink transition-all duration-500 ${
                  isActive
                    ? 'w-8 opacity-100'
                    : 'w-4 opacity-20 group-hover:opacity-60'
                }`}
              />
              <span
                className={`font-body text-[10px] tracking-[0.18em] transition-colors duration-300 ${
                  isActive
                    ? 'text-ink'
                    : 'text-ink/30 group-hover:text-ink/70'
                }`}
              >
                {item.id}
              </span>
            </button>
          )
        })}
      </div>

      <p className="absolute right-5 top-[14rem] z-20 hidden text-right text-[8px] uppercase leading-[1.7] tracking-[0.22em] text-ink/35 xl:block">
        Good anime
        <br />
        Good people
      </p>
      </section>

      <section
        id="collection"
        aria-labelledby="collection-heading"
        className="relative scroll-mt-6 bg-paper py-10 font-body text-ink sm:py-12 lg:py-16"
      >
        <div className="mx-auto w-full max-w-[1680px] px-5 sm:px-8 lg:px-16 xl:px-20">
          <h2 id="collection-heading" className="sr-only">
            Explore the collection
          </h2>

          <div className="grid gap-3 sm:gap-4 lg:grid-cols-3 xl:gap-5">
            {features.map((feature) => (
              <FeatureCard key={feature.title} feature={feature} />
            ))}
          </div>
        </div>
      </section>

      <ShopByAnime
        id="shop-by-anime"
        items={animeSeries}
        viewAllHref="#collection"
      />



      <BestSellers
        id="best-sellers"
        items={bestSellers}
        viewAllHref="#collection"
      />

      <LimitedDrop
        id="limited-drop"
        image="/images/feature-find-your-world.webp"
        imageAlt="Itachi Uchiha in an Akatsuki cloak before a crimson sun"
        verticalText="うちはイタチ"
        sealText="暁"
        ctaHref="#best-sellers"
      />

      <NewArrivals
        id="new-arrivals"
        items={newArrivals}
        viewAllHref="#collection"
      />

      <section
        id="our-story"
        aria-labelledby="our-story-heading"
        className="relative isolate overflow-hidden bg-paper font-body text-ink"
      >
        <div className="relative min-h-[30rem] overflow-hidden sm:min-h-[34rem] lg:min-h-[38rem]">
          <img
            src="/images/story-luffy-mountain.png"
            alt="Ink-style illustration of a straw-hat anime adventurer looking over snowy mountains"
            width="2048"
            height="683"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(90deg,#F7F6F2_0%,rgba(247,246,242,0.98)_24%,rgba(247,246,242,0.83)_38%,rgba(247,246,242,0.3)_53%,rgba(247,246,242,0)_70%)]"
          />
          <div
            aria-hidden="true"
            className="paper-grain pointer-events-none absolute inset-0 opacity-[0.18]"
          />

          <div className="relative z-10 mx-auto flex min-h-[30rem] w-full max-w-[1680px] items-center px-5 py-12 sm:min-h-[34rem] sm:px-8 lg:min-h-[38rem] lg:px-16 xl:px-20">
            <div className="max-w-[24rem] sm:max-w-[28rem] lg:max-w-[31rem]">
              <p className="text-[10px] font-semibold uppercase tracking-label text-ink/50 sm:text-[11px]">
                Our story
              </p>
              <h2
                id="our-story-heading"
                className="mt-4 font-heading text-[clamp(3.4rem,10vw,6rem)] font-extrabold leading-[0.86] tracking-tightest text-ink"
              >
                <span className="block">Same</span>
                <span className="block">
                  Passion<span className="text-brand">.</span>
                </span>
                <span className="block">Different</span>
                <span className="block">
                  Stories<span className="text-brand">.</span>
                </span>
              </h2>
              <p className="mt-5 max-w-[22rem] text-sm leading-[1.7] text-ink/55 sm:text-base">
                Anime is not just entertainment. It’s a feeling, a community,
                a part of who we are.
              </p>
              <a
                href="#collection"
                className="group mt-7 inline-flex items-center gap-3 rounded-pill bg-ink px-6 py-3.5 text-[11px] font-semibold tracking-[0.02em] text-white transition-colors duration-300 hover:bg-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand sm:mt-8 sm:px-7 sm:py-4 sm:text-[12px]"
              >
                Explore the collection
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-ink/[0.08] bg-paper px-5 py-10 font-body text-ink sm:px-8 sm:py-12 lg:px-16 lg:py-14 xl:px-20">
        <div className="mx-auto w-full max-w-[1680px]">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.1fr_0.8fr_0.8fr_0.8fr_1.4fr] lg:gap-8">
            <div>
              <a
                href="#"
                className="inline-block font-heading text-[1.35rem] font-extrabold uppercase leading-[0.82] tracking-[-0.08em] text-ink"
                aria-label="Manga Mart home"
              >
                <span className="block">Manga</span>
                <span className="block">Mart<span className="text-brand">.</span></span>
                <span className="mt-1 block text-[0.43rem] tracking-[0.24em] text-ink/55">
                  マンガマート
                </span>
              </a>
            </div>

            <FooterLinks
              title="Shop"
              links={['T-Shirts', 'Hoodies', 'Collections', 'New Arrivals']}
            />
            <FooterLinks
              title="Help"
              links={['Contact Us', 'Shipping', 'Returns', 'FAQs']}
            />
            <FooterLinks
              title="About"
              links={['Our Story', 'Sustainability', 'Blog', 'Careers']}
            />

            <div className="max-w-[22rem]">
              <h2 className="text-[11px] font-semibold text-ink sm:text-xs">
                Join the crew
              </h2>
              <p className="mt-1.5 text-[10px] leading-[1.5] text-ink/45 sm:text-[11px]">
                Get exclusive drops, offers and updates.
              </p>
              <form
                className="mt-4 flex items-center rounded-full border border-ink/10 bg-white/40 p-1"
                onSubmit={(event) => event.preventDefault()}
              >
                <label htmlFor="footer-email" className="sr-only">
                  Your email
                </label>
                <input
                  id="footer-email"
                  type="email"
                  placeholder="Your email"
                  className="min-w-0 flex-1 bg-transparent px-3 text-[10px] text-ink outline-none placeholder:text-ink/35"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ink text-white transition-colors hover:bg-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                >
                  <ArrowRight className="h-3 w-3" />
                </button>
              </form>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-6 border-t border-ink/[0.08] pt-5 sm:mt-16 sm:flex-row sm:items-end sm:justify-between">
            <p className="text-[9px] text-ink/45 sm:text-[10px]">
              © 2026 MANGA MART. All rights reserved.
            </p>
            <div className="flex items-center gap-5 text-[13px] text-ink/55">
              <a href="#" aria-label="Instagram" className="transition-colors hover:text-brand">
                <FaInstagram aria-hidden="true" />
              </a>
              <a href="#" aria-label="YouTube" className="transition-colors hover:text-brand">
                <FaYoutube aria-hidden="true" />
              </a>
              <a href="#" aria-label="X" className="transition-colors hover:text-brand">
                <FaXTwitter aria-hidden="true" />
              </a>
              <a href="#" aria-label="Pinterest" className="transition-colors hover:text-brand">
                <FaPinterestP aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

function FooterLinks({ title, links }) {
  return (
    <div>
      <h2 className="text-[11px] font-semibold text-ink sm:text-xs">{title}</h2>
      <ul className="mt-2.5 space-y-1.5">
        {links.map((link) => (
          <li key={link}>
            <a
              href={link === 'Contact Us' ? '/contact' : '#collection'}
              className="text-[10px] text-ink/50 transition-colors hover:text-brand sm:text-[11px]"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
