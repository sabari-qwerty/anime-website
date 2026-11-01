import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { LuChevronDown, LuChevronRight, LuHeart, LuMinus, LuPlus, LuSearch } from 'react-icons/lu'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'
import { products } from '../data/products'

const galleryProducts = [
  products.find((product) => product.id === 'luffy-gear-5-tee'),
  { ...products.find((product) => product.id === 'sukuna-curse-tee'), id: 'itachi-uchiha-tee', name: 'Itachi Uchiha Tee', image: '/images/product-zoro-ink.webp', alt: 'Itachi-inspired monochrome graphic tee', series: 'Naruto' },
  { ...products.find((product) => product.id === 'dragon-fist-tee'), id: 'gojo-satoru-tee-gallery', name: 'Gojo Satoru Tee' },
  products.find((product) => product.id === 'sukuna-curse-tee'),
  products.find((product) => product.id === 'tanjiro-breath-tee'),
  products.find((product) => product.id === 'naruto-sage-tee'),
  { ...products.find((product) => product.id === 'luffy-gear-5-tee'), id: 'eren-yeager-tee', name: 'Eren Yeager Tee', image: '/images/product-description-luffy.png', alt: 'Eren-inspired monochrome graphic tee', series: 'Attack on Titan' },
  products.find((product) => product.id === 'goku-ultra-tee'),
  { ...products.find((product) => product.id === 'zoro-ink-tee'), id: 'kakashi-sensei-tee', name: 'Kakashi Sensei Tee', image: '/images/product-zoro-ink.webp', series: 'Naruto' },
  products.find((product) => product.id === 'zoro-ink-tee'),
  { ...products.find((product) => product.id === 'goku-ultra-tee'), id: 'levi-ackerman-tee', name: 'Levi Ackerman Tee', image: '/images/product-goku-ultra.webp', series: 'Attack on Titan' },
  { ...products.find((product) => product.id === 'sukuna-curse-tee'), id: 'hinata-hyuga-tee', name: 'Hinata Hyuga Tee', image: '/images/product-sukuna-curse.webp', series: 'Naruto' },
].filter(Boolean)

const categories = ['T-Shirts', 'Hoodies', 'Oversized', 'Full Sleeve']
const animeOptions = ['One Piece', 'Naruto', 'Jujutsu Kaisen', 'Attack on Titan', 'Demon Slayer', 'Dragon Ball']

function FilterCheck({ label, count, checked, onChange }) {
  return <label className="flex cursor-pointer items-center gap-3 text-xs text-ink/80"><input type="checkbox" checked={checked} onChange={onChange} className="peer sr-only" /><span className={`grid h-4 w-4 place-items-center rounded-[3px] border transition-colors ${checked ? 'border-brand bg-brand text-white' : 'border-ink/30 bg-transparent'}`}>{checked ? '✓' : ''}</span><span>{label}</span>{count ? <span className="text-ink/45">({count})</span> : null}</label>
}

function GalleryCard({ product }) {
  const [liked, setLiked] = useState(false)
  return <article className="group relative min-w-0">
    <Link to={`/product/${product.id}`} className="block min-w-0">
      <span className="relative block aspect-[0.92/1] overflow-hidden rounded-xl border border-ink/[0.06] bg-paper-200"><img src={product.image} alt={product.alt ?? product.name} className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.035]" /></span>
      <div className="mt-2.5 flex items-start justify-between gap-2"><div><h3 className="text-[11px] font-medium leading-[1.25] text-ink sm:text-[12px]">{product.name}</h3><p className="mt-1 font-heading text-[12px] font-bold sm:text-[13px]">₹{product.price.toLocaleString('en-IN')}</p></div><div className="flex shrink-0 gap-1 pt-1">{product.colors?.slice(0, 3).map((color) => <span key={color.name} className="h-2.5 w-2.5 rounded-full ring-1 ring-ink/15" style={{ backgroundColor: color.value }} />)}</div></div>
    </Link>
    <button type="button" onClick={() => setLiked((value) => !value)} aria-label={`${liked ? 'Remove' : 'Add'} ${product.name} ${liked ? 'from' : 'to'} wishlist`} aria-pressed={liked} className={`absolute right-2.5 top-2.5 grid h-8 w-8 place-items-center rounded-full bg-white/90 shadow-sm ${liked ? 'text-brand' : 'text-ink'}`}><LuHeart className="h-4 w-4" fill={liked ? 'currentColor' : 'none'} /></button>
  </article>
}

function FilterSection({ title, children }) {
  return <section className="border-b border-ink/[0.08] py-4 first:pt-0"><div className="mb-3 flex items-center justify-between"><h2 className="text-xs font-bold">{title}</h2><LuChevronDown className="h-3.5 w-3.5" /></div>{children}</section>
}

export default function GalleryPage() {
  const [selectedAnime, setSelectedAnime] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('T-Shirts')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('Featured')
  const [page, setPage] = useState(1)

  const visibleProducts = useMemo(() => {
    const filtered = galleryProducts.filter((product) => {
      const matchesAnime = selectedAnime.length === 0 || selectedAnime.includes(product.series)
      const matchesQuery = product.name.toLowerCase().includes(query.toLowerCase())
      return matchesAnime && matchesQuery
    })
    return [...filtered].sort((a, b) => sort === 'Price: Low to High' ? a.price - b.price : sort === 'Price: High to Low' ? b.price - a.price : 0)
  }, [query, selectedAnime, sort])

  const clearFilters = () => { setSelectedAnime([]); setSelectedCategory('T-Shirts'); setQuery(''); setPage(1) }
  const toggleAnime = (anime) => setSelectedAnime((current) => current.includes(anime) ? current.filter((item) => item !== anime) : [...current, anime])

  return <div className="min-h-screen bg-paper text-ink"><SiteHeader active="gallery" /><main>
    <section className="relative overflow-hidden border-b border-ink/[0.07] bg-paper"><img src="/images/naruto-crimson-sky.png" alt="Naruto beneath a crimson sky and mountain range" className="absolute inset-0 h-full w-full object-cover object-[62%_center]" /><div className="absolute inset-0 bg-[linear-gradient(90deg,#F7F6F2_0%,#F7F6F2_25%,rgba(247,246,242,0.84)_40%,rgba(247,246,242,0.15)_57%,transparent_72%)]" /><div className="relative mx-auto max-w-[1680px] px-5 sm:px-8 lg:px-16 xl:px-20"><nav aria-label="Breadcrumb" className="flex items-center gap-2 pt-5 text-[11px] text-ink/60"><Link to="/" className="hover:text-brand">Home</Link><LuChevronRight className="h-3 w-3" /><span className="font-semibold text-ink">T-Shirts</span></nav><div className="flex min-h-[17rem] items-center py-10 sm:min-h-[19rem] lg:min-h-[20rem]"><div><p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-ink/70">Collection</p><h1 className="mt-3 font-heading text-[clamp(3.4rem,7vw,6.25rem)] font-extrabold leading-[0.86] tracking-[-0.075em]">T-Shirts<span className="text-brand">.</span></h1><p className="mt-4 text-sm text-ink/65 sm:text-base">Anime-inspired tees for every fan.</p></div></div></div></section>

    <section className="mx-auto grid max-w-[1680px] gap-8 px-5 py-9 sm:px-8 lg:grid-cols-[13rem_1fr] lg:gap-9 lg:px-16 lg:py-12 xl:grid-cols-[14.5rem_1fr] xl:px-20">
      <aside className="hidden lg:block"><div className="flex items-center justify-between border-b border-ink/[0.08] pb-4"><h2 className="text-base font-bold">Filters</h2><button type="button" onClick={clearFilters} className="text-[11px] underline underline-offset-4 hover:text-brand">Clear All</button></div><div className="mt-4"><FilterSection title="Category"><div className="grid gap-3">{categories.map((category, index) => <FilterCheck key={category} label={category} count={[128, 64, 36, 18][index]} checked={selectedCategory === category} onChange={() => setSelectedCategory(category)} />)}</div></FilterSection><FilterSection title="Anime"><label className="mb-3 flex h-8 items-center gap-2 rounded-lg border border-ink/15 px-2.5 text-ink/45"><LuSearch className="h-3.5 w-3.5" /><input value={query} onChange={(event) => { setQuery(event.target.value); setPage(1) }} placeholder="Search anime..." className="min-w-0 flex-1 bg-transparent text-[11px] text-ink outline-none placeholder:text-ink/45" /></label><div className="grid gap-3">{animeOptions.map((anime, index) => <FilterCheck key={anime} label={anime} count={[28, 24, 20, 16, 14, 12][index]} checked={selectedAnime.includes(anime)} onChange={() => toggleAnime(anime)} />)}</div><button type="button" className="mt-4 text-[11px] font-semibold underline underline-offset-4">+ Show More</button></FilterSection><FilterSection title="Size"><div className="flex flex-wrap gap-1.5">{['S', 'M', 'L', 'XL', 'XXL'].map((size) => <button key={size} type="button" className="grid h-8 min-w-8 place-items-center rounded-lg border border-ink/15 px-2 text-[10px] font-semibold hover:border-ink">{size}</button>)}</div></FilterSection><FilterSection title="Color"><div className="flex gap-3">{['#111111', '#f7f7f7', '#bdbdbd', '#e5232b', '#4c52bd'].map((color) => <button key={color} type="button" aria-label={`Filter ${color}`} className="h-6 w-6 rounded-full border-2 border-paper ring-1 ring-ink/20" style={{ backgroundColor: color }} />)}</div></FilterSection><FilterSection title="Price"><div className="relative mt-6 h-1 rounded-full bg-brand"><span className="absolute -left-1.5 -top-1.5 h-4 w-4 rounded-full border-2 border-brand bg-paper" /><span className="absolute -right-1.5 -top-1.5 h-4 w-4 rounded-full border-2 border-brand bg-paper" /></div><p className="mt-4 text-[11px] font-medium">₹499 – ₹1,499</p></FilterSection><div className="flex items-center justify-between border-b border-ink/[0.08] py-4 text-xs"><span>In Stock Only</span><span className="h-5 w-9 rounded-full bg-ink p-0.5"><span className="ml-4 block h-4 w-4 rounded-full bg-white" /></span></div><div className="flex items-center justify-between py-4 text-xs"><span>On Sale</span><span className="h-5 w-9 rounded-full border border-ink/20 bg-white p-0.5"><span className="block h-4 w-4 rounded-full bg-ink/15" /></span></div></div></aside>

      <div className="min-w-0"><div className="flex flex-wrap items-center justify-between gap-4"><h2 className="font-heading text-[1.65rem] font-extrabold tracking-[-0.06em] sm:text-[2rem]">All T-Shirts <span className="font-normal text-ink/55">(128)</span></h2><label className="flex h-9 items-center gap-2 rounded-lg border border-ink/15 px-3 text-[11px]">Sort by:<select value={sort} onChange={(event) => setSort(event.target.value)} className="bg-transparent font-semibold outline-none"><option>Featured</option><option>Price: Low to High</option><option>Price: High to Low</option></select><LuChevronDown className="h-3.5 w-3.5" /></label></div><div className="mt-7 grid grid-cols-2 gap-x-3 gap-y-7 sm:grid-cols-3 sm:gap-x-4 lg:gap-x-5 lg:gap-y-9 xl:grid-cols-4">{visibleProducts.map((product) => <GalleryCard key={product.id} product={product} />)}</div>{visibleProducts.length === 0 ? <div className="py-20 text-center text-sm text-ink/60">No tees match those filters.</div> : null}<div className="mt-10 flex items-center justify-center gap-2"><button type="button" className="grid h-9 w-9 place-items-center rounded-lg border border-ink/15 hover:border-ink" aria-label="Previous page" onClick={() => setPage(Math.max(1, page - 1))}><LuMinus className="h-3.5 w-3.5" /></button>{[1, 2, 3, 4, 5].map((number) => <button key={number} type="button" onClick={() => setPage(number)} className={`grid h-9 w-9 place-items-center rounded-lg text-xs ${page === number ? 'bg-ink font-semibold text-white' : 'hover:bg-ink/5'}`}>{number}</button>)}<button type="button" className="grid h-9 w-9 place-items-center rounded-lg border border-ink/15 hover:border-ink" aria-label="Next page" onClick={() => setPage(Math.min(5, page + 1))}><LuPlus className="h-3.5 w-3.5" /></button></div></div>
    </section>
  </main><SiteFooter /></div>
}
